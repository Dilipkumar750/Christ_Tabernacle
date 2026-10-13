const PILLARS = [
  {
    title: "Faith",
    verse: "Hebrews 11:1",
    subtitle: "Trusting God Completely",
    desc: "We stand unwavering upon God's promises, walking not by sight but by faith in the Living Word of God. Faith is the victory that overcomes the world.",
  },
  {
    title: "Family",
    verse: "Joshua 24:15",
    subtitle: "Strengthening the Household",
    desc: "God's design begins in the family. We minister to husbands, wives, children, and youth to build Christ-centred homes rooted in godly love, honor, and purity.",
  },
  {
    title: "Future",
    verse: "Jeremiah 29:11",
    subtitle: "Impacting Generations",
    desc: "Equipping the rising generation to fulfill their God-ordained destiny with divine confidence, spiritual gifts, and uncompromising Christian character.",
  },
];

export default function Motto() {
  return (
    <>
      <style>{`
        .motto-banner {
          background: var(--grad-sanctuary);
          border-radius: 20px;
          padding: 50px 36px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 46px;
          color: var(--ivory);
          border: 1.5px solid var(--border-gold);
          box-shadow: var(--shadow-md);
        }
        .motto-banner::before {
          content: '✝';
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 160px;
          color: rgba(214, 182, 107, 0.05);
          pointer-events: none;
          font-family: var(--font-serif);
        }
        .motto-banner-label {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          margin-bottom: 12px;
          display: block;
        }
        .motto-banner-words {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3.4rem);
          color: var(--ivory);
          font-weight: 700;
          margin: 0 0 16px;
          line-height: 1.2;
        }
        .motto-banner-words span {
          color: var(--gold-bright);
        }
        .motto-banner-verse {
          font-size: 1.05rem;
          font-style: italic;
          color: rgba(250, 246, 238, 0.85);
          max-width: 620px;
          margin: 0 auto;
          font-family: var(--font-serif);
        }

        .motto-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .motto-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 18px;
          padding: 34px 28px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          flex-direction: column;
        }
        .motto-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
        }
        .motto-card h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--green-dark);
          margin: 0 0 4px;
          font-weight: 700;
        }
        .motto-card-sub {
          font-size: 0.76rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-dark);
          font-weight: 700;
          margin-bottom: 8px;
        }
        .motto-card-verse {
          font-size: 0.78rem;
          color: var(--green);
          font-weight: 600;
          margin-bottom: 16px;
          font-style: italic;
        }
        .motto-card p {
          font-size: 0.94rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0;
        }

        @media (max-width: 820px) {
          .motto-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero Card */}
      <div className="motto-banner">
        <span className="motto-banner-label">† The Core Motto of Christ's Tabernacle †</span>
        <h2 className="motto-banner-words">
          Faith <span>·</span> Family <span>·</span> Future
        </h2>
        <p className="motto-banner-verse">
          "Now faith is confidence in what we hope for and assurance about what we do not see." — Hebrews 11:1
        </p>
      </div>

      {/* Grid */}
      <div className="motto-grid">
        {PILLARS.map((p) => (
          <div key={p.title} className="motto-card">
            <h3>{p.title}</h3>
            <span className="motto-card-sub">{p.subtitle}</span>
            <span className="motto-card-verse">{p.verse}</span>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
