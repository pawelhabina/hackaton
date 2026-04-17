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
    title: "Narodziny nowoczesnej Gdyni",
    body: "Miasto zaczyna działać jak projekt przyszłości: ambitny, portowy, modernistyczny.",
  },
  {
    year: "1939",
    title: "Port i modernizm",
    body: "Nadmorska tożsamość zyskuje architektoniczną formę i skalę miejskiej odwagi.",
  },
  {
    year: "2026",
    title: "Miasto pomiędzy historią a codziennością",
    body: "Gdynia żyje intensywnie, ale wciąż zachowuje klarowność i relację z morzem.",
  },
  {
    year: "2086",
    title: "Adaptacja klimatyczna i nowa mobilność",
    body: "Przestrzeń miejska staje się bardziej responsywna, zielona i precyzyjnie projektowana.",
  },
  {
    year: "2126",
    title: "Archiwum przyszłości",
    body: "Miasto działa jak płynny interfejs pamięci, natury i inteligentnej infrastruktury.",
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
