import { useEffect, useState, type MouseEvent } from "react";
import type { I18nCopy, Locale } from "../../data/i18n";

type HeaderProps = {
  copy: I18nCopy;
  locale: Locale;
  onToggleLocale: () => void;
};

const navItems = [
  ["home", "home"],
  ["about", "about"],
  ["ai", "ai"],
  ["uxui", "uxui"],
  ["exploration", "exploration"],
  ["contact", "contact"],
] as const;

export function Header({ copy, locale, onToggleLocale }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number][0]>("home");

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    target: (typeof navItems)[number][1],
  ) => {
    event.preventDefault();

    if (target === "home") {
      document.body.classList.add("is-home-scroll-locked");
      window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: false }));
      window.dispatchEvent(new Event("portfolio:navigate-home-direct"));
      window.history.replaceState(null, "", "#home");
      setActiveSection("home");
      return;
    }

    if (target === "about") {
      window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: false }));
      window.dispatchEvent(new Event("portfolio:navigate-about-direct", { cancelable: true }));
      window.history.replaceState(null, "", "#about");
      setActiveSection("about");
      return;
    }

    if (target === "contact") {
      document.body.classList.remove("is-home-scroll-locked");
      window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));
      window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: false }));
      window.dispatchEvent(new Event("portfolio:navigate-contact-direct"));
      setActiveSection(target);
      return;
    }

    document.body.classList.remove("is-home-scroll-locked");
    window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: false }));
    window.dispatchEvent(new CustomEvent("portfolio:navigate-content-direct", { detail: target }));
    window.history.replaceState(null, "", `#${target}`);
    if (target !== "uxui") {
      document.getElementById(target)?.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setActiveSection(target);
  };

  useEffect(() => {
    const sectionIds = navItems.map(([, target]) => target);

    const handleActiveSection = (event: Event) => {
      const sectionId = (event as CustomEvent<string>).detail;
      if (sectionIds.includes(sectionId as (typeof sectionIds)[number])) {
        setActiveSection(sectionId as (typeof navItems)[number][0]);
      }
    };

    const updateActiveSection = () => {
      if (window.location.hash === "#contact") {
        setActiveSection("contact");
        return;
      }

      if (window.scrollY <= 10) {
        setActiveSection("home");
        return;
      }

      const hash = window.location.hash.replace("#", "");
      if (sectionIds.includes(hash as (typeof sectionIds)[number])) {
        setActiveSection(hash as (typeof navItems)[number][0]);
        return;
      }

      const current = sectionIds.reduce(
        (closest, sectionId) => {
          const element = document.getElementById(sectionId === "uxui" ? "uxui-exploration" : sectionId);
          if (!element) {
            return closest;
          }

          const distance = Math.abs(element.getBoundingClientRect().top - 64);
          return distance < closest.distance ? { id: sectionId, distance } : closest;
        },
        { id: "home", distance: Number.POSITIVE_INFINITY },
      );

      setActiveSection(current.id as (typeof navItems)[number][0]);
    };

    updateActiveSection();
    window.addEventListener("portfolio:active-section", handleActiveSection);
    window.addEventListener("hashchange", updateActiveSection);
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("portfolio:active-section", handleActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, []);

  return (
    <header
      id="top-navbar"
      className={`site-header ${activeSection === "home" ? "" : "is-hidden-outside-home"}`}
      aria-label={locale === "zh" ? "主导航" : "Primary navigation"}
    >
      <a className="site-brand" href="#home" aria-label="YUYIMIAO home">
        {copy.brand}
      </a>
      <nav className="site-nav">
        {navItems.map(([key, target]) => (
          <a
            className={`nav-link ${key === activeSection ? "is-active" : ""}`}
            href={`#${target}`}
            key={key}
            onClick={(event) => handleNavClick(event, target)}
          >
            {copy.nav[key]}
          </a>
        ))}
      </nav>
      <button className="language-toggle" type="button" onClick={onToggleLocale}>
        <span className={locale === "zh" ? "is-current" : ""}>中</span>
        <span aria-hidden="true">/</span>
        <span className={locale === "en" ? "is-current" : ""}>EN</span>
      </button>
    </header>
  );
}
