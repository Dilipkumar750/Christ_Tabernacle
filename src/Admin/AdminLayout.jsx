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
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F8FAF9',
        color: '#1E293B',
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
            background: 'rgba(18, 45, 36, 0.4)',
            zIndex: 90,
            backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* Sidebar (Clean White Background, Deep Green Headings) */}
      <aside
        style={{
          width: 270,
          background: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          transition: 'transform 0.3s ease',
          boxShadow: '2px 0 12px rgba(0, 0, 0, 0.03)',
        }}
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
      >
        {/* Sidebar Brand Header */}
        <div
          style={{
            padding: '24px 22px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #184332 0%, #122D24 100%)',
                color: '#D6B66B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 4px 10px rgba(24, 67, 50, 0.25)',
              }}
            >
              <FaCross />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-serif, serif)',
                  color: '#122D24',
                }}
              >
                Christ's Tabernacle
              </h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: '#A88A42',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Admin Sanctuary
              </span>
            </div>
          </div>

          {/* Close for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md-hide-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Server & DB Status Badge */}
        <div style={{ padding: '16px 20px 8px' }}>
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: 8,
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#166534', fontWeight: 600 }}>
              <FaServer style={{ fontSize: '0.75rem' }} />
              <span>Backend API</span>
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                color: '#15803D',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#16A34A',
                  boxShadow: '0 0 6px #16A34A',
                }}
              />
              Active
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: '14px 12px', overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.68rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: '#64748B',
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
                padding: '11px 14px',
                borderRadius: 8,
                marginBottom: 4,
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#122D24' : '#475569',
                background: isActive ? '#EAF3EE' : 'transparent',
                borderLeft: isActive ? '4px solid #184332' : '4px solid transparent',
                transition: 'all 0.2s ease',
              })}
            >
              <span style={{ fontSize: '1.05rem', color: '#184332' }}>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User profile & Logout Footer */}
        <div
          style={{
            padding: '16px 18px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAF9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#EAF3EE',
                  border: '1.5px solid #184332',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#184332',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                }}
              >
                {admin?.username ? admin.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#122D24',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {admin?.username || 'Administrator'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{admin?.role || 'Super Admin'}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                background: '#FEE2E2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                padding: '8px 10px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s',
              }}
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area (White / Light Background) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
        className="admin-main-wrap"
      >
        {/* Top Navbar */}
        <header
          style={{
          minHeight: 60,
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          position: 'sticky',
          top: 0,
          zIndex: 80,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
          gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#184332',
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
              className="mobile-sidebar-toggle"
            >
              <FaBars />
            </button>
            <span
              className="admin-header-title"
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#122D24',
                fontFamily: 'var(--font-serif, serif)',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Christ's Tabernacle Management System
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link
              to="/admin/members/new"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                background: 'linear-gradient(135deg, #184332 0%, #122D24 100%)',
                border: 'none',
                borderRadius: 8,
                color: '#FFFFFF',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(24, 67, 50, 0.2)',
              }}
            >
              <FaUserPlus style={{ fontSize: '0.78rem' }} />
              <span>+ Add Member</span>
            </Link>

            <Link
              to="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 16px',
                background: '#FFFFFF',
                border: '1.5px solid #184332',
                borderRadius: 8,
                color: '#184332',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(24, 67, 50, 0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#184332';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = '#184332';
              }}
            >
              <span>View Sanctuary Website</span>
              <FaExternalLinkAlt style={{ fontSize: '0.72rem' }} />
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main style={{ flex: 1, padding: '28px 32px', background: '#F8FAF9', minWidth: 0 }} className="admin-content-main">
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-main-wrap {
          margin-left: 270px;
        }
        .md-hide-btn {
          display: none;
        }
        .mobile-sidebar-toggle {
          display: none;
        }

        @media (max-width: 1023px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-main-wrap {
            margin-left: 0 !important;
          }
          .md-hide-btn {
            display: block !important;
          }
          .mobile-sidebar-toggle {
            display: block !important;
          }
        }

        @media (max-width: 768px) {
          .admin-content-main {
            padding: 20px 18px !important;
          }
          .admin-header-title {
            font-size: 0.9rem !important;
            max-width: 180px;
            display: inline-block;
          }
        }

        @media (max-width: 480px) {
          .admin-content-main {
            padding: 16px 12px !important;
          }
          .admin-header-title {
            font-size: 0.82rem !important;
            max-width: 130px;
          }
        }
      `}</style>
    </div>
  );
}
