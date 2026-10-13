import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAllPhotosAdmin,
  createPhoto,
  updatePhoto,
  deletePhoto,
  uploadImageFile,
} from '../services/api';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
  FaCameraRetro,
  FaTimes,
  FaStar,
} from 'react-icons/fa';

const CATEGORIES = ['All', 'Sanctuary', 'Worship', 'Prayer', 'Scripture', 'Youth', 'Events', 'Fellowship'];

export default function PhotoManager() {
  const [searchParams] = useSearchParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sanctuary',
    image: '',
    caption: '',
    date: '',
    isFeatured: false,
    order: 1,
  });

  const fetchPhotos = async () => {
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
  };

  useEffect(() => {
    fetchPhotos();
    if (searchParams.get('action') === 'new') {
      openCreateModal();
    }
  }, [selectedCategory]);

  const openCreateModal = () => {
    setEditingPhoto(null);
    setFormData({
      title: '',
      category: 'Sanctuary',
      image: '',
      caption: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      isFeatured: false,
      order: (photos?.length || 0) + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title || '',
      category: photo.category || 'Sanctuary',
      image: photo.image || '',
      caption: photo.caption || '',
      date: photo.date || '',
      isFeatured: photo.isFeatured || false,
      order: photo.order || 1,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPhoto(null);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await uploadImageFile(file);
      setFormData((prev) => ({ ...prev, image: res.url }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      alert('Please fill in Title and provide an Image');
      return;
    }

    try {
      if (editingPhoto) {
        await updatePhoto(editingPhoto._id, formData);
        setSuccess('Photo updated successfully');
      } else {
        await createPhoto(formData);
        setSuccess('New photo added to sanctuary gallery');
      }
      closeModal();
      fetchPhotos();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to save photo: ' + err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete photo: "${title}"?`)) return;
    try {
      await deletePhoto(id);
      setSuccess('Photo removed from gallery');
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
          <div style={{ color: '#D6B66B', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>
            CHURCH MEDIA & MEMORIES
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.9rem',
              color: '#FAF6EE',
              margin: '4px 0 0',
            }}
          >
            Photo Gallery Manager
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
          <FaPlus /> <span>Upload New Photo</span>
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

      {/* Category Filter Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 28,
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '7px 16px',
              borderRadius: 20,
              border: selectedCategory === cat ? '1px solid #D6B66B' : '1px solid rgba(214, 182, 107, 0.2)',
              background: selectedCategory === cat ? 'rgba(214, 182, 107, 0.2)' : 'rgba(12, 34, 25, 0.6)',
              color: selectedCategory === cat ? '#FAF6EE' : '#8BA698',
              fontSize: '0.84rem',
              fontWeight: selectedCategory === cat ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#D6B66B' }}>
          Loading photos...
        </div>
      ) : photos.length === 0 ? (
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
          <FaCameraRetro style={{ fontSize: '2.5rem', color: '#D6B66B', marginBottom: 12 }} />
          <h3>No Photos Found</h3>
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
                background: 'rgba(12, 34, 25, 0.75)',
                border: '1px solid rgba(214, 182, 107, 0.2)',
                borderRadius: 14,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Image with overlay tags */}
              <div style={{ position: 'relative', height: 190, background: '#05100B' }}>
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
                    background: 'rgba(12, 34, 25, 0.85)',
                    color: '#D6B66B',
                    fontSize: '0.72rem',
                    fontWeight: 600,
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
                      background: 'rgba(251, 191, 36, 0.9)',
                      color: '#0C2219',
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
                      fontSize: '1.05rem',
                      color: '#FAF6EE',
                      fontFamily: 'var(--font-serif, serif)',
                    }}
                  >
                    {p.title}
                  </h3>
                  {p.caption && (
                    <p
                      style={{
                        color: '#BACDC4',
                        fontSize: '0.82rem',
                        lineHeight: 1.4,
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
                  <div style={{ fontSize: '0.75rem', color: '#8BA698' }}>{p.date}</div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 12,
                    borderTop: '1px solid rgba(214, 182, 107, 0.1)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                  }}
                >
                  <button
                    onClick={() => openEditModal(p)}
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
                    onClick={() => handleDelete(p._id, p.title)}
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

      {/* Modal for Create / Edit Photo */}
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
              maxWidth: 600,
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
                {editingPhoto ? 'Edit Photo Details' : 'Add Photo to Gallery'}
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
              {/* Title & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Modern Sanctuary & Sacred Altar"
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
              </div>

              {/* Image Input: File Upload OR Direct URL */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Image Source *
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

                {/* Preview */}
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
                  </div>
                )}
              </div>

              {/* Caption */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="e.g. The illuminated cross and altar where believers gather in prayer."
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

              {/* Date & Featured */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Date Label
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                  <input
                    type="checkbox"
                    id="isFeaturedPhotoCheck"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: '#D6B66B', cursor: 'pointer' }}
                  />
                  <label htmlFor="isFeaturedPhotoCheck" style={{ fontSize: '0.9rem', color: '#FAF6EE', cursor: 'pointer' }}>
                    Highlight as Featured
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
                  {editingPhoto ? 'Save Changes' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
