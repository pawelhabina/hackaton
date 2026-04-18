const partnerLogos = [
  {
    src: "/seabyte-full-logo.svg",
    alt: "SeaByte",
    href: "https://seabyte.pl/",
    className: "h-10 w-auto md:h-12",
  },
  {
    src: "/young-smart-logo.png",
    alt: "Young Smart",
    href: "https://hackathon.17logdynia.pl/",
    className: "h-12 w-auto md:h-14",
  },
  {
    src: "/zst-sopot-logo.jpeg",
    alt: "ZST Sopot",
    href: "https://zstsopot.edupage.org/",
    className: "h-12 w-auto md:h-14",
  },
  {
    src: "/logo_100gdynia.svg",
    alt: "Gdynia 100",
    href: "https://100.gdynia.pl/pl",
    className: "h-12 w-auto invert md:h-14",
  },
];

const photoSources = [
  "https://www.gdynia.pl/co-nowego,2774/zajrzyj-do-dawnej-gdyni,571178",
  "https://muzhp.pl/wiedza-on-line/stulecie-gdyni-miasta-z-morza-i-marzen",
  "https://www.reddit.com/r/ArchitecturalRevival/comments/1j06omg/gdynia_główna_railway_station_in_gdynia_poland/",
];

const authors = ["Paweł Habina", "Liwia Ryżakow", "Kacper Krzeszowski"];

export function Footer() {
  return (
    <footer className="section-shell px-4 pb-10 pt-8 md:px-8 lg:px-10">
      <div className="glass-panel px-6 py-6 md:px-8 md:py-8">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div>
              <div className="text-sm uppercase tracking-[0.28em] text-slate-400">
                Partnerzy i zespół projektu
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Projekt powstał podczas 6. edycji hackathonu w Liceum nr 17 w
                Gdyni i prezentuje wizję miasta zestawioną z jego przeszłością
                oraz teraźniejszością.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
              {partnerLogos.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center">
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition duration-200 hover:opacity-85"
                    aria-label={logo.alt}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={logo.className}
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 text-sm text-slate-300">
            <div className="space-y-2">
              <h3 className="font-semibold uppercase tracking-[0.18em] text-slate-100">
                Autorzy projektu
              </h3>
              <p className="leading-7">{authors.join(", ")}</p>
              <p className="leading-7">
                Opiekun projektu: <span className="text-slate-100">Wanesa Brutel</span>
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold uppercase tracking-[0.18em] text-slate-100">
                Źródła zdjęć
              </h3>
              <ul className="grid gap-2 leading-6 text-slate-300">
                {photoSources.map((source, index) => (
                  <li key={source}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-cyan-200"
                    >
                      Źródło {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Gdynia 2126
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
