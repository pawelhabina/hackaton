import express from "express";
import { GoogleGenAI } from "@google/genai";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildLocalReply, buildModelPrompt, resolveChatContext } from "./chatKnowledge.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const indexHtmlPath = path.join(distDir, "index.html");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const fileContent = readFileSync(filePath, "utf8");

  for (const rawLine of fileContent.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(rootDir, ".env"));
loadEnvFile(path.join(rootDir, ".env.local"));
loadEnvFile(path.join(__dirname, ".env"));
loadEnvFile(path.join(__dirname, ".env.local"));

const port = Number(process.env.PORT || process.env.CHAT_PORT || 8787);
const allowedOrigins = new Set(
  String(process.env.CORS_ALLOW_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const app = express();

app.use((request, response, next) => {
  const origin = request.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (request.method === "OPTIONS") {
    response.sendStatus(origin && allowedOrigins.has(origin) ? 204 : 403);
    return;
  }

  next();
});

app.use(express.json({ limit: "1mb" }));

let cachedClient = null;

function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return cachedClient;
}

function sanitizeMessages(input) {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((message) => ({
      role: message?.role === "assistant" ? "assistant" : "user",
      content: String(message?.content ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 1200),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-8);
}

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.post("/api/chat", async (request, response) => {
  const messages = sanitizeMessages(request.body?.messages);
  const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!lastUserMessage) {
    response.status(400).json({
      error: "Brak wiadomości użytkownika do obsłużenia.",
    });
    return;
  }

  const context = resolveChatContext(lastUserMessage.content);
  const client = getGeminiClient();

  try {
    if (!client) {
      response.json({
        message: buildLocalReply({ question: lastUserMessage.content, context }),
        mode: "local",
        matchedFacts: context.matches.map((entry) => entry.id),
      });
      return;
    }

    const result = await client.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: buildModelPrompt({
        question: lastUserMessage.content,
        messages,
        context,
      }),
      config: {
        systemInstruction:
          "Jesteś rozmownym mieszkańcem Gdyni. Odpowiadasz po polsku, naturalnie, krótko i bez zmieniania przekazanych faktów.",
        temperature: 0.9,
        maxOutputTokens: 350,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    const reply = result.text?.trim();

    if (!reply) {
      throw new Error("Model nie zwrócił treści odpowiedzi.");
    }

    response.json({
      message: reply,
      mode: "gemini",
      matchedFacts: context.matches.map((entry) => entry.id),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const status = typeof error?.status === "number" ? error.status : 502;
    const code =
      typeof error?.code === "string"
        ? error.code
        : typeof error?.errorDetails?.[0]?.reason === "string"
          ? error.errorDetails[0].reason
          : null;

    let userMessage = "Nie udało się pobrać odpowiedzi z Gemini.";

    if (code === "insufficient_quota" || code === "RESOURCE_EXHAUSTED" || status === 429) {
      userMessage =
        "Gemini odrzuciło zapytanie z powodu limitu albo braku aktywnego rozliczenia. Sprawdź quota i billing dla klucza API.";
    } else if (status === 401) {
      userMessage = "Gemini odrzuciło klucz API. Sprawdź, czy GEMINI_API_KEY jest poprawny.";
    } else if (status === 403) {
      userMessage = "Gemini zablokowało dostęp dla tego klucza lub projektu.";
    }

    response.status(status).json({
      error: userMessage,
      mode: "error",
      matchedFacts: context.matches.map((entry) => entry.id),
    });
  }
});

if (existsSync(indexHtmlPath)) {
  app.use(express.static(distDir));

  app.get(/^(?!\/api).*/, (_request, response) => {
    response.sendFile(indexHtmlPath);
  });
}

app.listen(port, () => {
  console.log(`Chat server listening on http://localhost:${port}`);
});
