import { useState, useEffect } from "react";
import { getPublicPhotos } from "../../services/api";
const CATEGORIES = ["All", "Leadership", "Events", "Worship", "Sanctuary", "Prayer", "Scripture"];

export default function Photos() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
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
        return `https://christ-tabernacle-backend-six.vercel.app${clean}`;
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
        if (Array.isArray(data)) {
          setPhotos(data);
        }
      } catch (err) {
        console.warn("Failed to load photos from backend:", err);
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
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#184332", fontWeight: 600 }}>
          Loading photos...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748B", fontSize: "0.95rem" }}>
          No photos found in this category.
        </div>
      ) : (
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
      )}

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
