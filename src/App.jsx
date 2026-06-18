import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sidebar, { NAV_ITEMS } from "./components/Sidebar";
import ScrollProgress, { SECTIONS } from "./components/ScrollProgress";
import Footer from "./components/Footer";
import ContentSections from "./components/ContentSections";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_STAGES = [
  { id: "foundation", title: "FOUNDATION WORK",         range: [0, 0.3] },
  { id: "tower-erection", title: "TOWER ERECTION",       range: [0.3, 0.5] },
  { id: "stringing", title: "STRINGING & OPGW",          range: [0.5, 0.8] },
  { id: "manpower", title: "MANPOWER & ENGINEERING",     range: [0.8, 1.01] },
];

const VIDEO_STAGE_MAP = {
  foundation: "foundation",
  "tower-erection": "tower-erection",
  stringing: "stringing",
  manpower: "manpower",
};

function getActiveVideoStage(progress) {
  return (
    VIDEO_STAGES.find(s => progress >= s.range[0] && progress < s.range[1])?.id
    ?? VIDEO_STAGES[0].id
  );
}

function getActiveVideoIndex(progress) {
  const idx = VIDEO_STAGES.findIndex(s => progress >= s.range[0] && progress < s.range[1]);
  return idx >= 0 ? idx : 0;
}

export default function App() {
  const scrollSceneRef = useRef(null);
  const videoRef       = useRef(null);
  const stageRefs      = useRef({});
  const activeStageRef = useRef(VIDEO_STAGES[0].id);
  const heroRef        = useRef(null);
  const heroLabelsRef  = useRef(null);
  const foundationRef  = useRef(null);
  const inVideoRef     = useRef(true);
  const foundationAnimatedRef = useRef(false);
  const towerErectionRef = useRef(null);
  const towerErectionAnimatedRef = useRef(false);
  const stringingRef = useRef(null);
  const stringingAnimatedRef = useRef(false);
  const manpowerRef = useRef(null);
  const manpowerAnimatedRef = useRef(false);

  const [progress, setProgress]         = useState(0);
  const [activeIdx, setActiveIdx]       = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [sidebarOpen, setSidebarOpen]   = useState(false);

  /* ── Mobile scroll indicator nav items (video stages + rest) ── */
  const MOBILE_DOTS = [...VIDEO_STAGES, ...SECTIONS.filter(s => s.id !== "hero")];

  const effectiveSection = inVideoRef.current
    ? (getActiveVideoStage(progress) || "foundation")
    : activeSection;

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  /* ── Video scroll scene ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !scrollSceneRef.current) return;

    let scrubTween, scrollTriggerInstance, progressRaf = 0;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const showStage = (nextStage) => {
  if (activeStageRef.current === nextStage) return;
  activeStageRef.current = nextStage;

  // ভিডিও স্টেজ লেবেলগুলোর জন্য লজিক
  VIDEO_STAGES.forEach((s) => {
    const el = stageRefs.current[s.id];
    if (!el) return;

    if (s.id === nextStage) {
      gsap.set(el, { display: 'block' }); // এলিমেন্ট দেখা শুরু হবে
      gsap.fromTo(el, 
        { autoAlpha: 0, y: 12 }, 
        { autoAlpha: 1, y: 0, duration: 0.4, overwrite: true }
      );
    } else {
      gsap.to(el, { 
        autoAlpha: 0, 
        y: 12, 
        duration: 0.3, 
        overwrite: true,
        onComplete: () => gsap.set(el, { display: 'none' }) // হাইড হলে DOM-এর জায়গা খালি করবে
      });
    }
  });

  // ফাউন্ডেশন ব্লকের জন্য আলাদা লজিক
  if (foundationRef.current) {
    if (nextStage === "foundation") {
      gsap.set(foundationRef.current, { display: 'block' });
      gsap.to(foundationRef.current, { autoAlpha: 1, y: 0, duration: 0.4, overwrite: true });
    } else {
      gsap.to(foundationRef.current, { 
        autoAlpha: 0, 
        y: -20, 
        duration: 0.3, 
        overwrite: true,
        onComplete: () => gsap.set(foundationRef.current, { display: 'none' }) 
      });
    }
  }

  // টাওয়ার ইরেকশন ব্লকের জন্য আলাদা লজিক
  if (towerErectionRef.current) {
    if (nextStage === "tower-erection") {
      gsap.set(towerErectionRef.current, { display: 'block' });
      gsap.to(towerErectionRef.current, { autoAlpha: 1, y: 0, duration: 0.4, overwrite: true });
    } else {
      gsap.to(towerErectionRef.current, { 
        autoAlpha: 0, 
        y: -20, 
        duration: 0.3, 
        overwrite: true,
        onComplete: () => gsap.set(towerErectionRef.current, { display: 'none' }) 
      });
    }
  }

  // স্ট্রিংিং ও ওপিজিডব্লিউ ব্লকের জন্য লজিক
  if (stringingRef.current) {
    if (nextStage === "stringing") {
      gsap.set(stringingRef.current, { display: 'block' });
      gsap.to(stringingRef.current, { autoAlpha: 1, y: 0, duration: 0.4, overwrite: true });
    } else {
      gsap.to(stringingRef.current, { 
        autoAlpha: 0, 
        y: -20, 
        duration: 0.3, 
        overwrite: true,
        onComplete: () => gsap.set(stringingRef.current, { display: 'none' }) 
      });
    }
  }

  // ম্যানপাওয়ার ও ইঞ্জিনিয়ারিং ব্লকের জন্য লজিক
  if (manpowerRef.current) {
    if (nextStage === "manpower") {
      gsap.set(manpowerRef.current, { display: 'block' });
      gsap.to(manpowerRef.current, { autoAlpha: 1, y: 0, duration: 0.4, overwrite: true });
    } else {
      gsap.to(manpowerRef.current, { 
        autoAlpha: 0, 
        y: -20, 
        duration: 0.3, 
        overwrite: true,
        onComplete: () => gsap.set(manpowerRef.current, { display: 'none' }) 
      });
    }
  }
};

    const updateByProgress = (value) => {
      if (progressRaf) return;
      progressRaf = requestAnimationFrame(() => {
        setProgress(value);
        setActiveIdx(getActiveVideoIndex(value));
        const stage = getActiveVideoStage(value);
        showStage(stage);

        /* ── Foundation block: fade in/out based on branding visibility ── */
        if (foundationRef.current) {
          if (value > 0.04 && !foundationAnimatedRef.current) {
            foundationAnimatedRef.current = true;
            gsap.to(foundationRef.current, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            });
          } else if (value <= 0.04 && foundationAnimatedRef.current) {
            foundationAnimatedRef.current = false;
            gsap.to(foundationRef.current, {
              autoAlpha: 0,
              y: 50,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
            });
          }
        }

        /* ── Tower Erection block: show/hide based on progress range [0.3, 0.5] ── */
        if (towerErectionRef.current) {
          if (value >= 0.3 && value <= 0.5 && !towerErectionAnimatedRef.current) {
            towerErectionAnimatedRef.current = true;
            gsap.set(towerErectionRef.current, { display: 'block' });
            gsap.to(towerErectionRef.current, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            });
          } else if ((value < 0.3 || value > 0.5) && towerErectionAnimatedRef.current) {
            towerErectionAnimatedRef.current = false;
            gsap.to(towerErectionRef.current, {
              autoAlpha: 0,
              y: 50,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
              onComplete: () => gsap.set(towerErectionRef.current, { display: 'none' })
            });
          }
        }

        /* ── Stringing & OPGW block: show/hide based on progress range [0.5, 0.8] ── */
        if (stringingRef.current) {
          if (value >= 0.5 && value <= 0.8 && !stringingAnimatedRef.current) {
            stringingAnimatedRef.current = true;
            gsap.set(stringingRef.current, { display: 'block' });
            gsap.to(stringingRef.current, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            });
          } else if ((value < 0.5 || value > 0.8) && stringingAnimatedRef.current) {
            stringingAnimatedRef.current = false;
            gsap.to(stringingRef.current, {
              autoAlpha: 0,
              y: 50,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
              onComplete: () => gsap.set(stringingRef.current, { display: 'none' })
            });
          }
        }

        /* ── Manpower & Engineering block: show/hide based on progress range [0.8, 1.01] ── */
        if (manpowerRef.current) {
          if (value >= 0.8 && value <= 1.01 && !manpowerAnimatedRef.current) {
            manpowerAnimatedRef.current = true;
            gsap.set(manpowerRef.current, { display: 'block' });
            gsap.to(manpowerRef.current, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            });
          } else if ((value < 0.8 || value > 1.01) && manpowerAnimatedRef.current) {
            manpowerAnimatedRef.current = false;
            gsap.to(manpowerRef.current, {
              autoAlpha: 0,
              y: 50,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
              onComplete: () => gsap.set(manpowerRef.current, { display: 'none' })
            });
          }
        }

        if (inVideoRef.current) {
          const mapped = value < 0.05 ? "hero" : (VIDEO_STAGE_MAP[stage] ?? "hero");
          setActiveSection(mapped);
        }
        progressRaf = 0;
      });
    };

    const buildTimeline = () => {
      VIDEO_STAGES.forEach((s, i) => {
        if (stageRefs.current[s.id]) {
          gsap.set(stageRefs.current[s.id], i === 0
            ? { autoAlpha: 1, y: 0 }
            : { autoAlpha: 0, y: 12 });
        }
      });

      /* Foundation block: hidden initially — animates in after branding scrolls past */
      if (foundationRef.current) {
        gsap.set(foundationRef.current, { autoAlpha: 0, y: 50 });
      }

      /* Tower Erection block: hidden initially — animates in on [0.3, 0.5] range */
      if (towerErectionRef.current) {
        gsap.set(towerErectionRef.current, { autoAlpha: 0, y: 50, display: 'none' });
      }

      /* Stringing & OPGW block: hidden initially — animates in on [0.5, 0.8] range */
      if (stringingRef.current) {
        gsap.set(stringingRef.current, { autoAlpha: 0, y: 50, display: 'none' });
      }

      /* Manpower & Engineering block: hidden initially — animates in on [0.8, 1.01] range */
      if (manpowerRef.current) {
        gsap.set(manpowerRef.current, { autoAlpha: 0, y: 50, display: 'none' });
      }

      if (isMobile) {
        /* ── Mobile: no scroll-scrub — play on scroll, pause on stop ── */
        let scrollTimer = null;
        const SCROLL_STOP_DELAY = 200;

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: scrollSceneRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => { inVideoRef.current = true; },
          onLeave: () => {
            inVideoRef.current = false;
            video.pause();
            if (scrollTimer) { clearTimeout(scrollTimer); scrollTimer = null; }
          },
          onEnterBack: () => { inVideoRef.current = true; },
          onUpdate: (self) => {
            updateByProgress(self.progress);

            if (self.direction > 0) {
              /* Scrolling down — play video, cancel pending pause */
              if (scrollTimer) {
                clearTimeout(scrollTimer);
                scrollTimer = null;
              }
              video.play().catch(() => {});
            } else {
              /* Scrolling stopped or going up — schedule pause after delay */
              if (!scrollTimer) {
                scrollTimer = setTimeout(() => {
                  video.pause();
                  scrollTimer = null;
                }, SCROLL_STOP_DELAY);
              }
            }
          },
        });

        video.currentTime = 0.001;
        setTimeout(() => { ScrollTrigger.refresh(); }, 200);
      } else {
        /* ── Desktop: exact GSAP scroll scrub logic (unchanged) ── */
        const duration = video.duration || 1;
        const playhead = { time: 0 };

        let lastVideoTime = -1;

        scrubTween = gsap.to(playhead, {
          time: duration,
          ease: "none",
          onUpdate: () => {
            if (video.readyState < 2) return;
            const diff = Math.abs(playhead.time - lastVideoTime);
            if (diff > 0.003) {
              lastVideoTime = playhead.time;
              video.currentTime = playhead.time;
            }
          },
          scrollTrigger: {
            trigger: scrollSceneRef.current,
            start: "top top",
            end: "+=5000",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onEnter: () => { inVideoRef.current = true; },
            onLeave: () => { inVideoRef.current = false; },
            onEnterBack: () => { inVideoRef.current = true; },
            onUpdate: (self) => updateByProgress(self.progress),
          },
        });

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      }
    };

    const onLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0.001;
      setTimeout(() => { 
        video.currentTime = 0; 
        buildTimeline();
      }, 50);
    };

    if (video.readyState >= 1) onLoadedMetadata();
    else video.addEventListener("loadedmetadata", onLoadedMetadata);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (progressRaf) cancelAnimationFrame(progressRaf);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("resize", handleResize);
      if (scrubTween) scrubTween.kill();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  /* ── Hero bottom-labels fade on scroll ── */
  useEffect(() => {
    const labelsEl = heroLabelsRef.current;
    if (!labelsEl) return;

    gsap.set(labelsEl, { autoAlpha: 0, y: 20 });

    const st = ScrollTrigger.create({
      trigger: labelsEl,
      start: "top bottom",
      end: "top top+=10%",
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(labelsEl, {
          autoAlpha: self.progress,
          y: 20 * (1 - self.progress),
        });
      },
    });

    return () => st.kill();
  }, []);

  /* ── Hero text fade on scroll ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "+=40%",
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        gsap.set(hero, {
          opacity: 1 - self.progress,
          y: self.progress * -40,
        });
      },
    });

    return () => st.kill();
  }, []);

  /* ── Intersection observer for detail sections ── */
  useEffect(() => {
    const ids = SECTIONS.filter(s => s.id !== "hero").map(s => s.id);
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && !inVideoRef.current) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <ScrollProgress
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* ── Mobile scroll indicator (bottom dots) ── */}
      <div className="mobile-scroll-indicator" aria-hidden="true">
        {MOBILE_DOTS.map((dot) => {
          const dotId = dot.id || dot;
          return (
            <button
              key={dotId}
              className={`mobile-scroll-dot ${effectiveSection === dotId ? "active" : ""}`}
              onClick={() => scrollToSection(dotId)}
              aria-label={`Go to ${dot.label || dotId}`}
            />
          );
        })}
      </div>

      <main className="relative min-h-screen bg-charcoal text-cream overflow-x-hidden">
        <section
          id="hero"
          ref={scrollSceneRef}
          className="video-scene relative w-full h-screen overflow-hidden select-none"
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 z-0 w-full h-full">
            <video
              ref={videoRef}
              className="video-fill w-full h-full object-cover"
              src="/tower.mp4"
              playsInline
              preload="metadata"
              muted
              controls={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
          </div>

          <div
            ref={heroRef}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 text-center"
          >
            <p className="label-caps text-white/60">
              ELECTRICAL TRANSMISSION SPECIALIST
            </p>
            <h1
              className="font-display mt-3 text-xl sm:text-3xl md:text-5xl text-white text-shadow-industrial leading-tight"
            >
              TOWER LINE INFRASTRUCTURE PVT. LTD.
            </h1>
            <p className="font-sub mt-4 text-[9px] sm:text-xs text-white/50">
              END-TO-END EXECUTION · FOUNDATION TO COMMISSIONING
            </p>
          </div>

          {/* ── Foundation block: left-aligned on all screens ── */}
          <div
            className="absolute left-6 sm:left-8 lg:left-20 xl:left-32 top-[45%] -translate-y-1/2 z-20 pointer-events-none max-w-[350px] lg:max-w-[400px]"
          >
            <div
              ref={foundationRef}
              className="pointer-events-auto"
            >
              <h2 className="text-white/90 drop-shadow-md text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                FOUNDATION WORK
              </h2>
              <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                Every transmission tower relies on a robust foundation. We execute precise
                foundation engineering tailored to soil conditions, load requirements, and
                environmental factors across diverse Indian terrains.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection("foundation");
                }}
                className="border border-white/40 text-white/80 text-xs sm:text-sm px-4 py-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
              >
                Our Foundation Capabilities
              </button>
            </div>
          </div>

          {/* ── Stringing & OPGW block: left-aligned on all screens ── */}
          <div
            className="absolute left-6 sm:left-8 lg:left-20 xl:left-32 top-[45%] -translate-y-1/2 z-20 pointer-events-none max-w-[350px] lg:max-w-[400px]"
          >
            <div
              ref={stringingRef}
              className="pointer-events-auto"
            >
              <h2 className="text-white/90 drop-shadow-md text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                STRINGING & OPGW
              </h2>
              <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                Conductor stringing is a high-precision operation requiring careful tension control and sag calculation. We handle both conventional ACSR/AAAC conductors and modern OPGW (Optical Power Ground Wire) installations.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection("stringing-opgw");
                }}
                className="border border-white/40 text-white/80 text-xs sm:text-sm px-4 py-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
              >
                Stringing Capabilities
              </button>
            </div>
          </div>

          {/* ── Manpower & Engineering block: left-aligned on all screens ── */}
          <div
            className="absolute left-6 sm:left-8 lg:left-20 xl:left-32 top-[45%] -translate-y-1/2 z-20 pointer-events-none max-w-[350px] lg:max-w-[400px]"
          >
            <div
              ref={manpowerRef}
              className="pointer-events-auto"
            >
              <h2 className="text-white/90 drop-shadow-md text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                MANPOWER & ENGINEERING
              </h2>
              <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                Beyond construction, we provide skilled technical manpower and engineering support for transmission projects across India. Our personnel are certified, experienced, and ready to deploy.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection("manpower");
                }}
                className="border border-white/40 text-white/80 text-xs sm:text-sm px-4 py-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
              >
                Manpower Services
              </button>
            </div>
          </div>

          {/* ── Tower Erection block: left-aligned on all screens ── */}
          <div
            className="absolute left-6 sm:left-8 lg:left-20 xl:left-32 top-[45%] -translate-y-1/2 z-20 pointer-events-none max-w-[350px] lg:max-w-[400px]"
          >
            <div
              ref={towerErectionRef}
              className="pointer-events-auto"
            >
              <h2 className="text-white/90 drop-shadow-md text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                TOWER ERECTION
              </h2>
              <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                From lattice steel towers to tubular poles, our erection teams bring decades of field experience. We follow stringent safety protocols and precision alignment procedures to ensure every structure meets design specifications.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToSection("tower-erection");
                }}
                className="border border-white/40 text-white/80 text-xs sm:text-sm px-4 py-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
              >
                Erection Services
              </button>
            </div>
          </div>

          {/* ── Other stage labels: bottom-left ── */}
          <div
            ref={heroLabelsRef}
            className="absolute bottom-6 left-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 z-20"
            style={{ minHeight: "1.75rem" }}
          >
            {VIDEO_STAGES.filter(s => s.id !== "foundation").map((stage) => (
              <div
                key={stage.id}
                ref={(node) => { stageRefs.current[stage.id] = node; }}
                className="label-caps text-white/75 drop-shadow-md pointer-events-none"
              >
                {stage.title}
              </div>
            ))}
          </div>

          <div className="video-dot-nav">
            <div className="video-dot-nav-line">
              <div className="video-dot-nav-fill" style={{ height: `${progress * 100}%` }} />
            </div>
            <div className="video-dot-nav-dots">
              {VIDEO_STAGES.map((s, i) => (
                <div key={s.id} className={`video-dot-nav-dot ${i === activeIdx ? "active" : ""}`} />
              ))}
            </div>
          </div>
        </section>

        <ContentSections />
        <Footer onNavigate={scrollToSection} />
      </main>
    </>
  );
}