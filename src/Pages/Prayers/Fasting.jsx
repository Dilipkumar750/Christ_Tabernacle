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
      {/* Hero */}
      <div
        className="rounded-[20px] border-[1.5px] border-gold/40 p-6 sm:p-9 md:p-11 mb-11 shadow-[0_4px_20px_rgba(18,45,36,0.05)] text-text-main"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%)" }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/40 mb-2.5">
          † The Power of Humility &amp; Sacrifice †
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.3rem)] my-2.5 md:my-3.5 text-green-dark font-bold leading-tight">
          Fasting <span className="text-gold-dark">&amp; Deliverance Prayers</span>
        </h2>
        <p className="text-gray-700 text-base leading-[1.75] max-w-[720px] m-0">
          "Is not this the fast that I have chosen: to loose the chains of injustice and untie the cords of the yoke, to set the oppressed free and break every yoke?" — Isaiah 58:6. At Christ's Tabernacle, fasting prayer is the engine room of our spiritual power.
        </p>
      </div>

      {/* Schedule Grid */}
      <section aria-labelledby="schedule-heading">
        <h3 id="schedule-heading" className="font-serif text-2xl md:text-[1.6rem] text-green-dark font-bold">
          Fasting Prayer Gatherings
        </h3>
        <p className="text-text-muted text-[0.95rem] mt-1">
          Join our prayer warriors as we seek the face of God in corporate consecrated fasting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 mb-12">
          {FASTING_SCHEDULE.map((item) => (
            <div
              key={item.title}
              className="bg-white border-[1.5px] border-gold/25 hover:border-gold rounded-[18px] p-7 md:p-8 shadow-sm hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-4xl mb-3 block" aria-hidden="true">{item.icon}</span>
              <h4 className="font-serif text-xl text-green-dark font-bold mb-1.5">{item.title}</h4>
              <span className="text-[0.78rem] text-gold-dark font-bold uppercase tracking-[0.08em] mb-3 block">
                {item.timing}
              </span>
              <p className="text-[0.9rem] text-text-muted leading-[1.65] m-0">
                <strong className="text-green-dark">Prayer Focus:</strong> {item.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Guidelines Box */}
      <div className="bg-ivory rounded-[18px] border border-gold/25 p-7 sm:p-9">
        <h3 className="font-serif text-xl sm:text-[1.4rem] text-green-dark font-bold mb-4">
          Biblical Principles for an Acceptable Fast
        </h3>
        <ul className="pl-5 text-text-muted leading-[1.85] text-[0.95rem] list-disc space-y-2">
          <li>
            <strong className="text-green-dark">Purity of Motive:</strong> Fast not for human applause, but in secret before your Heavenly Father (Matthew 6:16–18).
          </li>
          <li>
            <strong className="text-green-dark">Feed on the Word:</strong> Dedicate the hours saved from meal preparation to immersing yourself in Scripture and intercessory prayer.
          </li>
          <li>
            <strong className="text-green-dark">Confession &amp; Forgiveness:</strong> Let your fast be accompanied by repentance, forgiving those who offended you, and reconciliation.
          </li>
          <li>
            <strong className="text-green-dark">Expect Miracles:</strong> Approach God with unwavering faith knowing that "this kind does not go out except by prayer and fasting" (Matthew 17:21).
          </li>
        </ul>
      </div>
    </>
  );
}
