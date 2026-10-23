import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getAllPhotosAdmin,
  deletePhoto,
} from '../services/api';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCameraRetro,
  FaStar,
} from 'react-icons/fa';

const CATEGORIES = ['All', 'Sanctuary', 'Worship', 'Prayer', 'Scripture', 'Youth', 'Events', 'Fellowship'];

export default function PhotoManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPhotosAdmin(selectedCategory);
      setPhotos(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load gallery photos');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchPhotos();
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccess(''), 4000);
    }
  }, [fetchPhotos, location.state]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete photo: "${title}"?`)) return;
    try {
      await deletePhoto(id);
      setSuccess('Photo deleted from gallery');
      fetchPhotos();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to delete photo: ' + err.message);
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
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ color: '#A88A42', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '1px' }}>
            CHURCH MEDIA &amp; MEMORIES
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
            Photo Gallery Manager
          </h1>
        </div>

        <button
          onClick={() => navigate('/admin/gallery/new')}
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
          <FaPlus /> <span>Upload New Photo</span>
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

      {/* Category Filter Pills (White Card with Chips) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 28,
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: 12,
          padding: '14px 18px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '7px 16px',
              borderRadius: 20,
              border: selectedCategory === cat ? '1.5px solid #184332' : '1px solid #E2E8F0',
              background: selectedCategory === cat ? '#184332' : '#F8FAF9',
              color: selectedCategory === cat ? '#FFFFFF' : '#475569',
              fontSize: '0.84rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#184332', fontWeight: 600 }}>
          Loading photos...
        </div>
      ) : photos.length === 0 ? (
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
          <FaCameraRetro style={{ fontSize: '2.5rem', color: '#184332', marginBottom: 12 }} />
          <h3 style={{ color: '#122D24', margin: '0 0 6px' }}>No Photos Found</h3>
          <p>Upload church moments, Sunday communion or altar memories to display here.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 22,
          }}
        >
          {photos.map((p) => (
            <div
              key={p._id}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 14,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
              }}
            >
              {/* Image with overlay tags */}
              <div style={{ position: 'relative', height: 190, background: '#F1F5F9' }}>
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
                    top: 10,
                    left: 10,
                    background: 'rgba(18, 45, 36, 0.85)',
                    color: '#FAF6EE',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 6,
                    border: '1px solid rgba(214, 182, 107, 0.3)',
                  }}
                >
                  {p.category}
                </div>

                {p.isFeatured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: '#D97706',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <FaStar /> Featured
                  </div>
                )}
              </div>

              {/* Photo Meta */}
              <div
                style={{
                  padding: '16px 18px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: '0 0 6px',
                      fontSize: '1.1rem',
                      color: '#122D24',
                      fontFamily: 'var(--font-serif, serif)',
                      fontWeight: 700,
                    }}
                  >
                    {p.title}
                  </h3>
                  {p.caption && (
                    <p
                      style={{
                        color: '#475569',
                        fontSize: '0.84rem',
                        lineHeight: 1.45,
                        margin: '0 0 10px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {p.caption}
                    </p>
                  )}
                  <div style={{ fontSize: '0.76rem', color: '#64748B' }}>{p.date}</div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 12,
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                  }}
                >
                  <button
                    onClick={() => navigate('/admin/gallery/edit/' + p._id)}
                    style={{
                      padding: '6px 12px',
                      background: '#EAF3EE',
                      border: '1.5px solid #184332',
                      color: '#184332',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id, p.title)}
                    style={{
                      padding: '6px 12px',
                      background: '#FEE2E2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
