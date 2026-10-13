import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";

const TABS = [
  { label: "📷 Photo Gallery", path: "/media/photos" },
  { label: "🎬 Video Messages", path: "/media/videos" },
];

export default function Media() {
  const { pathname } = useLocation();
  if (pathname === "/media" || pathname === "/media/") {
    return <Navigate to="/media/photos" replace />;
  }

  return (
    <>
      <section className="ct-page-hero" aria-labelledby="media-title">
        <div className="ct-page-hero-eyebrow">† Visual &amp; Broadcast Ministry †</div>
        <h1 id="media-title" className="ct-page-hero-title">
          Media <span>&amp; Archives</span>
        </h1>
        <p className="ct-page-hero-desc">
          Browse moments of worship, baptisms, church family milestones, and watch inspiring video messages from Christ's Tabernacle.
        </p>
      </section>

      {/* Tabs */}
      <nav className="ct-subpage-tabs-bar" aria-label="Media navigation">
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
