import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header/Header";
import { SideNavigation } from "./components/SideNavigation/SideNavigation";
import { HomeSection } from "./sections/HomeSection/HomeSection";
import { AIProjectsSection } from "./sections/AIProjectsSection/AIProjectsSection";
import { UXUIProjectsSection } from "./sections/UXUIProjectsSection/UXUIProjectsSection";
import { ExplorationSection } from "./sections/ExplorationSection/ExplorationSection";
import { ContactSection } from "./sections/ContactSection/ContactSection";
import { i18n, type Locale } from "./data/i18n";

export default function App() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [contactVisible, setContactVisible] = useState(false);
  const copy = useMemo(() => i18n[locale], [locale]);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#home");
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleContactLayer = (event: Event) => {
      setContactVisible(Boolean((event as CustomEvent<boolean>).detail));
    };

    const handleActiveSection = (event: Event) => {
      const sectionId = (event as CustomEvent<string>).detail;
      if (sectionId !== "contact") {
        setContactVisible(false);
      }
    };

    window.addEventListener("portfolio:show-contact-layer", handleContactLayer);
    window.addEventListener("portfolio:active-section", handleActiveSection);

    return () => {
      window.removeEventListener("portfolio:show-contact-layer", handleContactLayer);
      window.removeEventListener("portfolio:active-section", handleActiveSection);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-contact-layer-open", contactVisible);
  }, [contactVisible]);

  const toggleLocale = () => setLocale((value) => (value === "zh" ? "en" : "zh"));

  return (
    <div className="app-shell" lang={locale === "zh" ? "zh-CN" : "en"}>
      <Header copy={copy} locale={locale} onToggleLocale={toggleLocale} />
      <SideNavigation copy={copy} />
      <main className="scroll-container">
        <HomeSection copy={copy} />
        <AIProjectsSection copy={copy} />
        <UXUIProjectsSection copy={copy} />
        <ExplorationSection copy={copy} />
      </main>
      <ContactSection copy={copy} isVisible={contactVisible} />
    </div>
  );
}
