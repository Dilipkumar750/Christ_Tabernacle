import { useEffect } from "react";
import jesusSaravananImg from "../../assets/jesus_saravanan.jpeg";
import saravananImg from "../../assets/saravanan.jpeg";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import outdoorFellowshipImg from "../../assets/image1.jpeg";

const MILESTONES = [
  {
    year: "1991",
    icon: "🌱",
    badge: "The Beginning",
    title: "A Divine Calling Is Born",
    desc: "Eva. Glory Devapiriyam stepped out in radical faith and initiated a Gospel ministry with 15 faithful believers in a humble home, driven by a burning burden: to bring Christ's unyielding love to the needy and direct souls toward the Living God.",
    image: null,
  },
  {
    year: "2007",
    icon: "🌿",
    badge: "God's Blueprint",
    title: "Apostolic Gospel Prayer House",
    desc: "The Apostolic Gospel Prayer House was established as the Holy Spirit moved mightily. Pastor Saravanan Immanuel received the heavenly vision and divine mandate from our Lord Jesus Christ, ministering hand in hand to set captives free.",
    image: jesusSaravananImg,
    caption: "Pastor Saravanan Immanuel receiving the Lord Jesus' divine calling and apostolic mandate.",
  },
  {
    year: "Dec 2008",
    icon: "🕊️",
    badge: "Ordained",
    title: "Ordination & Ministerial Anointing",
    desc: "Pastor Immanuel Saravanan was officially ordained by Chief Pastor M. K. Sam Sundaram, ACA, and blessed by Pastor M. M. Jebaraj, ACA (Selavoyal Ministries) — marking an enduring milestone of spiritual authority and apostolic mandate.",
    image: saravananImg,
    caption: "Pastor Saravanan Immanuel ministering with the apostolic burden and power of the Holy Spirit.",
  },
  {
    year: "2016",
    icon: "✨",
    badge: "New Vision",
    title: "Christ's Tabernacle Church",
    desc: "The Lord revealed a new vision to establish and build a permanent sanctuary for all nations. Apostolic Gospel Prayer House transitioned into Christ's Tabernacle Church, consecrated and dedicated by Rev. I. Christdhas of Hope AG Church, Pallikaranai.",
    image: saravanan3Img,
    caption: "Senior Pastor Saravanan Immanuel at the sacred sanctuary pulpit of Christ's Tabernacle.",
  },
  {
    year: "Today",
    icon: "🔥",
    badge: "Present Day",
    title: "Continuing the Kingdom Mandate",
    desc: "Today, Christ's Tabernacle ministers each week to families across Chennai, empowering the next generation through Sunday School, fasting intercessions, dynamic worship, and supernatural demonstrations of God's grace.",
    image: outdoorFellowshipImg,
    caption: "Joyous gathering of the Christ's Tabernacle congregation praising the Lord in unity.",
  },
];

const OUTCOMES = [
  { label: "Delivered", icon: "🔓" },
  { label: "Healed",    icon: "💊" },
  { label: "Restored",  icon: "🕊️" },
  { label: "Equipped",  icon: "📖" },
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

export default function Journey() {
  useReveal(".jr-reveal");

  return (
    <div className="font-sans">
      {/* ── Page Header ── */}
      <div className="jr-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out mb-14">
        <div className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.26em] uppercase text-gold-dark font-bold py-1.5 px-4.5 border-[1.5px] border-gold/35 rounded-full bg-gold/12 mb-5">
          ✝ Our Sacred Heritage
        </div>
        <h2 className="font-serif text-[clamp(2rem,4.5vw,2.9rem)] text-green-deep m-0 mb-4 font-black leading-[1.15]">
          A Story Written by<br />
          <em className="italic text-gold-dark font-serif">God's Faithfulness</em>
        </h2>
        <p className="text-[1.02rem] text-gray-700 leading-relaxed max-w-[720px] m-0">
          The ministry of Christ's Tabernacle was not built on worldly strength or human wisdom,
          but born out of prayer, sustained through intercession, and established upon the
          uncompromised Word of God. From 15 saints in 1991 to a vibrant church family today —
          every step marked by divine deliverance, supernatural healing, and transformed hearts.
        </p>
      </div>

      {/* ── Timeline: Left Image, Center Dot, Right Card ── */}
      <div className="relative flex flex-col gap-12">
        {/* Vertical timeline bar */}
        <div
          className="absolute left-6 md:left-1/2 -translate-x-0 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-gold to-transparent shadow-[0_0_8px_rgba(214,182,107,0.25)] pointer-events-none z-0"
          aria-hidden="true"
        />

        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            className="jr-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out grid grid-cols-[48px_1fr] md:grid-cols-[1fr_64px_1fr] gap-y-4 md:gap-y-0 items-center relative z-10 group"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* LEFT — Standalone Image Box or Scripture */}
            <div
              className={`col-start-2 row-start-2 md:col-start-1 md:row-start-1 pr-0 md:pr-8 flex flex-col items-start md:items-end ${
                !m.image ? "justify-center" : ""
              }`}
            >
              {m.image ? (
                <div className="w-full max-w-[440px] rounded-[18px] overflow-hidden border-[1.5px] border-gold/40 group-hover:border-gold shadow-[0_8px_26px_rgba(18,45,36,0.08)] group-hover:shadow-[0_14px_36px_rgba(18,45,36,0.14)] bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.015]">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="w-full h-[250px] object-cover block transition-transform duration-500 group-hover:scale-105"
                  />
                  {m.caption && (
                    <div className="p-3 px-4.5 bg-ivory text-[0.82rem] font-semibold text-green-deep flex items-center gap-2.5 leading-snug border-t border-gold/25">
                      <span className="text-gold-dark flex-shrink-0">✝</span>
                      {m.caption}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-[440px] p-7 px-7.5 bg-white border-[1.5px] border-gold/35 rounded-[18px] text-left md:text-right shadow-[0_6px_22px_rgba(18,45,36,0.06)]">
                  <blockquote className="font-serif italic text-base md:text-[1.05rem] text-green-deep leading-relaxed m-0 mb-2.5">
                    "Not by might, nor by power, but by my Spirit, says the LORD of hosts."
                  </blockquote>
                  <cite className="text-[0.76rem] font-bold tracking-[0.14em] uppercase text-gold-dark not-italic">
                    — Zechariah 4:6
                  </cite>
                </div>
              )}
            </div>

            {/* CENTER — Timeline Dot */}
            <div className="col-start-1 row-start-1 md:col-start-2 md:row-start-1 flex flex-col items-center justify-center z-10">
              <div
                className="w-12 h-12 md:w-[50px] md:h-[50px] bg-white border-[2.5px] border-gold group-hover:border-gold-dark rounded-full flex items-center justify-center text-lg md:text-xl shadow-[0_0_0_6px_rgba(214,182,107,0.18),0_4px_14px_rgba(18,45,36,0.1)] group-hover:shadow-[0_0_0_9px_rgba(214,182,107,0.28),0_8px_22px_rgba(18,45,36,0.18)] transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                aria-hidden="true"
              >
                {m.icon}
              </div>
            </div>

            {/* RIGHT — Content Card */}
            <div className="col-start-2 row-start-1 md:col-start-3 md:row-start-1 pl-0 md:pl-8">
              <div className="bg-white border-[1.5px] border-gold/35 group-hover:border-gold rounded-[20px] p-6 sm:p-8 shadow-[0_6px_24px_rgba(18,45,36,0.06)] group-hover:shadow-[0_14px_36px_rgba(18,45,36,0.12)] transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[5px] before:bg-grad-gold before:rounded-l">
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <span className="text-[0.74rem] font-extrabold tracking-[0.18em] uppercase text-gold-dark bg-gold/15 border border-gold/40 py-1 px-3.5 rounded-full">
                    {m.year}
                  </span>
                  <span className="text-[0.65rem] font-extrabold tracking-[0.12em] uppercase bg-green-light text-white py-1 px-3 rounded-full border border-white/20">
                    {m.badge}
                  </span>
                </div>
                <h3 className="font-serif text-[1.4rem] text-green-deep m-0 mb-3 font-bold leading-snug">
                  {m.title}
                </h3>
                <p className="text-[0.96rem] text-gray-700 leading-relaxed m-0">{m.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Calling Quote ── */}
      <div className="jr-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out mt-15 grid grid-cols-[5px_1fr] rounded-[18px] overflow-hidden bg-white border-[1.5px] border-gold/35 shadow-[0_8px_28px_rgba(18,45,36,0.06)]">
        <div className="bg-grad-gold" aria-hidden="true" />
        <div className="p-7 sm:p-8">
          <h3 className="font-serif text-[1.2rem] text-green-deep m-0 mb-2 font-bold">
            The Founding Word
          </h3>
          <p className="text-[0.98rem] text-gray-700 leading-relaxed m-0 italic">
            "Not by might, nor by power, but by my Spirit, says the LORD of hosts." — Zechariah 4:6.
            This promise continues to guide our leaders and church family in every season of ministry.
          </p>
        </div>
      </div>

      {/* ── Outcomes Banner ── */}
      <div className="jr-reveal opacity-0 translate-y-7 transition-all duration-700 ease-out mt-14 bg-gradient-to-br from-white to-ivory rounded-[24px] p-8 sm:p-12 md:p-14 text-center border-[1.5px] border-gold/40 shadow-[0_10px_32px_rgba(18,45,36,0.06)] relative overflow-hidden">
        {/* Background cross ornament */}
        <span
          className="absolute -top-7.5 left-1/2 -translate-x-1/2 text-[200px] text-gold/[0.06] font-serif pointer-events-none select-none leading-none"
          aria-hidden="true"
        >
          ✝
        </span>

        <div className="relative z-10">
          <h3 className="font-serif text-[clamp(1.6rem,3.5vw,2.3rem)] text-green-deep m-0 mb-3 font-bold">
            What the Lord Has Done
          </h3>
          <p className="text-base text-gray-700 leading-relaxed mx-auto mb-9 max-w-[600px]">
            Over the past three decades, countless individuals burdened by illness, fear, and
            hopelessness have experienced the mighty touch of Jesus Christ in our prayer sanctuary.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5 mb-9">
            {OUTCOMES.map((o) => (
              <div
                key={o.label}
                className="bg-white border-[1.5px] border-gold/30 hover:border-gold hover:bg-ivory rounded-[18px] py-6 px-3.5 shadow-[0_4px_14px_rgba(18,45,36,0.04)] transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-[2rem] block mb-3">{o.icon}</span>
                <span className="text-[0.82rem] font-bold tracking-[0.12em] uppercase text-green-deep leading-snug">
                  {o.label}
                  <br />
                  in Christ
                </span>
              </div>
            ))}
          </div>
          <p className="font-serif italic text-base md:text-[1.05rem] text-gold-dark m-0">
            "To God be all the glory, great things He hath done!"
          </p>
        </div>
      </div>
    </div>
  );
}
