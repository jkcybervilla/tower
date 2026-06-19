import { useEffect, useRef } from "react";

const CLIENTS = [
  "Power Grid",
  "Adani",
  "L&T",
  "Siemens",
  "Sterlite Power",
  "Tata Power",
  "GE Grid",
  "BHEL",
];

export default function ClientsSection() {
  const sectionRef = useRef(null);

  /* ── IntersectionObserver-based fade+slide-in reveal ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="clients-section">
      {/* Full-bleed background — subtle */}
      <div className="clients-bg" />
      {/* Dark overlay */}
      <div className="clients-overlay" />

      <div className="clients-inner">
        <div className="clients-content">
          <p className="label-caps clients-label">OUR CLIENTS</p>
          <h2 className="clients-headline">Trusted by Industry Leaders</h2>

          <div className="clients-grid">
            {CLIENTS.map((name, i) => (
              <div key={i} className="client-card">
                <span className="client-card-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}