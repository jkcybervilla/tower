import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { id: "foundation", title: "Foundation Work",       range: [0, 0.2] },
  { id: "erection",   title: "Tower Erection",        range: [0.2, 0.4] },
  { id: "stringing",  title: "Stringing & OPGW",      range: [0.4, 0.7] },
  { id: "manpower",   title: "Manpower & Engineering", range: [0.7, 1.01] }
];

function getActiveStage(progress) {
  return (
    STAGES.find(s => progress >= s.range[0] && progress < s.range[1])?.id
    ?? STAGES[0].id
  );
}

function getActiveIndex(progress) {
  const idx = STAGES.findIndex(s => progress >= s.range[0] && progress < s.range[1]);
  return idx >= 0 ? idx : 0;
}

export default function App() {
  const scrollSceneRef = useRef(null);
  const videoRef       = useRef(null);
  const stageRefs      = useRef({});
  const activeStageRef = useRef(STAGES[0].id);
  const heroRef        = useRef(null);
  const [progress,  setProgress]  = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !scrollSceneRef.current) return;

    let scrubTween, progressRaf = 0;

    const showStage = (nextStage) => {
      if (activeStageRef.current === nextStage) return;
      const currentEl = stageRefs.current[activeStageRef.current];
      const nextEl    = stageRefs.current[nextStage];
      if (currentEl) gsap.to(currentEl,     { autoAlpha: 0, y: 12, duration: 0.3, ease: "power2.out" });
      if (nextEl)    gsap.fromTo(nextEl, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
      activeStageRef.current = nextStage;
    };

    const updateByProgress = (value) => {
      if (progressRaf) return;
      progressRaf = requestAnimationFrame(() => {
        setProgress(value);
        setActiveIdx(getActiveIndex(value));
        showStage(getActiveStage(value));
        progressRaf = 0;
      });
    };

    const buildTimeline = () => {
      STAGES.forEach((s, i) => {
        if (stageRefs.current[s.id]) {
          gsap.set(stageRefs.current[s.id], i === 0
            ? { autoAlpha: 1, y: 0 }
            : { autoAlpha: 0, y: 12 });
        }
      });

      const duration = video.duration || 1;
      const playhead = { time: 0 };

      scrubTween = gsap.to(playhead, {
        time: duration,
        ease: "none",
        onUpdate: () => {
          if (video.readyState >= 2) video.currentTime = playhead.time;
        },
        scrollTrigger: {
          trigger: scrollSceneRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => updateByProgress(self.progress)
        }
      });
    };

    const onLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0.001;
      setTimeout(() => { video.currentTime = 0; }, 50);
      buildTimeline();
    };

    if (video.readyState >= 1) onLoadedMetadata();
    else video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      if (progressRaf) cancelAnimationFrame(progressRaf);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      if (scrubTween) scrubTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  /* ── Fade out hero text on scroll (unfreeze) ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "+=40%",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(hero, {
          opacity: 1 - self.progress,
          y: self.progress * -40,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <main className="relative min-h-screen bg-charcoal text-cream">
      <section ref={scrollSceneRef} className="video-scene relative overflow-hidden" style={{ willChange: "transform" }}>

        {/* Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="video-fill"
            src="/tower.mp4"
            playsInline
            preload="metadata"
            muted
            controls={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        </div>

        {/* Hero text — overlaid on video, top-aligned, unfreezes on scroll */}
        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start pt-12 sm:pt-20 md:pt-24 px-4 sm:px-6 text-center"
        >
          <p className="font-ui text-[9px] xs:text-[11px] sm:text-[12px] tracking-[0.3em] xs:tracking-[0.4em] uppercase text-white/60">
            Electrical Transmission Specialist
          </p>
          <h1
            className="font-display font-light leading-none text-white mt-2"
            style={{ fontSize: "clamp(1.5rem, 6vw, 5.5rem)", letterSpacing: "clamp(0.05em, 0.15em, 0.3em)" }}
          >
            Tower Line<br />Infrastructure
          </h1>
          <p className="font-ui text-[10px] xs:text-[12px] sm:text-[13px] tracking-[0.35em] xs:tracking-[0.5em] uppercase text-white/55 mt-2">
            Pvt. Ltd.
          </p>
        </div>

        {/* Stage label — bottom left */}
        <div
          className="pointer-events-none absolute bottom-4 left-3 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 z-20"
          style={{ minHeight: "1.75rem" }}
        >
          {STAGES.map((stage) => (
            <div
              key={stage.id}
              ref={(node) => { stageRefs.current[stage.id] = node; }}
              className="stage-label"
            >
              {stage.title}
            </div>
          ))}
        </div>

        {/* RR-style right nav */}
        <div className="dot-nav-track">
          <div className="dot-nav-line">
            <div className="dot-nav-fill" style={{ height: `${progress * 100}%` }} />
          </div>
          <div className="dot-nav-dots">
            {STAGES.map((s, i) => (
              <div key={s.id} className={`dot-nav-dot ${i === activeIdx ? "active" : ""}`} />
            ))}
          </div>
        </div>

      </section>

      {/* Below fold */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 below-fold text-center">
        <p className="font-ui text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/30">
          Scroll to explore the construction narrative
        </p>
      </section>
    </main>
  );
}