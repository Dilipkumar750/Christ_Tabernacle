import { Link } from "react-router-dom";

const AGE_GROUPS = [
  {
    name: "Kingdom Sparks",
    ages: "Ages 3 – 5",
    icon: "🌱",
    desc: "Nurturing tender hearts with Jesus' love through animated Bible storytelling, praise action songs, and colorful coloring activities.",
    curriculum: "Creation, Noah's Ark, Baby Jesus, Good Samaritan, Jesus Loves Me",
  },
  {
    name: "Joshua Generation",
    ages: "Ages 6 – 10",
    icon: "🏹",
    desc: "Equipping young minds to memorize Scripture, understand biblical obedience, and learn how to talk with Jesus in everyday prayer.",
    curriculum: "The Ten Commandments, David & Goliath, Daniel in the Lion's Den, The Miracles of Jesus",
  },
  {
    name: "Faith Trailblazers",
    ages: "Ages 11 – 14",
    icon: "🛡️",
    desc: "Helping pre-teens navigate peer pressure, develop personal faith convictions, and understand the Armor of God and the Holy Spirit.",
    curriculum: "Armor of God, Fruits of the Spirit, Overcoming Peer Pressure, Christian Identity",
  },
  {
    name: "Radical Youth for Christ",
    ages: "Ages 15 – 21",
    icon: "🔥",
    desc: "Empowering adolescents and young adults for holy living, academic excellence, leadership in worship, and personal evangelism on campus.",
    curriculum: "Apologetics & Worldview, Purity & Relationships, Holy Spirit Gifts, Mission Outreach",
  },
];

export default function SundaySchool() {
  return (
    <>
      <style>{`
        .ss-hero {
          background: var(--grad-sanctuary);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold);
          padding: 40px 36px;
          color: var(--ivory);
          margin-bottom: 40px;
          box-shadow: var(--shadow-md);
        }
        .ss-hero h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          margin: 8px 0 12px;
        }
        .ss-hero h2 span { color: var(--gold-bright); }
        .ss-hero p {
          color: rgba(250, 246, 238, 0.82);
          font-size: 0.98rem;
          line-height: 1.7;
          margin: 0;
        }

        .ss-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 44px;
        }
        .ss-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 18px;
          padding: 30px 26px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s, border-color 0.25s;
          display: flex;
          flex-direction: column;
        }
        .ss-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold);
        }
        .ss-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .ss-card-icon {
          font-size: 2.2rem;
        }
        .ss-ages-badge {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--gold-soft);
          color: var(--gold-dark);
          padding: 4px 12px;
          border-radius: 50px;
          border: 1px solid var(--border-gold-subtle);
        }
        .ss-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--green-dark);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .ss-card-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0 0 16px;
          flex-grow: 1;
        }
        .ss-curriculum-box {
          background: var(--ivory);
          border-left: 3px solid var(--gold);
          padding: 10px 14px;
          border-radius: 0 8px 8px 0;
          font-size: 0.8rem;
          color: var(--green);
        }

        .ss-pillars-banner {
          background: var(--white);
          border-radius: 18px;
          border: 1px solid var(--border-gold-subtle);
          padding: 34px 30px;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 820px) {
          .ss-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="ss-hero">
        <span className="ct-badge ct-badge-dark">† Nurturing the Next Generation †</span>
        <h2>
          Sunday School <span>&amp; Youth Ministry</span>
        </h2>
        <p>
          "Train up a child in the way he should go, and when he is old he will not depart from it." — Proverbs 22:6. Providing a fun, safe, Christ-centered environment where young lives encounter God's love and learn foundational biblical truths.
        </p>
      </div>

      {/* Age Groups Grid */}
      <div className="ss-grid">
        {AGE_GROUPS.map((grp) => (
          <article key={grp.name} className="ss-card">
            <div className="ss-card-head">
              <span className="ss-card-icon" aria-hidden="true">{grp.icon}</span>
              <span className="ss-ages-badge">{grp.ages}</span>
            </div>
            <h3 className="ss-card-title">{grp.name}</h3>
            <p className="ss-card-desc">{grp.desc}</p>
            <div className="ss-curriculum-box">
              <strong>📖 Core Lessons:</strong> {grp.curriculum}
            </div>
          </article>
        ))}
      </div>

      {/* Program & Safety Standards */}
      <div className="ss-pillars-banner">
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--green-dark)", margin: "0 0 14px" }}>
          What Happens Every Sunday Morning (8:30 AM – 10:30 AM)
        </h3>
        <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.94rem" }}>
          <li>
            <strong>Joyful Action Songs:</strong> Uplifting worship and choreography tailored for young voices.
          </li>
          <li>
            <strong>Weekly Scripture Memory Trophy:</strong> Children receive encouragement and prizes for hiding God's Word in their hearts.
          </li>
          <li>
            <strong>Creative Bible Worksheets &amp; Crafts:</strong> Reinforcing moral lessons through hands-on art and coloring.
          </li>
          <li>
            <strong>Safety &amp; Verified Volunteers:</strong> All Sunday School teachers are vetted, prayerfully appointed members of Christ's Tabernacle.
          </li>
        </ul>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link to="/contact" className="ct-btn-gold">
            Register Your Child for Sunday School →
          </Link>
        </div>
      </div>
    </>
  );
}
