import { useEffect, useRef } from "react";

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