import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DetailSection({
  id,
  headline,
  children,
  className = "",
  dark = true,
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.fromTo(
      content,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.05,
      }
    );
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section-detail ${dark ? "section-dark" : "section-light"} ${className}`}
    >
      <div className="section-detail-inner" ref={contentRef}>
        <h2 className="section-headline">{headline}</h2>
        {children}
      </div>
    </section>
  );
}

export function BodyText({ children }) {
  return <div className="section-body">{children}</div>;
}

export function SubHeading({ children }) {
  return <h3 className="section-subheading">{children}</h3>;
}

export function BulletList({ items }) {
  return (
    <ul className="section-list">
      {items.map((item, i) => (
        <li key={i}>
          <span className="section-list-bullet" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function HighlightBox({ children }) {
  return <div className="section-highlight">{children}</div>;
}

export function StatGrid({ stats }) {
  return (
    <div className="stat-grid">
      {stats.map((stat, i) => (
        <div key={i} className="stat-item">
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ServiceCategories({ categories }) {
  return (
    <div className="service-categories">
      {categories.map((cat, i) => (
        <div key={i} className="service-category">
          <h4 className="service-category-title">{cat.title}</h4>
          <BulletList items={cat.items} />
        </div>
      ))}
    </div>
  );
}
