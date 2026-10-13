import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import logoImg from "../../assets/logo.jpeg";

const TABS = [
  { label: "Our Journey", path: "/about/journey" },
  { label: "Our Motto", path: "/about/motto" },
  { label: "Our Vision", path: "/about/vision" },
  { label: "Our Mission", path: "/about/mission" },
  { label: "Statement of Faith", path: "/about/faith" },
];

export default function About() {
  const { pathname } = useLocation();
  if (pathname === "/about" || pathname === "/about/") {
    return <Navigate to="/about/journey" replace />;
  }

  return (
    <>
      <style>{`
        .about-hero {
          background: var(--grad-sanctuary);
          padding: 72px 24px 50px;
          text-align: center;
          font-family: var(--font-sans);
          position: relative;
          overflow: hidden;
          border-bottom: 2px solid var(--border-gold);
        }
        .about-hero::before {
          content: '✝';
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 220px;
          color: rgba(214, 182, 107, 0.05);
          pointer-events: none;
          font-family: var(--font-serif);
        }
        .about-hero-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
          margin: 0 auto 16px;
          overflow: hidden;
          background: #ffffff;
        }
        .about-hero-badge img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .about-hero-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          margin-bottom: 10px;
        }
        .about-hero h1 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3.2rem);
          color: var(--ivory);
          font-weight: 700;
          margin: 0 0 12px;
        }
        .about-hero h1 span {
          color: var(--gold-bright);
        }
        .about-hero-desc {
          font-size: 1.02rem;
          color: rgba(250, 246, 238, 0.78);
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Tabs Bar ── */
        .about-tabs-bar {
          background: var(--white);
          border-bottom: 2px solid var(--border-gold-subtle);
          padding: 0 24px;
          position: sticky;
          top: 72px;
          z-index: 100;
          font-family: var(--font-sans);
          box-shadow: var(--shadow-sm);
        }
        .about-tabs {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .about-tabs::-webkit-scrollbar {
          display: none;
        }
        .about-tab-link {
          display: inline-flex;
          align-items: center;
          padding: 16px 20px;
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          white-space: nowrap;
          border-bottom: 3px solid transparent;
          transition: all 0.2s ease;
          position: relative;
          bottom: -2px;
          letter-spacing: 0.02em;
        }
        .about-tab-link:hover {
          color: var(--green);
        }
        .about-tab-link.active {
          color: var(--green);
          font-weight: 700;
          border-bottom-color: var(--gold);
        }

        /* ── Content wrapper ── */
        .about-content-wrap {
          max-width: 1060px;
          margin: 0 auto;
          padding: 56px 24px 80px;
          font-family: var(--font-sans);
        }
      `}</style>

      {/* ── Subpage Hero ── */}
      <section className="about-hero" aria-labelledby="about-h1">
        <div className="about-hero-badge">
          <img src={logoImg} alt="Christ's Tabernacle Emblem" />
        </div>
        <div className="about-hero-eyebrow">† Who We Are †</div>
        <h1 id="about-h1">
          About <span>Christ's Tabernacle</span>
        </h1>
        <p className="about-hero-desc">
          Rooted in prayer, established in faith, and called to declare the transformative power and deliverance of Jesus Christ since 1991.
        </p>
      </section>

      {/* ── Sticky Sub-Navigation Tabs ── */}
      <nav className="about-tabs-bar" aria-label="About Us navigation">
        <div className="about-tabs">
          {TABS.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `about-tab-link${isActive ? " active" : ""}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── Nested Route Outlet ── */}
      <main className="about-content-wrap">
        <Outlet />
      </main>
    </>
  );
}
