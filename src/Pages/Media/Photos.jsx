import { useState, useEffect } from "react";
import { getPublicPhotos } from "../../services/api";
import sanctuaryImg from "../../assets/sanctuary.jpg";
import modernSanctuaryImg from "../../assets/Modern-Sanctuary.png";
import worshipImg from "../../assets/worship.jpg";
import bibleImg from "../../assets/bible.jpg";
import jesusSaravananImg from "../../assets/jesus_saravanan.jpeg";
import saravananImg from "../../assets/saravanan.jpeg";
import saravanan2Img from "../../assets/saravanan2.jpeg";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import outdoorFellowshipImg from "../../assets/image1.jpeg";
import anniversaryPosterImg from "../../assets/popup.jpeg";
import anniversaryFamilyImg from "../../assets/WhatsApp Image 2026-10-22 at 9.31.10 PM.jpeg";

const PHOTO_GALLERY = [
  {
    id: 1,
    title: "The Divine Calling & Apostolic Mandate",
    category: "Leadership",
    image: jesusSaravananImg,
    caption: "Pastor Saravanan Immanuel receiving the holy vision and mandate from our Lord Jesus Christ to establish Christ's Tabernacle.",
    date: "Apostolic Vision",
  },
  {
    id: 2,
    title: "Pastor Saravanan Immanuel at the Holy Altar",
    category: "Leadership",
    image: saravanan3Img,
    caption: "Senior Pastor Saravanan Immanuel proclaiming the living Gospel at the sacred sanctuary pulpit.",
    date: "Sunday Service",
  },
  {
    id: 3,
    title: "10th Anniversary Grand Celebration",
    category: "Events",
    image: anniversaryPosterImg,
    caption: "Commemorating 10 blessed years of miraculous healing, signs, wonders, and kingdom expansion.",
    date: "Anniversary Jubilee",
  },
  {
    id: 4,
    title: "Pastoral Ministry & Word Proclamation",
    category: "Leadership",
    image: saravananImg,
    caption: "Pastor Saravanan Immanuel ministering with prophetic burden and grace to the congregation.",
    date: "Word Ministry",
  },
  {
    id: 5,
    title: "Outdoor Praise & Thanksgiving Fellowship",
    category: "Worship",
    image: outdoorFellowshipImg,
    caption: "Vibrant assembly of believers praising the Lord under open skies with joyful singing and thanksgiving.",
    date: "Fellowship Gathering",
  },
  {
    id: 6,
    title: "10th Anniversary Pastoral Family Blessing",
    category: "Events",
    image: anniversaryFamilyImg,
    caption: "Pastor Saravanan Immanuel and family during the 10th Church Dedication Anniversary.",
    date: "Church Milestone",
  },
  {
    id: 7,
    title: "Pastor Saravanan Immanuel — Sunday Proclamation",
    category: "Leadership",
    image: saravanan2Img,
    caption: "Inspiring the flock with unwavering faith, hope, and apostolic truth.",
    date: "Sunday Worship",
  },
  {
    id: 8,
    title: "Modern Sanctuary & Sacred Altar",
    category: "Sanctuary",
    image: modernSanctuaryImg,
    caption: "The illuminated cross and main sanctuary altar where Word and worship unite in holy reverence.",
    date: "October 2026",
  },
  {
    id: 9,
    title: "Sunday Morning Worship & Reverence",
    category: "Worship",
    image: worshipImg,
    caption: "Believers lifting holy hands in adoration and praise during the Sunday communion service.",
    date: "September 2026",
  },
  {
    id: 10,
    title: "The Holy Sanctuary Altar",
    category: "Sanctuary",
    image: sanctuaryImg,
    caption: "Christ's Tabernacle prayer auditorium adorned for the glory of the Lord, welcoming seekers.",
    date: "August 2026",
  },
  {
    id: 11,
    title: "The Word of God & Morning Devotion",
    category: "Scripture",
    image: bibleImg,
    caption: "The living Scripture, open on the communion table with the symbol of peace and victory.",
    date: "August 2026",
  },
  {
    id: 12,
    title: "All-Night Fasting Prayer Vigil",
    category: "Prayer",
    image: worshipImg,
    caption: "Fervent intercessory prayer during the monthly New Moon and Full Moon prayer vigils.",
    date: "July 2026",
  },
];

const CATEGORIES = ["All", "Leadership", "Events", "Worship", "Sanctuary", "Prayer", "Scripture"];

export default function Photos() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [photos, setPhotos] = useState(PHOTO_GALLERY);

  useEffect(() => {
    const fetchDynamicPhotos = async () => {
      try {
        const data = await getPublicPhotos(selectedCat);
        if (data && data.length > 0) {
          setPhotos(data);
        }
      } catch (err) {
        // Fallback to static PHOTO_GALLERY silently
      }
    };
    fetchDynamicPhotos();
  }, [selectedCat]);

  const filtered =
    selectedCat === "All"
      ? photos
      : photos.filter((p) => p.category?.toLowerCase() === selectedCat.toLowerCase());

  return (
    <>
      <style>{`
        .photo-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .photo-filter-btn {
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
        .photo-filter-btn:hover {
          color: var(--green);
          border-color: var(--gold);
        }
        .photo-filter-btn.active {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
          border-color: var(--gold);
          font-weight: 700;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 26px;
        }
        .photo-card {
          background: var(--white);
          border-radius: 16px;
          border: 1.5px solid var(--border-gold-subtle);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        .photo-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
        }
        .photo-thumb-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #111;
        }
        .photo-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s ease;
        }
        .photo-card:hover .photo-thumb {
          transform: scale(1.05);
        }
        .photo-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(12, 34, 25, 0.85);
          color: var(--gold-bright);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid var(--gold);
          backdrop-filter: blur(4px);
        }
        .photo-card-body {
          padding: 20px 22px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .photo-card-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--green-dark);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .photo-card-caption {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0 0 14px;
          flex-grow: 1;
        }
        .photo-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.76rem;
          color: var(--gold-dark);
          font-weight: 600;
          border-top: 1px solid var(--border-gold-subtle);
          padding-top: 10px;
        }

        /* Lightbox */
        .lightbox-modal {
          position: fixed;
          inset: 0;
          background: rgba(9, 28, 19, 0.92);
          backdrop-filter: blur(10px);
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .lightbox-content {
          max-width: 900px;
          width: 100%;
          background: var(--white);
          border-radius: 20px;
          border: 2px solid var(--gold);
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
          position: relative;
        }
        .lightbox-img {
          width: 100%;
          max-height: 520px;
          object-fit: cover;
          display: block;
        }
        .lightbox-info {
          padding: 24px 28px;
          background: var(--white);
        }
      `}</style>

      {/* Filters */}
      <div className="photo-filters" role="tablist" aria-label="Photo Categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`photo-filter-btn${selectedCat === cat ? " active" : ""}`}
            onClick={() => setSelectedCat(cat)}
            role="tab"
            aria-selected={selectedCat === cat}
          >
            {cat === "All" ? "🖼️ All Photos" : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="photo-grid">
        {filtered.map((item) => (
          <article
            key={item._id || item.id}
            className="photo-card"
            onClick={() => setLightboxPhoto(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxPhoto(item);
            }}
          >
            <div className="photo-thumb-wrap">
              <img src={item.image} alt={item.title} className="photo-thumb" />
              <span className="photo-badge">{item.category}</span>
            </div>
            <div className="photo-card-body">
              <h3 className="photo-card-title">{item.title}</h3>
              <p className="photo-card-caption">{item.caption}</p>
              <div className="photo-card-meta">
                <span>📅 {item.date}</span>
                <span>🔍 Click to Expand</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="lightbox-modal"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="ct-modal-close"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo view"
            >
              ✕
            </button>
            <img
              src={lightboxPhoto.image}
              alt={lightboxPhoto.title}
              className="lightbox-img"
            />
            <div className="lightbox-info">
              <span className="ct-badge" style={{ marginBottom: 8 }}>
                {lightboxPhoto.category} • {lightboxPhoto.date}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  color: "var(--green-dark)",
                  margin: "6px 0 8px",
                }}
              >
                {lightboxPhoto.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                {lightboxPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
