import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getAllHeroSlidesAdmin,
  deleteHeroSlide,
  toggleHeroSlide,
} from '../services/api';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaImages,
} from 'react-icons/fa';

export default function HeroManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const data = await getAllHeroSlidesAdmin();
      setSlides(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load hero slides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccess(''), 4000);
    }
  }, [location.state]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteHeroSlide(id);
      setSuccess('Hero slide deleted');
      fetchSlides();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to delete slide: ' + err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleHeroSlide(id);
      fetchSlides();
    } catch (err) {
      alert('Failed to toggle status: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
          <div style={{ color: '#A88A42', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '1px' }}>
            HOMEPAGE DYNAMIC SECTION
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.95rem',
              color: '#122D24',
              margin: '4px 0 0',
              fontWeight: 700,
            }}
          >
            Hero Slides &amp; Banner Manager
          </h1>
        </div>

        <button
          onClick={() => navigate('/admin/hero/new')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 22px',
            background: 'linear-gradient(135deg, #184332 0%, #122D24 100%)',
            color: '#FFFFFF',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(24, 67, 50, 0.25)',
          }}
        >
          <FaPlus /> <span>Add New Hero Slide</span>
        </button>
      </div>

      {success && (
        <div
          style={{
            background: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            padding: '12px 18px',
            borderRadius: 8,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          {success}
        </div>
      )}

      {error && (
        <div
          style={{
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            color: '#B91C1C',
            padding: '12px 18px',
            borderRadius: 8,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      )}

      {/* Hero Slides List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#184332', fontWeight: 600 }}>
          Loading hero banners...
        </div>
      ) : slides.length === 0 ? (
        <div
          style={{
            background: '#FFFFFF',
            border: '1.5px dashed #CBD5E1',
            borderRadius: 14,
            padding: '48px 20px',
            textAlign: 'center',
            color: '#64748B',
          }}
        >
          <FaImages style={{ fontSize: '2.5rem', color: '#184332', marginBottom: 12 }} />
          <h3 style={{ color: '#122D24', margin: '0 0 6px' }}>No Hero Slides Yet</h3>
          <p>Add your first sanctuary hero slide to display on the public homepage banner.</p>
          <button
            onClick={openCreateModal}
            style={{
              padding: '10px 20px',
              background: '#184332',
              color: '#FFFFFF',
              fontWeight: 700,
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              marginTop: 12,
            }}
          >
            Create Slide
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {slides.map((slide, index) => (
            <div
              key={slide._id}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 14,
                overflow: 'hidden',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
              }}
            >
              {/* Image Thumbnail */}
              <div
                style={{
                  width: 250,
                  minHeight: 160,
                  position: 'relative',
                  background: '#F1F5F9',
                  flexShrink: 0,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'rgba(18, 45, 36, 0.85)',
                    color: '#FAF6EE',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 6,
                    border: '1px solid rgba(214, 182, 107, 0.4)',
                  }}
                >
                  #{slide.order || index + 1}
                </span>
              </div>

              {/* Slide Details */}
              <div
                style={{
                  flex: 1,
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minWidth: 280,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    {slide.tag && (
                      <span
                        style={{
                          fontSize: '0.74rem',
                          background: '#EAF3EE',
                          color: '#184332',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontWeight: 700,
                        }}
                      >
                        {slide.tag}
                      </span>
                    )}
                    {slide.verse && (
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: '#64748B',
                          fontStyle: 'italic',
                        }}
                      >
                        📖 {slide.verse}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      margin: '0 0 6px',
                      fontSize: '1.25rem',
                      color: '#122D24',
                      fontFamily: 'var(--font-serif, serif)',
                      fontWeight: 700,
                    }}
                  >
                    {slide.title}
                  </h3>
                  <p style={{ color: '#475569', margin: '0 0 12px', fontSize: '0.92rem', lineHeight: 1.5 }}>
                    {slide.subtitle}
                  </p>

                  <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                    Button: <strong style={{ color: '#184332' }}>{slide.actionText}</strong> → {slide.actionLink}
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 18,
                    paddingTop: 14,
                    borderTop: '1px solid #F1F5F9',
                  }}
                >
                  <button
                    onClick={() => handleToggle(slide._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: slide.isActive ? '#15803D' : '#94A3B8',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                    }}
                  >
                    {slide.isActive ? <FaToggleOn style={{ fontSize: '1.5rem' }} /> : <FaToggleOff style={{ fontSize: '1.5rem' }} />}
                    <span>{slide.isActive ? 'Active on Homepage' : 'Hidden / Inactive'}</span>
                  </button>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => navigate('/admin/hero/edit/' + slide._id)}
                      style={{
                        padding: '7px 14px',
                        background: '#EAF3EE',
                        border: '1.5px solid #184332',
                        color: '#184332',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slide._id, slide.title)}
                      style={{
                        padding: '7px 14px',
                        background: '#FEE2E2',
                        border: '1px solid #FECACA',
                        color: '#DC2626',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
