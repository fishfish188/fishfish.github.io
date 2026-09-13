import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { I18nCopy } from "../../data/i18n";
import { AIOperationOverviewBoard } from "../../components/AIOperationOverviewBoard/AIOperationOverviewBoard";
import { AIProductDetailBoard } from "../../components/AIProductDetailBoard/AIProductDetailBoard";
import { AIPosterDetailBoard } from "../../components/AIPosterDetailBoard/AIPosterDetailBoard";
import { AIBrandDetailBoard } from "../../components/AIBrandDetailBoard/AIBrandDetailBoard";


const MARKETING_POSTER_ASSET_OVERRIDES: Record<string, string> = {
  '西瓜1-1': '/assets/marketing-poster/西瓜1-1.png',
  '西瓜1-2': '/assets/marketing-poster/西瓜1-2.png',
  '西瓜1-3': '/assets/marketing-poster/西瓜1-3.png',
  '位图': '/assets/marketing-poster/位图.png',
  '西瓜素材图1': '/assets/marketing-poster/西瓜素材图1.png',
  '西瓜素材图4': '/assets/marketing-poster/西瓜素材图4.png',
  '拉杆机1': '/assets/marketing-poster/拉杆机1.png',
  '拉杆机2': '/assets/marketing-poster/拉杆机2.png',
  '提示词1': '/assets/marketing-poster/提示词1.png',
  '提示词2': '/assets/marketing-poster/提示词2.png',
  '指引线': '/assets/marketing-poster/指引线.svg',
  '路径 21': '/assets/marketing-poster/路径 21.svg',
  '小卖部': '/assets/marketing-poster/小卖部.gif',
  '摇椅': '/assets/marketing-poster/摇椅.gif',
  '西瓜': '/assets/marketing-poster/西瓜.gif',
  '插花沙龙': '/assets/marketing-poster/插花沙龙.gif',
  '城市美食': '/assets/marketing-poster/城市美食.gif',
  '美食特色': '/assets/marketing-poster/城市美食.gif',
  '花2': '/assets/marketing-poster/花2.png',
};

const getMarketingPosterAssetSrc = (layer: any): string => {
  const name = String(layer?.label ?? layer?.name ?? layer?.title ?? layer?.alt ?? layer?.text ?? '');
  const keys = Object.keys(MARKETING_POSTER_ASSET_OVERRIDES).sort((a, b) => b.length - a.length);
  const matched = keys.find((key) => name.includes(key));
  return (matched ? MARKETING_POSTER_ASSET_OVERRIDES[matched] : undefined) ?? layer?.src ?? layer?.image ?? layer?.url ?? '';
};

gsap.registerPlugin(ScrollTrigger);

type FolderHoverState = "folder2" | "folder3" | "folder4" | "folder5" | null;

export function AIProjectsSection({ copy }: { copy: I18nCopy }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const productDetailRef = useRef<HTMLDivElement | null>(null);
  const posterDetailRef = useRef<HTMLDivElement | null>(null);
  const brandDetailRef = useRef<HTMLDivElement | null>(null);
  const operationOverviewRef = useRef<HTMLDivElement | null>(null);
  const noteHideTimerRef = useRef<number | null>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const phoneZoomTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const folderDetailTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const phoneZoomedRef = useRef(false);
  const folderDetailOpenRef = useRef(false);
  const [productDetailOpen, setProductDetailOpen] = useState(false);
  const [posterDetailOpen, setPosterDetailOpen] = useState(false);
  const [brandDetailOpen, setBrandDetailOpen] = useState(false);
  const [operationOverviewOpen, setOperationOverviewOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [folderHoverState, setFolderHoverState] = useState<FolderHoverState>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const clearNoteHideTimer = () => {
      if (noteHideTimerRef.current !== null) {
        window.clearTimeout(noteHideTimerRef.current);
        noteHideTimerRef.current = null;
      }
    };

    const setTransitionNoteState = (progress: number, direction: number) => {
      if (!sectionRef.current) return;

      const replaceHash = (hash: "#ai") => {
        if (window.location.hash !== hash) {
          window.history.replaceState(null, "", hash);
        }
      };

      if (progress <= 0.001) {
        clearNoteHideTimer();
        sectionRef.current.classList.remove("is-ai-note-hidden");
        sectionRef.current.classList.remove("is-uxui-active");
        replaceHash("#ai");
        window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "ai" }));
        return;
      }

      if (direction < 0 && progress <= 0.5) {
        clearNoteHideTimer();
        sectionRef.current.classList.remove("is-ai-note-hidden");
        return;
      }

      if (direction > 0 && !sectionRef.current.classList.contains("is-ai-note-hidden") && noteHideTimerRef.current === null) {
        noteHideTimerRef.current = window.setTimeout(() => {
          sectionRef.current?.classList.add("is-ai-note-hidden");
          noteHideTimerRef.current = null;
        }, 500);
      }
    };

    let playIntroEventHandler: (() => void) | null = null;

    const context = gsap.context(() => {
      const section = sectionRef.current;
      const title = section?.querySelector<HTMLElement>(".ai-title");

      if (!section || !title) return;

      const notebook = section.querySelector<HTMLElement>(".ai-bg-notebook");
      const phonePaper = section.querySelector<HTMLElement>(".ai-phone-paper");
      const phone = section.querySelector<HTMLElement>(".ai-phone");
      const paper = section.querySelector<HTMLElement>(".ai-paper");
      const folder = section.querySelector<HTMLElement>(".ai-folder");
      const penCup = section.querySelector<HTMLElement>(".ai-bg-pen-cup");
      const coffee = section.querySelector<HTMLElement>(".ai-bg-coffee");
      const leaves = section.querySelector<HTMLElement>(".ai-bg-leaves");
      const bg = section.querySelector<HTMLElement>(".ai-bg");
      const aiComputer = section.querySelector<HTMLElement>(".ai-transition-computer");
      const clickNotes = gsap.utils.toArray<HTMLElement>(".ai-click-note", section);
      const layers = [notebook, phonePaper, folder, penCup, coffee, leaves].filter(Boolean) as HTMLElement[];
      const introPositions = {
        aiComputer: { start: { left: -386, top: -697 }, end: { left: -227, top: -285 } },
        leaves: { start: { left: 390, top: -327 }, end: { left: 396, top: 0 } },
        coffee: { start: { left: 1087, top: -357 }, end: { left: 938, top: 0 } },
        penCup: { start: { left: 1389, top: 179 }, end: { left: 834, top: 410 } },
        folder: { start: { left: 1043, top: 745 }, end: { left: 1157, top: 184 } },
        phonePaper: { start: { left: -88, top: 780 }, end: { left: 69, top: 379 } },
        notebook: { start: { left: -319, top: 859 }, end: { left: 0, top: 554 } },
      };

      const setLayerPosition = (
        element: HTMLElement | null,
        position: { left: number; top: number },
        options: gsap.TweenVars = {},
      ) => {
        if (!element) return;
        gsap.set(element, {
          autoAlpha: 1,
          filter: "blur(0px)",
          left: position.left,
          rotation: 0,
          scale: 1,
          top: position.top,
          x: 0,
          y: 0,
          ...options,
        });
      };

      const setIntroStart = () => {
        section.classList.remove("is-ai-note-hidden");
        gsap.set(title, { autoAlpha: 0, filter: "blur(4px)", scale: 0.96, y: 0 });
        gsap.set(clickNotes, { autoAlpha: 0 });
        gsap.set(aiComputer, {
          autoAlpha: 1,
          filter: "blur(0px)",
          height: 697,
          left: introPositions.aiComputer.start.left,
          rotation: 0,
          scale: 1,
          top: introPositions.aiComputer.start.top,
          width: 662,
          x: 0,
          y: 0,
        });
        setLayerPosition(notebook, introPositions.notebook.start);
        setLayerPosition(phonePaper, introPositions.phonePaper.start);
        setLayerPosition(folder, introPositions.folder.start);
        setLayerPosition(penCup, introPositions.penCup.start);
        setLayerPosition(coffee, introPositions.coffee.start);
        setLayerPosition(leaves, introPositions.leaves.start);
        gsap.set([phone, paper], { autoAlpha: 0 });
        if (bg) {
          gsap.set(bg, { autoAlpha: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 });
        }
      };

      const setIntroEnd = () => {
        section.classList.remove("is-ai-note-hidden");
        gsap.set(title, { autoAlpha: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 });
        gsap.set(clickNotes, { autoAlpha: 1 });
        gsap.set(aiComputer, {
          autoAlpha: 1,
          filter: "blur(0px)",
          height: 697,
          left: introPositions.aiComputer.end.left,
          rotation: 0,
          scale: 1,
          top: introPositions.aiComputer.end.top,
          width: 662,
          x: 0,
          y: 0,
        });
        setLayerPosition(notebook, introPositions.notebook.end);
        setLayerPosition(phonePaper, introPositions.phonePaper.end);
        setLayerPosition(folder, introPositions.folder.end);
        setLayerPosition(penCup, introPositions.penCup.end);
        setLayerPosition(coffee, introPositions.coffee.end);
        setLayerPosition(leaves, introPositions.leaves.end);
        gsap.set([phone, paper], { autoAlpha: 0 });
        if (bg) {
          gsap.set(bg, { autoAlpha: 1, filter: "blur(0px)", scale: 1, x: 0, y: 0 });
        }
      };

      section.classList.remove("is-ai-note-hidden");
      section.classList.remove("is-uxui-active");
      setIntroEnd();

      const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        paused: true,
      });

      const playIntro = () => {
        if (folderDetailOpenRef.current || phoneZoomedRef.current) return;

        section.classList.remove("is-ai-note-hidden");
        gsap.killTweensOf([title, aiComputer, ...layers, ...clickNotes]);
        setIntroStart();
        introTimeline.restart();
      };

      introTimeline
        .set(title, { autoAlpha: 0, filter: "blur(4px)", scale: 0.96, y: 0 }, 0)
        .set(clickNotes, { autoAlpha: 0 }, 0)
        .set(aiComputer, {
          autoAlpha: 1,
          filter: "blur(0px)",
          height: 697,
          left: introPositions.aiComputer.start.left,
          rotation: 0,
          scale: 1,
          top: introPositions.aiComputer.start.top,
          width: 662,
          x: 0,
          y: 0,
        }, 0)
        .set(notebook, { autoAlpha: 1, left: introPositions.notebook.start.left, top: introPositions.notebook.start.top, rotation: 0, scale: 1, x: 0, y: 0 }, 0)
        .set(phonePaper, { autoAlpha: 1, left: introPositions.phonePaper.start.left, top: introPositions.phonePaper.start.top, rotation: 0, scale: 1, x: 0, y: 0 }, 0)
        .set([phone, paper], { autoAlpha: 0 }, 0)
        .set(folder, { autoAlpha: 1, left: introPositions.folder.start.left, top: introPositions.folder.start.top, rotation: 0, scale: 1, x: 0, y: 0 }, 0)
        .set(penCup, { autoAlpha: 1, left: introPositions.penCup.start.left, top: introPositions.penCup.start.top, rotation: 0, scale: 1, x: 0, y: 0 }, 0)
        .set(coffee, { autoAlpha: 1, left: introPositions.coffee.start.left, top: introPositions.coffee.start.top, rotation: 0, scale: 1, x: 0, y: 0 }, 0)
        .set(leaves, { autoAlpha: 1, left: introPositions.leaves.start.left, top: introPositions.leaves.start.top, rotation: 0, scale: 1, x: 0, y: 0 }, 0)
        .to(aiComputer, {
          autoAlpha: 1,
          duration: 0.8,
          filter: "blur(0px)",
          height: 697,
          left: introPositions.aiComputer.end.left,
          rotation: 0,
          scale: 1,
          top: introPositions.aiComputer.end.top,
          width: 662,
        }, 0)
        .to(notebook, { duration: 0.8, left: introPositions.notebook.end.left, top: introPositions.notebook.end.top }, 0)
        .to(phonePaper, { duration: 0.8, left: introPositions.phonePaper.end.left, top: introPositions.phonePaper.end.top }, 0)
        .to(folder, { duration: 0.8, left: introPositions.folder.end.left, top: introPositions.folder.end.top }, 0)
        .to(penCup, { duration: 0.8, left: introPositions.penCup.end.left, top: introPositions.penCup.end.top }, 0)
        .to(coffee, { duration: 0.8, left: introPositions.coffee.end.left, top: introPositions.coffee.end.top }, 0)
        .to(leaves, { duration: 0.8, left: introPositions.leaves.end.left, top: introPositions.leaves.end.top }, 0)
        .to(title, {
          autoAlpha: 1,
          duration: 0.8,
          filter: "blur(0px)",
          scale: 1,
          y: 0,
        }, 0)
        .to(clickNotes, { autoAlpha: 1, duration: 0.8 }, 0);

      introTimelineRef.current = introTimeline;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          id: "ai-to-uxui",
          trigger: section,
          start: "top top",
          end: "+=1600",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setTransitionNoteState(self.progress, self.direction);
          },
        },
      });

      const syncAiStart = () => {
        if (window.location.hash !== "#uxui") return;

        window.requestAnimationFrame(() => {
          const uxSection = document.getElementById("uxui-exploration");
          if (!uxSection) return;

          window.scrollTo({ top: uxSection.offsetTop, behavior: "auto" });
          window.history.replaceState(null, "", "#uxui");
          window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "uxui" }));
          ScrollTrigger.update();
        });
      };

      timeline
        .addLabel("aiExit", 0)
        .set([title, clickNotes], { autoAlpha: 0 }, "aiExit+=0.08")
        .to(bg, { autoAlpha: 0, duration: 0.1 }, "aiExit+=0.58")
        .to(leaves, { duration: 0.6, left: introPositions.leaves.start.left, top: introPositions.leaves.start.top }, "aiExit+=0.08")
        .to(coffee, { duration: 0.6, left: introPositions.coffee.start.left, top: introPositions.coffee.start.top }, "aiExit+=0.08")
        .to(penCup, { duration: 0.6, left: introPositions.penCup.start.left, top: introPositions.penCup.start.top }, "aiExit+=0.08")
        .to(folder, { duration: 0.6, left: introPositions.folder.start.left, top: introPositions.folder.start.top }, "aiExit+=0.08")
        .to(phonePaper, { duration: 0.6, left: introPositions.phonePaper.start.left, top: introPositions.phonePaper.start.top }, "aiExit+=0.08")
        .to(notebook, { duration: 0.6, left: introPositions.notebook.start.left, top: introPositions.notebook.start.top }, "aiExit+=0.08")
        .to(
          aiComputer,
          {
            duration: 0.6,
            height: 697,
            left: introPositions.aiComputer.start.left,
            rotation: 0,
            scale: 1,
            top: introPositions.aiComputer.start.top,
            width: 662,
          },
          "aiExit+=0.08",
        )
        .set([aiComputer, leaves, coffee, penCup, folder, phonePaper, notebook], { autoAlpha: 0 }, "aiExit+=0.68");

      window.setTimeout(syncAiStart, 120);

      ScrollTrigger.create({
        id: "ai-radial-intro",
        trigger: section,
        start: "top 82%",
        end: "top top",
        onEnter: playIntro,
        onEnterBack: playIntro,
      });

      if (window.location.hash === "#ai") {
        window.setTimeout(playIntro, 80);
      }

      playIntroEventHandler = playIntro;
      window.addEventListener("portfolio:play-ai-intro", playIntroEventHandler);
    }, sectionRef);

    return () => {
      if (noteHideTimerRef.current !== null) {
        window.clearTimeout(noteHideTimerRef.current);
      }
      introTimelineRef.current?.kill();
      phoneZoomTimelineRef.current?.kill();
      folderDetailTimelineRef.current?.kill();
      if (playIntroEventHandler) {
        window.removeEventListener("portfolio:play-ai-intro", playIntroEventHandler);
      }
      context.revert();
    };
  }, []);

  const openPhoneZoom = () => {
    if (!sectionRef.current || phoneZoomedRef.current) {
      return;
    }

    phoneZoomedRef.current = true;
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: true }));

    const section = sectionRef.current;
    const bg = section.querySelector<HTMLElement>(".ai-bg");
    const phonePaper = section.querySelector<HTMLElement>(".ai-phone-paper");
    const phone = section.querySelector<HTMLElement>(".ai-phone");
    const phoneImage = section.querySelector<HTMLImageElement>(".ai-phone img");
    const paper = section.querySelector<HTMLElement>(".ai-paper");
    const paperImage = section.querySelector<HTMLImageElement>(".ai-paper");
    const notebook = section.querySelector<HTMLElement>(".ai-bg-notebook");
    const folder = section.querySelector<HTMLElement>(".ai-folder");
    const penCup = section.querySelector<HTMLElement>(".ai-bg-pen-cup");
    const coffee = section.querySelector<HTMLElement>(".ai-bg-coffee");
    const leaves = section.querySelector<HTMLElement>(".ai-bg-leaves");
    const title = section.querySelector<HTMLElement>(".ai-title");
    const closeButton = section.querySelector<HTMLElement>(".ai-phone-close");
    const notes = gsap.utils.toArray<HTMLElement>(".ai-click-note", section);

    if (!bg || !phonePaper || !phone || !phoneImage || !paper || !paperImage || !closeButton) return;

    phoneZoomTimelineRef.current?.kill();
    gsap.killTweensOf([bg, phonePaper, phone, paper, notebook, folder, penCup, coffee, leaves, title, closeButton, notes]);
    phoneImage.src = "/assets/ai-iphone-2.png";
    paperImage.src = "/assets/ai-paper-2.png";
    gsap.set([phoneImage, paperImage], { autoAlpha: 1 });

    phoneZoomTimelineRef.current = gsap
      .timeline({
        defaults: { duration: 1.12, ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(phone, { pointerEvents: "none" });
        },
        onReverseComplete: () => {
          phoneZoomedRef.current = false;
          window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));
          phoneImage.src = "/assets/ai-iphone.png";
          paperImage.src = "/assets/ai-paper.png";
          gsap.set([phoneImage, paperImage], { autoAlpha: 0 });
          gsap.set(phonePaper, { autoAlpha: 1 });
          gsap.set(phone, { clearProps: "pointerEvents" });
          gsap.set(closeButton, { autoAlpha: 0 });
        },
      })
      .to(notes, { autoAlpha: 0, duration: 0.24 }, 0)
      .to(title, { autoAlpha: 0, duration: 0.42 }, 0)
      .to(bg, { scale: 1.42, x: -192, y: -70, transformOrigin: "18% 72%" }, 0)
      .to(notebook, { autoAlpha: 1, height: 196, left: -64, rotation: -4, top: 574, width: 292 }, 0)
      .to(phonePaper, { autoAlpha: 0, duration: 0.24 }, 0)
      .to(phone, { height: 560, left: 230, rotation: 0, top: 48, width: 284 }, 0)
      .to(paper, { height: 398, left: 584, rotation: 0, top: 140, width: 518 }, 0.04)
      .to([folder, penCup, coffee, leaves], { autoAlpha: 0, duration: 0.48, scale: 1.08 }, 0)
      .to(closeButton, { autoAlpha: 1, duration: 0.24 }, 0.82);
  };

  const closePhoneZoom = () => {
    if (!phoneZoomTimelineRef.current || !phoneZoomedRef.current) {
      return;
    }

    phoneZoomTimelineRef.current.reverse();
  };

  const openOperationOverview = () => {
    if (operationOverviewOpen || detailOpen) return;

    setOperationOverviewOpen(true);
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: true }));
  };

  const closeOperationOverview = () => {
    setOperationOverviewOpen(false);
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));
  };

  const openFolderDetail = () => {
    if (!sectionRef.current || !detailRef.current || detailOpen || phoneZoomedRef.current) {
      return;
    }

    const section = sectionRef.current;
    const folder = section.querySelector<HTMLElement>(".ai-folder");
    const nextPage = detailRef.current.querySelector<HTMLElement>(".ai-next-page");
    const notes = gsap.utils.toArray<HTMLElement>(".ai-click-note", section);

    if (!folder || !nextPage) return;

    folderDetailOpenRef.current = true;
    setFolderHoverState(null);
    setDetailOpen(true);
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: true }));

    folderDetailTimelineRef.current?.kill();
    gsap.killTweensOf([detailRef.current, nextPage, folder, notes]);
    gsap.set(detailRef.current, { autoAlpha: 1 });
    gsap.set(nextPage, {
      autoAlpha: 0,
      borderRadius: 0,
      filter: "blur(6px)",
      scale: 1,
    });

    folderDetailTimelineRef.current = gsap
      .timeline({
        defaults: { duration: 1.04, ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(folder, { pointerEvents: "none" });
        },
        onReverseComplete: () => {
          folderDetailOpenRef.current = false;
          setFolderHoverState(null);
          setDetailOpen(false);
          window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));
          gsap.set(detailRef.current, { autoAlpha: 0, clearProps: "transform" });
          gsap.set(nextPage, { autoAlpha: 0, filter: "blur(8px)", scale: 1.04 });
          gsap.set(folder, { clearProps: "pointerEvents" });
        },
      })
      .to(notes, { autoAlpha: 0, duration: 0.22 }, 0)
      .to(nextPage, { autoAlpha: 1, duration: 0.32, filter: "blur(0px)", scale: 1 }, 0);
  };

  const closeFolderDetail = () => {
    if (!folderDetailTimelineRef.current || !folderDetailOpenRef.current) return;

    folderDetailTimelineRef.current.reverse();
  };

  const openProductDetail = () => {
    if (!detailOpen || productDetailOpen) return;

    setProductDetailOpen(true);
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: true }));
  };

  const closeProductDetail = () => {
    setProductDetailOpen(false);
  };

  const openPosterDetail = () => {
    if (!detailOpen || posterDetailOpen) return;

    setPosterDetailOpen(true);
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: true }));
  };

  const closePosterDetail = () => {
    setPosterDetailOpen(false);
  };

  const openBrandDetail = () => {
    if (!detailOpen || brandDetailOpen) return;

    setBrandDetailOpen(true);
    window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: true }));
  };

  const closeBrandDetail = () => {
    setBrandDetailOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle("is-ai-product-detail-open", detailOpen || productDetailOpen || posterDetailOpen || brandDetailOpen || operationOverviewOpen);

    return () => {
      document.body.classList.remove("is-ai-product-detail-open");
    };
  }, [brandDetailOpen, detailOpen, operationOverviewOpen, productDetailOpen, posterDetailOpen]);

  useEffect(() => {
    const handleContentNavigation = (event: Event) => {
      const target = (event as CustomEvent<string>).detail;
      if (target !== "ai" && target !== "uxui") {
        return;
      }

      if (phoneZoomedRef.current) {
        phoneZoomTimelineRef.current?.reverse();
      }

      setOperationOverviewOpen(false);

      if (folderDetailOpenRef.current) {
        folderDetailTimelineRef.current?.progress(0).kill();
        folderDetailOpenRef.current = false;
        setFolderHoverState(null);
        setBrandDetailOpen(false);
        setProductDetailOpen(false);
        setPosterDetailOpen(false);
        setDetailOpen(false);
        if (detailRef.current) {
          const nextPage = detailRef.current.querySelector<HTMLElement>(".ai-next-page");
          gsap.set(detailRef.current, { autoAlpha: 0, clearProps: "transform" });
          gsap.set(nextPage, { autoAlpha: 0, filter: "blur(8px)", scale: 1.04 });
        }
        const folder = sectionRef.current?.querySelector<HTMLElement>(".ai-folder");
        if (folder) {
          gsap.set(folder, { clearProps: "pointerEvents" });
        }
      }

      window.dispatchEvent(new CustomEvent("portfolio:secondary-page", { detail: false }));
      if (target === "ai") {
        sectionRef.current?.classList.remove("is-uxui-active");
        sectionRef.current?.classList.remove("is-ai-note-hidden");
        gsap.set(document.getElementById("ai"), { autoAlpha: 1, pointerEvents: "auto" });
        const trigger = ScrollTrigger.getById("ai-to-uxui");
        window.history.replaceState(null, "", "#ai");
        window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "ai" }));
        window.scrollTo({ top: trigger?.start ?? sectionRef.current?.offsetTop ?? 0, behavior: "auto" });
        window.requestAnimationFrame(() => ScrollTrigger.update());
        return;
      }

      const trigger = ScrollTrigger.getById("ai-to-uxui");
      window.history.replaceState(null, "", target === "uxui" ? "#uxui" : `#${target}`);
      if (target === "uxui") {
        const uxSection = document.getElementById("uxui-exploration");
        gsap.set(document.getElementById("ai"), { autoAlpha: 0, pointerEvents: "none" });
        window.scrollTo({ top: uxSection?.offsetTop ?? trigger?.end ?? 0, behavior: "auto" });
        window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "uxui" }));
      } else if (trigger) {
        window.scrollTo({ top: trigger.end, behavior: "auto" });
      } else {
        sectionRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    window.addEventListener("portfolio:navigate-content-direct", handleContentNavigation);
    return () => window.removeEventListener("portfolio:navigate-content-direct", handleContentNavigation);
  }, []);

  return (
    <section
      className="ai-section"
      id="ai"
      aria-label="转场“关于我-AI/运营”"
      data-page-name="转场“关于我-AI/运营”"
      ref={sectionRef}
    >
      <div className={`ai-frame ${detailOpen ? "is-detail-open" : ""}`}>
        <div className="ai-bg" aria-hidden="true" />
        <img
          className="ai-bg-notebook ai-motion-layer"
          src="/assets/figwright-about-ai-transition/2301-280.png"
          alt=""
          aria-hidden="true"
          data-exit-x="-300"
          data-exit-y="240"
          data-exit-rotation="14"
          data-exit-scale="0.94"
        />
        <img
          className="ai-bg-pen-cup ai-motion-layer"
          src="/assets/figwright-about-ai-transition/2172-1316.png"
          alt=""
          aria-hidden="true"
          data-exit-x="280"
          data-exit-y="40"
          data-exit-rotation="10"
          data-exit-scale="0.94"
        />
        <img
          className="ai-bg-coffee ai-motion-layer"
          src="/assets/figwright-about-ai-transition/2172-1317.png"
          alt=""
          aria-hidden="true"
          data-exit-x="260"
          data-exit-y="-220"
          data-exit-rotation="16"
          data-exit-scale="0.94"
        />
        <img
          className="ai-bg-leaves ai-motion-layer"
          src="/assets/figwright-about-ai-transition/2172-1318.png"
          alt=""
          aria-hidden="true"
          data-exit-x="0"
          data-exit-y="-220"
          data-exit-rotation="-8"
          data-exit-scale="0.96"
        />
        <img
          className="ai-phone-paper ai-motion-layer"
          src="/assets/figwright-about-ai-transition/2189-252.png"
          alt=""
          aria-hidden="true"
          data-exit-x="-280"
          data-exit-y="220"
          data-exit-rotation="-20"
          data-exit-scale="0.92"
        />
        <img
          className="ai-paper ai-motion-layer"
          src="/assets/ai-paper.png"
          alt=""
          aria-hidden="true"
          data-exit-x="-240"
          data-exit-y="220"
          data-exit-rotation="-18"
          data-exit-scale="0.92"
        />
        <button
          className="ai-phone ai-motion-layer ai-phone-hotspot"
          type="button"
          aria-label="点击查看更多"
          onClick={openOperationOverview}
          data-exit-x="-280"
          data-exit-y="220"
          data-exit-rotation="-20"
          data-exit-scale="0.92"
        >
          <img src="/assets/ai-iphone.png" alt="" aria-hidden="true" />
        </button>
        <button
          className="ai-overview-hotspot"
          type="button"
          aria-label="打开AI/运营2-1"
          onClick={openOperationOverview}
        />
        <button
          className="ai-folder ai-motion-layer ai-folder-hotspot"
          type="button"
          aria-label="点击查看更多"
          onClick={openFolderDetail}
          data-exit-x="300"
          data-exit-y="220"
          data-exit-rotation="12"
          data-exit-scale="0.94"
        >
          <img src="/assets/figwright-about-ai-transition/2301-284.png" alt="" aria-hidden="true" />
        </button>
        <div className="ai-click-note ai-click-note-phone" aria-hidden="true">
          <span>点击查看更多</span>
          <img className="ai-click-arrow ai-click-arrow-phone" src="/assets/figwright-about-ai-transition/2189-906.png" alt="" />
        </div>
        <div className="ai-click-note ai-click-note-folder" aria-hidden="true">
          <span>点击查看更多</span>
          <img className="ai-click-arrow ai-click-arrow-folder" src="/assets/figwright-about-ai-transition/2189-875.png" alt="" />
        </div>
        <button className="ai-phone-close" type="button" aria-label="关闭" onClick={closePhoneZoom}>
          <span />
          <span />
        </button>
        <div className={`ai-product-detail-page ai-oper21-detail-page ${operationOverviewOpen ? "is-open" : ""}`} aria-hidden={!operationOverviewOpen} ref={operationOverviewRef}>
          <button className="ai-detail-close ai-product-detail-close" type="button" aria-label="关闭" onClick={closeOperationOverview}>
            <span />
            <span />
          </button>
          {operationOverviewOpen && (
            <div className="ai-oper21-detail-content">
              <AIOperationOverviewBoard />
            </div>
          )}
        </div>
        <div className={`ai-detail-page ${detailOpen ? "is-open" : ""}`} aria-hidden={!detailOpen} ref={detailRef}>
          <main className="ai-next-page">
          <button className="ai-detail-close" type="button" aria-label="关闭" onClick={closeFolderDetail}>
            <span />
            <span />
          </button>
          <div className={`ai-folder-page-stack ${folderHoverState ? `is-${folderHoverState}` : ""}`} onMouseLeave={() => setFolderHoverState(null)}>
            <img className="ai-folder-preload" src="/assets/figwright-ai-oper-2-2-layers/2294-275.png" alt="" aria-hidden="true" />
            <img className="ai-folder-preload" src="/assets/ai-oper-custom/brand-product.png" alt="" aria-hidden="true" />
            <img className="ai-folder-preload" src="/assets/figwright-ai-oper-2-2-slices/2294-278.png" alt="" aria-hidden="true" />
            <img className="ai-folder-preload" src="/assets/ai-oper-custom/poster.png" alt="" aria-hidden="true" />
            <img className="ai-folder-preload" src="/assets/figwright-ai-oper-2-2-slices/2294-282.png" alt="" aria-hidden="true" />
            <img className="ai-folder-preload" src="/assets/figwright-ai-oper-2-2-slices/2189-224.png" alt="" aria-hidden="true" />
            <img className="ai-folder-preload" src="/assets/figwright-ai-oper-2-2-slices/2294-286.png" alt="" aria-hidden="true" />
            <img className="ai-folder-preload" src="/assets/figwright-ai-oper-2-2-slices/2189-230.png" alt="" aria-hidden="true" />
            <div className="ai-folder-page-cluster ai-folder5-page-cluster" aria-hidden="true">
              <img src="/assets/figwright-ai-oper-2-2-slices/2294-286.png" alt="" draggable={false} />
              <span className="ai-folder-index ai-folder5-index">04</span>
              <span className="ai-folder-title ai-folder5-title">IP形象设计</span>
            </div>
            <img
              className="ai-folder-asset ai-folder5-ip"
              src="/assets/figwright-ai-oper-2-2-slices/2189-230.png"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
            <div className="ai-folder-page-cluster ai-folder4-page-cluster" aria-hidden="true">
              <img src="/assets/figwright-ai-oper-2-2-slices/2294-282.png" alt="" draggable={false} />
              <span className="ai-folder-index ai-folder4-index">03</span>
              <span className="ai-folder-title ai-folder4-title">品牌运营设计</span>
            </div>
            <img
              className="ai-folder-asset ai-folder4-brand"
              src="/assets/figwright-ai-oper-2-2-slices/2189-224.png"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
            <div className="ai-folder-page-cluster ai-folder3-page-cluster" aria-hidden="true">
              <img src="/assets/figwright-ai-oper-2-2-slices/2294-278.png" alt="" draggable={false} />
              <span className="ai-folder-index ai-folder3-index">02</span>
              <span className="ai-folder-title ai-folder3-title">活动海报</span>
            </div>
            <img
              className="ai-folder-asset ai-folder3-poster"
              src="/assets/ai-oper-custom/poster.png"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
            <button
              className="ai-folder-hit folder-page5-hit"
              type="button"
              aria-label="查看IP形象设计"
              onMouseEnter={() => setFolderHoverState("folder5")}
              onFocus={() => setFolderHoverState("folder5")}
            />
            <button
              className="ai-folder-hit folder-page4-hit"
              type="button"
              aria-label="打开品牌运营设计详情"
              onClick={openBrandDetail}
              onMouseEnter={() => setFolderHoverState("folder4")}
              onFocus={() => setFolderHoverState("folder4")}
            />
            <button
              className="ai-folder-hit folder-page3-hit"
              type="button"
              aria-label="打开营销海报详情"
              onClick={openPosterDetail}
              onMouseEnter={() => setFolderHoverState("folder3")}
              onFocus={() => setFolderHoverState("folder3")}
            />
            <div className="ai-folder-page-cluster ai-folder2-page-cluster" aria-hidden="true">
              <img src="/assets/figwright-ai-oper-2-2-layers/2294-275.png" alt="" draggable={false} />
              <span className="ai-folder-index ai-folder2-index">01</span>
              <span className="ai-folder-title ai-folder2-title">运营视觉重构</span>
            </div>
            <img
              className="ai-folder-asset ai-folder2-product"
              src="/assets/ai-oper-custom/brand-product.png"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
            <button
              className="ai-folder-hit folder-page2-hit"
              type="button"
              aria-label="打开运营视觉重构详情"
              onClick={openProductDetail}
              onMouseEnter={() => setFolderHoverState("folder2")}
              onFocus={() => setFolderHoverState("folder2")}
            />
            <img className="ai-folder-group folder-group1" src="/assets/figwright-ai-oper-2-2-groups/2189-204.png" alt="" aria-hidden="true" />
          </div>
          </main>
          <div className={`ai-product-detail-page ${productDetailOpen ? "is-open" : ""}`} aria-hidden={!productDetailOpen} ref={productDetailRef}>
            <button className="ai-detail-close ai-product-detail-close" type="button" aria-label="关闭" onClick={closeProductDetail}>
              <span />
              <span />
            </button>
            {productDetailOpen && (
              <div className="ai-product-detail-content">
                <AIProductDetailBoard />
              </div>
            )}
          </div>
          <div className={`ai-product-detail-page ai-poster-detail-page ${posterDetailOpen ? "is-open" : ""}`} aria-hidden={!posterDetailOpen} ref={posterDetailRef}>
            <button className="ai-detail-close ai-product-detail-close" type="button" aria-label="关闭" onClick={closePosterDetail}>
              <span />
              <span />
            </button>
            {posterDetailOpen && (
              <div className="ai-poster-detail-content">
                <AIPosterDetailBoard />
              </div>
            )}
          </div>
          <div className={`ai-product-detail-page ai-brand-detail-page ${brandDetailOpen ? "is-open" : ""}`} aria-hidden={!brandDetailOpen} ref={brandDetailRef}>
            <button className="ai-detail-close ai-product-detail-close" type="button" aria-label="关闭" onClick={closeBrandDetail}>
              <span />
              <span />
            </button>
            {brandDetailOpen && (
              <div className="ai-brand-detail-content">
                <AIBrandDetailBoard />
              </div>
            )}
          </div>
        </div>
        <h2 className="ai-title" id="ai-title">
          {copy.sections.ai.title}
        </h2>
        <div className="ai-transition-computer" aria-hidden="true">
          <img className="ai-transition-computer-screen" src="/assets/custom-computer/ai-computer.png" alt="" />
        </div>
      </div>
    </section>
  );
}
