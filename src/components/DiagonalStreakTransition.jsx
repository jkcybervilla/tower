import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * DiagonalStreakTransition — a decorative diagonal streaks sweep overlay
 * that animates between two adjacent sections as the user scrolls.
 *
 * No content pinning or swap logic — purely a visual scroll accent.
 *
 * Props:
 *   outgoing     — the section being scrolled away from (rendered first)
 *   incoming     — the section being scrolled into (rendered second)
 *   color        — base color for the streaks (default: brand gold #d4af37)
 *   pinDistance  — ScrollTrigger end value (default: "60vh")
 *   angle        — rotation angle in degrees (default: -20)
 *   streakCount  — number of diagonal bars (default: 5)
 *   streakWidth  — CSS width per streak (default: "14vw")
 *   staggerDelay — seconds between each streak's animation start (default: 0.06)
 */
export default function DiagonalStreakTransition({
  outgoing,
  incoming,
  color = "#d4af37",
  pinDistance = "60vh",
  angle = -20,
  streakCount = 5,
  streakWidth = "14vw",
  staggerDelay = 0.06,
}) {
  const wrapperRef           = useRef(null);
  const outgoingRef          = useRef(null);
  const incomingRef          = useRef(null);
  const incomingContentRef   = useRef(null);
  const streaksContainerRef  = useRef(null);
  const streakElsRef         = useRef([]);

  useEffect(() => {
    const streaksContainer = streaksContainerRef.current;
    const incomingContent  = incomingContentRef.current;
    if (!streaksContainer || !incomingContent) return;

    // Apply rotation on the container so GSAP's xPercent on children doesn't conflict
    streaksContainer.style.transform = `rotate(${angle}deg)`;
    streaksContainer.style.transformOrigin = "center center";

    /* ── Build streak DOM elements dynamically ── */
    const streakEls = [];
    for (let i = 0; i < streakCount; i++) {
      const el = document.createElement("div");
      // Compute varying opacity: streak 0 is darkest/most opaque, last is lightest
      const alpha = 1 - (i / (streakCount - 1)) * 0.45; // 1.0 → 0.55
      el.style.cssText = `
        position: absolute;
        top: -100vh;
        height: 300vh;
        width: ${streakWidth};
        background: ${color};
        opacity: ${alpha};
        left: ${(i / (streakCount - 1)) * 100}%;
        will-change: transform;
        pointer-events: none;
      `;
      streaksContainer.appendChild(el);
      streakEls.push(el);
    }
    streakElsRef.current = streakEls;

    /* ── GSAP context with single timeline + single ScrollTrigger ── */
    const ctx = gsap.context(() => {
      // Initial state: all streaks off-screen left
      streakEls.forEach((el) => {
        gsap.set(el, { xPercent: -200 });
      });

      // Incoming content: starts hidden, fades in after streaks pass
      gsap.set(incomingContent, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: pinDistance,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // Each streak sweeps across with a staggered start
      streakEls.forEach((el, i) => {
        tl.to(el, { xPercent: 200, duration: 0.6 }, i * staggerDelay);
      });

      // After streaks have passed (~0.6-0.7 progress), fade content in
      const fadeStart = 0.65;
      tl.to(incomingContent, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      }, fadeStart);
    });

    return () => {
      ctx.revert();
      streakEls.forEach((el) => el.remove());
    };
  }, [pinDistance, angle, streakCount, streakWidth, staggerDelay, color]);

  return (
    <>
      {/* Main wrapper — this gets pinned during the transition */}
      <div ref={wrapperRef} style={{ position: "relative" }}>
        <div ref={outgoingRef}>{outgoing}</div>
        <div ref={incomingRef}>
          <div ref={incomingContentRef}>{incoming}</div>
        </div>
      </div>

      {/* Fixed overlay containing the diagonal streaks */}
      <div
        ref={streaksContainerRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />
    </>
  );
}