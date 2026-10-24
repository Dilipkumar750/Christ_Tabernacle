import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import ParticleCross from "../../Components/ParticleCross";

const TABS = [
  { label: "Our Journey", path: "/about/journey", icon: "🕊️" },
  { label: "Our Motto", path: "/about/motto", icon: "✝" },
  { label: "Our Vision", path: "/about/vision", icon: "🌿" },
  { label: "Our Mission", path: "/about/mission", icon: "📢" },
  { label: "Statement of Faith", path: "/about/faith", icon: "📖" },
];

export default function About() {
  const { pathname } = useLocation();

  if (pathname === "/about" || pathname === "/about/") {
    return <Navigate to="/about/journey" replace />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700&display=swap');

        /* ── About Hero ── */
        .about-hero {
          position: relative;
          background: var(--grad-sanctuary-dark);
          padding: 85px 24px 60px;
          text-align: center;
          font-family: var(--font-sans);
          overflow: hidden;
          border-bottom: 1px solid var(--border-gold);
        }

        /* Radial glow backdrop */
        .about-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 80%, rgba(214,182,107,0.1) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 20% 10%, rgba(40,110,82,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 80% 10%, rgba(40,110,82,0.3) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        .about-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0 auto;
        }

        /* Animated church emblem ring */
        .about-emblem-ring {
          width: 96px;
          height: 96px;
          margin: 0 auto 24px;
          position: relative;
          animation: about-ring-pulse 4s ease-in-out infinite;
        }
        @keyframes about-ring-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(214,182,107,0.35)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(214,182,107,0.6)); }
        }
        .about-emblem-ring::before {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
          animation: about-ring-spin 18s linear infinite;
          opacity: 0.65;
        }
        .about-emblem-ring::after {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px dashed rgba(214,182,107,0.35);
          animation: about-ring-spin 30s linear infinite reverse;
        }
        @keyframes about-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .about-emblem-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid var(--gold);
          display: block;
        }

        .about-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          margin-bottom: 16px;
          padding: 6px 20px;
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 50px;
          background: rgba(214,182,107,0.1);
        }

        .about-hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          color: var(--ivory);
          font-weight: 900;
          margin: 0 0 18px;
          line-height: 1.15;
          letter-spacing: -0.01em;
          animation: about-fadein 0.9s ease both;
        }
        @keyframes about-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-hero h1 em {
          font-style: italic;
          color: var(--gold-bright);
        }

        .about-hero-desc {
          font-size: 1.05rem;
          color: rgba(250,246,238,0.85);
          max-width: 600px;
          margin: 0 auto 30px;
          line-height: 1.8;
          animation: about-fadein 0.9s 0.15s ease both;
        }

        /* Stats strip */
        .about-hero-stats {
          display: inline-flex;
          gap: 0;
          border: 1.5px solid rgba(214,182,107,0.3);
          border-radius: 14px;
          overflow: hidden;
          background: rgba(12,34,25,0.7);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          animation: about-fadein 0.9s 0.3s ease both;
        }
        .about-hero-stat {
          padding: 14px 28px;
          border-right: 1px solid rgba(214,182,107,0.25);
        }
        .about-hero-stat:last-child { border-right: none; }
        .about-hero-stat-num {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--gold-bright);
          font-weight: 700;
          line-height: 1;
          display: block;
        }
        .about-hero-stat-label {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(250,246,238,0.7);
          display: block;
          margin-top: 4px;
        }

        /* ── Sticky Green Tabs Bar ── */
        .about-tabs-bar {
          background: #091E15;
          border-bottom: 1.5px solid rgba(214,182,107,0.28);
          border-top: 1px solid rgba(214,182,107,0.15);
          padding: 0 24px;
          position: sticky;
          top: 68px;
          z-index: 90;
          font-family: var(--font-sans);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .about-tabs {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .about-tabs::-webkit-scrollbar { display: none; }

        .about-tab-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 22px;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(250,246,238,0.75);
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: all 0.22s ease;
          position: relative;
          bottom: -1px;
          letter-spacing: 0.02em;
        }
        .about-tab-link .tab-icon {
          font-size: 0.95rem;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .about-tab-link:hover {
          color: var(--gold-bright);
          background: rgba(214,182,107,0.08);
        }
        .about-tab-link:hover .tab-icon { opacity: 1; }
        .about-tab-link.active {
          color: var(--gold-bright);
          font-weight: 700;
          border-bottom-color: var(--gold);
          background: rgba(214,182,107,0.15);
        }
        .about-tab-link.active .tab-icon { opacity: 1; }

        /* ── Content Wrapper (Rich Sanctuary Deep Green Canvas) ── */
        .about-content-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 24px 96px;
          font-family: var(--font-sans);
          background: #0A1F16;
          min-height: 60vh;
        }
        .about-outer-wrap {
          background: #0A1F16;
          width: 100%;
          min-height: 100vh;
        }

        @media (max-width: 680px) {
          .about-hero { padding: 64px 16px 44px; }
          .about-hero-stats { flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .about-hero-stat { padding: 10px 18px; }
          .about-tab-link { padding: 12px 14px; font-size: 0.78rem; gap: 5px; }
          .about-content-wrap { padding: 36px 16px 64px; }
        }
      `}</style>

      <div className="about-outer-wrap">
        {/* ── Hero ── */}
        <section className="about-hero" aria-labelledby="about-h1">
          <ParticleCross />
          <div className="about-hero-inner">
            <div className="about-emblem-ring">
              <img className="about-emblem-img" src={logoImg} alt="Christ's Tabernacle Emblem" />
            </div>
            <div className="about-hero-eyebrow">
              <span>✝</span> Who We Are <span>✝</span>
            </div>
            <h1 id="about-h1">
              About <em>Christ's Tabernacle</em>
            </h1>
            <p className="about-hero-desc">
              Rooted in prayer, established in faith, and called to declare the transformative
              power, divine healing, and deliverance of Jesus Christ since 1991.
            </p>
            <div className="about-hero-stats">
              <div className="about-hero-stat">
                <span className="about-hero-stat-num">33+</span>
                <span className="about-hero-stat-label">Years of Ministry</span>
              </div>
              <div className="about-hero-stat">
                <span className="about-hero-stat-num">1000s</span>
                <span className="about-hero-stat-label">Lives Transformed</span>
              </div>
              <div className="about-hero-stat">
                <span className="about-hero-stat-num">1991</span>
                <span className="about-hero-stat-label">Founded in Faith</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sticky Green Tabs ── */}
        <nav className="about-tabs-bar" aria-label="About Us navigation">
          <div className="about-tabs">
            {TABS.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) => `about-tab-link${isActive ? " active" : ""}`}
              >
                <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
                {tab.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* ── Nested Content ── */}
        <main className="about-content-wrap">
          <Outlet />
        </main>
      </div>
    </>
  );
}
