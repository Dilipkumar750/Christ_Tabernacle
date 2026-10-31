import { useEffect } from "react";

const VISION_PILLARS = [
  {
    icon: "🔄",
    word: "Transform",
    verse: "Romans 12:2",
    desc: "Transforming broken and seeking souls through the convicting power of the Holy Spirit and personal encounter with Jesus Christ.",
  },
  {
    icon: "🌿",
    word: "Restore",
    verse: "Joel 2:25",
    desc: "Restoring broken families, spiritual destinies, and wounded hearts back into the fullness of God's blessing and peace.",
  },
  {
    icon: "📖",
    word: "Establish",
    verse: "Colossians 2:7",
    desc: "Establishing believers deeply in sound Biblical doctrine, prayer disciplines, and holy Christian living in an ever-shifting world.",
  },
  {
    icon: "🌍",
    word: "Reach",
    verse: "Mark 16:15",
    desc: "Reaching Chennai, India, and the nations through compassionate outreach, evangelism, and church planting.",
  },
];

function useReveal(sel) {
  useEffect(() => {
    const els = document.querySelectorAll(sel);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("opacity-0", "translate-y-7");
            e.target.classList.add("opacity-100", "translate-y-0");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sel]);
}

export default function Vision() {
  useReveal(".v-reveal");

  return (
    <div className="font-sans">
      {/* Hero statement */}
      <div className="v-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out bg-gradient-to-br from-white via-ivory to-[#F5EFE6] rounded-[24px] p-7 sm:p-11 md:p-14 mb-12 relative overflow-hidden border-[1.5px] border-gold/40 shadow-[0_10px_32px_rgba(18,45,36,0.06)]">
        {/* Glow backdrop */}
        <span
          className="absolute -top-15 -right-15 w-[260px] h-[260px] bg-[radial-gradient(circle,rgba(214,182,107,0.14)_0%,transparent_65%)] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        {/* Background cross ornament */}
        <span
          className="absolute -bottom-6 left-8 text-[140px] text-gold/[0.06] font-serif pointer-events-none select-none leading-none"
          aria-hidden="true"
        >
          ✝
        </span>

        <div className="relative z-10">
          <div className="text-[0.72rem] tracking-[0.28em] uppercase text-gold-dark font-bold flex items-center gap-2.5 mb-5 before:content-[''] before:flex-1 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-gold/40 before:to-transparent after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-gold/40 after:to-transparent">
            † Our Kingdom Vision †
          </div>
          <blockquote className="font-serif text-[clamp(1.15rem,2.8vw,1.6rem)] text-green-deep leading-relaxed m-0 mb-6 italic font-normal">
            "To be a{" "}
            <strong className="text-gold-dark not-italic font-bold">
              vibrant sanctuary of prayer and deliverance
            </strong>{" "}
            where every soul is transformed by Christ, every home is sanctified by the Holy Spirit,
            and the Gospel of the Kingdom shines as an unquenchable beacon of salvation."
          </blockquote>
          <span className="inline-flex items-center gap-2 text-[0.78rem] font-bold tracking-[0.14em] uppercase text-green-deep bg-gold/15 border border-gold/35 py-2 px-4.5 rounded-full">
            ✝ Christ's Tabernacle · Est. 1991
          </span>
        </div>
      </div>

      {/* Pillars */}
      <div className="v-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out mb-7">
        <h3 className="font-serif text-[1.6rem] text-green-deep m-0 mb-1.5 font-bold">
          Four Pillars of Our Vision
        </h3>
        <p className="text-[0.96rem] text-gray-700 m-0">
          How we live out God's calling in Chennai and beyond.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
        {VISION_PILLARS.map((p, i) => (
          <div
            key={p.word}
            className="v-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out bg-white border-[1.5px] border-gold/35 hover:border-gold rounded-[20px] p-7 sm:p-8 shadow-[0_6px_24px_rgba(18,45,36,0.06)] hover:shadow-[0_16px_40px_rgba(18,45,36,0.12)] transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-grad-gold before:opacity-80 hover:before:opacity-100"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="w-[52px] h-[52px] rounded-[14px] bg-ivory border-2 border-gold flex items-center justify-center text-2xl mb-4.5 shadow-[0_4px_14px_rgba(18,45,36,0.06)]">
              {p.icon}
            </div>
            <h4 className="font-serif text-[1.4rem] text-green-deep m-0 mb-1 font-bold">{p.word}</h4>
            <span className="text-[0.76rem] text-green italic font-semibold tracking-wider mb-3.5 block">
              {p.verse}
            </span>
            <p className="text-[0.95rem] text-gray-700 leading-relaxed m-0">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer verse */}
      <div className="v-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out mt-12 bg-white border-[1.5px] border-gold/35 rounded-[18px] p-6 sm:p-8.5 md:p-9.5 text-center shadow-[0_6px_20px_rgba(18,45,36,0.05)]">
        <blockquote className="font-serif italic text-base md:text-[1.15rem] text-green-deep leading-relaxed m-0 mb-2.5">
          "Where there is no vision, the people perish; but he that keepeth the law, happy is he."
        </blockquote>
        <cite className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-gold-dark not-italic">
          — Proverbs 29:18
        </cite>
      </div>
    </div>
  );
}
