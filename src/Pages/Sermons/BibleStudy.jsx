import { useState } from "react";

const BIBLE_STUDIES = [
  {
    id: 1,
    title: "Epistle to the Romans: Justification by Faith",
    passage: "Romans 3:21–5:11",
    author: "Pastor Saravanan Immanuel",
    topic: "Salvation & Righteousness",
    memoryVerse: "Romans 5:1 — 'Therefore, having been justified by faith, we have peace with God through our Lord Jesus Christ.'",
    sections: [
      {
        heading: "1. The Universality of Sin (Romans 3:23)",
        content: "Both Jew and Gentile stand equally guilty before the holy standard of God. Human self-righteousness can never bridge the chasm between mortal sin and divine purity.",
      },
      {
        heading: "2. Redemption in Christ Jesus (Romans 3:24–25)",
        content: "Justification is God's legal declaration that the believer is righteous, grounded wholly upon the propitiation through faith in Christ's shed blood.",
      },
      {
        heading: "3. The Blessed Fruits of Justification (Romans 5:1–5)",
        content: "Peace with God, standing in grace, joyful boasting in hope, and perseverance in tribulations which produces character and Holy Spirit love.",
      },
    ],
    questions: [
      "Why is human effort inadequate to attain righteousness before God?",
      "How does having 'peace with God' impact your daily mental anxiety?",
      "In what way does suffering produce enduring spiritual hope in a believer?",
    ],
  },
  {
    id: 2,
    title: "The Mystery of the Church: The Body of Christ",
    passage: "Ephesians 1:15–2:22",
    author: "Pastoral Teaching Team",
    topic: "Ecclesiology & Divine Calling",
    memoryVerse: "Ephesians 2:8–9 — 'For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast.'",
    sections: [
      {
        heading: "1. The Eyes of the Heart Enlightened (Ephesians 1:18)",
        content: "Paul prays for the spiritual illumination to comprehend the hope of God's calling and the surpassing greatness of His resurrection power.",
      },
      {
        heading: "2. Made Alive With Christ (Ephesians 2:1–6)",
        content: "We who were dead in trespasses and sins have been resurrected, energized, and seated with Christ in the heavenly realms.",
      },
      {
        heading: "3. The Breaking Down of the Middle Wall (Ephesians 2:14–18)",
        content: "Christ has made Jew and Gentile one new spiritual humanity, reconciling all believers through the cross and giving access by one Spirit to the Father.",
      },
    ],
    questions: [
      "What does it mean practically that believers are seated with Christ in heavenly places?",
      "How does God's grace empower us for good works according to Ephesians 2:10?",
      "How should the unity of the Body of Christ be demonstrated in local fellowship?",
    ],
  },
  {
    id: 3,
    title: "The Armor of God & Prevailing Warfare",
    passage: "Ephesians 6:10–20",
    author: "Eva. Glory Devapiriyam",
    topic: "Spiritual Warfare",
    memoryVerse: "Ephesians 6:11 — 'Put on the whole armor of God, that you may be able to stand against the wiles of the devil.'",
    sections: [
      {
        heading: "1. The Nature of the Battle (Ephesians 6:12)",
        content: "Our struggle is not against flesh and blood, but against principalities, powers, rulers of darkness, and spiritual hosts of wickedness.",
      },
      {
        heading: "2. The Defensive Armor Pieces (Ephesians 6:14–17)",
        content: "Belt of Truth, Breastplate of Righteousness, Shoes of Peace, Shield of Faith (quenching flaming arrows), and Helmet of Salvation.",
      },
      {
        heading: "3. The Offensive Weapon & Constant Prayer (Ephesians 6:17–18)",
        content: "The Sword of the Spirit (rhema word of God) combined with praying always with all prayer and supplication in the Spirit.",
      },
    ],
    questions: [
      "How do we actively quench the flaming darts of guilt and accusation using the Shield of Faith?",
      "Why is speaking the written Word of God so potent against demonic temptation?",
      "What is the role of persistent intercession in winning spiritual victories?",
    ],
  },
];

export default function BibleStudy() {
  const [activeStudy, setActiveStudy] = useState(BIBLE_STUDIES[0]);

  return (
    <>
      <style>{`
        .study-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 32px;
          align-items: start;
        }

        .study-sidebar {
          background: var(--white);
          border-radius: 18px;
          border: 1.5px solid var(--border-gold-subtle);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        .study-sidebar h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--green-dark);
          margin: 0 0 16px;
        }
        .study-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .study-nav-item {
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
          background: var(--ivory);
          cursor: pointer;
          transition: all 0.2s;
        }
        .study-nav-item:hover {
          border-color: var(--gold);
          background: var(--white);
        }
        .study-nav-item.active {
          border-color: var(--gold);
          background: var(--grad-sanctuary);
          color: var(--ivory);
        }
        .study-nav-title {
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 4px;
          display: block;
        }
        .study-nav-sub {
          font-size: 0.74rem;
          opacity: 0.8;
          display: block;
        }

        /* Detail */
        .study-detail {
          background: var(--white);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold);
          padding: 38px 34px;
          box-shadow: var(--shadow-md);
        }
        .study-detail-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 3vw, 1.85rem);
          color: var(--green-dark);
          margin: 8px 0 6px;
          font-weight: 700;
        }
        .study-author-line {
          font-size: 0.84rem;
          color: var(--gold-dark);
          font-weight: 700;
          margin-bottom: 22px;
        }

        .study-sections-wrap {
          margin: 28px 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .study-sec-card {
          background: var(--ivory);
          border: 1px solid var(--border-gold-subtle);
          border-radius: 14px;
          padding: 22px 24px;
        }
        .study-sec-card h4 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--green);
          margin: 0 0 8px;
        }
        .study-sec-card p {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0;
        }

        .study-questions-box {
          background: var(--gold-soft);
          border-radius: 14px;
          padding: 24px 26px;
          border: 1.5px solid var(--border-gold);
          margin-top: 30px;
        }
        .study-questions-box h4 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--green-dark);
          margin: 0 0 12px;
        }

        @media (max-width: 900px) {
          .study-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="study-layout">
        {/* Sidebar */}
        <aside className="study-sidebar">
          <h3>Expository Studies</h3>
          <ul className="study-nav-list">
            {BIBLE_STUDIES.map((study) => (
              <li
                key={study.id}
                className={`study-nav-item${activeStudy.id === study.id ? " active" : ""}`}
                onClick={() => setActiveStudy(study)}
              >
                <span className="study-nav-title">{study.title}</span>
                <span className="study-nav-sub">{study.passage}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Study Details */}
        <article className="study-detail" aria-labelledby="study-title">
          <span className="ct-badge">{activeStudy.topic}</span>
          <h2 id="study-title" className="study-detail-title">{activeStudy.title}</h2>
          <div className="study-author-line">
            📖 Scripture: {activeStudy.passage} | 👤 Teacher: {activeStudy.author}
          </div>

          {/* Memory Verse Box */}
          <div className="ct-scripture-box">
            {activeStudy.memoryVerse}
          </div>

          {/* Study Sections */}
          <div className="study-sections-wrap">
            {activeStudy.sections.map((sec, idx) => (
              <div key={idx} className="study-sec-card">
                <h4>{sec.heading}</h4>
                <p>{sec.content}</p>
              </div>
            ))}
          </div>

          {/* Reflection Questions */}
          <div className="study-questions-box">
            <h4>💡 Personal &amp; Group Reflection Questions:</h4>
            <ol style={{ paddingLeft: "20px", color: "var(--green-dark)", lineHeight: 1.8, fontSize: "0.92rem" }}>
              {activeStudy.questions.map((q, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </article>
      </div>
    </>
  );
}
