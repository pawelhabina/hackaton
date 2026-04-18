import { useEffect, useRef, useState } from "react";
import { AmbientBackground } from "./components/AmbientBackground";
import { ClickSpark } from "./components/ClickSpark";
import { Footer } from "./components/Footer";
import { FutureVisionSection } from "./components/FutureVisionSection";
import { GdyniaMap } from "./components/GdyniaMap";
import { HeroSection } from "./components/HeroSection";
import { IntroOverlay } from "./components/IntroOverlay";
import { IntroSection } from "./components/IntroSection";
import { LocationCards } from "./components/LocationCards";
import { Reveal } from "./components/Reveal";
import { SectionHeading } from "./components/SectionHeading";
import { TimelineSection } from "./components/TimelineSection";
import { locations } from "./data/locations";
import { usePointerGlow } from "./hooks/usePointerGlow";
import { TimeKey } from "./lib/types";

function App() {
  usePointerGlow();

  const mapSectionRef = useRef<HTMLElement | null>(null);
  const cardsSectionRef = useRef<HTMLElement | null>(null);

  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [activeTime, setActiveTime] = useState<TimeKey>("2126");
  const [showIntroOverlay, setShowIntroOverlay] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = showIntroOverlay ? "hidden" : previousOverflow;

    if (!showIntroOverlay) {
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    const timeoutId = window.setTimeout(() => {
      setShowIntroOverlay(false);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntroOverlay]);

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToCards = () => {
    cardsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpenLocation = (locationId: string) => {
    setActiveLocationId(locationId);
    scrollToMap();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ClickSpark
        sparkColor="#d7fbff"
        sparkSize={15}
        sparkRadius={46}
        sparkCount={11}
        duration={560}
        easing="ease-out"
        extraScale={1.1}
      >
        <IntroOverlay isVisible={showIntroOverlay} />
        <AmbientBackground />

        <main className="relative z-10">
          <HeroSection
            onExploreMap={scrollToMap}
            onExploreLocations={scrollToCards}
            startCountUp={!showIntroOverlay}
          />
          <IntroSection />

          <section ref={mapSectionRef} className="px-4 py-24 md:px-8 lg:px-10">
            <Reveal className="section-shell">
              <SectionHeading
                eyebrow="Interaktywna mapa"
                title="Najważniejsza warstwa projektu: jedna szeroka plansza miasta"
                body="Mapa zajmuje całą szerokość sekcji. Po kliknięciu pinezki pokazują się podstawowe informacje i przycisk do pełnych szczegółów w modalu. Zmiana przełącznika czasu aktualizuje obraz oraz narrację wybranego punktu Gdyni."
              />
            </Reveal>

            <Reveal delay={0.05} className="mt-14">
              <GdyniaMap
                locations={locations}
                activeLocationId={activeLocationId}
                activeTime={activeTime}
                onSelectLocation={setActiveLocationId}
                onTimeChange={setActiveTime}
                onClearSelection={() => setActiveLocationId(null)}
              />
            </Reveal>
          </section>

          <section ref={cardsSectionRef}>
            <LocationCards
              locations={locations}
              activeLocationId={activeLocationId}
              onOpenLocation={handleOpenLocation}
            />
          </section>

          <TimelineSection />
          <FutureVisionSection />
          <Footer />
        </main>
      </ClickSpark>
    </div>
  );
}

export default App;
