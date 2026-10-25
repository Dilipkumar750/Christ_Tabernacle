import { useState, useMemo } from "react";
import sanctuaryImg from "../../assets/sanctuary.jpg";
import worshipImg from "../../assets/worship.jpg";
import bibleImg from "../../assets/bible.jpg";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import saravanan2Img from "../../assets/saravanan2.jpeg";
import saravananImg from "../../assets/saravanan.jpeg";
import outdoorFellowshipImg from "../../assets/image1.jpeg";

// Helper to extract YouTube video ID
function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getYouTubeEmbedUrl(url) {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
}

function getYouTubeWatchUrl(url) {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url || null;
}

function getYouTubeThumbnail(url) {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

const VIDEOS = [
  {
    id: 1,
    title: "Walking in Divine Authority & Deliverance",
    speaker: "Pastor Saravanan Immanuel",
    passage: "Luke 10:19",
    category: "Sunday Service",
    duration: "1h 18m",
    date: "October 4, 2026",
    thumbnail: saravanan3Img,
    youtubeUrl: "https://www.youtube.com/watch?v=kYI9Fj9-X3I",
    summary:
      "A profound expository message on exercising the authority given by Christ over every power of the enemy. Learn how to take spiritual ground for your family and future through prevailing prayer.",
  },
  {
    id: 2,
    title: "The Fire of Prevailing Prayer & Fasting",
    speaker: "Eva. Glory Devapiriyam",
    passage: "Isaiah 58:6–9",
    category: "Fasting Prayer",
    duration: "52m",
    date: "September 28, 2026",
    thumbnail: worshipImg,
    youtubeUrl: "https://www.youtube.com/watch?v=Jbe7OpxHNoU",
    summary:
      "Why biblical fasting breaks spiritual strongholds and opens the floodgates of God's supernatural deliverance. Powerful testimonies from decades of ministry.",
  },
  {
    id: 3,
    title: "Deep In Worship: Songs of the Blood & Cross",
    speaker: "Christ's Tabernacle Choir",
    passage: "Psalm 100:1–5",
    category: "Worship",
    duration: "45m",
    date: "September 21, 2026",
    thumbnail: outdoorFellowshipImg,
    youtubeUrl: "https://www.youtube.com/watch?v=pP4q32N6z0c",
    summary:
      "A sacred continuous worship experience featuring classic praise anthems, anointing of the Holy Spirit, and corporate intercession.",
  },
  {
    id: 4,
    title: "Overcoming Fear Through the Living Word",
    speaker: "Pastor Saravanan Immanuel",
    passage: "2 Timothy 1:7",
    category: "Bible Study",
    duration: "1h 05m",
    date: "September 14, 2026",
    thumbnail: saravanan2Img,
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
    summary:
      "Systematic verse-by-verse exploration of spiritual courage in Christ. Conquering anxiety, panic, and doubt with the sword of the Spirit.",
  },
  {
    id: 5,
    title: "The Power of the New Covenant in Christ",
    speaker: "Pastor Saravanan Immanuel",
    passage: "Hebrews 8:6–13",
    category: "Sunday Service",
    duration: "1h 12m",
    date: "September 7, 2026",
    thumbnail: saravananImg,
    youtubeUrl: "https://www.youtube.com/watch?v=0VUGv2jL_eE",
    summary:
      "Understanding the unmatched promises of the New Covenant ratified by the precious blood of Jesus Christ.",
  },
  {
    id: 6,
    title: "Raising Godly Generations in Turbulent Times",
    speaker: "Pastoral Team",
    passage: "Proverbs 22:6",
    category: "Family",
    duration: "48m",
    date: "August 30, 2026",
    thumbnail: bibleImg,
    youtubeUrl: "https://www.youtube.com/watch?v=2G8wZ1-y-U8",
    summary:
      "Practical biblical principles for parents, youth, and Sunday School leaders to nurture faith that endures.",
  },
];

const CATEGORIES = ["All", "Sunday Service", "Fasting Prayer", "Worship", "Bible Study", "Family"];

export default function Videos() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

  const filtered = useMemo(() => {
    return VIDEOS.filter((v) => {
      const matchesCat = selectedCat === "All" || v.category === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.speaker.toLowerCase().includes(q) ||
        v.passage.toLowerCase().includes(q) ||
        v.summary.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <>
      <style>{`
        .vid-header-banner {
          background: linear-gradient(135deg, #0c2419 0%, #184332 100%);
          border: 1.5px solid rgba(214, 182, 107, 0.35);
          border-radius: 18px;
          padding: 26px 30px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
          box-shadow: 0 10px 30px rgba(12, 36, 25, 0.15);
        }
        .vid-header-content {
          max-width: 650px;
        }
        .vid-header-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(220, 38, 38, 0.2);
          border: 1px solid #EF4444;
          color: #FCA5A5;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 50px;
          margin-bottom: 8px;
        }
        .vid-header-tag::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #EF4444;
          animation: pulseRed 1.6s infinite;
        }
        @keyframes pulseRed {
          0% { transform: scale(0.9); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(0.9); opacity: 1; }
        }
        .vid-header-title {
          font-family: var(--font-serif, serif);
          color: #FAF6EE;
          font-size: 1.5rem;
          margin: 0 0 6px;
          font-weight: 700;
        }
        .vid-header-desc {
          color: rgba(250, 246, 238, 0.8);
          font-size: 0.88rem;
          margin: 0;
          line-height: 1.55;
        }
        .vid-yt-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #CC0000;
          color: #FFFFFF;
          padding: 11px 22px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(204, 0, 0, 0.35);
          transition: transform 0.2s, background 0.2s;
        }
        .vid-yt-btn:hover {
          transform: translateY(-2px);
          background: #E60000;
        }

        .vid-controls {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 34px;
        }
        .vid-search-box {
          position: relative;
          max-width: 500px;
          margin: 0 auto;
          width: 100%;
        }
        .vid-search-input {
          width: 100%;
          padding: 12px 18px 12px 42px;
          border-radius: 50px;
          border: 1.5px solid var(--border-gold-subtle, #CBD5E1);
          background: #FFFFFF;
          font-size: 0.92rem;
          color: #122D24;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vid-search-input:focus {
          border-color: #A88A42;
          box-shadow: 0 0 0 3px rgba(168, 138, 66, 0.15);
        }
        .vid-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748B;
          font-size: 0.95rem;
        }

        .vid-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .vid-filter-btn {
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 600;
          border: 1.5px solid var(--border-gold-subtle, #E2E8F0);
          background: var(--white, #FFFFFF);
          color: var(--text-muted, #475569);
          cursor: pointer;
          transition: all 0.22s;
        }
        .vid-filter-btn:hover {
          color: var(--green, #184332);
          border-color: var(--gold, #A88A42);
        }
        .vid-filter-btn.active {
          background: var(--grad-green-accent, #184332);
          color: #FAF6EE;
          border-color: var(--gold, #A88A42);
          font-weight: 700;
        }

        .vid-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 26px;
        }
        .vid-card {
          background: var(--white, #FFFFFF);
          border-radius: 18px;
          border: 1.5px solid rgba(214, 182, 107, 0.25);
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(18, 45, 36, 0.06);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          flex-direction: column;
        }
        .vid-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(18, 45, 36, 0.12);
          border-color: var(--gold, #A88A42);
        }
        .vid-thumb-wrap {
          position: relative;
          height: 195px;
          background: #0C2219;
          cursor: pointer;
          overflow: hidden;
        }
        .vid-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.9;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .vid-card:hover .vid-thumb {
          transform: scale(1.05);
          opacity: 1;
        }
        .vid-play-btn {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D4AF37 0%, #A88A42 100%);
          color: #122D24;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          transition: transform 0.25s, filter 0.25s;
        }
        .vid-card:hover .vid-play-btn {
          transform: scale(1.12);
          filter: brightness(1.1);
        }
        .vid-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.78);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .vid-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(12, 34, 25, 0.88);
          color: #FAF6EE;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid rgba(214, 182, 107, 0.4);
        }

        .vid-body {
          padding: 20px 22px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .vid-title {
          font-family: var(--font-serif, serif);
          font-size: 1.15rem;
          color: var(--green-dark, #122D24);
          margin: 0 0 8px;
          font-weight: 700;
          line-height: 1.35;
        }
        .vid-meta {
          font-size: 0.78rem;
          color: var(--gold-dark, #8A6D30);
          font-weight: 600;
          margin-bottom: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }
        .vid-summary {
          font-size: 0.86rem;
          color: var(--text-muted, #475569);
          line-height: 1.6;
          margin: 0 0 16px;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .vid-footer {
          border-top: 1px solid rgba(226, 232, 240, 0.8);
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
          color: var(--text-light, #64748B);
        }
        .vid-watch-link {
          color: var(--green, #184332);
          font-weight: 700;
          font-size: 0.84rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .vid-watch-link:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Top Broadcast Banner */}
      <div className="vid-header-banner">
        <div className="vid-header-content">
          <div className="vid-header-tag">Live &amp; Recorded Broadcasts</div>
          <h2 className="vid-header-title">Sermon Archives &amp; Worship Broadcasts</h2>
          <p className="vid-header-desc">
            Watch Sunday communion messages, all-night prayer sermons, youth fellowships, and choral worship from Christ's Tabernacle.
          </p>
        </div>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="vid-yt-btn"
        >
          <span>📺</span> Subscribe on YouTube
        </a>
      </div>

      {/* Search & Filters */}
      <div className="vid-controls">
        <div className="vid-search-box">
          <span className="vid-search-icon">🔍</span>
          <input
            type="text"
            className="vid-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sermon title, preacher, or scripture..."
          />
        </div>

        <div className="vid-filters" role="tablist" aria-label="Video Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`vid-filter-btn${selectedCat === cat ? " active" : ""}`}
              onClick={() => setSelectedCat(cat)}
              role="tab"
              aria-selected={selectedCat === cat}
            >
              {cat === "All" ? "🎥 All Messages" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748B" }}>
          <div style={{ fontSize: "2rem", marginBottom: 8 }}>🎬</div>
          <h3 style={{ color: "#122D24", margin: "0 0 6px" }}>No Video Messages Found</h3>
          <p style={{ margin: 0 }}>Try clearing your search query or choosing another category.</p>
        </div>
      ) : (
        <div className="vid-grid">
          {filtered.map((v) => {
            const displayThumb = v.thumbnail || getYouTubeThumbnail(v.youtubeUrl) || saravananImg;
            return (
              <article key={v.id} className="vid-card">
                <div
                  className="vid-thumb-wrap"
                  onClick={() => setActiveVideo(v)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Watch ${v.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setActiveVideo(v);
                  }}
                >
                  <img
                    src={displayThumb}
                    alt={v.title}
                    className="vid-thumb"
                    onError={(e) => {
                      const ytFallback = getYouTubeThumbnail(v.youtubeUrl);
                      if (ytFallback && e.target.src !== ytFallback) {
                        e.target.src = ytFallback;
                      }
                    }}
                  />
                  <div className="vid-play-btn" aria-hidden="true">▶</div>
                  <span className="vid-badge">{v.category}</span>
                  <span className="vid-duration">{v.duration}</span>
                </div>
                <div className="vid-body">
                  <h3 className="vid-title">{v.title}</h3>
                  <div className="vid-meta">
                    <span>👤 {v.speaker}</span>
                    <span>•</span>
                    <span>📖 {v.passage}</span>
                  </div>
                  <p className="vid-summary">{v.summary}</p>
                  <div className="vid-footer">
                    <span>📅 {v.date}</span>
                    <button
                      type="button"
                      className="vid-watch-link"
                      onClick={() => setActiveVideo(v)}
                    >
                      Watch Video →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Active Video Player Modal */}
      {activeVideo && (
        <div
          className="ct-modal-backdrop"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="ct-modal-window"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 840, width: "95%", borderRadius: 18, overflow: "hidden" }}
          >
            <button
              className="ct-modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video player"
            >
              ✕
            </button>

            {/* Embedded YouTube Player or Media Player */}
            {getYouTubeEmbedUrl(activeVideo.youtubeUrl) ? (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%", // 16:9 Aspect Ratio
                  height: 0,
                  overflow: "hidden",
                  borderRadius: "14px",
                  background: "#000",
                  marginBottom: "20px",
                  border: "2px solid rgba(214, 182, 107, 0.4)",
                }}
              >
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.youtubeUrl)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  position: "relative",
                  background: "#0C2219",
                  borderRadius: "14px",
                  overflow: "hidden",
                  height: "360px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  border: "2px solid var(--border-gold, #A88A42)",
                }}
              >
                <img
                  src={activeVideo.thumbnail || saravananImg}
                  alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
                />
                <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "20px" }}>
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #D4AF37 0%, #A88A42 100%)",
                      color: "#122D24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      margin: "0 auto 16px",
                      boxShadow: "0 8px 30px rgba(214, 182, 107, 0.4)",
                    }}
                  >
                    ▶
                  </div>
                  <h4 style={{ color: "#FAF6EE", fontFamily: "var(--font-serif, serif)", fontSize: "1.3rem", margin: "0 0 6px" }}>
                    {activeVideo.title}
                  </h4>
                  <p style={{ color: "#D4AF37", fontSize: "0.88rem" }}>
                    Christ's Tabernacle Media Archive • {activeVideo.duration}
                  </p>
                </div>
              </div>
            )}

            {/* Video Details */}
            <div style={{ padding: "0 6px 10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
                <span className="ct-badge" style={{ marginBottom: 0 }}>
                  {activeVideo.category} • {activeVideo.date}
                </span>
                {activeVideo.youtubeUrl && (
                  <a
                    href={getYouTubeWatchUrl(activeVideo.youtubeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#CC0000",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      textDecoration: "none",
                    }}
                  >
                    Watch on YouTube ↗
                  </a>
                )}
              </div>

              <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.45rem", color: "var(--green-dark, #122D24)", margin: "8px 0 6px" }}>
                {activeVideo.title}
              </h3>
              <p style={{ color: "var(--gold-dark, #8A6D30)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 12 }}>
                Ministered by {activeVideo.speaker} • Scripture: {activeVideo.passage} • Duration: {activeVideo.duration}
              </p>
              <p style={{ color: "var(--text-muted, #475569)", fontSize: "0.94rem", lineHeight: 1.75, margin: 0 }}>
                {activeVideo.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
