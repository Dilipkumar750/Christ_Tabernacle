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
  const [selectedYear, setSelectedYear] = useState('All');

  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllPhotosAdmin();
      setPhotos(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load gallery photos');
    } finally {
      setLoading(false);
    }
  }, []);

  const resolvePhotoYear = (p) => {
    if (p.year) return String(p.year);
    if (p.date) {
      const match = String(p.date).match(/\b(19\d{2}|20\d{2})\b/);
      if (match) return match[1];
    }
    if (p.createdAt) {
      const d = new Date(p.createdAt);
      if (!isNaN(d.getTime())) return String(d.getFullYear());
    }
    return '2026';
  };

  const availableYears = ['All', ...Array.from(new Set(photos.map(resolvePhotoYear))).sort((a, b) => b.localeCompare(a))];

  const filteredPhotos = photos.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesYear = selectedYear === 'All' || resolvePhotoYear(p) === selectedYear;
    return matchesCat && matchesYear;
  });

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

      {/* Year & Category Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28, background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#184332', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: 6 }}>Year:</span>
          {availableYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              style={{ padding: '6px 14px', borderRadius: 20, border: selectedYear === yr ? '1.5px solid #D6B66B' : '1px solid #CBD5E1', background: selectedYear === yr ? '#184332' : '#F8FAF9', color: selectedYear === yr ? '#F5E0B0' : '#475569', fontSize: '0.82rem', fontWeight: selectedYear === yr ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s ease' }}
            >
              {yr === 'All' ? 'All Years' : yr}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: 6 }}>Category:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{ padding: '5px 12px', borderRadius: 20, border: selectedCategory === cat ? '1.5px solid #184332' : '1px solid #E2E8F0', background: selectedCategory === cat ? '#184332' : '#FFFFFF', color: selectedCategory === cat ? '#FFFFFF' : '#64748B', fontSize: '0.78rem', fontWeight: selectedCategory === cat ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s ease' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#184332', fontWeight: 600 }}>Loading photos...</div>
      ) : filteredPhotos.length === 0 ? (
        <div style={{ background: '#FFFFFF', border: '1.5px dashed #CBD5E1', borderRadius: 14, padding: '48px 20px', textAlign: 'center', color: '#64748B' }}>
          <FaCameraRetro style={{ fontSize: '2.5rem', color: '#184332', marginBottom: 12 }} />
          <h3 style={{ color: '#122D24', margin: '0 0 6px' }}>No Photos Found</h3>
          <p>No photos match the selected year/category filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedYear('All'); }}
            style={{ padding: '8px 18px', background: '#184332', color: '#FFFFFF', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {filteredPhotos.map((p) => {
            const yr = resolvePhotoYear(p);
            return (
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
                {/* Image with Year Badge */}
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
                  <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <div style={{ background: 'linear-gradient(135deg, #D6B66B 0%, #A88A42 100%)', color: '#0C2219', fontSize: '0.74rem', fontWeight: 800, padding: '3px 9px', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.3)', letterSpacing: '0.5px' }}>
                      ✦ {yr}
                    </div>
                    {p.category && (
                      <div style={{ background: 'rgba(18,45,36,0.88)', color: '#FAF6EE', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(214,182,107,0.3)', backdropFilter: 'blur(4px)' }}>
                        {p.category}
                      </div>
                    )}
                  </div>
                  {p.isFeatured && (
                    <div style={{ position: 'absolute', top: 10, right: 10, background: '#D97706', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <FaStar /> Featured
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div style={{ padding: '10px 14px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, borderTop: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>{p.date || yr}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => navigate('/admin/gallery/edit/' + p._id)}
                      style={{ padding: '6px 12px', background: '#EAF3EE', border: '1.5px solid #184332', color: '#184332', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{ padding: '6px 12px', background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
