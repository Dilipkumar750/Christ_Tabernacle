import sanctuaryImg from "../../assets/sanctuary.jpg";
import worshipImg from "../../assets/worship.jpg";
import bibleImg from "../../assets/bible.jpg";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import saravanan2Img from "../../assets/saravanan2.jpeg";
import saravananImg from "../../assets/saravanan.jpeg";
import outdoorFellowshipImg from "../../assets/image1.jpeg";

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
    summary:
      "A sacred continuous worship experience featuring classic Tamil and English praise anthems, anointing of the Holy Spirit, and corporate intercession.",
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
    summary:
      "Practical biblical principles for parents, youth, and Sunday School leaders to nurture faith that endures.",
  },
];

const CATEGORIES = ["All", "Sunday Service", "Fasting Prayer", "Worship", "Bible Study", "Family"];

export default function Videos() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);

  const filtered =
    selectedCat === "All"
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === selectedCat);

  return (
    <>
      <style>{`
        .vid-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .vid-filter-btn {
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 600;
          border: 1.5px solid var(--border-gold-subtle);
          background: var(--white);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.22s;
        }
        .vid-filter-btn:hover {
          color: var(--green);
          border-color: var(--gold);
        }
        .vid-filter-btn.active {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
          border-color: var(--gold);
          font-weight: 700;
        }

        .vid-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .vid-card {
          background: var(--white);
          border-radius: 18px;
          border: 1.5px solid var(--border-gold-subtle);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          flex-direction: column;
        }
        .vid-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
        }
        .vid-thumb-wrap {
          position: relative;
          height: 200px;
          background: #000;
          cursor: pointer;
        }
        .vid-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.88;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .vid-card:hover .vid-thumb {
          transform: scale(1.04);
          opacity: 0.98;
        }
        .vid-play-btn {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--grad-gold);
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
          background: rgba(0, 0, 0, 0.75);
          color: var(--white);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .vid-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(12, 34, 25, 0.85);
          color: var(--gold-bright);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid var(--border-gold);
        }

        .vid-body {
          padding: 22px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .vid-title {
          font-family: var(--font-serif);
          font-size: 1.18rem;
          color: var(--green-dark);
          margin: 0 0 8px;
          font-weight: 700;
          line-height: 1.35;
        }
        .vid-meta {
          font-size: 0.78rem;
          color: var(--gold-dark);
          font-weight: 600;
          margin-bottom: 10px;
        }
        .vid-summary {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0 0 16px;
          flex-grow: 1;
        }
        .vid-footer {
          border-top: 1px solid var(--border-gold-subtle);
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
          color: var(--text-light);
        }
      `}</style>

      {/* Filters */}
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

      {/* Grid */}
      <div className="vid-grid">
        {filtered.map((v) => (
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
              <img src={v.thumbnail} alt={v.title} className="vid-thumb" />
              <div className="vid-play-btn" aria-hidden="true">▶</div>
              <span className="vid-badge">{v.category}</span>
              <span className="vid-duration">{v.duration}</span>
            </div>
            <div className="vid-body">
              <h3 className="vid-title">{v.title}</h3>
              <div className="vid-meta">
                <span>👤 {v.speaker}</span> • <span>📖 {v.passage}</span>
              </div>
              <p className="vid-summary">{v.summary}</p>
              <div className="vid-footer">
                <span>📅 {v.date}</span>
                <button
                  onClick={() => setActiveVideo(v)}
                  style={{ color: "var(--green)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                >
                  Watch Video →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Video Watch Modal */}
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
            style={{ maxWidth: 800 }}
          >
            <button
              className="ct-modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video player"
            >
              ✕
            </button>

            {/* Simulated Clean Player */}
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
                border: "2px solid var(--border-gold)",
              }}
            >
              <img
                src={activeVideo.thumbnail}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
              />
              <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "20px" }}>
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: "var(--grad-gold)",
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
                <h4 style={{ color: "var(--ivory)", fontFamily: "var(--font-serif)", fontSize: "1.3rem", margin: "0 0 6px" }}>
                  {activeVideo.title}
                </h4>
                <p style={{ color: "var(--gold-bright)", fontSize: "0.88rem" }}>
                  Streaming from Christ's Tabernacle Media Archive • {activeVideo.duration}
                </p>
              </div>
            </div>

            <div>
              <span className="ct-badge" style={{ marginBottom: 8 }}>
                {activeVideo.category} • {activeVideo.date}
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", color: "var(--green-dark)", margin: "4px 0 6px" }}>
                {activeVideo.title}
              </h3>
              <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "0.88rem", marginBottom: 12 }}>
                Ministered by {activeVideo.speaker} • Scripture: {activeVideo.passage}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.75 }}>
                {activeVideo.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
