import { useState, useEffect } from "react";
import worshipImg from "../../assets/worship.jpg";

const PLAYLIST = [
  {
    id: 1,
    title: "Sunday Morning Sacred Worship Medley",
    artist: "Christ's Tabernacle Worship Team",
    duration: "14:20",
    seconds: 860,
    category: "Corporate Worship",
    description: "Heartfelt spontaneous worship recorded live during Sunday communion service.",
  },
  {
    id: 2,
    title: "Deliverance & Fasting Prayer Instrumental",
    artist: "Sanctuary Strings & Piano",
    duration: "25:40",
    seconds: 1540,
    category: "Prayer Soak",
    description: "Gentle instrumental music for personal devotion, meditation, and fasting vigils.",
  },
  {
    id: 3,
    title: "Songs of the Precious Blood & Holy Cross",
    artist: "Eva. Glory Devapiriyam & Choir",
    duration: "18:15",
    seconds: 1095,
    category: "Classic Hymns",
    description: "Anointed traditional Tamil and English hymns celebrating the redeeming power of the cross.",
  },
  {
    id: 4,
    title: "Revival & Anointing Praise Session",
    artist: "Youth Worship Team",
    duration: "12:05",
    seconds: 725,
    category: "High Praise",
    description: "Joyful anthems of spiritual breakthrough and testimony.",
  },
];

export default function Audio() {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [volume, setVolume] = useState(85);

  const track = PLAYLIST[currentTrackIdx];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((t) => (t >= track.seconds ? 0 : t + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, track.seconds]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleNext = () => {
    setCurrentTrackIdx((idx) => (idx + 1) % PLAYLIST.length);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIdx((idx) => (idx === 0 ? PLAYLIST.length - 1 : idx - 1));
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <>
      <style>{`
        .audio-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: start;
        }

        .audio-player-card {
          background: var(--grad-sanctuary);
          border-radius: 20px;
          border: 2px solid var(--border-gold);
          padding: 36px 30px;
          color: var(--ivory);
          box-shadow: var(--shadow-lg);
          position: relative;
          overflow: hidden;
        }
        .audio-player-card::before {
          content: '✝';
          position: absolute;
          top: -30px;
          right: -20px;
          font-size: 160px;
          color: rgba(214, 182, 107, 0.05);
          pointer-events: none;
          font-family: var(--font-serif);
        }

        .audio-art-wrap {
          position: relative;
          height: 220px;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 24px;
          border: 1.5px solid var(--border-gold);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .audio-art {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .audio-art-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(9, 28, 19, 0.85) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 16px;
        }

        /* Waves Animation */
        .audio-waves {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 28px;
        }
        .wave-bar {
          width: 4px;
          background: var(--gold-bright);
          border-radius: 2px;
          animation: waveMove 1s ease-in-out infinite alternate;
        }
        .wave-bar:nth-child(2) { animation-delay: 0.2s; height: 16px; }
        .wave-bar:nth-child(3) { animation-delay: 0.4s; height: 24px; }
        .wave-bar:nth-child(4) { animation-delay: 0.1s; height: 20px; }
        .wave-bar:nth-child(5) { animation-delay: 0.5s; height: 12px; }
        @keyframes waveMove {
          0% { height: 6px; }
          100% { height: 26px; }
        }

        .audio-track-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--ivory);
          margin: 0 0 4px;
          font-weight: 700;
        }
        .audio-track-artist {
          font-size: 0.86rem;
          color: var(--gold-bright);
          margin-bottom: 18px;
          font-weight: 600;
        }

        /* Progress */
        .audio-progress-wrap {
          margin-bottom: 20px;
        }
        .audio-progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 3px;
          overflow: hidden;
          cursor: pointer;
        }
        .audio-progress-fill {
          height: 100%;
          background: var(--grad-gold);
          border-radius: 3px;
          transition: width 0.3s linear;
        }
        .audio-times {
          display: flex;
          justify-content: space-between;
          font-size: 0.74rem;
          color: rgba(250, 246, 238, 0.7);
          margin-top: 6px;
        }

        /* Controls */
        .audio-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .ctrl-btn {
          background: none;
          border: none;
          color: var(--ivory);
          font-size: 1.4rem;
          cursor: pointer;
          transition: transform 0.2s, color 0.2s;
        }
        .ctrl-btn:hover {
          color: var(--gold-bright);
          transform: scale(1.1);
        }
        .play-main-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--grad-gold);
          color: #122D24;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          box-shadow: 0 6px 25px rgba(214, 182, 107, 0.4);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .play-main-btn:hover {
          transform: scale(1.08);
        }

        /* Playlist */
        .audio-playlist-card {
          background: var(--white);
          border-radius: 20px;
          border: 1.5px solid var(--border-gold-subtle);
          padding: 28px 24px;
          box-shadow: var(--shadow-sm);
        }
        .playlist-head {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--green-dark);
          margin: 0 0 16px;
          font-weight: 700;
        }
        .playlist-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .playlist-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: all 0.2s;
          background: var(--ivory);
        }
        .playlist-item:hover {
          border-color: var(--gold);
          background: var(--white);
        }
        .playlist-item.active {
          border-color: var(--gold);
          background: var(--gold-soft);
        }
        .playlist-num {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--green);
          font-size: 0.95rem;
          width: 22px;
        }
        .playlist-info {
          flex-grow: 1;
        }
        .playlist-item-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--green-dark);
          margin-bottom: 2px;
          display: block;
        }
        .playlist-item-sub {
          font-size: 0.74rem;
          color: var(--text-light);
        }
        .playlist-item-time {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--gold-dark);
        }

        @media (max-width: 820px) {
          .audio-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="audio-layout">
        {/* Player */}
        <section className="audio-player-card" aria-label="Audio Worship Player">
          <div className="audio-art-wrap">
            <img src={worshipImg} alt="Worship Recording" className="audio-art" />
            <div className="audio-art-overlay">
              {isPlaying && (
                <div className="audio-waves" aria-hidden="true">
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                </div>
              )}
            </div>
          </div>

          <span className="ct-badge ct-badge-dark" style={{ marginBottom: 10 }}>
            {track.category}
          </span>
          <h2 className="audio-track-title">{track.title}</h2>
          <p className="audio-track-artist">{track.artist}</p>

          {/* Progress Bar */}
          <div className="audio-progress-wrap">
            <div
              className="audio-progress-bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setCurrentTime(Math.floor(pos * track.seconds));
              }}
            >
              <div
                className="audio-progress-fill"
                style={{ width: `${(currentTime / track.seconds) * 100}%` }}
              />
            </div>
            <div className="audio-times">
              <span>{formatTime(currentTime)}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="audio-controls">
            <button className="ctrl-btn" onClick={handlePrev} aria-label="Previous track">
              ⏮
            </button>
            <button
              className="play-main-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause track" : "Play track"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="ctrl-btn" onClick={handleNext} aria-label="Next track">
              ⏭
            </button>
          </div>

          {/* Volume Control */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18, fontSize: "0.82rem", color: "var(--gold-bright)" }}>
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{ width: 110, accentColor: "var(--gold)" }}
              aria-label="Volume slider"
            />
            <span style={{ fontSize: "0.74rem", minWidth: 32 }}>{volume}%</span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "rgba(250, 246, 238, 0.75)", lineHeight: 1.6, textAlign: "center", margin: 0 }}>
            {track.description}
          </p>
        </section>

        {/* Playlist */}
        <aside className="audio-playlist-card" aria-label="Worship Playlist">
          <h3 className="playlist-head">Worship Tracks &amp; Recordings</h3>
          <ul className="playlist-list">
            {PLAYLIST.map((p, idx) => (
              <li
                key={p.id}
                className={`playlist-item${currentTrackIdx === idx ? " active" : ""}`}
                onClick={() => {
                  setCurrentTrackIdx(idx);
                  setCurrentTime(0);
                  setIsPlaying(true);
                }}
              >
                <span className="playlist-num">{idx + 1}</span>
                <div className="playlist-info">
                  <span className="playlist-item-title">{p.title}</span>
                  <span className="playlist-item-sub">{p.artist}</span>
                </div>
                <span className="playlist-item-time">{p.duration}</span>
              </li>
            ))}
          </ul>

          <div className="ct-scripture-box" style={{ marginTop: 24 }}>
            "Speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord."
            <cite>— Ephesians 5:19</cite>
          </div>
        </aside>
      </div>
    </>
  );
}
