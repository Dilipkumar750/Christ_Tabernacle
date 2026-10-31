import { useState, useEffect, useMemo, useCallback } from "react";
import { getPublicPhotos } from "../../services/api";
import {
  FaCalendarAlt,
  FaImages,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaExpand,
  FaLayerGroup,
  FaStream,
} from "react-icons/fa";
import banner from "../../assets/gallery-banner.png";
// Spiritual Year Themes for an editorial, sacred sanctuary feel
const YEAR_THEMES = {
  "2026": { title: "Year of Divine Favor & Expansion", scripture: "Psalm 102:13", icon: "✨" },
  "2025": { title: "Year of Supernatural Breakthrough & Grace", scripture: "2 Corinthians 12:9", icon: "🕊️" },
  "2024": { title: "Year of Harvest & Kingdom Revival", scripture: "Galatians 6:9", icon: "🌾" },
  "2023": { title: "Year of Foundation & Steadfast Faith", scripture: "1 Corinthians 15:58", icon: "✝️" },
  "2022": { title: "Year of Restoration & Open Doors", scripture: "Joel 2:25", icon: "🌅" },
  "2021": { title: "Year of Divine Preservation", scripture: "Psalm 91:1-2", icon: "🛡️" },
};

// Rich multi-year church fallback moments (ensures the gallery is never empty)
const SEED_PHOTOS = [
  {
    _id: "seed_1",
    title: "Modern Sanctuary & Sacred Altar",
    category: "Sanctuary",
    image: "https://images.unsplash.com/photo-1548625361-125dd14d18ce?auto=format&fit=crop&w=1200&q=80",
    caption: "The illuminated cross and main sanctuary altar where Word and worship unite in holy reverence.",
    date: "October 2026",
    year: "2026",
    isFeatured: true,
  },
  {
    _id: "seed_2",
    title: "Sunday Morning Worship & Reverence",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
    caption: "Believers lifting holy hands in adoration and praise during the Sunday communion service.",
    date: "September 2026",
    year: "2026",
    isFeatured: true,
  },
  {
    _id: "seed_3",
    title: "The Holy Sanctuary Altar",
    category: "Sanctuary",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80",
    caption: "Christ's Tabernacle prayer auditorium adorned for the glory of the Lord, welcoming seekers.",
    date: "August 2026",
    year: "2026",
    isFeatured: false,
  },
  {
    _id: "seed_4",
    title: "The Word of God & Morning Devotion",
    category: "Scripture",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80",
    caption: "The living Scripture, open on the communion table with the symbol of peace and victory.",
    date: "August 2026",
    year: "2026",
    isFeatured: false,
  },
  {
    _id: "seed_5",
    title: "All-Night Fasting Prayer Vigil",
    category: "Prayer",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    caption: "Fervent intercessory prayer during the monthly New Moon and Full Moon prayer vigils.",
    date: "July 2026",
    year: "2026",
    isFeatured: false,
  },
  {
    _id: "seed_6",
    title: "Pentecost Harvest & Divine Celebration",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=1200&q=80",
    caption: "Joyful congregation lifting praise on Pentecost Sunday.",
    date: "June 2026",
    year: "2026",
    isFeatured: false,
  },
  {
    _id: "seed_7",
    title: "Annual Church Convention & Deliverance Night",
    category: "Events",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80",
    caption: "Believers gathered for the annual regional convention in fellowship.",
    date: "November 2025",
    year: "2025",
    isFeatured: true,
  },
  {
    _id: "seed_8",
    title: "Water Baptism Service at the Living Waters",
    category: "Events",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
    caption: "New converts taking their step of faith in holy baptism.",
    date: "August 2025",
    year: "2025",
    isFeatured: true,
  },
  {
    _id: "seed_9",
    title: "Easter Resurrection Dawn Gathering",
    category: "Sanctuary",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    caption: "Commemorating the glorious resurrection victory of Jesus Christ.",
    date: "April 2025",
    year: "2025",
    isFeatured: false,
  },
  {
    _id: "seed_10",
    title: "Youth Revival & Fellowship Night",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    caption: "Next-generation leaders praising God with passion and devotion.",
    date: "February 2025",
    year: "2025",
    isFeatured: false,
  },
  {
    _id: "seed_11",
    title: "Thanksgiving & Jubilee Choir Praise",
    category: "Worship",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    caption: "Annual choir and orchestral praise night praising the King of kings.",
    date: "December 2024",
    year: "2024",
    isFeatured: true,
  },
  {
    _id: "seed_12",
    title: "Kingdom Discipleship Graduation",
    category: "Events",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    caption: "Equipping saints for kingdom service and local leadership.",
    date: "September 2024",
    year: "2024",
    isFeatured: false,
  },
  {
    _id: "seed_13",
    title: "Holy Communion & Candlelight Prayer Vigil",
    category: "Prayer",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    caption: "Reverent atmosphere at the Lord's table during evening prayer.",
    date: "July 2024",
    year: "2024",
    isFeatured: false,
  },
  {
    _id: "seed_14",
    title: "Sanctuary Dedication & Thanksgiving Milestone",
    category: "Sanctuary",
    image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1200&q=80",
    caption: "Consecrating the prayer hall and altar for generations to come.",
    date: "November 2023",
    year: "2023",
    isFeatured: true,
  },
  {
    _id: "seed_15",
    title: "Miracle Crusade & Gospel Tent Mission",
    category: "Events",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    caption: "Open tent crusade proclaiming divine healing and salvation.",
    date: "August 2023",
    year: "2023",
    isFeatured: false,
  },
];

// Helper to extract or fallback year
function getPhotoYear(photo) {
  if (photo.year && String(photo.year).trim()) {
    return String(photo.year).trim();
  }
  if (photo.date) {
    const match = String(photo.date).match(/\b(19\d{2}|20\d{2})\b/);
    if (match) return match[1];
  }
  if (photo.createdAt) {
    const d = new Date(photo.createdAt);
    if (!isNaN(d.getTime())) return String(d.getFullYear());
  }
  return "2026";
}

// Helper for dynamic media URLs (local assets or uploaded / backend URLs)
function resolvePhotoUrl(img) {
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
}

export default function Photos() {
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("chapters"); // "chapters" | "grid"
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Touch swipe tracking for mobile/tablet lightbox
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Fetch photos from backend with seed fallback
  useEffect(() => {
    let mounted = true;
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const data = await getPublicPhotos("");
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const existingIds = new Set(data.map((p) => p._id || p.id));
          const complementary = SEED_PHOTOS.filter((s) => !existingIds.has(s._id));
          setPhotos([...data, ...complementary]);
        } else {
          setPhotos(SEED_PHOTOS);
        }
      } catch (err) {
        console.warn("Using offline gallery collection:", err);
        if (mounted) setPhotos(SEED_PHOTOS);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadPhotos();
    return () => {
      mounted = false;
    };
  }, []);

  // Compute available years dynamically sorted descending
  const availableYears = useMemo(() => {
    const yearsSet = new Set();
    photos.forEach((p) => {
      const yr = getPhotoYear(p);
      if (yr) yearsSet.add(yr);
    });
    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }, [photos]);

  // Year photo counts for badges
  const yearCounts = useMemo(() => {
    const counts = { All: photos.length };
    photos.forEach((p) => {
      const yr = getPhotoYear(p);
      counts[yr] = (counts[yr] || 0) + 1;
    });
    return counts;
  }, [photos]);

  // Filtered photos based on Year and Search Query
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const pYear = getPhotoYear(p);
      const matchesYear = selectedYear === "All" || pYear === selectedYear;
      const matchesQuery =
        !searchQuery.trim() ||
        (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.caption && p.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.date && p.date.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pYear.includes(searchQuery.trim());
      return matchesYear && matchesQuery;
    });
  }, [photos, selectedYear, searchQuery]);

  // Group photos by Year for chronological timeline chapters
  const groupedByYear = useMemo(() => {
    const groups = {};
    filteredPhotos.forEach((photo) => {
      const yr = getPhotoYear(photo);
      if (!groups[yr]) groups[yr] = [];
      groups[yr].push(photo);
    });
    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map((yr) => ({
        year: yr,
        photos: groups[yr],
        meta: YEAR_THEMES[yr] || { title: `Memories of ${yr}`, scripture: "To God be the Glory", icon: "✦" },
      }));
  }, [filteredPhotos]);

  const activePhotosList = useMemo(() => {
    return filteredPhotos;
  }, [filteredPhotos]);

  // Open Lightbox
  const openLightbox = (photo) => {
    const idx = activePhotosList.findIndex((p) => (p._id || p.id) === (photo._id || photo.id));
    if (idx !== -1) setLightboxIndex(idx);
    else setLightboxIndex(0);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null || activePhotosList.length === 0) return;
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activePhotosList.length - 1));
  }, [lightboxIndex, activePhotosList]);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null || activePhotosList.length === 0) return;
    setLightboxIndex((prev) => (prev < activePhotosList.length - 1 ? prev + 1 : 0));
  }, [lightboxIndex, activePhotosList]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevPhoto, nextPhoto]);

  // Mobile / Tablet Touch Swipe Handling
  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextPhoto(); // swiped left -> next
    } else if (distance < -minSwipeDistance) {
      prevPhoto(); // swiped right -> prev
    }
  };

  const currentLightboxPhoto = lightboxIndex !== null ? activePhotosList[lightboxIndex] : null;

  return (
    <div className="ct-gallery-page">
      <style>{`
        /* ========================================================
           CHRIST'S TABERNACLE — RESPONSIVE YEAR-WISE GALLERY
           Desktop • Tablet • Mobile Fully Optimized
        ======================================================== */
        
        .ct-gallery-page {
          width: 100%;
          min-height: 100vh;
          background: #FAF8F5;
          overflow-x: hidden;
        }

        /* Gallery Banner */
        .ct-gallery-hero {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 0;
  margin: 0;
  line-height: 0;
  background: #FAF8F5;
  border-bottom: 2px solid rgba(214, 182, 107, 0.35);
  overflow: hidden;
}

        .ct-gallery-hero-bg {
          display: block;
          width: 100%;
          min-width: 100%;
          height: 100%;
          object-fit: fill;
          object-position: center;
        }

/* Tablet */
@media (max-width: 1024px) {
  .ct-gallery-hero {
    height: 200px;
  }
}

/* Mobile */
@media (max-width: 640px) {
  .ct-gallery-hero {
    height: 130px;
  }
}

        .ct-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Hero Highlights Bar */
        .ct-gallery-stats-bar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          background: rgba(12, 34, 25, 0.72);
          border: 1px solid rgba(214, 182, 107, 0.28);
          border-radius: 50px;
          padding: 10px 24px;
          backdrop-filter: blur(8px);
          max-width: 100%;
        }

        .ct-gallery-stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: #E8CC8F;
          font-weight: 600;
          white-space: nowrap;
        }

        .ct-gallery-stat-item strong {
          color: #FFFFFF;
          font-weight: 800;
        }

        .ct-gallery-stat-divider {
          color: rgba(214, 182, 107, 0.35);
        }

        /* ── Main Container ── */
        .ct-gallery-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 40px 24px 90px;
          box-sizing: border-box;
        }

        /* ── Sticky Year Toolbar ── */
        .ct-year-nav-wrapper {
          position: sticky;
          top: 76px;
          z-index: 45;
          margin-bottom: 38px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid rgba(214, 182, 107, 0.32);
          border-radius: 18px;
          padding: 12px 18px;
          box-shadow: 0 10px 28px rgba(18, 45, 36, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          transition: top 0.25s ease;
        }

        .ct-year-pills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .ct-year-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.86rem;
          font-weight: 600;
          border: 1.5px solid rgba(24, 67, 50, 0.16);
          background: #FFFFFF;
          color: #4A6355;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
          white-space: nowrap;
          user-select: none;
        }

        .ct-year-pill-btn:hover {
          color: #184332;
          border-color: #D6B66B;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(214, 182, 107, 0.18);
        }

        .ct-year-pill-btn.active {
          background: linear-gradient(135deg, #184332 0%, #0F2C20 100%);
          color: #F5E0B0;
          border-color: #D6B66B;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(24, 67, 50, 0.26), 0 0 0 1px rgba(214, 182, 107, 0.4);
          transform: translateY(-1px);
        }

        .ct-pill-count {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 20px;
          background: rgba(24, 67, 50, 0.08);
          color: #184332;
          transition: all 0.22s;
        }

        .ct-year-pill-btn.active .ct-pill-count {
          background: rgba(214, 182, 107, 0.26);
          color: #FFF0D4;
        }

        /* Controls Right (Search & View Mode) */
        .ct-gallery-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ct-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .ct-search-input {
          padding: 8px 14px 8px 34px;
          border-radius: 50px;
          border: 1.5px solid rgba(24, 67, 50, 0.16);
          background: #FFFFFF;
          font-size: 0.84rem;
          color: #112218;
          outline: none;
          width: 175px;
          transition: all 0.22s;
          font-family: inherit;
        }

        .ct-search-input:focus {
          width: 220px;
          border-color: #D6B66B;
          box-shadow: 0 0 0 3px rgba(214, 182, 107, 0.2);
        }

        .ct-search-icon {
          position: absolute;
          left: 12px;
          color: #7A9288;
          font-size: 0.82rem;
          pointer-events: none;
        }

        .ct-view-toggle {
          display: flex;
          background: #FFFFFF;
          border: 1.5px solid rgba(24, 67, 50, 0.14);
          border-radius: 50px;
          padding: 3px;
        }

        .ct-view-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 50px;
          border: none;
          background: transparent;
          color: #7A9288;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .ct-view-btn.active {
          background: #184332;
          color: #F5E0B0;
        }

        /* ── Year Chapter Section (Chapters Mode) ── */
        .ct-year-chapter {
          margin-bottom: 56px;
          position: relative;
        }

        .ct-year-chapter-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          padding-bottom: 16px;
          margin-bottom: 22px;
          border-bottom: 2px solid rgba(214, 182, 107, 0.26);
          position: relative;
        }

        .ct-year-badge-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ct-year-giant-numeral {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #122D24;
          line-height: 1;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .ct-year-giant-numeral span.cross-emblem {
          color: #D6B66B;
          font-size: 1.5rem;
        }

        .ct-year-theme-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ct-year-title-line {
          font-size: 1rem;
          font-weight: 700;
          color: #184332;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ct-year-scripture {
          font-size: 0.8rem;
          color: #7A9288;
          font-style: italic;
        }

        .ct-year-count-pill {
          background: rgba(214, 182, 107, 0.18);
          border: 1px solid rgba(214, 182, 107, 0.4);
          color: #8C6F2A;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        /* ── Grid Layouts (Desktop, Tablet, Mobile) ── */
        .ct-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        /* Card Architecture */
        .ct-photo-card {
          background: #0C2219;
          border-radius: 16px;
          border: 1.5px solid rgba(214, 182, 107, 0.28);
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(18, 45, 36, 0.08);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, border-color 0.3s;
          cursor: pointer;
          position: relative;
          aspect-ratio: 4 / 3;
          display: block;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .ct-photo-card:hover,
        .ct-photo-card:focus-visible {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 16px 36px rgba(18, 45, 36, 0.2);
          border-color: #D6B66B;
        }

        .ct-photo-card:focus-visible {
          box-shadow: 0 0 0 3px #D6B66B, 0 16px 36px rgba(18, 45, 36, 0.2);
        }

        .ct-photo-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.48s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ct-photo-card:hover .ct-photo-thumb {
          transform: scale(1.08);
        }

        /* ✦ Year Badge on Image ✦ */
        .ct-image-year-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 10;
          background: linear-gradient(135deg, rgba(12, 34, 25, 0.94) 0%, rgba(24, 67, 50, 0.9) 100%);
          border: 1px solid rgba(214, 182, 107, 0.55);
          color: #F5E0B0;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 4px 11px;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          pointer-events: none;
          transition: transform 0.25s ease;
        }

        .ct-image-year-tag .sparkle {
          color: #D6B66B;
          font-size: 0.76rem;
        }

        .ct-photo-card:hover .ct-image-year-tag {
          transform: translateY(-2px);
          border-color: #F5E0B0;
        }

        /* Category Tag */
        .ct-image-category-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 10;
          background: rgba(18, 45, 36, 0.85);
          border: 1px solid rgba(214, 182, 107, 0.32);
          color: #FAF6EE;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 50px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          pointer-events: none;
        }

        /* Card Overlay */
        .ct-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(12, 34, 25, 0.08) 0%, rgba(12, 34, 25, 0.35) 40%, rgba(9, 24, 18, 0.92) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 14px;
          opacity: 0;
          transition: opacity 0.28s ease;
        }

        .ct-photo-card:hover .ct-photo-overlay,
        .ct-photo-card:focus-visible .ct-photo-overlay {
          opacity: 1;
        }

        .ct-overlay-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ct-photo-zoom-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F5E0B0 0%, #D6B66B 100%);
          color: #0C2219;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
          transform: scale(0.85);
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ct-photo-card:hover .ct-photo-zoom-icon {
          transform: scale(1);
        }

        .ct-overlay-bottom {
          color: #FAF6EE;
        }

        .ct-overlay-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 0.94rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ct-overlay-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.76rem;
          color: #E8CC8F;
        }

        /* ── Empty State ── */
        .ct-gallery-empty {
          text-align: center;
          padding: 60px 20px;
          background: #FFFFFF;
          border: 2px dashed rgba(214, 182, 107, 0.4);
          border-radius: 18px;
          margin: 24px 0;
        }

        .ct-gallery-empty-icon {
          font-size: 2.8rem;
          color: #184332;
          margin-bottom: 12px;
        }

        .ct-gallery-empty-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 1.4rem;
          color: #122D24;
          margin-bottom: 8px;
        }

        .ct-gallery-empty-desc {
          color: #4A6355;
          max-width: 420px;
          margin: 0 auto 18px;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        /* ── Lightbox Modal ── */
        .ct-lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 20, 14, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 2500;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: ctFadeIn 0.22s ease;
          touch-action: none;
        }

        @keyframes ctFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .ct-lightbox-nav-top {
          position: absolute;
          top: 18px;
          left: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2510;
        }

        .ct-lightbox-year-pill {
          background: linear-gradient(135deg, #D6B66B 0%, #A88A42 100%);
          color: #0C2219;
          padding: 5px 14px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }

        .ct-lightbox-counter {
          color: rgba(250, 246, 238, 0.75);
          font-size: 0.82rem;
          font-weight: 600;
        }

        .ct-lightbox-close-btn {
          background: rgba(214, 182, 107, 0.2);
          border: 1.5px solid #D6B66B;
          color: #F5E0B0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.2s;
        }

        .ct-lightbox-close-btn:hover {
          background: #D6B66B;
          color: #0C2219;
          transform: scale(1.08);
        }

        .ct-lightbox-center-stage {
          position: relative;
          max-width: 1080px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 0 10px;
        }

        .ct-lightbox-image-wrapper {
          position: relative;
          max-width: 100%;
          max-height: 72vh;
          border-radius: 16px;
          border: 2px solid rgba(214, 182, 107, 0.6);
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7);
          background: #0C2219;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ct-lightbox-full-img {
          max-width: 100%;
          max-height: 72vh;
          object-fit: contain;
          display: block;
          user-select: none;
        }

        /* Arrows */
        .ct-lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(12, 34, 25, 0.88);
          border: 1.5px solid rgba(214, 182, 107, 0.5);
          color: #F5E0B0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.2s;
          z-index: 2515;
          backdrop-filter: blur(8px);
        }

        .ct-lightbox-arrow:hover {
          background: #D6B66B;
          color: #0C2219;
          transform: translateY(-50%) scale(1.08);
        }

        .ct-lightbox-prev {
          left: -24px;
        }

        .ct-lightbox-next {
          right: -24px;
        }

        .ct-lightbox-caption {
          margin-top: 14px;
          text-align: center;
          max-width: 720px;
          color: #FAF6EE;
          padding: 0 16px;
        }

        .ct-lightbox-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 1.18rem;
          color: #FFFFFF;
          margin-bottom: 4px;
        }

        .ct-lightbox-desc {
          font-size: 0.88rem;
          color: rgba(250, 246, 238, 0.8);
          line-height: 1.45;
        }

        /* ========================================================
           RESPONSIVE BREAKPOINTS (DESKTOP, TABLET, MOBILE)
        ======================================================== */

        /* 🖥️ Large Desktop (> 1360px) */
        @media (min-width: 1360px) {
          .ct-photo-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }

        /* 💻 Standard Desktop (1025px - 1359px) */
        @media (min-width: 1025px) and (max-width: 1359px) {
          .ct-photo-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
          }
        }

        /* 📱 Tablet (641px - 1024px) */
        @media (min-width: 641px) and (max-width: 1024px) {
          .ct-gallery-container {
            padding: 32px 20px 72px;
          }
          .ct-year-nav-wrapper {
            top: 68px;
            padding: 12px 16px;
            gap: 12px;
          }
          .ct-photo-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .ct-search-input {
            width: 160px;
          }
          .ct-search-input:focus {
            width: 200px;
          }
          .ct-lightbox-prev {
            left: 4px;
          }
          .ct-lightbox-next {
            right: 4px;
          }
          .ct-lightbox-full-img {
            max-height: 66vh;
          }
        }

        /* 📱 Mobile (<= 640px) */
        @media (max-width: 640px) {
          .ct-gallery-eyebrow {
            font-size: 0.74rem;
            letter-spacing: 1.5px;
            padding: 5px 14px;
            margin-bottom: 12px;
          }
          .ct-gallery-hero-title {
            font-size: clamp(1.8rem, 7.5vw, 2.3rem);
            margin-bottom: 12px;
          }
          .ct-gallery-hero-desc {
            font-size: 0.88rem;
            line-height: 1.55;
            margin-bottom: 20px;
          }

          /* Mobile Stats: Clean Card Grid */
          .ct-gallery-stats-bar {
            width: 100%;
            border-radius: 14px;
            padding: 10px 12px;
            gap: 8px;
            justify-content: space-around;
          }
          .ct-gallery-stat-item {
            font-size: 0.76rem;
            gap: 5px;
          }
          .ct-gallery-stat-divider {
            display: none;
          }

          /* Mobile Sticky Toolbar */
          .ct-gallery-container {
            padding: 20px 14px 60px;
          }
          .ct-year-nav-wrapper {
            top: 60px;
            padding: 10px 12px;
            border-radius: 14px;
            margin-bottom: 26px;
            gap: 10px;
          }

          /* Horizontal Swipeable Year Pills on Mobile */
          .ct-year-pills-row {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            gap: 6px;
            padding-bottom: 4px;
            scrollbar-width: none;
          }
          .ct-year-pills-row::-webkit-scrollbar {
            display: none;
          }

          .ct-year-pill-btn {
            padding: 6px 13px;
            font-size: 0.78rem;
            flex-shrink: 0;
          }
          .ct-pill-count {
            font-size: 0.68rem;
            padding: 1px 6px;
          }

          /* Mobile Controls: Full Width */
          .ct-gallery-controls {
            width: 100%;
            display: flex;
            gap: 8px;
            justify-content: space-between;
          }
          .ct-search-box {
            flex: 1;
          }
          .ct-search-input {
            width: 100% !important;
            font-size: 0.8rem;
            padding: 7px 12px 7px 30px;
          }
          .ct-view-btn {
            padding: 5px 9px;
            font-size: 0.72rem;
          }

          /* Mobile Chapter Header */
          .ct-year-chapter {
            margin-bottom: 44px;
          }
          .ct-year-chapter-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 16px;
            padding-bottom: 12px;
          }
          .ct-year-badge-group {
            gap: 10px;
          }
          .ct-year-giant-numeral {
            font-size: 2.1rem;
          }
          .ct-year-title-line {
            font-size: 0.92rem;
          }
          .ct-year-scripture {
            font-size: 0.74rem;
          }
          .ct-year-count-pill {
            font-size: 0.74rem;
            padding: 4px 10px;
            align-self: flex-start;
          }

          /* Mobile Photo Grid: Single Column */
          .ct-photo-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .ct-photo-card {
            border-radius: 14px;
            aspect-ratio: 16 / 11;
          }

          .ct-image-year-tag {
            top: 10px;
            left: 10px;
            font-size: 0.72rem;
            padding: 3px 9px;
          }
          .ct-image-category-tag {
            top: 10px;
            right: 10px;
            font-size: 0.64rem;
            padding: 2px 8px;
          }

          /* On mobile/touch devices: bottom info is permanently visible */
          .ct-photo-overlay {
            opacity: 1;
            background: linear-gradient(180deg, transparent 45%, rgba(9, 24, 18, 0.92) 100%);
          }
          .ct-photo-zoom-icon {
            display: none;
          }
          .ct-overlay-title {
            font-size: 0.88rem;
          }
          .ct-overlay-meta {
            font-size: 0.72rem;
          }

          /* Mobile Lightbox */
          .ct-lightbox-backdrop {
            padding: 10px;
          }
          .ct-lightbox-nav-top {
            top: 12px;
            left: 12px;
            right: 12px;
          }
          .ct-lightbox-year-pill {
            font-size: 0.72rem;
            padding: 3px 10px;
          }
          .ct-lightbox-counter {
            font-size: 0.72rem;
          }
          .ct-lightbox-close-btn {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }
          .ct-lightbox-center-stage {
            padding: 46px 0 10px;
          }
          .ct-lightbox-image-wrapper {
            max-height: 56vh;
            border-radius: 12px;
          }
          .ct-lightbox-full-img {
            max-height: 56vh;
          }
          .ct-lightbox-arrow {
            width: 38px;
            height: 38px;
            font-size: 0.92rem;
          }
          .ct-lightbox-prev {
            left: 4px;
          }
          .ct-lightbox-next {
            right: 4px;
          }
          .ct-lightbox-caption {
            margin-top: 10px;
            padding: 0 8px;
          }
          .ct-lightbox-title {
            font-size: 1rem;
            margin-bottom: 2px;
          }
          .ct-lightbox-desc {
            font-size: 0.78rem;
            line-height: 1.35;
          }
        }

        /* 📱 Extra Small Mobile (<= 380px) */
        @media (max-width: 380px) {
          .ct-year-giant-numeral {
            font-size: 1.85rem;
          }
        }
      `}</style>

      {/* ── Gallery Banner ── */}
      <section
        className="ct-gallery-hero"
        aria-label="Gallery Banner"
      >
        <img
          src={banner}
          alt="Christ's Tabernacle Gallery Banner"
          className="ct-gallery-hero-bg"
          loading="eager"
        />
      </section>

      {/* ── Main Gallery Area ── */}
      <main className="ct-gallery-container">
        {/* Sticky Year-Wise Navigation & Search Bar */}
        <div className="ct-year-nav-wrapper" role="region" aria-label="Year-wise Gallery Navigation">
          {/* Year Pills Filter (Horizontally swipeable on mobile) */}
          <div className="ct-year-pills-row" role="tablist" aria-label="Filter by Year">
            <button
              className={`ct-year-pill-btn${selectedYear === "All" ? " active" : ""}`}
              onClick={() => setSelectedYear("All")}
              role="tab"
              aria-selected={selectedYear === "All"}
            >
              <span>✦ All Years</span>
              <span className="ct-pill-count">{yearCounts.All || photos.length}</span>
            </button>

            {availableYears.map((yr) => (
              <button
                key={yr}
                className={`ct-year-pill-btn${selectedYear === yr ? " active" : ""}`}
                onClick={() => setSelectedYear(yr)}
                role="tab"
                aria-selected={selectedYear === yr}
              >
                <span>{yr}</span>
                <span className="ct-pill-count">{yearCounts[yr] || 0}</span>
              </button>
            ))}
          </div>

          {/* Search & View Mode Controls */}
          <div className="ct-gallery-controls">
            <div className="ct-search-box">
              <FaSearch className="ct-search-icon" />
              <input
                type="text"
                className="ct-search-input"
                placeholder="Search archive…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search photos by title, date or caption"
              />
            </div>

            {selectedYear === "All" && (
              <div className="ct-view-toggle" role="group" aria-label="View Mode">
                <button
                  className={`ct-view-btn${viewMode === "chapters" ? " active" : ""}`}
                  onClick={() => setViewMode("chapters")}
                  title="Grouped by Year Chapters"
                >
                  <FaStream /> Chapters
                </button>
                <button
                  className={`ct-view-btn${viewMode === "grid" ? " active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Continuous Unified Grid"
                >
                  <FaLayerGroup /> Grid
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "70px 16px", color: "#184332", fontWeight: 700 }}>
            <div style={{ fontSize: "2rem", marginBottom: 12, color: "#D6B66B" }}>†</div>
            Loading sanctuary photo archives...
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="ct-gallery-empty">
            <div className="ct-gallery-empty-icon">📷</div>
            <h3 className="ct-gallery-empty-title">No Photos Found</h3>
            <p className="ct-gallery-empty-desc">
              We couldn't find any photos matching "{searchQuery}" in {selectedYear === "All" ? "any year" : selectedYear}.
            </p>
            <button
              className="ct-year-pill-btn active"
              onClick={() => {
                setSelectedYear("All");
                setSearchQuery("");
              }}
              style={{ display: "inline-flex" }}
            >
              Reset to All Years
            </button>
          </div>
        ) : selectedYear === "All" && viewMode === "chapters" ? (
          /* ── CHAPTERS VIEW: Grouped Chronologically by Year ── */
          <div className="ct-chapters-flow">
            {groupedByYear.map(({ year, photos: yearPhotos, meta }) => (
              <section key={year} className="ct-year-chapter" aria-labelledby={`year-heading-${year}`}>
                {/* Year Chapter Divider & Spiritual Tag */}
                <div className="ct-year-chapter-header">
                  <div className="ct-year-badge-group">
                    <div className="ct-year-giant-numeral">
                      <span className="cross-emblem">†</span>
                      <span>{year}</span>
                    </div>
                    <div className="ct-year-theme-text">
                      <div className="ct-year-title-line">
                        <span>{meta.icon}</span> {meta.title}
                      </div>
                      <div className="ct-year-scripture">“{meta.scripture}”</div>
                    </div>
                  </div>

                  <div className="ct-year-count-pill">
                    <FaImages /> {yearPhotos.length} {yearPhotos.length === 1 ? "Moment" : "Moments"}
                  </div>
                </div>

                {/* Photo Grid with Year shown right on each image */}
                <div className="ct-photo-grid">
                  {yearPhotos.map((photo) => {
                    const photoYear = getPhotoYear(photo);
                    return (
                      <article
                        key={photo._id || photo.id}
                        className="ct-photo-card"
                        onClick={() => openLightbox(photo)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View photo: ${photo.title || "Sanctuary memory"} (${photoYear})`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openLightbox(photo);
                          }
                        }}
                      >
                        {/* ✦ Year Badge on the Image ✦ */}
                        <div className="ct-image-year-tag">
                          <span className="sparkle">✦</span>
                          <span>{photoYear}</span>
                        </div>

                        {photo.category && (
                          <div className="ct-image-category-tag">{photo.category}</div>
                        )}

                        <img
                          src={resolvePhotoUrl(photo.image)}
                          alt={photo.title || `Christ's Tabernacle ${photoYear}`}
                          className="ct-photo-thumb"
                          loading="lazy"
                        />

                        {/* Hover & Touch Overlay */}
                        <div className="ct-photo-overlay">
                          <div className="ct-overlay-center">
                            <div className="ct-photo-zoom-icon">
                              <FaExpand />
                            </div>
                          </div>
                          <div className="ct-overlay-bottom">
                            <div className="ct-overlay-title">{photo.title || `${photoYear} Memorial`}</div>
                            <div className="ct-overlay-meta">
                              <span>{photo.date || photoYear}</span>
                              <span>View ⤢</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* ── UNIFIED GRID VIEW / SINGLE YEAR VIEW ── */
          <div>
            {selectedYear !== "All" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                  padding: "14px 18px",
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(214, 182, 107, 0.3)",
                  borderRadius: 14,
                  boxShadow: "0 4px 14px rgba(18, 45, 36, 0.04)",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <span style={{ color: "#A88A42", fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase" }}>
                    CHRONOLOGICAL ARCHIVE
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif, 'Playfair Display', Georgia, serif)",
                      fontSize: "clamp(1.25rem, 3.5vw, 1.55rem)",
                      color: "#122D24",
                      margin: "2px 0 0",
                    }}
                  >
                    ✦ The {selectedYear} Collection ✦
                  </h2>
                </div>
                <div className="ct-year-count-pill">
                  <FaImages /> {filteredPhotos.length} {filteredPhotos.length === 1 ? "Photo" : "Photos"}
                </div>
              </div>
            )}

            <div className="ct-photo-grid">
              {filteredPhotos.map((photo) => {
                const photoYear = getPhotoYear(photo);
                return (
                  <article
                    key={photo._id || photo.id}
                    className="ct-photo-card"
                    onClick={() => openLightbox(photo)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo: ${photo.title || "Sanctuary memory"} (${photoYear})`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(photo);
                      }
                    }}
                  >
                    {/* ✦ Year Badge on the Image ✦ */}
                    <div className="ct-image-year-tag">
                      <span className="sparkle">✦</span>
                      <span>{photoYear}</span>
                    </div>

                    {photo.category && (
                      <div className="ct-image-category-tag">{photo.category}</div>
                    )}

                    <img
                      src={resolvePhotoUrl(photo.image)}
                      alt={photo.title || `Christ's Tabernacle ${photoYear}`}
                      className="ct-photo-thumb"
                      loading="lazy"
                    />

                    {/* Hover & Touch Overlay */}
                    <div className="ct-photo-overlay">
                      <div className="ct-overlay-center">
                        <div className="ct-photo-zoom-icon">
                          <FaExpand />
                        </div>
                      </div>
                      <div className="ct-overlay-bottom">
                        <div className="ct-overlay-title">{photo.title || `${photoYear} Memorial`}</div>
                        <div className="ct-overlay-meta">
                          <span>{photo.date || photoYear}</span>
                          <span>View ⤢</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Lightbox Modal with Touch Swipe on Mobile/Tablet ── */}
        {currentLightboxPhoto && (
          <div
            className="ct-lightbox-backdrop"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="High resolution photo viewer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Navigation */}
            <div className="ct-lightbox-nav-top" onClick={(e) => e.stopPropagation()}>
              <div className="ct-lightbox-year-pill">
                <span>✦ Year {getPhotoYear(currentLightboxPhoto)}</span>
                {currentLightboxPhoto.date && (
                  <span style={{ opacity: 0.85, fontWeight: 600 }}>• {currentLightboxPhoto.date}</span>
                )}
              </div>

              <div className="ct-lightbox-counter">
                {lightboxIndex + 1} / {activePhotosList.length}
              </div>

              <button
                className="ct-lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close photo preview (Escape)"
              >
                <FaTimes />
              </button>
            </div>

            {/* Center Stage with Prev / Next Arrows */}
            <div className="ct-lightbox-center-stage" onClick={(e) => e.stopPropagation()}>
              {activePhotosList.length > 1 && (
                <>
                  <button
                    className="ct-lightbox-arrow ct-lightbox-prev"
                    onClick={prevPhoto}
                    aria-label="Previous photo (Left arrow or swipe right)"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="ct-lightbox-arrow ct-lightbox-next"
                    onClick={nextPhoto}
                    aria-label="Next photo (Right arrow or swipe left)"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              <div className="ct-lightbox-image-wrapper">
                <img
                  src={resolvePhotoUrl(currentLightboxPhoto.image)}
                  alt={currentLightboxPhoto.title || "Sanctuary memory"}
                  className="ct-lightbox-full-img"
                />
              </div>

              {/* Caption & Metadata */}
              {(currentLightboxPhoto.title || currentLightboxPhoto.caption) && (
                <div className="ct-lightbox-caption">
                  {currentLightboxPhoto.title && (
                    <h3 className="ct-lightbox-title">{currentLightboxPhoto.title}</h3>
                  )}
                  {currentLightboxPhoto.caption && (
                    <p className="ct-lightbox-desc">{currentLightboxPhoto.caption}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
