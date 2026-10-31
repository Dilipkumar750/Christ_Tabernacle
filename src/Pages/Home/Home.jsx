import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getPublicHeroSlides } from "../../services/api";
import logoImg from "../../assets/logo.jpeg";
import modernSanctuaryImg from "../../assets/Modern-Sanctuary.png";
import heroBanner1 from "../../assets/hero-banner.png";
import heroBanner2 from "../../assets/hero-banner2.png";
import heroBanner3 from "../../assets/hero-banner3.png";
import jesusSaravananImg from "../../assets/jesus_saravanan.jpeg";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import outdoorFellowshipImg from "../../assets/image1.jpeg";
import anniversaryPosterImg from "../../assets/popup.jpeg";

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
    title: "Photo Gallery",
    desc: "Browse church photo albums, baptism memories, and cherished congregation moments.",
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

const FALLBACKS = [heroBanner1, heroBanner2, heroBanner3];

export default function Home() {
  const [slides, setSlides] = useState(BANNER_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSanctuaryView, setActiveSanctuaryView] = useState("modern");
  const [slideImgErrors, setSlideImgErrors] = useState({});
  const touchStartXRef = useRef(null);

  // Fetch dynamic hero slides from backend API
  useEffect(() => {
    const fetchDynamicHero = async () => {
      try {
        const dynamicSlides = await getPublicHeroSlides();
        if (dynamicSlides && dynamicSlides.length > 0) {
          setSlides(dynamicSlides);
          setSlideImgErrors({}); // Reset errors when slides are refreshed
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
      {/* ── 1. Grand Hero Banner Carousel ── */}
      <section
        className="relative bg-gradient-to-b from-[#FAF7F2] to-ivory py-3.5 md:py-6 px-3 md:px-5 border-b border-gold/20 outline-none"
        aria-label="Christ's Tabernacle Featured Banners"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="max-w-[1360px] mx-auto">
          <div
            className="relative w-full aspect-[16/9] md:aspect-[21/8.2] min-h-[220px] md:min-h-[280px] max-h-[540px] rounded-xl md:rounded-[20px] overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 md:ring-[1.5px] ring-gold/40"
            role="region"
            aria-roledescription="carousel"
            aria-label="Hero Banner Slideshow"
          >
            {slides.map((slide, idx) => (
              <div
                key={slide._id || slide.id || idx}
                className={`absolute inset-0 transition-all duration-[850ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  idx === currentSlide
                    ? "opacity-100 visible scale-100 pointer-events-auto"
                    : "opacity-0 invisible scale-[1.025] pointer-events-none"
                }`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${slides.length}: ${slide.title}`}
                aria-hidden={idx !== currentSlide}
              >
                <img
                  src={slideImgErrors[idx] ? FALLBACKS[idx % FALLBACKS.length] : (slide.image || FALLBACKS[idx % FALLBACKS.length])}
                  alt={slide.alt || slide.title}
                  className="w-full h-full object-cover object-center block"
                  loading={idx === 0 ? "eager" : "lazy"}
                  onError={() => setSlideImgErrors((prev) => ({ ...prev, [idx]: true }))}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/[0.02] via-black/10 to-[#071911]/85" />
                <div className="hidden md:flex absolute bottom-3.5 md:bottom-5 left-3.5 md:left-6 right-3.5 md:right-6 lg:flex-row flex-col lg:items-center items-start justify-between gap-2.5 lg:gap-5 bg-green-deep/80 backdrop-blur-md px-3.5 md:px-5 py-2.5 md:py-3 rounded-xl md:rounded-[14px] border border-gold/45 shadow-[0_10px_30px_rgba(0,0,0,0.35)] z-[5]">
                  <div className="text-[0.72rem] tracking-[0.15em] uppercase text-gold-bright font-bold whitespace-nowrap bg-gold/15 px-3 py-1 rounded-full border border-gold/35">
                    ✝ {slide.tag} ✝
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <span className="font-serif text-[1.05rem] font-bold text-ivory truncate">{slide.title}</span>
                    <span className="text-[0.82rem] text-ivory/80 truncate">{slide.subtitle}</span>
                  </div>
                  <Link
                    to={slide.actionLink || '/contact'}
                    className="self-start lg:self-auto bg-gradient-to-r from-gold-bright to-gold text-green-dark hover:text-[#06170f] text-[0.8rem] font-bold px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 shadow-[0_4px_12px_rgba(214,182,107,0.3)] hover:shadow-[0_6px_18px_rgba(214,182,107,0.5)] hover:-translate-y-0.5"
                  >
                    {slide.actionText || 'Plan a Visit'} →
                  </Link>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              type="button"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-green-deep/75 backdrop-blur-sm border md:border-[1.5px] border-gold/55 text-gold-bright hover:bg-gold-bright hover:text-green-dark hover:border-white hover:scale-110 text-sm md:text-lg flex items-center justify-center transition-all duration-200 z-10 shadow-lg cursor-pointer"
              onClick={handlePrevSlide}
              aria-label="Previous banner slide"
            >
              &#10094;
            </button>
            <button
              type="button"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-green-deep/75 backdrop-blur-sm border md:border-[1.5px] border-gold/55 text-gold-bright hover:bg-gold-bright hover:text-green-dark hover:border-white hover:scale-110 text-sm md:text-lg flex items-center justify-center transition-all duration-200 z-10 shadow-lg cursor-pointer"
              onClick={handleNextSlide}
              aria-label="Next banner slide"
            >
              &#10095;
            </button>

            {/* Controls: Indicators & Play/Pause */}
            <div className="absolute top-2.5 md:top-4 right-2.5 md:right-5 flex items-center gap-2 md:gap-3 bg-[#071911]/80 backdrop-blur-md px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full border border-gold/35 z-10">
              <div className="flex items-center gap-2" role="tablist" aria-label="Slide Selection">
                {slides.map((slide, idx) => (
                  <button
                    key={slide._id || slide.id || idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentSlide}
                    aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    className={`h-2 transition-all duration-300 cursor-pointer ${
                      idx === currentSlide
                        ? "w-6 bg-gold-bright rounded-full shadow-[0_0_10px_rgba(214,182,107,0.7)]"
                        : "w-2 bg-ivory/40 rounded-full hover:bg-ivory/60"
                    }`}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 border-l border-gold/30 pl-2">
                <span className="text-[0.72rem] text-ivory/85 font-semibold font-sans">
                  {currentSlide + 1} / {slides.length}
                </span>
                <button
                  type="button"
                  className="text-[0.72rem] font-bold text-gold-light hover:text-gold-bright px-1.5 py-0.5 rounded transition-colors cursor-pointer"
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
      <section
        className="relative overflow-hidden text-center font-sans bg-gradient-to-b from-[#FDFAF5] via-ivory to-ivory-warm py-14 md:py-20 px-4 md:px-6 border-b-2 border-gold/20 before:content-['✝'] before:absolute before:-top-20 before:left-1/2 before:-translate-x-1/2 before:text-[240px] md:before:text-[360px] before:text-gold/[0.05] before:pointer-events-none before:font-serif before:leading-none"
        aria-labelledby="hero-title"
      >
        <div className="relative w-[105px] h-[105px] md:w-[130px] md:h-[130px] mx-auto mb-5 md:mb-6 flex items-center justify-center">
          <div
            className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(214,182,107,0.45)_0%,rgba(214,182,107,0)_70%)] animate-pulse pointer-events-none"
            aria-hidden="true"
          />
          <img
            src={logoImg}
            alt="Christ's Tabernacle Official Emblem"
            className="w-full h-full rounded-full object-cover border-4 border-gold shadow-[0_10px_32px_rgba(12,34,25,0.22),0_0_25px_rgba(214,182,107,0.4)] relative z-[1] transition-transform duration-300 hover:scale-105 bg-white"
          />
        </div>

        <div className="inline-flex items-center gap-2 bg-green/10 border border-gold/40 rounded-full px-3.5 md:px-5 py-1.5 md:py-2 text-[0.65rem] md:text-[0.74rem] tracking-[0.2em] uppercase text-green font-bold mb-5 md:mb-6">
          <span>✝</span>
          <span>Prayer &amp; Worship Centre • Est. 1991</span>
          <span>✝</span>
        </div>

        <h1 id="hero-title" className="font-serif text-[clamp(2.2rem,6vw,4.2rem)] text-green-dark font-bold leading-[1.15] mb-2.5 tracking-tight">
          Christ's <span className="bg-grad-gold bg-clip-text text-transparent">Tabernacle</span>
        </h1>
        <p className="font-serif text-[clamp(1rem,2.2vw,1.35rem)] text-gold-dark tracking-[0.12em] uppercase mb-5 md:mb-6 font-semibold">
          Prayer &amp; Worship Centre
        </p>

        <p className="text-[clamp(1rem,2vw,1.18rem)] text-text-muted max-w-[720px] mx-auto mb-8 md:mb-9 leading-relaxed">
          <strong className="text-green font-semibold">A House of Prayer.</strong> A Place of Deliverance.{" "}
          <strong className="text-green font-semibold">A Centre of Divine Healing.</strong><br />
          Dedicated to preaching the Word of God, exalting Jesus Christ, breaking spiritual bonds, and empowering generations.
        </p>

        <div className="flex gap-2.5 md:gap-4 justify-center flex-wrap mb-10 md:mb-12">
          <Link
            to="/about/journey"
            className="inline-flex items-center justify-center gap-2.5 bg-grad-gold text-text-main font-bold text-[0.88rem] tracking-[0.05em] uppercase px-7 py-3 rounded-full shadow-gold hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(214,182,107,0.45)] transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
          >
            Our Journey &amp; Calling →
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-green to-green-medium hover:bg-grad-sanctuary text-ivory font-bold text-[0.88rem] tracking-[0.05em] uppercase px-7 py-3 rounded-full shadow-md hover:shadow-lg hover:border-gold hover:-translate-y-0.5 border border-gold/30 transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
          >
            Plan a Visit 🙏
          </Link>
          <Link
            to="/prayers/sunday-services"
            className="inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-gradient-to-r hover:from-green hover:to-green-medium text-green hover:text-ivory border-2 border-green font-bold text-[0.88rem] tracking-[0.05em] uppercase px-6 py-2.5 rounded-full hover:-translate-y-0.5 transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
          >
            Service Timings 🕒
          </Link>
        </div>

        {/* Service Schedule Strip */}
        <div
          className="flex flex-col md:flex-row justify-center bg-white rounded-xl md:rounded-[18px] border md:border-[1.5px] border-gold/20 shadow-md max-w-full md:max-w-[820px] mx-auto overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gold/20"
          role="region"
          aria-label="Church Services"
        >
          {SERVICE_TIMES.map((st) => (
            <div key={st.label} className="flex-1 md:min-w-[200px] py-4 md:py-5 px-4 md:px-6 text-center hover:bg-gold-soft transition-colors duration-200">
              <div className="text-2xl mb-1.5" aria-hidden="true">{st.icon}</div>
              <span className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase text-gold-dark mb-1">{st.label}</span>
              <span className="text-[0.88rem] text-text-muted font-semibold">{st.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. The Three Pillars ── */}
      <section
        className="py-14 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#FAF7F2] to-white border-y border-gold/30 text-text-main font-sans relative overflow-hidden"
        aria-labelledby="pillars-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[760px] mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/15 border border-gold/40 text-gold-dark">
              † Divine Calling &amp; Pillars †
            </span>
            <h2
              id="pillars-heading"
              className="font-serif text-[clamp(2rem,4vw,2.85rem)] text-green-deep mt-3.5 mb-2.5 font-extrabold leading-tight"
            >
              A Community Anchored in <span className="bg-grad-gold bg-clip-text text-transparent">Faith &amp; Deliverance</span>
            </h2>
            <p className="text-text-muted italic font-serif text-[1.08rem] mt-2.5 leading-relaxed">
              "The Lord who brought me to this ministry will lead me henceforth."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mt-10 md:mt-12">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="group flex flex-col bg-white hover:bg-ivory border-[1.5px] border-gold/35 hover:border-gold rounded-[18px] p-6 md:p-9 shadow-[0_6px_24px_rgba(18,45,36,0.05)] hover:shadow-[0_16px_40px_rgba(18,45,36,0.12)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div
                  className="w-[58px] h-[58px] rounded-2xl bg-ivory group-hover:bg-white border-[1.5px] border-gold/40 group-hover:border-gold inline-flex items-center justify-center text-3xl mb-5 shadow-[0_4px_12px_rgba(18,45,36,0.04)] group-hover:scale-105 group-hover:rotate-2 transition-all duration-300"
                  aria-hidden="true"
                >
                  <span>{p.icon}</span>
                </div>
                <h3 className="font-serif text-[1.35rem] text-green-deep mb-2 font-extrabold">{p.title}</h3>
                <span className="text-[0.78rem] tracking-[0.12em] uppercase text-gold-dark font-extrabold mb-3.5 inline-block">
                  {p.verse}
                </span>
                <p className="text-[0.94rem] text-gray-700 leading-relaxed mb-5 flex-grow">{p.desc}</p>
                <Link
                  to={p.link}
                  className="text-[0.84rem] font-extrabold text-green group-hover:text-gold-dark uppercase tracking-wider inline-flex items-center gap-2 pt-4 border-t border-dashed border-gold/35 mt-auto transition-all duration-200 hover:translate-x-1"
                >
                  Learn More <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Welcome & Story Section with Sanctuary Photography ── */}
      <section
        className="py-14 md:py-24 px-4 md:px-6 bg-gradient-to-b from-ivory to-ivory-warm border-y border-gold/25"
        aria-labelledby="welcome-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/15 border border-gold/40 text-gold-dark">
                † Welcome to the Sanctuary †
              </span>
              <h2
                id="welcome-heading"
                className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-green-deep my-3.5 md:my-4 leading-tight font-bold"
              >
                A Sanctuary Built by Faith, <br />
                <span className="bg-grad-gold bg-clip-text text-transparent">Sustained by Prayer</span>
              </h2>
              <p className="text-gray-700 text-[1.02rem] leading-relaxed mb-4">
                In 1991, Eva. Glory Devapiriyam answered God's divine calling to minister the Gospel with 15 faithful believers in a humble house. Over decades of miraculous healing, fervent prayer, and unshakeable dedication, the ministry flourished into Christ's Tabernacle Church under Pastor Saravanan Immanuel.
              </p>
              <p className="text-gray-600 text-[0.96rem] leading-relaxed mb-7">
                Today, Christ's Tabernacle stands as an oasis of spiritual renewal in Chennai and beyond — where the broken find healing, captives receive deliverance, and worshippers glorify the King of Kings.
              </p>

              <div className="flex gap-3.5 flex-wrap">
                <Link
                  to="/about/journey"
                  className="inline-flex items-center justify-center gap-2.5 bg-grad-gold text-text-main font-bold text-[0.88rem] tracking-[0.05em] uppercase px-7 py-3 rounded-full shadow-gold hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(214,182,107,0.45)] transition-all duration-200 cursor-pointer text-center"
                >
                  Read Full History
                </Link>
                <Link
                  to="/about/faith"
                  className="inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-gradient-to-r hover:from-green hover:to-green-medium text-green hover:text-ivory border-2 border-green font-bold text-[0.88rem] tracking-[0.05em] uppercase px-6 py-2.5 rounded-full hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-center"
                >
                  Statement of Faith
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl md:rounded-[20px] overflow-hidden shadow-[0_12px_36px_rgba(18,45,36,0.1)] border-2 border-gold/40 bg-white group">
              {/* Sanctuary Views Switcher */}
              <div
                className="absolute top-3 md:top-3.5 left-3 md:left-3.5 flex flex-wrap gap-1.5 z-[4] bg-green-deep/75 backdrop-blur-md p-1 md:p-1.5 rounded-full border border-gold/45"
                role="tablist"
                aria-label="Sanctuary Views"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSanctuaryView === "modern"}
                  className={`border-none text-xs font-bold px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                    activeSanctuaryView === "modern"
                      ? "bg-gold-bright text-green-dark shadow-[0_2px_10px_rgba(214,182,107,0.45)]"
                      : "text-ivory/80 hover:text-white"
                  }`}
                  onClick={() => setActiveSanctuaryView("modern")}
                >
                  ✨ Sanctuary &amp; Altar
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSanctuaryView === "vision"}
                  className={`border-none text-xs font-bold px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                    activeSanctuaryView === "vision"
                      ? "bg-gold-bright text-green-dark shadow-[0_2px_10px_rgba(214,182,107,0.45)]"
                      : "text-ivory/80 hover:text-white"
                  }`}
                  onClick={() => setActiveSanctuaryView("vision")}
                >
                  † Divine Calling
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSanctuaryView === "pastor"}
                  className={`border-none text-xs font-bold px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                    activeSanctuaryView === "pastor"
                      ? "bg-gold-bright text-green-dark shadow-[0_2px_10px_rgba(214,182,107,0.45)]"
                      : "text-ivory/80 hover:text-white"
                  }`}
                  onClick={() => setActiveSanctuaryView("pastor")}
                >
                  🕊️ Pastor Saravanan
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSanctuaryView === "fellowship"}
                  className={`border-none text-xs font-bold px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
                    activeSanctuaryView === "fellowship"
                      ? "bg-gold-bright text-green-dark shadow-[0_2px_10px_rgba(214,182,107,0.45)]"
                      : "text-ivory/80 hover:text-white"
                  }`}
                  onClick={() => setActiveSanctuaryView("fellowship")}
                >
                  🙌 Church Fellowship
                </button>
              </div>

              <div className="overflow-hidden h-[270px] md:h-[420px] bg-[#0c2419]">
                <img
                  src={
                    activeSanctuaryView === "vision"
                      ? jesusSaravananImg
                      : activeSanctuaryView === "pastor"
                        ? saravanan3Img
                        : activeSanctuaryView === "fellowship"
                          ? outdoorFellowshipImg
                          : modernSanctuaryImg
                  }
                  alt={
                    activeSanctuaryView === "vision"
                      ? "Pastor Saravanan Immanuel receiving the holy calling from Jesus Christ"
                      : activeSanctuaryView === "pastor"
                        ? "Senior Pastor Saravanan Immanuel ministering at the altar"
                        : activeSanctuaryView === "fellowship"
                          ? "Christ's Tabernacle congregation gathered in praise"
                          : "Christ's Tabernacle Modern Sanctuary Altar"
                  }
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    activeSanctuaryView === "vision" ? "object-contain bg-white" : "object-cover bg-transparent"
                  }`}
                />
              </div>

              <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 bg-white text-green-deep border md:border-[1.5px] border-gold rounded-xl p-2.5 md:p-4 shadow-[0_6px_20px_rgba(18,45,36,0.12)] max-w-[calc(100%-24px)] md:max-w-none">
                <div className="font-serif text-[0.95rem] md:text-[1.05rem] font-bold text-green-deep">
                  {activeSanctuaryView === "vision"
                    ? "Divine Calling & Apostolic Vision"
                    : activeSanctuaryView === "pastor"
                      ? "Pastor Saravanan Immanuel"
                      : activeSanctuaryView === "fellowship"
                        ? "Joyful Praise Fellowship"
                        : "Sacred Altar of Worship"}
                </div>
                <div className="text-[0.7rem] md:text-[0.75rem] text-gray-500 mt-0.5">
                  {activeSanctuaryView === "vision"
                    ? "Ordained & Sent to Preach the Full Gospel of Jesus Christ"
                    : activeSanctuaryView === "pastor"
                      ? "Senior Pastor & Founder • Christ's Tabernacle"
                      : activeSanctuaryView === "fellowship"
                        ? "United in Worship, Fasting & Kingdom Prayer"
                        : "Serving Christ & Healing Generations Since 1991"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Core Mission Strip ── */}
      <section
        className="py-14 md:py-20 px-4 md:px-6 bg-gradient-to-b from-white to-ivory text-center border-y border-gold/25"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-[900px] mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/15 border border-gold/40 text-gold-dark">
            † Our Great Commission †
          </span>
          <h2
            id="mission-heading"
            className="font-serif text-[clamp(1.8rem,3.8vw,2.6rem)] text-green-deep my-3.5 md:my-4 font-bold"
          >
            Bringing Freedom, Healing &amp; Hope in Jesus Christ
          </h2>
          <p className="text-gray-700 text-[1.02rem] leading-relaxed max-w-[740px] mx-auto">
            To proclaim the Full Gospel of Jesus Christ — bringing people from darkness into His marvelous light, delivering them from spiritual bondage, ministering healing to the brokenhearted, and equipping believers for God's Kingdom.
          </p>

          <div className="flex justify-center gap-2 md:gap-3.5 flex-wrap my-6 md:my-9">
            <span className="bg-white hover:bg-ivory text-green-deep text-[0.72rem] md:text-[0.8rem] font-bold tracking-[0.14em] uppercase px-4 md:px-6 py-2 md:py-2.5 rounded-full border md:border-[1.5px] border-gold/40 hover:border-gold shadow-[0_2px_10px_rgba(18,45,36,0.05)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
              📢 Preach
            </span>
            <span className="bg-white hover:bg-ivory text-green-deep text-[0.72rem] md:text-[0.8rem] font-bold tracking-[0.14em] uppercase px-4 md:px-6 py-2 md:py-2.5 rounded-full border md:border-[1.5px] border-gold/40 hover:border-gold shadow-[0_2px_10px_rgba(18,45,36,0.05)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
              🔓 Deliver
            </span>
            <span className="bg-white hover:bg-ivory text-green-deep text-[0.72rem] md:text-[0.8rem] font-bold tracking-[0.14em] uppercase px-4 md:px-6 py-2 md:py-2.5 rounded-full border md:border-[1.5px] border-gold/40 hover:border-gold shadow-[0_2px_10px_rgba(18,45,36,0.05)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
              💊 Heal
            </span>
            <span className="bg-white hover:bg-ivory text-green-deep text-[0.72rem] md:text-[0.8rem] font-bold tracking-[0.14em] uppercase px-4 md:px-6 py-2 md:py-2.5 rounded-full border md:border-[1.5px] border-gold/40 hover:border-gold shadow-[0_2px_10px_rgba(18,45,36,0.05)] hover:-translate-y-0.5 transition-all duration-200 cursor-default">
              📖 Equip
            </span>
          </div>

          <div className="flex justify-center gap-3.5 flex-wrap">
            <Link
              to="/about/mission"
              className="inline-flex items-center justify-center gap-2.5 bg-grad-gold text-text-main font-bold text-[0.88rem] tracking-[0.05em] uppercase px-7 py-3 rounded-full shadow-gold hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(214,182,107,0.45)] transition-all duration-200 cursor-pointer text-center"
            >
              Our Mission &amp; Vision
            </Link>
            <Link
              to="/about/motto"
              className="inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-gradient-to-r hover:from-green hover:to-green-medium text-green hover:text-ivory border-2 border-green font-bold text-[0.88rem] tracking-[0.05em] uppercase px-6 py-2.5 rounded-full hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-center"
            >
              Faith · Family · Future
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Pastoral Leadership & Divine Vision Spotlight ── */}
      <section className="py-14 md:py-16 px-4 md:px-5 bg-gradient-to-b from-[#F8F5EE] via-ivory to-white border-y border-gold/30">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-9">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/15 border border-gold/40 text-gold-dark mb-3.5">
              † Pastoral Leadership &amp; Apostolic Calling †
            </span>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.5rem)] text-green-deep my-3 font-bold">
              Sent by the Lord to Heal &amp; Restore
            </h2>
            <p className="text-gray-600 text-[0.98rem] max-w-[660px] mx-auto">
              "The Spirit of the Lord GOD is upon Me, because the LORD has anointed Me to preach good tidings to the poor..." — Isaiah 61:1
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {/* Card 1: Divine Vision Mandate */}
            <div className="bg-white rounded-[18px] overflow-hidden border-[1.5px] border-gold/40 shadow-[0_6px_22px_rgba(18,45,36,0.06)] flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <div className="h-[260px] overflow-hidden bg-ivory relative">
                <img
                  src={jesusSaravananImg}
                  alt="Pastor Saravanan Immanuel receiving the Lord's mandate"
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-3.5 left-3.5 bg-white text-green-deep border border-gold text-[0.72rem] font-extrabold px-3 py-1 rounded-full shadow-sm">
                  † Divine Vision &amp; Calling
                </span>
              </div>
              <div className="p-6 md:p-6.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[1.3rem] text-green-deep mb-2.5 font-bold">
                    The Apostolic Mandate
                  </h3>
                  <p className="text-gray-600 text-[0.92rem] leading-relaxed m-0">
                    Pastor Saravanan Immanuel answered the divine calling of our Lord Jesus Christ to lead Christ's Tabernacle as a sanctuary of deliverance, supernatural healing, and relentless prayer for all nations.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/about/journey"
                    className="text-gold-dark font-extrabold text-[0.88rem] hover:underline inline-flex items-center gap-1.5"
                  >
                    Read Pastoral Journey <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Senior Pastor Saravanan Immanuel */}
            <div className="bg-white rounded-[18px] overflow-hidden border-[1.5px] border-gold/40 shadow-[0_6px_22px_rgba(18,45,36,0.06)] flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <div className="h-[260px] overflow-hidden relative">
                <img
                  src={saravanan3Img}
                  alt="Pastor Saravanan Immanuel preaching at the pulpit"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3.5 left-3.5 bg-white text-green-deep border border-gold/50 text-[0.72rem] font-extrabold px-3 py-1 rounded-full shadow-sm">
                  ✝ Senior Pastor
                </span>
              </div>
              <div className="p-6 md:p-6.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[1.3rem] text-green-deep mb-2.5 font-bold">
                    Pastor Saravanan Immanuel
                  </h3>
                  <p className="text-gray-600 text-[0.92rem] leading-relaxed m-0">
                    Under his faithful ministry, thousands of believers across Chennai and around the world experience the transformative power of God through Sunday expository preaching, fasting prayer vigils, and pastoral counseling.
                  </p>
                </div>
                <div className="mt-5 flex gap-3">
                  <Link
                    to="/sermons/sunday"
                    className="inline-flex items-center justify-center gap-2 bg-grad-gold text-text-main font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full shadow-sm hover:brightness-105 transition-all"
                  >
                    Listen to Sermons
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-transparent text-green border border-green hover:bg-green hover:text-white font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all"
                  >
                    Request Prayer
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: 10th Anniversary Milestone */}
            <div className="bg-white rounded-[18px] overflow-hidden border-[1.5px] border-gold/40 shadow-[0_6px_22px_rgba(18,45,36,0.06)] flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <div className="h-[260px] overflow-hidden bg-ivory relative">
                <img
                  src={anniversaryPosterImg}
                  alt="Christ's Tabernacle 10th Anniversary Celebration"
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-3.5 left-3.5 bg-crimson text-white text-[0.72rem] font-extrabold px-3 py-1 rounded-full">
                  🎉 Milestone Jubilee
                </span>
              </div>
              <div className="p-6 md:p-6.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-[1.3rem] text-green-deep mb-2.5 font-bold">
                    10th Anniversary Celebration
                  </h3>
                  <p className="text-gray-600 text-[0.92rem] leading-relaxed m-0">
                    Celebrating a decade of supernatural grace, faithful worship, and community transformation in Christ's Tabernacle. Join in thanksgiving for the great things the Lord has done!
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    to="/media/photos"
                    className="text-gold-dark font-extrabold text-[0.88rem] hover:underline inline-flex items-center gap-1.5"
                  >
                    View Celebration Gallery <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Quick Explore Grid ── */}
      <section
        className="py-14 md:py-20 px-4 md:px-6 bg-gradient-to-b from-ivory to-ivory-warm border-t-2 border-gold/20"
        aria-labelledby="explore-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2
              id="explore-heading"
              className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-green-dark mt-0 mb-2 font-bold"
            >
              Explore Christ's Tabernacle
            </h2>
            <p className="text-text-muted text-[0.98rem] max-w-[600px] mx-auto">
              Access our sermon archives, worship lyrics, photo galleries, prayer schedules, and testimonies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-11">
            {QUICK_EXPLORE.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group bg-white hover:border-gold border-[1.5px] border-gold/20 rounded-2xl p-6 md:p-7 shadow-sm-g hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-center mb-3.5">
                  <span className="text-3xl md:text-4xl" aria-hidden="true">{item.icon}</span>
                  <span className="text-[0.68rem] font-bold tracking-wider uppercase bg-gold-soft text-gold-dark px-2.5 py-1 rounded-full border border-gold/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif text-[1.18rem] text-green-dark mb-2.5 font-bold group-hover:text-green-deep transition-colors">
                  {item.title}
                </h3>
                <p className="text-[0.88rem] text-text-muted leading-relaxed mb-4 flex-grow">
                  {item.desc}
                </p>
                <span className="text-[0.82rem] font-bold text-gold-dark uppercase tracking-wider inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Explore Now <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Weekly Promise Banner ── */}
      <section
        className="relative overflow-hidden py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-white via-ivory to-ivory-warm text-green-deep text-center border-y border-gold/30 before:content-['✝'] before:absolute before:-top-5 before:left-1/2 before:-translate-x-1/2 before:text-[160px] before:text-gold/[0.06] before:font-serif before:pointer-events-none before:leading-none"
        aria-label="Weekly Scripture Promise"
      >
        <div className="max-w-[820px] mx-auto relative z-[1]">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold/15 border border-gold/40 text-gold-dark mb-4">
            † Scripture Promise of the Week †
          </span>
          <blockquote className="font-serif text-[clamp(1.2rem,3vw,1.8rem)] text-green-deep italic my-4 leading-relaxed">
            "Call to me and I will answer you, and will tell you great and hidden things that you have not known."
          </blockquote>
          <cite className="font-sans text-[0.9rem] text-gold-dark not-italic font-bold tracking-widest uppercase block">
            — Jeremiah 33:3
          </cite>
        </div>
      </section>
    </>
  );
}
