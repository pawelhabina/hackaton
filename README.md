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
- futurystyczną, interaktywną mapę Gdyni z 6 hotspotami
- panel szczegółów miejsca z przełącznikiem `1926 / 2026 / 2126`
- sekcję kart lokalizacji, efektowną timeline i część wizjonerską
- dane miejsc wydzielone do osobnego pliku
- placeholdery obrazów gotowe do podmiany na właściwe materiały

## Placeholdery

Obrazy w `src/data/locations.ts` korzystają z deterministycznych placeholderów `picsum.photos`, więc można je łatwo wymienić na prawdziwe fotografie historyczne, współczesne i wizualizacje przyszłości.

## Mapa

Interaktywna mapa używa `Leaflet` oraz kafli `Stadia Maps Alidade Smooth Dark`.

- lokalnie (`localhost`) działa od razu
- przy publicznym deployu warto skonfigurować autoryzację domeny w Stadia Maps albo podmienić źródło kafli na własne
