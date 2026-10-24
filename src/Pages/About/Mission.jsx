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
          if (e.isIntersecting) { e.target.classList.add("ms-in"); io.unobserve(e.target); }
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
    <>
      <style>{`
        .ms-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1),
                      transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .ms-reveal.ms-in { opacity: 1; transform: none; }

        /* ── Mission Statement Card (Green Sanctuary Theme) ── */
        .ms-stmt {
          background: linear-gradient(145deg, #123425 0%, #0B2218 100%);
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 22px;
          padding: 40px 44px;
          margin-bottom: 48px;
          box-shadow: 0 10px 32px rgba(0,0,0,0.3);
          position: relative;
          overflow: hidden;
        }
        .ms-stmt::before {
          content: '"';
          position: absolute;
          top: -10px; left: 24px;
          font-family: var(--font-serif);
          font-size: 140px;
          color: rgba(214,182,107,0.06);
          line-height: 1;
          pointer-events: none;
        }
        .ms-stmt-inner { position: relative; z-index: 1; }
        .ms-stmt-label {
          font-size: 0.72rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .ms-stmt-label::after {
          content: '';
          flex: 1;
          height: 1px;
          max-width: 180px;
          background: linear-gradient(to right, rgba(214,182,107,0.4), transparent);
        }
        .ms-stmt p {
          font-family: var(--font-serif);
          font-size: clamp(1.1rem, 2.5vw, 1.45rem);
          color: var(--ivory);
          line-height: 1.75;
          margin: 0;
          font-style: italic;
        }
        .ms-stmt p strong { color: var(--gold-bright); font-style: normal; }

        /* ── Section heading ── */
        .ms-sec-head {
          margin-bottom: 28px;
        }
        .ms-sec-head h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--ivory);
          margin: 0 0 6px;
          font-weight: 700;
        }
        .ms-sec-head p {
          font-size: 0.96rem;
          color: rgba(250,246,238,0.8);
          margin: 0;
        }

        /* ── Pillars Grid ── */
        .ms-pillars {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
          margin-bottom: 48px;
        }
        .ms-pillar {
          background: linear-gradient(145deg, #123425 0%, #0B2218 100%);
          color: var(--ivory);
          border-radius: 22px;
          padding: 36px 30px;
          border: 1.5px solid rgba(214,182,107,0.35);
          box-shadow: 0 10px 32px rgba(0,0,0,0.3);
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s, border-color 0.35s;
          position: relative;
          overflow: hidden;
        }
        .ms-pillar::after {
          content: '';
          position: absolute;
          bottom: -30px; right: -20px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, rgba(214,182,107,0.12) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }
        .ms-pillar:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.45), 0 0 20px rgba(214,182,107,0.15);
          border-color: var(--gold);
        }
        .ms-pillar-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }
        .ms-pillar-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #184332 0%, #0C2219 100%);
          border: 2px solid var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        .ms-pillar-title-wrap {}
        .ms-pillar-word {
          font-family: var(--font-serif);
          font-size: 1.55rem;
          color: var(--gold-bright);
          font-weight: 700;
          display: block;
          line-height: 1;
          margin-bottom: 4px;
        }
        .ms-pillar-verse {
          font-size: 0.74rem;
          color: #72C3A2;
          font-style: italic;
          font-weight: 600;
          display: block;
          letter-spacing: 0.08em;
        }
        .ms-pillar p {
          font-size: 0.95rem;
          color: rgba(250,246,238,0.85);
          line-height: 1.8;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* ── Commission Scripture ── */
        .ms-commission {
          display: grid;
          grid-template-columns: 5px 1fr;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(145deg, #123425 0%, #0A1E15 100%);
          border: 1.5px solid rgba(214,182,107,0.35);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .ms-commission-bar { background: var(--grad-gold); }
        .ms-commission-body { padding: 32px 34px; }
        .ms-commission-body blockquote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.12rem;
          color: var(--gold-bright);
          line-height: 1.75;
          margin: 0 0 10px;
        }
        .ms-commission-body cite {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(250,246,238,0.7);
          font-style: normal;
        }

        @media (max-width: 700px) {
          .ms-stmt { padding: 28px 22px; }
          .ms-pillars { grid-template-columns: 1fr; }
          .ms-commission-body { padding: 22px 20px; }
        }
      `}</style>

      {/* Mission Statement */}
      <div className="ms-stmt ms-reveal">
        <div className="ms-stmt-inner">
          <div className="ms-stmt-label">✝ Our Mission Mandate</div>
          <p>
            "<strong>The Spirit of the Lord GOD is upon me</strong>, because the LORD has anointed
            me to preach good tidings unto the meek; He has sent me to bind up the brokenhearted,
            to proclaim liberty to the captives, and the opening of the prison to them that are
            bound." — Isaiah 61:1
          </p>
        </div>
      </div>

      {/* Section heading */}
      <div className="ms-sec-head ms-reveal">
        <h3>Four Pillars of Ministry</h3>
        <p>How we fulfill our calling in the Name of Jesus Christ.</p>
      </div>

      {/* Pillars */}
      <div className="ms-pillars">
        {MISSION_PILLARS.map((m, i) => (
          <div
            key={m.word}
            className="ms-pillar ms-reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="ms-pillar-top">
              <div className="ms-pillar-icon">{m.icon}</div>
              <div className="ms-pillar-title-wrap">
                <span className="ms-pillar-word">{m.word}</span>
                <span className="ms-pillar-verse">{m.verse}</span>
              </div>
            </div>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Commission */}
      <div className="ms-commission ms-reveal">
        <div className="ms-commission-bar" aria-hidden="true" />
        <div className="ms-commission-body">
          <blockquote>
            "Go therefore and make disciples of all the nations, baptizing them in the name of
            the Father and of the Son and of the Holy Spirit, teaching them to observe all things
            that I have commanded you; and lo, I am with you always, even to the end of the age."
          </blockquote>
          <cite>— Matthew 28:19–20</cite>
        </div>
      </div>
    </>
  );
}
