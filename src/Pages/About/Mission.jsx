import { useEffect } from "react";

const MISSION_PILLARS = [
  {
    icon: "📢",
    word: "Preach",
    verse: "Romans 10:14",
    desc: "Uncompromisingly proclaim the unsearchable riches of Christ and the message of the Cross to every individual, leading men and women from darkness into marvelous light.",
  },
  {
    icon: "🔓",
    word: "Deliver",
    verse: "Luke 4:18",
    desc: "Break the chains of demonic oppression, addictions, generational curses, and fear through the supreme power and authority in the Name of Jesus Christ.",
  },
  {
    icon: "💊",
    word: "Heal",
    verse: "James 5:15",
    desc: "Minister divine healing and holistic restoration to the sick and brokenhearted through fervent prayer, laying on of hands, and Holy Spirit anointing.",
  },
  {
    icon: "📖",
    word: "Equip",
    verse: "Ephesians 4:12",
    desc: "Ground disciples in the Word of God, teaching them how to pray, worship, evangelize, and step boldly into their divine spiritual gifts and callings.",
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

export default function Mission() {
  useReveal(".ms-reveal");

  return (
    <div className="font-sans">
      {/* Mission Statement */}
      <div className="ms-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out bg-white border-[1.5px] border-gold/40 rounded-[22px] p-7 sm:p-10 md:p-11 mb-12 shadow-[0_8px_28px_rgba(18,45,36,0.06)] relative overflow-hidden">
        {/* Quote mark decoration */}
        <span
          className="absolute -top-2.5 left-6 font-serif text-[140px] text-gold/10 leading-none pointer-events-none select-none"
          aria-hidden="true"
        >
          "
        </span>

        <div className="relative z-10">
          <div className="text-[0.72rem] tracking-[0.26em] uppercase text-gold-dark font-bold flex items-center gap-2.5 mb-4.5 after:content-[''] after:flex-1 after:h-[1px] after:max-w-[180px] after:bg-gradient-to-r after:from-gold/40 after:to-transparent">
            ✝ Our Mission Mandate
          </div>
          <p className="font-serif text-[clamp(1.1rem,2.5vw,1.45rem)] text-green-deep leading-relaxed m-0 italic">
            "
            <strong className="text-gold-dark font-bold not-italic">
              The Spirit of the Lord GOD is upon me
            </strong>
            , because the LORD has anointed me to preach good tidings unto the meek; He has sent me
            to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of
            the prison to them that are bound." — Isaiah 61:1
          </p>
        </div>
      </div>

      {/* Section heading */}
      <div className="ms-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out mb-7">
        <h3 className="font-serif text-[1.6rem] text-green-deep m-0 mb-1.5 font-bold">
          Four Pillars of Ministry
        </h3>
        <p className="text-[0.96rem] text-gray-700 m-0">
          How we fulfill our calling in the Name of Jesus Christ.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 mb-12">
        {MISSION_PILLARS.map((m, i) => (
          <div
            key={m.word}
            className="ms-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out bg-white text-text-main rounded-[22px] p-7 sm:p-8 md:p-8 border-[1.5px] border-gold/35 hover:border-gold shadow-[0_6px_24px_rgba(18,45,36,0.06)] hover:shadow-[0_16px_40px_rgba(18,45,36,0.12)] transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden after:content-[''] after:absolute after:-bottom-7.5 after:-right-5 after:w-[120px] after:h-[120px] after:bg-[radial-gradient(circle,rgba(214,182,107,0.12)_0%,transparent_65%)] after:rounded-full after:pointer-events-none"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-[52px] h-[52px] rounded-[14px] bg-ivory border-2 border-gold flex items-center justify-center text-2xl flex-shrink-0 shadow-[0_4px_14px_rgba(18,45,36,0.06)]">
                {m.icon}
              </div>
              <div>
                <span className="font-serif text-[1.55rem] text-green-deep font-bold block leading-none mb-1">
                  {m.word}
                </span>
                <span className="text-[0.74rem] text-green italic font-semibold block tracking-wider">
                  {m.verse}
                </span>
              </div>
            </div>
            <p className="text-[0.95rem] text-gray-700 leading-relaxed m-0 relative z-10">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Commission */}
      <div className="ms-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out grid grid-cols-[5px_1fr] rounded-[18px] overflow-hidden bg-white border-[1.5px] border-gold/35 shadow-[0_6px_20px_rgba(18,45,36,0.05)]">
        <div className="bg-grad-gold" aria-hidden="true" />
        <div className="p-6 sm:p-8 md:p-8.5">
          <blockquote className="font-serif italic text-base md:text-[1.12rem] text-green-deep leading-relaxed m-0 mb-2.5">
            "Go therefore and make disciples of all the nations, baptizing them in the name of the
            Father and of the Son and of the Holy Spirit, teaching them to observe all things that I
            have commanded you; and lo, I am with you always, even to the end of the age."
          </blockquote>
          <cite className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-gold-dark not-italic">
            — Matthew 28:19–20
          </cite>
        </div>
      </div>
    </div>
  );
}
