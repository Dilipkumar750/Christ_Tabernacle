import { Link } from "react-router-dom";

const FOOTER_NAV = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", path: "/" },
      { label: "About Us", path: "/about" },
      { label: "Sermons", path: "/sermons" },
      { label: "Events", path: "/events" },
      { label: "Gallery", path: "/gallery" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    heading: "Ministries",
    links: [
      { label: "Children's Ministry", path: "/ministries#children" },
      { label: "Youth Ministry", path: "/ministries#youth" },
      { label: "Women's Ministry", path: "/ministries#women" },
      { label: "Men's Ministry", path: "/ministries#men" },
      { label: "Prayer Ministry", path: "/ministries#prayer" },
      { label: "Outreach", path: "/ministries#outreach" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Devotionals", path: "/resources#devotionals" },
      { label: "Bible Study", path: "/resources#bible-study" },
      { label: "Sermon Notes", path: "/resources#notes" },
      { label: "Testimonials", path: "/testimonials" },
      { label: "Prayer Request", path: "/contact#prayer" },
      { label: "Give Online", path: "/give" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    id: "footer-youtube",
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    ),
  },
  {
    id: "footer-facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
      </svg>
    ),
  },
  {
    id: "footer-instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
      </svg>
    ),
  },
];

const SERVICE_TIMES = [
  { day: "Sunday Service", time: "8:15 AM – 11:15 AM" },
  { day: "Prayer Meeting", time: "New Moon & Full Moon Days" },
  { day: "Evening Prayer", time: "7:00 PM – 8:30 PM" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        :root {
          --blush:  #E8B7B7;
          --green:  #184332;
          --gold:   #D6B66B;
          --ivory:  #FAF6EE;
          --font-serif: 'Playfair Display', Georgia, serif;
          --font-sans:  'Inter', system-ui, sans-serif;
        }

        /* ── CTA Banner ── */
        .ct-footer-cta {
          background: linear-gradient(135deg, var(--green) 0%, #1a5040 50%, var(--green) 100%);
          padding: 60px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          font-family: var(--font-sans);
        }
        .ct-footer-cta::before {
          content: '✝';
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 120px;
          color: rgba(232, 183, 183, 0.05);
          pointer-events: none;
        }
        .ct-footer-cta-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blush);
          margin-bottom: 10px;
          font-weight: 600;
        }
        .ct-footer-cta h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 4vw, 2.5rem);
          color: var(--ivory);
          margin: 0 0 12px;
          font-weight: 700;
          line-height: 1.2;
        }
        .ct-footer-cta h2 span { color: var(--gold); }
        .ct-footer-cta p {
          color: rgba(250, 246, 238, 0.7);
          font-size: 0.95rem;
          margin: 0 0 28px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.65;
        }
        .ct-footer-cta-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ct-btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: var(--green);
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 13px 26px;
          border-radius: 50px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          box-shadow: 0 4px 20px rgba(214, 182, 107, 0.35);
        }
        .ct-btn-gold:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(214, 182, 107, 0.45);
          background: #e5c47e;
        }
        .ct-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--ivory);
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 13px 26px;
          border-radius: 50px;
          border: 2px solid rgba(250, 246, 238, 0.35);
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .ct-btn-outline:hover {
          border-color: var(--blush);
          background: rgba(232, 183, 183, 0.1);
          transform: translateY(-3px);
        }

        /* ── Main Footer ── */
        .ct-footer {
          background: #0f2a1f;
          color: rgba(250, 246, 238, 0.75);
          font-family: var(--font-sans);
        }
        .ct-footer-main {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 24px 40px;
          display: grid;
          grid-template-columns: 1.6fr repeat(3, 1fr);
          gap: 40px;
        }

        /* ── Brand Column ── */
        .ct-footer-brand {}
        .ct-footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          margin-bottom: 20px;
        }
        .ct-footer-logo-icon {
          width: 46px;
          height: 46px;
          background: linear-gradient(135deg, var(--green), #1e5c42);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(214, 182, 107, 0.4);
        }
        .ct-footer-logo-icon svg { width: 24px; height: 24px; fill: var(--gold); }
        .ct-footer-logo-text .name {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          color: var(--ivory);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
          line-height: 1.2;
        }
        .ct-footer-logo-text .sub {
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-top: 2px;
        }
        .ct-footer-tagline {
          font-style: italic;
          font-size: 0.9rem;
          color: var(--blush);
          margin: 0 0 16px;
          font-family: var(--font-serif);
          line-height: 1.5;
        }
        .ct-footer-desc {
          font-size: 0.83rem;
          line-height: 1.75;
          color: rgba(250, 246, 238, 0.55);
          margin: 0 0 24px;
          max-width: 280px;
        }

        /* Service Times Card */
        .ct-service-card {
          background: rgba(255,255,255, 0.04);
          border: 1px solid rgba(214, 182, 107, 0.15);
          border-radius: 12px;
          padding: 16px 18px;
          margin-bottom: 22px;
        }
        .ct-service-card-title {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ct-service-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 0.8rem;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          gap: 10px;
        }
        .ct-service-row:last-child { border-bottom: none; padding-bottom: 0; }
        .ct-service-row .day { color: var(--blush); font-weight: 500; }
        .ct-service-row .time { color: rgba(250,246,238,0.6); text-align: right; font-size: 0.76rem; }

        /* Socials */
        .ct-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ct-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(214, 182, 107, 0.15);
          color: rgba(250,246,238,0.6);
          text-decoration: none;
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s;
        }
        .ct-social-btn:hover {
          background: var(--gold);
          color: var(--green);
          border-color: var(--gold);
          transform: translateY(-3px);
        }

        /* ── Nav Columns ── */
        .ct-footer-col h4 {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
          margin: 0 0 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(214, 182, 107, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ct-footer-col h4::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 2px;
          background: var(--gold);
          border-radius: 2px;
          flex-shrink: 0;
        }
        .ct-footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .ct-footer-col ul li a {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: rgba(250, 246, 238, 0.55);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.2s, padding-left 0.2s;
        }
        .ct-footer-col ul li a::before {
          content: '›';
          color: var(--blush);
          font-size: 1.1rem;
          line-height: 1;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .ct-footer-col ul li a:hover {
          color: var(--ivory);
          padding-left: 4px;
        }
        .ct-footer-col ul li a:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Divider ── */
        .ct-footer-divider {
          max-width: 1280px;
          margin: 0 auto;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(214, 182, 107, 0.25), transparent);
        }

        /* ── Bottom Bar ── */
        .ct-footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .ct-footer-copy {
          font-size: 0.78rem;
          color: rgba(250, 246, 238, 0.35);
        }
        .ct-footer-copy a {
          color: var(--gold);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ct-footer-copy a:hover { color: var(--blush); }
        .ct-footer-verse {
          font-style: italic;
          font-size: 0.75rem;
          color: rgba(250, 246, 238, 0.3);
          font-family: var(--font-serif);
          text-align: right;
        }
        .ct-footer-verse span { color: var(--blush); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ct-footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .ct-footer-brand { grid-column: 1 / -1; }
          .ct-footer-desc { max-width: 100%; }
        }
        @media (max-width: 600px) {
          .ct-footer-main {
            grid-template-columns: 1fr;
            padding: 40px 20px 28px;
            gap: 28px;
          }
          .ct-footer-cta { padding: 44px 20px; }
          .ct-footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 18px 20px;
          }
          .ct-footer-verse { text-align: center; }
        }
      `}</style>

      {/* ── CTA Pre-Footer ── */}
      <section className="ct-footer-cta" aria-labelledby="footer-cta-heading">
        <p className="ct-footer-cta-eyebrow">✝ You Are Welcome Here</p>
        <h2 id="footer-cta-heading">
          Join Us in <span>Worship</span> &amp; Community
        </h2>
        <p>
          Be part of a loving church family passionate about prayer, the Word,
          and reaching our community with the love of God.
        </p>
        <div className="ct-footer-cta-actions">
          <Link to="/contact" className="ct-btn-gold" id="footer-plan-visit-btn">
            Plan a Visit →
          </Link>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-btn-outline"
            id="footer-watch-live-btn"
          >
            📡 Watch Live
          </a>
        </div>
      </section>

      {/* ── Main Footer ── */}
      <footer className="ct-footer" aria-label="Site footer">
        <div className="ct-footer-main">

          {/* Brand Column */}
          <div className="ct-footer-brand">
            <Link to="/" className="ct-footer-logo" aria-label="Christ's Tabernacle Home">
              <div className="ct-footer-logo-icon">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="2" width="4" height="28" rx="2"/>
                  <rect x="6" y="8" width="20" height="4" rx="2"/>
                </svg>
              </div>
              <div className="ct-footer-logo-text">
                <span className="name">Christ's Tabernacle</span>
                <span className="sub">Prayer &amp; Worship Centre</span>
              </div>
            </Link>

            <p className="ct-footer-tagline">"Faith · Family · Future"</p>
            <p className="ct-footer-desc">
              A house of prayer for all nations. We are passionate about exalting
              Jesus Christ, equipping believers, and reaching our community with
              the love and power of God.
            </p>

            {/* Service Times */}
            <div className="ct-service-card" role="complementary" aria-label="Service times">
              <div className="ct-service-card-title">
                🕐 Service Times
              </div>
              {SERVICE_TIMES.map((s) => (
                <div className="ct-service-row" key={s.day}>
                  <span className="day">{s.day}</span>
                  <span className="time">{s.time}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <nav aria-label="Social media links">
              <div className="ct-socials">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-social-btn"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Nav Columns */}
          {FOOTER_NAV.map((col) => (
            <nav key={col.heading} className="ct-footer-col" aria-label={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.path}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="ct-footer-divider" role="separator" />

        {/* Bottom Bar */}
        <div className="ct-footer-bottom">
          <p className="ct-footer-copy">
            © {year} Christ's Tabernacle — Prayer &amp; Worship Centre.{" "}
            <Link to="/privacy">Privacy Policy</Link> ·{" "}
            <Link to="/terms">Terms</Link>
          </p>
          <p className="ct-footer-verse">
            <span>"But as for me and my house,</span> we will serve the LORD."
            <br />— Joshua 24:15
          </p>
        </div>
      </footer>
    </>
  );
}
