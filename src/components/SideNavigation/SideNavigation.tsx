import { useEffect, useState, type MouseEvent } from "react";
import type { I18nCopy } from "../../data/i18n";

const sideNavItems = [
  ["home", "home", "首页"],
  ["about", "about"],
  ["ai", "ai"],
  ["uxui", "uxui", "UX/UI"],
  ["exploration", "exploration"],
  ["contact", "contact"],
] as const;

export function SideNavigation({ copy }: { copy: I18nCopy }) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [contactLayerOpen, setContactLayerOpen] = useState(false);
  const [transitionHidden, setTransitionHidden] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, target: (typeof sideNavItems)[number][1]) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));

    if (target === "home") {
      document.body.classList.add("is-home-scroll-locked");
      window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: false }));
      window.dispatchEvent(new Event("portfolio:navigate-home-direct"));
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
      setActiveSection("contact");
      return;
    }

    document.body.classList.remove("is-home-scroll-locked");
    window.dispatchEvent(new CustomEvent("portfolio:navigate-content-direct", { detail: target }));
    window.history.replaceState(null, "", `#${target}`);
    window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: false }));

    if (target !== "uxui") {
      document.getElementById(target)?.scrollIntoView({ behavior: "auto", block: "start" });
    }

    setActiveSection(target);
  };

  useEffect(() => {
    const sectionIds = ["home", ...sideNavItems.map(([, target]) => target)];
    const scrollSectionIds = ["ai", "uxui", "exploration", "contact"];
    let animationFrame = 0;

    const handleActiveSection = (event: Event) => {
      const sectionId = (event as CustomEvent<string>).detail;
      if (sectionIds.includes(sectionId)) {
        setActiveSection(sectionId);
      }
    };

    const updateActiveSection = () => {
      if (contactLayerOpen || window.location.hash === "#contact") {
        setActiveSection("contact");
        return;
      }

      if (window.scrollY <= 10 && window.location.hash !== "#about") {
        setActiveSection("home");
        return;
      }

      if (window.scrollY <= 10 && window.location.hash === "#about") {
        setActiveSection("about");
        return;
      }

      const viewportAnchor = Math.round(window.innerHeight * 0.5);
      let currentSection = activeSection;

      for (const sectionId of scrollSectionIds) {
        const section = document.getElementById(sectionId === "uxui" ? "uxui-exploration" : sectionId);
        if (!section) {
          continue;
        }

        const box = section.getBoundingClientRect();
        if (box.top <= viewportAnchor && box.bottom >= viewportAnchor) {
          currentSection = sectionId;
          break;
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    const scheduleActiveSectionUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const updateActiveSectionFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
        return;
      }

      updateActiveSection();
    };

    updateActiveSection();
    window.addEventListener("portfolio:active-section", handleActiveSection);
    const handleContactLayer = (event: Event) => {
      const isOpen = Boolean((event as CustomEvent<boolean>).detail);
      setContactLayerOpen(isOpen);
      if (isOpen) {
        setActiveSection("contact");
      }
    };
    const handleTransitionNavigation = (event: Event) => {
      setTransitionHidden(Boolean((event as CustomEvent<boolean>).detail));
    };

    window.addEventListener("portfolio:show-contact-layer", handleContactLayer);
    window.addEventListener("portfolio:transition-side-navigation", handleTransitionNavigation);
    window.addEventListener("hashchange", updateActiveSectionFromHash);
    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("portfolio:active-section", handleActiveSection);
      window.removeEventListener("portfolio:show-contact-layer", handleContactLayer);
      window.removeEventListener("portfolio:transition-side-navigation", handleTransitionNavigation);
      window.removeEventListener("hashchange", updateActiveSectionFromHash);
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
    };
  }, [activeSection, contactLayerOpen]);

  return (
    <nav className={`side-navigation ${transitionHidden ? "is-hidden" : ""}`} aria-label="页面侧边导航">
      {sideNavItems.map(([key, target, label]) => (
        <a
          className={`side-navigation-link ${activeSection === target ? "is-active" : ""}`}
          href={`#${target}`}
          key={target}
          onClick={(event) => handleClick(event, target)}
        >
          {label ?? copy.nav[key]}
        </a>
      ))}
    </nav>
  );
}
