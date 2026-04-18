import { LocationData, TimeKey } from "../lib/types";

const photo = (fileName: string) => `/photos/${fileName}`;

export const timeStates: Array<{
  key: TimeKey;
  label: string;
  subtitle: string;
}> = [
  {
    key: "1926",
    label: "1926",
    subtitle: "100 lat temu",
  },
  {
    key: "2026",
    label: "2026",
    subtitle: "teraźniejszość",
  },
  {
    key: "2126",
    label: "2126",
    subtitle: "wizja przyszłości",
  },
];

export const locations: LocationData[] = [
  {
    id: "skwer-kosciuszki",
    name: "Skwer Kościuszki",
    district: "Śródmieście",
    shortDescription:
      "Reprezentacyjna oś miasta, w której morski modernizm spotyka otwarte, publiczne życie nad wodą.",
    lead:
      "Skwer Kościuszki jest symbolicznym salonem Gdyni. To tutaj historia portowego miasta zamienia się w spacer, rytm fal i miejski spektakl światła.",
    article:
      "Sto lat temu przestrzeń dzisiejszego Skweru Kościuszki była przede wszystkim obietnicą. Narodziny nowoczesnej Gdyni oznaczały budowę nowej tożsamości: odważnej, morskiej i skierowanej ku przyszłości. Wczesna tkanka miasta dopiero nabierała kształtu, a każdy nowy fragment nabrzeża wzmacniał poczucie, że powstaje miejsce wyjątkowe na mapie Polski.\n\nWspółcześnie Skwer jest jednocześnie punktem spotkań, promenadą i miejską sceną. Łączy codzienność mieszkańców z turystycznym rytmem sezonu, a jego otwarty charakter sprawia, że jest naturalnym mostem między lądem a morzem. Modernistyczna historia nadal jest tu czytelna, ale współistnieje z bardziej płynnym, rekreacyjnym stylem użytkowania miasta.\n\nW perspektywie 2126 Skwer może stać się immersyjnym pasem publicznym, w którym zieleń odporna na klimat, inteligentne nawierzchnie i delikatna infrastruktura energii morskiej tworzą nowy typ nadwodnego placu. To wizja przestrzeni spokojnej, luksusowej i technologicznie niewidzialnej: takiej, która wzmacnia doświadczenie miejsca, zamiast je dominować.",
    coordinates: { lng: 18.5456, lat: 54.5192 },
    tags: ["morze", "promenada", "modernizm"],
    accent: "from-sky-300/80 via-cyan-200/60 to-blue-500/70",
    facts: [
      { label: "Warstwa czasu", value: "Reprezentacyjne nabrzeże" },
      { label: "Motyw", value: "miejski salon nad wodą" },
      { label: "Potencjał 2126", value: "adaptacyjna promenada" },
    ],
    images: {
      "1926": photo("KEBAB - PRZESZLOSC.jpg"),
      "2026": photo("KEBAB - TERAZ.jpg"),
      "2126": photo("KEBAB - PRZYSZLOSC.png"),
    },
  },
  {
    id: "dworzec-glowny",
    name: "Dworzec Główny",
    district: "Centrum",
    shortDescription:
      "Brama wejściowa do miasta, w której mobilność i modernistyczny porządek zawsze miały strategiczne znaczenie.",
    lead:
      "Dworzec to pierwsze spojrzenie na Gdynię dla tysięcy osób. Jest punktem transferu, ale też scenografią wejścia w rytm miasta.",
    article:
      "W dawnych dekadach dworzec był symbolem aspiracji rozwijającej się Gdyni. Łączył miasto z resztą kraju i budował poczucie, że portowa nowoczesność ma solidne, infrastrukturalne zaplecze. To właśnie takie miejsca utrwalały obraz Gdyni jako projektu przyszłości.\n\nWspółczesny dworzec pełni rolę bardziej złożoną niż tylko komunikacyjna. Oprócz funkcji tranzytowej jest punktem orientacyjnym, codziennym węzłem miejskim i przestrzenią mikroscen: spotkań, przyjazdów, pożegnań, szybkich decyzji. Jego znaczenie wynika z intensywności przepływu i z tego, jak naturalnie łączy różne tempo życia.\n\nW roku 2126 węzeł ten może stać się niemal bezszwowym środowiskiem mobilności: z autonomicznym ruchem, płynną logistyką miejską i architekturą, która prowadzi użytkownika niemal intuicyjnie. To nadal dworzec, ale bardziej jako interfejs miasta niż tylko budynek.",
    coordinates: { lng: 18.5301, lat: 54.5215 },
    tags: ["mobilność", "infrastruktura", "wejście do miasta"],
    accent: "from-fuchsia-300/70 via-violet-200/40 to-sky-500/60",
    facts: [
      { label: "Warstwa czasu", value: "miejska brama" },
      { label: "Motyw", value: "przepływ i orientacja" },
      { label: "Potencjał 2126", value: "bezszwowy hub" },
    ],
    images: {
      "1926": photo("DWORZEC - PRZESZLOSC.webp"),
      "2026": photo("DWORZEC - TERAZ.png"),
      "2126": photo("DWORZEC - PRZYSZLOSC.png"),
    },
  },
  {
    id: "fontanna",
    name: "Fontanna",
    district: "Molo Południowe",
    shortDescription:
      "Rozpoznawalny punkt spotkań na styku Skweru Kościuszki i alei Jana Pawła II, gdzie reprezentacyjna oś miasta przechodzi w nadmorską promenadę.",
    lead:
      "Fontanna skupia ruch spacerowy, turystyczny i symboliczny. To mała architektura, która porządkuje przestrzeń i natychmiast buduje poczucie, że jest się w sercu nadmorskiej Gdyni.",
    article:
      "Historyczna fontanna była nie tylko dekoracją, ale też elementem budującym reprezentacyjny charakter nadmorskiego śródmieścia. W tym miejscu spacer miejski spotykał się z portową wyobraźnią i wypoczynkowym rytmem nowej Gdyni.\n\nDziś fontanna pozostaje jednym z najbardziej intuicyjnych punktów orientacyjnych w tej części miasta. Skupia ruch pieszy, zdjęcia, spotkania i krótkie postoje pomiędzy Skwerem Kościuszki, mariną i nabrzeżem. To miejsce bardziej doświadczane niż opisywane, ale właśnie dlatego silnie zapisujące się w pamięci.\n\nW 2126 mogłaby działać jako dyskretna instalacja klimatyczna i świetlna: chłodząca przestrzeń, reagująca na pogodę i porę dnia, a przy tym zachowująca swoją rolę miejskiego punktu zbiorowego. Jej przyszłość nie musi oznaczać zmiany formy, tylko mądrzejsze działanie.",
    coordinates: { lng: 18.5485, lat: 54.5190 },
    tags: ["spotkania", "promenada", "orientacja"],
    accent: "from-cyan-200/80 via-sky-200/50 to-blue-400/80",
    facts: [
      { label: "Warstwa czasu", value: "miejski punkt spotkań" },
      { label: "Motyw", value: "woda i orientacja" },
      { label: "Potencjał 2126", value: "instalacja klimatyczna" },
    ],
    images: {
      "1926": photo("FONTANNA - PRZESZLOSC.jpg"),
      "2026": photo("FONTANNA - TERAZ.jpg"),
      "2126": photo("FONTANNA - PRZYSZLOSC.png"),
    },
  },
  {
    id: "muzeum-emigracji",
    name: "Muzeum Emigracji",
    district: "Port",
    shortDescription:
      "Miejsce pamięci ruchu, marzeń i odpływania, które doskonale łączy archiwum miasta z jego przyszłością.",
    lead:
      "Dawny Dworzec Morski niesie w sobie historię wyjazdów, nadziei i otwarcia na świat. To punkt, w którym Gdynia patrzy jednocześnie wstecz i daleko przed siebie.",
    article:
      "Historyczny charakter Dworca Morskiego jest nierozerwalnie związany z ruchem ludzi i opowieści. Gdynia była miejscem wyjazdu, początkiem podróży i bramą do nowych rozdziałów. W tej logice budynek stawał się czymś więcej niż infrastrukturą: był emocjonalnym progiem.\n\nObecnie przestrzeń ta działa jak archiwum pamięci, ale nie w muzealnym sensie zamknięcia. To raczej aktywny punkt interpretacji miasta, który pozwala opowiadać o Gdyni przez pryzmat migracji, otwartości i morza jako medium łączącego światy. Architektura budynku wzmacnia tę narrację dzięki elegancji i klarowności formy.\n\nW 2126 to miejsce mogłoby funkcjonować jako hybrydowe centrum doświadczeń portowych: z warstwami rozszerzonej pamięci, projekcjami dawnych szlaków i żywym połączeniem z inteligentnym portem przyszłości. Archiwum i przyszłość nie musiałyby się tu wykluczać, lecz wzajemnie wzmacniać.",
    coordinates: { lng: 18.5479, lat: 54.5333 },
    tags: ["port", "pamięć", "migracja"],
    accent: "from-amber-200/70 via-sky-200/40 to-cyan-400/60",
    facts: [
      { label: "Warstwa czasu", value: "brama morska" },
      { label: "Motyw", value: "pamięć i odpływanie" },
      { label: "Potencjał 2126", value: "archiwum immersyjne" },
    ],
    images: {
      "1926": photo("MUZEUM - PRZESZLOSC.jpg"),
      "2026": photo("MUZEUM - TERAZ.png"),
      "2126": photo("MUZEUM - PRZYSZLOSC.png"),
    },
  },
  {
    id: "zegluga-gdanska",
    name: "Żegluga Gdańska",
    district: "Molo Południowe",
    shortDescription:
      "Próg wyjścia na wodę, gdzie codzienna infrastruktura rejsowa spotyka się z wakacyjną wyobraźnią i portowym rytmem miasta.",
    lead:
      "Terminal Żeglugi Gdańskiej jest miejscem przejścia z lądu na morze. To tu Gdynia pokazuje swoją najbardziej dosłowną relację z rejsem, horyzontem i nadmorskim ruchem.",
    article:
      "W historycznej logice Gdyni miejsca takie jak terminal Żeglugi Gdańskiej były materialnym dowodem, że morze jest tu częścią codzienności, a nie tylko widokiem. Rejs, bilet, trap i nabrzeże tworzyły prostą, ale bardzo silną opowieść o mieście otwartym i ruchliwym.\n\nDziś przestrzeń ta nadal ma w sobie energię wyjazdu. Nawet jeśli działa bardziej sezonowo i użytkowo, wciąż niesie klimat portowej dostępności: można stąd odpłynąć, spojrzeć na miasto od strony wody i odczuć Gdynię jako miejsce realnie zanurzone w morzu.\n\nW 2126 terminal mógłby przekształcić się w lekki hub błękitnej mobilności, obsługujący ciche jednostki pasażerskie i autonomiczne połączenia przybrzeżne. Zachowałby swój publiczny charakter, ale działałby płynniej, czyściej i bardziej całorocznie.",
    coordinates: { lng: 18.5542, lat: 54.5192 },
    tags: ["rejs", "port", "mobilność morska"],
    accent: "from-amber-200/70 via-sky-200/40 to-cyan-400/60",
    facts: [
      { label: "Warstwa czasu", value: "terminal rejsowy" },
      { label: "Motyw", value: "wyjście na wodę" },
      { label: "Potencjał 2126", value: "błękitna mobilność" },
    ],
    images: {
      "1926": photo("ZEGLUGA - PRZESZLOSC.jpg"),
      "2026": photo("ZEGLUGA - TERAZ.png"),
      "2126": photo("ZEGLUGA - PRZYSZLOSC.png"),
    },
  },
];
