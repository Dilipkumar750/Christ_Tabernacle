import { useState } from "react";

const DECLARATIONS = [
  {
    id: 1,
    title: "1. Renewal of the Mind & Freedom from Worldly Conformity",
    scripture: "Romans 12:2",
    verseText: "Do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.",
    prayer:
      "Lord Jesus, today I surrender every toxic thought, worldly pattern, and anxious imagination at Your cross. By the power of the Holy Spirit, renew my thinking to align with Your living truth. Give me the mind of Christ and pure spiritual discernment in all decisions.",
  },
  {
    id: 2,
    title: "2. New Creation Identity & Severing Past Regrets",
    scripture: "2 Corinthians 5:17",
    verseText: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.",
    prayer:
      "I decree and declare that my past mistakes, failures, and guilt have no hold over me. In Christ Jesus, I am thoroughly washed in the Blood of the Lamb. I am a brand-new creation, accepted in the Beloved, and clothed in divine righteousness.",
  },
  {
    id: 3,
    title: "3. Total Deliverance from Condemnation and Fear",
    scripture: "Romans 8:1; 2 Timothy 1:7",
    verseText: "There is therefore now no condemnation to those who are in Christ Jesus... For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    prayer:
      "I renounce the spirit of fear, panic, insecurity, and depression. I receive the spirit of adoption by which I cry 'Abba, Father!' The Blood of Jesus silences every accusation of the enemy against me, my marriage, and my children.",
  },
  {
    id: 4,
    title: "4. Crucified Life & Spiritual Fruitfulness",
    scripture: "Galatians 2:20",
    verseText: "I have been crucified with Christ; it is no longer I who live, but Christ lives in me; and the life which I now live in the flesh I live by faith in the Son of God.",
    prayer:
      "Holy Spirit, crucify every selfish ambition, pride, and fleshly desire in my life. Let the sweet fruits of love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, and self-control flourish abundantly in me today.",
  },
  {
    id: 5,
    title: "5. Healing & Wholeness in Body, Soul, and Spirit",
    scripture: "1 Thessalonians 5:23; Isaiah 53:5",
    verseText: "Now may the God of peace Himself sanctify you completely; and may your whole spirit, soul, and body be preserved blameless at the coming of our Lord Jesus Christ.",
    prayer:
      "By the stripes of Jesus Christ, my body is healed, my mind is restored, and my spirit is quickened. I command sickness, infirmity, fatigue, and pain to depart from my mortal flesh in the mighty name of Jesus Christ.",
  },
  {
    id: 6,
    title: "6. Divine Protection Over Home & Family",
    scripture: "Psalm 91:9–11",
    verseText: "Because you have made the LORD, who is my refuge, even the Most High, your dwelling place, no evil shall befall you, nor shall any plague come near your dwelling.",
    prayer:
      "I draw the Blood line of Jesus Christ around my household, my children, our coming in, and our going out. Lord, dispatch Your ministering angels to surround our home and preserve us from every snare of the fowler and wicked pestilence.",
  },
  {
    id: 7,
    title: "7. Overcoming Victory & Kingdom Authority",
    scripture: "Romans 8:37; Luke 10:19",
    verseText: "Yet in all these things we are more than conquerors through Him who loved us.",
    prayer:
      "I step boldly into this day knowing that greater is He that is in me than he that is in the world. In the name of Jesus, every obstacle shall become a stepping stone for God's glory. Amen and Amen!",
  },
];

export default function Transformation() {
  const [checkedIds, setCheckedIds] = useState([]);

  const toggleCheck = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <style>{`
        .trans-hero {
          background: linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold);
          padding: 40px 36px;
          color: var(--text-main);
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(18, 45, 36, 0.05);
        }
        .trans-hero h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          margin: 8px 0 12px;
          color: var(--green-dark);
        }
        .trans-hero h2 span { color: var(--gold-dark); }
        .trans-hero p {
          color: #374151;
          font-size: 0.98rem;
          line-height: 1.7;
          margin: 0;
        }

        .trans-progress-strip {
          background: var(--white);
          border-radius: 14px;
          border: 1px solid var(--border-gold-subtle);
          padding: 16px 22px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }

        .trans-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .trans-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 18px;
          padding: 28px;
          box-shadow: var(--shadow-sm);
          transition: all 0.25s ease;
        }
        .trans-card.completed {
          border-color: var(--gold);
          background: var(--gold-soft);
        }
        .trans-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 16px;
        }
        .trans-card-title {
          font-family: var(--font-serif);
          font-size: 1.22rem;
          color: var(--green-dark);
          margin: 0;
          font-weight: 700;
        }
        .trans-check-btn {
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid var(--border-gold);
          background: var(--white);
          color: var(--green);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .trans-check-btn.checked {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
        }
        .trans-verse-quote {
          background: var(--ivory);
          border-left: 3px solid var(--gold);
          padding: 12px 16px;
          border-radius: 0 10px 10px 0;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.92rem;
          color: var(--green-dark);
          line-height: 1.6;
          margin: 10px 0 16px;
        }
        .trans-prayer-text {
          font-size: 0.94rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0;
          padding-left: 4px;
        }
      `}</style>

      {/* Hero */}
      <div className="trans-hero">
        <span className="ct-badge ct-badge-gold">† Spiritual Renewal &amp; Deliverance †</span>
        <h2>
          Transformation Prayer <span>Declarations</span>
        </h2>
        <p>
          "Do not be conformed to this world, but be transformed by the renewing of your mind." — Romans 12:2. Pray through these 7 foundational biblical declarations daily to maintain spiritual liberty, victory, and divine power in your personal walk with Christ.
        </p>
      </div>

      {/* Progress Strip */}
      <div className="trans-progress-strip">
        <div>
          <span style={{ fontWeight: 700, color: "var(--green-dark)", fontSize: "0.92rem" }}>
            Today's Prayer Progress:
          </span>{" "}
          <span style={{ color: "var(--gold-dark)", fontWeight: 700 }}>
            {checkedIds.length} of {DECLARATIONS.length} Prayed
          </span>
        </div>
        {checkedIds.length > 0 && (
          <button
            onClick={() => setCheckedIds([])}
            style={{ fontSize: "0.78rem", color: "var(--text-light)", textDecoration: "underline", cursor: "pointer" }}
          >
            Reset All
          </button>
        )}
      </div>

      {/* Declarations List */}
      <div className="trans-list">
        {DECLARATIONS.map((d) => {
          const isDone = checkedIds.includes(d.id);
          return (
            <article key={d.id} className={`trans-card${isDone ? " completed" : ""}`}>
              <div className="trans-card-head">
                <h3 className="trans-card-title">{d.title}</h3>
                <button
                  className={`trans-check-btn${isDone ? " checked" : ""}`}
                  onClick={() => toggleCheck(d.id)}
                  aria-pressed={isDone}
                >
                  {isDone ? "✓ Prayed Today" : "Mark as Prayed"}
                </button>
              </div>

              <div className="trans-verse-quote">
                "{d.verseText}"
                <cite style={{ display: "block", fontStyle: "normal", fontSize: "0.76rem", fontWeight: 700, color: "var(--gold-dark)", marginTop: 4 }}>
                  — {d.scripture}
                </cite>
              </div>

              <p className="trans-prayer-text">
                <strong style={{ color: "var(--green-dark)" }}>Your Prayer: </strong>
                {d.prayer}
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
