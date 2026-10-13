const VISION_PILLARS = [
  {
    icon: "🔄",
    word: "Transform",
    desc: "Transforming broken and seeking souls through the convicting power of the Holy Spirit and personal encounter with Jesus Christ.",
  },
  {
    icon: "🌿",
    word: "Restore",
    desc: "Restoring broken families, spiritual destinies, and wounded hearts back into the fullness of God's blessing and peace.",
  },
  {
    icon: "📖",
    word: "Establish",
    desc: "Establishing believers deeply in sound Biblical doctrine, prayer disciplines, and holy Christian living in an ever-shifting world.",
  },
  {
    icon: "🌍",
    word: "Reach",
    desc: "Reaching Chennai, India, and the nations through compassionate outreach, evangelism, and church planting.",
  },
];

export default function Vision() {
  return (
    <>
      <style>{`
        .vision-statement-card {
          background: var(--grad-sanctuary);
          border-radius: 20px;
          padding: 46px 40px;
          margin-bottom: 44px;
          position: relative;
          overflow: hidden;
          color: var(--ivory);
          border: 1.5px solid var(--border-gold);
          box-shadow: var(--shadow-md);
        }
        .vision-statement-label {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          margin-bottom: 14px;
          display: block;
        }
        .vision-statement-text {
          font-family: var(--font-serif);
          font-size: clamp(1.15rem, 2.8vw, 1.6rem);
          color: var(--ivory);
          line-height: 1.65;
          margin: 0;
          font-style: italic;
        }
        .vision-statement-text strong {
          color: var(--gold-bright);
          font-style: normal;
        }

        .vision-pillars {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .vision-pillar {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 16px;
          padding: 30px 26px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          gap: 18px;
          align-items: flex-start;
        }
        .vision-pillar:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
        }
        .vision-pillar-icon {
          font-size: 2.2rem;
          flex-shrink: 0;
        }
        .vision-pillar-word {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--green-dark);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .vision-pillar p {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .vision-pillars { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Main Statement */}
      <div className="vision-statement-card">
        <span className="vision-statement-label">† Our Kingdom Vision †</span>
        <blockquote className="vision-statement-text">
          "To be a <strong>vibrant sanctuary of prayer and deliverance</strong> where every soul is transformed by Christ, every home is sanctified by the Holy Spirit, and the Gospel of the Kingdom shines as an unquenchable beacon of salvation."
        </blockquote>
      </div>

      {/* 4 Pillars */}
      <div className="vision-pillars">
        {VISION_PILLARS.map((p) => (
          <div key={p.word} className="vision-pillar">
            <span className="vision-pillar-icon" aria-hidden="true">{p.icon}</span>
            <div>
              <h3 className="vision-pillar-word">{p.word}</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
