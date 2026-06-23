import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let instance = null;
let tickerCallback = null;

/**
 * Get the current Lenis singleton instance (null if not yet initialized).
 * Use this for imperative scrollTo calls outside of React component scope.
 */
export function getLenis() {
  return instance;
}

/**
 * Initialize a single Lenis smooth-scroll instance at the app's top level.
 *
 * Syncs with GSAP's ScrollTrigger via GSAP's official recommended pattern:
 *   - Lenis emits 'scroll' → ScrollTrigger.update()
 *   - Lenis.raf() is driven by gsap.ticker instead of a separate rAF loop,
 *     so both systems share the same frame clock.
 *   - gsap.ticker.lagSmoothing(0) prevents frame-dropping compensation that
 *     would conflict with Lenis's own smoothing.
 *   - A one-time ScrollTrigger.refresh() is queued on next rAF after init
 *     so all existing pinned ScrollTrigger instances recalculate their
 *     start/end positions with Lenis's virtual scroll dimensions.
 */
export default function useLenis() {
  useEffect(() => {
    // Guard: prevent duplicate instances on hot-reload / strict-mode double-fire
    if (instance) return;

    instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Sync Lenis with GSAP's ScrollTrigger
    instance.on('scroll', ScrollTrigger.update);

    // Drive Lenis's rAF from GSAP's ticker so they stay on the same clock
    tickerCallback = gsap.ticker.add((time) => {
      instance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on next frame so all pinned sections
    // recalculate start/end positions with Lenis-managed scroll
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      if (instance) {
        instance.destroy();
        instance = null;
      }
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }
      // Restore default lag smoothing when Lenis is torn down
      gsap.ticker.lagSmoothing(1);
    };
  }, []);

  return instance;
}
