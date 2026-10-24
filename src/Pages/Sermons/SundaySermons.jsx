import { useState } from "react";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import saravanan2Img from "../../assets/saravanan2.jpeg";
import saravananImg from "../../assets/saravanan.jpeg";

const SUNDAY_SERMONS = [
  {
    id: 1,
    title: "Standing Firm in the Authority of Christ",
    series: "Victorious Living",
    speaker: "Pastor Saravanan Immanuel",
    passage: "Ephesians 6:10–18",
    date: "October 4, 2026",
    image: saravanan3Img,
    keyPoints: [
      "The source of spiritual strength is in the Lord and the power of His might.",
      "The full armor of God is not defensive only; the Sword of the Spirit and prayer wage victorious warfare.",
      "Stand your ground having done all; do not yield to intimidation or demonic lies.",
    ],
    summary:
      "A clarifying sermon unpacking how believers must anchor their identity in Christ's finished work on Calvary to remain steadfast against modern spiritual deceptions and adversities.",
  },
  {
    id: 2,
    title: "The Altar of Prevailing Prayer",
    series: "House of Prayer",
    speaker: "Eva. Glory Devapiriyam",
    passage: "1 Kings 18:30–39",
    date: "September 27, 2026",
    keyPoints: [
      "Repairing the broken altar in our personal devotional lives before expecting heavenly fire.",
      "The sacrifice of consecrated prayer that pleases the Heart of God.",
      "When God answers by fire, every idol falls and hearts turn back to Jesus.",
    ],
    summary:
      "A stirring prophetic call to restore family altars and private secret-place prayer in an era of digital distraction and spiritual lukewarmness.",
  },
  {
    id: 3,
    title: "The Power of the Blood of Jesus",
    series: "Foundations of Faith",
    speaker: "Pastor Saravanan Immanuel",
    passage: "Hebrews 9:11–14; Revelation 12:11",
    date: "September 20, 2026",
    image: saravanan2Img,
    keyPoints: [
      "The blood of Christ purges our conscience from dead works to serve the Living God.",
      "A higher covenant sealed with eternal redemption rather than temporary sacrifices.",
      "Overcoming the accuser through personal proclamation of what the Blood has achieved.",
    ],
    summary:
      "Exploring the profound theological and practical implications of Christ's shed blood for our complete forgiveness, daily cleansing, and spiritual protection.",
  },
  {
    id: 4,
    title: "Divine Healing: Bread for the Children",
    series: "Signs & Wonders",
    speaker: "Pastor Saravanan Immanuel",
    passage: "Matthew 15:21–28; Isaiah 53:4–5",
    date: "September 13, 2026",
    image: saravananImg,
    keyPoints: [
      "Healing was purchased at the whipping post of Calvary just as salvation was on the cross.",
      "Persistent, humble faith that refuses to be turned away from the Master's table.",
      "Ministering health to sick bodies through the authority of Jesus' holy name.",
    ],
    summary:
      "Faith-building exposition demonstrating that divine physical and emotional healing is a covenant privilege freely provided for all who trust in Christ.",
  },
  {
    id: 5,
    title: "Walking in the Fullness of the Holy Spirit",
    series: "Supernatural Walk",
    speaker: "Pastor Saravanan Immanuel",
    passage: "Acts 1:8; Galatians 5:16–25",
    date: "September 6, 2026",
    keyPoints: [
      "The Holy Spirit is not merely an influence, but the third Person of the Trinity.",
      "Baptism in the Holy Spirit provides dunamis power for fearless Christian witness.",
      "Balancing spiritual gifts with the sweet fruit of Christlike character and love.",
    ],
    summary:
      "Comprehensive teaching on being continually filled with the Holy Spirit and yielding to His daily guidance in work, family, and ministry.",
  },
];

const SERIES_LIST = ["All", "Victorious Living", "House of Prayer", "Foundations of Faith", "Signs & Wonders", "Supernatural Walk"];

export default function SundaySermons() {
  const [selectedSeries, setSelectedSeries] = useState("All");
  const [search, setSearch] = useState("");
  const [notesModal, setNotesModal] = useState(null);

  const filtered = SUNDAY_SERMONS.filter((s) => {
    const matchesSeries = selectedSeries === "All" || s.series === selectedSeries;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.passage.toLowerCase().includes(search.toLowerCase()) ||
      s.summary.toLowerCase().includes(search.toLowerCase());
    return matchesSeries && matchesSearch;
  });

  return (
    <>
      <style>{`
        .sermon-filter-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .sermon-search-input {
          padding: 11px 16px;
          border-radius: 50px;
          border: 1.5px solid var(--border-gold-subtle);
          background: var(--white);
          font-family: var(--font-sans);
          font-size: 0.88rem;
          min-width: 260px;
        }
        .sermon-search-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(214, 182, 107, 0.15);
        }

        .sermon-series-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .sermon-series-btn {
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid var(--border-gold-subtle);
          background: var(--white);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }
        .sermon-series-btn:hover {
          color: var(--green);
          border-color: var(--gold);
        }
        .sermon-series-btn.active {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
          border-color: var(--gold);
        }

        .sermons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .sermon-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 18px;
          padding: 30px 26px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          flex-direction: column;
        }
        .sermon-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
        }
        .sermon-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .sermon-series-badge {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--gold-soft);
          color: var(--gold-dark);
          padding: 4px 12px;
          border-radius: 50px;
          border: 1px solid var(--border-gold-subtle);
        }
        .sermon-card-date {
          font-size: 0.76rem;
          color: var(--text-light);
        }
        .sermon-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--green-dark);
          margin: 0 0 8px;
          font-weight: 700;
          line-height: 1.35;
        }
        .sermon-speaker-line {
          font-size: 0.82rem;
          color: var(--gold-dark);
          font-weight: 600;
          margin-bottom: 14px;
        }
        .sermon-summary {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin: 0 0 20px;
          flex-grow: 1;
        }
        .sermon-card-footer {
          border-top: 1px solid var(--border-gold-subtle);
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>

      {/* Filter and Search */}
      <div className="sermon-filter-strip">
        <div className="sermon-series-buttons" role="tablist">
          {SERIES_LIST.map((series) => (
            <button
              key={series}
              className={`sermon-series-btn${selectedSeries === series ? " active" : ""}`}
              onClick={() => setSelectedSeries(series)}
            >
              {series === "All" ? "📜 All Series" : series}
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="🔍 Search sermon topic, scripture..."
          className="sermon-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="sermons-grid">
        {filtered.map((sermon) => (
          <article key={sermon.id} className="sermon-card">
            <div className="sermon-card-head">
              <span className="sermon-series-badge">{sermon.series}</span>
              <span className="sermon-card-date">{sermon.date}</span>
            </div>
            {sermon.image && (
              <div style={{ height: 300, borderRadius: 10, overflow: "hidden", margin: "10px 0 14px", border: "1.5px solid var(--border-gold-subtle)" }}>
                <img src={sermon.image} alt={sermon.speaker} style={{ width: "100%", height: "100%", objectFit: "fit" }} />
              </div>
            )}
            <h3 className="sermon-card-title">{sermon.title}</h3>
            <div className="sermon-speaker-line">
              👤 {sermon.speaker} • 📖 {sermon.passage}
            </div>
            <p className="sermon-summary">{sermon.summary}</p>
            <div className="sermon-card-footer">
              <span style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>
                Sunday Morning Service
              </span>
              <button
                onClick={() => setNotesModal(sermon)}
                className="ct-btn-gold"
                style={{ padding: "8px 16px", fontSize: "0.78rem" }}
              >
                Study Notes 📝
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Notes Modal */}
      {notesModal && (
        <div className="ct-modal-backdrop" onClick={() => setNotesModal(null)}>
          <div className="ct-modal-window" onClick={(e) => e.stopPropagation()}>
            <button
              className="ct-modal-close"
              onClick={() => setNotesModal(null)}
              aria-label="Close sermon notes"
            >
              ✕
            </button>

            <span className="ct-badge" style={{ marginBottom: 10 }}>
              {notesModal.series} • {notesModal.date}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                color: "var(--green-dark)",
                margin: "4px 0 6px",
              }}
            >
              {notesModal.title}
            </h3>
            <p style={{ color: "var(--gold-dark)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 18 }}>
              Ministered by {notesModal.speaker} | Scripture: {notesModal.passage}
            </p>

            <div className="ct-scripture-box" style={{ margin: "16px 0 24px" }}>
              {notesModal.summary}
            </div>

            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.15rem",
                color: "var(--green-dark)",
                marginBottom: "12px",
              }}
            >
              Key Biblical Takeaways &amp; Application:
            </h4>
            <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.94rem" }}>
              {notesModal.keyPoints.map((pt, i) => (
                <li key={i} style={{ marginBottom: 10 }}>
                  {pt}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <button
                onClick={() => setNotesModal(null)}
                className="ct-btn-emerald"
                style={{ width: "100%" }}
              >
                Close Sermon Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
