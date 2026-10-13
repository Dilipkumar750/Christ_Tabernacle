import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAllSongsAdmin,
  createSong,
  updateSong,
  deleteSong,
} from '../services/api';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaMusic,
  FaSearch,
  FaTimes,
  FaEye,
  FaFileAlt,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';

const LANGUAGES = ['All', 'Tamil', 'English', 'Telugu', 'Hindi'];

export default function LyricsManager() {
  const [searchParams] = useSearchParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Search & Filter
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState(null);
  const [previewingSong, setPreviewingSong] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    language: 'Tamil',
    theme: 'Adoration & Praise',
    key: 'C Major',
    tempo: 'Medium',
    lyrics: '',
    audioUrl: '',
    order: 1,
    isActive: true,
  });

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const data = await getAllSongsAdmin(selectedLanguage, searchQuery);
      setSongs(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load worship songs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
    if (searchParams.get('action') === 'new') {
      openCreateModal();
    }
  }, [selectedLanguage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSongs();
  };

  const openCreateModal = () => {
    setEditingSong(null);
    setFormData({
      title: '',
      language: 'Tamil',
      theme: 'Adoration & Praise',
      key: 'C Major',
      tempo: 'Medium',
      lyrics: '',
      audioUrl: '',
      order: (songs?.length || 0) + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (song) => {
    setEditingSong(song);
    setFormData({
      title: song.title || '',
      language: song.language || 'Tamil',
      theme: song.theme || 'Adoration & Praise',
      key: song.key || 'C Major',
      tempo: song.tempo || 'Medium',
      lyrics: song.lyrics || '',
      audioUrl: song.audioUrl || '',
      order: song.order || 1,
      isActive: song.isActive !== undefined ? song.isActive : true,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSong(null);
  };

  const insertSnippet = (snippet) => {
    setFormData((prev) => ({
      ...prev,
      lyrics: prev.lyrics ? `${prev.lyrics}\n\n${snippet}\n` : `${snippet}\n`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.lyrics) {
      alert('Please fill in Song Title and multi-line Lyrics');
      return;
    }

    try {
      if (editingSong) {
        await updateSong(editingSong._id, formData);
        setSuccess('Worship song updated successfully');
      } else {
        await createSong(formData);
        setSuccess('New worship song and lyrics saved');
      }
      closeModal();
      fetchSongs();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to save song: ' + err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete worship song: "${title}"?`)) return;
    try {
      await deleteSong(id);
      setSuccess('Worship song deleted');
      fetchSongs();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      alert('Failed to delete song: ' + err.message);
    }
  };

  const handleToggle = async (song) => {
    try {
      await updateSong(song._id, { isActive: !song.isActive });
      fetchSongs();
    } catch (err) {
      alert('Failed to update song status: ' + err.message);
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
            PRAISE & SANCTUARY REPERTOIRE
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '1.9rem',
              color: '#FAF6EE',
              margin: '4px 0 0',
            }}
          >
            Worship Songs & Lyrics Manager
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
          <FaPlus /> <span>Add Worship Song</span>
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
        {/* Language Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: selectedLanguage === lang ? '1px solid #D6B66B' : '1px solid rgba(214, 182, 107, 0.15)',
                background: selectedLanguage === lang ? 'rgba(214, 182, 107, 0.2)' : 'transparent',
                color: selectedLanguage === lang ? '#FAF6EE' : '#8BA698',
                fontSize: '0.82rem',
                fontWeight: selectedLanguage === lang ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 8 }}>
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
              placeholder="Search lyrics or song title..."
              style={{
                padding: '8px 12px 8px 30px',
                background: 'rgba(5, 16, 11, 0.8)',
                border: '1px solid rgba(214, 182, 107, 0.25)',
                borderRadius: 8,
                color: '#FAF6EE',
                fontSize: '0.85rem',
                outline: 'none',
                minWidth: 240,
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 14px',
              background: 'rgba(214, 182, 107, 0.2)',
              border: '1px solid #D6B66B',
              color: '#E8CC8F',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Songs Table / Cards */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#D6B66B' }}>
          Loading worship lyrics...
        </div>
      ) : songs.length === 0 ? (
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
          <FaMusic style={{ fontSize: '2.5rem', color: '#D6B66B', marginBottom: 12 }} />
          <h3>No Songs Found</h3>
          <p>Add praise songs, hymns, and chorus lyrics to make them available in church worship.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {songs.map((song) => (
            <div
              key={song._id}
              style={{
                background: 'rgba(12, 34, 25, 0.75)',
                border: '1px solid rgba(214, 182, 107, 0.2)',
                borderRadius: 12,
                padding: '18px 22px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
              }}
            >
              {/* Song Information */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
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
                    {song.language}
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      background: 'rgba(24, 67, 50, 0.6)',
                      color: '#BACDC4',
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {song.theme}
                  </span>
                  {song.key && (
                    <span style={{ fontSize: '0.75rem', color: '#8BA698' }}>
                      Key: <strong style={{ color: '#D6B66B' }}>{song.key}</strong>
                    </span>
                  )}
                  {song.tempo && (
                    <span style={{ fontSize: '0.75rem', color: '#8BA698' }}>• Tempo: {song.tempo}</span>
                  )}
                </div>

                <h3
                  style={{
                    margin: '0 0 6px',
                    fontSize: '1.2rem',
                    color: '#FAF6EE',
                    fontFamily: 'var(--font-serif, serif)',
                  }}
                >
                  {song.title}
                </h3>

                <p
                  style={{
                    color: '#8BA698',
                    fontSize: '0.82rem',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 580,
                  }}
                >
                  {song.lyrics?.split('\n').filter(Boolean).slice(0, 2).join(' / ')}...
                </p>
              </div>

              {/* Status and Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => handleToggle(song)}
                  title={song.isActive ? 'Active on church website' : 'Hidden'}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: song.isActive ? '#4ADE80' : '#8BA698',
                    cursor: 'pointer',
                    fontSize: '1.3rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {song.isActive ? <FaToggleOn /> : <FaToggleOff />}
                </button>

                <button
                  onClick={() => setPreviewingSong(song)}
                  style={{
                    padding: '7px 14px',
                    background: 'rgba(214, 182, 107, 0.1)',
                    border: '1px solid rgba(214, 182, 107, 0.25)',
                    color: '#E8CC8F',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <FaEye /> Preview
                </button>

                <button
                  onClick={() => openEditModal(song)}
                  style={{
                    padding: '7px 14px',
                    background: 'rgba(214, 182, 107, 0.15)',
                    border: '1px solid rgba(214, 182, 107, 0.3)',
                    color: '#D6B66B',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => handleDelete(song._id, song.title)}
                  style={{
                    padding: '7px 14px',
                    background: 'rgba(235, 87, 87, 0.15)',
                    border: '1px solid rgba(235, 87, 87, 0.3)',
                    color: '#FFA2A2',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
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
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewingSong && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 580,
              background: 'linear-gradient(160deg, #0C2318 0%, #07150E 100%)',
              border: '1px solid rgba(214, 182, 107, 0.35)',
              borderRadius: 18,
              padding: '28px 32px',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#D6B66B', fontWeight: 600 }}>
                  {previewingSong.language} • {previewingSong.theme}
                </span>
                <h2
                  style={{
                    margin: '4px 0 0',
                    color: '#FAF6EE',
                    fontFamily: 'var(--font-serif, serif)',
                    fontSize: '1.4rem',
                  }}
                >
                  {previewingSong.title}
                </h2>
              </div>
              <button
                onClick={() => setPreviewingSong(null)}
                style={{ background: 'none', border: 'none', color: '#8BA698', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <FaTimes />
              </button>
            </div>

            <div
              style={{
                background: 'rgba(5, 16, 11, 0.7)',
                border: '1px solid rgba(214, 182, 107, 0.15)',
                borderRadius: 12,
                padding: '20px 24px',
                color: '#FAF6EE',
                fontSize: '0.98rem',
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
                fontFamily: 'inherit',
              }}
            >
              {previewingSong.lyrics}
            </div>

            <div style={{ textAlign: 'right', marginTop: 18 }}>
              <button
                onClick={() => setPreviewingSong(null)}
                style={{
                  padding: '8px 20px',
                  background: 'rgba(214, 182, 107, 0.2)',
                  border: '1px solid #D6B66B',
                  color: '#FAF6EE',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Create / Edit Song */}
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
              maxWidth: 680,
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
                {editingSong ? 'Edit Worship Song' : 'Add New Praise & Worship Song'}
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
              {/* Title & Language */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Song Title (Tamil / English) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. En Uyirana Yesuvae (என் உயிரான இயேசுவே)"
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
                    Language *
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
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
                    {LANGUAGES.filter((l) => l !== 'All').map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Theme, Key & Tempo */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Theme / Focus
                  </label>
                  <input
                    type="text"
                    value={formData.theme}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    placeholder="e.g. Adoration & Surrender"
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
                    Musical Key
                  </label>
                  <input
                    type="text"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="e.g. D Major"
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
                    Tempo / Speed
                  </label>
                  <input
                    type="text"
                    value={formData.tempo}
                    onChange={(e) => setFormData({ ...formData, tempo: e.target.value })}
                    placeholder="e.g. Slow / Reverent"
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

              {/* Lyrics Field with Helpers */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600 }}>
                    Song Lyrics (Verses & Chorus) *
                  </label>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => insertSnippet('[பல்லவி / Chorus]')}
                      style={{
                        padding: '3px 8px',
                        background: 'rgba(214, 182, 107, 0.15)',
                        border: '1px solid rgba(214, 182, 107, 0.3)',
                        color: '#E8CC8F',
                        borderRadius: 4,
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                      }}
                    >
                      + Chorus
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('[சரணம் 1 / Verse 1]')}
                      style={{
                        padding: '3px 8px',
                        background: 'rgba(214, 182, 107, 0.15)',
                        border: '1px solid rgba(214, 182, 107, 0.3)',
                        color: '#E8CC8F',
                        borderRadius: 4,
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                      }}
                    >
                      + Verse 1
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippet('[சரணம் 2 / Verse 2]')}
                      style={{
                        padding: '3px 8px',
                        background: 'rgba(214, 182, 107, 0.15)',
                        border: '1px solid rgba(214, 182, 107, 0.3)',
                        color: '#E8CC8F',
                        borderRadius: 4,
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                      }}
                    >
                      + Verse 2
                    </button>
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={formData.lyrics}
                  onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                  placeholder={`[பல்லவி]\nஎன் உயிரான இயேசுவே...\n\n[சரணம் 1]\nஎன்னை தாங்கும் கன்மலையே...`}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(5, 16, 11, 0.8)',
                    border: '1px solid rgba(214, 182, 107, 0.25)',
                    borderRadius: 8,
                    color: '#FAF6EE',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Order & Active toggle */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#D6B66B', fontWeight: 600, marginBottom: 5 }}>
                    Display Order
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
                    id="isActiveSongCheck"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    style={{ width: 18, height: 18, accentColor: '#D6B66B', cursor: 'pointer' }}
                  />
                  <label htmlFor="isActiveSongCheck" style={{ fontSize: '0.9rem', color: '#FAF6EE', cursor: 'pointer' }}>
                    Publish on Public Song List
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
                  {editingSong ? 'Save Changes' : 'Save Song & Lyrics'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
