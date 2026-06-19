import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function DetailPageLayout({ children, sectionId }) {
  const fillRef = useRef(null);
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
      <div className="scroll-scarf">
        <div className="scroll-scarf-track">
          <div className="scroll-scarf-fill" ref={fillRef} />
        </div>
      </div>
      {children}
      <Footer onNavigate={handleNavigate} />
    </>
  );
}