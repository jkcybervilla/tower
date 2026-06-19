import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function DetailPageLayout({ children, sectionId }) {
  const fillRef = useRef(null);
  const scarfRef = useRef(null);
  const footerRef = useRef(null);
  const navigate = useNavigate();

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
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ── Hide scarf when footer enters viewport ── */
  const setFooterRef = useCallback((node) => {
    if (footerRef.current && footerRef.current._observer) {
      footerRef.current._observer.disconnect();
    }
    footerRef.current = node;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (scarfRef.current) {
          scarfRef.current.classList.toggle("hidden", entry.isIntersecting);
        }
      },
      { rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(node);
    node._observer = observer;
  }, []);

  useEffect(() => {
    return () => {
      if (footerRef.current && footerRef.current._observer) {
        footerRef.current._observer.disconnect();
      }
    };
  }, []);

  const handleNavigate = (id) => {
    const pathMap = {
      hero: "/",
      foundation: "/foundation",
      "tower-erection": "/tower-erection",
      stringing: "/stringing-opgw",
      manpower: "/manpower",
      expertise: "/about",
      contact: "/about",
    };
    navigate(pathMap[id] || "/");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      <div className="scroll-scarf" ref={scarfRef}>
        <div className="scroll-scarf-track">
          <div className="scroll-scarf-fill" ref={fillRef} />
        </div>
      </div>
      {children}
      <Footer onNavigate={handleNavigate} ref={setFooterRef} />
    </>
  );
}
