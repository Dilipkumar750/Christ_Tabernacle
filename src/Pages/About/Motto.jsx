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
          if (e.isIntersecting) { e.target.classList.add("mo-in"); io.unobserve(e.target); }
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
    <>
      <style>{`
        .mo-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1),
                      transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .mo-reveal.mo-in { opacity: 1; transform: none; }

        /* ── Hero Banner (Sanctuary Dark Green) ── */
        .mo-banner {
          background: linear-gradient(150deg, #113425 0%, #0C2219 50%, #071710 100%);
          border-radius: 24px;
          padding: 60px 44px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 52px;
          color: var(--ivory);
          border: 1.5px solid rgba(214,182,107,0.38);
          box-shadow: 0 20px 52px rgba(0,0,0,0.4);
        }
        .mo-banner::before {
          content: '✝';
          position: absolute;
          top: -30px; left: 50%;
          transform: translateX(-50%);
          font-size: 200px;
          color: rgba(214,182,107,0.05);
          font-family: var(--font-serif);
          pointer-events: none;
        }
        .mo-banner-inner { position: relative; z-index: 1; }
        .mo-banner-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: center;
          margin-bottom: 22px;
        }
        .mo-banner-eyebrow::before,
        .mo-banner-eyebrow::after {
          content: '';
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
        }

        .mo-fff {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .mo-fff-word {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5.5vw, 3.8rem);
          font-weight: 900;
          color: var(--ivory);
          line-height: 1;
          padding: 0 12px;
          position: relative;
          transition: color 0.3s;
          cursor: default;
        }
        .mo-fff-word:hover { color: var(--gold-bright); }
        .mo-fff-sep {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 3vw, 2.4rem);
          color: var(--gold);
          opacity: 0.7;
          font-weight: 400;
          line-height: 1;
          padding: 0 4px;
        }
        .mo-banner-verse {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          color: rgba(250,246,238,0.85);
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.75;
        }

        /* ── Pillars Grid ── */
        .mo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        .mo-card {
          background: linear-gradient(145deg, #123425 0%, #0B2218 100%);
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 22px;
          padding: 36px 28px;
          box-shadow: 0 10px 32px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1),
                      box-shadow 0.35s,
                      border-color 0.35s;
        }
        .mo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--grad-gold);
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        .mo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.45), 0 0 20px rgba(214,182,107,0.15);
          border-color: var(--gold);
        }
        .mo-card:hover::before { opacity: 1; }

        .mo-card-letter {
          font-family: var(--font-serif);
          font-size: 4rem;
          font-weight: 900;
          color: rgba(214,182,107,0.08);
          position: absolute;
          top: 16px; right: 20px;
          line-height: 1;
          pointer-events: none;
          transition: color 0.3s;
        }
        .mo-card:hover .mo-card-letter {
          color: rgba(214,182,107,0.18);
        }

        .mo-card-icon {
          width: 54px;
          height: 54px;
          background: linear-gradient(135deg, #184332 0%, #0C2219 100%);
          border: 2px solid var(--gold);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 20px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
          flex-shrink: 0;
        }
        .mo-card h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--gold-bright);
          margin: 0 0 4px;
          font-weight: 700;
        }
        .mo-card-sub {
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
          margin-bottom: 8px;
          display: block;
        }
        .mo-card-verse {
          font-size: 0.8rem;
          color: #72C3A2;
          font-weight: 600;
          margin-bottom: 16px;
          display: block;
          font-style: italic;
        }
        .mo-card p {
          font-size: 0.96rem;
          color: rgba(250,246,238,0.88);
          line-height: 1.8;
          margin: 0;
          flex: 1;
        }

        /* ── Footer verse ── */
        .mo-footer {
          background: linear-gradient(145deg, #123425 0%, #0A1E15 100%);
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 18px;
          padding: 34px 38px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .mo-footer blockquote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.15rem;
          color: var(--gold-bright);
          line-height: 1.75;
          margin: 0 0 10px;
        }
        .mo-footer cite {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(250,246,238,0.7);
          font-style: normal;
        }

        @media (max-width: 820px) {
          .mo-grid { grid-template-columns: 1fr; }
          .mo-banner { padding: 44px 22px; border-radius: 18px; }
          .mo-footer { padding: 24px 20px; }
        }
      `}</style>

      {/* Hero Banner */}
      <div className="mo-banner mo-reveal">
        <div className="mo-banner-inner">
          <div className="mo-banner-eyebrow">The Core Motto of Christ's Tabernacle</div>
          <div className="mo-fff">
            <span className="mo-fff-word">Faith</span>
            <span className="mo-fff-sep">·</span>
            <span className="mo-fff-word">Family</span>
            <span className="mo-fff-sep">·</span>
            <span className="mo-fff-word">Future</span>
          </div>
          <p className="mo-banner-verse">
            "Now faith is confidence in what we hope for and assurance about what we do not see."
            — Hebrews 11:1
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="mo-grid">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className="mo-card mo-reveal"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <span className="mo-card-letter" aria-hidden="true">{p.letter}</span>
            <div className="mo-card-icon" aria-hidden="true">{p.icon}</div>
            <h3>{p.title}</h3>
            <span className="mo-card-sub">{p.subtitle}</span>
            <span className="mo-card-verse">{p.verse}</span>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer Verse */}
      <div className="mo-footer mo-reveal">
        <blockquote>
          "As for me and my house, we will serve the LORD."
        </blockquote>
        <cite>— Joshua 24:15</cite>
      </div>
    </>
  );
}
