import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.jpeg";
import { FaCross, FaUserPlus } from "react-icons/fa";

/* ── Navigation Structure ── */
const NAV = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/about",
    children: [
      { label: "Our Journey", path: "/about/journey" },
      { label: "Our Motto", path: "/about/motto" },
      { label: "Our Vision", path: "/about/vision" },
      { label: "Our Mission", path: "/about/mission" },
      { label: "Statement of Faith", path: "/about/faith" },
    ],
  },
  { label: "Testimonies", path: "/testimonies" },
  { label: "Gallery", path: "/media/photos" },
  { label: "Songs", path: "/songs/lyrics" },
  {
    label: "Sermons",
    path: "/sermons",
    children: [
      { label: "Sunday Sermons", path: "/sermons/sunday" },
      { label: "Bible Study", path: "/sermons/bible-study" },
    ],
  },
  {
    label: "Prayers & Worship",
    path: "/prayers",
    children: [
      { label: "Sunday Services", path: "/prayers/sunday-services" },
      { label: "Fasting Prayers", path: "/prayers/fasting" },
      { label: "Transformation Prayer", path: "/prayers/transformation" },
      { label: "Discipleship Prayer", path: "/prayers/discipleship" },
      { label: "Sunday School", path: "/prayers/sunday-school" },
    ],
  },
  { label: "Connect", path: "/contact" },
];

const TICKERS = [
  '"A House of Prayer for All Nations." — Isaiah 56:7',
  '"But as for me and my house, we will serve the LORD." — Joshua 24:15',
  '"The Lord is my shepherd; I shall not want." — Psalm 23:1',
  '"I can do all things through Christ who strengthens me." — Philippians 4:13',
  '"Sunday Worship: 8:15 AM – 11:15 AM • All Are Welcome in Christ"',
];

/* ── Desktop Dropdown Item ── */
function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const isParentActive =
    item.children &&
    (location.pathname === item.path ||
      item.children.some((c) => location.pathname.startsWith(c.path)));

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!item.children) {
    return (
      <li>
        <NavLink
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              isActive
                ? "text-[#0C2219] bg-[#D6B66B]/20 font-bold"
                : "text-[#184332] hover:text-[#0C2219] hover:bg-[#D6B66B]/15"
            }`
          }
        >
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.path}
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
          isParentActive
            ? "text-[#0C2219] bg-[#D6B66B]/20 font-bold"
            : "text-[#184332] hover:text-[#0C2219] hover:bg-[#D6B66B]/15"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <svg
          className={`transition-transform duration-200 shrink-0 opacity-70 ${open ? "rotate-180 opacity-100" : ""}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <ul
        className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-[#D6B66B]/35 p-2 min-w-[215px] z-[1000] list-none transition-all duration-200 ${
          open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        role="menu"
      >
        {item.children.map((c) => (
          <li key={c.path} role="none">
            <NavLink
              to={c.path}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#FAF6EE] text-[#0C2219] font-bold pl-4"
                    : "text-[#184332] hover:bg-[#FAF6EE] hover:text-[#0C2219] hover:pl-4"
                }`
              }
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B66B]/60 shrink-0" aria-hidden="true" />
              {c.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

/* ── Mobile Nav Item ── */
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isParentActive =
    item.children &&
    (location.pathname === item.path ||
      item.children.some((c) => location.pathname.startsWith(c.path)));

  if (!item.children) {
    return (
      <li className="mb-1">
        <NavLink
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `flex items-center justify-between w-full p-3 rounded-xl text-sm font-semibold transition-colors ${
              isActive
                ? "bg-[#FAF6EE] text-[#0C2219] font-bold"
                : "text-[#184332] hover:bg-[#FAF6EE] hover:text-[#0C2219]"
            }`
          }
          onClick={onClose}
        >
          {item.label}
        </NavLink>
      </li>
    );
  }

  return (
    <li className="mb-1">
      <button
        className={`flex items-center justify-between w-full p-3 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
          isParentActive
            ? "bg-[#FAF6EE] text-[#0C2219] font-bold"
            : "text-[#184332] hover:bg-[#FAF6EE] hover:text-[#0C2219]"
        }`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.label}</span>
        <svg
          className={`transition-transform duration-200 shrink-0 opacity-70 ${open ? "rotate-180 opacity-100" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 pl-3.5"
        style={{ maxHeight: open ? `${item.children.length * 52}px` : "0" }}
      >
        {item.children.map((c) => (
          <NavLink
            key={c.path}
            to={c.path}
            className={({ isActive }) =>
              `block py-2 px-3.5 text-xs rounded-lg transition-colors ${
                isActive
                  ? "text-[#0C2219] font-bold bg-[#FAF6EE]"
                  : "text-[#3D5949] hover:bg-[#FAF6EE] hover:text-[#0C2219]"
              }`
            }
            onClick={onClose}
          >
            ›&nbsp;{c.label}
          </NavLink>
        ))}
      </div>
    </li>
  );
}

/* ── Main Header ── */
export default function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerFade, setTickerFade] = useState(true);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTickerFade(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % TICKERS.length);
        setTickerFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Top Scripture Ticker ── */}
      <div
        className="bg-gradient-to-r from-[#0B2318] via-[#1E5641] to-[#0B2318] text-[#F5E0B0] text-xs py-2 px-4 md:px-6 flex items-center justify-center gap-3.5 overflow-hidden min-h-[34px] border-b border-[#D6B66B]/20 relative"
        role="region"
        aria-label="Scripture Announcement"
      >
        <FaCross className="text-[#D6B66B] text-xs shrink-0" aria-hidden="true" />
        <span
          className={`italic text-center font-medium transition-opacity duration-400 ${
            tickerFade ? "opacity-100" : "opacity-0"
          }`}
        >
          {TICKERS[tickerIdx]}
        </span>
      </div>

      {/* ── Main Sticky Header ── */}
      <header
        className={`sticky top-0 z-[900] bg-white/98 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/99 shadow-md border-[#D6B66B]/45"
            : "border-[#D6B66B]/30"
        }`}
        role="banner"
      >
        <div className="max-w-[1380px] mx-auto px-4 md:px-7 h-16 md:h-[72px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Christ's Tabernacle Home">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-[#D6B66B] flex items-center justify-center shadow-md shrink-0 overflow-hidden hover:scale-105 transition-transform">
              <img
                src={logoImg}
                alt="Christ's Tabernacle Emblem"
                className="w-full h-full object-cover block"
              />
            </div>
            <div>
              <span className="font-serif text-sm md:text-base font-bold text-[#0C2219] uppercase tracking-wide leading-tight block">
                Christ's Tabernacle
              </span>
              <span className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#A88A42] font-bold block mt-0.5 max-sm:hidden">
                Prayer &amp; Worship Centre • Est. 1991
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation">
            <ul className="hidden xl:flex items-center gap-0.5 list-none m-0 p-0">
              {NAV.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </ul>
          </nav>

          {/* Action Buttons: Add Member & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Add Member Button */}
            <button
              onClick={() => navigate('/join-membership')}
              className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#184332] to-[#122D24] text-[#D6B66B] text-xs font-bold uppercase tracking-wider px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#D6B66B] whitespace-nowrap shrink-0 shadow-md hover:-translate-y-0.5 hover:bg-[#D6B66B] hover:text-[#122D24] transition-all cursor-pointer"
              aria-label="Add Church Member"
              id="header-add-member-btn"
            >
              <FaUserPlus className="text-xs" />
              <span>Add Member</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="xl:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 p-2 rounded-lg shrink-0 cursor-pointer hover:bg-[#D6B66B]/15 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-0.5 bg-[#0C2219] rounded transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#0C2219] rounded transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#0C2219] rounded transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer & Backdrop ── */}
      <div
        className={`fixed inset-0 bg-[#0C2219]/60 backdrop-blur-sm z-[995] transition-opacity duration-300 xl:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-screen w-[min(320px,88vw)] bg-white z-[997] transition-transform duration-300 ease-in-out flex flex-col shadow-2xl overflow-y-auto border-l border-[#D6B66B]/30 xl:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#0C2419] to-[#184332] text-[#FAF6EE] shrink-0 border-b-2 border-[#D6B66B]">
          <div className="flex items-center gap-2.5">
            <img
              src={logoImg}
              alt=""
              className="w-8 h-8 rounded-full border border-[#D6B66B] object-cover"
            />
            <span className="font-serif text-sm font-bold text-[#FAF6EE]">
              Christ's Tabernacle
            </span>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-white/15 text-[#FAF6EE] flex items-center justify-center text-sm cursor-pointer hover:bg-white/25"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul className="list-none p-3 m-0 flex-1">
          {NAV.map((item) => (
            <MobileNavItem key={item.path} item={item} onClose={closeMenu} />
          ))}
        </ul>

        <div className="p-4 bg-[#FAF6EE] border-t border-[#D6B66B]/25">
          <button
            type="button"
            onClick={() => {
              closeMenu();
              navigate('/join-membership');
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#184332] text-[#D6B66B] border border-[#D6B66B] cursor-pointer shadow-md"
          >
            <FaUserPlus />
            <span>Join / Add Member</span>
          </button>
        </div>
      </div>
    </>
  );
}
