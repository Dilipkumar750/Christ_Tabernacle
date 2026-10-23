import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getAllSongsAdmin,
  deleteSong,
  updateSong,
} from '../services/api';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaMusic,
  FaSearch,
  FaTimes,
  FaEye,
  FaToggleOn,
  FaToggleOff,
  FaYoutube,
} from 'react-icons/fa';

const LANGUAGES = ['All', 'Tamil', 'English', 'Telugu', 'Hindi'];

export default function LyricsManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Search & Filter
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewingSong, setPreviewingSong] = useState(null);

  const fetchSongs = useCallback(async () => {
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
  }, [selectedLanguage, searchQuery]);

  useEffect(() => {
    fetchSongs();
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccess(''), 4000);
    }
  }, [fetchSongs, location.state]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSongs();
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
      {/* Header bar (Clean White/Green) */}
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
            PRAISE &amp; SANCTUARY REPERTOIRE
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
            Worship Songs, Videos &amp; Lyrics Manager
          </h1>
        </div>

        <button
          onClick={() => navigate('/admin/lyrics/new')}
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
          <FaPlus /> <span>Add Worship Video &amp; Lyrics</span>
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

      {/* Filter and Search Bar (White Box, Crisp Borders) */}
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
        {/* Language Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: selectedLanguage === lang ? '1.5px solid #184332' : '1px solid #E2E8F0',
                background: selectedLanguage === lang ? '#184332' : '#F8FAF9',
                color: selectedLanguage === lang ? '#FFFFFF' : '#475569',
                fontSize: '0.82rem',
                fontWeight: selectedLanguage === lang ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
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
                color: '#64748B',
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
                background: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                borderRadius: 8,
                color: '#0F172A',
                fontSize: '0.85rem',
                outline: 'none',
                minWidth: 260,
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              background: '#EAF3EE',
              border: '1.5px solid #184332',
              color: '#184332',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Songs Table / Cards (White Cards, Deep Green Headings) */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#184332', fontWeight: 600 }}>
          Loading worship lyrics...
        </div>
      ) : songs.length === 0 ? (
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
          <FaMusic style={{ fontSize: '2.5rem', color: '#184332', marginBottom: 12 }} />
          <h3 style={{ color: '#122D24', margin: '0 0 6px' }}>No Songs Found</h3>
          <p>Add praise songs, hymns, and chorus lyrics to make them available in church worship.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {songs.map((song) => (
            <div
              key={song._id}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: 12,
                padding: '18px 22px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
              }}
            >
              {/* Song Information */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
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
                    {song.language}
                  </span>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      background: '#F1F5F9',
                      color: '#475569',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    {song.theme}
                  </span>
                  {song.youtubeUrl && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        background: '#FEE2E2',
                        color: '#DC2626',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <FaYoutube /> YouTube Linked
                    </span>
                  )}
                  {song.key && (
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Key: <strong style={{ color: '#122D24' }}>{song.key}</strong>
                    </span>
                  )}
                  {song.tempo && (
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>â€¢ Tempo: {song.tempo}</span>
                  )}
                </div>

                <h3
                  style={{
                    margin: '0 0 6px',
                    fontSize: '1.18rem',
                    color: '#122D24',
                    fontFamily: 'var(--font-serif, serif)',
                    fontWeight: 700,
                  }}
                >
                  {song.title}
                </h3>

                <p
                  style={{
                    color: '#64748B',
                    fontSize: '0.84rem',
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
                    color: song.isActive ? '#15803D' : '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '1.4rem',
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
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    color: '#1E293B',
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
                  onClick={() => navigate('/admin/lyrics/edit/' + song._id)}
                  style={{
                    padding: '7px 14px',
                    background: '#EAF3EE',
                    border: '1.5px solid #184332',
                    color: '#184332',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 700,
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
                    background: '#FEE2E2',
                    border: '1px solid #FECACA',
                    color: '#DC2626',
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

      {/* Preview Modal (Clean White Card) */}
      {previewingSong && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(18, 45, 36, 0.45)',
            backdropFilter: 'blur(4px)',
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
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: 16,
              padding: '28px 32px',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#A88A42', fontWeight: 700 }}>
                  {previewingSong.language} â€¢ {previewingSong.theme}
                </span>
                <h2
                  style={{
                    margin: '4px 0 0',
                    color: '#122D24',
                    fontFamily: 'var(--font-serif, serif)',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                  }}
                >
                  {previewingSong.title}
                </h2>
              </div>
              <button
                onClick={() => setPreviewingSong(null)}
                style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <FaTimes />
              </button>
            </div>

            <div
              style={{
                background: '#F8FAF9',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                padding: '20px 24px',
                color: '#1E293B',
                fontSize: '0.96rem',
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
                  background: '#EAF3EE',
                  border: '1.5px solid #184332',
                  color: '#184332',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
