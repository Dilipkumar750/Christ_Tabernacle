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
  { label: "Worship Videos & Lyrics", path: "/songs/lyrics" },
  { label: "Photo Gallery", path: "/media/photos" },
];

const SERVICE_TIMES = [
  { day: "Sunday Worship & Communion", time: "8:15 AM – 11:15 AM" },
  { day: "Fasting & Deliverance Prayer", time: "New Moon & Full Moon Days" },
  { day: "Evening Intercessory Prayer", time: "7:00 PM – 8:30 PM" },
];

export default function Footer() {
  return (
    <>
      {/* ── Pre-Footer CTA ── */}
      <section
        className="bg-gradient-to-br from-[#0C2419] via-[#184332] to-[#276D52] py-16 px-6 text-center relative overflow-hidden border-t-2 border-[#D6B66B] border-b-2 border-[#D6B66B]/30"
        aria-labelledby="footer-cta-heading"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-widest text-[#E8CC8F] font-bold mb-2">
            † A House of Prayer for All Nations
          </p>
          <h2 id="footer-cta-heading" className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF6EE] font-bold mb-3 leading-tight">
            Experience the <span className="text-[#F5E0B0]">Transforming Presence</span> of God
          </h2>
          <p className="text-sm md:text-base text-[#FAF6EE]/85 max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you are seeking healing, spiritual restoration, or a welcoming church family to worship with, our sanctuary doors are always open to you.
          </p>
          <div className="flex justify-center items-center gap-3.5 flex-wrap">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#E0C47A] via-[#D6B66B] to-[#A88A42] text-[#122D24] shadow-md hover:-translate-y-0.5 transition-all"
            >
              Plan Your Visit
            </Link>
            <Link
              to="/prayers/sunday-services"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border-2 border-[#D6B66B] text-[#F5E0B0] hover:bg-[#D6B66B]/20 transition-all"
            >
              Service Schedules
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Footer ── */}
      <footer className="bg-gradient-to-b from-[#0B2217] via-[#184332] to-[#0E291E] text-[#FAF6EE] pt-16 pb-10 px-6 border-t border-[#D6B66B]/30" role="contentinfo">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Service Times */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImg}
                alt="Christ's Tabernacle Emblem"
                className="w-12 h-12 rounded-full border-2 border-[#D6B66B] shadow-md object-cover bg-white"
              />
              <div>
                <span className="font-serif text-base font-bold text-[#FAF6EE] tracking-wide uppercase block">
                  Christ's Tabernacle
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#E8CC8F] block">
                  Prayer &amp; Worship Centre
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FAF6EE]/70 leading-relaxed mb-5">
              Dedicated to preaching the Full Gospel of Jesus Christ, ministering divine healing, bringing deliverance to the captive, and making disciples of all nations since 1991.
            </p>

            <div className="bg-[#0B2217]/80 border border-[#D6B66B]/25 rounded-xl p-4 mt-4">
              <div className="text-[11px] tracking-wider uppercase text-[#F5E0B0] font-bold mb-2.5 flex items-center gap-1.5">
                <FaClock className="text-xs" /> Service Schedule
              </div>
              {SERVICE_TIMES.map((st) => (
                <div key={st.day} className="flex justify-between text-xs py-1.5 border-b border-dashed border-[#D6B66B]/20 text-[#FAF6EE]/90 last:border-b-0">
                  <span>{st.day}</span>
                  <span className="text-[#E8CC8F] font-semibold">{st.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F5E0B0] mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#D6B66B]">
              Explore
            </h3>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-xs text-[#FAF6EE]/80 hover:text-[#F5E0B0] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <FaChevronRight className="text-[10px] opacity-60" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ministries */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F5E0B0] mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#D6B66B]">
              Ministries
            </h3>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {MINISTRIES.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-xs text-[#FAF6EE]/80 hover:text-[#F5E0B0] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <FaChevronRight className="text-[10px] opacity-60" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Resources & Weekly Promise */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#F5E0B0] mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#D6B66B]">
              Resources &amp; Media
            </h3>
            <ul className="list-none p-0 m-0 space-y-2.5 mb-5">
              {RESOURCES.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-xs text-[#FAF6EE]/80 hover:text-[#F5E0B0] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <FaChevronRight className="text-[10px] opacity-60" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="bg-[#D6B66B]/10 border border-[#D6B66B]/35 rounded-xl p-4">
              <p className="font-serif italic text-xs text-[#FAF6EE] leading-relaxed mb-2">
                "For where two or three gather in my name, there am I with them."
              </p>
              <span className="text-[10px] font-bold text-[#E8CC8F] uppercase tracking-wider block">
                — Matthew 18:20
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Bottom Copyright ── */}
      <div className="bg-[#091E15] border-t border-[#D6B66B]/20 py-5 px-6 text-xs text-[#FAF6EE]/75">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <div>
            © {CURRENT_YEAR} Christ's Tabernacle — Prayer &amp; Worship Centre. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#F5E0B0] italic font-serif">
              "Faith · Family · Future"
            </span>
            <Link
              to="/admin"
              className="text-[#D6B66B]/80 hover:text-[#E8CC8F] text-xs inline-flex items-center gap-1"
            >
              <span>Admin Portal</span> 🔒
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
