import { Link } from "react-router-dom";

const SERVICE_ORDER = [
  { step: "1", time: "8:15 AM", title: "Opening Prayer & Thanksgiving", desc: "Consecrating the sanctuary, thanksgiving for the week's mercies, and invoking the presence of the Holy Spirit." },
  { step: "2", time: "8:30 AM", title: "Praise & Anointed Worship", desc: "Corporate praise led by the choir and worship team with traditional and contemporary songs of the Cross." },
  { step: "3", time: "9:20 AM", title: "Testimonies & Pastoral Announcements", desc: "Believers declare miraculous healings and answers to prayer, followed by church family updates." },
  { step: "4", time: "9:40 AM", title: "Proclamation of the Living Word", desc: "In-depth expository preaching by Pastor Saravanan Immanuel focusing on deliverance, holiness, and faith." },
  { step: "5", time: "10:35 AM", title: "The Holy Communion (Lord's Supper)", desc: "Partaking in the bread and cup in holy reverent remembrance of Christ's broken body and shed blood." },
  { step: "6", time: "10:55 AM", title: "Altar Ministry & Healing Prayer", desc: "Anointing with oil and personal prayer for the sick, brokenhearted, and those seeking spiritual deliverance." },
  { step: "7", time: "11:15 AM", title: "Apostolic Benediction & Fellowship", desc: "Closing pastoral blessing over families, followed by warm tea and Christian fellowship." },
];

export default function SundayServices() {
  return (
    <>
      <style>{`
        .service-banner {
          background: var(--grad-sanctuary);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold);
          padding: 40px 36px;
          color: var(--ivory);
          margin-bottom: 44px;
          box-shadow: var(--shadow-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .service-banner h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          margin: 6px 0;
          color: var(--ivory);
        }
        .service-banner h2 span { color: var(--gold-bright); }

        .service-order-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 30px 0 44px;
        }
        .service-order-item {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s, border-color 0.2s;
        }
        .service-order-item:hover {
          transform: translateX(4px);
          border-color: var(--gold);
        }
        .service-step-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--grad-sanctuary);
          color: var(--gold-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
          border: 1.5px solid var(--gold);
        }
        .service-step-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--green-dark);
          margin: 0 0 4px;
          font-weight: 700;
        }
        .service-step-time {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--gold-dark);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .service-step-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0;
        }

        .service-expect-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 24px;
        }
        .service-expect-card {
          background: var(--white);
          border: 1px solid var(--border-gold-subtle);
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: var(--shadow-sm);
        }
        .service-expect-card h4 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--green);
          margin: 10px 0 8px;
        }
        .service-expect-card p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 820px) {
          .service-expect-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Main Banner */}
      <div className="service-banner">
        <div>
          <span className="ct-badge ct-badge-dark">† Weekly Celebration of the Lord †</span>
          <h2>
            Sunday Morning <span>Worship &amp; Communion</span>
          </h2>
          <p style={{ color: "rgba(250, 246, 238, 0.8)", fontSize: "0.98rem", margin: 0 }}>
            Every Sunday • 8:15 AM – 11:15 AM IST • Tamil &amp; English Fellowship
          </p>
        </div>
        <Link to="/contact" className="ct-btn-gold">
          Plan Your Visit 🙏
        </Link>
      </div>

      {/* Order of Service */}
      <section aria-labelledby="order-heading">
        <h3 id="order-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--green-dark)" }}>
          Order of Sunday Worship Service
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Our services are reverent, Spirit-led, and centered on Christ's presence and holy fellowship.
        </p>

        <div className="service-order-list">
          {SERVICE_ORDER.map((item) => (
            <div key={item.step} className="service-order-item">
              <div className="service-step-badge">{item.step}</div>
              <div>
                <span className="service-step-time">⏱️ {item.time}</span>
                <h4 className="service-step-title">{item.title}</h4>
                <p className="service-step-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to Expect */}
      <section aria-labelledby="expect-heading" style={{ marginTop: 50 }}>
        <h3 id="expect-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--green-dark)" }}>
          What to Expect as a Visitor
        </h3>
        <div className="service-expect-grid">
          <div className="service-expect-card">
            <span style={{ fontSize: "2rem" }}>🤝</span>
            <h4>Warm Christian Welcome</h4>
            <p>
              From the moment you step through our sanctuary doors, our ushers and hospitality team will welcome you with the love of Christ.
            </p>
          </div>
          <div className="service-expect-card">
            <span style={{ fontSize: "2rem" }}>👶</span>
            <h4>Children &amp; Sunday School</h4>
            <p>
              Age-appropriate Bible lessons and fun spiritual activities during service for toddlers, kids, and adolescents.
            </p>
          </div>
          <div className="service-expect-card">
            <span style={{ fontSize: "2rem" }}>🙌</span>
            <h4>Personal Prayer &amp; Anointing</h4>
            <p>
              At the close of each service, Pastor and our intercessors minister individually to all who need healing, counsel, or deliverance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
