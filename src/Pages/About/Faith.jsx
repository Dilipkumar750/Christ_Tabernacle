const ARTICLES = [
  {
    num: "1",
    title: "The Holy Scriptures",
    text: "We believe that the Holy Bible, consisting of the Old and New Testaments, is the inspired Word of God, divinely given and authoritative for faith, doctrine, conduct and Christian living.",
    refs: "2 Timothy 3:16–17; 2 Peter 1:20–21; Psalm 119:105",
  },
  {
    num: "2",
    title: "The One True God — The Trinity",
    text: "We believe in one true and living God, eternally existing in three distinct Persons: God the Father, God the Son, and God the Holy Spirit. Each Person is fully God, united in divine nature, glory and purpose.",
    refs: "Deuteronomy 6:4; Matthew 28:19; 2 Corinthians 13:14",
  },
  {
    num: "3",
    title: "Jesus Christ",
    text: "We believe that Jesus Christ is the eternal Son of God, fully God and fully man. He was born of the virgin Mary, lived a sinless life, died on the cross for the sins of humanity, was bodily raised from the dead, ascended into heaven, and is seated at the right hand of the Father. We believe salvation is found in Jesus Christ alone.",
    refs: "John 1:1–14; Matthew 1:20–23; Philippians 2:5–11; Acts 4:12; 1 Corinthians 15:3–4",
  },
  {
    num: "4",
    title: "The Holy Spirit",
    text: "We believe in the Person and present ministry of the Holy Spirit. The Holy Spirit convicts of sin, regenerates, sanctifies, empowers, guides, comforts and equips believers for holy living and effective ministry. We believe in the baptism and filling of the Holy Spirit, the gifts of the Spirit, and the supernatural working of the Holy Spirit in the Church today.",
    refs: "John 14:16–17; John 16:7–13; Acts 1:8; Acts 2:1–4; 1 Corinthians 12:4–11; Ephesians 5:18",
  },
  {
    num: "5",
    title: "The Full Gospel",
    text: "We believe and proclaim the Full Gospel of Jesus Christ — that Jesus Christ saves, transforms, heals, delivers, restores and empowers His people. We believe the Gospel must be proclaimed to every nation and that the Church is called to preach the Word, make disciples, demonstrate God's love and minister through the power of the Holy Spirit.",
    refs: "Mark 16:15–20; Luke 4:18–19; Matthew 28:18–20; Romans 1:16",
  },
  {
    num: "6",
    title: "Salvation",
    text: "We believe that all humanity is separated from God because of sin and that salvation is by God's grace through faith in Jesus Christ. We believe in repentance, faith in Christ, regeneration, justification and the transforming work of God in the life of every believer.",
    refs: "John 3:3–7; Acts 2:38; Romans 3:23–26; Ephesians 2:8–9; Titus 3:5",
  },
  {
    num: "7",
    title: "Water Baptism",
    text: "We believe that believers should follow Christ's command and example by receiving water baptism as an outward expression of faith, identification with Christ's death and resurrection, and obedience to His Word.",
    refs: "Matthew 28:19; Acts 2:38; Romans 6:3–4",
  },
  {
    num: "8",
    title: "The Church",
    text: "We believe the Church is the Body of Christ, called to worship God, proclaim the Gospel, make disciples, serve humanity, equip believers and demonstrate the Kingdom of God. We believe every believer has a place and purpose in the Body of Christ.",
    refs: "Matthew 16:18; Acts 2:42–47; Ephesians 1:22–23; Ephesians 4:11–16",
  },
  {
    num: "9",
    title: "Divine Healing and Deliverance",
    text: "We believe that God is our Healer and that divine healing is part of God's gracious provision through Jesus Christ. We believe in praying for the sick, ministering to the brokenhearted and proclaiming freedom from the works and bondage of the enemy through the authority of Jesus Christ. We recognize that healing is ultimately according to God's sovereign will and purpose.",
    refs: "Isaiah 53:4–5; Psalm 103:2–3; Mark 16:17–18; James 5:14–16; Luke 4:18",
  },
  {
    num: "10",
    title: "The Gifts and Power of the Holy Spirit",
    text: "We believe the supernatural gifts of the Holy Spirit continue to operate in the Church today for the edification of the Body of Christ, the advancement of the Gospel and the glory of God. We believe in gifts including prophecy, tongues, interpretation, healing, miracles, faith, discernment and other spiritual gifts.",
    refs: "1 Corinthians 12:4–11; 1 Corinthians 14:1–5; Romans 12:6–8",
  },
  {
    num: "11",
    title: "Holy and Transformed Living",
    text: "We believe that those who belong to Christ are called to live lives of holiness, righteousness, love, obedience and spiritual transformation. The grace of God does not merely forgive us; it transforms us to become more like Christ.",
    refs: "Romans 12:1–2; Galatians 5:22–25; 1 Peter 1:15–16; 2 Corinthians 5:17",
  },
  {
    num: "12",
    title: "The Second Coming of Jesus Christ",
    text: "We believe in the personal, visible, bodily and glorious Second Coming of Jesus Christ. We believe Christ will return according to His promise, and every believer must live in readiness, holiness and faithful service while proclaiming the Gospel.",
    refs: "John 14:1–3; Acts 1:10–11; Matthew 24:30–31; 1 Thessalonians 4:16–17; Revelation 19:11–16",
  },
  {
    num: "13",
    title: "The Resurrection and Eternal Destiny",
    text: "We believe in the bodily resurrection of the dead, the eternal life of those who belong to Christ, and the final judgment of all humanity. We believe there is an eternal kingdom prepared for those who are reconciled to God through Jesus Christ.",
    refs: "John 5:28–29; 1 Corinthians 15:51–54; Revelation 20:11–15; Revelation 21:1–4",
  },
  {
    num: "14",
    title: "Our Mission",
    text: "We believe the Church is commissioned by Jesus Christ to preach the Gospel, make disciples, proclaim freedom, minister healing and restoration, equip believers, and prepare people for the coming of Christ. Therefore, our ministry is committed to: PREACH • DELIVER • HEAL • EQUIP.",
    refs: "Matthew 28:18–20; Mark 16:15–20; Acts 1:8; Ephesians 4:11–13; 1 Peter 2:9",
  },
];

const CONFESSIONS = [
  "We believe the Bible.",
  "We exalt Jesus Christ.",
  "We honour the Father.",
  "We welcome the work and power of the Holy Spirit.",
  "We preach the Full Gospel.",
  "We believe in salvation, healing, deliverance and transformation.",
  "We pursue holiness and biblical discipleship.",
  "We believe in the gifts and power of the Holy Spirit.",
  "We believe Jesus Christ is coming again.",
  "We live to preach the Gospel and make disciples.",
];

export default function Faith() {
  return (
    <>
      <style>{`
        .faith-wrap { font-family:var(--font-sans); }
        .faith-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.72rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold-bright);
          font-weight: 700;
          padding: 6px 18px;
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius: 50px;
          background: rgba(214,182,107,0.1);
          margin-bottom: 16px;
        }
        .faith-title {
          font-family:var(--font-serif);
          font-size:clamp(1.8rem, 4vw, 2.6rem);
          color:var(--ivory);
          margin:0 0 10px;
          font-weight:900;
        }
        .faith-subtitle {
          font-size:1rem;
          color:rgba(250,246,238,0.8);
          margin:0 0 36px;
          line-height:1.75;
          max-width: 720px;
        }
        .faith-intro {
          background: linear-gradient(145deg, #123425 0%, #0B2218 100%);
          border: 1.5px solid rgba(214,182,107,0.35);
          border-radius:18px;
          padding:28px 32px;
          margin-bottom:40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .faith-intro p {
          font-size:0.98rem;
          color:rgba(250,246,238,0.88);
          line-height:1.8;
          margin:0;
        }
        .faith-intro strong { color:var(--gold-bright); }

        /* Articles grid (Rich Sanctuary Dark Green) */
        .faith-articles {
          display:flex;
          flex-direction:column;
          gap:0;
          border:1.5px solid rgba(214,182,107,0.35);
          border-radius:20px;
          overflow:hidden;
          background: #0A1E15;
          box-shadow: 0 14px 40px rgba(0,0,0,0.35);
        }
        .faith-article {
          display:grid;
          grid-template-columns:56px 1fr;
          gap:0;
          border-bottom:1px solid rgba(214,182,107,0.2);
          transition:background 0.25s;
        }
        .faith-article:last-child { border-bottom:none; }
        .faith-article:hover { background:rgba(214,182,107,0.08); }
        .faith-article-num {
          background: linear-gradient(135deg, #184332 0%, #0C2219 100%);
          display:flex;
          align-items:flex-start;
          justify-content:center;
          padding:24px 0 0;
          font-family:var(--font-serif);
          font-size:0.95rem;
          font-weight:700;
          color:var(--gold-bright);
          border-right: 1px solid rgba(214,182,107,0.25);
          flex-shrink:0;
        }
        .faith-article-body { padding:22px 28px 22px 24px; }
        .faith-article-body h3 {
          font-family:var(--font-serif);
          font-size:1.2rem;
          color:var(--gold-bright);
          margin:0 0 8px;
          font-weight:700;
        }
        .faith-article-body p {
          font-size:0.94rem;
          color:rgba(250,246,238,0.88);
          line-height:1.8;
          margin:0 0 8px;
        }
        .faith-article-refs {
          font-size:0.78rem;
          color:#72C3A2;
          font-style:italic;
          margin:0;
          font-weight:600;
        }

        /* Confession Box */
        .faith-confession {
          margin-top:48px;
          background: linear-gradient(150deg, #113425 0%, #0B2218 60%, #071710 100%);
          border: 1.5px solid rgba(214,182,107,0.38);
          border-radius:24px;
          padding:46px 40px;
          text-align:center;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }
        .faith-confession h3 {
          font-family:var(--font-serif);
          font-size:1.6rem;
          color:var(--gold-bright);
          margin:0 0 6px;
          font-weight:700;
        }
        .faith-confession-sub {
          font-size:0.75rem;
          letter-spacing:0.2em;
          text-transform:uppercase;
          color:var(--gold);
          margin-bottom:30px;
          display:block;
        }
        .faith-confessions-list {
          display:flex;
          flex-direction:column;
          gap:12px;
          margin-bottom:32px;
        }
        .faith-confession-item {
          display:flex;
          align-items:center;
          gap:14px;
          background:rgba(214,182,107,0.08);
          border:1px solid rgba(214,182,107,0.25);
          border-radius:12px;
          padding:14px 20px;
          text-align:left;
          transition: background 0.25s, transform 0.25s;
        }
        .faith-confession-item:hover {
          background: rgba(214,182,107,0.15);
          transform: translateX(4px);
        }
        .faith-confession-item-icon {
          color:var(--gold-bright);
          font-size:0.95rem;
          flex-shrink:0;
        }
        .faith-confession-item span {
          font-size:0.92rem;
          color:rgba(250,246,238,0.92);
          line-height:1.5;
        }
        .faith-final {
          font-size:0.85rem;
          color:rgba(250,246,238,0.65);
          letter-spacing:0.08em;
          font-family:var(--font-serif);
          font-style:italic;
        }

        @media(max-width:580px){
          .faith-article{ grid-template-columns:42px 1fr; }
          .faith-article-num{ font-size:0.82rem; padding:20px 0 0; }
          .faith-confession{ padding:32px 20px; }
          .faith-intro{ padding:22px 20px; }
        }
      `}</style>

      <div className="faith-wrap">
        <p className="faith-eyebrow">✝ Our Statement of Faith</p>
        <h2 className="faith-title">What We Believe</h2>
        <p className="faith-subtitle">
          We are an Apostolic, Bible-believing, Christ-centred, Spirit-filled church committed to
          proclaiming the Full Gospel of Jesus Christ.
        </p>

        <div className="faith-intro">
          <p>
            We believe the Holy Scriptures are the <strong>inspired, authoritative and unchanging
            Word of God</strong> and the foundation for our faith, doctrine and Christian life.
          </p>
        </div>

        {/* Articles */}
        <div className="faith-articles">
          {ARTICLES.map((a) => (
            <div className="faith-article" key={a.num}>
              <div className="faith-article-num" aria-hidden="true">{a.num}</div>
              <div className="faith-article-body">
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <p className="faith-article-refs">{a.refs}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Confession */}
        <div className="faith-confession">
          <h3>Our Confession</h3>
          <span className="faith-confession-sub">Christ's Tabernacle · Prayer & Worship Centre</span>
          <div className="faith-confessions-list">
            {CONFESSIONS.map((c) => (
              <div className="faith-confession-item" key={c}>
                <span className="faith-confession-item-icon" aria-hidden="true">✝</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
          <p className="faith-final">
            A House of Prayer. A Place of Deliverance. A Centre of Healing. A School of
            Discipleship.
            <br /><br />
            PREACH • DELIVER • HEAL • EQUIP
          </p>
        </div>
      </div>
    </>
  );
}
