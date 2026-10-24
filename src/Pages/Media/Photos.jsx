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
  const [loading, setLoading] = useState(true);

  // Helper for dynamic media URLs (local assets or uploaded / backend URLs)
  const resolvePhotoUrl = (img) => {
    if (!img) return "";
    if (typeof img === "string") {
      if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
        return img;
      }
      if (img.startsWith("/uploads/") || img.startsWith("uploads/")) {
        const clean = img.startsWith("/") ? img : `/${img}`;
        return `http://localhost:5000${clean}`;
      }
    }
    return img;
  };

  useEffect(() => {
    let mounted = true;
    const fetchDynamicPhotos = async () => {
      try {
        setLoading(true);
        const data = await getPublicPhotos(selectedCat === "All" ? "" : selectedCat);
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          if (selectedCat === "All") {
            const dynamicIds = new Set(data.map(d => String(d._id || d.id)));
            const fallbackUniques = PHOTO_GALLERY.filter(p => !dynamicIds.has(String(p.id)));
            setPhotos([...data, ...fallbackUniques]);
          } else {
            setPhotos(data);
          }
        } else if (selectedCat === "All") {
          setPhotos(PHOTO_GALLERY);
        } else {
          const localFiltered = PHOTO_GALLERY.filter(p => p.category?.toLowerCase() === selectedCat.toLowerCase());
          setPhotos(localFiltered);
        }
      } catch (err) {
        console.warn("Using offline gallery fallback:", err);
        if (mounted) {
          const fallback = selectedCat === "All"
            ? PHOTO_GALLERY
            : PHOTO_GALLERY.filter(p => p.category?.toLowerCase() === selectedCat.toLowerCase());
          setPhotos(fallback);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchDynamicPhotos();
    return () => { mounted = false; };
  }, [selectedCat]);

  const categoriesList = ["All", "Leadership", "Events", "Worship", "Sanctuary", "Prayer", "Scripture"];

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
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .photo-card {
          background: #0C2219;
          border-radius: 16px;
          border: 1.5px solid rgba(214, 182, 107, 0.28);
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(18, 45, 36, 0.08);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s, border-color 0.28s;
          cursor: pointer;
          position: relative;
          aspect-ratio: 4 / 3;
          display: block;
        }
        .photo-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 14px 32px rgba(18, 45, 36, 0.16);
          border-color: var(--gold);
        }
        .photo-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .photo-card:hover .photo-thumb {
          transform: scale(1.08);
        }
        .photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(12, 34, 25, 0.1) 0%, rgba(12, 34, 25, 0.45) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .photo-card:hover .photo-overlay {
          opacity: 1;
        }
        .photo-zoom-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(214, 182, 107, 0.95);
          color: var(--green-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
          transform: scale(0.85);
          transition: transform 0.2s ease;
        }
        .photo-card:hover .photo-zoom-btn {
          transform: scale(1);
        }

        /* Lightbox */
        .lightbox-modal {
          position: fixed;
          inset: 0;
          background: rgba(9, 28, 19, 0.95);
          backdrop-filter: blur(12px);
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .lightbox-content {
          max-width: 1000px;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .lightbox-img {
          width: 100%;
          max-height: 82vh;
          object-fit: contain;
          border-radius: 16px;
          border: 2px solid rgba(214, 182, 107, 0.6);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.65);
          display: block;
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

      {/* Grid: Photo Only (No Title, No Description) */}
      <div className="photo-grid">
        {filtered.map((item) => (
          <article
            key={item._id || item.id}
            className="photo-card"
            onClick={() => setLightboxPhoto(item)}
            role="button"
            tabIndex={0}
            aria-label="View photo"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxPhoto(item);
            }}
          >
            <img src={resolvePhotoUrl(item.image)} alt="" className="photo-thumb" loading="lazy" />
            <div className="photo-overlay">
              <div className="photo-zoom-btn">⤢</div>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox Modal: Photo Only */}
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
              style={{
                position: "absolute",
                top: -16,
                right: -16,
                background: "var(--gold)",
                color: "var(--green-dark)",
                border: "none",
                width: 36,
                height: 36,
                borderRadius: "50%",
                fontSize: "1rem",
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 20
              }}
            >
              ✕
            </button>
            <img
              src={resolvePhotoUrl(lightboxPhoto.image)}
              alt=""
              className="lightbox-img"
            />
          </div>
        </div>
      )}
    </>
  );
}
