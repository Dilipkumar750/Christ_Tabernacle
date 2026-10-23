import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoImg from "../assets/logo.jpeg";
import { FaCross } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

/* ── Navigation Structure ── */
const NAV = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/about",
    children: [
      { label: "Our Journey", path: "/about/journey" },
      { label: "Our Motto", path: "/about/motto" },
      { label: "Our Vision", path: "/about/vision" },
      { label: "Our Mission", path: "/about/mission" },
      { label: "Statement of Faith", path: "/about/faith" },
    ],
  },
  { label: "Testimonies", path: "/testimonies" },
  {
    label: "Media",
    path: "/media",
    children: [
      { label: "Photo Gallery", path: "/media/photos" },
      { label: "Video Archive", path: "/media/videos" },
    ],
  },
  { label: "Songs", path: "/songs/lyrics" },
  {
    label: "Sermons",
    path: "/sermons",
    children: [
      { label: "Sunday Sermons", path: "/sermons/sunday" },
      { label: "Bible Study", path: "/sermons/bible-study" },
    ],
  },
  {
    label: "Prayers & Worship",
    path: "/prayers",
    children: [
      { label: "Sunday Services", path: "/prayers/sunday-services" },
      { label: "Fasting Prayers", path: "/prayers/fasting" },
      { label: "Transformation Prayer", path: "/prayers/transformation" },
      { label: "Discipleship Prayer", path: "/prayers/discipleship" },
      { label: "Sunday School", path: "/prayers/sunday-school" },
    ],
  },
  { label: "Connect", path: "/contact" },
];

const TICKERS = [
  '"A House of Prayer for All Nations." — Isaiah 56:7',
  '"But as for me and my house, we will serve the LORD." — Joshua 24:15',
  '"The Lord is my shepherd; I shall not want." — Psalm 23:1',
  '"I can do all things through Christ who strengthens me." — Philippians 4:13',
  '"Sunday Worship: 8:15 AM – 11:15 AM • All Are Welcome in Christ"',
];

/* ── Desktop Dropdown Item ── */
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const isParentActive =
    item.children &&
    (location.pathname === item.path ||
      item.children.some((c) => location.pathname.startsWith(c.path)));

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!item.children) {
    return (
      <li>
        <NavLink
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `ct-nav-link${isActive ? " active" : ""}`
          }
        >
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="ct-dropdown-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.path}
        className={`ct-nav-link ct-nav-parent${isParentActive ? " active" : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <svg
          className={`ct-chevron${open ? " rotated" : ""}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <ul className={`ct-dropdown${open ? " open" : ""}`} role="menu">
        {item.children.map((c) => (
          <li key={c.path} role="none">
            <NavLink
              to={c.path}
              className={({ isActive }) =>
                `ct-dropdown-item${isActive ? " active" : ""}`
              }
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="ct-dropdown-dot" aria-hidden="true" />
              {c.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ── Mobile Nav Item ── */
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isParentActive =
    item.children &&
    (location.pathname === item.path ||
      item.children.some((c) => location.pathname.startsWith(c.path)));

  if (!item.children) {
    return (
      <li className="ct-mob-item">
        <NavLink
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `ct-mob-link${isActive ? " active" : ""}`
          }
          onClick={onClose}
        >
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li className="ct-mob-item">
      <button
        className={`ct-mob-parent${isParentActive ? " active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.label}</span>
        <svg
          className={`ct-mob-chevron${open ? " rotated" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="ct-mob-sub"
        style={{ maxHeight: open ? `${item.children.length * 52}px` : "0" }}
      >
        {item.children.map((c) => (
          <NavLink
            key={c.path}
            to={c.path}
            className={({ isActive }) =>
              `ct-mob-sub-link${isActive ? " active" : ""}`
            }
            onClick={onClose}
          >
            ›&nbsp;{c.label}
          </NavLink>
        ))}
      </div>
    </li>
  );
}

/* ── Main Header ── */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerFade, setTickerFade] = useState(true);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTickerFade(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % TICKERS.length);
        setTickerFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        /* ── Scripture & Live Ticker ── */
        .ct-ticker {
          background: linear-gradient(90deg, #0B2318 0%, #123727 20%, #1E5641 50%, #123727 80%, #0B2318 100%);
          color: var(--gold-bright);
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          padding: 8px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          overflow: hidden;
          min-height: 34px;
          border-bottom: 1px solid rgba(214, 182, 107, 0.22);
          position: relative;
        }
        .ct-ticker::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(214,182,107,0.07) 0%, transparent 60%);
          pointer-events: none;
        }
        .ct-ticker-cross {
          color: var(--gold);
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        .ct-ticker-text {
          font-style: italic;
          transition: opacity 0.4s ease;
          text-align: center;
          font-weight: 500;
        }
        .ct-ticker-text.fade { opacity: 0; }

        /* ── Header Shell ── */
        .ct-header {
          position: sticky;
          top: 0;
          z-index: 900;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          border-bottom: 2px solid var(--border-gold-subtle);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
          font-family: var(--font-sans);
        }
        .ct-header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 28px rgba(12, 34, 25, 0.1);
          border-color: var(--border-gold);
        }
        .ct-header-inner {
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 28px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
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
          width: 50px;
          height: 50px;
          background: #ffffff;
          border-radius: 50%;
          border: 2px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(12, 34, 25, 0.15), 0 0 12px rgba(214, 182, 107, 0.25);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s;
          flex-shrink: 0;
          overflow: hidden;
        }
        .ct-logo:hover .ct-logo-icon {
          transform: scale(1.06) rotate(2deg);
          box-shadow: 0 6px 22px rgba(214, 182, 107, 0.45);
        }
        .ct-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ct-logo-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--green);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
          line-height: 1.15;
        }
        .ct-logo-sub {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-dark);
          display: block;
          margin-top: 3px;
          font-weight: 600;
        }

        /* ── Desktop Nav ── */
        .ct-nav-list {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .ct-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 9px 12px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--green);
          text-decoration: none;
          border-radius: 8px;
          position: relative;
          letter-spacing: 0.01em;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .ct-nav-link::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--gold);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.22s ease;
          transform-origin: center;
        }
        .ct-nav-link:hover,
        .ct-nav-link.active {
          color: var(--green-deep);
          background: rgba(214, 182, 107, 0.1);
        }
        .ct-nav-link:hover::after,
        .ct-nav-link.active::after { transform: scaleX(1); }

        .ct-chevron {
          transition: transform 0.22s ease;
          flex-shrink: 0;
          opacity: 0.7;
        }
        .ct-chevron.rotated { transform: rotate(180deg); opacity: 1; }

        /* Dropdown wrapper */
        .ct-dropdown-wrap { position: relative; }
        .ct-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 16px 50px rgba(12, 34, 25, 0.16), 0 2px 10px rgba(214, 182, 107, 0.15);
          border: 1.5px solid var(--border-gold);
          padding: 8px;
          min-width: 215px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 1000;
          list-style: none;
        }
        .ct-dropdown::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 6px;
          background: white;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .ct-dropdown.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        .ct-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          font-size: 0.83rem;
          font-weight: 500;
          color: var(--text-main);
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.18s, color 0.18s, padding-left 0.18s;
          white-space: nowrap;
        }
        .ct-dropdown-item:hover,
        .ct-dropdown-item.active {
          background: rgba(214, 182, 107, 0.12);
          color: var(--green);
          padding-left: 18px;
        }
        .ct-dropdown-item.active { font-weight: 700; }
        .ct-dropdown-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border-gold);
          flex-shrink: 0;
          transition: background 0.18s;
        }
        .ct-dropdown-item:hover .ct-dropdown-dot,
        .ct-dropdown-item.active .ct-dropdown-dot {
          background: var(--gold);
        }

        /* ── Live Stream / CTA Button ── */
        .ct-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--grad-gold);
          color: #122D24;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 9px 18px;
          border-radius: 50px;
          border: 1px solid rgba(214, 182, 107, 0.5);
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 4px 18px rgba(214, 182, 107, 0.35);
          transition: transform 0.25s, box-shadow 0.25s, filter 0.25s;
        }
        .ct-live-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(214, 182, 107, 0.45);
          filter: brightness(1.05);
        }
        .ct-live-dot {
          width: 8px;
          height: 8px;
          background: var(--crimson);
          border-radius: 50%;
          animation: pulse-dot 1.4s infinite;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(158, 27, 36, 0.6);
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.65); }
        }

        /* ── Mobile Hamburger ── */
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
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .ct-hamburger:hover { background: rgba(214, 182, 107, 0.12); }
        .ct-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--grad-green-accent);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.2s ease, width 0.25s ease;
        }
        .ct-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ct-hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .ct-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile Drawer ── */
        .ct-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(9, 28, 19, 0.65);
          backdrop-filter: blur(4px);
          z-index: 995;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .ct-overlay.show { opacity: 1; }

        .ct-drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100dvh;
          width: min(320px, 88vw);
          background: var(--white);
          z-index: 997;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(9, 28, 19, 0.25);
          overflow-y: auto;
          border-left: 2px solid var(--border-gold);
        }
        .ct-drawer.open { transform: translateX(0); }
        .ct-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          background: var(--grad-sanctuary);
          color: var(--ivory);
          flex-shrink: 0;
          border-bottom: 2px solid var(--border-gold);
        }
        .ct-drawer-close {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          color: var(--ivory);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
        }

        .ct-mob-list {
          list-style: none;
          padding: 16px 12px;
          margin: 0;
          flex-grow: 1;
        }
        .ct-mob-item { margin-bottom: 4px; }
        .ct-mob-link,
        .ct-mob-parent {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-main);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          text-align: left;
        }
        .ct-mob-link:hover,
        .ct-mob-parent:hover,
        .ct-mob-link.active,
        .ct-mob-parent.active {
          background: rgba(214, 182, 107, 0.12);
          color: var(--green);
        }
        .ct-mob-sub {
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding-left: 14px;
        }
        .ct-mob-sub-link {
          display: block;
          padding: 9px 14px;
          font-size: 0.84rem;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
        }
        .ct-mob-sub-link:hover,
        .ct-mob-sub-link.active {
          color: var(--green);
          font-weight: 700;
          background: rgba(214, 182, 107, 0.08);
        }
        .ct-mob-chevron {
          transition: transform 0.25s ease;
          opacity: 0.7;
        }
        .ct-mob-chevron.rotated { transform: rotate(180deg); }

        .ct-drawer-footer {
          padding: 20px;
          background: var(--ivory);
          border-top: 1px solid var(--border-gold-subtle);
        }

        /* ── Responsive Breakpoints ── */
        @media (max-width: 1024px) {
          .ct-nav-list { display: none; }
          .ct-hamburger { display: flex; }
          .ct-overlay { display: block; }
          .ct-header-inner { padding: 0 18px; height: 68px; }
        }
        @media (max-width: 768px) {
          .ct-header-inner { padding: 0 16px; height: 64px; }
          .ct-logo-name { font-size: 0.98rem; }
          .ct-logo-sub { font-size: 0.55rem; }
          .ct-live-btn { padding: 8px 14px; font-size: 0.74rem; }
        }
        @media (max-width: 540px) {
          .ct-header-inner { padding: 0 12px; height: 60px; gap: 6px; }
          .ct-logo { gap: 8px; }
          .ct-logo-icon { width: 38px; height: 38px; }
          .ct-logo-name { font-size: 0.9rem; letter-spacing: 0.02em; }
          .ct-logo-sub { display: none; }
          .ct-live-btn { padding: 6px 10px; font-size: 0.7rem; gap: 5px; }
          .ct-ticker { font-size: 0.72rem; padding: 6px 12px; min-height: 28px; }
        }
        @media (max-width: 380px) {
          .ct-logo-name { font-size: 0.82rem; }
          .ct-live-btn span:last-child { display: none; } /* Show pulsing dot only */
          .ct-live-btn { padding: 6px 8px; }
        }
      `}</style>

      {/* ── Top Scripture Ticker ── */}
      <div className="ct-ticker" role="region" aria-label="Scripture Announcement">
        <FaCross className="ct-ticker-cross" aria-hidden="true" style={{ fontSize: "0.85rem", flexShrink: 0 }} />
        <span className={`ct-ticker-text${tickerFade ? "" : " fade"}`}>
          {TICKERS[tickerIdx]}
        </span>
      </div>

      {/* ── Main Sticky Header ── */}
      <header className={`ct-header${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="ct-header-inner">
          {/* Logo */}
          <Link to="/" className="ct-logo" aria-label="Christ's Tabernacle Home">
            <div className="ct-logo-icon">
              <img
                src={logoImg}
                alt="Christ's Tabernacle Emblem"
                className="ct-logo-img"
              />
            </div>
            <div>
              <span className="ct-logo-name">Christ's Tabernacle</span>
              <span className="ct-logo-sub">Prayer &amp; Worship Centre • Est. 1991</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation">
            <ul className="ct-nav-list">
              {NAV.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </ul>
          </nav>

          {/* Live Stream CTA Button */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link to="/prayers/sunday-services" className="ct-live-btn" aria-label="Watch Live Service">
              <span className="ct-live-dot" aria-hidden="true" />
              <MdLiveTv style={{ fontSize: "1rem" }} />
              <span>Live Service</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`ct-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer & Backdrop ── */}
      <div
        className={`ct-overlay${menuOpen ? " show" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      />
      <div
        className={`ct-drawer${menuOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="ct-drawer-head">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={logoImg}
              alt=""
              style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid var(--gold)" }}
            />
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", fontWeight: 700, color: "var(--ivory)" }}>
              Christ's Tabernacle
            </span>
          </div>
          <button className="ct-drawer-close" onClick={closeMenu} aria-label="Close menu">
            ✕
          </button>
        </div>

        <ul className="ct-mob-list">
          {NAV.map((item) => (
            <MobileNavItem key={item.path} item={item} onClose={closeMenu} />
          ))}
        </ul>

        <div className="ct-drawer-footer">
          <Link
            to="/contact"
            className="ct-btn-gold"
            onClick={closeMenu}
            style={{ width: "100%", textAlign: "center", justifyContent: "center" }}
          >
            🙏 Submit Prayer Request
          </Link>
          <p style={{ fontSize: "0.74rem", color: "var(--text-muted)", textAlign: "center", marginTop: 14 }}>
            Sunday Worship: 8:15 AM – 11:15 AM
          </p>
        </div>
      </div>
    </>
  );
}
