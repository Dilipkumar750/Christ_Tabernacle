import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getAllTestimonialsAdmin,
  deleteTestimonial,
  toggleApproveTestimonial,
} from '../services/api';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSearch,
  FaComments,
  FaStar,
} from 'react-icons/fa';

const CATEGORIES = ['All', 'Healing', 'Deliverance', 'Family', 'Breakthrough', 'Prayer', 'Salvation', 'General'];

export default function TestimonialManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getAllTestimonialsAdmin(selectedCategory, statusFilter);
      setTestimonials(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load testimonies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccess(''), 4000);
    }
  }, [selectedCategory, statusFilter, location.state]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete testimony: "${title}"?`)) return;
    try {
      await deleteTestimonial(id);
      setSuccess('Testimony deleted');
      fetchItems();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to delete testimony: ' + err.message);
    }
  };

  const handleToggleApprove = async (id) => {
    try {
      await toggleApproveTestimonial(id);
      fetchItems();
    } catch (err) {
      alert('Failed to toggle status: ' + err.message);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title?.toLowerCase().includes(q) ||
      t.name?.toLowerCase().includes(q) ||
      t.story?.toLowerCase().includes(q) ||
      t.location?.toLowerCase().includes(q)
    );
  });

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
            CONGREGATION PRAISE &amp; BLESSINGS
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
            Sanctuary Testimonies Manager
          </h1>
        </div>

        <button
          onClick={() => navigate('/admin/testimonials/new')}
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
          <FaPlus /> <span>Add New Testimony</span>
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

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: selectedCategory === cat ? '1.5px solid #184332' : '1px solid #E2E8F0',
                background: selectedCategory === cat ? '#184332' : '#F8FAF9',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                fontSize: '0.82rem',
                fontWeight: selectedCategory === cat ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status & Search */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              background: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: 8,
              color: '#0F172A',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="">All Statuses</option>
            <option value="approved">Approved &amp; Published</option>
            <option value="pending">Pending Review</option>
          </select>

          <div style={{ position: 'relative' }}>
            <FaSearch
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B',
                fontSize: '0.8rem',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search testimonies..."
              style={{
                padding: '8px 12px 8px 30px',
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: 8,
                color: '#0F172A',
                fontSize: '0.85rem',
                outline: 'none',
                minWidth: 220,
              }}
            />
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#184332', fontWeight: 600 }}>
          Loading testimonies...
        </div>
      ) : filteredTestimonials.length === 0 ? (
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
          <FaComments style={{ fontSize: '2.5rem', color: '#184332', marginBottom: 12 }} />
          <h3 style={{ color: '#122D24', margin: '0 0 6px' }}>No Testimonies Found</h3>
          <p>No testimonies match the selected filter or search term.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          {filteredTestimonials.map((t) => (
            <div
              key={t._id}
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
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      background: '#EAF3EE',
                      color: '#184332',
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontWeight: 700,
                    }}
                  >
                    {t.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {t.isFeatured && (
                      <span title="Featured Story" style={{ color: '#D97706', fontSize: '0.9rem' }}>
                        <FaStar />
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: '0.74rem',
                        padding: '2px 8px',
                        borderRadius: 6,
                        fontWeight: 700,
                        background: t.isApproved ? '#DCFCE7' : '#FEF3C7',
                        color: t.isApproved ? '#15803D' : '#B45309',
                        border: `1px solid ${t.isApproved ? '#86EFAC' : '#FDE68A'}`,
                      }}
                    >
                      {t.isApproved ? 'Published' : 'Pending'}
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: '1.22rem',
                    color: '#122D24',
                    fontFamily: 'var(--font-serif, serif)',
                    fontWeight: 700,
                  }}
                >
                  {t.title}
                </h3>

                <p
                  style={{
                    color: '#475569',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    margin: '0 0 14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  "{t.story}"
                </p>

                {t.verse && (
                  <div style={{ fontSize: '0.8rem', color: '#A88A42', fontStyle: 'italic', marginBottom: 12, fontWeight: 600 }}>
                    ðŸ“– {t.verse}
                  </div>
                )}

                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  By <strong style={{ color: '#122D24' }}>{t.name}</strong> â€¢ {t.location} â€¢ {t.date}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <button
                  onClick={() => handleToggleApprove(t._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: t.isApproved ? '#15803D' : '#B45309',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {t.isApproved ? <FaCheck /> : <FaTimes />}
                  <span>{t.isApproved ? 'Unpublish' : 'Approve & Publish'}</span>
                </button>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => navigate('/admin/testimonials/edit/' + t._id)}
                    style={{
                      padding: '6px 12px',
                      background: '#EAF3EE',
                      border: '1.5px solid #184332',
                      color: '#184332',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id, t.title)}
                    style={{
                      padding: '6px 12px',
                      background: '#FEE2E2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.82rem',
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
