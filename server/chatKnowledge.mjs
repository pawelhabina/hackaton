const persona = `
Jesteś rozmownym mieszkańcem Gdyni.
Mówisz po polsku, naturalnie, swobodnie i krótko.
Brzmisz jak lokalny przewodnik, a nie jak encyklopedia.
`;

const knowledgeBase = [
  {
    id: "gdynia-city-rights",
    triggers: [
      "rok powstania gdyni",
      "kiedy powstala gdynia",
      "w ktorym roku powstala gdynia",
      "kiedy gdynia dostala prawa miejskie",
      "od kiedy gdynia jest miastem",
    ],
    facts: [
      "Gdynia uzyskała prawa miejskie w 1926 roku.",
    ],
  },
  {
    id: "gdynia-identity",
    triggers: [
      "czym jest gdynia",
      "z czego slynie gdynia",
      "jaka jest gdynia",
      "co jest charakterystyczne dla gdyni",
    ],
    facts: [
      "Gdynia jest nadmorskim miastem portowym na Pomorzu.",
      "To miasto silnie kojarzone z morzem, portem i modernistyczną tożsamością.",
    ],
  },
  {
    id: "skwer-kosciuszki",
    triggers: [
      "skwer kosciuszki",
      "skwerze kosciuszki",
      "co to jest skwer kosciuszki",
      "powiedz o skwerze kosciuszki",
      "opowiedz o skwerze kosciuszki",
    ],
    facts: [
      "Skwer Kościuszki to reprezentacyjna przestrzeń publiczna w centrum Gdyni, blisko nabrzeża.",
      "W projekcie jest pokazany jako miejski salon nad wodą, łączący historię, spacer i współczesne życie miasta.",
    ],
  },
  {
    id: "dworzec-glowny",
    triggers: [
      "dworzec glowny",
      "dworcu glownym",
      "powiedz o dworcu",
      "co z dworcem glownym",
      "opowiedz o dworcu glownym",
    ],
    facts: [
      "Dworzec Główny w projekcie jest przedstawiony jako brama wejściowa do miasta i ważny węzeł mobilności.",
      "To punkt orientacyjny, który łączy codzienny ruch miejski z historią nowoczesnej Gdyni.",
    ],
  },
  {
    id: "fontanna",
    triggers: [
      "fontanna",
      "fontannie",
      "powiedz o fontannie",
      "co to za fontanna",
      "opowiedz o fontannie",
    ],
    facts: [
      "Fontanna przy Molu Południowym jest w projekcie pokazana jako punkt spotkań i orientacji w nadmorskim centrum Gdyni.",
      "To miejsce łączy spacerowy charakter Skweru Kościuszki z promenadą i ruchem turystycznym.",
    ],
  },
  {
    id: "muzeum-emigracji",
    triggers: [
      "muzeum emigracji",
      "muzeum emigracji w gdyni",
      "powiedz o muzeum emigracji",
      "opowiedz o muzeum emigracji",
      "dworzec morski",
    ],
    facts: [
      "Muzeum Emigracji mieści się w dawnym Dworcu Morskim.",
      "W projekcie jest opisane jako miejsce pamięci ruchu, wyjazdów i otwartości Gdyni na świat.",
    ],
  },
  {
    id: "zegluga-gdanska",
    triggers: [
      "zegluga gdanska",
      "zegludze gdanskiej",
      "terminal zeglugi gdanskiej",
      "rejsy z gdyni",
      "opowiedz o zegludze gdanskiej",
    ],
    facts: [
      "Terminal Żeglugi Gdańskiej jest pokazany jako próg wyjścia z lądu na morze.",
      "W projekcie symbolizuje portowy rytm miasta i bezpośrednią relację Gdyni z wodą.",
    ],
  },
  {
    id: "project-time-axis",
    triggers: [
      "o co chodzi z latami",
      "co oznaczaja lata na stronie",
      "1926 2026 2126",
      "os czasu",
    ],
    facts: [
      "Strona porównuje trzy perspektywy czasu: 1926, 2026 i 2126.",
      "Każde miejsce pokazuje przeszłość, teraźniejszość i wyobrażoną przyszłość Gdyni.",
    ],
  },
];

function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[ąćęłńóśżź]/g, (character) => {
      const replacements = {
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        ó: "o",
        ś: "s",
        ż: "z",
        ź: "z",
      };

      return replacements[character] ?? character;
    })
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 2);
}

function scoreEntry(entry, normalizedQuestion, tokenSet) {
  let score = 0;

  for (const trigger of entry.triggers) {
    const normalizedTrigger = normalize(trigger);

    if (normalizedQuestion.includes(normalizedTrigger)) {
      score = Math.max(score, 10 + normalizedTrigger.length);
    }

    const triggerTokens = tokenize(normalizedTrigger);
    if (triggerTokens.length > 1 && triggerTokens.every((token) => tokenSet.has(token))) {
      score = Math.max(score, 5 + triggerTokens.length);
    }
  }

  return score;
}

export function resolveChatContext(question) {
  const normalizedQuestion = normalize(question);
  const tokenSet = new Set(tokenize(question));

  const matches = knowledgeBase
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, normalizedQuestion, tokenSet),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  return {
    matches,
    canonicalFacts: matches.flatMap((entry) => entry.facts),
  };
}

function formatHistory(messages) {
  if (!messages.length) {
    return "Brak wcześniejszych wiadomości.";
  }

  return messages
    .slice(-8)
    .map((message) => {
      const speaker = message.role === "assistant" ? "Mieszkaniec Gdyni" : "Użytkownik";
      return `${speaker}: ${message.content}`;
    })
    .join("\n");
}

export function buildModelPrompt({ question, messages, context }) {
  const factBlock = context.canonicalFacts.length
    ? context.canonicalFacts.map((fact) => `- ${fact}`).join("\n")
    : "- Brak twardych faktów dopasowanych do pytania. Odpowiadaj ostrożnie i nie wymyślaj precyzyjnych dat ani liczb.";

  return `
${persona.trim()}

Zasady:
- Odpowiadaj po polsku.
- Odpowiedź ma brzmieć naturalnie i ludzko, jak rozmowa z mieszkańcem Gdyni.
- Jeśli poniżej są kanoniczne fakty, musisz zachować ich znaczenie.
- Nie zmieniaj dat, liczb, nazw własnych ani relacji faktów.
- Nie cytuj listy faktów dosłownie, tylko ubierz je w naturalny język.
- Jeśli faktów brak, możesz improwizować styl, ale bez zmyślania twardych danych.
- Trzymaj się tematu Gdyni i projektu strony.
- Odpowiadaj zwykle w 2 do 5 zdań.

Kanoniczne fakty:
${factBlock}

Historia rozmowy:
${formatHistory(messages)}

Aktualne pytanie użytkownika:
${question}
`.trim();
}

const localOpeners = [
  "Jasne.",
  "Pewnie.",
  "Jeśli pytasz mnie jako lokalsa, to",
  "Z perspektywy Gdyni wygląda to tak:",
];

const localClosers = [
  "To jedno z tych pytań, na które w Gdyni odpowiada się dość konkretnie.",
  "Tak bym to najkrócej ujął.",
  "To dobra baza, jeśli chcesz iść dalej w temat.",
  "Jak chcesz, mogę też rozwinąć ten wątek szerzej.",
];

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function buildLocalReply({ question, context }) {
  if (context.canonicalFacts.length) {
    const opener = pickRandom(localOpeners);
    const closer = pickRandom(localClosers);
    const factSentence = context.canonicalFacts.join(" ");
    return `${opener} ${factSentence} ${closer}`;
  }

  const normalizedQuestion = normalize(question);

  if (normalizedQuestion.includes("czesc") || normalizedQuestion.includes("hej")) {
    return "Cześć. Mogę pogadać o Gdyni, o miejscach z tej strony i o tym, jak projekt pokazuje miasto w 1926, 2026 i 2126.";
  }

  return "Mogę improwizować jak mieszkaniec Gdyni, ale przy takim pytaniu lepiej dopytać o konkretne miejsce, datę albo motyw związany z miastem.";
}
