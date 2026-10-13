import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";

const TABS = [
  { label: "☀️ Sunday Services", path: "/prayers/sunday-services" },
  { label: "🕯️ Fasting Prayers", path: "/prayers/fasting" },
  { label: "🔥 Transformation Prayer", path: "/prayers/transformation" },
  { label: "📖 Discipleship Prayer", path: "/prayers/discipleship" },
  { label: "🏫 Sunday School & Youth", path: "/prayers/sunday-school" },
];

export default function Prayers() {
  const { pathname } = useLocation();
  if (pathname === "/prayers" || pathname === "/prayers/") {
    return <Navigate to="/prayers/sunday-services" replace />;
  }

  return (
    <>
      <section className="ct-page-hero" aria-labelledby="prayers-title">
        <div className="ct-page-hero-eyebrow">† Sanctuary Liturgy &amp; Intercession †</div>
        <h1 id="prayers-title" className="ct-page-hero-title">
          Prayers <span>&amp; Worship</span>
        </h1>
        <p className="ct-page-hero-desc">
          "My house shall be called a house of prayer for all nations." — Isaiah 56:7. Discover our worship gatherings, fasting vigils, discipleship tracks, and children's Sunday School.
        </p>
      </section>

      {/* Tabs */}
      <nav className="ct-subpage-tabs-bar" aria-label="Prayers navigation">
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
