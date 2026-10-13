import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";

const TABS = [
  { label: "☀️ Sunday Sermons", path: "/sermons/sunday" },
  { label: "📖 Bible Study Expositions", path: "/sermons/bible-study" },
];

export default function Sermons() {
  const { pathname } = useLocation();
  if (pathname === "/sermons" || pathname === "/sermons/") {
    return <Navigate to="/sermons/sunday" replace />;
  }

  return (
    <>
      <section className="ct-page-hero" aria-labelledby="sermons-title">
        <div className="ct-page-hero-eyebrow">† The Ministry of the Word †</div>
        <h1 id="sermons-title" className="ct-page-hero-title">
          Sermons <span>&amp; Bible Study</span>
        </h1>
        <p className="ct-page-hero-desc">
          "Faith comes by hearing, and hearing by the Word of God." — Romans 10:17. Dive into biblical expositions, Sunday messages, and systematic Bible teachings.
        </p>
      </section>

      {/* Tabs */}
      <nav className="ct-subpage-tabs-bar" aria-label="Sermons navigation">
        <div className="ct-subpage-tabs">
          {TABS.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              className={({ isActive }) =>
                `ct-subpage-tab${isActive ? " active" : ""}`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="ct-container" style={{ padding: "48px 24px 80px" }}>
        <Outlet />
      </main>
    </>
  );
}
