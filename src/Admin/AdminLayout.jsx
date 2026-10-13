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
    { name: 'Hero Banners', path: '/admin/hero', icon: <FaImages /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FaComments /> },
    { name: 'Photo Gallery', path: '/admin/gallery', icon: <FaCameraRetro /> },
    { name: 'Worship Lyrics', path: '/admin/lyrics', icon: <FaMusic /> },
  ];

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#081710',
        color: '#FAF6EE',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 90,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 270,
          background: 'linear-gradient(180deg, #0C2318 0%, #07150E 100%)',
          borderRight: '1px solid rgba(214, 182, 107, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transition: 'transform 0.3s ease',
          transform: sidebarOpen ? 'translateX(0)' : window.innerWidth < 1024 ? 'translateX(-100%)' : 'translateX(0)',
        }}
        className="admin-sidebar"
      >
        {/* Sidebar Brand Header */}
        <div
          style={{
            padding: '28px 24px 22px',
            borderBottom: '1px solid rgba(214, 182, 107, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #E0C47A 0%, #D6B66B 100%)',
                color: '#0C2219',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                boxShadow: '0 4px 12px rgba(214, 182, 107, 0.3)',
              }}
            >
              <FaCross />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-serif, serif)',
                  color: '#FAF6EE',
                }}
              >
                Christ's Tabernacle
              </h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: '#D6B66B',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Admin Sanctuary
              </span>
            </div>
          </div>

          {/* Close for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md-hide"
            style={{
              background: 'none',
              border: 'none',
              color: '#8BA698',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: window.innerWidth < 1024 ? 'block' : 'none',
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Server & DB Status Badge */}
        <div style={{ padding: '16px 20px 8px' }}>
          <div
            style={{
              background: 'rgba(214, 182, 107, 0.08)',
              border: '1px solid rgba(214, 182, 107, 0.2)',
              borderRadius: 8,
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#D6B66B' }}>
              <FaServer style={{ fontSize: '0.75rem' }} />
              <span>Backend API</span>
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                color: '#4ADE80',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#4ADE80',
                  boxShadow: '0 0 6px #4ADE80',
                }}
              />
              Active
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '16px 14px', overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.68rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#658674',
              padding: '0 12px 10px',
              fontWeight: 700,
            }}
          >
            DYNAMIC CONTENT SECTIONS
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                marginBottom: 6,
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#0C2219' : '#C2D6CB',
                background: isActive
                  ? 'linear-gradient(135deg, #E0C47A 0%, #D6B66B 100%)'
                  : 'transparent',
                boxShadow: isActive ? '0 4px 15px rgba(214, 182, 107, 0.3)' : 'none',
                transition: 'all 0.2s ease',
              })}
            >
              <span style={{ fontSize: '1.05rem' }}>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User profile & Logout Footer */}
        <div
          style={{
            padding: '16px 18px',
            borderTop: '1px solid rgba(214, 182, 107, 0.15)',
            background: 'rgba(5, 16, 11, 0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(214, 182, 107, 0.2)',
                  border: '1px solid #D6B66B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D6B66B',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {admin?.username ? admin.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: '#FAF6EE',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {admin?.username || 'Administrator'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#8BA698' }}>{admin?.role || 'Super Admin'}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                background: 'rgba(235, 87, 87, 0.15)',
                border: '1px solid rgba(235, 87, 87, 0.3)',
                color: '#FFA2A2',
                padding: '8px 10px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.2s',
              }}
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: window.innerWidth >= 1024 ? 270 : 0,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {/* Top Navbar */}
        <header
          style={{
            height: 68,
            background: 'rgba(12, 34, 25, 0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(214, 182, 107, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 80,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#D6B66B',
                fontSize: '1.25rem',
                cursor: 'pointer',
                display: 'none',
              }}
              className="mobile-sidebar-toggle"
            >
              <FaBars />
            </button>
            <span
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#FAF6EE',
                letterSpacing: '0.3px',
              }}
            >
              Christ's Tabernacle Content Management
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Link
              to="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                background: 'rgba(214, 182, 107, 0.12)',
                border: '1px solid rgba(214, 182, 107, 0.3)',
                borderRadius: 8,
                color: '#D6B66B',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <span>View Public Sanctuary</span>
              <FaExternalLinkAlt style={{ fontSize: '0.72rem' }} />
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main style={{ flex: 1, padding: '28px', background: '#081710' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .mobile-sidebar-toggle {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
