import { Link } from "react-router-dom";

const AGE_GROUPS = [
  {
    name: "Kingdom Sparks",
    ages: "Ages 3 – 5",
    icon: "🌱",
    desc: "Nurturing tender hearts with Jesus' love through animated Bible storytelling, praise action songs, and colorful coloring activities.",
    curriculum: "Creation, Noah's Ark, Baby Jesus, Good Samaritan, Jesus Loves Me",
  },
  {
    name: "Joshua Generation",
    ages: "Ages 6 – 10",
    icon: "🏹",
    desc: "Equipping young minds to memorize Scripture, understand biblical obedience, and learn how to talk with Jesus in everyday prayer.",
    curriculum: "The Ten Commandments, David & Goliath, Daniel in the Lion's Den, The Miracles of Jesus",
  },
  {
    name: "Faith Trailblazers",
    ages: "Ages 11 – 14",
    icon: "🛡️",
    desc: "Helping pre-teens navigate peer pressure, develop personal faith convictions, and understand the Armor of God and the Holy Spirit.",
    curriculum: "Armor of God, Fruits of the Spirit, Overcoming Peer Pressure, Christian Identity",
  },
  {
    name: "Radical Youth for Christ",
    ages: "Ages 15 – 21",
    icon: "🔥",
    desc: "Empowering adolescents and young adults for holy living, academic excellence, leadership in worship, and personal evangelism on campus.",
    curriculum: "Apologetics & Worldview, Purity & Relationships, Holy Spirit Gifts, Mission Outreach",
  },
];

export default function SundaySchool() {
  return (
    <>
      {/* Hero */}
      <div
        className="rounded-[20px] border-[1.5px] border-gold/40 p-6 sm:p-9 md:p-10 mb-10 shadow-[0_4px_20px_rgba(18,45,36,0.05)] text-text-main"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%)" }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/40 mb-2">
          † Nurturing the Next Generation †
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.3rem)] my-2 md:my-3 text-green-dark font-bold leading-tight">
          Sunday School <span className="text-gold-dark">&amp; Youth Ministry</span>
        </h2>
        <p className="text-gray-700 text-[0.98rem] leading-[1.7] m-0">
          "Train up a child in the way he should go, and when he is old he will not depart from it." — Proverbs 22:6. Providing a fun, safe, Christ-centered environment where young lives encounter God's love and learn foundational biblical truths.
        </p>
      </div>

      {/* Age Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-11">
        {AGE_GROUPS.map((grp) => (
          <article
            key={grp.name}
            className="bg-white border-[1.5px] border-gold/25 hover:border-gold rounded-[18px] p-7 md:p-8 shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-3xl sm:text-4xl" aria-hidden="true">{grp.icon}</span>
              <span className="text-[0.72rem] font-bold tracking-[0.08em] uppercase bg-gold-soft text-gold-dark px-3 py-1 rounded-full border border-gold/30">
                {grp.ages}
              </span>
            </div>
            <h3 className="font-serif text-xl text-green-dark mb-2 font-bold">{grp.name}</h3>
            <p className="text-[0.9rem] text-text-muted leading-[1.65] mb-4 grow">{grp.desc}</p>
            <div className="bg-ivory border-l-[3px] border-gold py-2.5 px-3.5 rounded-r-lg text-[0.8rem] text-green mt-auto">
              <strong className="text-green-dark">📖 Core Lessons:</strong> {grp.curriculum}
            </div>
          </article>
        ))}
      </div>

      {/* Program & Safety Standards */}
      <div className="bg-white rounded-[18px] border border-gold/25 p-7 sm:p-9 shadow-sm">
        <h3 className="font-serif text-xl sm:text-[1.35rem] text-green-dark font-bold mb-3.5">
          What Happens Every Sunday Morning (8:30 AM – 10:30 AM)
        </h3>
        <ul className="pl-5 text-text-muted leading-[1.8] text-[0.94rem] list-disc space-y-2">
          <li>
            <strong className="text-green-dark">Joyful Action Songs:</strong> Uplifting worship and choreography tailored for young voices.
          </li>
          <li>
            <strong className="text-green-dark">Weekly Scripture Memory Trophy:</strong> Children receive encouragement and prizes for hiding God's Word in their hearts.
          </li>
          <li>
            <strong className="text-green-dark">Creative Bible Worksheets &amp; Crafts:</strong> Reinforcing moral lessons through hands-on art and coloring.
          </li>
          <li>
            <strong className="text-green-dark">Safety &amp; Verified Volunteers:</strong> All Sunday School teachers are vetted, prayerfully appointed members of Christ's Tabernacle.
          </li>
        </ul>

        <div className="mt-6 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-green-deep font-bold px-7 py-3 rounded-full shadow-gold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
          >
            Register Your Child for Sunday School →
          </Link>
        </div>
      </div>
    </>
  );
}
