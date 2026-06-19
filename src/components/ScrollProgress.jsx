import { useEffect, useRef, useCallback } from "react";

// Entire‑page landmark sections (for markers on the scarf)
const ALL_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "foundation", label: "Foundation Work" },
  { id: "tower-erection", label: "Tower Erection" },
  { id: "stringing", label: "Stringing & OPGW" },
  { id: "manpower", label: "Manpower Supply" },
  { id: "expertise", label: "Our Expertise" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress({ activeSection, onNavigate }) {
  const scarfRef = useRef(null);
  const fillRef  = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 1;
      fill.style.transform = `scaleY(${progress})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ── Hide scarf when footer enters viewport (Option A: IntersectionObserver) ── */
  const setFooterRef = useCallback((node) => {
    // Disconnect old observer
    if (footerRef.current && footerRef.current._observer) {
      footerRef.current._observer.disconnect();
    }
    footerRef.current = node;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hidden = entry.isIntersecting;
        if (scarfRef.current) {
          scarfRef.current.classList.toggle("hidden", hidden);
        }
      },
      { rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(node);
    // Store observer on node so we can disconnect on unmount / ref change
    node._observer = observer;
  }, []);

  useEffect(() => {
    return () => {
      if (footerRef.current && footerRef.current._observer) {
        footerRef.current._observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="scroll-scarf" ref={scarfRef}>
      {/* The gold fill bar */}
      <div className="scroll-scarf-track">
        <div className="scroll-scarf-fill" ref={fillRef} />
      </div>

      {/* Section markers */}
      <div className="scroll-scarf-markers">
        {ALL_SECTIONS.map((section) => (
          <button
            key={section.id}
            className={`scroll-scarf-marker ${activeSection === section.id ? "active" : ""}`}
            onClick={() => onNavigate(section.id)}
            aria-label={`Go to ${section.label}`}
            title={section.label}
          >
            <span className="scroll-scarf-dot" />
          </button>
        ))}
      </div>
    </div>
  );
}

export { ALL_SECTIONS as SECTIONS };