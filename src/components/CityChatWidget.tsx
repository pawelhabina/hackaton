import { FormEvent, useEffect, useRef, useState } from "react";
import { LoaderCircle, MapPinned, MessageCircleMore, SendHorizonal, X } from "lucide-react";
import { ChatMessage } from "../lib/types";

const quickPrompts = [
  "W którym roku powstała Gdynia?",
  "Opowiedz mi o Skwerze Kościuszki.",
  "Co pokazuje ta strona w 2126 roku?",
];

const introMessage: ChatMessage = {
  id: "chat-intro",
  role: "assistant",
  content:
    "Jestem wirtualnym mieszkańcem Gdyni. Pytaj o miasto, miejsca z mapy albo o to, jak projekt pokazuje Gdynię w 1926, 2026 i 2126.",
};

async function sendChatRequest(messages: ChatMessage[]) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
    }),
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(errorPayload?.error || "Nie udało się połączyć z chatem.");
  }

  return (await response.json()) as { message: string };
}

export function CityChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([introMessage]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const content = (messageText ?? draft).trim();

    if (!content || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setDraft("");
    setError(null);
    setIsSending(true);

    try {
      const result = await sendChatRequest(nextMessages);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: result.message,
        },
      ]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Wystąpił błąd czatu.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSendMessage();
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[120] flex max-h-[calc(100dvh-1rem)] items-end justify-end md:bottom-6 md:right-6 md:max-h-[calc(100dvh-3rem)]">
      {isOpen ? (
        <div className="pointer-events-auto flex h-[min(44rem,calc(100dvh-1rem))] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-[1.8rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,14,26,0.94),rgba(4,10,20,0.96))] shadow-[0_28px_90px_rgba(2,8,24,0.62)] backdrop-blur-2xl md:h-[min(46rem,calc(100dvh-3rem))]">
          <div className="shrink-0 border-b border-white/10 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-cyan-100/78">
                  <MapPinned className="h-3.5 w-3.5" />
                  Głos miasta
                </div>
                <div className="mt-2 text-lg font-semibold tracking-[-0.04em] text-white">
                  Wirtualny mieszkaniec Gdyni
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Trzyma się zadeklarowanych faktów, a resztę odpowiada naturalnie.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-slate-200 transition hover:border-cyan-200/20 hover:text-white"
                aria-label="Zamknij czat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="city-chat-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";

              return (
                <div
                  key={message.id}
                  className={`max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-6 shadow-[0_12px_30px_rgba(2,8,24,0.22)] ${
                    isAssistant
                      ? "border border-white/10 bg-white/[0.05] text-slate-100"
                      : "ml-auto border border-cyan-200/18 bg-[linear-gradient(180deg,rgba(63,155,255,0.28),rgba(22,78,99,0.34))] text-white"
                  }`}
                >
                  {message.content}
                </div>
              );
            })}

            {isSending ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                Odpowiadam
              </div>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-white/10 px-5 py-4">
            <div className="city-chat-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void handleSendMessage(prompt)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-[0.68rem] uppercase tracking-[0.2em] text-slate-200 transition hover:border-cyan-200/20 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="sr-only" htmlFor="city-chat-input">
                Zadaj pytanie o Gdynię
              </label>
              <textarea
                id="city-chat-input"
                ref={textareaRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={3}
                placeholder="Zapytaj o Gdynię, miejsca z mapy albo daty..."
                className="city-chat-input h-24 w-full resize-none rounded-[1.4rem] border border-white/10 bg-[#08101d] px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500"
              />

              <div className="flex items-center justify-between gap-3">
                <div className="text-xs leading-5 text-slate-400">
                  Fakty ustawiasz w pliku `server/chatKnowledge.mjs`.
                </div>
                <button
                  type="submit"
                  disabled={isSending || !draft.trim()}
                  className="glass-button inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <SendHorizonal className="h-4 w-4" />
                  Wyślij
                </button>
              </div>
            </form>

            {error ? (
              <p className="mt-3 text-sm text-rose-300">{error}</p>
            ) : null}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto glass-button inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-white"
        >
          <MessageCircleMore className="h-5 w-5" />
          Zapytaj mieszkańca Gdyni
        </button>
      )}
    </div>
  );
}
