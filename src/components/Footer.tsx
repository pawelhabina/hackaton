export function Footer() {
  return (
    <footer className="section-shell px-4 pb-10 pt-8 md:px-8 lg:px-10">
      <div className="glass-panel flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Gdynia 2126
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Projekt koncepcyjny przygotowany na hackathon. Obrazy są
            placeholderami gotowymi do wymiany na materiały historyczne,
            współczesne i futurystyczne wizualizacje miejsc.
          </p>
        </div>

        <div className="grid gap-1 text-sm text-slate-300 md:text-right">
          <span>Autorzy projektu: zespół hackathonowy</span>
          <span>Źródła zdjęć: placeholdery `picsum.photos`</span>
          <span>Frontend: React + Tailwind CSS + Motion</span>
        </div>
      </div>
    </footer>
  );
}
