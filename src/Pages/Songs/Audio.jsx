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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 items-start">
      {/* Player Card */}
      <section
        className="bg-grad-sanctuary rounded-[20px] border-2 border-gold p-6 sm:p-[36px_30px] text-ivory shadow-lg-g relative overflow-hidden"
        aria-label="Audio Worship Player"
      >
        <span
          className="absolute -top-7 -right-5 text-[160px] text-gold/[0.05] pointer-events-none font-serif leading-none select-none"
          aria-hidden="true"
        >
          ✝
        </span>

        {/* Art Wrap */}
        <div className="relative h-[220px] rounded-[14px] overflow-hidden mb-6 border-[1.5px] border-gold shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <img src={worshipImg} alt="Worship Recording" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091c13]/85 to-transparent flex items-end p-4">
            {isPlaying && (
              <div className="flex items-end gap-1 h-7" aria-hidden="true">
                <span className="w-1 bg-gold-bright rounded-sm animate-pulse h-4" />
                <span className="w-1 bg-gold-bright rounded-sm animate-pulse h-6" style={{ animationDelay: "0.2s" }} />
                <span className="w-1 bg-gold-bright rounded-sm animate-pulse h-7" style={{ animationDelay: "0.4s" }} />
                <span className="w-1 bg-gold-bright rounded-sm animate-pulse h-5" style={{ animationDelay: "0.1s" }} />
                <span className="w-1 bg-gold-bright rounded-sm animate-pulse h-3" style={{ animationDelay: "0.5s" }} />
              </div>
            )}
          </div>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#0C2219]/80 text-gold-bright border border-gold/30 mb-2.5">
          {track.category}
        </span>
        <h2 className="font-serif text-[1.35rem] text-ivory font-bold mb-1 leading-snug">
          {track.title}
        </h2>
        <p className="text-[0.86rem] text-gold-bright mb-[18px] font-semibold">
          {track.artist}
        </p>

        {/* Progress Bar */}
        <div className="mb-5">
          <div
            className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.floor(pos * track.seconds));
            }}
          >
            <div
              className="h-full bg-grad-gold rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${(currentTime / track.seconds) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[0.74rem] text-ivory/70 mt-1.5 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mb-5">
          <button
            className="bg-transparent border-none text-ivory text-2xl hover:text-gold-bright hover:scale-110 transition-all duration-200 cursor-pointer p-1"
            onClick={handlePrev}
            aria-label="Previous track"
          >
            ⏮
          </button>
          <button
            className="w-[58px] h-[58px] rounded-full bg-grad-gold text-green-dark flex items-center justify-center text-2xl shadow-[0_6px_25px_rgba(214,182,107,0.4)] hover:scale-105 transition-transform duration-200 cursor-pointer font-bold"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause track" : "Play track"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            className="bg-transparent border-none text-ivory text-2xl hover:text-gold-bright hover:scale-110 transition-all duration-200 cursor-pointer p-1"
            onClick={handleNext}
            aria-label="Next track"
          >
            ⏭
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center gap-2.5 mb-[18px] text-[0.82rem] text-gold-bright">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-[110px] accent-gold cursor-pointer"
            aria-label="Volume slider"
          />
          <span className="text-[0.74rem] min-w-[32px]">{volume}%</span>
        </div>

        <p className="text-[0.85rem] text-ivory/75 leading-relaxed text-center m-0">
          {track.description}
        </p>
      </section>

      {/* Playlist Card */}
      <aside
        className="bg-white rounded-[20px] border-[1.5px] border-gold/30 p-6 md:p-7 shadow-sm-g"
        aria-label="Worship Playlist"
      >
        <h3 className="font-serif text-xl font-bold text-green-dark mb-4">
          Worship Tracks &amp; Recordings
        </h3>
        <ul className="list-none p-0 m-0 flex flex-col gap-3">
          {PLAYLIST.map((p, idx) => (
            <li
              key={p.id}
              className={`flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                currentTrackIdx === idx
                  ? "border-gold bg-gold-soft shadow-sm"
                  : "border-slate-200 bg-ivory hover:border-gold hover:bg-white"
              }`}
              onClick={() => {
                setCurrentTrackIdx(idx);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
            >
              <span className="font-serif font-bold text-green text-[0.95rem] w-6 shrink-0">
                {idx + 1}
              </span>
              <div className="flex-grow">
                <span className="font-bold text-[0.9rem] text-green-dark mb-0.5 block leading-tight">
                  {p.title}
                </span>
                <span className="text-[0.74rem] text-text-light block">
                  {p.artist}
                </span>
              </div>
              <span className="text-[0.8rem] font-bold text-gold-dark shrink-0">
                {p.duration}
              </span>
            </li>
          ))}
        </ul>

        <div className="bg-gold-soft border-l-4 border-gold rounded-r-[14px] p-5 font-serif italic text-[0.95rem] text-green-dark leading-relaxed relative mt-6">
          "Speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord."
          <cite className="block font-sans not-italic text-[0.78rem] font-bold tracking-wider uppercase text-gold-dark mt-2">
            — Ephesians 5:19
          </cite>
        </div>
      </aside>
    </div>
  );
}
