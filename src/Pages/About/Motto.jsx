import { useEffect } from "react";

const PILLARS = [
  {
    letter: "F",
    title: "Faith",
    verse: "Hebrews 11:1",
    subtitle: "Trusting God Completely",
    desc: "We stand unwavering upon God's promises, walking not by sight but by faith in the Living Word of God. Faith is the victory that overcomes the world.",
    icon: "🕊️",
  },
  {
    letter: "F",
    title: "Family",
    verse: "Joshua 24:15",
    subtitle: "Strengthening the Household",
    desc: "God's design begins in the family. We minister to husbands, wives, children, and youth to build Christ-centred homes rooted in godly love, honor, and purity.",
    icon: "🏠",
  },
  {
    letter: "F",
    title: "Future",
    verse: "Jeremiah 29:11",
    subtitle: "Impacting Generations",
    desc: "Equipping the rising generation to fulfill their God-ordained destiny with divine confidence, spiritual gifts, and uncompromising Christian character.",
    icon: "🌿",
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
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sel]);
}

export default function Motto() {
  useReveal(".mo-reveal");

  return (
    <div className="font-sans">
      {/* Hero Banner */}
      <div className="mo-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out bg-gradient-to-br from-white via-ivory to-[#F5EFE6] rounded-[24px] p-8 sm:p-12 md:p-15 text-center relative overflow-hidden mb-13 text-green-deep border-[1.5px] border-gold/40 shadow-[0_10px_32px_rgba(18,45,36,0.06)]">
        {/* Background cross ornament */}
        <span
          className="absolute -top-7.5 left-1/2 -translate-x-1/2 text-[200px] text-gold/[0.06] font-serif pointer-events-none select-none leading-none"
          aria-hidden="true"
        >
          ✝
        </span>

        <div className="relative z-10">
          <div className="text-[0.72rem] tracking-[0.28em] uppercase text-gold-dark font-bold flex items-center justify-center gap-3.5 mb-5.5 before:content-[''] before:w-15 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent after:content-[''] after:w-15 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-gold after:to-transparent">
            The Core Motto of Christ's Tabernacle
          </div>

          <div className="flex items-center justify-center gap-0 mb-7 flex-wrap">
            <span className="font-serif text-[clamp(2rem,5.5vw,3.8rem)] font-black text-green-deep leading-none px-3 relative transition-colors duration-200 cursor-default hover:text-gold-dark">
              Faith
            </span>
            <span className="font-serif text-[clamp(1.4rem,3vw,2.4rem)] text-gold/70 font-normal leading-none px-1">
              ·
            </span>
            <span className="font-serif text-[clamp(2rem,5.5vw,3.8rem)] font-black text-green-deep leading-none px-3 relative transition-colors duration-200 cursor-default hover:text-gold-dark">
              Family
            </span>
            <span className="font-serif text-[clamp(1.4rem,3vw,2.4rem)] text-gold/70 font-normal leading-none px-1">
              ·
            </span>
            <span className="font-serif text-[clamp(2rem,5.5vw,3.8rem)] font-black text-green-deep leading-none px-3 relative transition-colors duration-200 cursor-default hover:text-gold-dark">
              Future
            </span>
          </div>

          <p className="font-serif italic text-base md:text-[1.05rem] text-gray-700 max-w-[580px] mx-auto leading-relaxed">
            "Now faith is confidence in what we hope for and assurance about what we do not see." —
            Hebrews 11:1
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className="mo-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out bg-white border-[1.5px] border-gold/35 hover:border-gold rounded-[22px] p-7 sm:p-9 shadow-[0_6px_24px_rgba(18,45,36,0.06)] hover:shadow-[0_16px_40px_rgba(18,45,36,0.12)] flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 group before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-grad-gold before:opacity-80 hover:before:opacity-100"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <span
              className="font-serif text-[4rem] font-black text-gold/12 group-hover:text-gold/25 absolute top-4 right-5 leading-none pointer-events-none select-none transition-colors duration-300"
              aria-hidden="true"
            >
              {p.letter}
            </span>
            <div
              className="w-[54px] h-[54px] bg-ivory border-2 border-gold rounded-[14px] flex items-center justify-center text-2xl mb-5 shadow-[0_4px_14px_rgba(18,45,36,0.06)] flex-shrink-0"
              aria-hidden="true"
            >
              {p.icon}
            </div>
            <h3 className="font-serif text-[1.6rem] text-green-deep m-0 mb-1 font-bold">
              {p.title}
            </h3>
            <span className="text-[0.74rem] tracking-[0.14em] uppercase text-gold-dark font-bold mb-2 block">
              {p.subtitle}
            </span>
            <span className="text-[0.8rem] text-green font-semibold mb-4 block italic">
              {p.verse}
            </span>
            <p className="text-[0.96rem] text-gray-700 leading-relaxed m-0 flex-1">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer Verse */}
      <div className="mo-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out bg-white border-[1.5px] border-gold/35 rounded-[18px] p-6 sm:p-8.5 text-center shadow-[0_6px_20px_rgba(18,45,36,0.05)]">
        <blockquote className="font-serif italic text-base md:text-[1.15rem] text-green-deep leading-relaxed m-0 mb-2.5">
          "As for me and my house, we will serve the LORD."
        </blockquote>
        <cite className="text-[0.78rem] font-bold tracking-[0.12em] uppercase text-gold-dark not-italic">
          — Joshua 24:15
        </cite>
      </div>
    </div>
  );
}
