import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SketchButton } from "../../components/Button/SketchButton";
import type { I18nCopy } from "../../data/i18n";

type HomeSectionProps = {
  copy: I18nCopy;
};

export function HomeSection({ copy }: HomeSectionProps) {
  const [typedLength, setTypedLength] = useState(0);
  const [peopleMotionKey, setPeopleMotionKey] = useState(0);
  const [isPeopleMotionActive, setIsPeopleMotionActive] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const viewStateRef = useRef<"home" | "about" | "content">("home");
  const directNavigationRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const computerRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const aboutRevealRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const aboutPeopleRef = useRef<HTMLDivElement>(null);
  const aboutRectangleRef = useRef<HTMLDivElement>(null);
  const aboutDetailsRef = useRef<HTMLDivElement>(null);

  const fullTypeText = `${copy.hero.eyebrow}${copy.hero.title}`;
  const welcomeLength = copy.hero.eyebrow.length;
  const typedWelcome = copy.hero.eyebrow.slice(0, Math.min(typedLength, welcomeLength));
  const typedTitle = copy.hero.title.slice(0, Math.max(0, typedLength - welcomeLength));
  const isTypingComplete = typedLength >= fullTypeText.length;

  useEffect(() => {
    setTypedLength(0);
    const timer = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= fullTypeText.length) {
          window.clearInterval(timer);
          return current;
        }

        return current + 1;
      });
    }, 85);

    return () => window.clearInterval(timer);
  }, [fullTypeText]);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !stageRef.current ||
      !illustrationRef.current ||
      !computerRef.current ||
      !uiRef.current ||
      !aboutRevealRef.current ||
      !aboutTitleRef.current ||
      !aboutPeopleRef.current ||
      !aboutRectangleRef.current ||
      !aboutDetailsRef.current
    ) {
      return;
    }

    let cleanupAnimation = () => {};

    const context = gsap.context(() => {
      const headerElement = document.querySelector<HTMLElement>(".site-header");
      if (!headerElement) {
        return;
      }

      const buildTarget = () => {
        const stageBox = stageRef.current!.getBoundingClientRect();
        const scale = stageBox.width / 1280;

        return {
          left: Math.round(-127 * scale),
          top: Math.round(-36 * scale),
          width: Math.round(1517 * scale),
          height: Math.round(978 * scale),
        };
      };

      const buildHomePosition = () => {
        const stageBox = stageRef.current!.getBoundingClientRect();
        const scale = stageBox.width / 1280;

        return {
          left: Math.round(295 * scale),
          top: Math.round(153 * scale),
          width: Math.round(684 * scale),
          height: Math.round(484 * scale),
        };
      };

      const setActiveSection = (sectionId: "home" | "about") => {
        window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: sectionId }));
        window.history.replaceState(null, "", `#${sectionId}`);
      };

      const setHomeScrollLock = (locked: boolean) => {
        document.body.classList.toggle("is-home-scroll-locked", locked);
      };

      const updateAboutScrollLayers = () => {
        const scrollTop = aboutRevealRef.current?.scrollTop ?? 0;
        const topComputer = aboutRevealRef.current?.querySelector<HTMLElement>(".about-top-computer-screen");
        const peopleY = Math.max(0, scrollTop - (730 - 41));
        const wordCloudY = Math.max(0, scrollTop - (779 - 41));

        if (topComputer) {
          gsap.set(topComputer, { y: scrollTop });
        }
        gsap.set(aboutPeopleRef.current, { y: peopleY });
        gsap.set(aboutRectangleRef.current, { y: wordCloudY });
      };

      const resetComputer = () => {
        const homePosition = buildHomePosition();
        const homeComputerLayers = computerRef.current!.querySelector(".home-computer-layers");
        const aboutScreenLayers = computerRef.current!.querySelector(".about-screen-layers");
        const heroBg = sectionRef.current!.querySelector(".hero-bg");

        gsap.set(computerRef.current, {
          left: homePosition.left,
          top: homePosition.top,
          width: homePosition.width,
          height: homePosition.height,
          autoAlpha: 1,
          zIndex: 1,
          clearProps: "transform",
        });
        gsap.set(homeComputerLayers, { autoAlpha: 1 });
        gsap.set(aboutScreenLayers, { autoAlpha: 0 });
        gsap.set(heroBg, { autoAlpha: 1 });
      };

      const setDirectAboutState = () => {
        const target = buildTarget();

        directNavigationRef.current = true;
        timelineRef.current?.pause(1);
        gsap.set(uiRef.current, { opacity: 0 });
        gsap.set(headerElement, { opacity: 0, pointerEvents: "none", y: 0 });
        gsap.set(illustrationRef.current, { borderRadius: 0, left: 0, top: 0, width: "100%", height: "100%" });
        gsap.set(computerRef.current, {
          left: target.left,
          top: target.top,
          width: target.width,
          height: target.height,
          autoAlpha: 1,
          rotation: 0,
          zIndex: 5,
        });
        gsap.set(computerRef.current!.querySelector(".home-computer-layers"), { autoAlpha: 0 });
        gsap.set(computerRef.current!.querySelector(".about-screen-layers"), { autoAlpha: 1 });
        gsap.set(aboutRevealRef.current, { opacity: 1 });
        gsap.set(aboutRevealRef.current, { pointerEvents: "auto" });
        gsap.set(aboutTitleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutPeopleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutRectangleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutDetailsRef.current, { autoAlpha: 1, y: 0 });
        aboutRevealRef.current!.scrollTop = 0;
        updateAboutScrollLayers();
        viewStateRef.current = "about";
        setHomeScrollLock(false);
        setActiveSection("about");
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      const setAboutVisualForContent = () => {
        const target = buildTarget();

        directNavigationRef.current = true;
        timelineRef.current?.pause(1);
        gsap.set(uiRef.current, { opacity: 0 });
        gsap.set(headerElement, { opacity: 0, pointerEvents: "none", y: 0 });
        gsap.set(illustrationRef.current, { borderRadius: 0, left: 0, top: 0, width: "100%", height: "100%" });
        gsap.set(computerRef.current, {
          left: target.left,
          top: target.top,
          width: target.width,
          height: target.height,
          autoAlpha: 1,
          rotation: 0,
          zIndex: 5,
        });
        gsap.set(computerRef.current!.querySelector(".home-computer-layers"), { autoAlpha: 0 });
        gsap.set(computerRef.current!.querySelector(".about-screen-layers"), { autoAlpha: 1 });
        gsap.set(aboutRevealRef.current, { opacity: 1 });
        gsap.set(aboutRevealRef.current, { pointerEvents: "none" });
        gsap.set(aboutTitleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutPeopleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutRectangleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutDetailsRef.current, { autoAlpha: 1, y: 0 });
        aboutRevealRef.current!.scrollTop = 0;
        updateAboutScrollLayers();
        viewStateRef.current = "content";
        setHomeScrollLock(false);
      };

      const buildTimeline = () => {
        const homePosition = buildHomePosition();
        const target = buildTarget();
        const timeline = gsap.timeline({
          defaults: { duration: 1, ease: "power2.inOut" },
          paused: true,
          onStart: () => {
            setHomeScrollLock(true);
          },
          onComplete: () => {
            viewStateRef.current = "about";
            setHomeScrollLock(false);
            window.scrollTo({ top: 0 });
            gsap.set(headerElement, { opacity: 0, pointerEvents: "none", y: 0 });
            setActiveSection("about");
          },
          onReverseComplete: () => {
            viewStateRef.current = "home";
            directNavigationRef.current = false;
            setHomeScrollLock(true);
            window.scrollTo({ top: 0 });
            resetComputer();
            gsap.set(uiRef.current, { opacity: 1 });
            gsap.set(aboutRevealRef.current, { opacity: 0 });
            gsap.set(aboutRevealRef.current, { pointerEvents: "none" });
            gsap.set(aboutTitleRef.current, { autoAlpha: 1, y: 0 });
            gsap.set(aboutPeopleRef.current, { autoAlpha: 1, y: 0 });
            gsap.set(aboutRectangleRef.current, { autoAlpha: 1, y: 0 });
            gsap.set(aboutDetailsRef.current, { autoAlpha: 1, y: 0 });
            aboutRevealRef.current!.scrollTop = 0;
            updateAboutScrollLayers();
            gsap.set(illustrationRef.current, {
              borderRadius: 24,
              height: "83%",
              left: 40,
              top: "11%",
              width: "calc(100% - 80px)",
            });
            gsap.set(headerElement, { opacity: 1, pointerEvents: "auto", y: 0 });
            setActiveSection("home");
          },
        });

        timeline
          .set(headerElement, { opacity: 1, y: 0 }, 0)
          .set(computerRef.current, {
            left: homePosition.left,
            top: homePosition.top,
            width: homePosition.width,
            height: homePosition.height,
            autoAlpha: 1,
            rotation: 0,
          }, 0)
          .set(aboutRevealRef.current, { opacity: 0 }, 0)
          .set(aboutRevealRef.current, { pointerEvents: "none" }, 0)
          .set(aboutTitleRef.current, { autoAlpha: 1, y: 0 }, 0)
          .set(aboutPeopleRef.current, { autoAlpha: 1, y: 0 }, 0)
          .set(aboutRectangleRef.current, { autoAlpha: 1, y: 0 }, 0)
          .set(aboutDetailsRef.current, { autoAlpha: 1, y: 0 }, 0)
          .set(computerRef.current!.querySelector(".home-computer-layers"), { autoAlpha: 1 }, 0)
          .set(computerRef.current!.querySelector(".about-screen-layers"), { autoAlpha: 0 }, 0)
          .to(uiRef.current, { opacity: 0, duration: 1 }, 0)
          .to(headerElement, { opacity: 0, pointerEvents: "none", y: 0, duration: 1 }, 0)
          .to(illustrationRef.current, { borderRadius: 0, left: 0, top: 0, width: "100%", height: "100%", duration: 1 }, 0)
          .to(
            computerRef.current,
            {
              left: target.left,
              top: target.top,
              width: target.width,
              height: target.height,
              zIndex: 5,
              duration: 1,
            },
            0,
          )
          .to(computerRef.current!.querySelector(".home-computer-layers"), { autoAlpha: 0, duration: 0.18 }, 0.72)
          .to(computerRef.current!.querySelector(".about-screen-layers"), { autoAlpha: 1, duration: 0.18 }, 0.72)
          .to(aboutRevealRef.current, { opacity: 1, pointerEvents: "auto", duration: 1 }, 0);

        timelineRef.current = timeline;
      };

      buildTimeline();

      const initialSection = window.location.hash.replace("#", "") || "home";
      if (initialSection === "about") {
        setDirectAboutState();
      } else if (initialSection && initialSection !== "home") {
        setAboutVisualForContent();
        window.setTimeout(() => {
          document.getElementById(initialSection)?.scrollIntoView();
        }, 80);
      } else {
        viewStateRef.current = "home";
        directNavigationRef.current = false;
        timelineRef.current?.pause(0);
        resetComputer();
        gsap.set(uiRef.current, { opacity: 1 });
        gsap.set(aboutRevealRef.current, { opacity: 0 });
        gsap.set(aboutRevealRef.current, { pointerEvents: "none" });
        gsap.set(aboutTitleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutPeopleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutRectangleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutDetailsRef.current, { autoAlpha: 1, y: 0 });
        aboutRevealRef.current!.scrollTop = 0;
        updateAboutScrollLayers();
        gsap.set(headerElement, { opacity: 1, pointerEvents: "auto", y: 0 });
        gsap.set(illustrationRef.current, {
          borderRadius: 24,
          height: "83%",
          left: 40,
          top: "11%",
          width: "calc(100% - 80px)",
        });
        setHomeScrollLock(true);
        window.scrollTo({ top: 0 });
      }

      const playToAbout = (event?: MouseEvent) => {
        const target = event?.target;
        if (target instanceof Element && target.closest(".hero-actions, .sketch-button")) {
          return;
        }

        if (viewStateRef.current !== "home") {
          return;
        }

        if ((timelineRef.current?.progress() ?? 0) >= 1) {
          timelineRef.current?.pause(0);
          resetComputer();
        }

        viewStateRef.current = "about";
        timelineRef.current?.play();
      };

      const handleDirectAbout = (event: Event) => {
        event.preventDefault();
        setDirectAboutState();
      };

      const playAboutToAi = (event: MouseEvent | WheelEvent) => {
        const target = event.target;
        if (target instanceof Element && target.closest(".side-navigation, .site-header")) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        const aiSection = document.getElementById("ai");
        if (!aiSection) {
          return;
        }

        viewStateRef.current = "content";
        setHomeScrollLock(false);
        gsap.set(aboutRevealRef.current, { opacity: 0, pointerEvents: "none" });
        gsap.set(sectionRef.current!.querySelector(".hero-bg"), { autoAlpha: 0 });
        window.history.replaceState(null, "", "#ai");
        window.dispatchEvent(new CustomEvent("portfolio:active-section", { detail: "ai" }));
        window.scrollTo({ top: aiSection.offsetTop, behavior: "auto" });
        window.dispatchEvent(new Event("portfolio:play-ai-intro"));
      };

      const handleDirectContent = (event: Event) => {
        setAboutVisualForContent();
      };

      const handleDirectHome = () => {
        viewStateRef.current = "home";
        directNavigationRef.current = false;
        timelineRef.current?.pause(0);
        resetComputer();
        gsap.set(uiRef.current, { opacity: 1 });
        gsap.set(aboutRevealRef.current, { opacity: 0 });
        gsap.set(aboutRevealRef.current, { pointerEvents: "none" });
        gsap.set(aboutTitleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutPeopleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutRectangleRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(aboutDetailsRef.current, { autoAlpha: 1, y: 0 });
        aboutRevealRef.current!.scrollTop = 0;
        updateAboutScrollLayers();
        gsap.set(sectionRef.current!.querySelector(".hero-bg"), { autoAlpha: 1 });
        gsap.set(headerElement, { opacity: 1, pointerEvents: "auto", y: 0 });
        gsap.set(illustrationRef.current, {
          borderRadius: 24,
          height: "83%",
          left: 40,
          top: "11%",
          width: "calc(100% - 80px)",
        });
        setHomeScrollLock(true);
        window.scrollTo({ top: 0 });
      };

      const handleHashHome = () => {
        const hash = window.location.hash.replace("#", "");
        if (!hash || hash === "home") {
          handleDirectHome();
        }
      };

      const returnHome = () => {
        if (viewStateRef.current === "home") {
          return;
        }

        viewStateRef.current = "home";
        directNavigationRef.current = false;
        setHomeScrollLock(true);
        window.scrollTo({ top: 0 });
        timelineRef.current?.reverse();
      };

      const handleWheel = (event: WheelEvent) => {
        if (viewStateRef.current === "home") {
          event.preventDefault();
          return;
        }

        if (window.scrollY <= 0 && viewStateRef.current === "about" && event.deltaY > 0 && aboutRevealRef.current) {
          event.preventDefault();
          const aboutScroller = aboutRevealRef.current;
          const maxScroll = aboutScroller.scrollHeight - aboutScroller.clientHeight;
          if (aboutScroller.scrollTop >= maxScroll - 2) {
            playAboutToAi(event);
          } else {
            aboutScroller.scrollTop = Math.min(maxScroll, aboutScroller.scrollTop + Math.abs(event.deltaY));
            updateAboutScrollLayers();
          }
          return;
        }

        if (window.scrollY <= 0 && viewStateRef.current === "about" && event.deltaY < 0 && aboutRevealRef.current?.scrollTop) {
          event.preventDefault();
          aboutRevealRef.current.scrollTop = Math.max(0, aboutRevealRef.current.scrollTop + event.deltaY);
          updateAboutScrollLayers();
          return;
        }

        if (window.scrollY <= 0 && event.deltaY < 0) {
          event.preventDefault();
          returnHome();
        }
      };

      const handleScroll = () => {
        const currentScrollY = Math.round(window.scrollY);

        if (directNavigationRef.current) {
          if (currentScrollY <= 0) {
            directNavigationRef.current = false;
          }

          lastScrollYRef.current = currentScrollY;
          return;
        }

        if (viewStateRef.current === "about" && currentScrollY > 20) {
          viewStateRef.current = "content";
        }

        if (viewStateRef.current === "content" && currentScrollY <= 0 && lastScrollYRef.current > currentScrollY) {
          returnHome();
        }

        lastScrollYRef.current = currentScrollY;
      };

      const handleResize = () => {
        const progress = timelineRef.current?.progress() ?? 0;
        timelineRef.current?.kill();
        buildTimeline();

        if (progress === 0) {
          resetComputer();
        } else {
          timelineRef.current?.progress(progress);
        }
      };

      const computerElement = computerRef.current;
      const aboutRevealElement = aboutRevealRef.current;
      if (!computerElement || !aboutRevealElement) {
        return;
      }

      computerElement.addEventListener("click", playToAbout);
      window.addEventListener("portfolio:navigate-about-direct", handleDirectAbout);
      window.addEventListener("portfolio:navigate-content-direct", handleDirectContent);
      window.addEventListener("portfolio:navigate-home-direct", handleDirectHome);
      window.addEventListener("hashchange", handleHashHome);
      aboutRevealElement.addEventListener("scroll", updateAboutScrollLayers, { passive: true });
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize);

      cleanupAnimation = () => {
        computerElement.removeEventListener("click", playToAbout);
        window.removeEventListener("portfolio:navigate-about-direct", handleDirectAbout);
        window.removeEventListener("portfolio:navigate-content-direct", handleDirectContent);
        window.removeEventListener("portfolio:navigate-home-direct", handleDirectHome);
        window.removeEventListener("hashchange", handleHashHome);
        aboutRevealElement.removeEventListener("scroll", updateAboutScrollLayers);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        setHomeScrollLock(false);
        timelineRef.current?.kill();
      };
    }, sectionRef);

    return () => {
      cleanupAnimation();
      context.revert();
    };
  }, []);

  const goToAboutWithZoom = () => {
    if (viewStateRef.current !== "home") {
      return;
    }

    if ((timelineRef.current?.progress() ?? 0) >= 1) {
      timelineRef.current?.pause(0);
    }

    viewStateRef.current = "about";
    timelineRef.current?.play();
  };

  return (
    <section
      className="home-section panel"
      id="home"
      aria-labelledby="home-title"
      ref={sectionRef}
    >
      <div className="home-stage viewport" data-node-id="2002:2" ref={stageRef}>
        <div className="hero-illustration" data-node-id="2002:3" ref={illustrationRef}>
          <img
            className="hero-bg"
            src="/assets/home-bg-texture.png"
            alt=""
            aria-hidden="true"
            data-node-id="2002:5"
          />
        </div>
        <div
          id="laptop-entire"
          className="laptop-computer floating-plant"
          data-node-id="2002:10"
          ref={computerRef}
        >
          <div className="home-computer-layers" aria-hidden="true">
            <img className="home-computer-screen" src="/assets/custom-computer/computer-screen.png" alt="" />
            <div className="home-computer-white" />
            <img className="home-computer-keyboard" src="/assets/custom-computer/keyboard.png" alt="" />
          </div>
          <div className="about-screen-layers" aria-hidden="true">
            <img className="about-screen-computer-screen" src="/assets/custom-computer/computer-screen.png" alt="" />
          </div>
          <button
            className="computer-zoom-zone"
            type="button"
            aria-label="进入关于我"
            onClick={(event) => {
              event.currentTarget.blur();
              if (event.target instanceof Element && event.target.closest(".hero-actions, .sketch-button")) {
                return;
              }
              goToAboutWithZoom();
            }}
          />
          <div className="hero-screen-anchor">
            <div
              className={`hero-screen ${isTypingComplete ? "is-typing-complete" : ""}`}
              data-node-id="2002:10"
              ref={uiRef}
            >
              <p aria-label={copy.hero.eyebrow}>
                <span className="typewriter-measure">{copy.hero.eyebrow}</span>
                <span className="typewriter-live" aria-hidden="true">{typedWelcome}</span>
              </p>
              <h1 id="home-title" aria-label={copy.hero.title}>
                <span className="typewriter-measure">{copy.hero.title}</span>
                <span className="typewriter-live" aria-hidden="true">{typedTitle}</span>
              </h1>
              <div className="hero-actions" onClick={(event) => event.stopPropagation()}>
                <SketchButton onClick={(event) => event.stopPropagation()}>{copy.hero.primaryButton}</SketchButton>
                <SketchButton onClick={(event) => event.stopPropagation()}>{copy.hero.secondaryButton}</SketchButton>
              </div>
            </div>
          </div>
        </div>
        <div className="about-transition-scene" ref={aboutRevealRef} aria-hidden="true">
          <img className="about-top-computer-screen" src="/assets/custom-computer/computer-screen.png" alt="" />
          <div className="about-transition-title" ref={aboutTitleRef}>
            {copy.sections.about.title}
          </div>
          <div
            className="about-people"
            ref={aboutPeopleRef}
            onMouseEnter={() => {
              setPeopleMotionKey((value) => value + 1);
              setIsPeopleMotionActive(true);
            }}
            onMouseLeave={() => setIsPeopleMotionActive(false)}
          >
            <img className="about-people-first-frame" src="/assets/people-motion-new-first.png" alt="" aria-hidden="true" />
            {isPeopleMotionActive ? (
              <img
                className="about-people-motion"
                key={peopleMotionKey}
                src={`/assets/people-motion-new.gif?play=${peopleMotionKey}`}
                alt=""
                aria-hidden="true"
              />
            ) : null}
          </div>
          <div
            className="about-rectangle-os"
            ref={aboutRectangleRef}
            aria-hidden="true"
          >
            <img className="about-rectangle-word-cloud" src="/assets/word-cloud.png" alt="" aria-hidden="true" />
          </div>
          <div className="about-home-details" ref={aboutDetailsRef} aria-hidden="true">
            <p className="about-home-intro">
              3年+产品运营经验，擅长用户洞察与产品内容策划执行，通过数据驱动与AB测试推动体验优化与增长，具备视觉设计与内容生产能力，可快速迁移至品牌内容策划与新媒体运营方向。
            </p>
            <div className="about-home-info-block about-home-education">
              <h3>教育经历</h3>
              <div className="about-home-info-row about-home-info-row-a">
                <strong>北京林业大学  艺术设计学院 / 交互设计</strong>
                <span>2019.09—2022.06</span>
                <p>硕士    CET6、校优秀学生干部等</p>
              </div>
              <div className="about-home-info-row about-home-info-row-b">
                <strong>西华大学      机械工程学院 / 工业设计</strong>
                <span>2015.09—2019.06</span>
                <p>学士    GPA：3.56（1/87）</p>
              </div>
            </div>
            <div className="about-home-info-block about-home-work">
              <h3>工作经历</h3>
              <div className="about-home-work-meta">
                <strong>中国联通温州市分公司</strong>
                <span className="about-home-work-role">产品运营/交互设计</span>
                <span className="about-home-work-date">2023.01-至今</span>
              </div>
              <p className="about-home-work-desc">
                负责公司toG/toB项目如「互联网+养老项目」、「秋开校园促销H5」等产品运营及交互设计；主导产品转化提升、视觉设计改版、结合用户需求优化页面体验，能结合AI工具规范工作流提升效率；同时负责其他内部业务需求的相关设计支援，如部门宣传片策划、运营图设计、展会驾驶舱、产品图主视觉等内容。
              </p>
            </div>
            <div className="about-home-info-block about-home-skills">
              <h3>技能</h3>
              <p>界面设计/网页设计/需求调研/活动运营与策划/品牌设计/运营图设计/AI工作流搭建</p>
            </div>
            <h3 className="about-home-software">软件</h3>
            <div className="about-home-software-icons" aria-hidden="true">
              {[
                "figma",
                "sketch",
                "ps",
                "ai",
                "modao",
                "axure",
                "capcut",
                "teambition",
                "gpt",
                "lovart",
                "mj",
                "jimeng",
                "doubao",
                "deepseek",
              ].map((icon) => (
                <img
                  alt=""
                  className="about-home-software-icon"
                  draggable={false}
                  key={icon}
                  src={`/assets/about-software-icons/${icon}.png`}
                />
              ))}
            </div>
          </div>
          <div className="about-transition-scroll-spacer" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
