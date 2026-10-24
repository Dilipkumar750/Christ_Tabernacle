import { useEffect } from "react";
import jesusSaravananImg from "../../assets/jesus_saravanan.jpeg";
import saravananImg from "../../assets/saravanan.jpeg";
import saravanan3Img from "../../assets/saravanan3.jpeg";
import outdoorFellowshipImg from "../../assets/image1.jpeg";

const MILESTONES = [
  {
    year: "1991",
    icon: "🌱",
    badge: "The Beginning",
    title: "A Divine Calling Is Born",
    desc: "Eva. Glory Devapiriyam stepped out in radical faith and initiated a Gospel ministry with 15 faithful believers in a humble home, driven by a burning burden: to bring Christ's unyielding love to the needy and direct souls toward the Living God.",
    image: null,
  },
  {
    year: "2007",
    icon: "🌿",
    badge: "God's Blueprint",
    title: "Apostolic Gospel Prayer House",
    desc: "The Apostolic Gospel Prayer House was established as the Holy Spirit moved mightily. Pastor Saravanan Immanuel received the heavenly vision and divine mandate from our Lord Jesus Christ, ministering hand in hand to set captives free.",
    image: jesusSaravananImg,
    caption: "Pastor Saravanan Immanuel receiving the Lord Jesus' divine calling and apostolic mandate.",
  },
  {
    year: "Dec 2007",
    icon: "🕊️",
    badge: "Ordained",
    title: "Ordination & Ministerial Anointing",
    desc: "Pastor Immanuel Saravanan was officially ordained by Chief Pastor M. K. Sam Sundaram, ACA, and blessed by Pastor M. M. Jebaraj, ACA (Selavoyal Ministries) — marking an enduring milestone of spiritual authority and apostolic mandate.",
    image: saravananImg,
    caption: "Pastor Saravanan Immanuel ministering with the apostolic burden and power of the Holy Spirit.",
  },
  {
    year: "2016",
    icon: "✨",
    badge: "New Vision",
    title: "Christ's Tabernacle Church",
    desc: "The Lord revealed a new vision to establish and build a permanent sanctuary for all nations. Apostolic Gospel Prayer House transitioned into Christ's Tabernacle Church, consecrated and dedicated by Rev. I. Christdhas of Hope AG Church, Pallikaranai.",
    image: saravanan3Img,
    caption: "Senior Pastor Saravanan Immanuel at the sacred sanctuary pulpit of Christ's Tabernacle.",
  },
  {
    year: "Today",
    icon: "🔥",
    badge: "Present Day",
    title: "Continuing the Kingdom Mandate",
    desc: "Today, Christ's Tabernacle ministers each week to families across Chennai, empowering the next generation through Sunday School, fasting intercessions, dynamic worship, and supernatural demonstrations of God's grace.",
    image: outdoorFellowshipImg,
    caption: "Joyous gathering of the Christ's Tabernacle congregation praising the Lord in unity.",
  },
];

const OUTCOMES = [
  { label: "Delivered", icon: "🔓" },
  { label: "Healed",    icon: "💊" },
  { label: "Restored",  icon: "🕊️" },
  { label: "Equipped",  icon: "📖" },
];

function useReveal(sel) {
  useEffect(() => {
    const els = document.querySelectorAll(sel);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("jr-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sel]);
}

export default function Journey() {
  useReveal(".jr-reveal");

  return (
    <>
      <style>{`
        /* ── Reveal Animations ── */
        .jr-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1),
                      transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        .jr-reveal.jr-in { opacity: 1; transform: none; }

        /* ── Page Header (Light Sanctuary Theme) ── */
        .jr-header { margin-bottom: 56px; }
        .jr-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold-dark);
          font-weight: 700;
          padding: 6px 18px;
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 50px;
          background: rgba(214,182,107,0.12);
          margin-bottom: 20px;
        }
        .jr-header h2 {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4.5vw, 2.9rem);
          color: var(--green-deep);
          margin: 0 0 16px;
          font-weight: 900;
          line-height: 1.15;
        }
        .jr-header h2 em {
          font-style: italic;
          color: var(--gold-dark);
        }
        .jr-header p {
          font-size: 1.02rem;
          color: #374151;
          line-height: 1.85;
          max-width: 720px;
          margin: 0;
        }

        /* ── Timeline Container ── */
        .jr-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 46px;
        }
        /* Vertical timeline bar */
        .jr-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            #276D52 10%,
            #D6B66B 50%,
            #276D52 90%,
            transparent 100%
          );
          box-shadow: 0 0 8px rgba(214,182,107,0.25);
          z-index: 0;
        }

        /* ── Each Milestone: Left Image, Center Dot, Right Card ── */
        .jr-row {
          display: grid;
          grid-template-columns: 1fr 64px 1fr;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* ── Center dot ── */
        .jr-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .jr-dot {
          width: 50px;
          height: 50px;
          background: #FFFFFF;
          border: 2.5px solid var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          box-shadow:
            0 0 0 6px rgba(214,182,107,0.18),
            0 4px 14px rgba(18,45,36,0.1);
          transition: transform 0.35s, box-shadow 0.35s;
          flex-shrink: 0;
        }
        .jr-row:hover .jr-dot {
          transform: scale(1.15);
          box-shadow:
            0 0 0 9px rgba(214,182,107,0.28),
            0 8px 22px rgba(18,45,36,0.18);
          border-color: var(--gold-dark);
        }

        /* ── LEFT SIDE: Standalone Image ── */
        .jr-img-side {
          padding-right: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .jr-img-side.jr-no-img {
          justify-content: center;
        }

        .jr-img-box {
          width: 100%;
          max-width: 440px;
          border-radius: 18px;
          overflow: hidden;
          border: 1.5px solid rgba(214,182,107,0.4);
          box-shadow: 0 8px 26px rgba(18,45,36,0.08);
          background: #FFFFFF;
          transition: transform 0.4s cubic-bezier(.22,1,.36,1),
                      box-shadow 0.4s,
                      border-color 0.4s;
        }
        .jr-row:hover .jr-img-box {
          transform: translateY(-5px) scale(1.015);
          box-shadow: 0 14px 36px rgba(18,45,36,0.14);
          border-color: var(--gold);
        }
        .jr-img-box img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .jr-row:hover .jr-img-box img {
          transform: scale(1.05);
        }
        .jr-img-caption {
          padding: 12px 18px;
          background: #FAF6EE;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--green-deep);
          display: flex;
          align-items: center;
          gap: 10px;
          line-height: 1.45;
          border-top: 1px solid rgba(214,182,107,0.25);
        }
        .jr-img-caption .cap-cross { color: var(--gold-dark); flex-shrink: 0; }

        /* No image scripture box */
        .jr-no-img-block {
          width: 100%;
          max-width: 440px;
          padding: 28px 30px;
          background: #FFFFFF;
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 18px;
          text-align: right;
          box-shadow: 0 6px 22px rgba(18,45,36,0.06);
        }
        .jr-no-img-block blockquote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--green-deep);
          line-height: 1.7;
          margin: 0 0 10px;
        }
        .jr-no-img-block cite {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-dark);
          font-style: normal;
        }

        /* ── RIGHT SIDE: Content Card (Light Theme) ── */
        .jr-card-side {
          padding-left: 32px;
        }
        .jr-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 20px;
          padding: 32px 32px;
          box-shadow: 0 6px 24px rgba(18,45,36,0.06);
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
          position: relative;
          overflow: hidden;
        }
        /* Gold left accent border */
        .jr-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 5px;
          background: var(--grad-gold);
          border-radius: 4px 0 0 4px;
        }
        .jr-row:hover .jr-card {
          border-color: var(--gold);
          box-shadow: 0 14px 36px rgba(18,45,36,0.12);
          transform: translateY(-4px);
        }

        .jr-year-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .jr-year {
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-dark);
          background: rgba(214,182,107,0.14);
          border: 1px solid rgba(214,182,107,0.4);
          padding: 5px 14px;
          border-radius: 50px;
        }
        .jr-badge {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: #276D52;
          color: #FFFFFF;
          padding: 4px 12px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .jr-card h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          color: var(--green-deep);
          margin: 0 0 12px;
          font-weight: 700;
          line-height: 1.3;
        }
        .jr-card p {
          font-size: 0.96rem;
          color: #374151;
          line-height: 1.85;
          margin: 0;
        }

        /* ── Calling Quote ── */
        .jr-calling {
          margin-top: 60px;
          display: grid;
          grid-template-columns: 5px 1fr;
          border-radius: 18px;
          overflow: hidden;
          background: #FFFFFF;
          border: 1.5px solid rgba(214,182,107,0.35);
          box-shadow: 0 8px 28px rgba(18,45,36,0.06);
        }
        .jr-calling-bar { background: var(--grad-gold); }
        .jr-calling-body { padding: 30px 32px; }
        .jr-calling-body h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--green-deep);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .jr-calling-body p {
          font-size: 0.98rem;
          color: #374151;
          line-height: 1.8;
          margin: 0;
          font-style: italic;
        }

        /* ── Outcomes Banner (Light Sanctuary Theme) ── */
        .jr-outcomes {
          margin-top: 56px;
          background: linear-gradient(150deg, #FFFFFF 0%, #FAF6EE 100%);
          border-radius: 24px;
          padding: 56px 44px;
          text-align: center;
          border: 1.5px solid rgba(214,182,107,0.38);
          box-shadow: 0 10px 32px rgba(18,45,36,0.06);
          position: relative;
          overflow: hidden;
        }
        .jr-outcomes::before {
          content: '✝';
          position: absolute;
          top: -30px; left: 50%;
          transform: translateX(-50%);
          font-size: 200px;
          color: rgba(214,182,107,0.06);
          font-family: var(--font-serif);
          pointer-events: none;
        }
        .jr-outcomes-inner { position: relative; z-index: 1; }
        .jr-outcomes h3 {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          color: var(--green-deep);
          margin: 0 0 12px;
          font-weight: 700;
        }
        .jr-outcomes-sub {
          font-size: 1rem;
          color: #374151;
          line-height: 1.8;
          margin: 0 auto 36px;
          max-width: 600px;
        }
        .jr-outcomes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 36px;
        }
        .jr-outcome-card {
          background: #FFFFFF;
          border: 1.5px solid rgba(214,182,107,0.3);
          border-radius: 18px;
          padding: 24px 14px;
          box-shadow: 0 4px 14px rgba(18,45,36,0.04);
          transition: background 0.3s, transform 0.3s, border-color 0.3s;
        }
        .jr-outcome-card:hover {
          background: #FAF6EE;
          border-color: var(--gold);
          transform: translateY(-5px);
        }
        .jr-outcome-icon { font-size: 2rem; display: block; margin-bottom: 12px; }
        .jr-outcome-label {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--green-deep);
          line-height: 1.5;
        }
        .jr-outcomes-quote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--gold-dark);
          margin: 0;
        }

        /* ── Mobile Stacking ── */
        @media (max-width: 860px) {
          .jr-timeline::before { left: 24px; transform: none; }
          .jr-row {
            grid-template-columns: 50px 1fr;
            grid-template-areas:
              "dot card"
              ". img";
            gap: 16px 16px;
          }
          .jr-center {
            grid-area: dot;
            align-items: center;
          }
          .jr-img-side {
            grid-area: img;
            padding: 0 0 0 10px;
            align-items: flex-start;
          }
          .jr-img-box { max-width: 100%; }
          .jr-no-img-block { max-width: 100%; text-align: left; }
          .jr-card-side { grid-area: card; padding-left: 0; }
          .jr-timeline { gap: 48px; }
          .jr-outcomes { padding: 40px 20px; }
          .jr-outcomes-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ── Page Header ── */}
      <div className="jr-header jr-reveal">
        <div className="jr-eyebrow">✝ Our Sacred Heritage</div>
        <h2>
          A Story Written by<br />
          <em>God's Faithfulness</em>
        </h2>
        <p>
          The ministry of Christ's Tabernacle was not built on worldly strength or human wisdom,
          but born out of prayer, sustained through intercession, and established upon the
          uncompromised Word of God. From 15 saints in 1991 to a vibrant church family today —
          every step marked by divine deliverance, supernatural healing, and transformed hearts.
        </p>
      </div>

      {/* ── Timeline: Left Image, Right Card ── */}
      <div className="jr-timeline">
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            className="jr-row jr-reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* LEFT — Standalone Image Box or Scripture */}
            <div className={`jr-img-side${!m.image ? " jr-no-img" : ""}`}>
              {m.image ? (
                <div className="jr-img-box">
                  <img src={m.image} alt={m.title} />
                  {m.caption && (
                    <div className="jr-img-caption">
                      <span className="cap-cross">✝</span>
                      {m.caption}
                    </div>
                  )}
                </div>
              ) : (
                <div className="jr-no-img-block">
                  <blockquote>
                    "Not by might, nor by power, but by my Spirit, says the LORD of hosts."
                  </blockquote>
                  <cite>— Zechariah 4:6</cite>
                </div>
              )}
            </div>

            {/* CENTER — Timeline Dot */}
            <div className="jr-center">
              <div className="jr-dot" aria-hidden="true">{m.icon}</div>
            </div>

            {/* RIGHT — Content Card */}
            <div className="jr-card-side">
              <div className="jr-card">
                <div className="jr-year-badge">
                  <span className="jr-year">{m.year}</span>
                  <span className="jr-badge">{m.badge}</span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Calling Quote ── */}
      <div className="jr-calling jr-reveal">
        <div className="jr-calling-bar" aria-hidden="true" />
        <div className="jr-calling-body">
          <h3>The Founding Word</h3>
          <p>
            "Not by might, nor by power, but by my Spirit, says the LORD of hosts." — Zechariah 4:6.
            This promise continues to guide our leaders and church family in every season of ministry.
          </p>
        </div>
      </div>

      {/* ── Outcomes Banner ── */}
      <div className="jr-outcomes jr-reveal">
        <div className="jr-outcomes-inner">
          <h3>What the Lord Has Done</h3>
          <p className="jr-outcomes-sub">
            Over the past three decades, countless individuals burdened by illness, fear, and
            hopelessness have experienced the mighty touch of Jesus Christ in our prayer sanctuary.
          </p>
          <div className="jr-outcomes-grid">
            {OUTCOMES.map((o) => (
              <div key={o.label} className="jr-outcome-card">
                <span className="jr-outcome-icon">{o.icon}</span>
                <span className="jr-outcome-label">{o.label}<br />in Christ</span>
              </div>
            ))}
          </div>
          <p className="jr-outcomes-quote">
            "To God be all the glory, great things He hath done!"
          </p>
        </div>
      </div>
    </>
  );
}
