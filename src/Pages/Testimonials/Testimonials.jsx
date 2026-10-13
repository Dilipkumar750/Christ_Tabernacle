import { useState, useEffect } from "react";
import { getPublicTestimonials, createTestimonial } from "../../services/api";

const TESTIMONIES = [
  {
    id: 1,
    name: "Sister Hannah D.",
    location: "Chennai, India",
    category: "Healing",
    title: "Miraculous Healing from Chronic Illness",
    story:
      "For three agonizing years, I suffered from severe autoimmune complications and chronic spinal pain that doctors said was irreversible. During the Fasting Prayer service at Christ's Tabernacle, Pastor anointed me with oil and the believers stood in deep intercession. The fire of the Holy Spirit touched my spine. Today, subsequent scans confirmed total healing. Jesus made me whole!",
    verse: "Jeremiah 30:17 — 'For I will restore health to you and heal you of your wounds, says the LORD.'",
    date: "August 2026",
  },
  {
    id: 2,
    name: "Brother Michael R.",
    location: "Tambaram, Chennai",
    category: "Deliverance",
    title: "Set Free from Years of Fear & Nightmares",
    story:
      "I was tormented by oppressive nightmares, crippling panic attacks, and unseen bondages for over a decade. I couldn't sleep peacefully without heavy medication. When I walked into Christ's Tabernacle, the presence of God broke every heavy chain. Through the deliverance prayer ministry, the fear completely vanished. I now walk in perfect peace and liberty in Christ!",
    verse: "2 Timothy 1:7 — 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.'",
    date: "July 2026",
  },
  {
    id: 3,
    name: "David & Priscilla K.",
    location: "Pallikaranai, Chennai",
    category: "Family",
    title: "Restoration of Our Marriage & Household",
    story:
      "Our marriage was on the verge of legal separation due to irreconcilable bitterness and severe distress. Eva. Glory Devapiriyam and the prayer team counseled us with tears and prevailing prayer. God softened our hearts, broke the spirit of division, and restored our home with supernatural joy and unconditional love. Christ truly saved our family!",
    verse: "Joshua 24:15 — 'As for me and my house, we will serve the LORD.'",
    date: "June 2026",
  },
  {
    id: 4,
    name: "Brother Samuel V.",
    location: "Velachery, Chennai",
    category: "Breakthrough",
    title: "Divine Financial Breakthrough & Job Miracle",
    story:
      "After facing sudden unemployment for eight months and mounting debts, our family felt exhausted. During the New Moon all-night prayer vigil, we surrendered our burdens on the altar. Within two weeks, God opened an unexpected door for an international technical role beyond our qualifications. God is faithful to His covenant!",
    verse: "Philippians 4:19 — 'And my God shall supply all your need according to His riches in glory by Christ Jesus.'",
    date: "May 2026",
  },
  {
    id: 5,
    name: "Sister Rachel M.",
    location: "Guindy, Chennai",
    category: "Healing",
    title: "Child's Miracle Recovery from Critical Fever",
    story:
      "My four-year-old son was admitted to the intensive care unit with dangerously high convulsions and unexplained respiratory infection. I called the church prayer helpline in tears. The pastors and prayer warriors immediately raised emergency intercession. Within hours, the fever broke completely, and his oxygen levels stabilized. Doctors called it a miraculous turnaround!",
    verse: "Psalm 103:3 — 'Who forgives all your iniquities, who heals all your diseases.'",
    date: "April 2026",
  },
  {
    id: 6,
    name: "Brother Joseph A.",
    location: "Medavakkam, Chennai",
    category: "Deliverance",
    title: "Delivered from Addiction and Given a New Life",
    story:
      "For 14 years, I was bound by severe alcohol and tobacco addictions that ruined my health, career, and self-respect. Numerous rehab attempts failed. One Sunday morning, as the worship team sang praises to Jesus, tears streamed down my face and I fell to my knees. The urge was instantly broken that day. I have been clean and serving in church ever since!",
    verse: "John 8:36 — 'Therefore if the Son makes you free, you shall be free indeed.'",
    date: "March 2026",
  },
];

const CATEGORIES = ["All", "Healing", "Deliverance", "Family", "Breakthrough"];

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [testimonies, setTestimonies] = useState(TESTIMONIES);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "Healing",
    title: "",
    story: "",
    anonymous: false,
  });

  const fetchDynamicTestimonies = async () => {
    try {
      const data = await getPublicTestimonials(activeCategory);
      if (data && data.length > 0) {
        setTestimonies(data);
      }
    } catch (err) {
      // Fallback to static TESTIMONIES silently
    }
  };

  useEffect(() => {
    fetchDynamicTestimonies();
  }, [activeCategory]);

  const filtered =
    activeCategory === "All"
      ? testimonies
      : testimonies.filter((t) => t.category?.toLowerCase() === activeCategory.toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTestimonial({
        name: formData.anonymous ? "Anonymous Believer" : formData.name,
        location: formData.location || "Chennai, India",
        category: formData.category,
        title: formData.title,
        story: formData.story,
        isApproved: false, // Sent for pastoral review
      });
    } catch (err) {
      console.warn("Testimony submission:", err.message);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        name: "",
        location: "",
        category: "Healing",
        title: "",
        story: "",
        anonymous: false,
      });
    }, 2200);
  };

  return (
    <>
      <style>{`
        .test-filter-bar {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .test-filter-btn {
          padding: 9px 20px;
          border-radius: 50px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: 1.5px solid var(--border-gold-subtle);
          background: var(--white);
          color: var(--text-muted);
          transition: all 0.22s ease;
          cursor: pointer;
        }
        .test-filter-btn:hover {
          color: var(--green);
          border-color: var(--gold);
        }
        .test-filter-btn.active {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
          border-color: var(--gold);
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        .test-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .test-card {
          background: var(--white);
          border: 1.5px solid var(--border-gold-subtle);
          border-radius: 18px;
          padding: 32px 28px;
          box-shadow: var(--shadow-sm);
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
          display: flex;
          flex-direction: column;
        }
        .test-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold);
        }
        .test-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .test-cat-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: var(--gold-soft);
          color: var(--gold-dark);
          padding: 5px 12px;
          border-radius: 50px;
          border: 1px solid var(--border-gold-subtle);
        }
        .test-date {
          font-size: 0.76rem;
          color: var(--text-light);
        }
        .test-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--green-dark);
          margin: 0 0 12px;
          font-weight: 700;
          line-height: 1.35;
        }
        .test-card-story {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin: 0 0 20px;
          flex-grow: 1;
        }
        .test-verse-box {
          background: var(--gold-soft);
          border-left: 3px solid var(--gold);
          padding: 10px 14px;
          border-radius: 0 8px 8px 0;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 0.82rem;
          color: var(--green-dark);
          line-height: 1.5;
          margin-bottom: 18px;
        }
        .test-card-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid var(--border-gold-subtle);
          padding-top: 14px;
        }
        .test-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--grad-sanctuary);
          color: var(--gold-bright);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .test-author-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--green-dark);
          display: block;
        }
        .test-author-loc {
          font-size: 0.74rem;
          color: var(--text-light);
          display: block;
        }

        .test-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .test-grid { grid-template-columns: 1fr; }
          .test-form-grid { grid-template-columns: 1fr; }
          .test-card { padding: 24px 20px; }
        }
      `}</style>

      {/* ── Subpage Hero ── */}
      <section className="ct-page-hero" aria-labelledby="testimonies-title">
        <div className="ct-page-hero-eyebrow">† Miracles &amp; Deliverance †</div>
        <h1 id="testimonies-title" className="ct-page-hero-title">
          Stories of <span>Faith &amp; Deliverance</span>
        </h1>
        <p className="ct-page-hero-desc">
          "They overcame him by the blood of the Lamb and by the word of their testimony." — Revelation 12:11. Read how Jesus Christ is actively healing, delivering, and restoring lives today.
        </p>
        <div style={{ marginTop: 24 }}>
          <button
            onClick={() => setModalOpen(true)}
            className="ct-btn-gold"
            aria-label="Share Your Testimony"
          >
            ✍️ Share Your Testimony
          </button>
        </div>
      </section>

      {/* ── Content Container ── */}
      <div className="ct-container" style={{ padding: "50px 24px 80px" }}>
        {/* Category Filters */}
        <div className="test-filter-bar" role="tablist" aria-label="Testimony Categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`test-filter-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat === "All" ? "✨ All Testimonies" : cat}
            </button>
          ))}
        </div>

        {/* Testimonies Grid */}
        <div className="test-grid">
          {filtered.map((t) => (
            <article key={t._id || t.id} className="test-card">
              <div className="test-card-head">
                <span className="test-cat-tag">{t.category}</span>
                <span className="test-date">{t.date}</span>
              </div>
              <h2 className="test-card-title">{t.title}</h2>
              <p className="test-card-story">{t.story}</p>
              {t.verse && <div className="test-verse-box">{t.verse}</div>}
              <div className="test-card-footer">
                <div className="test-avatar" aria-hidden="true">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <span className="test-author-name">{t.name}</span>
                  <span className="test-author-loc">{t.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Share Testimony Modal ── */}
      {modalOpen && (
        <div className="ct-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="ct-modal-window" onClick={(e) => e.stopPropagation()}>
            <button
              className="ct-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <span style={{ fontSize: "3rem" }}>🙌</span>
                <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--green-dark)", fontSize: "1.8rem", margin: "14px 0 8px" }}>
                  Praise the Lord!
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                  Your testimony has been received. Our pastoral team will review and share it to encourage believers worldwide. God bless you!
                </p>
              </div>
            ) : (
              <div>
                <span className="ct-badge" style={{ marginBottom: 10 }}>† Declare God's Goodness †</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--green-dark)", margin: "4px 0 14px" }}>
                  Share Your Testimony
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: 24 }}>
                  Did Jesus heal you, set you free, or answer your prayers at Christ's Tabernacle? Your story brings glory to God and builds faith in others!
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="test-form-grid">
                    <div className="ct-form-group">
                      <label className="ct-form-label">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bro. David"
                        className="ct-form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="ct-form-group">
                      <label className="ct-form-label">City / Location</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chennai, India"
                        className="ct-form-input"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Category</label>
                    <select
                      className="ct-form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Healing">Divine Healing</option>
                      <option value="Deliverance">Deliverance &amp; Freedom</option>
                      <option value="Family">Family Restoration</option>
                      <option value="Breakthrough">Financial &amp; Career Breakthrough</option>
                      <option value="Salvation">Salvation &amp; Life Transformation</option>
                    </select>
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Testimony Headline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. How God healed my chronic illness"
                      className="ct-form-input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="ct-form-group">
                    <label className="ct-form-label">Your Story</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe what happened, how God intervened, and the difference Jesus made in your life..."
                      className="ct-form-textarea"
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                    <input
                      type="checkbox"
                      id="anon"
                      checked={formData.anonymous}
                      onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                    />
                    <label htmlFor="anon" style={{ fontSize: "0.85rem", color: "var(--text-muted)", cursor: "pointer" }}>
                      Keep my name anonymous when publishing publicly
                    </label>
                  </div>

                  <button type="submit" className="ct-btn-gold" style={{ width: "100%" }}>
                    Submit Testimony to the Church
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
