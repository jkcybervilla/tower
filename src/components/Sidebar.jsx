import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "foundation", label: "Foundation Work" },
  { id: "tower-erection", label: "Tower Erection" },
  { id: "stringing", label: "Stringing & OPGW" },
  { id: "manpower", label: "Manpower Supply" },
  { id: "expertise", label: "Our Expertise" },
  { id: "contact", label: "Contact" },
];

const SERVICE_IDS = ["foundation", "tower-erection", "stringing", "manpower"];

export default function Sidebar({ isOpen, onOpen, onClose, activeSection, onNavigate }) {
  const [servicesOpen, setServicesOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleClick = (id) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      <button
        className={`sidebar-toggle ${isOpen ? "open" : ""}`}
        onClick={isOpen ? onClose : onOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        style={{ display: isOpen ? "none" : "flex" }}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <nav
        className={`sidebar ${isOpen ? "open" : ""}`}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="sidebar-header">
          <span className="sidebar-brand">Tower Line</span>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <ul className="sidebar-nav">
          <li>
            <button
              className={`sidebar-link sidebar-link-parent ${SERVICE_IDS.includes(activeSection) ? "active" : ""}`}
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
            >
              <span className="sidebar-link-indicator" />
              Services
              <svg
                className={`sidebar-accordion-icon ${servicesOpen ? "open" : ""}`}
                width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              >
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul
              className={`sidebar-subnav ${servicesOpen ? "open" : ""}`}
              aria-hidden={!servicesOpen}
            >
              {NAV_ITEMS.filter((item) => SERVICE_IDS.includes(item.id)).map((item) => (
                <li key={item.id}>
                  <button
                    className={`sidebar-link sidebar-sublink ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => handleClick(item.id)}
                  >
                    <span className="sidebar-link-indicator" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          {NAV_ITEMS.filter((item) => !SERVICE_IDS.includes(item.id)).map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => handleClick(item.id)}
              >
                <span className="sidebar-link-indicator" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">Electrical Transmission Specialist</p>
        </div>
      </nav>
    </>
  );
}

export { NAV_ITEMS };