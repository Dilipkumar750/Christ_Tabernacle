import { useState } from "react";
import logoImg from "../../assets/logo.jpeg";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "Healing",
    message: "",
    confidential: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: start;
        }

        .contact-form-card {
          background: var(--white);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold);
          padding: 38px 34px;
          box-shadow: var(--shadow-md);
        }

        .contact-info-card {
          background: var(--white);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold-subtle);
          padding: 34px 28px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .contact-info-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--grad-sanctuary);
          color: var(--gold-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
          border: 1px solid var(--border-gold);
        }
        .contact-info-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--green-dark);
          margin: 0 0 4px;
          font-weight: 700;
        }
        .contact-info-text {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0;
        }

        .contact-social-row {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .contact-social-btn {
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid var(--border-gold-subtle);
          background: var(--ivory);
          color: var(--green);
          text-decoration: none;
          transition: all 0.2s;
        }
        .contact-social-btn:hover {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
          border-color: var(--gold);
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 920px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .contact-form-grid { grid-template-columns: 1fr; }
          .contact-form-card { padding: 26px 20px; }
          .contact-info-card { padding: 26px 20px; }
        }
      `}</style>

      {/* Hero */}
      <section className="ct-page-hero" aria-labelledby="contact-title">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <img
            src={logoImg}
            alt="Christ's Tabernacle Emblem"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "3px solid var(--gold)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
              background: "#fff",
            }}
          />
        </div>
        <div className="ct-page-hero-eyebrow">† We Are Here to Pray With You †</div>
        <h1 id="contact-title" className="ct-page-hero-title">
          Connect <span>With Us</span>
        </h1>
        <p className="ct-page-hero-desc">
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." — Philippians 4:6.
        </p>
      </section>

      {/* Main Container */}
      <div className="ct-container" style={{ padding: "50px 24px 80px" }}>
        <div className="contact-layout">
          {/* Form */}
          <div className="contact-form-card">
            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "40px 16px" }}>
                <span style={{ fontSize: "3.2rem" }}>🙏</span>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--green-dark)", fontSize: "1.8rem", margin: "14px 0 8px" }}>
                  Your Prayer Request is Received
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 20px" }}>
                  Pastor Saravanan Immanuel and our dedicated intercessory team will hold your request in prayer before the altar of God. May the Lord bring peace, healing, and answer your heart's cry!
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", contact: "", category: "Healing", message: "", confidential: true });
                  }}
                  className="ct-btn-gold"
                >
                  Submit Another Prayer Request
                </button>
              </div>
            ) : (
              <div>
                <span className="ct-badge" style={{ marginBottom: 10 }}>† Altar of Intercession †</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--green-dark)", margin: "4px 0 8px" }}>
                  Send a Prayer Request or Message
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: 24, lineHeight: 1.6 }}>
                  Our pastoral care team intercedes daily for each request received. Please share how we can stand in faith with you.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="contact-form-grid">
                    <div className="ct-form-group">
                      <label className="ct-form-label">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Peter"
                        className="ct-form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="ct-form-group">
                      <label className="ct-form-label">Phone or Email</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +91 98765 43210"
                        className="ct-form-input"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Prayer Need Category</label>
                    <select
                      className="ct-form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Healing">Divine Healing &amp; Health</option>
                      <option value="Deliverance">Spiritual Deliverance &amp; Peace</option>
                      <option value="Family">Family, Marriage &amp; Children</option>
                      <option value="Breakthrough">Financial / Job Breakthrough</option>
                      <option value="Salvation">Salvation &amp; Life Guidance</option>
                      <option value="General">General Inquiry or Pastoral Visit</option>
                    </select>
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Your Prayer Request</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please share details of your prayer need or question..."
                      className="ct-form-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                    <input
                      type="checkbox"
                      id="confidential"
                      checked={formData.confidential}
                      onChange={(e) => setFormData({ ...formData, confidential: e.target.checked })}
                    />
                    <label htmlFor="confidential" style={{ fontSize: "0.85rem", color: "var(--text-muted)", cursor: "pointer" }}>
                      Keep this request strictly confidential between pastors only
                    </label>
                  </div>

                  <button type="submit" className="ct-btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                    🙏 Send Prayer Request to Pastors
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div className="contact-info-card">
            <div>
              <span className="ct-badge" style={{ marginBottom: 12 }}>† Visit Our Sanctuary †</span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--green-dark)", margin: "0 0 16px" }}>
                Christ's Tabernacle Church
              </h3>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">📍</div>
              <div>
                <h4 className="contact-info-title">Church Address</h4>
                <p className="contact-info-text">
                  Christ's Tabernacle — Prayer &amp; Worship Centre<br />
                  Chennai, Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">🕒</div>
              <div>
                <h4 className="contact-info-title">Service Hours</h4>
                <p className="contact-info-text">
                  <strong>Sunday Worship:</strong> 8:15 AM – 11:15 AM<br />
                  <strong>Fasting Vigils:</strong> New &amp; Full Moon Days<br />
                  <strong>Evening Prayer:</strong> 7:00 PM – 8:30 PM
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">📞</div>
              <div>
                <h4 className="contact-info-title">Pastoral Helpline</h4>
                <p className="contact-info-text">
                  Available for emergency hospital visits, home blessings, and prayer counseling.
                </p>
              </div>
            </div>

            <div>
              <h4 className="contact-info-title">Connect on Social Media</h4>
              <div className="contact-social-row">
                <span className="contact-social-btn">📺 YouTube</span>
                <span className="contact-social-btn">📘 Facebook</span>
                <span className="contact-social-btn">📷 Instagram</span>
              </div>
            </div>

            <div className="ct-scripture-box" style={{ margin: 0 }}>
              "The LORD bless you and keep you; the LORD make His face shine upon you, and be gracious to you."
              <cite>— Numbers 6:24–25</cite>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
