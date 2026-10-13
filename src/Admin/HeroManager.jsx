import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAllHeroSlidesAdmin,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  toggleHeroSlide,
  uploadImageFile,
} from '../services/api';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaUpload,
  FaLink,
  FaTimes,
  FaImages,
  FaEye,
} from 'react-icons/fa';

export default function HeroManager() {
  const [searchParams] = useSearchParams();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    tag: '',
    verse: '',
    actionText: 'Plan a Visit',
    actionLink: '/contact',
    image: '',
    alt: '',
    order: 1,
    isActive: true,
  });

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
    if (searchParams.get('action') === 'new') {
      openCreateModal();
    }
  }, []);

  const openCreateModal = () => {
    setEditingSlide(null);
    setFormData({
      title: '',
      subtitle: '',
      tag: '',
      verse: '',
      actionText: 'Plan a Visit',
      actionLink: '/contact',
      image: '',
      alt: '',
      order: (slides?.length || 0) + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      tag: slide.tag || '',
      verse: slide.verse || '',
      actionText: slide.actionText || 'Plan a Visit',
      actionLink: slide.actionLink || '/contact',
      image: slide.image || '',
      alt: slide.alt || '',
      order: slide.order || 1,
      isActive: slide.isActive !== undefined ? slide.isActive : true,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSlide(null);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await uploadImageFile(file);
      setFormData((prev) => ({ ...prev, image: res.url }));
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle || !formData.image) {
      alert('Please fill in Title, Subtitle, and provide an Image');
      return;
    }

    try {
      if (editingSlide) {
        await updateHeroSlide(editingSlide._id, formData);
        setSuccess('Hero banner updated successfully');
      } else {
        await createHeroSlide(formData);
        setSuccess('New hero banner created successfully');
      }
      closeModal();
      fetchSlides();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to save slide: ' + err.message);
    }
  };

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
          <div style={{ color: '#D6B66B', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>
            HOMEPAGE DYNAMIC SECTION
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.9rem',
              color: '#FAF6EE',
              margin: '4px 0 0',
            }}
          >
            Hero Slides & Banner Manager
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
          <FaPlus /> <span>Add New Hero Slide</span>
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

      {/* Hero Slides List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#D6B66B' }}>
          Loading hero banners...
        </div>
      ) : slides.length === 0 ? (
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
          <FaImages style={{ fontSize: '2.5rem', color: '#D6B66B', marginBottom: 12 }} />
          <h3>No Hero Slides Yet</h3>
          <p>Add your first sanctuary hero slide to display on the public homepage banner.</p>
          <button
            onClick={openCreateModal}
            style={{
              padding: '10px 20px',
              background: '#D6B66B',
              color: '#0C2219',
              fontWeight: 600,
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              marginTop: 10,
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
                background: 'rgba(12, 34, 25, 0.75)',
                border: '1px solid rgba(214, 182, 107, 0.2)',
                borderRadius: 14,
                overflow: 'hidden',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Image Thumbnail */}
              <div
                style={{
                  width: 240,
                  minHeight: 160,
                  position: 'relative',
                  background: '#05100B',
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
                    background: 'rgba(0,0,0,0.7)',
                    color: '#D6B66B',
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
                          fontSize: '0.72rem',
                          background: 'rgba(214, 182, 107, 0.15)',
                          color: '#E8CC8F',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontWeight: 600,
                        }}
                      >
                        {slide.tag}
                      </span>
                    )}
                    {slide.verse && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#8BA698',
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
                      color: '#FAF6EE',
                      fontFamily: 'var(--font-serif, serif)',
                    }}
                  >
                    {slide.title}
                  </h3>
                  <p style={{ color: '#BACDC4', margin: '0 0 12px', fontSize: '0.9rem', lineHeight: 1.45 }}>
                    {slide.subtitle}
                  </p>

                  <div style={{ fontSize: '0.8rem', color: '#8BA698' }}>
                    Button: <strong style={{ color: '#D6B66B' }}>{slide.actionText}</strong> → {slide.actionLink}
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
                    borderTop: '1px solid rgba(214, 182, 107, 0.1)',
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
                      color: slide.isActive ? '#4ADE80' : '#8BA698',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                    }}
                  >
                    {slide.isActive ? <FaToggleOn style={{ fontSize: '1.4rem' }} /> : <FaToggleOff style={{ fontSize: '1.4rem' }} />}
                    <span>{slide.isActive ? 'Active on Homepage' : 'Hidden / Inactive'}</span>
                  </button>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={() => openEditModal(slide)}
                      style={{
                        padding: '7px 14px',
                        background: 'rgba(214, 182, 107, 0.15)',
                        border: '1px solid rgba(214, 182, 107, 0.3)',
                        color: '#D6B66B',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
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
                        background: 'rgba(235, 87, 87, 0.15)',
                        border: '1px solid rgba(235, 87, 87, 0.3)',
                        color: '#FFA2A2',
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

      {/* Modal for Create / Edit Slide */}
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
              maxWidth: 620,
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
                {editingSlide ? 'Edit Hero Banner Slide' : 'Create New Hero Banner Slide'}
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
              {/* Title */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Hero Headline / Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Christ's Tabernacle Prayer & Worship Centre"
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

              {/* Subtitle */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Subtitle / Mission Statement *
                </label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. A House of Prayer • A Place of Deliverance • A Centre of Divine Healing"
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

              {/* Tag & Scripture Verse */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. Established 1991"
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
                    Scripture Verse Reference
                  </label>
                  <input
                    type="text"
                    value={formData.verse}
                    onChange={(e) => setFormData({ ...formData, verse: e.target.value })}
                    placeholder="e.g. Isaiah 56:7"
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

              {/* Button Text & Link */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Action Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.actionText}
                    onChange={(e) => setFormData({ ...formData, actionText: e.target.value })}
                    placeholder="e.g. Plan a Visit"
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
                    Action Button Route / URL
                  </label>
                  <input
                    type="text"
                    value={formData.actionLink}
                    onChange={(e) => setFormData({ ...formData, actionLink: e.target.value })}
                    placeholder="e.g. /contact or /prayers"
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

              {/* Image Input: File Upload OR Direct URL */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Banner Image Source *
                </label>
                <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Paste image URL (e.g. https://... or /uploads/...)"
                    required
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      background: 'rgba(5, 16, 11, 0.8)',
                      border: '1px solid rgba(214, 182, 107, 0.25)',
                      borderRadius: 8,
                      color: '#FAF6EE',
                      fontSize: '0.92rem',
                    }}
                  />
                  <label
                    style={{
                      padding: '10px 14px',
                      background: 'rgba(214, 182, 107, 0.2)',
                      border: '1px solid #D6B66B',
                      color: '#E8CC8F',
                      borderRadius: 8,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <FaUpload /> {uploadingImage ? 'Uploading...' : 'Upload File'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Image Live Preview */}
                {formData.image && (
                  <div
                    style={{
                      borderRadius: 8,
                      overflow: 'hidden',
                      height: 120,
                      border: '1px solid rgba(214, 182, 107, 0.3)',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 6,
                        left: 8,
                        background: 'rgba(0,0,0,0.7)',
                        color: '#D6B66B',
                        fontSize: '0.72rem',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      Live Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Order and Active Switch */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Display Order Sequence
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    min={1}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                  <input
                    type="checkbox"
                    id="isActiveCheck"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: '#D6B66B', cursor: 'pointer' }}
                  />
                  <label htmlFor="isActiveCheck" style={{ fontSize: '0.9rem', color: '#FAF6EE', cursor: 'pointer' }}>
                    Publish on Public Homepage
                  </label>
                </div>
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
                  {editingSlide ? 'Save Changes' : 'Create Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
