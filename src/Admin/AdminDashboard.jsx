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
  FaArrowRight,
  FaCheckCircle,
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
      <div style={{ padding: '60px 0', textAlign: 'center', color: '#D6B66B' }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: '3px solid rgba(214, 182, 107, 0.2)',
            borderTopColor: '#D6B66B',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p>Loading Sanctuary Dashboard metrics...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const stats = data?.stats || {
    hero: { total: 0, active: 0 },
    testimonials: { total: 0, approved: 0, pending: 0 },
    gallery: { total: 0 },
    lyrics: { total: 0 },
  };

  const recent = data?.recent || {
    testimonials: [],
    photos: [],
    songs: [],
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Top Banner Greeting */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(24, 67, 50, 0.9) 0%, rgba(12, 34, 25, 0.95) 100%)',
          border: '1px solid rgba(214, 182, 107, 0.25)',
          borderRadius: 16,
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          marginBottom: 32,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div>
          <div style={{ color: '#D6B66B', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>
            CHRIST'S TABERNACLE ADMINISTRATION
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '2rem',
              color: '#FAF6EE',
              margin: '6px 0 8px',
            }}
          >
            Welcome, Sanctuary Administrator
          </h1>
          <p style={{ color: '#8BA698', margin: 0, fontSize: '0.95rem' }}>
            Control and publish dynamic hero slides, congregation testimonies, gallery archives, and worship lyrics in real time.
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
              background: 'rgba(214, 182, 107, 0.15)',
              border: '1px solid rgba(214, 182, 107, 0.3)',
              color: '#D6B66B',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.88rem',
              transition: 'background 0.2s',
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
            background: 'rgba(235, 87, 87, 0.15)',
            border: '1px solid rgba(235, 87, 87, 0.4)',
            color: '#FFA2A2',
            padding: '14px 18px',
            borderRadius: 10,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      {/* 4 Stat Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 36,
        }}
      >
        {/* Card 1: Hero Banners */}
        <div
          style={{
            background: 'rgba(12, 34, 25, 0.7)',
            border: '1px solid rgba(214, 182, 107, 0.2)',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#8BA698', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Hero Banners
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#FAF6EE', marginTop: 4 }}>
                {stats.hero.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(214, 182, 107, 0.15)',
                color: '#D6B66B',
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
              borderTop: '1px solid rgba(214, 182, 107, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
            }}
          >
            <span style={{ color: '#4ADE80' }}>● {stats.hero.active} Active on Home</span>
            <Link to="/admin/hero" style={{ color: '#D6B66B', textDecoration: 'none', fontWeight: 600 }}>
              Manage →
            </Link>
          </div>
        </div>

        {/* Card 2: Testimonials */}
        <div
          style={{
            background: 'rgba(12, 34, 25, 0.7)',
            border: '1px solid rgba(214, 182, 107, 0.2)',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#8BA698', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Testimonies
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#FAF6EE', marginTop: 4 }}>
                {stats.testimonials.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(232, 183, 183, 0.15)',
                color: '#E8B7B7',
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
              borderTop: '1px solid rgba(214, 182, 107, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
            }}
          >
            <span style={{ color: stats.testimonials.pending > 0 ? '#FBBF24' : '#4ADE80' }}>
              {stats.testimonials.pending > 0
                ? `● ${stats.testimonials.pending} Pending Review`
                : `● ${stats.testimonials.approved} Published`}
            </span>
            <Link to="/admin/testimonials" style={{ color: '#D6B66B', textDecoration: 'none', fontWeight: 600 }}>
              Review →
            </Link>
          </div>
        </div>

        {/* Card 3: Photo Gallery */}
        <div
          style={{
            background: 'rgba(12, 34, 25, 0.7)',
            border: '1px solid rgba(214, 182, 107, 0.2)',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#8BA698', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Photo Gallery
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#FAF6EE', marginTop: 4 }}>
                {stats.gallery.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(96, 165, 250, 0.15)',
                color: '#93C5FD',
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
              borderTop: '1px solid rgba(214, 182, 107, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
            }}
          >
            <span style={{ color: '#4ADE80' }}>● All Albums Active</span>
            <Link to="/admin/gallery" style={{ color: '#D6B66B', textDecoration: 'none', fontWeight: 600 }}>
              Upload →
            </Link>
          </div>
        </div>

        {/* Card 4: Worship Lyrics */}
        <div
          style={{
            background: 'rgba(12, 34, 25, 0.7)',
            border: '1px solid rgba(214, 182, 107, 0.2)',
            borderRadius: 14,
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#8BA698', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Worship Songs & Lyrics
              </span>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#FAF6EE', marginTop: 4 }}>
                {stats.lyrics.total}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'rgba(167, 139, 250, 0.15)',
                color: '#C4B5FD',
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
              borderTop: '1px solid rgba(214, 182, 107, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
            }}
          >
            <span style={{ color: '#4ADE80' }}>● Tamil & English Praise</span>
            <Link to="/admin/lyrics" style={{ color: '#D6B66B', textDecoration: 'none', fontWeight: 600 }}>
              Edit →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{ fontSize: '1.1rem', color: '#D6B66B', marginBottom: 14, fontWeight: 600 }}>
          Quick Management Actions
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link
            to="/admin/hero?action=new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #E0C47A 0%, #D6B66B 100%)',
              color: '#0C2219',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(214, 182, 107, 0.3)',
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
              background: 'rgba(24, 67, 50, 0.8)',
              border: '1px solid rgba(214, 182, 107, 0.3)',
              color: '#FAF6EE',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.88rem',
              textDecoration: 'none',
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
              background: 'rgba(24, 67, 50, 0.8)',
              border: '1px solid rgba(214, 182, 107, 0.3)',
              color: '#FAF6EE',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.88rem',
              textDecoration: 'none',
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
              background: 'rgba(24, 67, 50, 0.8)',
              border: '1px solid rgba(214, 182, 107, 0.3)',
              color: '#FAF6EE',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: '0.88rem',
              textDecoration: 'none',
            }}
          >
            <FaPlus /> <span>Add Worship Lyrics</span>
          </Link>
        </div>
      </div>

      {/* Split Section: Recent Testimonials & Recent Photos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24 }}>
        {/* Left: Recent Testimonies */}
        <div
          style={{
            background: 'rgba(12, 34, 25, 0.7)',
            border: '1px solid rgba(214, 182, 107, 0.2)',
            borderRadius: 14,
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#FAF6EE', fontFamily: 'var(--font-serif, serif)' }}>
              Recent Testimonies
            </h3>
            <Link to="/admin/testimonials" style={{ color: '#D6B66B', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
              View All →
            </Link>
          </div>

          {recent.testimonials?.length === 0 ? (
            <p style={{ color: '#8BA698', fontSize: '0.9rem' }}>No testimonies submitted yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recent.testimonials.map((t) => (
                <div
                  key={t._id}
                  style={{
                    background: 'rgba(5, 16, 11, 0.5)',
                    border: '1px solid rgba(214, 182, 107, 0.12)',
                    borderRadius: 10,
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{ fontWeight: 600, color: '#FAF6EE', fontSize: '0.92rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#8BA698', marginTop: 3 }}>
                      By <strong style={{ color: '#D6B66B' }}>{t.name}</strong> • {t.category} • {t.date}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => handleQuickToggleTestimonial(t._id)}
                      title={t.isApproved ? 'Click to unpublish' : 'Click to approve & publish'}
                      style={{
                        background: t.isApproved ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                        border: `1px solid ${t.isApproved ? '#4ADE80' : '#FBBF24'}`,
                        color: t.isApproved ? '#4ADE80' : '#FBBF24',
                        padding: '6px 10px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 600,
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
            background: 'rgba(12, 34, 25, 0.7)',
            border: '1px solid rgba(214, 182, 107, 0.2)',
            borderRadius: 14,
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#FAF6EE', fontFamily: 'var(--font-serif, serif)' }}>
              Recent Gallery Images
            </h3>
            <Link to="/admin/gallery" style={{ color: '#D6B66B', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
              View All →
            </Link>
          </div>

          {recent.photos?.length === 0 ? (
            <p style={{ color: '#8BA698', fontSize: '0.9rem' }}>No gallery photos uploaded yet.</p>
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
                    border: '1px solid rgba(214, 182, 107, 0.2)',
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
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 10,
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FAF6EE', lineHeight: 1.2 }}>
                      {p.title}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#D6B66B' }}>{p.category}</span>
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
