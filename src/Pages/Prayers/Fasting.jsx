const FASTING_SCHEDULE = [
  {
    title: "New Moon & Full Moon All-Night Vigils",
    timing: "Monthly • 10:00 PM – 4:30 AM",
    focus: "Prevailing Intercession, Spiritual Breakthrough & Deliverance from Generational Bondages",
    icon: "🌙",
  },
  {
    title: "Tuesday Evening Fasting Prayer",
    timing: "Weekly • 7:00 PM – 8:30 PM",
    focus: "Prayer for the Sick, Divine Healing, Family Restoration & Church Growth",
    icon: "🕯️",
  },
  {
    title: "Friday Intercessory Fasting Vigil",
    timing: "Weekly • 7:00 PM – 8:30 PM",
    focus: "Spiritual Warfare, Youth Empowerment, Missions & Revival in Chennai and India",
    icon: "🔥",
  },
  {
    title: "21-Day Consecration Fast",
    timing: "Annual Church-wide Fast in January",
    focus: "Personal holiness, seeking God's prophetic guidance for the New Year",
    icon: "📜",
  },
];

export default function Fasting() {
  return (
    <>
      <style>{`
        .fasting-hero-box {
          background: linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold);
          padding: 42px 36px;
          color: var(--text-main);
          margin-bottom: 44px;
          box-shadow: 0 4px 20px rgba(18, 45, 36, 0.05);
        }
        .fasting-hero-box h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          margin: 10px 0 14px;
          color: var(--green-dark);
        }
        .fasting-hero-box h2 span { color: var(--gold-dark); }
        .fasting-hero-box p {
          color: #374151;
          font-size: 1rem;
          line-height: 1.75;
          max-width: 720px;
          margin: 0;
        }

        .fasting-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin: 32px 0 48px;
        }
        .fasting-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 18px;
          padding: 30px 26px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s, border-color 0.25s;
        }
        .fasting-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold);
        }
        .fasting-card-icon {
          font-size: 2.2rem;
          margin-bottom: 12px;
          display: block;
        }
        .fasting-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--green-dark);
          margin: 0 0 6px;
          font-weight: 700;
        }
        .fasting-card-time {
          font-size: 0.78rem;
          color: var(--gold-dark);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          display: block;
        }
        .fasting-card-focus {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0;
        }

        .fasting-guidelines {
          background: var(--ivory);
          border-radius: 18px;
          border: 1px solid var(--border-gold-subtle);
          padding: 36px 32px;
        }
        .fasting-guidelines h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--green-dark);
          margin: 0 0 16px;
        }

        @media (max-width: 768px) {
          .fasting-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="fasting-hero-box">
        <span className="ct-badge ct-badge-gold">† The Power of Humility &amp; Sacrifice †</span>
        <h2>
          Fasting <span>&amp; Deliverance Prayers</span>
        </h2>
        <p>
          "Is not this the fast that I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke?" — Isaiah 58:6. At Christ's Tabernacle, fasting prayer is the engine room of our spiritual power.
        </p>
      </div>

      {/* Schedule Grid */}
      <section aria-labelledby="schedule-heading">
        <h3 id="schedule-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--green-dark)" }}>
          Fasting Prayer Gatherings
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Join our prayer warriors as we seek the face of God in corporate consecrated fasting.
        </p>

        <div className="fasting-grid">
          {FASTING_SCHEDULE.map((item) => (
            <div key={item.title} className="fasting-card">
              <span className="fasting-card-icon" aria-hidden="true">{item.icon}</span>
              <h4 className="fasting-card-title">{item.title}</h4>
              <span className="fasting-card-time">{item.timing}</span>
              <p className="fasting-card-focus">
                <strong>Prayer Focus:</strong> {item.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Guidelines Box */}
      <div className="fasting-guidelines">
        <h3>Biblical Principles for an Acceptable Fast</h3>
        <ul style={{ paddingLeft: "20px", color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
          <li>
            <strong>Purity of Motive:</strong> Fast not for human applause, but in secret before your Heavenly Father (Matthew 6:16–18).
          </li>
          <li>
            <strong>Feed on the Word:</strong> Dedicate the hours saved from meal preparation to immersing yourself in Scripture and intercessory prayer.
          </li>
          <li>
            <strong>Confession &amp; Forgiveness:</strong> Let your fast be accompanied by repentance, forgiving those who offended you, and reconciliation.
          </li>
          <li>
            <strong>Expect Miracles:</strong> Approach God with unwavering faith knowing that "this kind does not go out except by prayer and fasting" (Matthew 17:21).
          </li>
        </ul>
      </div>
    </>
  );
}
