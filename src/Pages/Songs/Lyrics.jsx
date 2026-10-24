import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicSongs } from "../../services/api";
import {
  FaSearch, FaMusic, FaCopy, FaCheck, FaDownload, FaYoutube,
  FaFilePowerpoint, FaChevronRight, FaGuitar, FaPrint, FaTimes,
  FaPlay, FaChevronLeft, FaShareAlt,
  FaDesktop, FaHeart, FaRegHeart,
  FaExpand
} from "react-icons/fa";

/* ═══════════════════════════════════════════════════════════════
   THEME — Sacred Sanctuary Green & Divine Gold Palette
   Primary Sanctuary Green: #184332 | Deep Forest: #0C2219 | Medium: #1E5440
   Sacred Gold: #D6B66B | Gold Bright: #F5E0B0 | Gold Dark: #A88A42
   Holy Crimson Cross: #C81D25 | Warm Ivory: #FAF6EE | Text: #112218
═══════════════════════════════════════════════════════════════ */
const T = {
  primary:   "#184332",
  primaryDk: "#0C2219",
  primaryLt: "#2A6E54",
  gold:      "#D6B66B",
  goldLt:    "#E8CC8F",
  goldDk:    "#A88A42",
  crimson:   "#C81D25",
  crimsonLt: "#DC2626",
  bg:        "#FAF6EE",
  bgCard:    "#FFFFFF",
  bgMuted:   "#EAF2EE",
  border:    "#EDE5D8",
  borderDk:  "rgba(24, 67, 50, 0.2)",
  borderGold:"rgba(214, 182, 107, 0.45)",
  textDk:    "#112218",
  textMid:   "#4A6355",
  textMuted: "#7A9288",
  green:     "#184332",
  purple:    "#1E5440",
  purpleLt:  "#EAF2EE",
};

/* ═══════════════════════════════════════════════════════════════
   ALPHABET & CHORDS CONSTANTS
═══════════════════════════════════════════════════════════════ */
const ALPHABET = [
  "All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "த"
];

const CHORDS_KEYS_GRID = [
  "A", "B", "C", "D", "E", "F", "G",
  "H", "I", "J", "K", "L", "M", "N",
  "O", "P", "Q", "R", "S", "T", "U",
  "V", "W", "X", "Y", "Z"
];

/* ═══════════════════════════════════════════════════════════════
   YOUTUBE HELPERS
═══════════════════════════════════════════════════════════════ */
function extractYouTubeId(url) {
  if (!url) return null;
  const iframeMatch = url.match(/src=["'](.*?)['"]/);
  const target = (iframeMatch ? iframeMatch[1] : url).trim();
  const match = target.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([A-Za-z0-9_-]{11})/
  );
  if (match && match[1]) return match[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(target)) return target;
  return null;
}
function getYouTubeEmbedUrl(url) {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=0` : null;
}
function getYouTubeWatchUrl(url) {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url || null;
}
function getYouTubeThumbnail(url) {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
}

/* ═══════════════════════════════════════════════════════════════
   CHORD TRANSPOSER
═══════════════════════════════════════════════════════════════ */
const SCALE_SHARP = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const SCALE_FLAT  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
function transposeChord(chord, semitones) {
  if (semitones === 0) return chord;
  return chord.replace(/[A-G][b#]?/g, (m) => {
    let idx = SCALE_SHARP.indexOf(m); if (idx === -1) idx = SCALE_FLAT.indexOf(m);
    if (idx === -1) return m;
    return SCALE_SHARP[(idx + semitones + 120) % 12];
  });
}
function transposeChordsText(text, semitones) {
  if (!text || semitones === 0) return text;
  return text.split("\n").map(line => {
    const words = line.trim().split(/\s+/);
    const isChordLine = words.length > 0 && words.every(w =>
      /^[A-G][b#]?(?:m|maj|min|dim|aug|sus[24]?|[0-9])*(?:\/[A-G][b#]?)?$/.test(w) || w === "" || w.startsWith("[")
    );
    return (isChordLine && !line.startsWith("[")) ? transposeChord(line, semitones) : line;
  }).join("\n");
}

/* ═══════════════════════════════════════════════════════════════
   DEFAULT SACRED SONGS
═══════════════════════════════════════════════════════════════ */
const DEFAULT_SONGS = [
  {
    _id: "song_1", id: 1,
    title: "Tholainthu Pona Ennai (தொலைந்து போன என்னை)",
    language: "Tamil", theme: "Adoration & Grace", key: "D Major", tempo: "68 BPM • Slow Worship",
    author: "Gersson Edinbaro / Jabadeepak", uploadDate: "Oct 2026", views: "192K views", duration: "06:45",
    youtubeUrl: "https://www.youtube.com/watch?v=kYI9Fj9-X3I",
    lyrics: `தொலைந்து போன என்னை
அரவணைத்த அன்பை
ஜீவன் உள்ள நாளெல்லாம்
நான் பாடுவேன்

தவறுகள் செய்ததால் தகுதி இழந்தேன்
தகப்பன் வீட்டை நான் முற்றும் மறந்தேன்
சுயநலமாய் நான் வாழ்ந்த போதிலும்
சுகமாக என்னை சுமந்து வந்தவரே

உலகத்தில் அன்பை நான் தேடி அலைந்தேன்
உமது அன்பை நான் முற்றும் வெறுத்தேன்
எல்லாம் நான் இழந்த போதிலும்
இறுதி வரை என்னை நேசித்தீரையா`,
    englishLyrics: `Tholainthu Pona Ennai
The boundless love that embraced me when I was lost
All the living days of my life
I will sing Your praise

Having stumbled and sinned, I forfeited all worth
I completely wandered away from the Father's home
Yet though I lived in selfishness and pride
You bore me gently in Your everlasting arms

In this empty world I searched for true love
Blindly rejecting Your sacred grace
Even when I had forfeited everything
You loved me faithfully unto the very end`,
    chords: `[Intro]
D   Bm   G   A

[Verse]
D                Bm
Tholainthu pona ennai
G                A
Aravanaitha anbai
D                Bm
Jeevan ulla naalellam
G        A       D
Naan paaduven`
  },
  {
    _id: "song_2", id: 2,
    title: "Amazing Grace (My Chains Are Gone)",
    language: "English", theme: "Deliverance & Grace", key: "G Major", tempo: "Moderately Slow",
    author: "Christ's Tabernacle Worship Choir", uploadDate: "Sep 2026", views: "84K views", duration: "05:02",
    youtubeUrl: "https://www.youtube.com/watch?v=Jbe7OpxHNoU",
    lyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed!

My chains are gone, I've been set free!
My God, my Savior has ransomed me!
And like a flood His mercy reigns,
Unending love, amazing grace!

The Lord has promised good to me,
His Word my hope secures;
He will my shield and portion be
As long as life endures.`,
    englishLyrics: `Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

My chains are gone, I've been set free!
My God, my Savior has ransomed me!
And like a flood His mercy reigns,
Unending love, amazing grace!`,
    chords: `[Verse]
G                  C/G       G
Amazing grace how sweet the sound
                D/F#
That saved a wretch like me
G                 C/G    G
I once was lost but now am found
      Em     D/F#  G
Was blind but now I see`
  },
  {
    _id: "song_3", id: 3,
    title: "En Uyirana Yesuvae (என் உயிரான இயேசுவே)",
    language: "Tamil", theme: "Consecration & Love", key: "D Major", tempo: "72 BPM",
    author: "Fr. S. J. Berchmans", uploadDate: "Aug 2026", views: "340K views", duration: "07:15",
    youtubeUrl: "https://www.youtube.com/watch?v=pP4q32N6z0c",
    lyrics: `என் உயிரான இயேசுவே என் உயிருள்ள நாளெல்லாம்
உம்மை புகழ்ந்து பாடுவேன் உம்மையே போற்றி துதிப்பேன்
என்னை தாங்கும் கன்மலையே என்னை காக்கும் புகலிடமே
என்னை நடத்தும் நல்மேய்ப்பரே என்னோடு என்றும் வாழ்பவரே

தாயின் கருவில் உருவான நாள் முதல் இன்று வரை என்னை தாங்கினீரே
கண்ணின் மணி போல் காத்து வந்தீரே காலமெல்லாம் என்னை நடத்தினீரே
உந்தன் மாறாத பேரன்பை எண்ணி உள்ளமெல்லாம் உருகிடுதே
ஜீவனுள்ள நாளெல்லாம் உமக்காய் வாழ்வேன் இயேசுவே`,
    englishLyrics: `O Jesus, breath and essence of my life
Every day that breath remains in me
I shall proclaim Your sacred praises
You are the Rock that upholds my feet
The strong fortress where my soul takes refuge
The Shepherd who leads me beside still waters.`,
    chords: `[Verse]
D             Bm
En uyirana Yesuvae
G             A
En uyirulla naalellam
D             Bm
Ummai pugazhnthu paaduven
G        A    D
Ummaiyae potri thuthippan`
  },
  {
    _id: "song_4", id: 4,
    title: "Ummai Allamal Enaku Yaar Undu (உம்மை அல்லாமல் எனக்கு யார் உண்டு)",
    language: "Tamil", theme: "Faith & Surrender", key: "E Minor", tempo: "65 BPM",
    author: "Eva. Glory Devapiriyam / Christ's Tabernacle", uploadDate: "Jul 2026", views: "115K views", duration: "05:40",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    lyrics: `உம்மை அல்லாமல் எனக்கு யார் உண்டு
பரலோகத்தில் உம்மைத் தவிர பூலோகத்தில் எனக்கு
விருப்பம் இல்லை இயேசுவே என் அடைக்கலமே என் உடலும் என் உள்ளமும்

அழிந்து போனாலும் தேவன் என்றும் என் இருதயத்தின் கன்மலை
என் ஜீவனின் பெலன் என் நித்திய பங்கு
நான் தேவனை அண்டிக்கொள்வதே எனக்கு நலம்
உமது கிரியைகளையெல்லாம் நான் விவரிப்பேன்`,
    englishLyrics: `Whom have I in heaven but You?
And earth has nothing I desire besides You.
My flesh and my heart may fail,
but God is the strength of my heart
and my portion forever.`,
    chords: `[Verse]
Em               C
Ummai allamal enaku yaar undu
D                Em
Paralogathil ummai thavira
Em               C
Boolagathil enaku viruppam illai
D                Em
Yesuvae en adaikkalamae`
  }
];

/* ═══════════════════════════════════════════════════════════════
   MODAL — SANCTUARY FULLSCREEN PRESENTER
═══════════════════════════════════════════════════════════════ */
function SanctuaryPresenterModal({ song, onClose }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [lang, setLang] = useState("tamil");

  const rawLyrics = lang === "tamil" ? song.lyrics : (song.englishLyrics || song.lyrics);
  const slides = useMemo(() => {
    if (!rawLyrics) return [["No lyrics available"]];
    const paras = rawLyrics.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    return paras.map(p => p.split("\n").map(l => l.trim()).filter(Boolean));
  }, [rawLyrics]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        setSlideIdx(i => Math.min(slides.length - 1, i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setSlideIdx(i => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length, onClose]);

  const currentLines = slides[slideIdx] || [];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#06150F", color: "#FFFFFF",
      display: "flex", flexDirection: "column",
      fontFamily: "'Playfair Display', Georgia, serif",
      userSelect: "none"
    }}>
      {/* Top Bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px", background: "rgba(12, 34, 25, 0.96)",
        borderBottom: `1.5px solid ${T.borderGold}`, flexWrap: "wrap", gap: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: T.gold, fontSize: "1.3rem" }}>✝</span>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#FAF6EE", letterSpacing: 0.5 }}>
              {song.title}
            </div>
            <div style={{ fontSize: "0.68rem", color: T.goldLt, letterSpacing: 1.5, textTransform: "uppercase" }}>
              CHRIST'S TABERNACLE · SANCTUARY PROJECTION
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 3 }}>
            <button onClick={() => setLang("tamil")} style={{
              padding: "4px 12px", borderRadius: 16, border: "none",
              background: lang === "tamil" ? T.gold : "transparent",
              color: lang === "tamil" ? "#112218" : "#FAF6EE",
              fontWeight: 800, fontSize: "0.75rem", cursor: "pointer"
            }}>தமிழ்</button>
            <button onClick={() => setLang("english")} style={{
              padding: "4px 12px", borderRadius: 16, border: "none",
              background: lang === "english" ? T.gold : "transparent",
              color: lang === "english" ? "#112218" : "#FAF6EE",
              fontWeight: 800, fontSize: "0.75rem", cursor: "pointer"
            }}>English</button>
          </div>

          <span style={{ fontSize: "0.82rem", color: T.goldLt, fontWeight: 700 }}>
            {slideIdx + 1}/{slides.length}
          </span>

          <button onClick={onClose} style={{
            background: "rgba(200, 29, 37, 0.8)", border: "none", color: "#fff",
            padding: "6px 14px", borderRadius: 8, cursor: "pointer",
            fontWeight: 800, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 5
          }}>
            <FaTimes size={12}/> Exit
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "24px 20px", textAlign: "center",
        background: `radial-gradient(circle at 50% 50%, rgba(138, 37, 82, 0.28) 0%, rgba(15, 2, 8, 0.98) 85%)`
      }}>
        <div style={{ maxWidth: 1050 }}>
          <div style={{ color: T.gold, fontSize: "1.8rem", marginBottom: 16, opacity: 0.85 }}>✝</div>
          {currentLines.map((line, idx) => (
            <div key={idx} style={{
              fontSize: "clamp(1.5rem, 3.5vw, 3.2rem)",
              fontWeight: 700, lineHeight: 1.6,
              color: "#FAF6EE", textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              marginBottom: 10
            }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 20px", background: "rgba(12, 34, 25, 0.96)",
        borderTop: `1px solid rgba(214, 182, 107, 0.25)`
      }}>
        <button onClick={() => setSlideIdx(i => Math.max(0, i - 1))} disabled={slideIdx === 0} style={{
          padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${T.gold}`,
          background: slideIdx === 0 ? "rgba(255,255,255,0.05)" : T.gold,
          color: slideIdx === 0 ? "rgba(255,255,255,0.3)" : "#2C1A0E",
          fontWeight: 800, fontSize: "0.84rem", cursor: slideIdx === 0 ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", gap: 6
        }}>
          <FaChevronLeft size={11}/> Previous
        </button>

        {/* Slide Dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setSlideIdx(i)} style={{
              width: i === slideIdx ? 20 : 8, height: 8, borderRadius: 4,
              background: i === slideIdx ? T.gold : "rgba(255,255,255,0.25)",
              cursor: "pointer", transition: "all 0.2s"
            }}/>
          ))}
        </div>

        <button onClick={() => setSlideIdx(i => Math.min(slides.length - 1, i + 1))} disabled={slideIdx === slides.length - 1} style={{
          padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${T.gold}`,
          background: slideIdx === slides.length - 1 ? "rgba(255,255,255,0.05)" : T.gold,
          color: slideIdx === slides.length - 1 ? "rgba(255,255,255,0.3)" : "#2C1A0E",
          fontWeight: 800, fontSize: "0.84rem", cursor: slideIdx === slides.length - 1 ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", gap: 6
        }}>
          Next <FaChevronRight size={11}/>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UNIFIED CLEAN LYRICS BOX (Single Box, No Pallavi/Saranam Labels)
═══════════════════════════════════════════════════════════════ */
function StanzaLyricsView({ lyricsText, fontSizeMultiplier = 1, onCopy, title }) {
  const [copied, setCopied] = useState(false);

  if (!lyricsText) return (
    <div style={{
      textAlign: "center", padding: "50px 24px", color: T.textMuted,
      background: T.bgCard, borderRadius: 16, border: `1.5px dashed ${T.border}`
    }}>
      No lyrics entered for this section yet.
    </div>
  );

  // Clean away any Pallavi, Saranam, Chorus, Verse header tags
  const cleanLines = lyricsText.split("\n").filter(line => {
    const t = line.trim();
    if (!t) return true;
    if (/^\[.*?\]$/.test(t)) return false;
    if (/^(பல்லவி|சரணம்\s*\d*|chorus|verse\s*\d*|bridge|intro|outro)[:\s-]*$/i.test(t)) return false;
    return true;
  });
  const fullText = cleanLines.join("\n").trim();
  const paragraphs = fullText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map(p => p.split("\n").map(l => l.trim()).filter(Boolean));

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    if (onCopy) onCopy(fullText);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ct-lyrics-box">
      {/* Box Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingBottom: 16, marginBottom: 24, borderBottom: `1.5px solid ${T.bgMuted}`,
        flexWrap: "wrap", gap: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: T.gold, fontSize: "1.3rem", fontWeight: 700 }}>✝</span>
          <span style={{ fontSize: "0.92rem", fontWeight: 800, color: T.primary, letterSpacing: 1.2, textTransform: "uppercase" }}>
            {title || "Sanctuary Worship Lyrics"}
          </span>
        </div>

        <button onClick={handleCopy} style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: copied ? T.green : T.bg,
          border: `1.5px solid ${copied ? T.green : T.border}`,
          color: copied ? "#fff" : T.primary,
          padding: "7px 16px", borderRadius: 8,
          fontSize: "0.82rem", fontWeight: 800, cursor: "pointer", transition: "all 0.15s"
        }}>
          {copied ? <><FaCheck size={11}/> Copied!</> : <><FaCopy size={11} color={T.gold}/> Copy Lyrics</>}
        </button>
      </div>

      {/* Pure Lyrics Content with Clean Stanzas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {paragraphs.map((paraLines, pIdx) => (
          <div key={pIdx} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {paraLines.map((line, lIdx) => (
              <div key={lIdx} style={{
                fontSize: `clamp(1rem, ${1.12 * fontSizeMultiplier}rem, 1.35rem)`,
                fontWeight: 600, lineHeight: 1.9, color: T.textDk,
                fontFamily: "'Noto Sans Tamil', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Box Footer Scripture */}
      <div style={{
        marginTop: 32, paddingTop: 16, borderTop: `1px dashed ${T.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8, fontSize: "0.8rem", color: T.textMuted
      }}>
        <span style={{ color: T.gold, fontWeight: 800 }}>✝ Christ's Tabernacle — Sacred Hymnal</span>
        <span style={{ fontStyle: "italic" }}>"Let everything that has breath praise the LORD." — Psalm 150:6</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PPT SLIDE DECK PREVIEW
═══════════════════════════════════════════════════════════════ */
function PPTDeckPreview({ song, onPresenterClick, onDownloadClick }) {
  const lyricsPreview = (song.lyrics || song.englishLyrics || "").replace(/\[.*?\]/g, "").split("\n").map(l => l.trim()).filter(Boolean).slice(0, 3);
  return (
    <div style={{
      background: `linear-gradient(145deg, ${T.primaryDk} 0%, ${T.primary} 60%, ${T.primaryDk} 100%)`,
      borderRadius: 16, border: `1.5px solid ${T.borderGold}`,
      overflow: "hidden", boxShadow: `0 10px 30px rgba(138, 37, 82, 0.2)`
    }}>
      <div style={{
        aspectRatio: "16/9", padding: "18px 20px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        background: `radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.14) 0%, rgba(44, 26, 14, 0.95) 75%)`
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: T.gold, fontSize: "0.68rem", fontWeight: 800, letterSpacing: 1.5 }}>
            <FaFilePowerpoint size={12} color="#F59E0B"/> CHURCH SLIDE DECK
          </div>
          <span style={{ background: "rgba(212, 175, 55, 0.2)", color: T.goldLt, fontSize: "0.62rem", fontWeight: 800, padding: "2px 7px", borderRadius: 10 }}>
            READY FOR PROJECTION
          </span>
        </div>

        <div style={{ textAlign: "center", margin: "auto 0" }}>
          <div style={{ color: T.gold, marginBottom: 4 }}>✝</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#FAF6EE", lineHeight: 1.3, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>
            {song.title}
          </div>
          {lyricsPreview.map((l, i) => (
            <div key={i} style={{ fontSize: "0.7rem", color: "rgba(250, 246, 238, 0.85)", fontStyle: "italic" }}>
              "{l}"
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(212, 175, 55, 0.25)", paddingTop: 6 }}>
          <span style={{ fontSize: "0.62rem", color: T.goldLt, letterSpacing: 1 }}>CHRIST'S TABERNACLE</span>
          <span style={{ fontSize: "0.62rem", color: T.goldLt }}>{song.language} Repertoire</span>
        </div>
      </div>

      <div style={{ padding: "12px 16px", background: "rgba(12, 34, 25, 0.95)", borderTop: "1px solid rgba(212, 175, 55, 0.25)", display: "flex", gap: 8 }}>
        <button onClick={onPresenterClick} style={{
          flex: 1, padding: "9px 12px", borderRadius: 8, border: "none",
          background: `linear-gradient(135deg, ${T.gold} 0%, #A67C1E 100%)`,
          color: "#112218", fontWeight: 900, fontSize: "0.82rem",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer"
        }}>
          <FaDesktop size={11}/> Presenter View
        </button>

        {song.pptUrl ? (
          <button onClick={onDownloadClick} style={{
            flex: 1, padding: "9px 12px", borderRadius: 8,
            background: "rgba(255,255,255,0.08)", border: `1px solid ${T.gold}`,
            color: "#FAF6EE", fontWeight: 800, fontSize: "0.82rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer"
          }}>
            <FaDownload size={10} color={T.gold}/> Download
          </button>
        ) : (
          <div style={{
            flex: 1, padding: "8px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.2)",
            color: T.textMuted, fontSize: "0.76rem", display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            No PPT
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SONG DETAIL VIEW (No Hero Banner — Fully Responsive)
═══════════════════════════════════════════════════════════════ */
function SongDetailView({
  song, songs, onBack, onSelectSong,
  favorites, onToggleFavorite,
  onLetterSelect, onChordSelect, selectedChordKey
}) {
  const [activeTab, setActiveTab] = useState("tamil");
  const [showPresenter, setShowPresenter] = useState(false);
  const [showChords, setShowChords] = useState(false);
  const [chordsSemitones, setChordsSemitones] = useState(0);
  const [fontMult, setFontMult] = useState(1);
  const [toastMsg, setToastMsg] = useState("");

  const isFav = favorites.includes(song._id || song.id);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2400);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/songs/lyrics/${song._id || song.id}`;
    const data = {
      title: `${song.title} — Christ's Tabernacle`,
      text: `🎶 "${song.title}"\n${url}`,
      url
    };
    if (navigator.share) {
      try { await navigator.share(data); } catch {}
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast("Link copied to clipboard!");
    }
  };

  const handleDownloadPPT = () => {
    if (song.pptUrl) {
      const a = document.createElement("a");
      a.href = song.pptUrl;
      a.download = `${song.title.replace(/[^a-zA-Z0-9]/g, "_")}.pptx`;
      a.target = "_blank";
      a.click();
    } else {
      showToast("No PowerPoint attached for this hymn.");
    }
  };

  const embedUrl = getYouTubeEmbedUrl(song.youtubeUrl);
  const watchUrl = getYouTubeWatchUrl(song.youtubeUrl);
  const related = songs.filter(s => (s._id || s.id) !== (song._id || song.id)).slice(0, 4);
  const favSongs = songs.filter(s => favorites.includes(s._id || s.id));

  // Extract Tamil vs English Title
  const titleMatch = song.title.match(/^(.*?)\s*\((.*?)\)$/);
  const mainTitle = titleMatch ? titleMatch[1] : song.title;
  const subTitle = titleMatch ? titleMatch[2] : null;

  return (
    <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 16px 60px" }}>
      {showPresenter && <SanctuaryPresenterModal song={song} onClose={() => setShowPresenter(false)}/>}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 9999,
          background: T.primaryDk, color: "#fff",
          padding: "12px 22px", borderRadius: 10,
          border: `1.5px solid ${T.gold}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          fontSize: "0.88rem", fontWeight: 700,
          display: "flex", alignItems: "center", gap: 8
        }}>
          <FaCheck color={T.gold}/> {toastMsg}
        </div>
      )}

      {/* Top A-Z Alphabet Navigation Bar */}
      <div className="ct-az-bar" style={{
        background: T.primaryDk, borderRadius: 12, padding: "8px 12px",
        margin: "18px 0 24px",
        boxShadow: `0 4px 16px rgba(12, 34, 25, 0.2)`
      }}>
        {ALPHABET.map(letter => (
          <button key={letter} onClick={() => onLetterSelect(letter)} className="ct-az-btn" style={{
            padding: "5px 10px", borderRadius: 6, border: "none", fontWeight: 800,
            fontSize: letter === "All" ? "0.74rem" : "0.84rem", cursor: "pointer",
            transition: "all 0.15s",
            background: "rgba(255,255,255,0.08)",
            color: "#FAF6EE", minWidth: letter === "All" ? 36 : 28
          }}>
            {letter}
          </button>
        ))}
      </div>

      {/* Breadcrumb Row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12, marginBottom: 20
      }}>
        <button onClick={onBack} style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: T.bgCard, border: `1.5px solid ${T.border}`,
          borderRadius: 8, padding: "7px 16px", color: T.primary,
          fontWeight: 800, fontSize: "0.84rem", cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
        }}>
          <FaChevronLeft size={11}/> Back to Repertoire
        </button>

        <div style={{ fontSize: "0.82rem", color: T.textMuted }}>
          <span onClick={onBack} style={{ cursor: "pointer", color: T.primary, fontWeight: 700 }}>Songs</span>
          {" / "}
          <span onClick={onBack} style={{ cursor: "pointer", color: T.primary, fontWeight: 700 }}>Lyrics</span>
          {" / "}
          <span style={{ fontWeight: 800, color: T.textDk }}>{song.title}</span>
        </div>
      </div>

      {/* Two-Column Responsive Layout: Left Song Details & Lyrics | Right Sidebar */}
      <div className="ct-songs-grid-layout">

        {/* ── LEFT COLUMN ── */}
        <div>
          {/* Action Row */}
          <div className="ct-detail-actions" style={{
            background: T.bgCard, borderRadius: 14, padding: "12px 18px",
            border: `1.5px solid ${T.border}`, marginBottom: 20,
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
          }}>
            <div className="ct-detail-actions-group" style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              {/* Full Screen Button */}
              <button onClick={() => setShowPresenter(true)} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${T.green}`,
                background: "#E8F5E9", color: "#1B5E20",
                fontWeight: 800, fontSize: "0.82rem", cursor: "pointer"
              }}>
                <FaExpand size={11}/> Full Screen ▾
              </button>

              {/* Presenter View */}
              <button onClick={() => setShowPresenter(true)} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8, border: "none",
                background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryLt} 100%)`,
                color: "#FAF6EE", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer"
              }}>
                <FaDesktop size={11}/> Presenter
              </button>

              {/* Chords Toggle */}
              {song.chords && (
                <button onClick={() => setShowChords(v => !v)} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 8,
                  background: showChords ? T.purple : T.purpleLt,
                  border: `1.5px solid ${T.purple}`,
                  color: showChords ? "#fff" : T.purple,
                  fontWeight: 800, fontSize: "0.82rem", cursor: "pointer"
                }}>
                  <FaGuitar size={11}/> {showChords ? "Hide Chords" : "Chords"}
                </button>
              )}

              {/* Print */}
              <button onClick={() => window.print()} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "8px 14px", borderRadius: 8,
                background: T.bg, border: `1.5px solid ${T.border}`,
                color: T.textDk, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer"
              }}>
                <FaPrint size={11} color={T.gold}/> Print
              </button>

              {/* Native Device Share */}
              <button onClick={handleShare} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 8, border: "none",
                background: T.primaryDk, color: T.goldLt,
                fontWeight: 800, fontSize: "0.82rem", cursor: "pointer"
              }}>
                <FaShareAlt size={11} color={T.gold}/> Share
              </button>
            </div>

            {/* Favorite & Font Controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => onToggleFavorite(song._id || song.id)} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 8,
                background: isFav ? "#FEE2E2" : T.bg,
                border: `1.5px solid ${isFav ? T.crimson : T.border}`,
                color: isFav ? T.crimson : T.textMid,
                fontWeight: 800, fontSize: "0.82rem", cursor: "pointer"
              }}>
                {isFav ? <FaHeart size={12} color={T.crimson}/> : <FaRegHeart size={12}/>}
                {isFav ? "Saved" : "Favorite"}
              </button>

              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                background: T.bg, borderRadius: 8, padding: "3px 8px",
                border: `1px solid ${T.border}`, fontSize: "0.75rem", fontWeight: 700, color: T.textMid
              }}>
                <span>Font:</span>
                <button onClick={() => setFontMult(m => Math.max(0.85, m - 0.1))} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 900 }}>-</button>
                <span>{Math.round(fontMult * 100)}%</span>
                <button onClick={() => setFontMult(m => Math.min(1.4, m + 0.1))} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 900 }}>+</button>
              </div>
            </div>
          </div>

          {/* Song Big Heading Header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 10 }}>
              <span style={{
                background: song.language?.toLowerCase() === "tamil" ? T.bgMuted : T.purpleLt,
                color: song.language?.toLowerCase() === "tamil" ? T.primary : T.purple,
                fontSize: "0.76rem", fontWeight: 800, padding: "3px 10px", borderRadius: 12
              }}>
                {song.language} Repertoire
              </span>
              {song.key && (
                <span style={{
                  background: T.bg, color: T.goldDk,
                  fontSize: "0.76rem", fontWeight: 800, padding: "3px 10px", borderRadius: 12, border: `1px solid ${T.border}`
                }}>
                  🎵 Key: {song.key}
                </span>
              )}
              {song.theme && (
                <span style={{
                  background: "#F3F4F6", color: "#4B5563",
                  fontSize: "0.76rem", fontWeight: 700, padding: "3px 10px", borderRadius: 12
                }}>
                  {song.theme}
                </span>
              )}
            </div>

            <h1 style={{
              margin: "0 0 6px", fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
              color: T.textDk, fontWeight: 800, lineHeight: 1.25,
              fontFamily: "'Playfair Display', Georgia, serif"
            }}>
              {mainTitle}
            </h1>
            {subTitle && (
              <h2 style={{
                margin: "0 0 10px", fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: T.primary, fontWeight: 700, lineHeight: 1.3
              }}>
                {subTitle}
              </h2>
            )}

            {song.author && (
              <div style={{ fontSize: "0.9rem", color: T.textMuted, fontWeight: 600 }}>
                ✍ Composed &amp; Written by <span style={{ color: T.textDk, fontWeight: 800 }}>{song.author}</span>
              </div>
            )}
          </div>

          {/* Language Toggle Pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <button onClick={() => setActiveTab("tamil")} style={{
              padding: "7px 18px", borderRadius: 20,
              background: activeTab === "tamil" ? T.primary : T.bgCard,
              color: activeTab === "tamil" ? "#FAF6EE" : T.textMid,
              border: `1.5px solid ${activeTab === "tamil" ? T.primary : T.border}`,
              fontWeight: 800, fontSize: "0.84rem", cursor: "pointer"
            }}>
              தமிழ் Tamil
            </button>
            {song.englishLyrics && (
              <button onClick={() => setActiveTab("english")} style={{
                padding: "7px 18px", borderRadius: 20,
                background: activeTab === "english" ? T.primary : T.bgCard,
                color: activeTab === "english" ? "#FAF6EE" : T.textMid,
                border: `1.5px solid ${activeTab === "english" ? T.primary : T.border}`,
                fontWeight: 800, fontSize: "0.84rem", cursor: "pointer"
              }}>
                English Translation
              </button>
            )}
          </div>

          {/* Chords Transposer Section (if enabled) */}
          {showChords && song.chords && (
            <div style={{
              background: T.purpleLt, borderRadius: 16, padding: "20px 24px",
              border: `1.5px solid ${T.purple}`, marginBottom: 24
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, color: T.purple, fontWeight: 800, fontSize: "0.9rem" }}>
                  <FaGuitar size={14}/> Musical Chords (Transpose)
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem" }}>
                  <span>Key Shift:</span>
                  <button onClick={() => setChordsSemitones(s => s - 1)} style={{ padding: "3px 8px", borderRadius: 5, border: "1px solid #C4B5FD", background: "#fff", cursor: "pointer", fontWeight: 800 }}>-</button>
                  <span style={{ fontWeight: 800, minWidth: 28, textAlign: "center" }}>{chordsSemitones > 0 ? `+${chordsSemitones}` : chordsSemitones}</span>
                  <button onClick={() => setChordsSemitones(s => s + 1)} style={{ padding: "3px 8px", borderRadius: 5, border: "1px solid #C4B5FD", background: "#fff", cursor: "pointer", fontWeight: 800 }}>+</button>
                  <button onClick={() => setChordsSemitones(0)} style={{ marginLeft: 6, fontSize: "0.75rem", background: "none", border: "none", color: T.purple, cursor: "pointer", fontWeight: 700 }}>Reset</button>
                </div>
              </div>
              <pre style={{
                margin: 0, fontFamily: "monospace", fontSize: "0.94rem",
                color: "#4C1D95", lineHeight: 1.7, whiteSpace: "pre-wrap", overflowX: "auto"
              }}>
                {transposeChordsText(song.chords, chordsSemitones)}
              </pre>
            </div>
          )}

          {/* Unified Stanza Lyrics View (Single Box, No Pallavi/Saranam labels) */}
          <StanzaLyricsView
            lyricsText={activeTab === "tamil" ? song.lyrics : (song.englishLyrics || song.lyrics)}
            fontSizeMultiplier={fontMult}
            onCopy={() => showToast("Lyrics copied!")}
            title={`${song.title} — Lyrics`}
          />

          {/* YouTube Video Section */}
          {embedUrl && (
            <div style={{
              marginTop: 32, background: T.bgCard, borderRadius: 16,
              border: `1.5px solid ${T.border}`, overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
            }}>
              <div style={{
                padding: "14px 20px", background: `linear-gradient(135deg, ${T.primaryDk} 0%, ${T.primary} 100%)`,
                color: "#FAF6EE", display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: "0.9rem" }}>
                  <FaYoutube color="#EF4444" size={17}/> Official Worship Video
                </div>
                {watchUrl && (
                  <a href={watchUrl} target="_blank" rel="noopener noreferrer" style={{ color: T.goldLt, fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>
                    Watch on YouTube ↗
                  </a>
                )}
              </div>
              <div style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={embedUrl}
                  title={song.title}
                  width="100%" height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="ct-songs-sidebar">

          {/* Slide Deck Preview */}
          <PPTDeckPreview
            song={song}
            onPresenterClick={() => setShowPresenter(true)}
            onDownloadClick={handleDownloadPPT}
          />

          {/* YOUR FAVOURITES Card (Reference: tamilchristiansongs.in) */}
          <div style={{
            background: T.bgCard, borderRadius: 16, padding: "18px 20px",
            border: `1.5px solid ${T.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
          }}>
            <div style={{
              fontSize: "0.78rem", fontWeight: 800, color: T.primary,
              textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12,
              paddingBottom: 8, borderBottom: `1.5px solid ${T.bgMuted}`,
              display: "flex", alignItems: "center", gap: 7
            }}>
              <FaHeart color={T.crimson} size={12}/> Your Favourites
            </div>

            {favSongs.length === 0 ? (
              <div style={{ color: T.textMuted, fontSize: "0.85rem", fontStyle: "italic", padding: "6px 0" }}>
                Your favorites will be here.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {favSongs.map(fav => (
                  <div key={fav._id || fav.id} onClick={() => onSelectSong(fav)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "7px 10px", borderRadius: 8, background: T.bg,
                    cursor: "pointer", border: `1px solid ${T.border}`, transition: "all 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.gold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.textDk, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {fav.title}
                    </span>
                    <FaChevronRight size={9} color={T.gold}/>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CHORDS A-Z 7-Column Grid (Reference: tamilchristiansongs.in) */}
          <div style={{
            background: T.bgCard, borderRadius: 16, padding: "18px 20px",
            border: `1.5px solid ${T.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
          }}>
            <div style={{
              fontSize: "0.78rem", fontWeight: 800, color: T.primary,
              textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12,
              paddingBottom: 8, borderBottom: `1.5px solid ${T.bgMuted}`,
              display: "flex", alignItems: "center", gap: 7
            }}>
              <FaGuitar size={13} color={T.primary}/> Chords A–Z
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
              {CHORDS_KEYS_GRID.map(ch => (
                <button key={ch} onClick={() => onChordSelect(ch)} style={{
                  padding: "6px 2px", borderRadius: 6,
                  border: `1px solid ${selectedChordKey === ch ? T.primary : T.border}`,
                  background: selectedChordKey === ch ? T.primary : T.bg,
                  color: selectedChordKey === ch ? "#FAF6EE" : T.textDk,
                  fontWeight: 800, fontSize: "0.8rem", cursor: "pointer",
                  transition: "all 0.15s", textAlign: "center"
                }}>
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Hymn Details Table */}
          <div style={{
            background: T.bgCard, borderRadius: 16, padding: "20px 22px",
            border: `1.5px solid ${T.border}`
          }}>
            <div style={{
              fontSize: "0.78rem", fontWeight: 800, color: T.goldDk,
              textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14,
              borderBottom: `1px solid ${T.bg}`, paddingBottom: 8
            }}>
              Hymn Details
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Key", value: song.key },
                { label: "Tempo", value: song.tempo },
                { label: "Author", value: song.author },
                { label: "Theme", value: song.theme },
                { label: "Language", value: song.language },
                { label: "PPT", value: song.pptUrl ? "Available ✓" : "Pending" },
                { label: "Chords", value: song.chords ? "Included ✓" : "Pending" }
              ].filter(i => i.value).map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.84rem", paddingBottom: 6, borderBottom: `1px solid ${T.bg}` }}>
                  <span style={{ color: T.textMuted, fontWeight: 600 }}>{item.label}</span>
                  <span style={{ color: item.value?.includes?.("✓") ? T.green : T.textDk, fontWeight: 700 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Set */}
          <div style={{ background: T.bg, borderRadius: 16, padding: "20px 22px", border: `1.5px solid ${T.border}` }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, color: T.primary, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14 }}>
              Suggested Worship Set
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map(rel => {
                const thumb = getYouTubeThumbnail(rel.youtubeUrl);
                return (
                  <div key={rel._id || rel.id} onClick={() => onSelectSong(rel)} style={{
                    display: "flex", gap: 10, alignItems: "center", cursor: "pointer",
                    padding: "8px", borderRadius: 10, background: T.bgCard,
                    border: `1px solid ${T.border}`, transition: "all 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.gold}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                    <div style={{ width: 42, height: 42, borderRadius: 7, overflow: "hidden", background: T.primaryDk, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {thumb ? <img src={thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/> : <FaMusic size={15} color={T.gold}/>}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.84rem", fontWeight: 700, color: T.primary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {rel.title}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: T.goldDk, fontWeight: 600 }}>
                        {rel.key ? `Key: ${rel.key}` : rel.language}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SONG CARD COMPONENT (Fully Responsive for Phone & Desktop)
═══════════════════════════════════════════════════════════════ */
function SongCard({ song, onOpen, onShare, isFavorite, onToggleFavorite }) {
  const thumb = getYouTubeThumbnail(song.youtubeUrl);
  const snippet = (song.lyrics || song.englishLyrics || "").replace(/\[.*?\]/g, "").replace(/\n+/g, " ").trim().slice(0, 135);

  return (
    <div onClick={() => onOpen(song)} className="ct-song-card-item">
      {/* Thumbnail */}
      <div className="ct-song-card-thumb" style={{
        width: 130, height: 80, borderRadius: 10,
        overflow: "hidden", flexShrink: 0, background: T.primaryDk,
        position: "relative", border: `1px solid rgba(212, 175, 55, 0.3)`
      }}>
        {thumb ? (
          <>
            <img src={thumb} alt={song.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            <div style={{
              position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "rgba(200, 29, 37, 0.92)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff"
              }}>
                <FaPlay size={9} style={{ marginLeft: 2 }}/>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(135deg, ${T.primaryDk} 0%, ${T.primary} 100%)`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            color: T.gold, gap: 4
          }}>
            <div style={{ fontSize: "1.2rem" }}>✝</div>
            <div style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: 1, color: T.goldLt }}>
              SANCTUARY
            </div>
          </div>
        )}
        {song.pptUrl && (
          <div style={{
            position: "absolute", bottom: 4, right: 4,
            background: "#F59E0B", color: "#2C1A0E",
            fontSize: "0.6rem", fontWeight: 900, padding: "1px 5px", borderRadius: 4
          }}>
            PPT
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <h3 style={{
            margin: 0, fontSize: "1.02rem", fontWeight: 800, color: T.textDk,
            lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>
            {song.title}
          </h3>
          <span style={{
            background: song.language?.toLowerCase() === "tamil" ? T.bgMuted : T.purpleLt,
            color: song.language?.toLowerCase() === "tamil" ? T.primary : T.purple,
            fontSize: "0.7rem", fontWeight: 800, padding: "2px 8px", borderRadius: 10, flexShrink: 0
          }}>
            {song.language}
          </span>
        </div>

        <p style={{
          margin: "0 0 8px", fontSize: "0.85rem", color: T.textMid,
          fontStyle: "italic", lineHeight: 1.5,
          overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
        }}>
          "{snippet}"
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, fontSize: "0.74rem" }}>
          {song.author && (
            <span style={{ color: T.textMuted, fontWeight: 600 }}>
              ✍ {song.author}
            </span>
          )}
          {song.key && (
            <span style={{
              background: T.bg, color: T.goldDk, fontWeight: 700,
              padding: "2px 8px", borderRadius: 10, border: `1px solid ${T.border}`
            }}>
              🎵 {song.key}
            </span>
          )}
          {song.chords && (
            <span style={{
              background: T.purpleLt, color: T.purple, fontWeight: 800,
              padding: "2px 8px", borderRadius: 10
            }}>
              🎸 Chords
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="ct-song-card-actions" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button onClick={e => { e.stopPropagation(); onToggleFavorite(song._id || song.id); }} style={{
          padding: "8px 10px", borderRadius: 8,
          background: isFavorite ? "#FEE2E2" : T.bg,
          border: `1.5px solid ${isFavorite ? T.crimson : T.border}`,
          color: isFavorite ? T.crimson : T.textMid,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
        }} title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
          {isFavorite ? <FaHeart size={13} color={T.crimson}/> : <FaRegHeart size={13}/>}
        </button>

        <button onClick={e => { e.stopPropagation(); onShare(song); }} style={{
          padding: "8px 12px", borderRadius: 8, background: T.bg,
          border: `1.5px solid ${T.border}`, color: T.textDk,
          fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 5
        }}>
          <FaShareAlt size={11} color={T.gold}/> Share
        </button>

        <button onClick={e => { e.stopPropagation(); onOpen(song); }} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: T.primary, color: T.goldLt,
          fontWeight: 900, fontSize: "0.82rem", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          boxShadow: `0 2px 8px rgba(138, 37, 82, 0.25)`
        }}>
          View <FaChevronRight size={10}/>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN LYRICS REPERTOIRE COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Lyrics() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [letterFilter, setLetterFilter] = useState("All");
  const [chordsOnly, setChordsOnly] = useState(false);
  const [selectedChordKey, setSelectedChordKey] = useState(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ct_fav_songs") || "[]");
    } catch {
      return [];
    }
  });

  const toggleFavorite = (songId) => {
    setFavorites(prev => {
      const next = prev.includes(songId) ? prev.filter(x => x !== songId) : [...prev, songId];
      try { localStorage.setItem("ct_fav_songs", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleShareSong = async (songToShare) => {
    const url = `${window.location.origin}/songs/lyrics/${songToShare._id || songToShare.id}`;
    const data = {
      title: `${songToShare.title} — Christ's Tabernacle`,
      text: `🎶 "${songToShare.title}"\n${url}`,
      url
    };
    if (navigator.share) {
      try { await navigator.share(data); } catch {}
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert("Song link copied to clipboard!");
    }
  };

  useEffect(() => {
    getPublicSongs()
      .then(data => setSongs(data && data.length > 0 ? data : DEFAULT_SONGS))
      .catch(() => setSongs(DEFAULT_SONGS))
      .finally(() => setLoading(false));
  }, []);

  const activeSong = id ? songs.find(s => String(s._id) === String(id) || String(s.id) === String(id)) : null;

  const openSong = (song) => {
    navigate(`/songs/lyrics/${song._id || song.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleBackToList = () => {
    navigate("/songs/lyrics");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChordSelect = (key) => {
    if (selectedChordKey === key) {
      setSelectedChordKey(null);
      setSearch("");
    } else {
      setSelectedChordKey(key);
      setSearch(key);
      setLetterFilter("All");
    }
  };

  const filtered = songs
    .filter(s => {
      const matchLang = langFilter === "All" || s.language?.toLowerCase() === langFilter.toLowerCase();
      const q = search.toLowerCase().trim();
      const matchSearch = !q ||
        s.title?.toLowerCase().includes(q) ||
        s.lyrics?.toLowerCase().includes(q) ||
        s.englishLyrics?.toLowerCase().includes(q) ||
        s.author?.toLowerCase().includes(q) ||
        s.key?.toLowerCase().includes(q);
      const matchChords = !chordsOnly || !!s.chords;
      const matchLetter = letterFilter === "All" ||
        (letterFilter === "த" ? s.title?.includes("த") : s.title?.[0]?.toUpperCase() === letterFilter);
      return matchLang && matchSearch && matchChords && matchLetter;
    })
    .sort((a, b) => a.title?.localeCompare(b.title));

  const favSongs = songs.filter(s => favorites.includes(s._id || s.id));

  return (
    <>
      {/* ── RESPONSIVE STYLE SHEET ── */}
      <style>{`
        .ct-songs-grid-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 30px;
          align-items: start;
        }
        .ct-songs-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .ct-song-card-item {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1.5px solid ${T.border};
          padding: 16px 20px;
          display: flex;
          gap: 18px;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .ct-song-card-item:hover {
          border-color: ${T.gold};
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(138, 37, 82, 0.1);
        }
        .ct-lyrics-box {
          background: #FFFFFF;
          border: 1.5px solid ${T.border};
          border-radius: 18px;
          padding: 34px 40px;
          box-shadow: 0 8px 30px rgba(138, 37, 82, 0.06);
          position: relative;
        }
        .ct-detail-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .ct-az-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: center;
        }

        /* ── Tablet & Small Laptops (<= 992px) ── */
        @media (max-width: 992px) {
          .ct-songs-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .ct-songs-sidebar {
            position: static !important;
          }
        }

        /* ── Phones & Handhelds (<= 640px) ── */
        @media (max-width: 640px) {
          .ct-song-card-item {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 14px 16px !important;
            gap: 12px !important;
          }
          .ct-song-card-thumb {
            width: 100% !important;
            height: 150px !important;
          }
          .ct-song-card-actions {
            width: 100% !important;
            justify-content: space-between !important;
            padding-top: 8px !important;
            border-top: 1px dashed ${T.border} !important;
          }
          .ct-lyrics-box {
            padding: 20px 16px !important;
            border-radius: 14px !important;
          }
          .ct-detail-actions {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .ct-detail-actions-group {
            width: 100% !important;
          }
          .ct-detail-actions-group > button {
            flex: 1 1 45% !important;
            justify-content: center !important;
            padding: 8px 10px !important;
          }
          .ct-az-bar {
            gap: 3px !important;
            padding: 8px 6px !important;
          }
          .ct-az-btn {
            padding: 5px 7px !important;
            font-size: 0.74rem !important;
            min-width: 26px !important;
          }
        }
      `}</style>

      {/* ── 1. DETAIL VIEW (/songs/lyrics/:id) ── */}
      {id ? (
        loading ? (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <div style={{ fontSize: "2rem", color: T.gold, animation: "pulse 1.2s infinite" }}>✝</div>
            <div style={{ marginTop: 16, fontSize: "1.05rem", color: T.primary, fontWeight: 700 }}>
              Loading Hymn Sheet...
            </div>
          </div>
        ) : !activeSong ? (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <FaMusic size={42} color={T.gold} style={{ marginBottom: 16, opacity: 0.6 }}/>
            <h2 style={{ fontSize: "1.5rem", color: T.primary, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>
              Hymn Not Found
            </h2>
            <p style={{ color: T.textMuted, marginBottom: 24 }}>
              The song you are looking for may have been moved or updated.
            </p>
            <button onClick={handleBackToList} style={{
              padding: "10px 24px", borderRadius: 30, background: T.primary,
              color: "#FAF6EE", border: "none", fontWeight: 800, cursor: "pointer"
            }}>
              ← Browse Repertoire
            </button>
          </div>
        ) : (
          <SongDetailView
            song={activeSong}
            songs={songs}
            onBack={handleBackToList}
            onSelectSong={openSong}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onLetterSelect={(l) => { setLetterFilter(l); handleBackToList(); }}
            onChordSelect={(c) => { handleChordSelect(c); handleBackToList(); }}
            selectedChordKey={selectedChordKey}
          />
        )
      ) : (
        /* ── 2. REPERTOIRE LISTING VIEW ── */
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 16px 60px" }}>

          {/* Hero Header with Search */}
          <div style={{
            background: `linear-gradient(135deg, ${T.primaryDk} 0%, #133929 40%, ${T.primary} 100%)`,
            borderRadius: 22, padding: "34px 28px 28px", marginBottom: 22,
            color: "#FAF6EE", border: `1.5px solid ${T.borderGold}`,
            boxShadow: `0 12px 36px rgba(12, 34, 25, 0.2)`
          }}>
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <div style={{
                color: T.goldLt, fontSize: "0.82rem", fontWeight: 800,
                letterSpacing: 2.2, textTransform: "uppercase", marginBottom: 8
              }}>
                ✝ Christ's Tabernacle Sacred Hymnal ✝
              </div>
              <h1 style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.3rem)", fontWeight: 800,
                margin: "0 0 10px", fontFamily: "'Playfair Display', serif"
              }}>
                Worship Songs &amp; Chords Repertoire
              </h1>
              <p style={{ color: "rgba(250, 246, 238, 0.9)", fontSize: "0.92rem", lineHeight: 1.6, margin: "0 0 22px" }}>
                Browse Tamil &amp; English worship songs alphabetically, chords A–Z, lyrics sheets, and projection slide decks.
              </p>

              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "#fff", borderRadius: 40, padding: "8px 20px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)", border: `2px solid ${T.gold}`
              }}>
                <FaSearch color={T.primary} size={16}/>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search title, Tamil lyrics, composer, or chord..."
                  style={{
                    flex: 1, border: "none", outline: "none", fontSize: "0.96rem",
                    color: T.primary, background: "transparent", fontWeight: 600, minWidth: 0
                  }}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, display: "flex" }}>
                    <FaTimes size={14}/>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* A-Z Letter Nav Bar */}
          <div className="ct-az-bar" style={{
            background: T.primaryDk, borderRadius: 12, padding: "10px 14px",
            marginBottom: 24,
            boxShadow: `0 4px 18px rgba(12, 34, 25, 0.2)`
          }}>
            {ALPHABET.map(letter => {
              const isSelected = letterFilter === letter;
              return (
                <button key={letter} onClick={() => { setLetterFilter(letter); setSearch(""); }} className="ct-az-btn" style={{
                  padding: "6px 12px", borderRadius: 6, border: "none", fontWeight: 800,
                  fontSize: letter === "All" || letter === "த" ? "0.8rem" : "0.88rem",
                  cursor: "pointer", transition: "all 0.15s",
                  background: isSelected ? T.gold : "rgba(255,255,255,0.08)",
                  color: isSelected ? "#112218" : "#FAF6EE",
                  minWidth: letter === "All" ? 42 : 32
                }}>
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Two-Column Responsive Layout */}
          <div className="ct-songs-grid-layout">

            {/* ── LEFT: Filter Sub-bar & Songs List ── */}
            <div>
              {/* Sub-bar Filter (Language pills & Chords toggle) */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 20, flexWrap: "wrap", gap: 10
              }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { key: "All", label: "All Songs" },
                    { key: "Tamil", label: "தமிழ் Tamil" },
                    { key: "English", label: "English" }
                  ].map(lang => (
                    <button key={lang.key} onClick={() => setLangFilter(lang.key)} style={{
                      padding: "7px 16px", borderRadius: 22,
                      background: langFilter === lang.key ? T.primary : T.bgCard,
                      color: langFilter === lang.key ? "#FAF6EE" : T.textMid,
                      fontWeight: 800, fontSize: "0.82rem", cursor: "pointer",
                      border: `1.5px solid ${langFilter === lang.key ? T.primary : T.border}`,
                      boxShadow: langFilter === lang.key ? `0 4px 14px rgba(24, 67, 50, 0.25)` : "0 1px 4px rgba(0,0,0,0.06)"
                    }}>
                      {lang.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button onClick={() => setChordsOnly(v => !v)} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "7px 14px", borderRadius: 18,
                    background: chordsOnly ? T.purple : T.bgCard,
                    color: chordsOnly ? "#fff" : T.textMid,
                    border: `1.5px solid ${chordsOnly ? T.purple : T.border}`,
                    fontWeight: 800, fontSize: "0.8rem", cursor: "pointer"
                  }}>
                    <FaGuitar size={11} color={chordsOnly ? "#fff" : T.purple}/> Chords Only
                  </button>

                  <span style={{ fontSize: "0.84rem", color: T.textMuted, fontWeight: 800 }}>
                    {filtered.length} song{filtered.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Songs List */}
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ background: T.bgCard, borderRadius: 14, height: 110, border: `1px solid ${T.border}`, opacity: 0.5 }}/>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div style={{
                  background: T.bgCard, borderRadius: 18, padding: "70px 20px",
                  textAlign: "center", border: `1.5px solid ${T.border}`
                }}>
                  <FaMusic size={40} color={T.gold} style={{ opacity: 0.5, marginBottom: 14 }}/>
                  <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem", fontWeight: 800, color: T.primary, fontFamily: "'Playfair Display', serif" }}>
                    No Songs Found
                  </h3>
                  <p style={{ margin: "0 0 16px", color: T.textMuted }}>
                    Try adjusting your search query, alphabet letter, or language filters.
                  </p>
                  <button onClick={() => { setSearch(""); setLetterFilter("All"); setLangFilter("All"); setChordsOnly(false); }} style={{
                    padding: "8px 20px", borderRadius: 20, background: T.primary,
                    color: "#FAF6EE", border: "none", fontWeight: 800, cursor: "pointer"
                  }}>
                    Reset All Filters
                  </button>
                </div>
              ) : !search && letterFilter === "All" ? (
                // Grouped Alphabetically by Letter
                (() => {
                  const groups = {};
                  filtered.forEach(s => {
                    const l = s.title?.[0]?.toUpperCase() || "#";
                    if (!groups[l]) groups[l] = [];
                    groups[l].push(s);
                  });
                  return Object.keys(groups).sort().map(letter => (
                    <div key={letter} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, marginTop: 12 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 8,
                          background: T.primary, color: "#FAF6EE",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 900, fontSize: "1.1rem", flexShrink: 0
                        }}>
                          {letter}
                        </div>
                        <div style={{ flex: 1, height: 1.5, background: T.border }}/>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {groups[letter].map(s => (
                          <SongCard
                            key={s._id || s.id}
                            song={s}
                            onOpen={openSong}
                            onShare={handleShareSong}
                            isFavorite={favorites.includes(s._id || s.id)}
                            onToggleFavorite={toggleFavorite}
                          />
                        ))}
                      </div>
                    </div>
                  ));
                })()
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filtered.map(s => (
                    <SongCard
                      key={s._id || s.id}
                      song={s}
                      onOpen={openSong}
                      onShare={handleShareSong}
                      isFavorite={favorites.includes(s._id || s.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="ct-songs-sidebar">

              {/* YOUR FAVOURITES Card (Reference: tamilchristiansongs.in) */}
              <div style={{
                background: T.bgCard, borderRadius: 16, padding: "18px 20px",
                border: `1.5px solid ${T.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
              }}>
                <div style={{
                  fontSize: "0.78rem", fontWeight: 800, color: T.primary,
                  textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12,
                  paddingBottom: 8, borderBottom: `1.5px solid ${T.bgMuted}`,
                  display: "flex", alignItems: "center", gap: 7
                }}>
                  <FaHeart color={T.crimson} size={12}/> Your Favourites
                </div>

                {favSongs.length === 0 ? (
                  <div style={{ color: T.textMuted, fontSize: "0.85rem", fontStyle: "italic", padding: "6px 0" }}>
                    Your favorites will be here.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {favSongs.map(fav => (
                      <div key={fav._id || fav.id} onClick={() => openSong(fav)} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "7px 10px", borderRadius: 8, background: T.bg,
                        cursor: "pointer", border: `1px solid ${T.border}`, transition: "all 0.15s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = T.gold}
                      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.textDk, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {fav.title}
                        </span>
                        <FaChevronRight size={9} color={T.gold}/>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CHORDS A-Z (Reference: tamilchristiansongs.in) */}
              <div style={{
                background: T.bgCard, borderRadius: 16, padding: "18px 20px",
                border: `1.5px solid ${T.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.03)"
              }}>
                <div style={{
                  fontSize: "0.78rem", fontWeight: 800, color: T.primary,
                  textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12,
                  paddingBottom: 8, borderBottom: `1.5px solid ${T.bgMuted}`,
                  display: "flex", alignItems: "center", gap: 7
                }}>
                  <FaGuitar size={13} color={T.primary}/> Chords A–Z
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
                  {CHORDS_KEYS_GRID.map(ch => (
                    <button key={ch} onClick={() => handleChordSelect(ch)} style={{
                      padding: "6px 2px", borderRadius: 6,
                      border: `1px solid ${selectedChordKey === ch ? T.primary : T.border}`,
                      background: selectedChordKey === ch ? T.primary : T.bg,
                      color: selectedChordKey === ch ? "#FAF6EE" : T.textDk,
                      fontWeight: 800, fontSize: "0.8rem", cursor: "pointer",
                      transition: "all 0.15s", textAlign: "center"
                    }}>
                      {ch}
                    </button>
                  ))}
                </div>

                {selectedChordKey && (
                  <button onClick={() => { setSelectedChordKey(null); setSearch(""); }} style={{
                    marginTop: 12, width: "100%", padding: "7px", borderRadius: 8,
                    border: `1px solid ${T.border}`, background: T.bgMuted,
                    color: T.primary, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                  }}>
                    <FaTimes size={10}/> Clear Chord Filter ({selectedChordKey})
                  </button>
                )}
              </div>

              {/* Scripture Encouragement */}
              <div style={{
                background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryLt} 100%)`,
                borderRadius: 16, padding: "20px", color: "#FAF6EE",
                border: `1.5px solid ${T.borderGold}`, textAlign: "center"
              }}>
                <div style={{ color: T.goldLt, fontSize: "1.5rem", marginBottom: 8 }}>✝</div>
                <p style={{
                  margin: "0 0 10px", fontSize: "0.94rem", lineHeight: 1.7,
                  fontStyle: "italic", fontFamily: "'Playfair Display', serif"
                }}>
                  "Sing to the LORD a new song; sing to the LORD, all the earth."
                </p>
                <div style={{ fontSize: "0.76rem", color: T.goldLt, fontWeight: 800, letterSpacing: 1 }}>
                  — Psalm 96:1
                </div>
              </div>

              {/* Repertoire Stats */}
              <div style={{ background: T.bg, borderRadius: 16, padding: "18px 20px", border: `1.5px solid ${T.border}` }}>
                <div style={{
                  fontSize: "0.76rem", fontWeight: 800, color: T.primary,
                  textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12
                }}>
                  Repertoire Stats
                </div>
                {[
                  { label: "Total Hymns", value: songs.length },
                  { label: "Tamil Songs", value: songs.filter(s => s.language?.toLowerCase() === "tamil").length },
                  { label: "English Songs", value: songs.filter(s => s.language?.toLowerCase() === "english").length },
                  { label: "With Chords", value: songs.filter(s => !!s.chords).length },
                  { label: "With PPT Deck", value: songs.filter(s => !!s.pptUrl).length },
                ].map(stat => (
                  <div key={stat.label} style={{
                    display: "flex", justifyContent: "space-between",
                    paddingBottom: 6, borderBottom: `1px solid ${T.border}`,
                    marginBottom: 6, fontSize: "0.82rem"
                  }}>
                    <span style={{ color: T.textMuted, fontWeight: 600 }}>{stat.label}</span>
                    <span style={{ color: T.primary, fontWeight: 800 }}>{stat.value}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
