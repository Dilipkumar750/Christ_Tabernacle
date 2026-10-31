import { Link } from "react-router-dom";

const SERVICE_ORDER = [
  { step: "1", time: "8:15 AM", title: "Opening Prayer & Thanksgiving", desc: "Consecrating the sanctuary, thanksgiving for the week's mercies, and invoking the presence of the Holy Spirit." },
  { step: "2", time: "8:30 AM", title: "Praise & Anointed Worship", desc: "Corporate praise led by the choir and worship team with traditional and contemporary songs of the Cross." },
  { step: "3", time: "9:20 AM", title: "Testimonies & Pastoral Announcements", desc: "Believers declare miraculous healings and answers to prayer, followed by church family updates." },
  { step: "4", time: "9:40 AM", title: "Proclamation of the Living Word", desc: "In-depth expository preaching by Pastor Saravanan Immanuel focusing on deliverance, holiness, and faith." },
  { step: "5", time: "10:35 AM", title: "The Holy Communion (Lord's Supper)", desc: "Partaking in the bread and cup in holy reverent remembrance of Christ's broken body and shed blood." },
  { step: "6", time: "10:55 AM", title: "Altar Ministry & Healing Prayer", desc: "Anointing with oil and personal prayer for the sick, brokenhearted, and those seeking spiritual deliverance." },
  { step: "7", time: "11:15 AM", title: "Apostolic Benediction & Fellowship", desc: "Closing pastoral blessing over families, followed by warm tea and Christian fellowship." },
];

export default function SundayServices() {
  return (
    <>
      {/* Main Banner */}
      <div
        className="rounded-[20px] border-[1.5px] border-gold/40 p-6 sm:p-9 md:p-10 mb-11 shadow-[0_4px_20px_rgba(18,45,36,0.05)] text-text-main flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%)" }}
      >
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/40 mb-2">
            † Weekly Celebration of the Lord †
          </span>
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.3rem)] my-1.5 text-green-dark font-bold leading-tight">
            Sunday Morning <span className="text-gold-dark">Worship &amp; Communion</span>
          </h2>
          <p className="text-text-muted text-[0.98rem] m-0 font-medium">
            Every Sunday • 8:15 AM – 11:15 AM IST • Tamil &amp; English Fellowship
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-green-deep font-bold px-7 py-3 rounded-full shadow-gold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider shrink-0 whitespace-nowrap"
        >
          Plan Your Visit 🙏
        </Link>
      </div>

      {/* Order of Service */}
      <section aria-labelledby="order-heading">
        <h3 id="order-heading" className="font-serif text-2xl md:text-[1.6rem] text-green-dark font-bold">
          Order of Sunday Worship Service
        </h3>
        <p className="text-text-muted text-[0.95rem] mt-1">
          Our services are reverent, Spirit-led, and centered on Christ's presence and holy fellowship.
        </p>

        <div className="flex flex-col gap-4 my-7 mb-11">
          {SERVICE_ORDER.map((item) => (
            <div
              key={item.step}
              className="bg-white border-[1.5px] border-gold/25 hover:border-gold rounded-[14px] p-5 sm:p-6 flex gap-5 items-start shadow-sm hover:translate-x-1 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-full bg-grad-sanctuary text-gold-bright flex items-center justify-center font-bold text-base shrink-0 border-[1.5px] border-gold shadow-sm">
                {item.step}
              </div>
              <div>
                <span className="text-[0.75rem] font-bold text-gold-dark tracking-[0.08em] uppercase mb-1.5 block">
                  ⏱️ {item.time}
                </span>
                <h4 className="font-serif text-lg text-green-dark mb-1 font-bold">{item.title}</h4>
                <p className="text-[0.9rem] text-text-muted leading-[1.65] m-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to Expect */}
      <section aria-labelledby="expect-heading" className="mt-12">
        <h3 id="expect-heading" className="font-serif text-2xl text-green-dark font-bold mb-6">
          What to Expect as a Visitor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gold/25 rounded-2xl p-7 shadow-sm">
            <span className="text-3xl sm:text-4xl block mb-2.5">🤝</span>
            <h4 className="font-serif text-lg text-green font-bold my-2 mb-2">Warm Christian Welcome</h4>
            <p className="text-[0.88rem] text-text-muted leading-[1.7] m-0">
              From the moment you step through our sanctuary doors, our ushers and hospitality team will welcome you with the love of Christ.
            </p>
          </div>
          <div className="bg-white border border-gold/25 rounded-2xl p-7 shadow-sm">
            <span className="text-3xl sm:text-4xl block mb-2.5">👶</span>
            <h4 className="font-serif text-lg text-green font-bold my-2 mb-2">Children &amp; Sunday School</h4>
            <p className="text-[0.88rem] text-text-muted leading-[1.7] m-0">
              Age-appropriate Bible lessons and fun spiritual activities during service for toddlers, kids, and adolescents.
            </p>
          </div>
          <div className="bg-white border border-gold/25 rounded-2xl p-7 shadow-sm">
            <span className="text-3xl sm:text-4xl block mb-2.5">🙌</span>
            <h4 className="font-serif text-lg text-green font-bold my-2 mb-2">Personal Prayer &amp; Anointing</h4>
            <p className="text-[0.88rem] text-text-muted leading-[1.7] m-0">
              At the close of each service, Pastor and our intercessors minister individually to all who need healing, counsel, or deliverance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
