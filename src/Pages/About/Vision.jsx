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
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("v-in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sel]);
}

export default function Vision() {
  useReveal(".v-reveal");

  return (
    <>
      <style>{`
        .v-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .v-reveal.v-in { opacity: 1; transform: none; }

        /* ── Hero Statement (Sanctuary Green) ── */
        .vis-hero {
          background: linear-gradient(150deg, #113425 0%, #0C2219 50%, #071710 100%);
          border-radius: 24px;
          padding: 56px 44px;
          margin-bottom: 48px;
          position: relative;
          overflow: hidden;
          border: 1.5px solid rgba(214,182,107,0.38);
          box-shadow: 0 20px 52px rgba(0,0,0,0.4);
        }
        .vis-hero::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(214,182,107,0.14) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }
        .vis-hero::after {
          content: '✝';
          position: absolute;
          bottom: -24px; left: 32px;
          font-size: 140px;
          color: rgba(214,182,107,0.05);
          font-family: var(--font-serif);
          pointer-events: none;
        }
        .vis-hero-inner { position: relative; z-index: 1; }
        .vis-label {
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .vis-label::before, .vis-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(214,182,107,0.4), transparent);
        }
        .vis-hero blockquote {
          font-family: var(--font-serif);
          font-size: clamp(1.15rem, 2.8vw, 1.6rem);
          color: var(--ivory);
          line-height: 1.7;
          margin: 0 0 24px;
          font-style: italic;
          font-weight: 400;
        }
        .vis-hero blockquote strong {
          color: var(--gold-bright);
          font-style: normal;
          font-weight: 700;
        }
        .vis-scripture-ref {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-bright);
          background: rgba(214,182,107,0.14);
          border: 1px solid rgba(214,182,107,0.35);
          padding: 8px 18px;
          border-radius: 50px;
        }

        /* ── Section heading ── */
        .vis-section-head {
          margin-bottom: 28px;
        }
        .vis-section-head h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--ivory);
          margin: 0 0 6px;
          font-weight: 700;
        }
        .vis-section-head p {
          font-size: 0.96rem;
          color: rgba(250,246,238,0.8);
          margin: 0;
        }

        /* ── Pillars Grid (Dark Emerald Green Cards) ── */
        .vis-pillars {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }

        .vis-pillar {
          background: linear-gradient(145deg, #123425 0%, #0B2218 100%);
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 10px 32px rgba(0,0,0,0.3);
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s, border-color 0.3s;
          position: relative;
          overflow: hidden;
        }
        .vis-pillar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--grad-gold);
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .vis-pillar:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.45), 0 0 20px rgba(214,182,107,0.15);
          border-color: var(--gold);
        }
        .vis-pillar:hover::before { opacity: 1; }

        .vis-pillar-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #184332 0%, #0C2219 100%);
          border: 2px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 18px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        .vis-pillar h4 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--gold-bright);
          margin: 0 0 4px;
          font-weight: 700;
        }
        .vis-pillar-verse {
          font-size: 0.76rem;
          color: #72C3A2;
          font-style: italic;
          font-weight: 600;
          letter-spacing: 0.08em;
          margin-bottom: 14px;
          display: block;
        }
        .vis-pillar p {
          font-size: 0.95rem;
          color: rgba(250,246,238,0.85);
          line-height: 1.8;
          margin: 0;
        }

        /* ── Scripture Footer ── */
        .vis-footer-verse {
          margin-top: 48px;
          background: linear-gradient(145deg, #123425 0%, #0A1E15 100%);
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 18px;
          padding: 34px 38px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .vis-footer-verse blockquote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.15rem;
          color: var(--gold-bright);
          line-height: 1.75;
          margin: 0 0 10px;
        }
        .vis-footer-verse cite {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(250,246,238,0.7);
          font-style: normal;
        }

        @media (max-width: 680px) {
          .vis-hero { padding: 36px 22px; border-radius: 18px; }
          .vis-pillars { grid-template-columns: 1fr; }
          .vis-footer-verse { padding: 24px 20px; }
        }
      `}</style>

      {/* Hero statement */}
      <div className="vis-hero v-reveal">
        <div className="vis-hero-inner">
          <div className="vis-label">† Our Kingdom Vision †</div>
          <blockquote>
            "To be a <strong>vibrant sanctuary of prayer and deliverance</strong> where every soul
            is transformed by Christ, every home is sanctified by the Holy Spirit, and the
            Gospel of the Kingdom shines as an unquenchable beacon of salvation."
          </blockquote>
          <span className="vis-scripture-ref">✝ Christ's Tabernacle · Est. 1991</span>
        </div>
      </div>

      {/* Pillars */}
      <div className="vis-section-head v-reveal">
        <h3>Four Pillars of Our Vision</h3>
        <p>How we live out God's calling in Chennai and beyond.</p>
      </div>

      <div className="vis-pillars">
        {VISION_PILLARS.map((p, i) => (
          <div
            key={p.word}
            className="vis-pillar v-reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="vis-pillar-icon-wrap">{p.icon}</div>
            <h4>{p.word}</h4>
            <span className="vis-pillar-verse">{p.verse}</span>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer verse */}
      <div className="vis-footer-verse v-reveal">
        <blockquote>
          "Where there is no vision, the people perish; but he that keepeth the law, happy is he."
        </blockquote>
        <cite>— Proverbs 29:18</cite>
      </div>
    </>
  );
}
