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
      {/* Top Broadcast Banner */}
      <div className="bg-gradient-to-br from-[#0c2419] to-[#184332] border-[1.5px] border-gold/35 rounded-[18px] p-6 md:p-[26px_30px] mb-8 flex items-center justify-between flex-wrap gap-[18px] shadow-[0_10px_30px_rgba(12,36,25,0.15)]">
        <div className="max-w-[650px]">
          <div className="inline-flex items-center gap-2 bg-crimson/20 border border-crimson/60 text-red-300 text-[0.72rem] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live &amp; Recorded Broadcasts
          </div>
          <h2 className="font-serif text-[#FAF6EE] text-2xl font-bold mb-1.5">
            Sermon Archives &amp; Worship Broadcasts
          </h2>
          <p className="text-[#FAF6EE]/80 text-[0.88rem] leading-[1.55] m-0">
            Watch Sunday communion messages, all-night prayer sermons, youth fellowships, and choral worship from Christ's Tabernacle.
          </p>
        </div>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#E60000] text-white px-[22px] py-[11px] rounded-[10px] font-bold text-[0.88rem] no-underline shadow-[0_4px_16px_rgba(204,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>📺</span> Subscribe on YouTube
        </a>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-[18px] mb-[34px]">
        <div className="relative max-w-[500px] mx-auto w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[0.95rem] pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            className="w-full py-3 pr-[18px] pl-[42px] rounded-full border-[1.5px] border-slate-300 bg-white text-[0.92rem] text-green-dark shadow-sm outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sermon title, preacher, or scripture..."
          />
        </div>

        <div className="flex justify-center gap-2.5 flex-wrap" role="tablist" aria-label="Video Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-[18px] py-2 rounded-full text-[0.82rem] font-semibold border-[1.5px] transition-all duration-200 cursor-pointer ${
                selectedCat === cat
                  ? "bg-green text-ivory border-gold font-bold shadow-sm"
                  : "bg-white text-text-muted border-slate-200 hover:text-green hover:border-gold"
              }`}
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
        <div className="text-center py-16 px-5 text-slate-500">
          <div className="text-3xl mb-2">🎬</div>
          <h3 className="text-green-dark font-serif text-xl mb-1.5 font-bold">No Video Messages Found</h3>
          <p className="m-0 text-sm">Try clearing your search query or choosing another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
          {filtered.map((v) => {
            const displayThumb = v.thumbnail || getYouTubeThumbnail(v.youtubeUrl) || saravananImg;
            return (
              <article
                key={v.id}
                className="group bg-white rounded-[18px] border-[1.5px] border-gold/25 overflow-hidden shadow-[0_4px_18px_rgba(18,45,36,0.06)] hover:shadow-[0_12px_28px_rgba(18,45,36,0.12)] hover:border-gold hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div
                  className="relative h-[195px] bg-green-deep cursor-pointer overflow-hidden"
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
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-out"
                    onError={(e) => {
                      const ytFallback = getYouTubeThumbnail(v.youtubeUrl);
                      if (ytFallback && e.target.src !== ytFallback) {
                        e.target.src = ytFallback;
                      }
                    }}
                  />
                  <div
                    className="absolute inset-0 m-auto w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A88A42] text-green-dark flex items-center justify-center text-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:brightness-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    ▶
                  </div>
                  <span className="absolute top-2.5 left-2.5 bg-green-deep/90 text-ivory text-[0.7rem] font-bold px-2.5 py-1 rounded-full border border-gold/40 backdrop-blur-xs">
                    {v.category}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[0.72rem] font-bold px-2 py-0.5 rounded-[6px]">
                    {v.duration}
                  </span>
                </div>
                <div className="p-[20px_22px] flex-grow flex flex-col">
                  <h3 className="font-serif text-[1.15rem] text-green-dark mb-2 font-bold leading-[1.35]">
                    {v.title}
                  </h3>
                  <div className="text-[0.78rem] text-gold-dark font-semibold mb-2.5 flex flex-wrap gap-1.5 items-center">
                    <span>👤 {v.speaker}</span>
                    <span>•</span>
                    <span>📖 {v.passage}</span>
                  </div>
                  <p className="text-[0.86rem] text-text-muted leading-[1.6] mb-4 flex-grow line-clamp-3">
                    {v.summary}
                  </p>
                  <div className="border-t border-slate-200/80 pt-3 flex justify-between items-center text-[0.78rem] text-text-light">
                    <span>📅 {v.date}</span>
                    <button
                      type="button"
                      className="text-green font-bold text-[0.84rem] bg-transparent border-0 cursor-pointer p-0 inline-flex items-center gap-1 hover:underline"
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
          className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white max-w-[840px] w-full max-h-[90vh] overflow-y-auto rounded-[18px] p-5 md:p-6 shadow-2xl border border-gold/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold z-10 transition-colors"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video player"
            >
              ✕
            </button>

            {/* Embedded YouTube Player or Media Player */}
            {getYouTubeEmbedUrl(activeVideo.youtubeUrl) ? (
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-[14px] bg-black mb-5 border-2 border-gold/40">
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.youtubeUrl)}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="relative bg-green-deep rounded-[14px] overflow-hidden h-[360px] flex flex-col items-center justify-center mb-5 border-2 border-gold">
                <img
                  src={activeVideo.thumbnail || saravananImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />
                <div className="relative z-10 text-center p-5">
                  <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A88A42] text-green-dark flex items-center justify-center text-2xl mx-auto mb-4 shadow-[0_8px_30px_rgba(214,182,107,0.4)]">
                    ▶
                  </div>
                  <h4 className="text-ivory font-serif text-[1.3rem] mb-1.5 font-bold">
                    {activeVideo.title}
                  </h4>
                  <p className="text-gold text-[0.88rem]">
                    Christ's Tabernacle Media Archive • {activeVideo.duration}
                  </p>
                </div>
              </div>
            )}

            {/* Video Details */}
            <div className="px-1.5 pb-2.5">
              <div className="flex justify-between items-start flex-wrap gap-3 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-soft text-green-dark border border-gold/30">
                  {activeVideo.category} • {activeVideo.date}
                </span>
                {activeVideo.youtubeUrl && (
                  <a
                    href={getYouTubeWatchUrl(activeVideo.youtubeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#CC0000] hover:text-[#E60000] font-bold text-[0.85rem] inline-flex items-center gap-1 no-underline transition-colors"
                  >
                    Watch on YouTube ↗
                  </a>
                )}
              </div>

              <h3 className="font-serif text-2xl text-green-dark mt-2 mb-1.5 font-bold">
                {activeVideo.title}
              </h3>
              <p className="text-gold-dark font-bold text-[0.9rem] mb-3">
                Ministered by {activeVideo.speaker} • Scripture: {activeVideo.passage} • Duration: {activeVideo.duration}
              </p>
              <p className="text-text-muted text-[0.94rem] leading-relaxed m-0">
                {activeVideo.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
