import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Sermons", path: "/sermons" },
  { label: "Events", path: "/events" },
  { label: "Ministries", path: "/ministries" },
  { label: "Gallery", path: "/gallery" },
  { label: "Resources", path: "/resources" },
  { label: "Contact", path: "/contact" },
];

const SCRIPTURE_TICKERS = [
  '"For where two or three gather in my name, there am I with them." — Matthew 18:20',
  '"But as for me and my house, we will serve the LORD." — Joshua 24:15',
  '"The LORD is my shepherd; I shall not want." — Psalm 23:1',
  '"I can do all things through Christ who strengthens me." — Philippians 4:13',
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % SCRIPTURE_TICKERS.length);
        setTickerVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        /* ── Design Tokens ── */
        :root {
          --blush:   #E8B7B7;
          --green:   #184332;
          --gold:    #D6B66B;
          --ivory:   #FAF6EE;
          --font-serif: 'Playfair Display', Georgia, serif;
          --font-sans:  'Inter', system-ui, sans-serif;
        }

        /* ── Scripture Ticker ── */
        .ct-ticker {
          background: var(--green);
          color: var(--gold);
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          text-align: center;
          padding: 7px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          overflow: hidden;
        }
        .ct-ticker-cross {
          font-size: 1rem;
          color: var(--blush);
          flex-shrink: 0;
        }
        .ct-ticker-text {
          transition: opacity 0.5s ease;
          font-style: italic;
        }
        .ct-ticker-text.hidden { opacity: 0; }

        /* ── Main Header ── */
        .ct-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--ivory);
          border-bottom: 1px solid transparent;
          transition: box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
          font-family: var(--font-sans);
        }
        .ct-header.scrolled {
          background: rgba(250, 246, 238, 0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 32px rgba(24, 67, 50, 0.10);
          border-color: rgba(214, 182, 107, 0.25);
        }

        .ct-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* ── Logo ── */
        .ct-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ct-logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, var(--green) 60%, #1e5c42);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(24, 67, 50, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ct-logo:hover .ct-logo-icon {
          transform: scale(1.07);
          box-shadow: 0 4px 20px rgba(24, 67, 50, 0.35);
        }
        .ct-logo-icon svg {
          width: 26px;
          height: 26px;
          fill: var(--gold);
        }
        .ct-logo-text { display: flex; flex-direction: column; line-height: 1; }
        .ct-logo-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--green);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ct-logo-sub {
          font-size: 0.63rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 2px;
          font-weight: 500;
        }

        /* ── Desktop Nav ── */
        .ct-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .ct-nav a {
          display: block;
          padding: 8px 12px;
          font-size: 0.83rem;
          font-weight: 500;
          color: var(--green);
          text-decoration: none;
          letter-spacing: 0.02em;
          border-radius: 6px;
          position: relative;
          transition: color 0.25s ease, background 0.25s ease;
        }
        .ct-nav a::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--gold);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.25s ease;
          transform-origin: center;
        }
        .ct-nav a:hover,
        .ct-nav a.active {
          color: var(--green);
          background: rgba(232, 183, 183, 0.18);
        }
        .ct-nav a:hover::after,
        .ct-nav a.active::after {
          transform: scaleX(1);
        }

        /* ── Live Stream Button ── */
        .ct-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: var(--green);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 50px;
          border: 2px solid var(--gold);
          transition: background 0.28s ease, color 0.28s ease, transform 0.25s ease, box-shadow 0.28s ease;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(214, 182, 107, 0.3);
        }
        .ct-live-btn:hover {
          background: var(--green);
          color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(24, 67, 50, 0.28);
        }
        .ct-live-dot {
          width: 8px;
          height: 8px;
          background: var(--green);
          border-radius: 50%;
          animation: ct-pulse 1.4s infinite;
          flex-shrink: 0;
          transition: background 0.28s ease;
        }
        .ct-live-btn:hover .ct-live-dot { background: var(--gold); }
        @keyframes ct-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.7); }
        }

        /* ── Hamburger ── */
        .ct-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .ct-hamburger:hover { background: rgba(232, 183, 183, 0.2); }
        .ct-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--green);
          border-radius: 2px;
          transition: transform 0.35s ease, opacity 0.25s ease, width 0.3s ease;
        }
        .ct-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ct-hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .ct-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile Drawer ── */
        .ct-drawer-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(24, 67, 50, 0.45);
          backdrop-filter: blur(4px);
          z-index: 998;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .ct-drawer-overlay.open { opacity: 1; }

        .ct-drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100dvh;
          width: min(320px, 88vw);
          background: var(--ivory);
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(24, 67, 50, 0.18);
          padding: 0;
          overflow-y: auto;
        }
        .ct-drawer.open { transform: translateX(0); }

        .ct-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid rgba(214, 182, 107, 0.25);
          background: var(--green);
        }
        .ct-drawer-title {
          font-family: var(--font-serif);
          color: var(--gold);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .ct-drawer-close {
          background: none;
          border: none;
          color: var(--blush);
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s;
        }
        .ct-drawer-close:hover { color: var(--gold); }

        .ct-drawer-nav {
          list-style: none;
          padding: 12px 0;
          margin: 0;
          flex: 1;
        }
        .ct-drawer-nav li a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--green);
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          letter-spacing: 0.02em;
        }
        .ct-drawer-nav li a:hover,
        .ct-drawer-nav li a.active {
          background: rgba(232, 183, 183, 0.2);
          border-left-color: var(--gold);
          color: var(--green);
        }
        .ct-drawer-nav li a .nav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--blush);
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .ct-drawer-nav li a:hover .nav-dot,
        .ct-drawer-nav li a.active .nav-dot { background: var(--gold); }

        .ct-drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid rgba(214, 182, 107, 0.2);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ct-drawer-live {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--gold);
          color: var(--green);
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 13px;
          border-radius: 50px;
          transition: background 0.25s, color 0.25s;
        }
        .ct-drawer-live:hover { background: var(--green); color: var(--gold); }
        .ct-drawer-service-info {
          font-size: 0.76rem;
          color: #6b7280;
          text-align: center;
          letter-spacing: 0.02em;
          line-height: 1.6;
        }
        .ct-drawer-service-info strong { color: var(--green); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ct-nav { display: none; }
          .ct-hamburger { display: flex; }
          .ct-drawer, .ct-drawer-overlay { display: flex; }
          .ct-drawer-overlay { display: block; }
        }
        @media (max-width: 480px) {
          .ct-header-inner { padding: 0 16px; height: 64px; }
          .ct-logo-name { font-size: 0.9rem; }
          .ct-live-btn { display: none; }
        }
      `}</style>

      {/* Scripture Ticker */}
      <div className="ct-ticker">
        <span className="ct-ticker-cross">✝</span>
        <span className={`ct-ticker-text${tickerVisible ? "" : " hidden"}`}>
          {SCRIPTURE_TICKERS[tickerIdx]}
        </span>
        <span className="ct-ticker-cross">✝</span>
      </div>

      {/* Sticky Header */}
      <header className={`ct-header${scrolled ? " scrolled" : ""}`}>
        <div className="ct-header-inner">

          {/* Logo */}
          <Link to="/" className="ct-logo" aria-label="Christ's Tabernacle Home">
            <div className="ct-logo-icon">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="2" width="4" height="28" rx="2"/>
                <rect x="6" y="8" width="20" height="4" rx="2"/>
              </svg>
            </div>
            <div className="ct-logo-text">
              <span className="ct-logo-name">Christ's Tabernacle</span>
              <span className="ct-logo-sub">Prayer &amp; Worship Centre</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation">
            <ul className="ct-nav">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <NavLink
                    to={l.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    end={l.path === "/"}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-live-btn"
            id="header-live-stream-btn"
            aria-label="Join Live Stream"
          >
            <span className="ct-live-dot" aria-hidden="true" />
            Live Stream
          </a>

          {/* Hamburger */}
          <button
            className={`ct-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            id="header-hamburger-btn"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`ct-drawer-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <nav
        className={`ct-drawer${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="ct-drawer-head">
          <span className="ct-drawer-title">✝ Navigation</span>
          <button
            className="ct-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        <ul className="ct-drawer-nav">
          {NAV_LINKS.map((l) => (
            <li key={l.path}>
              <NavLink
                to={l.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                end={l.path === "/"}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-dot" aria-hidden="true" />
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ct-drawer-footer">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-drawer-live"
            id="mobile-live-stream-btn"
          >
            <span style={{ fontSize: "0.9rem" }}>📡</span>
            Join Live Stream
          </a>
          <p className="ct-drawer-service-info">
            <strong>Sunday Service:</strong> 8:15 AM – 11:15 AM<br />
            <strong>Prayer Meeting:</strong> New Moon &amp; Full Moon • 7:00–8:30 PM
          </p>
        </div>
      </nav>
    </>
  );
}
