const SERVICE_LINKS = [
  { id: "foundation", label: "Foundation Work" },
  { id: "tower-erection", label: "Tower Erection" },
  { id: "stringing", label: "Stringing & OPGW" },
  { id: "manpower", label: "Manpower Supply" },
];

const COMPANY_LINKS = [
  { id: "hero", label: "About Us" },
  { id: "expertise", label: "Our Expertise" },
  { id: "contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

const SOCIAL_LINKS = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: "linkedin" },
  { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
  { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
  { href: "https://instagram.com", label: "Instagram", icon: "instagram" },
];

function SocialIcon({ icon }) {
  const paths = {
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
    twitter: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    instagram: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  };

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[icon]} />
    </svg>
  );
}

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <h3 className="footer-brand">Tower Line Infrastructure</h3>
            <p className="footer-tagline">
              Precision transmission line construction across India.
            </p>
            <div className="footer-social">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-social-link"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              {SERVICE_LINKS.map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavigate(link.id)}>{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              {COMPANY_LINKS.map((link) => (
                <li key={link.id}>
                  <button onClick={() => onNavigate(link.id)}>{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Tower Line Infrastructure Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
