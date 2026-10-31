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
      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-9">
        <div className="flex gap-2 flex-wrap" role="tablist">
          {SERIES_LIST.map((series) => (
            <button
              key={series}
              className={`px-4 py-1.5 rounded-full text-[0.78rem] font-bold border transition-all cursor-pointer ${
                selectedSeries === series
                  ? "bg-gradient-to-r from-green-deep to-green-medium text-gold-bright border-gold shadow-sm"
                  : "bg-white text-text-muted border-gold/30 hover:text-green hover:border-gold"
              }`}
              onClick={() => setSelectedSeries(series)}
            >
              {series === "All" ? "📜 All Series" : series}
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="🔍 Search sermon topic, scripture..."
          className="py-2 px-4 rounded-full border-[1.5px] border-gold/30 bg-white font-sans text-[0.88rem] focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 min-w-[260px] text-text-main placeholder-text-muted/60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filtered.map((sermon) => (
          <article
            key={sermon.id}
            className="bg-white border-[1.5px] border-gold/25 hover:border-gold rounded-[18px] p-6 sm:p-7 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[0.72rem] font-bold tracking-[0.08em] uppercase bg-gold-soft text-gold-dark px-3 py-1 rounded-full border border-gold/30">
                {sermon.series}
              </span>
              <span className="text-[0.76rem] text-text-light">{sermon.date}</span>
            </div>
            {sermon.image && (
              <div className="h-[260px] sm:h-[280px] rounded-xl overflow-hidden my-3 border-[1.5px] border-gold/20 bg-green-dark">
                <img
                  src={sermon.image}
                  alt={sermon.speaker}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            )}
            <h3 className="font-serif text-xl text-green-dark my-2 mb-2 font-bold leading-snug">
              {sermon.title}
            </h3>
            <div className="text-[0.82rem] text-gold-dark font-semibold mb-3">
              👤 {sermon.speaker} • 📖 {sermon.passage}
            </div>
            <p className="text-[0.9rem] text-text-muted leading-[1.7] mb-5 grow">
              {sermon.summary}
            </p>
            <div className="border-t border-gold/20 pt-3.5 flex justify-between items-center mt-auto">
              <span className="text-[0.78rem] text-text-light font-medium">
                Sunday Morning Service
              </span>
              <button
                onClick={() => setNotesModal(sermon)}
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-gold to-gold-dark text-green-deep font-bold px-4 py-2 rounded-full shadow-sm hover:shadow hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Study Notes 📝
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Notes Modal */}
      {notesModal && (
        <div
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setNotesModal(null)}
        >
          <div
            className="relative bg-white rounded-2xl border-[1.5px] border-gold/40 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gold/20 text-gray-500 hover:text-green-dark flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
              onClick={() => setNotesModal(null)}
              aria-label="Close sermon notes"
            >
              ✕
            </button>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/40 mb-2.5">
              {notesModal.series} • {notesModal.date}
            </span>
            <h3 className="font-serif text-2xl sm:text-[1.6rem] text-green-dark my-1 mb-1.5 font-bold leading-tight">
              {notesModal.title}
            </h3>
            <p className="text-gold-dark font-bold text-[0.9rem] mb-4">
              Ministered by {notesModal.speaker} | Scripture: {notesModal.passage}
            </p>

            <div className="bg-ivory border-l-[3px] border-gold p-4 sm:p-5 rounded-r-xl font-serif italic text-green-dark text-sm sm:text-base leading-relaxed my-4">
              {notesModal.summary}
            </div>

            <h4 className="font-serif text-lg text-green-dark mb-3 font-bold">
              Key Biblical Takeaways &amp; Application:
            </h4>
            <ul className="pl-5 text-text-muted leading-[1.8] text-[0.94rem] list-disc space-y-2">
              {notesModal.keyPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>

            <div className="mt-6 text-center">
              <button
                onClick={() => setNotesModal(null)}
                className="w-full bg-gradient-to-r from-green-deep to-green-medium text-gold-bright font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all cursor-pointer text-sm uppercase tracking-wider"
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
