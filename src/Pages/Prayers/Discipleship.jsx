import { Link } from "react-router-dom";

const TRACKS = [
  {
    step: "Stage 1",
    title: "Foundations in Christ & New Life",
    duration: "6 Weeks",
    topics: [
      "Assurance of Salvation and the Cleansing of the Blood",
      "Biblical Water Baptism (Believer's Immersion)",
      "Daily Quiet Time: How to Read and Obey the Scriptures",
      "Overcoming Temptation and Breaking Old Habits",
    ],
    scripture: "2 Peter 3:18 — 'Grow in the grace and knowledge of our Lord and Savior Jesus Christ.'",
  },
  {
    step: "Stage 2",
    title: "Empowerment of the Holy Spirit",
    duration: "8 Weeks",
    topics: [
      "The Baptism of the Holy Spirit and Speaking in Tongues",
      "Discovering and Exercising Your Spiritual Gifts",
      "Praise, Fasting, and Developing a Fervent Prayer Life",
      "Cultivating the Sweet Fruits of the Spirit in Daily Life",
    ],
    scripture: "Acts 1:8 — 'You shall receive power when the Holy Spirit has come upon you.'",
  },
  {
    step: "Stage 3",
    title: "The Intercessor's Watch & Deliverance",
    duration: "10 Weeks",
    topics: [
      "Spiritual Warfare and Tearing Down Strongholds",
      "Ministering Deliverance to the Oppressed in Jesus' Name",
      "The Ministry of Intercession for Families and Nations",
      "Walking in Divine Healing and Faith for Miracles",
    ],
    scripture: "2 Corinthians 10:4 — 'The weapons of our warfare are not carnal but mighty in God.'",
  },
  {
    step: "Stage 4",
    title: "Kingdom Servant Leadership",
    duration: "12 Weeks",
    topics: [
      "The Heart of a Servant: Jesus as our Supreme Example",
      "Personal Evangelism and Making Disciples",
      "Leading Small Groups, Youth, and Prayer Fellowships",
      "Integrity, Financial Stewardship, and Godly Family Living",
    ],
    scripture: "2 Timothy 2:2 — 'The things that you have heard from me... commit to faithful men.'",
  },
];

export default function Discipleship() {
  return (
    <>
      {/* Hero */}
      <div
        className="rounded-[20px] border-[1.5px] border-gold/40 p-6 sm:p-9 md:p-10 mb-10 shadow-[0_4px_20px_rgba(18,45,36,0.05)] text-text-main"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%)" }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/40 mb-2">
          † Equipping the Saints †
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.3rem)] my-2 md:my-3 text-green-dark font-bold leading-tight">
          Discipleship <span className="text-gold-dark">Prayer Tracks</span>
        </h2>
        <p className="text-gray-700 text-[0.98rem] leading-[1.7] m-0">
          "Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I have commanded you." — Matthew 28:19–20. Deepen your spiritual roots and step into ministry.
        </p>
      </div>

      {/* Grid of 4 Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-12">
        {TRACKS.map((t) => (
          <article
            key={t.step}
            className="bg-white border-[1.5px] border-gold/25 hover:border-gold rounded-[18px] p-7 md:p-8 shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[0.72rem] font-bold tracking-[0.1em] uppercase bg-gradient-to-r from-green-deep to-green-medium text-gold-bright px-3 py-1 rounded-full">
                {t.step}
              </span>
              <span className="text-[0.76rem] text-gold-dark font-bold">⏱️ {t.duration}</span>
            </div>
            <h3 className="font-serif text-xl text-green-dark mb-3.5 font-bold">{t.title}</h3>
            <ul className="list-none p-0 m-0 mb-4 grow space-y-2">
              {t.topics.map((item, idx) => (
                <li key={idx} className="text-[0.88rem] text-text-muted leading-relaxed flex items-start gap-2">
                  <span className="text-gold font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-[0.78rem] text-gold-dark italic font-serif border-t border-gold/20 pt-2.5 mt-auto">
              {t.scripture}
            </div>
          </article>
        ))}
      </div>

      {/* Enrollment */}
      <div className="bg-ivory rounded-[18px] border-[1.5px] border-gold/40 p-8 sm:p-9 text-center">
        <h3 className="font-serif text-2xl text-green-dark font-bold mb-2.5">
          Ready to Begin Your Discipleship Journey?
        </h3>
        <p className="text-text-muted text-[0.95rem] max-w-[620px] mx-auto mb-6 leading-relaxed">
          Classes take place every Saturday at the church auditorium and via online prayer cohorts. All study manuals and mentoring are provided free of charge.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-green-deep font-bold px-7 py-3 rounded-full shadow-gold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
        >
          Enroll in Discipleship Ministry →
        </Link>
      </div>
    </>
  );
}
