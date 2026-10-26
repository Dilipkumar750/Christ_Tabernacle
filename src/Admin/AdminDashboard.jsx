import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authGetStats, toggleApproveTestimonial } from '../services/api';
import {
  FaImages,
  FaComments,
  FaCameraRetro,
  FaMusic,
  FaPlus,
  FaCheck,
  FaTimes,
  FaSync,
  FaUserFriends,
  FaUserPlus,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await authGetStats();
      setData(res);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const handleQuickToggleTestimonial = async (id) => {
    try {
      await toggleApproveTestimonial(id);
      fetchStats();
    } catch (err) {
      alert('Failed to update testimony approval: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#184332' }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: '3px solid #E2E8F0',
            borderTopColor: '#184332',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ fontWeight: 600 }}>Loading Sanctuary Dashboard metrics...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const stats = data?.stats || {
    hero: { total: 0, active: 0 },
    testimonials: { total: 0, approved: 0, pending: 0 },
    gallery: { total: 0 },
    lyrics: { total: 0 },
    members: { total: 0, active: 0 },
  };

  const recent = data?.recent || {
    testimonials: [],
    photos: [],
    songs: [],
    members: [],
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Top Banner Greeting (White Card, Deep Green Heading) */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: 16,
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          marginBottom: 32,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div>
          <div style={{ color: '#A88A42', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '1px' }}>
            CHRIST'S TABERNACLE ADMINISTRATION
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '2rem',
              color: '#122D24',
              margin: '6px 0 8px',
              fontWeight: 700,
            }}
          >
            Welcome, Sanctuary Administrator
          </h1>
          <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem', maxWidth: 680 }}>
            Manage and publish dynamic hero slides, congregation testimonies, sanctuary gallery archives, and worship song videos in real time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleRefresh}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              background: '#EAF3EE',
              border: '1.5px solid #184332',
              color: '#184332',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.88rem',
              transition: 'all 0.2s',
            }}
          >
            <FaSync style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            <span>Refresh Stats</span>
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#B91C1C',
            padding: '14px 18px',
            borderRadius: 10,
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      )}

      {/* 5 Stat Metric Cards (Members, Hero, Testimonies, Photos, Lyrics) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18,
          marginBottom: 36,
        }}
      >
        {/* Card 0: Church Members */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#166534', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                Church Members
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#122D24', marginTop: 4 }}>
                {stats.members?.total || 0}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#EAF3EE',
                color: '#184332',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              <FaUserFriends />
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              fontSize: '0.84rem',
            }}
          >
            <span style={{ color: '#15803D', fontWeight: 600 }}>
              ● {stats.members?.active !== undefined ? `${stats.members.active} Active` : 'Active Congregation'}
            </span>
            <Link to="/admin/members" style={{ color: '#184332', textDecoration: 'none', fontWeight: 700 }}>
              View All →
            </Link>
          </div>
        </div>

        {/* Card 1: Hero Banners */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Hero Banners
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#122D24', marginTop: 4 }}>
                {stats.hero.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#EAF3EE',
                color: '#184332',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              <FaImages />
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              fontSize: '0.84rem',
            }}
          >
            <span style={{ color: '#15803D', fontWeight: 600 }}>● {stats.hero.active} Active on Home</span>
            <Link to="/admin/hero" style={{ color: '#184332', textDecoration: 'none', fontWeight: 700 }}>
              Manage →
            </Link>
          </div>
        </div>

        {/* Card 2: Testimonials */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Testimonies
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#122D24', marginTop: 4 }}>
                {stats.testimonials.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#FDF2F8',
                color: '#BE185D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              <FaComments />
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              fontSize: '0.84rem',
            }}
          >
            <span style={{ color: stats.testimonials.pending > 0 ? '#B45309' : '#15803D', fontWeight: 600 }}>
              {stats.testimonials.pending > 0
                ? `● ${stats.testimonials.pending} Pending Review`
                : `● ${stats.testimonials.approved} Published`}
            </span>
            <Link to="/admin/testimonials" style={{ color: '#184332', textDecoration: 'none', fontWeight: 700 }}>
              Review →
            </Link>
          </div>
        </div>

        {/* Card 3: Photo Gallery */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Photo Gallery
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#122D24', marginTop: 4 }}>
                {stats.gallery.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#EFF6FF',
                color: '#1D4ED8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              <FaCameraRetro />
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              fontSize: '0.84rem',
            }}
          >
            <span style={{ color: '#15803D', fontWeight: 600 }}>● All Albums Active</span>
            <Link to="/admin/gallery" style={{ color: '#184332', textDecoration: 'none', fontWeight: 700 }}>
              Upload →
            </Link>
          </div>
        </div>

        {/* Card 4: Worship Lyrics */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Worship Songs &amp; Videos
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#122D24', marginTop: 4 }}>
                {stats.lyrics.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#FAF5FF',
                color: '#7E22CE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              <FaMusic />
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              fontSize: '0.84rem',
            }}
          >
            <span style={{ color: '#15803D', fontWeight: 600 }}>● YouTube &amp; Lyrics</span>
            <Link to="/admin/lyrics" style={{ color: '#184332', textDecoration: 'none', fontWeight: 700 }}>
              Edit →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar (Green Headings, White/Gold Buttons) */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{ fontSize: '1.15rem', color: '#122D24', marginBottom: 14, fontWeight: 700, fontFamily: 'var(--font-serif, serif)' }}>
          Quick Management Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link
            to="/admin/members/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #184332 0%, #122D24 100%)',
              color: '#FFFFFF',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(24, 67, 50, 0.2)',
            }}
          >
            <FaUserPlus /> <span>+ Add New Member</span>
          </Link>

          <Link
            to="/admin/hero?action=new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: '#FFFFFF',
              border: '1.5px solid #184332',
              color: '#184332',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <FaPlus /> <span>New Hero Banner</span>
          </Link>

          <Link
            to="/admin/testimonials?action=new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: '#FFFFFF',
              border: '1.5px solid #184332',
              color: '#184332',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <FaPlus /> <span>Add Testimony</span>
          </Link>

          <Link
            to="/admin/gallery?action=new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: '#FFFFFF',
              border: '1.5px solid #184332',
              color: '#184332',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <FaPlus /> <span>Upload Gallery Photo</span>
          </Link>

          <Link
            to="/admin/lyrics?action=new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: '#FFFFFF',
              border: '1.5px solid #184332',
              color: '#184332',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
            }}
          >
            <FaPlus /> <span>Add Worship Video &amp; Lyrics</span>
          </Link>
        </div>
      </div>

      {/* Split Section: Recent Testimonials & Recent Photos (White Cards, Deep Green Headings) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24 }}>
        {/* Left: Recent Testimonies */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 14,
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#122D24', fontFamily: 'var(--font-serif, serif)', fontWeight: 700 }}>
              Recent Testimonies
            </h3>
            <Link to="/admin/testimonials" style={{ color: '#184332', fontSize: '0.86rem', textDecoration: 'none', fontWeight: 700 }}>
              View All →
            </Link>
          </div>

          {recent.testimonials?.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>No testimonies submitted yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recent.testimonials.map((t) => (
                <div
                  key={t._id}
                  style={{
                    background: '#F8FAF9',
                    border: '1px solid #E2E8F0',
                    borderRadius: 10,
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{ fontWeight: 700, color: '#122D24', fontSize: '0.94rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 3 }}>
                      By <strong style={{ color: '#184332' }}>{t.name}</strong> • {t.category} • {t.date}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => handleQuickToggleTestimonial(t._id)}
                      title={t.isApproved ? 'Click to unpublish' : 'Click to approve & publish'}
                      style={{
                        background: t.isApproved ? '#DCFCE7' : '#FEF3C7',
                        border: `1px solid ${t.isApproved ? '#86EFAC' : '#FDE68A'}`,
                        color: t.isApproved ? '#15803D' : '#B45309',
                        padding: '6px 12px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      {t.isApproved ? <FaCheck /> : <FaTimes />}
                      <span>{t.isApproved ? 'Approved' : 'Pending'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Photos in Gallery */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: 14,
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#122D24', fontFamily: 'var(--font-serif, serif)', fontWeight: 700 }}>
              Recent Gallery Images
            </h3>
            <Link to="/admin/gallery" style={{ color: '#184332', fontSize: '0.86rem', textDecoration: 'none', fontWeight: 700 }}>
              View All →
            </Link>
          </div>

          {recent.photos?.length === 0 ? (
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>No gallery photos uploaded yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {recent.photos.map((p) => (
                <div
                  key={p._id}
                  style={{
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    height: 120,
                    border: '1px solid #E2E8F0',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1548625361-125dd14d18ce?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(18, 45, 36, 0.88) 0%, transparent 60%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 10,
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                      {p.title}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#E8CC8F' }}>{p.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
