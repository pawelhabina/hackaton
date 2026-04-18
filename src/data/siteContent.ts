import { BrainCircuit, Building2, Leaf, Sailboat, WavesLadder } from "lucide-react";
import { FuturePillar, TimelineMilestone } from "../lib/types";

export const introCards = [
  {
    title: "Historia",
    body: "Miasto zapisane w warstwach architektury, portu i miejskiej pamięci.",
  },
  {
    title: "Teraźniejszość",
    body: "Gdynia jako żywe nadmorskie laboratorium codzienności, mobilności i światła.",
  },
  {
    title: "Przyszłość",
    body: "Spekulatywna, elegancka wizja miasta 2126: spokojna, inteligentna i morska.",
  },
  {
    title: "Morze + technologia",
    body: "Miękka infrastruktura, klimat, zieleń i systemy niewidzialnie wspierające życie miasta.",
  },
];

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "1926",
    title: "Narodziny miasta",
    body: "Gdynia otrzymuje prawa miejskie decyzją Rady Ministrów z 10 lutego 1926 roku, obowiązującą od 4 marca. To moment, od którego zaczyna się szybki rozwój miasta w nowoczesnej formie.",
  },
  {
    year: "1934",
    title: "Samodzielny port",
    body: "Port w Gdyni uzyskuje pełną niezależność operacyjną. To jedna z najważniejszych decyzji gospodarczych w historii miasta, bo właśnie port staje się motorem jego wzrostu.",
  },
  {
    year: "1939",
    title: "Wojna przerywa rozwój",
    body: "Po kapitulacji miasta Gdynia zostaje przemianowana na Gotenhafen, a mieszkańców dotykają wysiedlenia i represje. Dynamiczny rozwój miasta zostaje gwałtownie zatrzymany.",
  },
  {
    year: "1945",
    title: "Odbudowa po zniszczeniach",
    body: "Po wojnie rozpoczyna się odbudowa Gdyni i portu. Samo miasto było zniszczone stosunkowo mniej, ale port ucierpiał bardzo mocno, więc jego odbudowa stała się kluczowym zadaniem.",
  },
  {
    year: "1953",
    title: "Początek nowej komunikacji",
    body: "Uruchomienie elektrycznej kolei do Gdyni staje się przełomem dla codziennego życia mieszkańców i rozwoju całego Trójmiasta. To jeden z fundamentów późniejszej roli SKM.",
  },
  {
    year: "1970",
    title: "Czarny Czwartek",
    body: "Gdynia staje się jednym z najważniejszych miejsc protestów robotniczych w PRL. Wydarzenia grudnia 1970 roku na trwałe zapisują się w historii miasta i całego kraju.",
  },
  {
    year: "2015",
    title: "Ochrona modernistycznej Gdyni",
    body: "Układ urbanistyczny śródmieścia Gdyni zostaje uznany za Pomnik Historii. To potwierdza wyjątkową wartość gdyńskiego modernizmu i wzmacnia ochronę tożsamości miasta.",
  },
  {
    year: "2024–2035",
    title: "Nowy etap rozwoju",
    body: "W 2024 zakończono dużą modernizację kolejowego dostępu do portu, a na kolejne lata planowane są następne kluczowe inwestycje: Droga Czerwona, dalsza rozbudowa linii kolejowej do Gdyni oraz prace nad strategią rozwoju miasta do 2035 roku.",
  },
];

export const futurePillars: Array<FuturePillar & { icon: typeof WavesLadder }> = [
  {
    title: "Mobilność bez tarcia",
    description:
      "Sieć ruchu w 2126 działa niemal niewidzialnie: płynnie, cicho i precyzyjnie reaguje na miasto.",
    accent: "from-sky-300/70 to-blue-500/40",
    icon: WavesLadder,
  },
  {
    title: "Port przyszłości",
    description:
      "Port pozostaje sercem Gdyni, ale staje się bardziej autonomiczny, czystszy i lepiej zintegrowany z tkanką miejską.",
    accent: "from-cyan-200/70 to-teal-400/40",
    icon: Sailboat,
  },
  {
    title: "Zielona architektura",
    description:
      "Budynki i przestrzenie publiczne współpracują z mikroklimatem, światłem i retencją zamiast tylko zajmować teren.",
    accent: "from-emerald-200/70 to-lime-400/40",
    icon: Leaf,
  },
  {
    title: "Miejska inteligencja",
    description:
      "Systemy cyfrowe nie dominują doświadczenia miasta. Ich rolą jest porządkować przepływy i wspierać mieszkańców dyskretnie.",
    accent: "from-violet-200/70 to-indigo-500/40",
    icon: BrainCircuit,
  },
  {
    title: "Nowy modernizm nad morzem",
    description:
      "Forma pozostaje oszczędna, elegancka i czytelna. Przyszłość Gdyni nie jest krzykliwa, tylko konsekwentnie dopracowana.",
    accent: "from-amber-100/70 to-sky-400/40",
    icon: Building2,
  },
];
