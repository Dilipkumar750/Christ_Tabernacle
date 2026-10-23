import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function Songs() {
  const { pathname } = useLocation();

  if (pathname === "/songs" || pathname === "/songs/") {
    return <Navigate to="/songs/lyrics" replace />;
  }

  const isDetailPage = Boolean(pathname.match(/^\/songs\/lyrics\/[^/]+/));

  return (
    <>
      {!isDetailPage && (
        <section className="ct-page-hero" aria-labelledby="songs-title">
          <div className="ct-page-hero-eyebrow">† Praise &amp; Adoration †</div>
          <h1 id="songs-title" className="ct-page-hero-title">
            Worship <span>&amp; Lyrics Video Repertoire</span>
          </h1>
          <p className="ct-page-hero-desc">
            "Sing to the LORD a new song; sing to the LORD, all the earth." — Psalm 96:1. Experience sacred worship videos, accurate lyrics, musical chords, and praise choruses from Christ's Tabernacle.
          </p>
        </section>
      )}

      <main className="ct-container" style={{ padding: isDetailPage ? "20px 20px 80px" : "36px 20px 80px", maxWidth: 1440 }}>
        <Outlet />
      </main>
    </>
  );
}
