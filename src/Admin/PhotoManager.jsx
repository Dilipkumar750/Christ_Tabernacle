import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllPhotosAdmin, deletePhoto } from '../services/api';
import { FaPlus, FaEdit, FaTrash, FaCameraRetro, FaStar } from 'react-icons/fa';

const CATEGORIES = ['All', 'Sanctuary', 'Worship', 'Prayer', 'Scripture', 'Youth', 'Events', 'Fellowship'];

export default function PhotoManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo from the gallery?')) return;
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

      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ color: '#A88A42', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '1px' }}>
            CHURCH MEDIA &amp; MEMORIES
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.95rem', color: '#122D24', margin: '4px 0 0', fontWeight: 700 }}>
            Photo Gallery Manager
          </h1>
        </div>
        <button
          onClick={() => navigate('/admin/gallery/new')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'linear-gradient(135deg, #184332 0%, #122D24 100%)', color: '#FFFFFF', borderRadius: 8, fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(24, 67, 50, 0.25)' }}
        >
          <FaPlus /> <span>Upload New Photo</span>
        </button>
      </div>

      {success && <div style={{ background: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '12px 18px', borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>{success}</div>}
      {error && <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#B91C1C', padding: '12px 18px', borderRadius: 8, marginBottom: 20, fontWeight: 500 }}>{error}</div>}

      {/* Category Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28, background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: '14px 18px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{ padding: '7px 16px', borderRadius: 20, border: selectedCategory === cat ? '1.5px solid #184332' : '1px solid #E2E8F0', background: selectedCategory === cat ? '#184332' : '#F8FAF9', color: selectedCategory === cat ? '#FFFFFF' : '#475569', fontSize: '0.84rem', fontWeight: selectedCategory === cat ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s ease' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#184332', fontWeight: 600 }}>Loading photos...</div>
      ) : photos.length === 0 ? (
        <div style={{ background: '#FFFFFF', border: '1.5px dashed #CBD5E1', borderRadius: 14, padding: '48px 20px', textAlign: 'center', color: '#64748B' }}>
          <FaCameraRetro style={{ fontSize: '2.5rem', color: '#184332', marginBottom: 12 }} />
          <h3 style={{ color: '#122D24', margin: '0 0 6px' }}>No Photos Found</h3>
          <p>Upload church moments, Sunday communion or altar memories to display here.</p>
          <button
            onClick={() => navigate('/admin/gallery/new')}
            style={{ padding: '10px 20px', background: '#184332', color: '#FFFFFF', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}
          >
            Upload First Photo
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {photos.map((p) => (
            <div
              key={p._id}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              {/* Image Only (No Title, No Description, No Date) */}
              <div style={{ position: 'relative', height: 210, background: '#0F291E', overflow: 'hidden' }}>
                <img
                  src={p.image}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = '#E2E8F0';
                  }}
                />
                {p.category && (
                  <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(18,45,36,0.88)', color: '#FAF6EE', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(214,182,107,0.3)', backdropFilter: 'blur(4px)' }}>
                    {p.category}
                  </div>
                )}
                {p.isFeatured && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: '#D97706', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <FaStar /> Featured
                  </div>
                )}
              </div>

              {/* Action Bar (Edit & Delete only — no title, no description, no date) */}
              <div style={{ padding: '10px 14px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, borderTop: '1px solid #F1F5F9' }}>
                <button
                  onClick={() => navigate('/admin/gallery/edit/' + p._id)}
                  style={{ padding: '6px 14px', background: '#EAF3EE', border: '1.5px solid #184332', color: '#184332', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{ padding: '6px 14px', background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
