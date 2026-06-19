import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import FoundationPage from "./pages/FoundationPage";
import TowerErectionPage from "./pages/TowerErectionPage";
import StringingPage from "./pages/StringingPage";
import ManpowerPage from "./pages/ManpowerPage";
import AboutPage from "./pages/AboutPage";

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const routeToSection = {
    "/": "hero",
    "/foundation": "foundation",
    "/tower-erection": "tower-erection",
    "/stringing-opgw": "stringing",
    "/manpower": "manpower",
    "/about": "expertise",
  };
  const activeSection = routeToSection[location.pathname] || "hero";

  const pathMap = {
    hero: "/",
    foundation: "/foundation",
    "tower-erection": "/tower-erection",
    stringing: "/stringing-opgw",
    manpower: "/manpower",
    expertise: "/about",
    contact: "/about",
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  const handleNavigate = (id) => {
    navigate(pathMap[id] || "/");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onOpen={() => setSidebarOpen(true)}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <main className="relative min-h-screen bg-charcoal text-cream overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/foundation" element={<FoundationPage />} />
          <Route path="/tower-erection" element={<TowerErectionPage />} />
          <Route path="/stringing-opgw" element={<StringingPage />} />
          <Route path="/manpower" element={<ManpowerPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}