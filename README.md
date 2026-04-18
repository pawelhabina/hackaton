# Gdynia 2126

Efektowny frontend hackathonowy zbudowany w `React + TypeScript + Tailwind CSS + Motion`, prezentujący Gdynię w trzech wymiarach czasu: `1926`, `2026` i `2126`.

## Uruchomienie

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
npm run preview
```

## Osobny frontend i API

Frontend i backend mogą działać na osobnych hostach.

Frontend:

```bash
VITE_API_BASE_URL=https://api.twoja-domena.pl npm run build
```

Po buildzie wrzuć zawartość `dist/` na hosting statyczny.

API:

```bash
GEMINI_API_KEY=...
CORS_ALLOW_ORIGIN=https://twoja-domena.pl
PORT=8787
npm start
```

Uwagi:

- `VITE_API_BASE_URL` jest wstrzykiwane podczas buildu frontendu
- `CORS_ALLOW_ORIGIN` może zawierać kilka domen rozdzielonych przecinkami
- backend obsługuje `PORT` i `CHAT_PORT`
- jeśli na serwerze API nie ma katalogu `dist/`, Express wystawi samo `/api/*`

## Struktura katalogów

```text
.
├── index.html
├── package.json
├── public
│   └── favicon.svg
├── src
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── components
│   │   ├── AmbientBackground.tsx
│   │   ├── Footer.tsx
│   │   ├── FutureVisionSection.tsx
│   │   ├── GdyniaMap.tsx
│   │   ├── HeroSection.tsx
│   │   ├── IntroSection.tsx
│   │   ├── LocationCards.tsx
│   │   ├── LocationDetailPanel.tsx
│   │   ├── Reveal.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── TimeStateSwitcher.tsx
│   │   └── TimelineSection.tsx
│   ├── data
│   │   ├── locations.ts
│   │   └── siteContent.ts
│   ├── hooks
│   │   └── usePointerGlow.ts
│   └── lib
│       └── types.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Co zawiera projekt

- pełnoekranowy hero z warstwowym tłem i CTA
- futurystyczną, interaktywną mapę Gdyni z 5 hotspotami
- panel szczegółów miejsca z przełącznikiem `1926 / 2026 / 2126`
- sekcję kart lokalizacji, efektowną timeline i część wizjonerską
- dane miejsc wydzielone do osobnego pliku
- lokalne obrazy i wizualizacje podpięte z katalogu `public/photos`

## Placeholdery

Obrazy w `src/data/locations.ts` korzystają z plików umieszczonych w `public/photos`, więc można je łatwo podmienić na inne fotografie historyczne, współczesne i wizualizacje przyszłości.

## Mapa

Interaktywna mapa używa `Leaflet` oraz kafli `Stadia Maps Alidade Smooth Dark`.

- lokalnie (`localhost`) działa od razu
- przy publicznym deployu warto skonfigurować autoryzację domeny w Stadia Maps albo podmienić źródło kafli na własne
