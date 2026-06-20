import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainTransition — a horizontal wipe/curtain scroll transition
 * between two sections on the same page.
 *
 * Props:
 *   @param {ReactNode}  outgoing       — the section being scrolled away from (rendered first)
 *   @param {ReactNode}  incoming       — the section being scrolled into (rendered second)
 *   @param {string}     curtainColor   — solid color of the curtain (default: brand gold #d4af37)
 *   @param {string}     pinDistance    — ScrollTrigger end value (default: "150%" = 150vh of pinned scroll)
 *
 * Timeline (within one pinned scroll range):
 *   Phase 1 (0 → 0.4) — curtain slides in from LEFT, covering outgoing section
 *   Phase 2 (0.4 → 0.5) — brief hold while fully opaque; visibility swapped behind it
 *   Phase 3 (0.5 → 0.9) — curtain slides out to RIGHT, revealing incoming section
 *   Phase 4 (0.9 → 1.0) — incoming content fades in + slides up
 */
export default function CurtainTransition({
  outgoing,
  incoming,
  curtainColor = "#d4af37",
  pinDistance = "150%",
}) {
  const wrapperRef          = useRef(null);
  const outgoingRef         = useRef(null);
  const incomingRef         = useRef(null);
  const curtainRef          = useRef(null);
  const incomingContentRef  = useRef(null);

  useEffect(() => {
    const wrapper         = wrapperRef.current;
    const outgoingEl      = outgoingRef.current;
    const incomingEl      = incomingRef.current;
    const curtain         = curtainRef.current;
    const incomingContent = incomingContentRef.current;

    if (!wrapper || !outgoingEl || !incomingEl || !curtain || !incomingContent) return;

    const ctx = gsap.context(() => {
      /* ── Initial states ── */
      gsap.set(curtain,         { xPercent: -100 });
      gsap.set(incomingContent, { opacity: 0, y: 20 });
      gsap.set(outgoingEl,      { visibility: "visible" });
      gsap.set(incomingEl,      { visibility: "hidden" });

      /* ── Visibility swap — called mid‑hold when curtain fully opaque ── */
      const swapVisibility = () => {
        gsap.set(outgoingEl, { visibility: "hidden" });
        gsap.set(incomingEl, { visibility: "visible" });
      };

      /* ── Single timeline + single ScrollTrigger ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: pinDistance,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      tl
        // Phase 1: curtain slides in from left (0 → 0.4)
        .to(curtain, { xPercent: 0, duration: 0.4 }, 0)
        // Phase 2: brief hold at 0.4 → 0.5 — swap visibility behind the opaque curtain
        .add(swapVisibility, 0.4)
        // Phase 3: curtain exits to right (0.5 → 0.9)
        .to(curtain, { xPercent: 100, duration: 0.4 }, 0.5)
        // Phase 4: incoming content fades in + slides up (0.9 → 1.0)
        .to(incomingContent, {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
        }, 0.9);
    });

    return () => ctx.revert();
  }, [pinDistance]);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      {/* Outgoing section — visible initially */}
      <div ref={outgoingRef}>
        {outgoing}
      </div>

      {/* Incoming section — hidden behind curtain, revealed mid‑transition */}
      <div ref={incomingRef}>
        <div ref={incomingContentRef}>
          {incoming}
        </div>
      </div>

      {/* Curtain — position: fixed, covers full viewport during pinned phase */}
      <div
        ref={curtainRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          backgroundColor: curtainColor,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </div>
  );
}