import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";

const TABS = [
  { label: "📝 Worship Lyrics", path: "/songs/lyrics" },
  { label: "🎵 Audio Recordings", path: "/songs/audio" },
];

export default function Songs() {
  const { pathname } = useLocation();
  if (pathname === "/songs" || pathname === "/songs/") {
    return <Navigate to="/songs/lyrics" replace />;
  }

  return (
    <>
      <section className="ct-page-hero" aria-labelledby="songs-title">
        <div className="ct-page-hero-eyebrow">† Praise &amp; Adoration †</div>
        <h1 id="songs-title" className="ct-page-hero-title">
          Worship <span>&amp; Songs</span>
        </h1>
        <p className="ct-page-hero-desc">
          "Sing to the LORD a new song; sing to the LORD, all the earth." — Psalm 96:1. Access worship lyrics, choruses, and uplifting audio tracks from Christ's Tabernacle.
        </p>
      </section>

      {/* Tabs */}
      <nav className="ct-subpage-tabs-bar" aria-label="Songs navigation">
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
