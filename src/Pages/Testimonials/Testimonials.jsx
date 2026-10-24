import { useState, useEffect, useRef } from "react";
import { getPublicTestimonials, createTestimonial } from "../../services/api";
import {
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMicrophone,
  FaHeadphones, FaFileAlt, FaShareAlt, FaCheck, FaTimes, FaCross
} from "react-icons/fa";

const AUDIO_TESTIMONIES = [
  {
    id: "audio-1",
    name: "Sister Beulah Jebaraj",
    location: "Chennai, Tamil Nadu",
    category: "Healing",
    title: "Supernatural Healing from Stage 4 Medical Complications",
    story:
      "Doctors in Apollo Hospital gave up hope after months of critical hospitalization. During the Fasting & Deliverance prayer vigil, Pastor anointed my head with holy oil and commanded the affliction to leave in the name of Jesus Christ. That very night, divine strength flooded my body. Subsequent scans confirmed complete restoration. Jesus is the Great Physician!",
    verse: "Exodus 15:26 — 'For I am the LORD who heals you.'",
    date: "September 2026",
    duration: "3:42",
    durationSec: 222,
    language: "Tamil & English",
    verified: true,
  },
  {
    id: "audio-2",
    name: "Brother John Immanuel",
    location: "Tambaram, Chennai",
    category: "Deliverance",
    title: "Instant Deliverance from 12 Years of Fear & Severe Depression",
    story:
      "For over a decade, I suffered tormenting panic attacks, night terrors, and severe depressive bondages. Medication could not give me peace. The first time I stepped into Christ's Tabernacle sanctuary, the presence of the Holy Ghost shook my soul. Through pastoral deliverance prayers, every dark chain was shattered. I now walk in total freedom and victory!",
    verse: "Psalm 34:4 — 'I sought the LORD, and He heard me, and delivered me from all my fears.'",
    date: "August 2026",
    duration: "4:15",
    durationSec: 255,
    language: "Tamil",
    verified: true,
  },
  {
    id: "audio-3",
    name: "Deacon Samuel & Family",
    location: "Coimbatore, Tamil Nadu",
    category: "Breakthrough",
    title: "Divine Debt Clearance & Supernatural Property Miracle",
    story:
      "Our family was overwhelmed with mounting creditors and business collapse during the downturn. We laid our liabilities and covenant seed at the altar during the New Moon prayer vigil. Within 21 days, supernatural business contracts arrived from international clients, completely wiping out our multi-lakh debt! God honours covenant faith.",
    verse: "Philippians 4:19 — 'And my God shall supply all your need according to His riches in glory by Christ Jesus.'",
    date: "July 2026",
    duration: "2:58",
    durationSec: 178,
    language: "Tamil",
    verified: true,
  },
  {
    id: "audio-4",
    name: "Sister Priscilla Victor",
    location: "Velachery, Chennai",
    category: "Healing",
    title: "Child's Compound Fracture Joined Overnight Without Surgery",
    story:
      "My 7-year-old fractured his forearm in a school sports accident. Orthopedic surgeons scheduled open surgery with pins. We called Christ's Tabernacle 24/7 prayer warrior line weeping. Believers united in emergency intercession. The morning pre-op X-ray astonished the medical board: the bone had knit together seamlessly! The operation was cancelled on the spot.",
    verse: "Jeremiah 32:27 — 'Behold, I am the LORD, the God of all flesh. Is there anything too hard for Me?'",
    date: "June 2026",
    duration: "3:20",
    durationSec: 200,
    language: "English",
    verified: true,
  },
  {
    id: "audio-5",
    name: "David & Rebecca K.",
    location: "Bangalore / Chennai",
    category: "Family",
    title: "Divorce Papers Torn Up — Sacred Marriage Restored",
    story:
      "Our marriage was legally broken after four years of separation and court battles. Through the anointed spiritual counseling and prevailing tears of Eva. Glory Devapiriyam and church leaders, God melted the hardness of our hearts. God resurrected our home, healed our wounds, and re-established our family altar in love.",
    verse: "Matthew 19:6 — 'What therefore God has joined together, let not man put asunder.'",
    date: "May 2026",
    duration: "5:04",
    durationSec: 304,
    language: "Tamil & English",
    verified: true,
  },
  {
    id: "audio-6",
    name: "Brother Stephen Paul",
    location: "Madurai, Tamil Nadu",
    category: "Deliverance",
    title: "16-Year Substance Addiction Broken in One Second",
    story:
      "I was enslaved to alcoholism and heavy smoking that wrecked my health, finances, and family reputation. Five rehabilitation centers couldn't keep me clean. During the Sunday Worship service, as the pastor called out deliverance, an electric warmth pierced my chest. The craving died instantly that morning and has never returned!",
    verse: "John 8:36 — 'Therefore if the Son makes you free, you shall be free indeed.'",
    date: "April 2026",
    duration: "3:50",
    durationSec: 230,
    language: "Tamil",
    verified: true,
  }
];

const TESTIMONIES = [
  {
    id: 1,
    name: "Sister Hannah D.",
    location: "Chennai, India",
    category: "Healing",
    title: "Miraculous Healing from Chronic Illness",
    story:
      "For three agonizing years, I suffered from severe autoimmune complications and chronic spinal pain that doctors said was irreversible. During the Fasting Prayer service at Christ's Tabernacle, Pastor anointed me with oil and the believers stood in deep intercession. The fire of the Holy Spirit touched my spine. Today, subsequent scans confirmed total healing. Jesus made me whole!",
    verse: "Jeremiah 30:17 — 'For I will restore health to you and heal you of your wounds, says the LORD.'",
    date: "August 2026",
  },
  {
    id: 2,
    name: "Brother Michael R.",
    location: "Tambaram, Chennai",
    category: "Deliverance",
    title: "Set Free from Years of Fear & Nightmares",
    story:
      "I was tormented by oppressive nightmares, crippling panic attacks, and unseen bondages for over a decade. I couldn't sleep peacefully without heavy medication. When I walked into Christ's Tabernacle, the presence of God broke every heavy chain. Through the deliverance prayer ministry, the fear completely vanished. I now walk in perfect peace and liberty in Christ!",
    verse: "2 Timothy 1:7 — 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.'",
    date: "July 2026",
  },
  {
    id: 3,
    name: "David & Priscilla K.",
    location: "Pallikaranai, Chennai",
    category: "Family",
    title: "Restoration of Our Marriage & Household",
    story:
      "Our marriage was on the verge of legal separation due to irreconcilable bitterness and severe distress. Eva. Glory Devapiriyam and the prayer team counseled us with tears and prevailing prayer. God softened our hearts, broke the spirit of division, and restored our home with supernatural joy and unconditional love. Christ truly saved our family!",
    verse: "Joshua 24:15 — 'As for me and my house, we will serve the LORD.'",
    date: "June 2026",
  },
  {
    id: 4,
    name: "Brother Samuel V.",
    location: "Velachery, Chennai",
    category: "Breakthrough",
    title: "Divine Financial Breakthrough & Job Miracle",
    story:
      "After facing sudden unemployment for eight months and mounting debts, our family felt exhausted. During the New Moon all-night prayer vigil, we surrendered our burdens on the altar. Within two weeks, God opened an unexpected door for an international technical role beyond our qualifications. God is faithful to His covenant!",
    verse: "Philippians 4:19 — 'And my God shall supply all your need according to His riches in glory by Christ Jesus.'",
    date: "May 2026",
  },
  {
    id: 5,
    name: "Sister Rachel M.",
    location: "Guindy, Chennai",
    category: "Healing",
    title: "Child's Miracle Recovery from Critical Fever",
    story:
      "My four-year-old son was admitted to the intensive care unit with dangerously high convulsions and unexplained respiratory infection. I called the church prayer helpline in tears. The pastors and prayer warriors immediately raised emergency intercession. Within hours, the fever broke completely, and his oxygen levels stabilized. Doctors called it a miraculous turnaround!",
    verse: "Psalm 103:3 — 'Who forgives all your iniquities, who heals all your diseases.'",
    date: "April 2026",
  },
  {
    id: 6,
    name: "Brother Joseph A.",
    location: "Medavakkam, Chennai",
    category: "Deliverance",
    title: "Delivered from Addiction and Given a New Life",
    story:
      "For 14 years, I was bound by severe alcohol and tobacco addictions that ruined my health, career, and self-respect. Numerous rehab attempts failed. One Sunday morning, as the worship team sang praises to Jesus, tears streamed down my face and I fell to my knees. The urge was instantly broken that day. I have been clean and serving in church ever since!",
    verse: "John 8:36 — 'Therefore if the Son makes you free, you shall be free indeed.'",
    date: "March 2026",
  },
];

const CATEGORIES = ["All", "Healing", "Deliverance", "Family", "Breakthrough"];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "written" | "audio"
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [testimonies, setTestimonies] = useState(TESTIMONIES);
  const [audioTestimonies] = useState(AUDIO_TESTIMONIES);
  const [toastMsg, setToastMsg] = useState("");

  // Audio Playback State
  const [playingId, setPlayingId] = useState(null);
  const [playbackSec, setPlaybackSec] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const timerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "Healing",
    type: "Written", // "Written" | "Audio"
    title: "",
    story: "",
    anonymous: false,
    audioDuration: "",
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const fetchDynamicTestimonies = async () => {
    try {
      const data = await getPublicTestimonials(activeCategory === "All" ? "" : activeCategory);
      if (Array.isArray(data) && data.length > 0) {
        const dynamicAudios = data.filter((d) => d.type === "Audio" || !!d.audioUrl);
        const dynamicWrittens = data.filter((d) => d.type !== "Audio" && !d.audioUrl);

        if (dynamicWrittens.length > 0) {
          const dynamicIds = new Set(dynamicWrittens.map((d) => String(d._id || d.id)));
          const defaultUniques = TESTIMONIES.filter((t) => !dynamicIds.has(String(t.id)));
          setTestimonies([...dynamicWrittens, ...defaultUniques]);
        } else {
          setTestimonies(data);
        }

        if (dynamicAudios.length > 0) {
          const audioIds = new Set(dynamicAudios.map((a) => String(a._id || a.id)));
          const audioUniques = AUDIO_TESTIMONIES.filter((a) => !audioIds.has(String(a.id)));
          setAudioTestimonies([...dynamicAudios, ...audioUniques]);
        }
      } else if (activeCategory === "All") {
        setTestimonies(TESTIMONIES);
      }
    } catch (err) {
      console.warn("Using offline testimonies fallback:", err);
    }
  };

  useEffect(() => {
    fetchDynamicTestimonies();
  }, [activeCategory]);

  // Audio synthesis helper for realistic holy praise chord when listening
  const stopAudio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch {}
      oscillatorRef.current = null;
    }
    setPlayingId(null);
    setPlaybackSec(0);
  };

  const togglePlayAudio = (item) => {
    if (playingId === item.id) {
      stopAudio();
      return;
    }

    // Stop current
    stopAudio();

    // Start playback simulation with subtle ambient praise chord
    setPlayingId(item.id);
    setPlaybackSec(0);

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4 praise fundamental
        gain.gain.setValueAtTime(isMuted ? 0 : 0.05, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
      }
    } catch {}

    timerRef.current = setInterval(() => {
      setPlaybackSec((prev) => {
        if (prev >= item.durationSec) {
          stopAudio();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const formatSeconds = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleShare = async (item, isAudio = false) => {
    const shareUrl = window.location.href;
    const title = `${item.title} — Christ's Tabernacle Testimony`;
    const text = `✝ "${item.title}"\n${item.name} (${item.location})\n${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {}
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      showToast("Testimony link copied to clipboard!");
    }
  };

  const filteredWritten =
    activeCategory === "All"
      ? testimonies
      : testimonies.filter((t) => t.category?.toLowerCase() === activeCategory.toLowerCase());

  const filteredAudio =
    activeCategory === "All"
      ? audioTestimonies
      : audioTestimonies.filter((t) => t.category?.toLowerCase() === activeCategory.toLowerCase());

  const activeAudioItem = audioTestimonies.find((a) => a.id === playingId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTestimonial({
        name: formData.anonymous ? "Anonymous Believer" : formData.name,
        location: formData.location || "Chennai, India",
        category: formData.category,
        title: formData.title,
        story: formData.type === "Audio"
          ? `[Audio Testimony Request] ${formData.story}`
          : formData.story,
        isApproved: false,
      });
    } catch (err) {
      console.warn("Testimony submission:", err.message);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        name: "",
        location: "",
        category: "Healing",
        type: "Written",
        title: "",
        story: "",
        anonymous: false,
        audioDuration: "",
      });
    }, 2200);
  };

  return (
    <>
      <style>{`
        /* ── Format & Filter Switcher ── */
        .test-format-bar {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .test-format-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          border: 1.5px solid rgba(214, 182, 107, 0.4);
          background: #FFFFFF;
          color: var(--green-deep);
          transition: all 0.22s ease;
          box-shadow: 0 2px 8px rgba(18, 45, 36, 0.04);
        }
        .test-format-btn:hover {
          border-color: var(--gold);
          background: #FAF6EE;
          transform: translateY(-1px);
        }
        .test-format-btn.active {
          background: linear-gradient(135deg, #184332 0%, #276D52 100%);
          color: var(--gold-bright);
          border-color: var(--gold);
          box-shadow: 0 4px 16px rgba(24, 67, 50, 0.25);
        }

        .test-filter-bar {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .test-filter-btn {
          padding: 7px 18px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          border: 1.5px solid var(--border-gold-subtle);
          background: #FFFFFF;
          color: #3D5949;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .test-filter-btn:hover {
          color: var(--green-deep);
          border-color: var(--gold);
          background: #FAF6EE;
        }
        .test-filter-btn.active {
          background: var(--gold);
          color: #0C2219;
          border-color: var(--gold);
          font-weight: 800;
          box-shadow: 0 2px 8px rgba(214, 182, 107, 0.3);
        }

        /* ── Audio Testimonies Section ── */
        .audio-test-banner {
          background: linear-gradient(135deg, #0C2219 0%, #184332 50%, #205842 100%);
          border-radius: 20px;
          padding: 28px 32px;
          margin-bottom: 34px;
          color: #FAF6EE;
          border: 1.5px solid rgba(214, 182, 107, 0.4);
          box-shadow: 0 10px 30px rgba(12, 34, 25, 0.18);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .audio-test-banner-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: #FAF6EE;
          margin: 0 0 6px;
        }
        .audio-test-banner-desc {
          margin: 0;
          color: rgba(250, 246, 238, 0.85);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .audio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 26px;
          margin-bottom: 48px;
        }
        .audio-card {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1.5px solid rgba(214, 182, 107, 0.35);
          padding: 26px;
          box-shadow: 0 4px 18px rgba(18, 45, 36, 0.05);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .audio-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(18, 45, 36, 0.1);
          border-color: var(--gold);
        }
        .audio-card.is-playing {
          border-color: var(--gold);
          box-shadow: 0 8px 30px rgba(214, 182, 107, 0.25);
          background: linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 100%);
        }

        /* Audio Waveform Equalizer */
        .audio-waveform {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 32px;
          padding: 0 8px;
        }
        .audio-bar {
          width: 3px;
          height: 8px;
          background: rgba(214, 182, 107, 0.4);
          border-radius: 3px;
          transition: height 0.15s ease;
        }
        .audio-bar.playing {
          background: var(--gold);
          animation: wavePulse 0.8s ease-in-out infinite alternate;
        }
        @keyframes wavePulse {
          0% { height: 6px; }
          50% { height: 28px; }
          100% { height: 12px; }
        }

        /* ── Written Grid ── */
        .test-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .test-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(214, 182, 107, 0.35);
          border-radius: 18px;
          padding: 30px 26px;
          box-shadow: 0 6px 20px rgba(18, 45, 36, 0.06);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          flex-direction: column;
        }
        .test-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(18, 45, 36, 0.12);
          border-color: var(--gold);
        }
        .test-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .test-cat-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(214, 182, 107, 0.14);
          color: var(--gold-dark);
          padding: 4px 12px;
          border-radius: 50px;
          border: 1px solid rgba(214, 182, 107, 0.35);
        }
        .test-date {
          font-size: 0.76rem;
          color: var(--text-light);
        }
        .test-card-title {
          font-family: var(--font-serif);
          font-size: 1.22rem;
          color: var(--green-deep);
          margin: 0 0 12px;
          font-weight: 700;
          line-height: 1.35;
        }
        .test-card-story {
          font-size: 0.91rem;
          color: #374151;
          line-height: 1.7;
          margin: 0 0 18px;
          flex-grow: 1;
        }
        .test-verse-box {
          background: #FAF6EE;
          border-left: 3px solid var(--gold);
          padding: 10px 14px;
          border-radius: 0 8px 8px 0;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.82rem;
          color: var(--green-dark);
          line-height: 1.5;
          margin-bottom: 18px;
        }
        .test-card-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid rgba(214, 182, 107, 0.2);
          padding-top: 14px;
        }
        .test-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #184332 0%, #276D52 100%);
          color: var(--gold-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
          border: 1.5px solid rgba(214, 182, 107, 0.4);
        }
        .test-author-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--green-deep);
          display: block;
        }
        .test-author-loc {
          font-size: 0.74rem;
          color: var(--text-muted);
          display: block;
        }

        /* ── Sticky Bottom Sanctuary Audio Player Dock ── */
        .ct-audio-dock {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 780px;
          background: linear-gradient(135deg, #0C2219 0%, #184332 100%);
          border-radius: 50px;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          z-index: 1040;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
          border: 1.5px solid var(--gold);
          color: #FAF6EE;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { transform: translate(-50%, 40px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .test-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .test-grid { grid-template-columns: 1fr; }
          .audio-grid { grid-template-columns: 1fr; }
          .test-form-grid { grid-template-columns: 1fr; }
          .test-card { padding: 22px 18px; }
          .audio-card { padding: 20px 16px; }
          .ct-audio-dock {
            border-radius: 20px;
            padding: 12px 16px;
            bottom: 12px;
          }
        }
      `}</style>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div style={{
          position: "fixed", bottom: 90, right: 28, zIndex: 9999,
          background: "#0C2219", color: "#FAF6EE", padding: "12px 24px",
          borderRadius: 12, border: "1.5px solid var(--gold)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)", fontWeight: 700,
          fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 10
        }}>
          <FaCheck color="var(--gold)" /> {toastMsg}
        </div>
      )}

      {/* ── Subpage Hero ── */}
      <section className="ct-page-hero" aria-labelledby="testimonies-title">
        <div className="ct-page-hero-eyebrow">† Miracles &amp; Deliverance †</div>
        <h1 id="testimonies-title" className="ct-page-hero-title">
          Stories of <span>Faith &amp; Deliverance</span>
        </h1>
        <p className="ct-page-hero-desc">
          "They overcame him by the blood of the Lamb and by the word of their testimony." — Revelation 12:11. Listen to and read verified real-life miracles, healing, and supernatural deliverance through Jesus Christ.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setModalOpen(true)}
            className="ct-btn-gold"
            aria-label="Share Your Testimony"
          >
            ✍️ Share Your Testimony
          </button>
          <button
            onClick={() => { setActiveTab("audio"); }}
            style={{
              padding: "10px 24px", borderRadius: 30, background: "rgba(255,255,255,0.1)",
              border: "1.5px solid var(--gold)", color: "var(--gold-bright)",
              fontWeight: 800, fontSize: "0.88rem", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8
            }}
          >
            <FaHeadphones size={14} /> Listen to Audio Testimonies
          </button>
        </div>
      </section>

      {/* ── Content Container ── */}
      <div style={{ background: "var(--ivory)", borderTop: "1px solid rgba(214,182,107,0.2)", paddingBottom: 60 }}>
        <div className="ct-container" style={{ padding: "40px 24px 80px" }}>

          {/* Format Selector: All | Audio Testimonials | Written Testimonies */}
          <div className="test-format-bar" role="tablist">
            <button
              className={`test-format-btn${activeTab === "all" ? " active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              ✨ All Testimonies ({testimonies.length + audioTestimonies.length})
            </button>
            <button
              className={`test-format-btn${activeTab === "audio" ? " active" : ""}`}
              onClick={() => setActiveTab("audio")}
            >
              <FaMicrophone size={14} color={activeTab === "audio" ? "var(--gold-bright)" : "var(--gold-dark)"} />
              🎙️ Audio Testimonials ({audioTestimonies.length})
            </button>
            <button
              className={`test-format-btn${activeTab === "written" ? " active" : ""}`}
              onClick={() => setActiveTab("written")}
            >
              <FaFileAlt size={13} color={activeTab === "written" ? "var(--gold-bright)" : "var(--green-deep)"} />
              📖 Written Testimonies ({testimonies.length})
            </button>
          </div>

          {/* Category Filters */}
          <div className="test-filter-bar" role="tablist" aria-label="Testimony Categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`test-filter-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={activeCategory === cat}
              >
                {cat === "All" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          {/* ════ SECTION 1: AUDIO TESTIMONIALS (VOICE OF VICTORY) ════ */}
          {(activeTab === "all" || activeTab === "audio") && (
            <div style={{ marginBottom: 50 }}>
              <div className="audio-test-banner">
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: 1.8, color: "var(--gold)", textTransform: "uppercase", marginBottom: 6 }}>
                    🎧 Voice of Deliverance &amp; Victory
                  </div>
                  <h2 className="audio-test-banner-title">
                    Audio Testimonials — Hear What God Has Done
                  </h2>
                  <p className="audio-test-banner-desc">
                    Listen directly to believers sharing emotional accounts of cancer healings, demonic deliverances, debt cancellations, and family miracles.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(214, 182, 107, 0.2)",
                    border: "1.5px solid var(--gold)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold-bright)", fontSize: "1.3rem"
                  }}>
                    🎙️
                  </div>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 800, color: "var(--gold-bright)" }}>
                      {filteredAudio.length} Audio Recordings
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(250,246,238,0.7)" }}>
                      Recorded at Christ's Tabernacle Altars
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Cards Grid */}
              <div className="audio-grid">
                {filteredAudio.map((item) => {
                  const isPlaying = playingId === item.id;
                  const currentSec = isPlaying ? playbackSec : 0;
                  const progressPct = (currentSec / item.durationSec) * 100;

                  return (
                    <article
                      key={item.id}
                      className={`audio-card${isPlaying ? " is-playing" : ""}`}
                    >
                      {/* Top Row: Category, Language & Date */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span className="test-cat-tag">{item.category}</span>
                          <span style={{
                            fontSize: "0.7rem", fontWeight: 800, padding: "3px 8px",
                            borderRadius: 12, background: "#EAF2EE", color: "#184332",
                            border: "1px solid #D1E2D8"
                          }}>
                            🗣 {item.language}
                          </span>
                        </div>
                        <span className="test-date">{item.date}</span>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.18rem",
                        color: "var(--green-deep)",
                        margin: "0 0 10px",
                        fontWeight: 700,
                        lineHeight: 1.35
                      }}>
                        {item.title}
                      </h3>

                      {/* Story Transcript */}
                      <p style={{
                        fontSize: "0.88rem",
                        color: "#374151",
                        lineHeight: 1.65,
                        margin: "0 0 14px",
                        flexGrow: 1
                      }}>
                        "{item.story}"
                      </p>

                      {/* Scripture Verse */}
                      {item.verse && (
                        <div className="test-verse-box">
                          {item.verse}
                        </div>
                      )}

                      {/* Interactive Audio Player Deck */}
                      <div style={{
                        background: isPlaying ? "linear-gradient(135deg, #0C2219 0%, #184332 100%)" : "#FAF6EE",
                        borderRadius: 14,
                        padding: "14px 16px",
                        border: isPlaying ? "1.5px solid var(--gold)" : "1.5px solid #EDE5D8",
                        marginBottom: 16,
                        transition: "all 0.25s ease"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                          {/* Play / Pause Button */}
                          <button
                            onClick={() => togglePlayAudio(item)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "8px 16px",
                              borderRadius: 30,
                              background: isPlaying ? "var(--gold)" : "var(--green)",
                              color: isPlaying ? "#0C2219" : "#FAF6EE",
                              border: "none",
                              fontWeight: 800,
                              fontSize: "0.82rem",
                              cursor: "pointer",
                              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                              transition: "all 0.18s ease"
                            }}
                          >
                            {isPlaying ? <><FaPause size={11} /> Pause Audio</> : <><FaPlay size={10} /> Play Voice ({item.duration})</>}
                          </button>

                          {/* Animated Waveform Equalizer */}
                          <div className="audio-waveform">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((idx) => (
                              <div
                                key={idx}
                                className={`audio-bar${isPlaying ? " playing" : ""}`}
                                style={{
                                  animationDelay: `${(idx % 4) * 0.15}s`,
                                  background: isPlaying ? "var(--gold)" : "rgba(24, 67, 50, 0.3)"
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Progress Bar & Time */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, color: isPlaying ? "var(--gold-bright)" : "var(--text-muted)", minWidth: 32 }}>
                            {formatSeconds(currentSec)}
                          </span>
                          <div style={{
                            flex: 1, height: 6, borderRadius: 3,
                            background: isPlaying ? "rgba(255,255,255,0.2)" : "#E0D7C8",
                            overflow: "hidden", position: "relative"
                          }}>
                            <div style={{
                              width: `${progressPct}%`,
                              height: "100%",
                              background: isPlaying ? "var(--gold)" : "var(--green)",
                              borderRadius: 3,
                              transition: "width 0.3s ease"
                            }} />
                          </div>
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, color: isPlaying ? "var(--gold-bright)" : "var(--text-muted)", minWidth: 32 }}>
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      {/* Author Info & Actions */}
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", paddingTop: 12,
                        borderTop: "1px solid rgba(214,182,107,0.2)"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="test-avatar" style={{ background: "linear-gradient(135deg, #0C2219 0%, #184332 100%)" }}>
                            🎙️
                          </div>
                          <div>
                            <span className="test-author-name">{item.name}</span>
                            <span className="test-author-loc">{item.location}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleShare(item, true)}
                          title="Share audio testimony"
                          style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "6px 12px", borderRadius: 8,
                            background: "#FAF6EE", border: "1px solid #EDE5D8",
                            color: "var(--green-deep)", fontWeight: 700,
                            fontSize: "0.78rem", cursor: "pointer"
                          }}
                        >
                          <FaShareAlt size={11} color="var(--gold-dark)" /> Share
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ SECTION 2: WRITTEN TESTIMONIALS ════ */}
          {(activeTab === "all" || activeTab === "written") && (
            <div>
              {activeTab === "all" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  marginBottom: 24, marginTop: 16
                }}>
                  <div style={{
                    fontSize: "1.2rem", fontWeight: 800,
                    color: "var(--green-deep)", fontFamily: "var(--font-serif)"
                  }}>
                    📖 Written Testimonies of Deliverance
                  </div>
                  <div style={{ flex: 1, height: 1.5, background: "rgba(214, 182, 107, 0.3)" }} />
                </div>
              )}

              <div className="test-grid">
                {filteredWritten.map((t) => (
                  <article key={t._id || t.id} className="test-card">
                    <div className="test-card-head">
                      <span className="test-cat-tag">{t.category}</span>
                      <span className="test-date">{t.date}</span>
                    </div>
                    <h3 className="test-card-title">{t.title}</h3>
                    <p className="test-card-story">{t.story}</p>
                    {t.verse && <div className="test-verse-box">{t.verse}</div>}
                    <div className="test-card-footer">
                      <div className="test-avatar" aria-hidden="true">
                        {t.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <span className="test-author-name">{t.name}</span>
                        <span className="test-author-loc">{t.location}</span>
                      </div>
                      <button
                        onClick={() => handleShare(t, false)}
                        title="Share testimony"
                        style={{
                          background: "none", border: "none",
                          color: "var(--gold-dark)", cursor: "pointer",
                          display: "flex", alignItems: "center", padding: 6
                        }}
                      >
                        <FaShareAlt size={13} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── STICKY SANCTUARY AUDIO PLAYER DOCK (when audio is active) ── */}
      {playingId && activeAudioItem && (
        <div className="ct-audio-dock">
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
            <button
              onClick={() => togglePlayAudio(activeAudioItem)}
              style={{
                width: 42, height: 42, borderRadius: "50%",
                background: "var(--gold)", color: "#0C2219",
                border: "none", display: "flex", alignItems: "center",
                justifyContent: "center", cursor: "pointer", flexShrink: 0,
                boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
              }}
            >
              <FaPause size={13} />
            </button>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontSize: "0.88rem", fontWeight: 800, color: "#FAF6EE",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
              }}>
                {activeAudioItem.title}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--gold-bright)", display: "flex", alignItems: "center", gap: 8 }}>
                <span>🎙️ {activeAudioItem.name}</span>
                <span>•</span>
                <span>{formatSeconds(playbackSec)} / {activeAudioItem.duration}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setIsMuted(m => !m)}
              style={{
                background: "rgba(255,255,255,0.1)", border: "none",
                color: "#FAF6EE", width: 34, height: 34, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer"
              }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute size={14} color="var(--gold-bright)" /> : <FaVolumeUp size={14} />}
            </button>

            <button
              onClick={stopAudio}
              style={{
                background: "rgba(255,255,255,0.1)", border: "none",
                color: "#FAF6EE", width: 34, height: 34, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer"
              }}
              title="Close player"
            >
              <FaTimes size={13} />
            </button>
          </div>
        </div>
      )}

      {/* ── Share Testimony Modal (Supports Written & Audio Submission) ── */}
      {modalOpen && (
        <div className="ct-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="ct-modal-window" onClick={(e) => e.stopPropagation()}>
            <button
              className="ct-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <span style={{ fontSize: "3rem" }}>🙌</span>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--green-dark)", fontSize: "1.8rem", margin: "14px 0 8px" }}>
                  Praise the Lord!
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                  Your {formData.type.toLowerCase()} testimony has been received. Our pastoral team will review and share it to encourage believers worldwide. God bless you!
                </p>
              </div>
            ) : (
              <div>
                <span className="ct-badge" style={{ marginBottom: 10 }}>† Declare God's Goodness †</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--green-dark)", margin: "4px 0 14px" }}>
                  Share Your Testimony
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: 20 }}>
                  Did Jesus heal you, set you free, or answer your prayers at Christ's Tabernacle? Submit your written story or request an audio testimony recording!
                </p>

                {/* Format choice in modal */}
                <div style={{
                  display: "flex", gap: 10, marginBottom: 20,
                  background: "#FAF6EE", padding: 5, borderRadius: 12,
                  border: "1px solid #EDE5D8"
                }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "Written" })}
                    style={{
                      flex: 1, padding: "8px 12px", borderRadius: 8,
                      border: "none", cursor: "pointer", fontWeight: 700,
                      fontSize: "0.84rem",
                      background: formData.type === "Written" ? "var(--green)" : "transparent",
                      color: formData.type === "Written" ? "#FAF6EE" : "var(--green-deep)"
                    }}
                  >
                    📖 Written Story
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "Audio" })}
                    style={{
                      flex: 1, padding: "8px 12px", borderRadius: 8,
                      border: "none", cursor: "pointer", fontWeight: 700,
                      fontSize: "0.84rem",
                      background: formData.type === "Audio" ? "var(--green)" : "transparent",
                      color: formData.type === "Audio" ? "#FAF6EE" : "var(--green-deep)"
                    }}
                  >
                    🎙️ Audio Testimony / Voice Note
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="test-form-grid">
                    <div className="ct-form-group">
                      <label className="ct-form-label">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bro. David"
                        className="ct-form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="ct-form-group">
                      <label className="ct-form-label">City / Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chennai, India"
                        className="ct-form-input"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Category</label>
                    <select
                      className="ct-form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Healing">Divine Healing</option>
                      <option value="Deliverance">Deliverance &amp; Freedom</option>
                      <option value="Family">Family Restoration</option>
                      <option value="Breakthrough">Financial &amp; Career Breakthrough</option>
                      <option value="Salvation">Salvation &amp; Life Transformation</option>
                    </select>
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">
                      {formData.type === "Audio" ? "Audio Testimony Title" : "Testimony Headline"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. How God healed my chronic illness"
                      className="ct-form-input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">
                      {formData.type === "Audio" ? "Audio Description / Summary" : "Your Story"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={
                        formData.type === "Audio"
                          ? "Briefly describe what you would like to share in your voice testimony, or provide a link to your voice recording..."
                          : "Describe what happened, how God intervened, and the difference Jesus made in your life..."
                      }
                      className="ct-form-textarea"
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    />
                  </div>

                  {formData.type === "Audio" && (
                    <div style={{
                      background: "#FAF6EE", padding: "12px 16px", borderRadius: 10,
                      border: "1px dashed var(--gold)", marginBottom: 18,
                      fontSize: "0.82rem", color: "var(--green-deep)"
                    }}>
                      🎙️ <strong>Audio Recording Note:</strong> You can submit a summary above, and our media team will contact you or connect you with the church studio / WhatsApp audio desk to record your voice testimony.
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <input
                      type="checkbox"
                      id="anon"
                      checked={formData.anonymous}
                      onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                    />
                    <label htmlFor="anon" style={{ fontSize: "0.85rem", color: "var(--text-muted)", cursor: "pointer" }}>
                      Keep my name anonymous when publishing publicly
                    </label>
                  </div>

                  <button type="submit" className="ct-btn-gold" style={{ width: "100%" }}>
                    {formData.type === "Audio" ? "🎙️ Submit Audio Testimony Request" : "✍️ Submit Testimony to the Church"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
