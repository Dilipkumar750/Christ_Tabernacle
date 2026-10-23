import jesusSaravananImg from "../../assets/jesus_saravanan.jpeg";
import saravananImg from "../../assets/saravanan.jpeg";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import outdoorFellowshipImg from "../../assets/image1.jpeg";

const MILESTONES = [
  {
    year: "1991",
    icon: "🌱",
    title: "It Began With a Divine Calling",
    desc: "Eva. Glory Devapiriyam stepped out in radical faith and initiated a Gospel ministry with 15 faithful believers in a humble home, driven by a burning burden: to bring Christ's unyielding love to the needy and direct souls toward the Living God.",
  },
  {
    year: "2007",
    icon: "🌿",
    title: "Apostolic Gospel Prayer House & The Divine Mandate",
    desc: "The Apostolic Gospel Prayer House was established as the Holy Spirit moved mightily. Pastor Saravanan Immanuel received the heavenly vision and divine mandate from our Lord Jesus Christ, ministering hand in hand to set captives free.",
    image: jesusSaravananImg,
    caption: "✝ Pastor Saravanan Immanuel receiving the Lord Jesus' divine calling and apostolic mandate."
  },
  {
    year: "Dec 2007",
    icon: "🕊️",
    title: "Ordination & Ministerial Anointing",
    desc: "Pastor Immanuel Saravanan was officially ordained by Chief Pastor M. K. Sam Sundaram, ACA, and blessed by Pastor M. M. Jebaraj, ACA (Selavoyal Ministries) — marking an enduring milestone of spiritual authority and apostolic mandate.",
    image: saravananImg,
    caption: "Pastor Saravanan Immanuel ministering with the apostolic burden and power of the Holy Spirit."
  },
  {
    year: "2016",
    icon: "✨",
    title: "A New Vision — Christ's Tabernacle Church",
    desc: "The Lord revealed a new vision to establish and build a permanent sanctuary for all nations. Apostolic Gospel Prayer House transitioned into Christ's Tabernacle Church, consecrated and dedicated by Rev. I. Christdhas of Hope AG Church, Pallikaranai.",
    image: saravanan3Img,
    caption: "Senior Pastor Saravanan Immanuel at the sacred sanctuary pulpit of Christ's Tabernacle."
  },
  {
    year: "Present Day",
    icon: "🔥",
    title: "Continuing the Kingdom Mandate",
    desc: "Today, Christ's Tabernacle ministers each week to families across Chennai, empowering the next generation through Sunday School, fasting intercessions, dynamic worship, and supernatural demonstrations of God's grace.",
    image: outdoorFellowshipImg,
    caption: "Joyous gathering of the Christ's Tabernacle congregation praising the Lord in unity."
  },
];

const OUTCOMES = ["Delivered", "Healed", "Restored", "Equipped"];

export default function Journey() {
  return (
    <>
      <style>{`
        .journey-intro {
          background: var(--white);
          border: 1.5px solid var(--border-gold);
          border-radius: 18px;
          padding: 36px 40px;
          margin-bottom: 50px;
          box-shadow: var(--shadow-sm);
        }
        .journey-intro-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-dark);
          font-weight: 700;
          margin-bottom: 10px;
        }
        .journey-intro h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3.2vw, 2.2rem);
          color: var(--green-dark);
          margin: 0 0 16px;
          font-weight: 700;
        }
        .journey-intro p {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin: 0 0 12px;
        }
        .journey-intro p:last-child { margin: 0; }

        /* Timeline */
        .journey-timeline {
          position: relative;
          padding-left: 36px;
          margin: 40px 0;
        }
        .journey-timeline::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background: linear-gradient(to bottom, var(--gold), rgba(214, 182, 107, 0.2));
          border-radius: 3px;
        }
        .journey-item {
          position: relative;
          margin-bottom: 46px;
          background: var(--white);
          border: 1px solid var(--border-gold-subtle);
          border-radius: 16px;
          padding: 24px 28px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .journey-item:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-gold);
        }
        .journey-dot {
          position: absolute;
          left: -48px;
          top: 24px;
          width: 26px;
          height: 26px;
          background: var(--grad-green-accent);
          border: 3px solid var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: var(--white);
          z-index: 1;
          box-shadow: 0 0 0 5px rgba(214, 182, 107, 0.2);
        }
        .journey-year {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 6px;
          display: inline-block;
          background: var(--gold-soft);
          padding: 4px 12px;
          border-radius: 50px;
          border: 1px solid var(--border-gold-subtle);
        }
        .journey-item h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--green-dark);
          margin: 6px 0 10px;
          font-weight: 700;
        }
        .journey-item p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0;
        }

        /* What God Has Done */
        .journey-outcomes {
          margin-top: 56px;
          background: var(--grad-sanctuary);
          border-radius: 18px;
          padding: 44px 36px;
          text-align: center;
          color: var(--ivory);
          border: 1px solid var(--border-gold);
          box-shadow: var(--shadow-md);
        }
        .journey-outcomes h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--gold-bright);
          margin: 0 0 10px;
        }
        .journey-outcomes p {
          font-size: 0.95rem;
          color: rgba(250, 246, 238, 0.78);
          line-height: 1.75;
          margin: 0 0 26px;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }
        .journey-outcomes-tags {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .journey-outcomes-tag {
          background: rgba(214, 182, 107, 0.15);
          border: 1.5px solid var(--gold);
          color: var(--gold-bright);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 9px 24px;
          border-radius: 50px;
        }

        /* Calling quote */
        .journey-calling-box {
          margin-top: 40px;
          border-left: 4px solid var(--gold);
          padding: 24px 28px;
          background: var(--white);
          border-radius: 0 14px 14px 0;
          box-shadow: var(--shadow-sm);
        }
        .journey-calling-box h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--green-dark);
          margin: 0 0 8px;
        }
        .journey-calling-box p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 680px) {
          .journey-intro { padding: 24px 20px; margin-bottom: 36px; }
          .journey-timeline { padding-left: 20px; }
          .journey-timeline::before { left: 6px; }
          .journey-dot { left: -30px; width: 22px; height: 22px; font-size: 0.6rem; top: 20px; }
          .journey-item { padding: 18px 16px; margin-bottom: 28px; }
          .journey-outcomes { padding: 32px 20px; }
          .journey-outcomes-tags { gap: 8px; }
          .journey-outcomes-tag { padding: 7px 16px; font-size: 0.72rem; }
          .journey-calling-box { padding: 18px 20px; }
        }
      `}</style>

      {/* Intro */}
      <div className="journey-intro">
        <div className="journey-intro-eyebrow">† Our Sacred Heritage †</div>
        <h2>A Story Written by God's Faithfulness</h2>
        <p>
          The ministry of Christ's Tabernacle was not built on worldly strength or human wisdom, but born out of prayer, sustained through intercession, and established upon the uncompromised Word of God.
        </p>
        <p>
          From a humble gathering of 15 saints in 1991 to a vibrant church family today, every step of our pilgrimage has been marked by testimonies of divine deliverance, supernatural healing, and transformed hearts.
        </p>
      </div>

      {/* Timeline */}
      <div className="journey-timeline">
        {MILESTONES.map((m) => (
          <div key={m.year} className="journey-item">
            <div className="journey-dot">{m.icon}</div>
            <span className="journey-year">{m.year}</span>
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
            {m.image && (
              <div style={{
                marginTop: 18,
                borderRadius: 14,
                overflow: "hidden",
                border: "1.5px solid var(--border-gold-subtle)",
                boxShadow: "0 6px 20px rgba(12, 34, 25, 0.08)",
                maxWidth: 620
              }}>
                <img
                  src={m.image}
                  alt={m.title}
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    display: "block"
                  }}
                />
                {m.caption && (
                  <div style={{
                    padding: "10px 16px",
                    background: "#FAF6EE",
                    fontSize: "0.82rem",
                    color: "var(--green-dark)",
                    fontWeight: 600,
                    borderTop: "1px solid var(--border-gold-subtle)"
                  }}>
                    {m.caption}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Calling Box */}
      <div className="journey-calling-box">
        <h3>The Founding Word</h3>
        <p>
          "Not by might, nor by power, but by my Spirit, says the LORD of hosts." — Zechariah 4:6. This promise continues to guide our leaders and church family in every season of ministry.
        </p>
      </div>

      {/* Outcomes Strip */}
      <div className="journey-outcomes">
        <h3>What the Lord Has Done</h3>
        <p>
          Over the past three decades, countless individuals burdened by illness, fear, and hopelessness have experienced the mighty touch of Jesus Christ in our prayer sanctuary.
        </p>
        <div className="journey-outcomes-tags">
          {OUTCOMES.map((o) => (
            <span key={o} className="journey-outcomes-tag">
              ✓ {o} in Christ
            </span>
          ))}
        </div>
        <p style={{ fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--gold-bright)", margin: 0 }}>
          "To God be all the glory, great things He hath done!"
        </p>
      </div>
    </>
  );
}
