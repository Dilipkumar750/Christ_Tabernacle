import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getPublicHeroSlides } from "../../services/api";
import logoImg from "../../assets/logo.jpeg";
import sanctuaryImg from "../../assets/sanctuary.jpg";
import modernSanctuaryImg from "../../assets/Modern-Sanctuary.png";
import heroBanner1 from "../../assets/hero-banner.png";
import heroBanner2 from "../../assets/hero-banner2.png";
import heroBanner3 from "../../assets/hero-banner3.png";

const BANNER_SLIDES = [
  {
    id: 1,
    image: heroBanner1,
    alt: "Christ's Tabernacle - Prayer & Worship Centre with Holy Bible and Cross at Sunrise",
    tag: "Established 1991",
    title: "Christ's Tabernacle Prayer & Worship Centre",
    subtitle: "A House of Prayer • A Place of Deliverance • A Centre of Divine Healing",
    verse: "Isaiah 56:7",
    actionText: "Plan a Visit",
    actionLink: "/contact",
  },
  {
    id: 2,
    image: heroBanner2,
    alt: "A Place to Worship, Grow, Serve - Faith, Family, Future",
    tag: "Joshua 24:15",
    title: "A Place to Worship, Grow & Serve",
    subtitle: "“As for me and my house, we will serve the Lord.” Rooted in Faith, Family & Future.",
    verse: "Joshua 24:15",
    actionText: "Our Mission & Vision",
    actionLink: "/about/mission",
  },
  {
    id: 3,
    image: heroBanner3,
    alt: "A Home for Prayer, Worship & Community - Together in His Love",
    tag: "Matthew 18:20",
    title: "A Home for Prayer, Worship & Community",
    subtitle: "“For where two or three gather in my name, there am I with them.” Together in His Love.",
    verse: "Matthew 18:20",
    actionText: "Service Schedules",
    actionLink: "/prayers/sunday-services",
  },
];

const PILLARS = [
  {
    icon: "🙏",
    title: "A House of Prayer",
    verse: "Isaiah 56:7",
    desc: "A holy place where hearts meet God in reverent worship and prevailing intercession. We believe prayer transforms lives, restores families, and releases God's supernatural power across generations.",
    link: "/prayers",
  },
  {
    icon: "🔓",
    title: "A Place of Deliverance",
    verse: "Luke 4:18",
    desc: "A sanctuary where captives are set free through the Gospel of Jesus Christ. We break every spiritual bondage and chain of darkness by the authority of Christ's Holy Name.",
    link: "/about/mission",
  },
  {
    icon: "✝️",
    title: "A Centre of Divine Healing",
    verse: "Isaiah 53:5",
    desc: "A refuge where the sick, weary, and broken receive miraculous healing and wholeness in body, soul, and spirit through the Word of God and the power of the Holy Spirit.",
    link: "/testimonies",
  },
];

const SERVICE_TIMES = [
  { label: "Sunday Worship & Communion", time: "8:15 AM – 11:15 AM", icon: "☀️", note: "Main Service" },
  { label: "Fasting & Deliverance Prayer", time: "New Moon & Full Moon Days", icon: "🌙", note: "Intercessory Vigil" },
  { label: "Evening Intercessory Prayer", time: "7:00 PM – 8:30 PM", icon: "🕯️", note: "Weekly Fellowship" },
];

const QUICK_EXPLORE = [
  {
    title: "Sunday Sermons",
    desc: "Uplifting messages from the Word of God by Pastor Saravanan Immanuel.",
    icon: "📖",
    path: "/sermons/sunday",
    tag: "The Word",
  },
  {
    title: "Worship Songs",
    desc: "Beloved praise songs, hymns, and choir recordings with lyrics.",
    icon: "🎵",
    path: "/songs/lyrics",
    tag: "Praise",
  },
  {
    title: "Testimonies",
    desc: "Powerful real-life stories of miraculous healing, deliverance, and grace.",
    icon: "🙌",
    path: "/testimonies",
    tag: "Miracles",
  },
  {
    title: "Prayers & Fasting",
    desc: "Service schedules, fasting guidelines, and transformation prayer points.",
    icon: "🕯️",
    path: "/prayers/sunday-services",
    tag: "Fellowship",
  },
  {
    title: "Media Gallery",
    desc: "Browse church photo albums, baptism memories, and video archives.",
    icon: "📷",
    path: "/media/photos",
    tag: "Gallery",
  },
  {
    title: "Connect & Visit",
    desc: "Send your prayer requests, get directions, and meet our pastoral team.",
    icon: "✉️",
    path: "/contact",
    tag: "Contact",
  },
];

export default function Home() {
  const [slides, setSlides] = useState(BANNER_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSanctuaryView, setActiveSanctuaryView] = useState("modern");
  const touchStartXRef = useRef(null);

  // Fetch dynamic hero slides from backend API
  useEffect(() => {
    const fetchDynamicHero = async () => {
      try {
        const dynamicSlides = await getPublicHeroSlides();
        if (dynamicSlides && dynamicSlides.length > 0) {
          setSlides(dynamicSlides);
        }
      } catch {
        // Fallback to static slides silently
      }
    };
    fetchDynamicHero();
  }, []);

  // Auto-play slideshow every 5.5 seconds unless paused
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNextSlide();
    } else if (diff < -45) {
      handlePrevSlide();
    }
    touchStartXRef.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrevSlide();
    if (e.key === "ArrowRight") handleNextSlide();
  };

  return (
    <>
      <style>{`
        /* ── Hero Section ── */
        .home-hero {
          background: var(--grad-hero);
          padding: 85px 24px 70px;
          text-align: center;
          position: relative;
          overflow: hidden;
          font-family: var(--font-sans);
          border-bottom: 2px solid var(--border-gold-subtle);
        }
        .home-hero::before {
          content: '✝';
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 360px;
          color: rgba(214, 182, 107, 0.05);
          pointer-events: none;
          font-family: var(--font-serif);
          line-height: 1;
        }

        .home-hero-badge {
          position: relative;
          width: 130px;
          height: 130px;
          margin: 0 auto 26px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .home-hero-halo {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(214, 182, 107, 0.45) 0%, rgba(214, 182, 107, 0) 70%);
          animation: ctPulse 3.5s ease-in-out infinite alternate;
        }
        .home-hero-logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--gold);
          box-shadow: 0 10px 32px rgba(12, 34, 25, 0.22), 0 0 25px rgba(214, 182, 107, 0.4);
          position: relative;
          z-index: 1;
          transition: transform 0.4s ease;
          background: #ffffff;
        }
        .home-hero-logo:hover {
          transform: scale(1.05);
        }

        .home-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(232, 183, 183, 0.15);
          border: 1px solid var(--border-blush);
          border-radius: 50px;
          padding: 7px 22px;
          font-size: 0.74rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--blush-dark);
          font-weight: 700;
          margin-bottom: 22px;
        }

        .home-hero-h1 {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 6vw, 4.2rem);
          color: var(--green-dark);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }
        .home-hero-h1 span {
          background: var(--grad-gold);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .home-hero-sub {
          font-family: var(--font-serif);
          font-size: clamp(1rem, 2.2vw, 1.35rem);
          color: var(--gold-dark);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 22px;
          font-weight: 600;
        }

        .home-hero-desc {
          font-size: clamp(1rem, 2vw, 1.18rem);
          color: var(--text-muted);
          max-width: 720px;
          margin: 0 auto 36px;
          line-height: 1.75;
        }
        .home-hero-desc strong {
          color: var(--green);
          font-weight: 600;
        }

        .home-hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }

        /* Service Times Strip */
        .home-service-strip {
          display: flex;
          justify-content: center;
          background: var(--white);
          border-radius: 18px;
          border: 1.5px solid var(--border-gold-subtle);
          box-shadow: var(--shadow-md);
          max-width: 820px;
          margin: 0 auto;
          overflow: hidden;
        }
        .home-service-item {
          flex: 1;
          min-width: 200px;
          padding: 20px 24px;
          text-align: center;
          border-right: 1px solid var(--border-gold-subtle);
          transition: background 0.25s;
        }
        .home-service-item:hover {
          background: var(--gold-soft);
        }
        .home-service-item:last-child {
          border-right: none;
        }
        .home-service-icon {
          font-size: 1.5rem;
          margin-bottom: 6px;
        }
        .home-service-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--blush-dark);
          display: block;
          margin-bottom: 4px;
        }
        .home-service-time {
          font-size: 0.88rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* ── Pillars Section ── */
        .home-pillars {
          background: 
            radial-gradient(circle at 85% 15%, rgba(214, 182, 107, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 12% 85%, rgba(48, 128, 98, 0.35) 0%, transparent 50%),
            linear-gradient(140deg, #0C2419 0%, #133929 18%, #184332 42%, #1E5540 68%, #276D52 88%, #328464 100%);
          padding: 85px 24px;
          font-family: var(--font-sans);
          color: var(--ivory);
          position: relative;
          overflow: hidden;
          border-top: 2px solid var(--border-gold);
          border-bottom: 2px solid var(--border-gold);
        }
        .home-pillars::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(214,182,107,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .home-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 48px;
        }
        .home-pillar-card {
          background: linear-gradient(155deg, rgba(255, 255, 255, 0.12) 0%, rgba(24, 67, 50, 0.45) 50%, rgba(12, 36, 25, 0.82) 100%);
          border: 1.5px solid rgba(214, 182, 107, 0.35);
          border-radius: 18px;
          padding: 38px 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(10px);
          transition: transform 0.28s ease, background 0.28s, border-color 0.28s, box-shadow 0.28s;
          display: flex;
          flex-direction: column;
        }
        .home-pillar-card:hover {
          transform: translateY(-6px);
          background: linear-gradient(155deg, rgba(255, 255, 255, 0.2) 0%, rgba(30, 84, 64, 0.55) 50%, rgba(12, 36, 25, 0.9) 100%);
          border-color: var(--gold);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.38), 0 0 20px rgba(214, 182, 107, 0.2);
        }
        .home-pillar-icon {
          font-size: 2.5rem;
          margin-bottom: 18px;
          display: block;
        }
        .home-pillar-card h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--gold-bright);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .home-pillar-verse {
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-light);
          font-weight: 700;
          margin-bottom: 14px;
        }
        .home-pillar-card p {
          font-size: 0.92rem;
          color: rgba(250, 246, 238, 0.78);
          line-height: 1.75;
          margin: 0 0 20px;
          flex-grow: 1;
        }
        .home-pillar-link {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--gold-light);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.2s;
        }
        .home-pillar-link:hover {
          transform: translateX(4px);
          color: var(--white);
        }

        /* ── Welcome & Story Section ── */
        .home-welcome {
          padding: 90px 24px;
          background: var(--ivory);
        }
        .home-welcome-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }
        .home-welcome-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 2px solid var(--border-gold);
        }
        .home-welcome-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .home-welcome-img-wrap:hover .home-welcome-img {
          transform: scale(1.03);
        }
        .home-welcome-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: var(--grad-sanctuary-dark);
          color: var(--ivory);
          border: 1px solid var(--gold);
          border-radius: 12px;
          padding: 12px 20px;
          box-shadow: var(--shadow-md);
        }

        /* ── Mission Purpose Strip ── */
        .home-mission {
          background: var(--white);
          padding: 85px 24px;
          text-align: center;
          border-top: 1px solid var(--border-gold-subtle);
          border-bottom: 1px solid var(--border-gold-subtle);
        }
        .home-mission-tags {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin: 30px 0 40px;
        }
        .home-mission-tag {
          background: var(--ivory);
          color: var(--green);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 10px 24px;
          border-radius: 50px;
          border: 2px solid var(--green);
          box-shadow: var(--shadow-sm);
          transition: all 0.22s ease;
        }
        .home-mission-tag:hover {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
        }

        /* ── Quick Explore Grid ── */
        .home-explore {
          padding: 85px 24px;
          background: var(--ivory-warm);
        }
        .home-explore-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-top: 45px;
        }
        .home-explore-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          flex-direction: column;
        }
        .home-explore-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
        }
        .home-explore-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .home-explore-icon {
          font-size: 2.2rem;
        }
        .home-explore-tag {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: var(--gold-soft);
          color: var(--gold-dark);
          padding: 4px 10px;
          border-radius: 50px;
          border: 1px solid var(--border-gold-subtle);
        }
        .home-explore-card h3 {
          font-family: var(--font-serif);
          font-size: 1.18rem;
          color: var(--green-dark);
          margin: 0 0 10px;
          font-weight: 700;
        }
        .home-explore-card p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0 0 18px;
          flex-grow: 1;
        }
        .home-explore-arrow {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--gold-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* ── Weekly Promise Banner ── */
        .home-promise {
          background: 
            radial-gradient(ellipse at 50% 0%, rgba(214, 182, 107, 0.22) 0%, transparent 60%),
            radial-gradient(ellipse at 85% 100%, rgba(50, 132, 100, 0.3) 0%, transparent 50%),
            linear-gradient(145deg, #0B2217 0%, #123626 22%, #184332 48%, #1F5741 75%, #2A7256 100%);
          padding: 68px 24px;
          color: var(--ivory);
          text-align: center;
          position: relative;
          overflow: hidden;
          border-top: 2px solid var(--gold);
          border-bottom: 2px solid var(--border-gold-subtle);
        }
        .home-promise::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 100%, rgba(214,182,107,0.14) 0%, transparent 60%);
          pointer-events: none;
        }
        .home-promise-inner {
          max-width: 820px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1024px) {
          .home-pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .home-welcome-grid { gap: 36px; }
        }
        @media (max-width: 768px) {
          .home-hero { padding: 60px 16px 50px; }
          .home-hero-badge { width: 105px; height: 105px; margin-bottom: 20px; }
          .home-hero-actions { gap: 10px; margin-bottom: 40px; }
          .home-pillars { padding: 60px 16px; }
          .home-pillars-grid { grid-template-columns: 1fr; gap: 20px; }
          .home-welcome { padding: 60px 16px; }
          .home-welcome-grid { grid-template-columns: 1fr; }
          .home-welcome-img { height: 260px; }
          .home-service-strip { flex-direction: column; max-width: 100%; border-radius: 14px; }
          .home-service-item { border-right: none; border-bottom: 1px solid var(--border-gold-subtle); padding: 16px 18px; }
          .home-mission { padding: 60px 16px; }
          .home-explore { padding: 60px 16px; }
          .home-promise { padding: 50px 16px; }
        }
        @media (max-width: 480px) {
          .home-hero-actions a { width: 100%; text-align: center; }
          .home-hero-tag { font-size: 0.65rem; padding: 6px 14px; }
          .home-mission-tags { gap: 8px; margin: 24px 0 30px; }
          .home-mission-tag { padding: 8px 16px; font-size: 0.72rem; }
          .home-welcome-badge { bottom: 12px; left: 12px; padding: 8px 12px; }
        }

        /* ── Grand Hero Banner Carousel ── */
        .home-banner-section {
          background: linear-gradient(180deg, #071911 0%, #0d281c 45%, #133929 100%);
          padding: 24px 20px 20px;
          position: relative;
          outline: none;
        }
        .home-banner-container {
          max-width: 1360px;
          margin: 0 auto;
        }
        .home-banner-slider {
          position: relative;
          width: 100%;
          aspect-ratio: 21 / 8.2;
          min-height: 280px;
          max-height: 540px;
          border-radius: 20px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45), 0 0 0 1.5px rgba(214, 182, 107, 0.38);
        }
        .home-banner-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1), transform 0.85s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(1.025);
          pointer-events: none;
        }
        .home-banner-slide.active {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
          pointer-events: auto;
        }
        .home-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .home-banner-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.1) 45%, rgba(7, 25, 17, 0.84) 100%);
          pointer-events: none;
        }
        .home-banner-content-strip {
          position: absolute;
          bottom: 20px;
          left: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: rgba(12, 36, 25, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 12px 22px;
          border-radius: 14px;
          border: 1px solid rgba(214, 182, 107, 0.45);
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          z-index: 5;
        }
        .home-banner-tag {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          white-space: nowrap;
          background: rgba(214, 182, 107, 0.15);
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid rgba(214, 182, 107, 0.35);
        }
        .home-banner-caption-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .home-banner-slide-title {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ivory);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home-banner-slide-sub {
          font-size: 0.82rem;
          color: rgba(250, 246, 238, 0.82);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home-banner-cta-btn {
          background: linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 100%);
          color: var(--green-dark);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(214, 182, 107, 0.3);
        }
        .home-banner-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(214, 182, 107, 0.5);
          color: #06170f;
        }

        /* Banner Carousel Buttons */
        .home-banner-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(12, 36, 25, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(214, 182, 107, 0.55);
          color: var(--gold-bright);
          font-size: 1.15rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          z-index: 10;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .home-banner-btn:hover {
          background: var(--gold-bright);
          color: var(--green-dark);
          transform: translateY(-50%) scale(1.1);
          border-color: #ffffff;
        }
        .home-banner-prev { left: 18px; }
        .home-banner-next { right: 18px; }

        /* Banner Carousel Controls: Dots & Status */
        .home-banner-controls {
          position: absolute;
          top: 18px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(7, 25, 17, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 6px 14px;
          border-radius: 30px;
          border: 1px solid rgba(214, 182, 107, 0.35);
          z-index: 10;
        }
        .home-banner-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .home-banner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(250, 246, 238, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .home-banner-dot.active {
          background: var(--gold-bright);
          width: 24px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(214, 182, 107, 0.7);
        }
        .home-banner-status {
          display: flex;
          align-items: center;
          gap: 8px;
          border-left: 1px solid rgba(214, 182, 107, 0.3);
          padding-left: 8px;
        }
        .home-banner-counter {
          font-size: 0.72rem;
          color: rgba(250, 246, 238, 0.85);
          font-weight: 600;
          font-family: var(--font-sans);
        }
        .home-banner-playpause {
          background: none;
          border: none;
          color: var(--gold-light);
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .home-banner-playpause:hover {
          color: var(--gold-bright);
        }

        /* ── Sanctuary Views Switcher ── */
        .home-sanctuary-views-bar {
          position: absolute;
          top: 14px;
          left: 14px;
          display: flex;
          gap: 8px;
          z-index: 4;
          background: rgba(12, 36, 25, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 5px;
          border-radius: 30px;
          border: 1px solid rgba(214, 182, 107, 0.45);
        }
        .home-sanctuary-tab {
          border: none;
          background: transparent;
          color: rgba(250, 246, 238, 0.82);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .home-sanctuary-tab.active {
          background: var(--gold-bright);
          color: var(--green-dark);
          box-shadow: 0 2px 10px rgba(214, 182, 107, 0.45);
        }
        .home-sanctuary-img-container {
          overflow: hidden;
          height: 420px;
          background: #0c2419;
        }

        @media (max-width: 900px) {
          .home-banner-content-strip {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            bottom: 14px;
            left: 14px;
            right: 14px;
            padding: 10px 14px;
          }
          .home-banner-cta-btn {
            align-self: flex-start;
          }
        }
        @media (max-width: 768px) {
          .home-banner-section { padding: 14px 12px 14px; }
          .home-banner-slider {
            aspect-ratio: 16 / 9;
            min-height: 220px;
            border-radius: 14px;
          }
          .home-banner-btn {
            width: 36px;
            height: 36px;
            font-size: 0.95rem;
          }
          .home-banner-prev { left: 8px; }
          .home-banner-next { right: 8px; }
          .home-banner-controls {
            top: 10px;
            right: 10px;
            padding: 4px 10px;
          }
          .home-banner-content-strip {
            display: none;
          }
          .home-sanctuary-img-container {
            height: 270px;
          }
        }
      `}</style>

      {/* ── 1. Grand Hero Banner Carousel ── */}
      <section
        className="home-banner-section"
        aria-label="Christ's Tabernacle Featured Banners"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="home-banner-container">
          <div
            className="home-banner-slider"
            role="region"
            aria-roledescription="carousel"
            aria-label="Hero Banner Slideshow"
          >
            {slides.map((slide, idx) => (
              <div
                key={slide._id || slide.id || idx}
                className={`home-banner-slide ${idx === currentSlide ? "active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${slides.length}: ${slide.title}`}
                aria-hidden={idx !== currentSlide}
              >
                <img
                  src={slide.image}
                  alt={slide.alt || slide.title}
                  className="home-banner-img"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
                <div className="home-banner-gradient-overlay" />
                <div className="home-banner-content-strip">
                  <div className="home-banner-tag">✝ {slide.tag} ✝</div>
                  <div className="home-banner-caption-text">
                    <span className="home-banner-slide-title">{slide.title}</span>
                    <span className="home-banner-slide-sub">{slide.subtitle}</span>
                  </div>
                  <Link to={slide.actionLink || '/contact'} className="home-banner-cta-btn">
                    {slide.actionText || 'Plan a Visit'} →
                  </Link>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              type="button"
              className="home-banner-btn home-banner-prev"
              onClick={handlePrevSlide}
              aria-label="Previous banner slide"
            >
              &#10094;
            </button>
            <button
              type="button"
              className="home-banner-btn home-banner-next"
              onClick={handleNextSlide}
              aria-label="Next banner slide"
            >
              &#10095;
            </button>

            {/* Controls: Indicators & Play/Pause */}
            <div className="home-banner-controls">
              <div className="home-banner-dots" role="tablist" aria-label="Slide Selection">
                {slides.map((slide, idx) => (
                  <button
                    key={slide._id || slide.id || idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentSlide}
                    aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    className={`home-banner-dot ${idx === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>

              <div className="home-banner-status">
                <span className="home-banner-counter">
                  {currentSlide + 1} / {slides.length}
                </span>
                <button
                  type="button"
                  className="home-banner-playpause"
                  onClick={() => setIsPaused((prev) => !prev)}
                  aria-label={isPaused ? "Resume banner slideshow" : "Pause banner slideshow"}
                  title={isPaused ? "Resume slideshow" : "Pause slideshow"}
                >
                  {isPaused ? "▶ Play" : "⏸ Pause"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Church Introduction & Service Times ── */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="home-hero-badge">
          <div className="home-hero-halo" aria-hidden="true" />
          <img
            src={logoImg}
            alt="Christ's Tabernacle Official Emblem"
            className="home-hero-logo"
          />
        </div>

        <div className="home-hero-tag">
          <span>✝</span>
          <span>Prayer &amp; Worship Centre • Est. 1991</span>
          <span>✝</span>
        </div>

        <h1 id="hero-title" className="home-hero-h1">
          Christ's <span>Tabernacle</span>
        </h1>
        <p className="home-hero-sub">Prayer &amp; Worship Centre</p>

        <p className="home-hero-desc">
          <strong>A House of Prayer.</strong> A Place of Deliverance. <strong>A Centre of Divine Healing.</strong><br />
          Dedicated to preaching the Word of God, exalting Jesus Christ, breaking spiritual bonds, and empowering generations.
        </p>

        <div className="home-hero-actions">
          <Link to="/about/journey" className="ct-btn-gold">
            Our Journey &amp; Calling →
          </Link>
          <Link to="/contact" className="ct-btn-emerald">
            Plan a Visit 🙏
          </Link>
          <Link to="/prayers/sunday-services" className="ct-btn-outline">
            Service Timings 🕒
          </Link>
        </div>

        {/* Service Schedule Strip */}
        <div className="home-service-strip" role="region" aria-label="Church Services">
          {SERVICE_TIMES.map((st) => (
            <div key={st.label} className="home-service-item">
              <div className="home-service-icon" aria-hidden="true">{st.icon}</div>
              <span className="home-service-label">{st.label}</span>
              <span className="home-service-time">{st.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. The Three Pillars ── */}
      <section className="home-pillars" aria-labelledby="pillars-heading">
        <div className="ct-container">
          <div style={{ textAlign: "center" }}>
            <span className="ct-badge ct-badge-dark">† Divine Calling &amp; Pillars †</span>
            <h2 id="pillars-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--ivory)", marginTop: 12 }}>
              A Community Anchored in <span className="ct-gold-text">Faith &amp; Deliverance</span>
            </h2>
            <p style={{ color: "rgba(250, 246, 238, 0.75)", fontStyle: "italic", fontFamily: "var(--font-serif)", marginTop: 8 }}>
              "The Lord who brought me to this ministry will lead me henceforth."
            </p>
          </div>

          <div className="home-pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.title} className="home-pillar-card">
                <span className="home-pillar-icon" aria-hidden="true">{p.icon}</span>
                <h3>{p.title}</h3>
                <span className="home-pillar-verse">{p.verse}</span>
                <p>{p.desc}</p>
                <Link to={p.link} className="home-pillar-link">
                  Learn More <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Welcome & Story Section with Sanctuary Photography ── */}
      <section className="home-welcome" aria-labelledby="welcome-heading">
        <div className="ct-container">
          <div className="home-welcome-grid">
            <div>
              <span className="ct-badge">† Welcome to the Sanctuary †</span>
              <h2 id="welcome-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--green-dark)", margin: "14px 0 18px", lineHeight: 1.25 }}>
                A Sanctuary Built by Faith, <br />
                <span className="ct-gold-text">Sustained by Prayer</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.02rem", lineHeight: 1.8, marginBottom: 18 }}>
                In 1991, Eva. Glory Devapiriyam answered God's divine calling to minister the Gospel with 15 faithful believers in a humble house. Over decades of miraculous healing, fervent prayer, and unshakeable dedication, the ministry flourished into Christ's Tabernacle Church under Pastor Saravanan Immanuel.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.96rem", lineHeight: 1.75, marginBottom: 28 }}>
                Today, Christ's Tabernacle stands as an oasis of spiritual renewal in Chennai and beyond — where the broken find healing, captives receive deliverance, and worshippers glorify the King of Kings.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link to="/about/journey" className="ct-btn-gold">
                  Read Full History
                </Link>
                <Link to="/about/faith" className="ct-btn-outline">
                  Statement of Faith
                </Link>
              </div>
            </div>

            <div className="home-welcome-img-wrap">
              {/* Sanctuary Views Switcher */}
              <div className="home-sanctuary-views-bar" role="tablist" aria-label="Sanctuary Views">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSanctuaryView === "modern"}
                  className={`home-sanctuary-tab ${activeSanctuaryView === "modern" ? "active" : ""}`}
                  onClick={() => setActiveSanctuaryView("modern")}
                >
                  ✨ Modern Sanctuary &amp; Altar
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSanctuaryView === "cathedral"}
                  className={`home-sanctuary-tab ${activeSanctuaryView === "cathedral" ? "active" : ""}`}
                  onClick={() => setActiveSanctuaryView("cathedral")}
                >
                  ⛪ Fellowship Hall
                </button>
              </div>

              <div className="home-sanctuary-img-container">
                <img
                  src={activeSanctuaryView === "modern" ? modernSanctuaryImg : sanctuaryImg}
                  alt={
                    activeSanctuaryView === "modern"
                      ? "Christ's Tabernacle Modern Sanctuary with Illuminated Cross and Altar"
                      : "Christ's Tabernacle Sacred Cathedral Sanctuary Interior"
                  }
                  className="home-welcome-img"
                />
              </div>

              <div className="home-welcome-badge">
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", fontWeight: 700, color: "var(--gold-bright)" }}>
                  {activeSanctuaryView === "modern" ? "Sacred Altar of Worship" : "35+ Years of Faithful Ministry"}
                </div>
                <div style={{ fontSize: "0.75rem", color: "rgba(250, 246, 238, 0.75)", marginTop: 2 }}>
                  {activeSanctuaryView === "modern"
                    ? "Christ's Tabernacle Prayer & Worship Sanctuary"
                    : "Serving Christ & Healing Generations Since 1991"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Core Mission Strip ── */}
      <section className="home-mission" aria-labelledby="mission-heading">
        <div className="ct-container" style={{ maxWidth: 900 }}>
          <span className="ct-badge">† Our Great Commission †</span>
          <h2 id="mission-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)", color: "var(--green-dark)", margin: "14px 0 16px" }}>
            Bringing Freedom, Healing &amp; Hope in Jesus Christ
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.02rem", lineHeight: 1.8, maxWidth: 740, margin: "0 auto" }}>
            To proclaim the Full Gospel of Jesus Christ — bringing people from darkness into His marvelous light, delivering them from spiritual bondage, ministering healing to the brokenhearted, and equipping believers for God's Kingdom.
          </p>

          <div className="home-mission-tags">
            <span className="home-mission-tag">📢 Preach</span>
            <span className="home-mission-tag">🔓 Deliver</span>
            <span className="home-mission-tag">💊 Heal</span>
            <span className="home-mission-tag">📖 Equip</span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link to="/about/mission" className="ct-btn-emerald">
              Our Mission &amp; Vision
            </Link>
            <Link to="/about/motto" className="ct-btn-outline">
              Faith · Family · Future
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Quick Explore Grid ── */}
      <section className="home-explore" aria-labelledby="explore-heading">
        <div className="ct-container">
          <div style={{ textAlign: "center" }}>
            <span className="ct-badge">† Discover Ministries †</span>
            <h2 id="explore-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--green-dark)", marginTop: 12 }}>
              Explore Christ's Tabernacle
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", maxWidth: 600, margin: "8px auto 0" }}>
              Access our sermon archives, worship lyrics, photo galleries, prayer schedules, and testimonies.
            </p>
          </div>

          <div className="home-explore-grid">
            {QUICK_EXPLORE.map((item) => (
              <Link key={item.title} to={item.path} className="home-explore-card">
                <div className="home-explore-head">
                  <span className="home-explore-icon" aria-hidden="true">{item.icon}</span>
                  <span className="home-explore-tag">{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="home-explore-arrow">
                  Explore Now <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Weekly Promise Banner ── */}
      <section className="home-promise" aria-label="Weekly Scripture Promise">
        <div className="home-promise-inner">
          <span className="ct-badge ct-badge-dark" style={{ marginBottom: 16 }}>† Scripture Promise of the Week †</span>
          <blockquote style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", color: "var(--ivory)", fontStyle: "italic", margin: "16px 0 12px", lineHeight: 1.5 }}>
            "Call to me and I will answer you, and will tell you great and hidden things that you have not known."
          </blockquote>
          <cite style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--gold-bright)", fontStyle: "normal", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            — Jeremiah 33:3
          </cite>
        </div>
      </section>
    </>
  );
}
