import { LocationData, TimeKey } from "../lib/types";

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
    coordinates: { lng: 18.5532, lat: 54.5192 },
    tags: ["morze", "promenada", "modernizm"],
    accent: "from-sky-300/80 via-cyan-200/60 to-blue-500/70",
    facts: [
      { label: "Warstwa czasu", value: "Reprezentacyjne nabrzeże" },
      { label: "Motyw", value: "miejski salon nad wodą" },
      { label: "Potencjał 2126", value: "adaptacyjna promenada" },
    ],
    images: {
      "1926": "https://picsum.photos/seed/gdynia-skwer-1926/1600/1000",
      "2026": "https://picsum.photos/seed/gdynia-skwer-2026/1600/1000",
      "2126": "https://picsum.photos/seed/gdynia-skwer-2126/1600/1000",
    },
  },
  {
    id: "orlowo-molo",
    name: "Orłowo i molo",
    district: "Orłowo",
    shortDescription:
      "Najbardziej filmowa krawędź miasta: klif, drewno, mgła i szeroki horyzont Bałtyku.",
    lead:
      "Orłowo od dekad pozostaje miejscem bardziej odczuwanym niż oglądanym. To przestrzeń ciszy, pejzażu i nieustannego dialogu między miastem a naturą.",
    article:
      "Historyczne Orłowo przyciągało atmosferą letniska, spokojem i szlachetną prostotą krajobrazu. Molo oraz klif budowały wyobrażenie o Gdyni jako mieście nie tylko portowym, ale też subtelnie wypoczynkowym. Miejsce miało swoją skalę, rytm i światło, które od początku stanowiły o jego wyjątkowości.\n\nDziś Orłowo pozostaje jednym z najbardziej rozpoznawalnych symboli nadmorskiej Gdyni. Spacer po molo i widok na klif są doświadczeniem niemal rytualnym: wpisanym zarówno w lokalną codzienność, jak i w turystyczne narracje. To przestrzeń, która nie potrzebuje nadmiaru, bo jej siła tkwi w proporcji, otwarciu i naturalnej dramaturgii.\n\nW roku 2126 Orłowo może stać się wzorcowym przykładem delikatnej architektury odpornej na zmianę klimatu. Kładki, punkty obserwacyjne i systemy ochrony brzegu mogłyby pozostać prawie niewidoczne, stapiając się z pejzażem. Przyszłość tego miejsca to nie spektakularna ingerencja, lecz inteligentna opieka nad krajobrazem.",
    coordinates: { lng: 18.5719, lat: 54.4808 },
    tags: ["klif", "pejzaż", "spokój"],
    accent: "from-emerald-300/70 via-cyan-200/50 to-sky-500/70",
    facts: [
      { label: "Warstwa czasu", value: "kurortowy pejzaż" },
      { label: "Motyw", value: "natura i kontemplacja" },
      { label: "Potencjał 2126", value: "krajobraz adaptacyjny" },
    ],
    images: {
      "1926": "https://picsum.photos/seed/gdynia-orlowo-1926/1600/1000",
      "2026": "https://picsum.photos/seed/gdynia-orlowo-2026/1600/1000",
      "2126": "https://picsum.photos/seed/gdynia-orlowo-2126/1600/1000",
    },
  },
  {
    id: "dworzec-glowny",
    name: "Dworzec Gdynia Główna",
    district: "Centrum",
    shortDescription:
      "Brama wejściowa do miasta, w której mobilność i modernistyczny porządek zawsze miały strategiczne znaczenie.",
    lead:
      "Dworzec to pierwsze spojrzenie na Gdynię dla tysięcy osób. Jest punktem transferu, ale też scenografią wejścia w rytm miasta.",
    article:
      "W dawnych dekadach dworzec był symbolem aspiracji rozwijającej się Gdyni. Łączył miasto z resztą kraju i budował poczucie, że portowa nowoczesność ma solidne, infrastrukturalne zaplecze. To właśnie takie miejsca utrwalały obraz Gdyni jako projektu przyszłości.\n\nWspółczesny dworzec pełni rolę bardziej złożoną niż tylko komunikacyjna. Oprócz funkcji tranzytowej jest punktem orientacyjnym, codziennym węzłem miejskim i przestrzenią mikroscen: spotkań, przyjazdów, pożegnań, szybkich decyzji. Jego znaczenie wynika z intensywności przepływu i z tego, jak naturalnie łączy różne tempo życia.\n\nW roku 2126 węzeł ten może stać się niemal bezszwowym środowiskiem mobilności: z autonomicznym ruchem, płynną logistyką miejską i architekturą, która prowadzi użytkownika niemal intuicyjnie. To nadal dworzec, ale bardziej jako interfejs miasta niż tylko budynek.",
    coordinates: { lng: 18.5306, lat: 54.5214 },
    tags: ["mobilność", "infrastruktura", "wejście do miasta"],
    accent: "from-fuchsia-300/70 via-violet-200/40 to-sky-500/60",
    facts: [
      { label: "Warstwa czasu", value: "miejska brama" },
      { label: "Motyw", value: "przepływ i orientacja" },
      { label: "Potencjał 2126", value: "bezszwowy hub" },
    ],
    images: {
      "1926": "https://picsum.photos/seed/gdynia-dworzec-1926/1600/1000",
      "2026": "https://picsum.photos/seed/gdynia-dworzec-2026/1600/1000",
      "2126": "https://picsum.photos/seed/gdynia-dworzec-2126/1600/1000",
    },
  },
  {
    id: "dworzec-morski",
    name: "Dworzec Morski / Muzeum Emigracji",
    district: "Port",
    shortDescription:
      "Miejsce pamięci ruchu, marzeń i odpływania, które doskonale łączy archiwum miasta z jego przyszłością.",
    lead:
      "Dawny Dworzec Morski niesie w sobie historię wyjazdów, nadziei i otwarcia na świat. To punkt, w którym Gdynia patrzy jednocześnie wstecz i daleko przed siebie.",
    article:
      "Historyczny charakter Dworca Morskiego jest nierozerwalnie związany z ruchem ludzi i opowieści. Gdynia była miejscem wyjazdu, początkiem podróży i bramą do nowych rozdziałów. W tej logice budynek stawał się czymś więcej niż infrastrukturą: był emocjonalnym progiem.\n\nObecnie przestrzeń ta działa jak archiwum pamięci, ale nie w muzealnym sensie zamknięcia. To raczej aktywny punkt interpretacji miasta, który pozwala opowiadać o Gdyni przez pryzmat migracji, otwartości i morza jako medium łączącego światy. Architektura budynku wzmacnia tę narrację dzięki elegancji i klarowności formy.\n\nW 2126 to miejsce mogłoby funkcjonować jako hybrydowe centrum doświadczeń portowych: z warstwami rozszerzonej pamięci, projekcjami dawnych szlaków i żywym połączeniem z inteligentnym portem przyszłości. Archiwum i przyszłość nie musiałyby się tu wykluczać, lecz wzajemnie wzmacniać.",
    coordinates: { lng: 18.5234, lat: 54.5338 },
    tags: ["port", "pamięć", "migracja"],
    accent: "from-amber-200/70 via-sky-200/40 to-cyan-400/60",
    facts: [
      { label: "Warstwa czasu", value: "brama morska" },
      { label: "Motyw", value: "pamięć i odpływanie" },
      { label: "Potencjał 2126", value: "archiwum immersyjne" },
    ],
    images: {
      "1926": "https://picsum.photos/seed/gdynia-morski-1926/1600/1000",
      "2026": "https://picsum.photos/seed/gdynia-morski-2026/1600/1000",
      "2126": "https://picsum.photos/seed/gdynia-morski-2126/1600/1000",
    },
  },
  {
    id: "kamienna-gora",
    name: "Kamienna Góra",
    district: "Kamienna Góra",
    shortDescription:
      "Panoramiczny balkon nad miastem, z którego najlepiej widać zmieniającą się tożsamość Gdyni.",
    lead:
      "Kamienna Góra to miejsce obserwacji. Zawieszone pomiędzy zielenią, architekturą i linią morza, porządkuje obraz Gdyni w jedną szeroką panoramę.",
    article:
      "Z perspektywy historycznej Kamienna Góra zawsze oferowała coś więcej niż widok. Pozwalała zrozumieć relację między topografią a rozwojem miasta: między wzgórzem, portem i pasem zabudowy, który stopniowo nabierał wyrazu. To był punkt orientacyjny i zarazem miejsce symboliczne.\n\nWspółczesna Gdynia oglądana z Kamiennej Góry ujawnia swoje warstwy: modernistyczne dziedzictwo, współczesne inwestycje, miejskie życie i otwarte morze. Ta panorama jest jednocześnie estetyczna i analityczna, bo pozwala dostrzec, jak miasto układa się w czasie i przestrzeni.\n\nW przyszłości wzgórze może stać się subtelnym miejskim obserwatorium, wyposażonym w lekkie interfejsy narracyjne, które nie dominują nad widokiem. Zamiast ekranów i hałasu pojawi się tu rozszerzona percepcja: cicha, zintegrowana i świadomie luksusowa.",
    coordinates: { lng: 18.5458, lat: 54.5144 },
    tags: ["panorama", "topografia", "obserwacja"],
    accent: "from-teal-200/70 via-sky-300/50 to-indigo-400/70",
    facts: [
      { label: "Warstwa czasu", value: "miejski punkt widokowy" },
      { label: "Motyw", value: "czytanie panoramy" },
      { label: "Potencjał 2126", value: "obserwatorium rozszerzone" },
    ],
    images: {
      "1926": "https://picsum.photos/seed/gdynia-kamienna-1926/1600/1000",
      "2026": "https://picsum.photos/seed/gdynia-kamienna-2026/1600/1000",
      "2126": "https://picsum.photos/seed/gdynia-kamienna-2126/1600/1000",
    },
  },
  {
    id: "bulwar-nadmorski",
    name: "Bulwar Nadmorski",
    district: "Wzgórze Św. Maksymiliana",
    shortDescription:
      "Rytmiczna linia spacerowa, w której codzienne życie miasta styka się bezpośrednio z energią morza.",
    lead:
      "Bulwar Nadmorski to sekwencja ruchu, światła i oddechu. Jest demokratyczny, otwarty i bardzo gdyński w swojej prostocie.",
    article:
      "W historycznym rozwoju miasta przestrzenie przybrzeżne budowały jego wspólny rytm. Bulwar, nawet jeśli nie zawsze w obecnym kształcie, wyrasta z tej samej potrzeby: by morze nie było tylko widokiem, ale elementem codziennego życia. To linia, która porządkuje relację mieszkańców z brzegiem.\n\nDzisiaj Bulwar jest jednym z najbardziej użytkowanych fragmentów Gdyni. Biegnie nim rekreacja, towarzyskość, poranne światło i wieczorny chłód. To przestrzeń o bardzo wysokiej intensywności, a jednocześnie zaskakująco spokojna dzięki prostemu układowi i otwartemu horyzontowi.\n\nW roku 2126 Bulwar mógłby ewoluować w inteligentny pas klimatyczny: z retencją, energooszczędnym oświetleniem, biodynamiczną zielenią i powierzchniami reagującymi na pogodę. Nadal pozostałby jednak miejscem spaceru. Technologia byłaby tutaj tłem, nie widowiskiem.",
    coordinates: { lng: 18.5539, lat: 54.5035 },
    tags: ["spacer", "linia brzegowa", "codzienność"],
    accent: "from-cyan-200/80 via-sky-200/50 to-blue-400/80",
    facts: [
      { label: "Warstwa czasu", value: "pas życia nad morzem" },
      { label: "Motyw", value: "ruch i oddech miasta" },
      { label: "Potencjał 2126", value: "infrastruktura klimatyczna" },
    ],
    images: {
      "1926": "https://picsum.photos/seed/gdynia-bulwar-1926/1600/1000",
      "2026": "https://picsum.photos/seed/gdynia-bulwar-2026/1600/1000",
      "2126": "https://picsum.photos/seed/gdynia-bulwar-2126/1600/1000",
    },
  },
];
