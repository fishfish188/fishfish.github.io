import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ExplorationFileManager } from "../../components/ExplorationFileManager/ExplorationFileManager";
import { ExplorationGalleryOverlay } from "../../components/ExplorationGalleryOverlay/ExplorationGalleryOverlay";
import { explorationFolders, type ExplorationFolderData } from "../../data/exploration";
import type { I18nCopy } from "../../data/i18n";
import "./ExplorationSection.css";

export function ExplorationSection({ copy: _copy }: { copy: I18nCopy }) {
  const [activeGallery, setActiveGallery] = useState<ExplorationFolderData | null>(null);
  const contactTransitionRef = useRef<HTMLDivElement | null>(null);
  const contactTransitionActiveRef = useRef(false);

  const playContactTransition = () => {
    const transition = contactTransitionRef.current;
    const computer = transition?.querySelector<HTMLElement>(".exploration-contact-computer");
    const windowFrame = transition?.querySelector<HTMLElement>(".exploration-contact-window");
    if (!transition || !computer || !windowFrame || contactTransitionActiveRef.current) return;

    contactTransitionActiveRef.current = true;
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));
    window.dispatchEvent(new CustomEvent("portfolio:transition-side-navigation", { detail: false }));
    gsap.killTweensOf([transition, computer, windowFrame]);
    gsap.set(transition, { autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(computer, {
      autoAlpha: 1,
      height: 1234.71,
      left: -308,
      top: -183.02,
      transformOrigin: "640px 358.5px",
      width: 1895,
    });
    gsap.set(windowFrame, { autoAlpha: 0 });

    gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "contact" }));
        window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: true }));
        window.history.replaceState(null, "", "#contact");
        gsap.set(transition, { pointerEvents: "none" });
        contactTransitionActiveRef.current = false;
      },
    })
      .to(computer, {
        duration: 0.8,
        height: 804.68,
        left: 22,
        top: 32,
        width: 1235,
      }, 0)
      .to(windowFrame, { autoAlpha: 1, duration: 0.36 }, 0.8);
  };

  const showContactTransitionDirect = () => {
    const transition = contactTransitionRef.current;
    const computer = transition?.querySelector<HTMLElement>(".exploration-contact-computer");
    const windowFrame = transition?.querySelector<HTMLElement>(".exploration-contact-window");
    const explorationSection = document.getElementById("exploration");
    if (!transition || !computer || !windowFrame) return;

    contactTransitionActiveRef.current = false;
    window.scrollTo({ top: explorationSection?.offsetTop ?? 0, behavior: "auto" });
    gsap.killTweensOf([transition, computer, windowFrame]);
    gsap.set(transition, { autoAlpha: 1, pointerEvents: "none" });
    gsap.set(computer, {
      autoAlpha: 1,
      height: 804.68,
      left: 22,
      top: 32,
      transformOrigin: "640px 358.5px",
      width: 1235,
    });
    gsap.set(windowFrame, { autoAlpha: 1 });
    window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "contact" }));
    window.dispatchEvent(new CustomEvent("portfolio:show-contact-layer", { detail: true }));
    window.history.replaceState(null, "", "#contact");
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (window.location.hash !== "#exploration" || activeGallery) return;

      event.preventDefault();
      if (event.deltaY <= 0) {
        return;
      }

      playContactTransition();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    const handleContactLayer = (event: Event) => {
      const isOpen = Boolean((event as CustomEvent<boolean>).detail);
      if (!isOpen && contactTransitionRef.current) {
        gsap.set(contactTransitionRef.current, { autoAlpha: 0, pointerEvents: "none" });
      }
    };

    const handleDirectContactTransition = () => {
      const explorationSection = document.getElementById("exploration");
      window.scrollTo({ top: explorationSection?.offsetTop ?? 0, behavior: "auto" });
      window.requestAnimationFrame(playContactTransition);
    };

    window.addEventListener("portfolio:show-contact-layer", handleContactLayer);
    window.addEventListener("portfolio:navigate-contact-transition", handleDirectContactTransition);
    window.addEventListener("portfolio:navigate-contact-direct", showContactTransitionDirect);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("portfolio:show-contact-layer", handleContactLayer);
      window.removeEventListener("portfolio:navigate-contact-transition", handleDirectContactTransition);
      window.removeEventListener("portfolio:navigate-contact-direct", showContactTransitionDirect);
    };
  }, [activeGallery]);

  return (
    <section className="exploration-section" id="exploration" aria-label="个人探索">
      <div className="exploration-file-shell">
        <ExplorationFileManager
          folders={explorationFolders}
          onOpenGallery={setActiveGallery}
        />
      </div>
      {activeGallery ? (
        <ExplorationGalleryOverlay folder={activeGallery} onClose={() => setActiveGallery(null)} />
      ) : null}
      <div className="exploration-contact-transition" ref={contactTransitionRef} aria-hidden="true">
        <img className="exploration-contact-computer" src="/assets/custom-computer/contact-computer.png" alt="" />
        <img className="exploration-contact-window" src="/assets/figwright-contact/2229-2222.png" alt="" />
      </div>
    </section>
  );
}
