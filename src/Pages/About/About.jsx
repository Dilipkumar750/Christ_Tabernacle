import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import logoImg from "../../assets/logo.jpeg";
import ParticleCross from "../../Components/ParticleCross";

const TABS = [
  { label: "Our Journey", path: "/about/journey", icon: "🕊️" },
  { label: "Our Motto", path: "/about/motto", icon: "✝" },
  { label: "Our Vision", path: "/about/vision", icon: "🌿" },
  { label: "Our Mission", path: "/about/mission", icon: "📢" },
  { label: "Statement of Faith", path: "/about/faith", icon: "📖" },
];

export default function About() {
  const { pathname } = useLocation();

  if (pathname === "/about" || pathname === "/about/") {
    return <Navigate to="/about/journey" replace />;
  }

  return (
    <div className="bg-ivory w-full min-h-screen font-sans">
      {/* ── Hero ── */}
      <section
        className="relative bg-grad-sanctuary-dark pt-16 md:pt-[85px] pb-11 md:pb-[60px] px-4 md:px-6 text-center overflow-hidden border-b border-gold/30"
        aria-labelledby="about-h1"
      >
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(214,182,107,0.1) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 20% 10%, rgba(40,110,82,0.4) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 80% 10%, rgba(40,110,82,0.3) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />

        <ParticleCross />

        <div className="relative z-10 max-w-[760px] mx-auto">
          {/* Animated church emblem ring */}
          <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center animate-pulse">
            <span
              className="absolute -inset-3 rounded-full border border-dashed border-gold/35 animate-[spin_30s_linear_infinite_reverse] pointer-events-none"
              aria-hidden="true"
            />
            <span
              className="absolute -inset-1.5 rounded-full border-[1.5px] border-gold/65 animate-[spin_18s_linear_infinite] pointer-events-none"
              aria-hidden="true"
            />
            <img
              className="w-full h-full rounded-full object-cover border-[2.5px] border-gold block drop-shadow-[0_0_15px_rgba(214,182,107,0.45)]"
              src={logoImg}
              alt="Christ's Tabernacle Emblem"
            />
          </div>

          <div className="inline-flex items-center gap-2.5 text-[0.72rem] tracking-[0.28em] uppercase text-gold-bright font-bold mb-4 py-1.5 px-5 border-[1.5px] border-gold/35 rounded-full bg-gold/10">
            <span>✝</span> Who We Are <span>✝</span>
          </div>

          <h1
            id="about-h1"
            className="font-serif text-[clamp(2.2rem,5.5vw,3.8rem)] text-ivory font-black mb-4.5 leading-[1.15] tracking-tight"
          >
            About <em className="italic text-gold-bright">Christ's Tabernacle</em>
          </h1>

          <p className="text-sm md:text-base text-ivory/85 max-w-[600px] mx-auto mb-7 leading-relaxed">
            Rooted in prayer, established in faith, and called to declare the transformative
            power, divine healing, and deliverance of Jesus Christ since 1991.
          </p>

          <div className="inline-flex flex-row flex-wrap justify-center border-[1.5px] border-gold/30 rounded-xl overflow-hidden bg-green-deep/70 shadow-card">
            <div className="px-4.5 py-2.5 sm:px-7 sm:py-3.5 border-r border-gold/25">
              <span className="font-serif text-xl sm:text-[1.6rem] text-gold-bright font-bold leading-none block">
                33+
              </span>
              <span className="text-[0.68rem] tracking-[0.14em] uppercase text-ivory/70 block mt-1">
                Years of Ministry
              </span>
            </div>
            <div className="px-4.5 py-2.5 sm:px-7 sm:py-3.5 border-r border-gold/25">
              <span className="font-serif text-xl sm:text-[1.6rem] text-gold-bright font-bold leading-none block">
                1000s
              </span>
              <span className="text-[0.68rem] tracking-[0.14em] uppercase text-ivory/70 block mt-1">
                Lives Transformed
              </span>
            </div>
            <div className="px-4.5 py-2.5 sm:px-7 sm:py-3.5">
              <span className="font-serif text-xl sm:text-[1.6rem] text-gold-bright font-bold leading-none block">
                1991
              </span>
              <span className="text-[0.68rem] tracking-[0.14em] uppercase text-ivory/70 block mt-1">
                Founded in Faith
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Green Tabs ── */}
      <nav
        className="bg-white border-b-2 border-gold/35 border-t border-gold/20 px-4 sm:px-6 sticky top-[70px] z-[90] shadow-[0_4px_16px_rgba(18,45,36,0.05)]"
        aria-label="About Us navigation"
      >
        <div className="max-w-[1100px] mx-auto flex gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 sm:gap-2 py-3 px-3.5 sm:py-4 sm:px-5.5 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-[3px] transition-all duration-200 tracking-wide relative -bottom-[1px] ${
                  isActive
                    ? "text-green-deep font-bold border-gold bg-gold/15"
                    : "text-[#3D5949] border-transparent hover:text-green-deep hover:bg-gold/10"
                }`
              }
            >
              <span className="text-sm sm:text-base opacity-85" aria-hidden="true">
                {tab.icon}
              </span>
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── Nested Content ── */}
      <main className="max-w-[1100px] mx-auto px-4 py-9 sm:px-6 sm:py-14 pb-24 min-h-[60vh]">
        <Outlet />
      </main>
    </div>
  );
}
