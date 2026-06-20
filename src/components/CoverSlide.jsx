import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CoverSlide — makes its children slide up FASTER than normal scroll,
 * so they visually overlap and cover whatever is above them in the
 * document flow, before that previous section has fully scrolled away.
 *
 * How it avoids common bugs:
 * - No CSS `position: sticky` and no extra spacer divs — those caused
 *   the cover to only start AFTER the previous section had already
 *   scrolled fully out of view (no actual overlap, just a hard cut).
 * - Uses a zero-height "marker" sibling, placed right before the cover,
 *   as the ScrollTrigger's measurement reference. The marker itself is
 *   NEVER transformed, so GSAP's cached scroll positions stay accurate
 *   even while the cover element next to it is being animated — this
 *   avoids a feedback loop that happens if you trigger off an element
 *   you're also transforming.
 * - No mount delay/"ready" flash — the final DOM structure renders
 *   immediately so layout heights are stable from first paint.
 */
export default function CoverSlide({
  children,
  zIndex = 10,
  bgColor = "#141824",
  className = "",
  reducedMotion = false,
  /**
   * Where the marker's "top" must reach (in viewport terms) for the
   * slide to be considered fully complete. "top center" means the
   * cover finishes its 100vh slide-up within only ~50vh of real
   * scroll, i.e. it moves ~2x faster than normal scroll — that extra
   * speed is what creates the overlap/cover illusion. Increase to
   * "top bottom+=25%" for a slower/longer cover, or "top top" for a
   * plain 1:1 reveal with no overlap at all.
   */
  endPosition = "top center",
}) {
  const markerRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    const marker = markerRef.current;
    const cover = coverRef.current;
    if (!marker || !cover) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: marker,
        start: "top bottom",
        end: endPosition,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(cover, { y: (1 - self.progress) * window.innerHeight });
        },
      });

      // Set the correct starting offset AFTER the trigger has measured
      // the marker's natural (untransformed) position.
      gsap.set(cover, { y: window.innerHeight });

      return () => st.kill();
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [reducedMotion, endPosition]);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <div ref={markerRef} style={{ height: 0 }} />
      <div
        ref={coverRef}
        className={`cover-slide-inner ${className}`}
        style={{
          position: "relative",
          zIndex,
          backgroundColor: bgColor,
          minHeight: "100vh",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </>
  );
}