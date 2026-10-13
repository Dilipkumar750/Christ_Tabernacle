import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpeg";
import { FaClock, FaChevronRight } from "react-icons/fa";

const CURRENT_YEAR = new Date().getFullYear();

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "Our Journey & Story", path: "/about/journey" },
  { label: "Our Motto & Pillars", path: "/about/motto" },
  { label: "Our Vision", path: "/about/vision" },
  { label: "Our Mission", path: "/about/mission" },
  { label: "Statement of Faith", path: "/about/faith" },
  { label: "Testimonies", path: "/testimonies" },
  { label: "Connect & Visit", path: "/contact" },
];

const MINISTRIES = [
  { label: "Sunday Worship Service", path: "/prayers/sunday-services" },
  { label: "Fasting & Deliverance Prayer", path: "/prayers/fasting" },
  { label: "Transformation Prayer", path: "/prayers/transformation" },
  { label: "Discipleship Prayer", path: "/prayers/discipleship" },
  { label: "Sunday School & Youth", path: "/prayers/sunday-school" },
  { label: "Prayer & Intercession", path: "/contact" },
];

const RESOURCES = [
  { label: "Sunday Sermons Archive", path: "/sermons/sunday" },
  { label: "Bible Study Notes", path: "/sermons/bible-study" },
  { label: "Worship Song Lyrics", path: "/songs/lyrics" },
  { label: "Worship Audio Tracks", path: "/songs/audio" },
  { label: "Photo Gallery", path: "/media/photos" },
  { label: "Video Messages", path: "/media/videos" },
];

const SERVICE_TIMES = [
  { day: "Sunday Worship & Communion", time: "8:15 AM – 11:15 AM" },
  { day: "Fasting & Deliverance Prayer", time: "New Moon & Full Moon Days" },
  { day: "Evening Intercessory Prayer", time: "7:00 PM – 8:30 PM" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        /* ── Pre-Footer CTA Banner ── */
        .ct-footer-cta {
          background: 
            radial-gradient(ellipse at 50% 0%, rgba(214, 182, 107, 0.2) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 100%, rgba(50, 132, 100, 0.32) 0%, transparent 50%),
            linear-gradient(140deg, #0C2419 0%, #133929 18%, #184332 42%, #1E5540 68%, #276D52 88%, #328464 100%);
          padding: 68px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          font-family: var(--font-sans);
          border-top: 2px solid var(--border-gold);
          border-bottom: 2px solid var(--border-gold-subtle);
        }
        .ct-footer-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(214,182,107,0.12) 0%, transparent 55%);
          pointer-events: none;
        }
        .ct-footer-cta::before {
          content: '✝';
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 140px;
          color: rgba(214, 182, 107, 0.05);
          pointer-events: none;
          font-family: var(--font-serif);
        }
        .ct-footer-cta-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 10px;
          font-weight: 700;
        }
        .ct-footer-cta h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          color: var(--ivory);
          margin: 0 0 12px;
          font-weight: 700;
          line-height: 1.25;
        }
        .ct-footer-cta h2 span { color: var(--gold-bright); }
        .ct-footer-cta p {
          color: rgba(250, 246, 238, 0.78);
          font-size: 0.98rem;
          margin: 0 auto 30px;
          max-width: 580px;
          line-height: 1.7;
        }
        .ct-footer-cta-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* ── Main Footer Body ── */
        .ct-footer-body {
          background: 
            radial-gradient(circle at 10% 20%, rgba(42, 110, 84, 0.25) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(214, 182, 107, 0.15) 0%, transparent 45%),
            linear-gradient(165deg, #0B2217 0%, #113425 25%, #184332 55%, #1F5741 85%, #133929 100%);
          color: var(--ivory);
          padding: 70px 24px 40px;
          font-family: var(--font-sans);
          border-top: 1px solid rgba(214, 182, 107, 0.25);
        }
        .ct-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 40px;
        }

        /* Col 1: About */
        .ct-footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ct-footer-logo-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--gold);
          box-shadow: 0 0 12px rgba(214, 182, 107, 0.35);
          object-fit: cover;
          background: #fff;
        }
        .ct-footer-brand-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ivory);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ct-footer-brand-sub {
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-light);
          display: block;
        }
        .ct-footer-desc {
          font-size: 0.88rem;
          color: rgba(250, 246, 238, 0.7);
          line-height: 1.75;
          margin-bottom: 20px;
        }

        /* Service Times Box */
        .ct-footer-times-box {
          background: rgba(9, 28, 19, 0.7);
          border: 1px solid var(--border-gold-subtle);
          border-radius: 12px;
          padding: 16px 18px;
          margin-top: 18px;
        }
        .ct-footer-times-title {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ct-footer-time-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          padding: 5px 0;
          border-bottom: 1px dashed rgba(214, 182, 107, 0.15);
          color: rgba(250, 246, 238, 0.85);
        }
        .ct-footer-time-row:last-child { border-bottom: none; }
        .ct-footer-time-val { color: var(--gold-light); font-weight: 600; }

        /* Col 2 & 3: Lists */
        .ct-footer-col h3 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--gold-bright);
          margin: 0 0 18px;
          letter-spacing: 0.02em;
          position: relative;
          display: inline-block;
        }
        .ct-footer-col h3::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 32px;
          height: 2px;
          background: var(--gold);
        }
        .ct-footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .ct-footer-list li {
          margin-bottom: 10px;
        }
        .ct-footer-list a {
          font-size: 0.86rem;
          color: rgba(250, 246, 238, 0.75);
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .ct-footer-list a:hover {
          color: var(--gold-bright);
          transform: translateX(4px);
        }

        /* Col 4: Scripture & Promise */
        .ct-footer-promise-card {
          background: rgba(214, 182, 107, 0.08);
          border: 1px solid var(--border-gold);
          border-radius: 14px;
          padding: 20px;
          margin-top: 16px;
        }
        .ct-footer-promise-verse {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.95rem;
          color: var(--ivory);
          line-height: 1.65;
          margin-bottom: 8px;
        }
        .ct-footer-promise-ref {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--gold-light);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Bottom Bar ── */
        .ct-footer-bottom {
          background: linear-gradient(90deg, #091E15 0%, #113626 50%, #091E15 100%);
          border-top: 1px solid rgba(214, 182, 107, 0.18);
          padding: 22px 24px;
          font-size: 0.8rem;
          color: rgba(250, 246, 238, 0.7);
        }
        .ct-footer-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ct-footer-bottom a {
          color: rgba(250, 246, 238, 0.7);
          transition: color 0.2s;
        }
        .ct-footer-bottom a:hover {
          color: var(--gold-light);
        }

        @media (max-width: 992px) {
          .ct-footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }
        @media (max-width: 600px) {
          .ct-footer-inner {
            grid-template-columns: 1fr;
          }
          .ct-footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      {/* ── Pre-Footer CTA ── */}
      <section className="ct-footer-cta" aria-labelledby="footer-cta-heading">
        <div className="ct-container">
          <p className="ct-footer-cta-eyebrow">† A House of Prayer for All Nations</p>
          <h2 id="footer-cta-heading">
            Experience the <span>Transforming Presence</span> of God
          </h2>
          <p>
            Whether you are seeking healing, spiritual restoration, or a welcoming church family to worship with, our sanctuary doors are always open to you.
          </p>
          <div className="ct-footer-cta-actions">
            <Link to="/contact" className="ct-btn-gold">
              Plan Your Visit
            </Link>
            <Link to="/prayers/sunday-services" className="ct-btn-outline-gold">
              Service Schedules
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Footer ── */}
      <footer className="ct-footer-body" role="contentinfo">
        <div className="ct-footer-inner">
          {/* Col 1: Brand & Service Times */}
          <div>
            <div className="ct-footer-brand-logo">
              <img
                src={logoImg}
                alt="Christ's Tabernacle Emblem"
                className="ct-footer-logo-img"
              />
              <div>
                <span className="ct-footer-brand-title">Christ's Tabernacle</span>
                <span className="ct-footer-brand-sub">Prayer &amp; Worship Centre</span>
              </div>
            </div>
            <p className="ct-footer-desc">
              Dedicated to preaching the Full Gospel of Jesus Christ, ministering divine healing, bringing deliverance to the captive, and making disciples of all nations since 1991.
            </p>

            <div className="ct-footer-times-box">
              <div className="ct-footer-times-title">
                <FaClock style={{ fontSize: "0.8rem" }} /> Service Schedule
              </div>
              {SERVICE_TIMES.map((st) => (
                <div key={st.day} className="ct-footer-time-row">
                  <span>{st.day}</span>
                  <span className="ct-footer-time-val">{st.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="ct-footer-col">
            <h3>Explore</h3>
            <ul className="ct-footer-list">
              {QUICK_LINKS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}><FaChevronRight style={{ fontSize: "0.65rem", opacity: 0.6 }} /> {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ministries */}
          <div className="ct-footer-col">
            <h3>Ministries</h3>
            <ul className="ct-footer-list">
              {MINISTRIES.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}><FaChevronRight style={{ fontSize: "0.65rem", opacity: 0.6 }} /> {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Resources & Weekly Promise */}
          <div className="ct-footer-col">
            <h3>Resources &amp; Media</h3>
            <ul className="ct-footer-list">
              {RESOURCES.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}><FaChevronRight style={{ fontSize: "0.65rem", opacity: 0.6 }} /> {item.label}</Link>
                </li>
              ))}
            </ul>

            <div className="ct-footer-promise-card">
              <p className="ct-footer-promise-verse">
                "For where two or three gather in my name, there am I with them."
              </p>
              <span className="ct-footer-promise-ref">— Matthew 18:20</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Bottom Copyright ── */}
      <div className="ct-footer-bottom">
        <div className="ct-footer-bottom-inner">
          <div>
            © {CURRENT_YEAR} Christ's Tabernacle — Prayer &amp; Worship Centre. All rights reserved.
          </div>
          <div>
            <span style={{ color: "var(--gold-bright)", fontStyle: "italic", fontFamily: "var(--font-serif)" }}>
              "Faith · Family · Future"
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
