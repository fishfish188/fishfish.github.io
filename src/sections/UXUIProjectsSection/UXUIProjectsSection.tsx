import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExplorationFileManager } from "../../components/ExplorationFileManager/ExplorationFileManager";
import { ExplorationGalleryOverlay } from "../../components/ExplorationGalleryOverlay/ExplorationGalleryOverlay";
import { explorationFolders, type ExplorationFolderData } from "../../data/exploration";
import type { I18nCopy } from "../../data/i18n";

gsap.registerPlugin(ScrollTrigger);

export function UXUIProjectsSection({ copy: _copy }: { copy: I18nCopy }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const lockScrollYRef = useRef<number | null>(null);
  const isWindowExpandedRef = useRef(false);
  const [isWindowExpanded, setIsWindowExpanded] = useState(false);
  const [activeGallery, setActiveGallery] = useState<ExplorationFolderData | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const context = gsap.context(() => {
      const section = sectionRef.current;
      const computer = section?.querySelector<HTMLElement>(".ux-exploration-computer");
      const uxTitle = section?.querySelector<HTMLElement>(".ux-exploration-ux-title");
      const title = section?.querySelector<HTMLElement>(".ux-exploration-title");
      const fileWindow = section?.querySelector<HTMLElement>(".ux-exploration-file-window");
      const click = section?.querySelector<HTMLElement>(".ux-exploration-click-note");
      const windowHotspot = section?.querySelector<HTMLElement>(".ux-exploration-window-hotspot");

      if (!section || !computer || !uxTitle || !title || !fileWindow || !click || !windowHotspot) return;

      gsap.set(computer, {
        autoAlpha: 1,
        height: 780,
        left: "calc(50% - 1365px / 2 - 0.5px)",
        top: "calc(50% - 780px / 2)",
        transformOrigin: "640px 358.5px",
        width: 1365,
      });
      gsap.set(uxTitle, { autoAlpha: 1, left: 290, top: 309 });
      gsap.set(title, { autoAlpha: 0, y: 452 });
      gsap.set(click, { autoAlpha: 0, y: 214 });
      gsap.set([fileWindow, windowHotspot], { autoAlpha: 0, y: 166 });
      gsap.set(windowHotspot, { pointerEvents: "none" });

      ScrollTrigger.create({
        id: "uxui-entry-fade",
        trigger: section,
        start: "top 78%",
        onEnter: () => {
          if (window.location.hash === "#uxui") return;

          gsap.killTweensOf([computer, uxTitle]);
          gsap.fromTo(
            [computer, uxTitle],
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
          );
        },
      });

      gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          id: "uxui-to-exploration",
          trigger: section,
          start: "top top",
          end: "+=1100",
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set(document.getElementById("ai"), { autoAlpha: 0, pointerEvents: "none" });
          },
          onLeaveBack: () => {
            gsap.set(document.getElementById("ai"), { autoAlpha: 1, pointerEvents: "auto" });
          },
          onUpdate: (self) => {
            progressRef.current = self.progress;
            if (self.progress >= 0.98 && window.location.hash !== "#uxui") {
              window.history.replaceState(null, "", "#uxui");
            }
            lockScrollYRef.current = self.progress >= 0.98 ? self.end : null;
          },
        },
      })
        .to(computer, {
          duration: 0.82,
          height: 910.31,
          left: "calc(50% - 1557.19px / 2 - 5.6px)",
          top: "calc(50% - 910.31px / 2 - 5.5px)",
          width: 1557.19,
        }, 0)
        .to(uxTitle, { duration: 0.82, top: -145 }, 0)
        .to(title, { autoAlpha: 1, duration: 0.62, y: 0 }, 0.34)
        .to([fileWindow, windowHotspot], { autoAlpha: 1, duration: 0.72, y: 0 }, 0.42)
        .set(windowHotspot, { pointerEvents: "auto" }, 1.04)
        .to(click, { autoAlpha: 1, duration: 0.58, y: 0 }, 0.52);
    }, sectionRef);

    const preventScrollPastWindow = (event: WheelEvent) => {
      if (window.location.hash === "#uxui" && progressRef.current >= 0.98 && event.deltaY > 0) {
        event.preventDefault();
        if (lockScrollYRef.current !== null) {
          window.scrollTo({ top: lockScrollYRef.current, behavior: "auto" });
        }
      }
    };

    const keepWindowLocked = () => {
      if (window.location.hash === "#uxui" && lockScrollYRef.current !== null && window.scrollY > lockScrollYRef.current) {
        window.scrollTo({ top: lockScrollYRef.current, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", preventScrollPastWindow, { passive: false });
    window.addEventListener("scroll", keepWindowLocked, { passive: true });

    const handleExplorationRollback = (event: WheelEvent) => {
      if (!isWindowExpandedRef.current || window.location.hash !== "#exploration" || event.deltaY >= 0) return;

      const section = sectionRef.current;
      const fileWindow = section?.querySelector<HTMLElement>(".ux-exploration-file-window");
      const click = section?.querySelector<HTMLElement>(".ux-exploration-click-note");
      const title = section?.querySelector<HTMLElement>(".ux-exploration-title");
      const hotspot = section?.querySelector<HTMLElement>(".ux-exploration-window-hotspot");
      if (!fileWindow || !click || !title || !hotspot) return;

      event.preventDefault();
      isWindowExpandedRef.current = false;
      setIsWindowExpanded(false);
      window.history.replaceState(null, "", "#uxui");
      window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "uxui" }));
      gsap.killTweensOf([fileWindow, click, title, hotspot]);
      gsap.to(fileWindow, {
        duration: 0.5,
        ease: "power3.inOut",
        height: 713,
        left: 795,
        top: 631,
        width: 1216,
        y: 0,
      });
      gsap.to([click, title], { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
      gsap.set(hotspot, { pointerEvents: "auto" });
    };

    window.addEventListener("wheel", handleExplorationRollback, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScrollPastWindow);
      window.removeEventListener("scroll", keepWindowLocked);
      window.removeEventListener("wheel", handleExplorationRollback);
      context.revert();
    };
  }, []);

  const openExploration = () => {
    if (isWindowExpanded) return;

    const section = sectionRef.current;
    const fileWindow = section?.querySelector<HTMLElement>(".ux-exploration-file-window");
    const click = section?.querySelector<HTMLElement>(".ux-exploration-click-note");
    const title = section?.querySelector<HTMLElement>(".ux-exploration-title");
    const hotspot = section?.querySelector<HTMLElement>(".ux-exploration-window-hotspot");

    if (!fileWindow || !click || !title || !hotspot) return;

    setIsWindowExpanded(true);
    isWindowExpandedRef.current = true;
    gsap.killTweensOf([fileWindow, click, title, hotspot]);
    gsap.set(hotspot, { pointerEvents: "none" });
    gsap.to([click, title], { autoAlpha: 0, duration: 0.18, ease: "power2.out" });
    gsap.to(fileWindow, {
      duration: 0.72,
      ease: "power3.inOut",
      height: 713,
      left: 32,
      top: 36,
      width: 1216,
      y: 0,
      onComplete: () => {
        window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "exploration" }));
        window.history.replaceState(null, "", "#exploration");
      },
    });
  };

  return (
    <section className="uxui-section" id="uxui-exploration" aria-label="转场 UX/UI项目-个人探索" ref={sectionRef}>
      <div className="ux-exploration-transition">
        <div className="ux-exploration-computer" aria-hidden="true">
          <img className="ux-exploration-computer-screen" src="/assets/custom-computer/computer-screen.png" alt="" />
        </div>
        <div className="ux-exploration-ux-title" aria-hidden="true">UX/UI项目</div>
        <div className="ux-exploration-title">持续更新中 ...</div>
        <div className="ux-exploration-click-note" aria-hidden="true">
          <span>点击此处</span>
          <svg viewBox="0 0 67 22" focusable="false">
            <path d="M1 1 C20 7, 37 8, 64 20" />
            <path d="M58 13 L65 20 L55 20" />
          </svg>
        </div>
        <div className={`ux-exploration-file-window ${isWindowExpanded ? "is-expanded" : ""}`}>
          <ExplorationFileManager
            folders={explorationFolders}
            onOpenGallery={setActiveGallery}
          />
        </div>
        <button className="ux-exploration-window-hotspot" type="button" aria-label="进入个人探索" onClick={openExploration} />
      </div>
      {activeGallery ? (
        <ExplorationGalleryOverlay folder={activeGallery} onClose={() => setActiveGallery(null)} />
      ) : null}
    </section>
  );
}
