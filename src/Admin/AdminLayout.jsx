import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import {
  FaTachometerAlt,
  FaImages,
  FaComments,
  FaCameraRetro,
  FaMusic,
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaBars,
  FaTimes,
  FaCross,
  FaServer,
  FaUserFriends,
  FaUserPlus,
} from 'react-icons/fa';

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt />, exact: true },
    { name: 'Church Members', path: '/admin/members', icon: <FaUserFriends /> },
    { name: 'Hero Banners', path: '/admin/hero', icon: <FaImages /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FaComments /> },
    { name: 'Photo Gallery', path: '/admin/gallery', icon: <FaCameraRetro /> },
    { name: 'Worship Lyrics & Video', path: '/admin/lyrics', icon: <FaMusic /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAF9] text-slate-800 font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#122D24]/40 z-[90] backdrop-blur-[3px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[270px] bg-white border-r border-slate-200 flex flex-col z-[100] transition-transform duration-300 ease-in-out shadow-[2px_0_12px_rgba(0,0,0,0.03)] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-[24px_22px_20px] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-[10px] bg-gradient-to-br from-green to-green-dark text-gold flex items-center justify-center text-xl shadow-[0_4px_10px_rgba(24,67,50,0.25)] flex-shrink-0">
              <FaCross />
            </div>
            <div>
              <h2 className="m-0 text-[1.08rem] font-bold font-serif text-green-dark leading-tight">
                Christ's Tabernacle
              </h2>
              <span className="text-[0.72rem] text-gold-dark tracking-wider uppercase font-bold">
                Admin Sanctuary
              </span>
            </div>
          </div>

          {/* Close for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden bg-transparent border-0 text-slate-500 text-xl cursor-pointer p-1"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Server & DB Status Badge */}
        <div className="px-5 pt-4 pb-2">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg px-3 py-2 flex items-center justify-between text-[0.78rem]">
            <span className="flex items-center gap-1.5 text-[#166534] font-semibold">
              <FaServer className="text-xs" />
              <span>Backend API</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#15803D] font-bold">
              <span className="w-[7px] h-[7px] rounded-full bg-[#16A34A] shadow-[0_0_6px_#16A34A]" />
              Active
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-3.5 overflow-y-auto">
          <div className="text-[0.68rem] tracking-[1.5px] uppercase text-slate-500 px-3 pb-2.5 font-bold">
            DYNAMIC CONTENT SECTIONS
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg mb-1 no-underline text-[0.92rem] transition-all duration-200 border-l-4 ${
                  isActive
                    ? 'font-bold text-green-dark bg-[#EAF3EE] border-green'
                    : 'font-medium text-slate-600 bg-transparent border-transparent hover:text-green-dark hover:bg-slate-50'
                }`
              }
            >
              <span className="text-[1.05rem] text-green">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User profile & Logout Footer */}
        <div className="p-[16px_18px] border-t border-slate-200 bg-[#F8FAF9]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#EAF3EE] border-[1.5px] border-green flex items-center justify-center text-green font-bold text-[0.88rem] flex-shrink-0">
                {admin?.username ? admin.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="overflow-hidden">
                <div className="text-[0.86rem] font-bold text-green-dark truncate">
                  {admin?.username || 'Administrator'}
                </div>
                <div className="text-[0.72rem] text-slate-500">{admin?.role || 'Super Admin'}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="bg-red-100 border border-red-200 text-red-600 p-2 rounded-lg cursor-pointer text-sm flex items-center transition-all hover:bg-red-200"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[270px] ml-0">
        {/* Top Navbar */}
        <header className="min-h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-5 sticky top-0 z-[80] shadow-[0_1px_4px_rgba(0,0,0,0.03)] gap-2">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden bg-transparent border-0 text-green text-xl cursor-pointer p-1"
              aria-label="Open sidebar"
            >
              <FaBars />
            </button>
            <span className="text-xs sm:text-sm md:text-base font-bold text-green-dark font-serif tracking-[0.2px] truncate max-w-[140px] sm:max-w-[200px] md:max-w-none">
              Christ's Tabernacle Management System
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/admin/members/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-br from-green to-green-dark border-0 rounded-lg text-white text-[0.84rem] font-bold no-underline transition-all shadow-[0_2px_6px_rgba(24,67,50,0.2)] hover:opacity-95 whitespace-nowrap"
            >
              <FaUserPlus className="text-xs" />
              <span>+ Add Member</span>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border-[1.5px] border-green rounded-lg text-green hover:bg-green hover:text-white text-[0.84rem] font-bold no-underline transition-all shadow-[0_2px_6px_rgba(24,67,50,0.08)] whitespace-nowrap"
            >
              <span>View Sanctuary Website</span>
              <FaExternalLinkAlt className="text-[0.72rem]" />
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-3 sm:p-5 md:p-7 lg:p-8 bg-[#F8FAF9] min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
