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
    <div className="w-full min-h-screen bg-[#FAF8F5] overflow-x-hidden">
      {/* ── Gallery Banner ── */}
      <section
        className="relative w-full h-[400px] md:h-[200px] max-sm:h-[130px] p-0 m-0 leading-none bg-[#FAF8F5] border-b-2 border-[#D6B66B]/35 overflow-hidden"
        aria-label="Gallery Banner"
      >
        <img
          src={banner}
          alt="Christ's Tabernacle Gallery Banner"
          className="block w-full min-w-full h-full object-fill object-center"
          loading="eager"
        />
      </section>

      {/* ── Main Gallery Area ── */}
      <main className="max-w-[1360px] mx-auto px-4 md:px-8 py-6">
        {/* Sticky Year-Wise Navigation & Search Bar */}
        <div className="sticky top-[72px] z-30 bg-[#FAF8F5]/95 backdrop-blur-md py-3.5 mb-6 border-b border-[#D6B66B]/25 flex flex-wrap items-center justify-between gap-3" role="region" aria-label="Year-wise Gallery Navigation">
          {/* Year Pills Filter (Horizontally swipeable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-hide flex-nowrap max-w-full" role="tablist" aria-label="Filter by Year">
            <button
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedYear === "All"
                  ? "bg-[#184332] text-[#D6B66B] border-[#D6B66B] shadow-sm"
                  : "bg-white/80 text-[#184332] border-[#D6B66B]/30 hover:bg-[#D6B66B]/15"
              }`}
              onClick={() => setSelectedYear("All")}
              role="tab"
              aria-selected={selectedYear === "All"}
            >
              <span>✦ All Years</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-bold">{yearCounts.All || photos.length}</span>
            </button>

            {availableYears.map((yr) => (
              <button
                key={yr}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedYear === yr
                    ? "bg-[#184332] text-[#D6B66B] border-[#D6B66B] shadow-sm"
                    : "bg-white/80 text-[#184332] border-[#D6B66B]/30 hover:bg-[#D6B66B]/15"
                }`}
                onClick={() => setSelectedYear(yr)}
                role="tab"
                aria-selected={selectedYear === yr}
              >
                <span>{yr}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 font-bold">{yearCounts[yr] || 0}</span>
              </button>
            ))}
          </div>

          {/* Search & View Mode Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-[#D6B66B] text-xs pointer-events-none" />
              <input
                type="text"
                className="pl-8 pr-3 py-1.5 text-xs rounded-full border border-[#D6B66B]/35 bg-white text-[#112218] placeholder-[#7A9288] focus:outline-none focus:border-[#D6B66B] focus:ring-2 focus:ring-[#D6B66B]/20 transition-all"
                placeholder="Search archive…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search photos by title, date or caption"
              />
            </div>

            {selectedYear === "All" && (
              <div className="inline-flex rounded-lg border border-[#D6B66B]/30 bg-white p-0.5 gap-0.5" role="group" aria-label="View Mode">
                <button
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    viewMode === "chapters"
                      ? "bg-[#184332] text-[#D6B66B]"
                      : "text-[#4A6355] hover:text-[#184332]"
                  }`}
                  onClick={() => setViewMode("chapters")}
                  title="Grouped by Year Chapters"
                >
                  <FaStream /> Chapters
                </button>
                <button
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#184332] text-[#D6B66B]"
                      : "text-[#4A6355] hover:text-[#184332]"
                  }`}
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
          <div className="text-center py-16 px-4 text-[#184332] font-bold">
            <div className="text-3xl mb-3 text-[#D6B66B]">†</div>
            Loading sanctuary photo archives...
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="text-4xl mb-3">📷</div>
            <h3 className="font-serif text-xl font-bold text-[#122D24] mb-2">No Photos Found</h3>
            <p className="text-sm text-[#4A6355] max-w-md mx-auto mb-4">
              We couldn't find any photos matching "{searchQuery}" in {selectedYear === "All" ? "any year" : selectedYear}.
            </p>
            <button
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-full border bg-[#184332] text-[#D6B66B] border-[#D6B66B] shadow-sm cursor-pointer"
              onClick={() => {
                setSelectedYear("All");
                setSearchQuery("");
              }}
            >
              Reset to All Years
            </button>
          </div>
        ) : selectedYear === "All" && viewMode === "chapters" ? (
          /* ── CHAPTERS VIEW: Grouped Chronologically by Year ── */
          <div className="space-y-10">
            {groupedByYear.map(({ year, photos: yearPhotos, meta }) => (
              <section key={year} className="relative" aria-labelledby={`year-heading-${year}`}>
                {/* Year Chapter Divider & Spiritual Tag */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D6B66B]/30 flex-wrap gap-2">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <div className="font-serif text-2xl md:text-3xl font-extrabold text-[#122D24] tracking-tight flex items-baseline gap-1.5">
                      <span className="text-[#D6B66B] text-xl select-none">†</span>
                      <span>{year}</span>
                    </div>
                    <div className="text-xs text-[#4A6355]">
                      <div className="font-bold text-[#184332] flex items-center gap-1">
                        <span>{meta.icon}</span> {meta.title}
                      </div>
                      <div className="italic text-[#7A9288]">“{meta.scripture}”</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#184332]/5 text-[#184332] border border-[#D6B66B]/25">
                    <FaImages /> {yearPhotos.length} {yearPhotos.length === 1 ? "Moment" : "Moments"}
                  </div>
                </div>

                {/* Photo Grid with Year shown right on each image */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                  {yearPhotos.map((photo) => {
                    const photoYear = getPhotoYear(photo);
                    return (
                      <article
                        key={photo._id || photo.id}
                        className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-white border border-[#D6B66B]/25 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
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
                        <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0C2219]/80 text-[#D6B66B] backdrop-blur-sm border border-[#D6B66B]/30">
                          <span className="sparkle">✦</span>
                          <span>{photoYear}</span>
                        </div>

                        {photo.category && (
                          <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#184332] backdrop-blur-sm border border-[#D6B66B]/25">{photo.category}</div>
                        )}

                        <img
                          src={resolvePhotoUrl(photo.image)}
                          alt={photo.title || `Christ's Tabernacle ${photoYear}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Hover & Touch Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C2219]/90 via-[#0C2219]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                          <div className="flex items-center justify-center flex-1">
                            <div className="w-8 h-8 rounded-full bg-[#D6B66B]/90 text-[#122D24] flex items-center justify-center shadow-md text-xs">
                              <FaExpand />
                            </div>
                          </div>
                          <div className="text-left text-white">
                            <div className="font-serif text-xs md:text-sm font-bold text-[#FAF6EE] truncate">{photo.title || `${photoYear} Memorial`}</div>
                            <div className="flex items-center justify-between text-[10px] text-[#E8CC8F] mt-0.5">
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
              <div className="flex items-center justify-between mb-6 p-3.5 md:p-4 bg-white border border-[#D6B66B]/30 rounded-xl shadow-sm flex-wrap gap-3">
                <div>
                  <span className="text-[#A88A42] text-[11px] font-extrabold uppercase tracking-wider block">
                    CHRONOLOGICAL ARCHIVE
                  </span>
                  <h2 className="font-serif text-lg md:text-2xl font-bold text-[#122D24] mt-0.5">
                    ✦ The {selectedYear} Collection ✦
                  </h2>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#184332]/5 text-[#184332] border border-[#D6B66B]/25">
                  <FaImages /> {filteredPhotos.length} {filteredPhotos.length === 1 ? "Photo" : "Photos"}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {filteredPhotos.map((photo) => {
                const photoYear = getPhotoYear(photo);
                return (
                  <article
                    key={photo._id || photo.id}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-white border border-[#D6B66B]/25 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
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
                    <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0C2219]/80 text-[#D6B66B] backdrop-blur-sm border border-[#D6B66B]/30">
                      <span className="sparkle">✦</span>
                      <span>{photoYear}</span>
                    </div>

                    {photo.category && (
                      <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#184332] backdrop-blur-sm border border-[#D6B66B]/25">{photo.category}</div>
                    )}

                    <img
                      src={resolvePhotoUrl(photo.image)}
                      alt={photo.title || `Christ's Tabernacle ${photoYear}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Hover & Touch Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C2219]/90 via-[#0C2219]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                      <div className="flex items-center justify-center flex-1">
                        <div className="w-8 h-8 rounded-full bg-[#D6B66B]/90 text-[#122D24] flex items-center justify-center shadow-md text-xs">
                          <FaExpand />
                        </div>
                      </div>
                      <div className="text-left text-white">
                        <div className="font-serif text-xs md:text-sm font-bold text-[#FAF6EE] truncate">{photo.title || `${photoYear} Memorial`}</div>
                        <div className="flex items-center justify-between text-[10px] text-[#E8CC8F] mt-0.5">
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
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="High resolution photo viewer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Navigation */}
            <div className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 text-white" onClick={(e) => e.stopPropagation()}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#E8CC8F] border border-[#D6B66B]/30">
                <span>✦ Year {getPhotoYear(currentLightboxPhoto)}</span>
                {currentLightboxPhoto.date && (
                  <span className="opacity-85 font-semibold">• {currentLightboxPhoto.date}</span>
                )}
              </div>

              <div className="text-xs font-mono text-white/70">
                {lightboxIndex + 1} / {activePhotosList.length}
              </div>

              <button
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-base cursor-pointer"
                onClick={closeLightbox}
                aria-label="Close photo preview (Escape)"
              >
                <FaTimes />
              </button>
            </div>

            {/* Center Stage with Prev / Next Arrows */}
            <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto my-auto overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {activePhotosList.length > 1 && (
                <>
                  <button
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-all z-20 cursor-pointer text-sm"
                    onClick={prevPhoto}
                    aria-label="Previous photo (Left arrow or swipe right)"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-all z-20 cursor-pointer text-sm"
                    onClick={nextPhoto}
                    aria-label="Next photo (Right arrow or swipe left)"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              <div className="max-h-[72vh] max-w-full flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={resolvePhotoUrl(currentLightboxPhoto.image)}
                  alt={currentLightboxPhoto.title || "Sanctuary memory"}
                  className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              {/* Caption & Metadata */}
              {(currentLightboxPhoto.title || currentLightboxPhoto.caption) && (
                <div className="mt-3 text-center max-w-2xl text-white">
                  {currentLightboxPhoto.title && (
                    <h3 className="font-serif text-sm md:text-base font-bold text-[#FAF6EE]">{currentLightboxPhoto.title}</h3>
                  )}
                  {currentLightboxPhoto.caption && (
                    <p className="text-xs text-white/70 mt-1 line-clamp-2">{currentLightboxPhoto.caption}</p>
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
