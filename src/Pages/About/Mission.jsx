const MISSION_PILLARS = [
  {
    icon: "📢",
    word: "Preach",
    desc: "Uncompromisingly proclaim the unsearchable riches of Christ and the message of the Cross to every individual, leading men and women from darkness into marvelous light.",
  },
  {
    icon: "🔓",
    word: "Deliver",
    desc: "Break the chains of demonic oppression, addictions, generational curses, and fear through the supreme power and authority in the Name of Jesus Christ.",
  },
  {
    icon: "💊",
    word: "Heal",
    desc: "Minister divine healing and holistic restoration to the sick and brokenhearted through fervent prayer, laying on of hands, and Holy Spirit anointing.",
  },
  {
    icon: "📖",
    word: "Equip",
    desc: "Ground disciples in the Word of God, teaching them how to pray, worship, evangelize, and step boldly into their divine spiritual gifts and callings.",
  },
];

export default function Mission() {
  return (
    <>
      <style>{`
        .mission-statement-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold);
          border-radius: 18px;
          padding: 38px 40px;
          margin-bottom: 44px;
          box-shadow: var(--shadow-sm);
        }
        .mission-statement-label {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-dark);
          font-weight: 700;
          margin-bottom: 12px;
          display: block;
        }
        .mission-statement-text {
          font-family: var(--font-serif);
          font-size: clamp(1.1rem, 2.6vw, 1.45rem);
          color: var(--green-dark);
          line-height: 1.7;
          margin: 0;
        }

        .mission-pillars {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .mission-pillar {
          background: var(--grad-sanctuary);
          color: var(--ivory);
          border-radius: 18px;
          padding: 34px 28px;
          border: 1px solid var(--border-gold);
          box-shadow: var(--shadow-md);
          transition: transform 0.28s, box-shadow 0.28s;
        }
        .mission-pillar:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(12, 34, 25, 0.35);
        }
        .mission-pillar-icon {
          font-size: 2.2rem;
          margin-bottom: 12px;
          display: block;
        }
        .mission-pillar-word {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--gold-bright);
          font-weight: 700;
          margin: 0 0 10px;
          display: block;
          letter-spacing: 0.02em;
        }
        .mission-pillar p {
          font-size: 0.92rem;
          color: rgba(250, 246, 238, 0.8);
          line-height: 1.75;
          margin: 0;
        }

        .mission-scripture {
          margin-top: 44px;
          background: var(--grad-gold-soft);
          border-left: 4px solid var(--gold);
          border-radius: 0 14px 14px 0;
          padding: 24px 28px;
        }
        .mission-scripture blockquote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--green-dark);
          line-height: 1.7;
          margin: 0 0 6px;
        }
        .mission-scripture cite {
          font-family: var(--font-sans);
          font-style: normal;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-dark);
        }

        @media (max-width: 768px) {
          .mission-pillars { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Mission Statement */}
      <div className="mission-statement-card">
        <span className="mission-statement-label">† Our Mission Mandate †</span>
        <p className="mission-statement-text">
          "The Spirit of the Lord GOD is upon me, because the LORD has anointed me to preach good tidings unto the meek; He has sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound." — Isaiah 61:1
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="mission-pillars">
        {MISSION_PILLARS.map((m) => (
          <div key={m.word} className="mission-pillar">
            <span className="mission-pillar-icon" aria-hidden="true">{m.icon}</span>
            <span className="mission-pillar-word">{m.word}</span>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Commission Box */}
      <div className="mission-scripture">
        <blockquote>
          "Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I have commanded you; and lo, I am with you always, even to the end of the age."
        </blockquote>
        <cite>— Matthew 28:19–20</cite>
      </div>
    </>
  );
}
