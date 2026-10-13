import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
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
  FaRegStar,
} from 'react-icons/fa';

const CATEGORIES = ['All', 'Healing', 'Deliverance', 'Family', 'Breakthrough', 'Prayer', 'Salvation', 'General'];

export default function TestimonialManager() {
  const [searchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState(''); // '' = all, 'approved', 'pending'
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: 'Chennai, India',
    category: 'Healing',
    title: '',
    story: '',
    verse: '',
    date: '',
    isApproved: true,
    isFeatured: false,
  });

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
    if (searchParams.get('action') === 'new') {
      openCreateModal();
    }
  }, [selectedCategory, statusFilter]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      location: 'Chennai, India',
      category: 'Healing',
      title: '',
      story: '',
      verse: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      isApproved: true,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      location: item.location || '',
      category: item.category || 'Healing',
      title: item.title || '',
      story: item.story || '',
      verse: item.verse || '',
      date: item.date || '',
      isApproved: item.isApproved !== undefined ? item.isApproved : true,
      isFeatured: item.isFeatured || false,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.story) {
      alert('Please fill in Member Name, Testimony Title, and Story description');
      return;
    }

    try {
      if (editingItem) {
        await updateTestimonial(editingItem._id, formData);
        setSuccess('Testimony updated successfully');
      } else {
        await createTestimonial(formData);
        setSuccess('New testimony published');
      }
      closeModal();
      fetchItems();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to save testimony: ' + err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete testimony: "${title}"?`)) return;
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
      alert('Failed to toggle approval: ' + err.message);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name?.toLowerCase().includes(q) ||
      t.title?.toLowerCase().includes(q) ||
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
          <div style={{ color: '#D6B66B', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>
            CONGREGATION MIRACLES & GRACE
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.9rem',
              color: '#FAF6EE',
              margin: '4px 0 0',
            }}
          >
            Testimonials & Miracles Manager
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 22px',
            background: 'linear-gradient(135deg, #E0C47A 0%, #D6B66B 100%)',
            color: '#0C2219',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(214, 182, 107, 0.35)',
          }}
        >
          <FaPlus /> <span>Add New Testimony</span>
        </button>
      </div>

      {success && (
        <div
          style={{
            background: 'rgba(74, 222, 128, 0.15)',
            border: '1px solid #4ADE80',
            color: '#4ADE80',
            padding: '12px 18px',
            borderRadius: 10,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          {success}
        </div>
      )}

      {error && (
        <div
          style={{
            background: 'rgba(235, 87, 87, 0.15)',
            border: '1px solid rgba(235, 87, 87, 0.4)',
            color: '#FFA2A2',
            padding: '12px 18px',
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        style={{
          background: 'rgba(12, 34, 25, 0.7)',
          border: '1px solid rgba(214, 182, 107, 0.2)',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
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
                border: selectedCategory === cat ? '1px solid #D6B66B' : '1px solid rgba(214, 182, 107, 0.15)',
                background: selectedCategory === cat ? 'rgba(214, 182, 107, 0.2)' : 'transparent',
                color: selectedCategory === cat ? '#FAF6EE' : '#8BA698',
                fontSize: '0.82rem',
                fontWeight: selectedCategory === cat ? 600 : 400,
                cursor: 'pointer',
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
              background: 'rgba(5, 16, 11, 0.8)',
              border: '1px solid rgba(214, 182, 107, 0.25)',
              borderRadius: 8,
              color: '#FAF6EE',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="">All Statuses</option>
            <option value="approved">Approved & Published</option>
            <option value="pending">Pending Review</option>
          </select>

          <div style={{ position: 'relative' }}>
            <FaSearch
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#709180',
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
                background: 'rgba(5, 16, 11, 0.8)',
                border: '1px solid rgba(214, 182, 107, 0.25)',
                borderRadius: 8,
                color: '#FAF6EE',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#D6B66B' }}>
          Loading testimonies...
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div
          style={{
            background: 'rgba(12, 34, 25, 0.6)',
            border: '1px dashed rgba(214, 182, 107, 0.3)',
            borderRadius: 14,
            padding: '48px 20px',
            textAlign: 'center',
            color: '#8BA698',
          }}
        >
          <FaComments style={{ fontSize: '2.5rem', color: '#D6B66B', marginBottom: 12 }} />
          <h3>No Testimonies Found</h3>
          <p>No testimonies match the selected filter or search term.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          {filteredTestimonials.map((t) => (
            <div
              key={t._id}
              style={{
                background: 'rgba(12, 34, 25, 0.75)',
                border: '1px solid rgba(214, 182, 107, 0.2)',
                borderRadius: 14,
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      background: 'rgba(214, 182, 107, 0.15)',
                      color: '#E8CC8F',
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontWeight: 600,
                    }}
                  >
                    {t.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {t.isFeatured && (
                      <span title="Featured Story" style={{ color: '#FBBF24', fontSize: '0.9rem' }}>
                        <FaStar />
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: 6,
                        fontWeight: 600,
                        background: t.isApproved ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                        color: t.isApproved ? '#4ADE80' : '#FBBF24',
                        border: `1px solid ${t.isApproved ? '#4ADE80' : '#FBBF24'}`,
                      }}
                    >
                      {t.isApproved ? 'Published' : 'Pending'}
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    margin: '0 0 8px',
                    fontSize: '1.2rem',
                    color: '#FAF6EE',
                    fontFamily: 'var(--font-serif, serif)',
                  }}
                >
                  {t.title}
                </h3>

                <p
                  style={{
                    color: '#C2D6CB',
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
                  <div style={{ fontSize: '0.78rem', color: '#D6B66B', fontStyle: 'italic', marginBottom: 12 }}>
                    📖 {t.verse}
                  </div>
                )}

                <div style={{ fontSize: '0.82rem', color: '#8BA698' }}>
                  By <strong style={{ color: '#FAF6EE' }}>{t.name}</strong> • {t.location} • {t.date}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: '1px solid rgba(214, 182, 107, 0.1)',
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
                    color: t.isApproved ? '#4ADE80' : '#FBBF24',
                    fontSize: '0.82rem',
                    fontWeight: 600,
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
                    onClick={() => openEditModal(t)}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(214, 182, 107, 0.15)',
                      border: '1px solid rgba(214, 182, 107, 0.3)',
                      color: '#D6B66B',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
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
                      background: 'rgba(235, 87, 87, 0.15)',
                      border: '1px solid rgba(235, 87, 87, 0.3)',
                      color: '#FFA2A2',
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

      {/* Modal for Create / Edit Testimony */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 640,
              background: 'linear-gradient(160deg, #0E291D 0%, #081710 100%)',
              border: '1px solid rgba(214, 182, 107, 0.35)',
              borderRadius: 18,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
              padding: '28px 32px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-serif, serif)',
                  color: '#FAF6EE',
                  fontSize: '1.4rem',
                }}
              >
                {editingItem ? 'Edit Testimony' : 'Record New Testimony of Grace'}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8BA698',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Member Name and Location */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Testifier Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sister Hannah D."
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(5, 16, 11, 0.8)',
                      border: '1px solid rgba(214, 182, 107, 0.25)',
                      borderRadius: 8,
                      color: '#FAF6EE',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Chennai, India"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(5, 16, 11, 0.8)',
                      border: '1px solid rgba(214, 182, 107, 0.25)',
                      borderRadius: 8,
                      color: '#FAF6EE',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              {/* Category & Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(5, 16, 11, 0.8)',
                      border: '1px solid rgba(214, 182, 107, 0.25)',
                      borderRadius: 8,
                      color: '#FAF6EE',
                      fontSize: '0.92rem',
                    }}
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Date Recorded
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. October 2026"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(5, 16, 11, 0.8)',
                      border: '1px solid rgba(214, 182, 107, 0.25)',
                      borderRadius: 8,
                      color: '#FAF6EE',
                      fontSize: '0.92rem',
                    }}
                  />
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Testimony Title / Miracle Headline *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Miraculous Healing from Chronic Illness"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(5, 16, 11, 0.8)',
                    border: '1px solid rgba(214, 182, 107, 0.25)',
                    borderRadius: 8,
                    color: '#FAF6EE',
                    fontSize: '0.92rem',
                  }}
                />
              </div>

              {/* Story */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Full Testimony Story *
                </label>
                <textarea
                  rows={5}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Write the full miracle testimony..."
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(5, 16, 11, 0.8)',
                    border: '1px solid rgba(214, 182, 107, 0.25)',
                    borderRadius: 8,
                    color: '#FAF6EE',
                    fontSize: '0.92rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Verse */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Scripture Verse of Praise
                </label>
                <input
                  type="text"
                  value={formData.verse}
                  onChange={(e) => setFormData({ ...formData, verse: e.target.value })}
                  placeholder="e.g. Jeremiah 30:17 — 'For I will restore health to you and heal you...'"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(5, 16, 11, 0.8)',
                    border: '1px solid rgba(214, 182, 107, 0.25)',
                    borderRadius: 8,
                    color: '#FAF6EE',
                    fontSize: '0.92rem',
                  }}
                />
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#FAF6EE' }}>
                  <input
                    type="checkbox"
                    checked={formData.isApproved}
                    onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: '#D6B66B' }}
                  />
                  <span>Publish to Congregation</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#FAF6EE' }}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: '#D6B66B' }}
                  />
                  <span>Feature on Highlights</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '10px 20px',
                    background: 'transparent',
                    border: '1px solid #8BA698',
                    color: '#BACDC4',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #E0C47A 0%, #D6B66B 100%)',
                    color: '#0C2219',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(214, 182, 107, 0.35)',
                  }}
                >
                  {editingItem ? 'Save Changes' : 'Publish Testimony'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
