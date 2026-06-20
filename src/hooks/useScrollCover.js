import { useRef, useEffect, useCallback } from "react";

/**
 * Custom hook that drives a smooth "slide-up cover" effect.
 * Attach wrapperRef to a container div that has extra scroll height.
 * The progress ref updates via requestAnimationFrame on scroll/resize.
 *
 * progress goes from 0 → 1 as the user scrolls through the wrapper's
 * scrollable distance. Use it to drive transform: translateY(...) on
 * a sticky child element that starts below the viewport and slides up.
 *
 * @returns {[React.RefObject, React.RefObject<number>]}
 *   [wrapperRef, progressRef]
 *   wrapperRef – attach to wrapper div
 *   progressRef – .current is 0..1 (0 = fully hidden below, 1 = fully covering)
 */
export function useScrollCover() {
  const wrapperRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  const update = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const wrapperH = rect.height;
    const scrollableH = wrapperH - viewportH;

    if (scrollableH <= 0) {
      progressRef.current = 0;
      return;
    }

    const scrolled = Math.max(0, -rect.top);
    progressRef.current = Math.min(scrolled / scrollableH, 1);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return [wrapperRef, progressRef];
}