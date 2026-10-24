import { Link } from "react-router-dom";

const TRACKS = [
  {
    step: "Stage 1",
    title: "Foundations in Christ & New Life",
    duration: "6 Weeks",
    topics: [
      "Assurance of Salvation and the Cleansing of the Blood",
      "Biblical Water Baptism (Believer's Immersion)",
      "Daily Quiet Time: How to Read and Obey the Scriptures",
      "Overcoming Temptation and Breaking Old Habits",
    ],
    scripture: "2 Peter 3:18 — 'Grow in the grace and knowledge of our Lord and Savior Jesus Christ.'",
  },
  {
    step: "Stage 2",
    title: "Empowerment of the Holy Spirit",
    duration: "8 Weeks",
    topics: [
      "The Baptism of the Holy Spirit and Speaking in Tongues",
      "Discovering and Exercising Your Spiritual Gifts",
      "Praise, Fasting, and Developing a Fervent Prayer Life",
      "Cultivating the Sweet Fruits of the Spirit in Daily Life",
    ],
    scripture: "Acts 1:8 — 'You shall receive power when the Holy Spirit has come upon you.'",
  },
  {
    step: "Stage 3",
    title: "The Intercessor's Watch & Deliverance",
    duration: "10 Weeks",
    topics: [
      "Spiritual Warfare and Tearing Down Strongholds",
      "Ministering Deliverance to the Oppressed in Jesus' Name",
      "The Ministry of Intercession for Families and Nations",
      "Walking in Divine Healing and Faith for Miracles",
    ],
    scripture: "2 Corinthians 10:4 — 'The weapons of our warfare are not carnal but mighty in God.'",
  },
  {
    step: "Stage 4",
    title: "Kingdom Servant Leadership",
    duration: "12 Weeks",
    topics: [
      "The Heart of a Servant: Jesus as our Supreme Example",
      "Personal Evangelism and Making Disciples",
      "Leading Small Groups, Youth, and Prayer Fellowships",
      "Integrity, Financial Stewardship, and Godly Family Living",
    ],
    scripture: "2 Timothy 2:2 — 'The things that you have heard from me... commit to faithful men.'",
  },
];

export default function Discipleship() {
  return (
    <>
      <style>{`
        .disc-hero {
          background: linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold);
          padding: 40px 36px;
          color: var(--text-main);
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(18, 45, 36, 0.05);
        }
        .disc-hero h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          margin: 8px 0 12px;
          color: var(--green-dark);
        }
        .disc-hero h2 span { color: var(--gold-dark); }
        .disc-hero p {
          color: #374151;
          font-size: 0.98rem;
          line-height: 1.7;
          margin: 0;
        }

        .disc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 48px;
        }
        .disc-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 18px;
          padding: 32px 28px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s, border-color 0.25s;
          display: flex;
          flex-direction: column;
        }
        .disc-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold);
        }
        .disc-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .disc-step-badge {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: var(--grad-green-accent);
          color: var(--gold-bright);
          padding: 4px 12px;
          border-radius: 50px;
        }
        .disc-duration {
          font-size: 0.76rem;
          color: var(--gold-dark);
          font-weight: 700;
        }
        .disc-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--green-dark);
          margin: 0 0 14px;
          font-weight: 700;
        }
        .disc-topics-list {
          list-style: none;
          padding: 0;
          margin: 0 0 18px;
          flex-grow: 1;
        }
        .disc-topics-list li {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 8px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .disc-scripture-line {
          font-size: 0.78rem;
          color: var(--gold-dark);
          font-style: italic;
          font-family: var(--font-serif);
          border-top: 1px solid var(--border-gold-subtle);
          padding-top: 10px;
        }

        .disc-enroll-box {
          background: var(--ivory);
          border-radius: 18px;
          border: 1.5px solid var(--border-gold);
          padding: 36px 32px;
          text-align: center;
        }

        @media (max-width: 820px) {
          .disc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="disc-hero">
        <span className="ct-badge ct-badge-gold">† Equipping the Saints †</span>
        <h2>
          Discipleship <span>Prayer Tracks</span>
        </h2>
        <p>
          "Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I have commanded you." — Matthew 28:19–20. Deepen your spiritual roots and step into ministry.
        </p>
      </div>

      {/* Grid of 4 Stages */}
      <div className="disc-grid">
        {TRACKS.map((t) => (
          <article key={t.step} className="disc-card">
            <div className="disc-card-head">
              <span className="disc-step-badge">{t.step}</span>
              <span className="disc-duration">⏱️ {t.duration}</span>
            </div>
            <h3 className="disc-card-title">{t.title}</h3>
            <ul className="disc-topics-list">
              {t.topics.map((item, idx) => (
                <li key={idx}>
                  <span style={{ color: "var(--gold)" }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="disc-scripture-line">{t.scripture}</div>
          </article>
        ))}
      </div>

      {/* Enrollment */}
      <div className="disc-enroll-box">
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", color: "var(--green-dark)", margin: "0 0 10px" }}>
          Ready to Begin Your Discipleship Journey?
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: 620, margin: "0 auto 24px", lineHeight: 1.7 }}>
          Classes take place every Saturday at the church auditorium and via online prayer cohorts. All study manuals and mentoring are provided free of charge.
        </p>
        <Link to="/contact" className="ct-btn-gold">
          Enroll in Discipleship Ministry →
        </Link>
      </div>
    </>
  );
}
