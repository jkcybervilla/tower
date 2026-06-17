import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sidebar, { NAV_ITEMS } from "./components/Sidebar";
import ScrollProgress, { SECTIONS } from "./components/ScrollProgress";
import Footer from "./components/Footer";
import ContentSections from "./components/ContentSections";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_STAGES = [
  { id: "foundation", title: "FOUNDATION WORK",         range: [0, 0.2] },
  { id: "tower-erection", title: "TOWER ERECTION",       range: [0.2, 0.4] },
  { id: "stringing", title: "STRINGING & OPGW",          range: [0.4, 0.6] },
  { id: "manpower", title: "MANPOWER & ENGINEERING",     range: [0.6, 1.01] },
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
  const inVideoRef     = useRef(true);

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

    let scrubTween, progressRaf = 0;

    const showStage = (nextStage) => {
      if (activeStageRef.current === nextStage) return;
      const currentEl = stageRefs.current[activeStageRef.current];
      const nextEl    = stageRefs.current[nextStage];
      if (currentEl) gsap.to(currentEl, { autoAlpha: 0, y: 12, duration: 0.3, ease: "power2.out" });
      if (nextEl)    gsap.fromTo(nextEl, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
      activeStageRef.current = nextStage;
    };

    const updateByProgress = (value) => {
      if (progressRaf) return;
      progressRaf = requestAnimationFrame(() => {
        setProgress(value);
        setActiveIdx(getActiveVideoIndex(value));
        const stage = getActiveVideoStage(value);
        showStage(stage);
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

      const duration = video.duration || 1;
      const playhead = { time: 0 };

      // Mobile এর জন্য end scroll distance কিছুটা কম বা বেশি লাগলে Adjust করতে পারবে (যেমন: standard 4000 থেকে 5000)
      const scrollDistance = window.innerWidth < 768 ? "+=3500" : "+=5000";

      scrubTween = gsap.to(playhead, {
        time: duration,
        ease: "none",
        onUpdate: () => {
          if (video.readyState >= 2) video.currentTime = playhead.time;
        },
        scrollTrigger: {
          trigger: scrollSceneRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: 1,
          pin: true,
          pinSpacing: true, // নিশ্চিত করে যেন স্পেসিং ঠিক থাকে
          anticipatePin: 1,
          invalidateOnRefresh: true, // স্ক্রিন রিসাইজ বা মোবাইল ব্রাউজার বার চেঞ্জে ক্যালকুলেশন ঠিক রাখবে
          fastScrollEnd: true, // ফাস্ট স্ক্রল করলে পিনিং ব্রেক হওয়া আটকাবে
          onEnter: () => { inVideoRef.current = true; },
          onLeave: () => { inVideoRef.current = false; },
          onEnterBack: () => { inVideoRef.current = true; },
          onUpdate: (self) => updateByProgress(self.progress),
        },
      });

      // Timeline বিল্ড হওয়ার পর জোরপূর্বক একবার রিফ্রেশ
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
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

    // মোবাইলের orientation বা resize হ্যান্ডেল করার জন্য
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (progressRaf) cancelAnimationFrame(progressRaf);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("resize", handleResize);
      if (scrubTween) scrubTween.kill();
    };
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

          <div
            className="pointer-events-none absolute bottom-6 left-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 z-20"
            style={{ minHeight: "1.75rem" }}
          >
            {VIDEO_STAGES.map((stage) => (
              <div
                key={stage.id}
                ref={(node) => { stageRefs.current[stage.id] = node; }}
                className="label-caps text-white/75 drop-shadow-md"
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