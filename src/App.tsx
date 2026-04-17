import { useEffect, useRef, useState } from "react";
import { LayoutGroup } from "motion/react";
import { AmbientBackground } from "./components/AmbientBackground";
import { Footer } from "./components/Footer";
import { FutureVisionSection } from "./components/FutureVisionSection";
import { GdyniaMap } from "./components/GdyniaMap";
import { HeroSection } from "./components/HeroSection";
import { IntroOverlay } from "./components/IntroOverlay";
import { IntroSection } from "./components/IntroSection";
import { LocationCards } from "./components/LocationCards";
import { LocationDetailPanel } from "./components/LocationDetailPanel";
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

  const [activeLocationId, setActiveLocationId] = useState<string>(locations[0].id);
  const [activeTime, setActiveTime] = useState<TimeKey>("2126");
  const [showIntroOverlay, setShowIntroOverlay] = useState(true);

  const activeLocation =
    locations.find((location) => location.id === activeLocationId) ?? locations[0];

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
      <IntroOverlay isVisible={showIntroOverlay} />
      <AmbientBackground />

      <main className="relative z-10">
        <HeroSection onExploreMap={scrollToMap} onExploreLocations={scrollToCards} />
        <IntroSection />

        <section
          ref={mapSectionRef}
          className="section-shell px-4 py-24 md:px-8 lg:px-10"
        >
          <Reveal>
            <SectionHeading
              eyebrow="Interaktywna mapa"
              title="Najważniejsza warstwa projektu: futurystyczna plansza miasta"
              body="Kliknij pinezkę na mapie, aby otworzyć panel konkretnego miejsca. Zmiana przełącznika czasu aktualizuje obraz oraz narrację wybranego punktu Gdyni."
            />
          </Reveal>

          <LayoutGroup>
            <div className="mt-14 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <Reveal delay={0.05}>
                <GdyniaMap
                  locations={locations}
                  activeLocationId={activeLocation.id}
                  activeTime={activeTime}
                  onSelectLocation={setActiveLocationId}
                />
              </Reveal>

              <Reveal delay={0.1}>
                <LocationDetailPanel
                  location={activeLocation}
                  activeTime={activeTime}
                  onTimeChange={setActiveTime}
                />
              </Reveal>
            </div>
          </LayoutGroup>
        </section>

        <section ref={cardsSectionRef}>
          <LocationCards
            locations={locations}
            activeLocationId={activeLocation.id}
            onOpenLocation={handleOpenLocation}
          />
        </section>

        <TimelineSection />
        <FutureVisionSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
