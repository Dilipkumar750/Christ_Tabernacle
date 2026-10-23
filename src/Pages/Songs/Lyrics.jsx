import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicSongs } from "../../services/api";
import {
  FaSearch, FaMusic, FaCopy, FaCheck, FaDownload, FaYoutube,
  FaFilePowerpoint, FaChevronRight, FaGuitar, FaPrint, FaTimes,
  FaPlay, FaChevronLeft, FaShareAlt,
  FaExclamationCircle, FaTag,
  FaPlus, FaMinus, FaDesktop, FaColumns
} from "react-icons/fa";

/* ═══════════════════════════════════════════════════════════════
   YOUTUBE HELPERS
═══════════════════════════════════════════════════════════════ */
function extractYouTubeId(url) {
  if (!url) return null;
  const iframeMatch = url.match(/src=["'](.*?)["']/);
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
  if (id) return `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=0`;
  return null;
}
function getYouTubeWatchUrl(url) {
  const id = extractYouTubeId(url);
  if (id) return `https://www.youtube.com/watch?v=${id}`;
  return url || null;
}
function getYouTubeThumbnail(url) {
  const id = extractYouTubeId(url);
  if (id) return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   CHORD TRANSPOSER UTILITIES
═══════════════════════════════════════════════════════════════ */
const SCALE_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SCALE_FLAT  = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

function transposeChord(chord, semitones) {
  if (semitones === 0) return chord;
  return chord.replace(/[A-G][b#]?/g, (match) => {
    let idx = SCALE_SHARP.indexOf(match);
    if (idx === -1) idx = SCALE_FLAT.indexOf(match);
    if (idx === -1) return match;
    const newIdx = (idx + semitones + 12 * 10) % 12;
    return SCALE_SHARP[newIdx];
  });
}

function transposeChordsText(text, semitones) {
  if (!text || semitones === 0) return text;
  return text.split("\n").map(line => {
    // Check if line looks like chords
    const words = line.trim().split(/\s+/);
    const isChordLine = words.length > 0 && words.every(w => /^[A-G][b#]?(?:m|maj|min|dim|aug|sus[24]?|[0-9])*(?:\/[A-G][b#]?)?$/.test(w) || w === "" || w.startsWith("["));
    if (isChordLine && !line.startsWith("[")) {
      return transposeChord(line, semitones);
    }
    return line;
  }).join("\n");
}

/* ═══════════════════════════════════════════════════════════════
   DEMO / DEFAULT WORSHIP REPERTOIRE
═══════════════════════════════════════════════════════════════ */
const DEFAULT_SONGS = [
  {
    _id: "song_1", id: 1,
    title: "Tholainthu Pona Ennai (தொலைந்து போன என்னை)",
    language: "Tamil", theme: "Adoration & Grace", key: "D Major", tempo: "68 BPM • Slow Worship",
    author: "Gersson Edinbaro / Jabadeepak", uploadDate: "Oct 2026", views: "192K views", duration: "06:45",
    youtubeUrl: "https://www.youtube.com/watch?v=kYI9Fj9-X3I",
    pptUrl: "https://example.com/tholainthu-pona-ennai.pptx",
    lyrics:
`[பல்லவி - Chorus]
தொலைந்து போன என்னை
அரவணைத்த அன்பை
ஜீவன் உள்ள நாளெல்லாம்
நான் பாடுவேன்

அந்த அன்பிற்கு ஈடேதும் இல்லையே
அதை பாடாத ஒரு நாளும் இல்லையே

[சரணம் 1 - Verse 1]
தவறுகள் செய்ததால் தகுதி இழந்தேன்
தகப்பன் வீட்டை நான் முற்றும் மறந்தேன்
சுயநலமாய் நான் வாழ்ந்த போதிலும்
சுகமாக என்னை சுமந்து வந்தவரே

ஒழுங்கில்லாது வாழ்ந்த என்னை தேடி வந்தவரே
நீர் ஒருவர் மட்டும் உம் தயவால் எனக்காய் நின்றவரே

[சரணம் 2 - Verse 2]
உலகத்தில் அன்பை நான் தேடி அலைந்தேன்
உமது அன்பை நான் முற்றும் வெறுத்தேன்
எல்லாம் நான் இழந்த போதிலும்
இறுதி வரை என்னை நேசித்தீரையா

பன்றிகளோடு வாழ்ந்த என்னை சேர்த்துக் கொண்டவரே
உம் பாசத்தாலே முத்தங்கள் செய்து அணைத்து கொண்டவரே

[சரணம் 3 - Verse 3]
திரும்பிய என்னை நீர் தள்ளிடாமலே
திருந்தி வாழ்வதற்கு வாய்ப்பு தந்தவரே
இதுவரையில் என்னை தூக்க மறக்கலையே
இனிமேலும் என்னை விட்டுக்கொடுக்கலையே

நான் எந்த நிலையில் இருந்தாலும் என்னை வெறுக்கலையே
நல்ல தகப்பனாக இதுவரையில் என்னை மறக்கலையே`,
    englishLyrics:
`[Chorus]
Tholainthu Pona Ennai
The boundless love that embraced me when I was lost
All the living days of my life
I will sing Your praise

There is nothing equal to that divine love
Not a single day shall pass without singing of it

[Verse 1]
Because of my sins, I forfeited all worth
I completely turned away from my Father's house
Even when I lived solely for myself
You carried me gently in Your tender mercy

You came seeking me in the midst of my ruins
You alone stood for me by Your unmerited grace

[Verse 2]
I wandered searching for worldly love
I cast aside the supreme love of Heaven
Even when I squandered and lost everything
You loved me faithfully until the very end

You received me back with open arms
You kissed away my tears and embraced me into Your glory

[Verse 3]
When I turned back, You did not cast me out
You granted me new life and glorious redemption
You have never ceased to lift me up
You will never let me go in the days ahead

No matter how broken I am, You never despise me
As a faithful Father, You have never forsaken me`,
    chords:
`[பல்லவி - Key: D Major]
D        Bm       G        A
தொலைந்து போன என்னை
D        Bm       G        A
அரவணைத்த அன்பை
G        A        D        Bm
ஜீவன் உள்ள நாளெல்லாம்
G        A        D
நான் பாடுவேன்

[சரணம் 1]
Bm       G        D        A
தவறுகள் செய்ததால் தகுதி இழந்தேன்
Bm       G        D        A
தகப்பன் வீட்டை நான் முற்றும் மறந்தேன்
G        A        D        Bm
சுயநலமாய் நான் வாழ்ந்த போதிலும்
G        A        D
சுகமாக என்னை சுமந்து வந்தவரே`,
    tags: ["Grace", "Prodigal Son", "Gersson Edinbaro", "Sanctuary Worship", "Tamil Hymn"],
  },
  {
    _id: "song_2", id: 2,
    title: "En Uyirana Yesuvae (என் உயிரான இயேசுவே)",
    language: "Tamil", theme: "Adoration & Praise", key: "G Major", tempo: "72 BPM • Moderately Slow",
    author: "Christ's Tabernacle Worship", uploadDate: "Sep 2026", views: "98K views", duration: "05:02",
    youtubeUrl: "https://www.youtube.com/watch?v=Jbe7OruLk8I",
    pptUrl: "https://example.com/en-uyirana-yesuvae.pptx",
    lyrics:
`[பல்லவி - Chorus]
என் உயிரான இயேசுவே
என் உயிருள்ள நாளெல்லாம்
உம்மை புகழ்ந்து பாடுவேன்
உம்மையே போற்றி துதிப்பேன்

[சரணம் 1 - Verse 1]
என்னை தாங்கும் கன்மலையே
என்னை காக்கும் புகலிடமே
காரிருள் சூழ்ந்த வேளையிலும்
என் தீபமாய் வந்தவரே

[சரணம் 2 - Verse 2]
தாயினும் மேலாய் அன்பு கூர்ந்து
தழும்புகளால் என்னை சுகமாக்கினீர்
ஜீவனை எனக்காய் ஈந்தவரே
ஜீவனுள்ள தேவா ஸ்தோத்திரம்`,
    englishLyrics:
`[Chorus]
O Jesus, breath of my very soul
All the days that breath remains in me
I will lift my voice and sing Your glory
I will praise and worship only You

[Verse 1]
You are the Rock that steadfastly upholds me
You are the sanctuary where I take refuge
Even when darkest night surrounds me
You shine as my eternal lamp

[Verse 2]
Loving me deeper than a mother ever could
By Your holy stripes You brought me healing
You laid down Your sacred life for me
Living God, all praise to Your Name!`,
    chords:
`[பல்லவி - Key: G Major]
G        Em       C        D
என் உயிரான இயேசுவே
G        Em       C        D
என் உயிருள்ள நாளெல்லாம்
C        D        G        Em
உம்மை புகழ்ந்து பாடுவேன்
C        D        G
உம்மையே போற்றி துதிப்பேன்`,
    tags: ["Rock of Ages", "Sacred Worship", "Tamil Hymn", "Adoration"],
  },
  {
    _id: "song_3", id: 3,
    title: "Amazing Grace (My Chains Are Gone)",
    language: "English", theme: "Deliverance & Cross", key: "E Major", tempo: "64 BPM • Classic Hymn",
    author: "John Newton / Chris Tomlin", uploadDate: "Aug 2026", views: "142K views", duration: "05:40",
    youtubeUrl: "https://www.youtube.com/watch?v=nQWFzMvCfLE",
    pptUrl: "https://example.com/amazing-grace-chains-gone.pptx",
    lyrics:
`[Verse 1]
Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

[Chorus]
My chains are gone, I've been set free!
My God, my Savior has ransomed me!
And like a flood His mercy reigns,
Unending love, amazing grace!

[Verse 2]
'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed!

[Verse 3]
The Lord has promised good to me,
His word my hope secures;
He will my shield and portion be
As long as life endures.`,
    englishLyrics:
`[Verse 1]
Amazing grace! How sweet the sound
That saved a wretch like me!
I once was lost, but now am found;
Was blind, but now I see.

[Chorus]
My chains are gone, I've been set free!
My God, my Savior has ransomed me!
And like a flood His mercy reigns,
Unending love, amazing grace!

[Verse 2]
'Twas grace that taught my heart to fear,
And grace my fears relieved;
How precious did that grace appear
The hour I first believed!`,
    chords:
`[Verse 1 - Key: E Major]
E                A       E
Amazing grace! How sweet the sound
E                B
That saved a wretch like me!
E                A       E
I once was lost, but now am found;
C#m      B       E
Was blind, but now I see.

[Chorus]
A                        E/G#
My chains are gone, I've been set free!
A/C#             E/B
My God, my Savior has ransomed me!
A                E/G#
And like a flood His mercy reigns,
F#m7     B7      E
Unending love, amazing grace!`,
    tags: ["Classic Hymn", "Salvation", "English Worship", "Deliverance"],
  },
  {
    _id: "song_4", id: 4,
    title: "Ennai Nadathi Vanthathum (என்னை நடத்தி வந்ததும்)",
    language: "Tamil", theme: "Gratitude & Testimony", key: "C Major", tempo: "74 BPM • Medium Praise",
    author: "Christ's Tabernacle Choir", uploadDate: "Aug 2026", views: "67K views", duration: "05:30",
    youtubeUrl: "",
    pptUrl: "",
    lyrics:
`[பல்லவி - Chorus]
என்னை நடத்தி வந்ததும்
உங்க கிருபைதான்
என்னை காத்து வந்ததும்
உங்க கிருபைதான்

அந்த கிருபை என்னை விட்டகலாது
ஒரு நாளும் என்னை கைவிடாது

[சரணம் 1 - Verse 1]
கல்வாரி சிலுவையிலே
என்னை மீட்டு வந்ததும்
தேவனே உம் கிருபை
என்றும் மாறாதே`,
    englishLyrics:
`[Chorus]
Leading me through every path
It was only Your boundless grace
Protecting me day and night
It was only Your holy grace

That grace shall never depart from me
Never will it forsake my soul

[Verse 1]
Upon the Cross of Calvary
Redeeming my unworthy soul
O Lord, Your unfailing grace
Endures for evermore`,
    chords:
`[Key: C Major]
C        Am       F        G
என்னை நடத்தி வந்ததும்
C        Am       F        G
உங்க கிருபைதான்`,
    tags: ["Grace", "Testimony", "Tamil"],
  },
];

/* ═══════════════════════════════════════════════════════════════
   PRINT FUNCTION
═══════════════════════════════════════════════════════════════ */
function handlePrintSong(song) {
  const w = window.open("", "_blank");
  w.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${song.title} — Christ's Tabernacle Worship</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Noto+Sans+Tamil:wght@400;700&display=swap');
          body { font-family: 'Noto Sans Tamil', 'Inter', -apple-system, sans-serif; padding: 40px; color: #112218; max-width: 720px; margin: 0 auto; line-height: 1.8; }
          .church-header { border-bottom: 2px solid #184332; padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
          .church-header h2 { font-family: 'Playfair Display', serif; color: #184332; margin: 0 0 4px; font-size: 1.4rem; letter-spacing: 1px; }
          .church-header p { margin: 0; color: #A88A42; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; }
          .song-title { font-size: 1.5rem; font-weight: 800; color: #184332; margin-bottom: 6px; }
          .song-meta { font-size: 0.85rem; color: #4A6355; margin-bottom: 28px; padding: 8px 14px; background: #FAF6EE; border-radius: 8px; display: flex; gap: 16px; }
          .section-title { font-size: 0.82rem; font-weight: 800; color: #A88A42; text-transform: uppercase; letter-spacing: 1.5px; margin: 24px 0 10px; border-bottom: 1px dashed #EDE5D8; padding-bottom: 4px; }
          .lyrics-block { white-space: pre-wrap; font-size: 1.05rem; line-height: 2.1; color: #184332; margin-bottom: 24px; }
          .chords-block { font-family: monospace; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.8; color: #6D28D9; background: #F5F3FF; padding: 14px; border-radius: 8px; }
          .footer { margin-top: 50px; padding-top: 16px; border-top: 1px solid #EDE5D8; text-align: center; font-size: 0.78rem; color: #7A9288; }
        </style>
      </head>
      <body>
        <div class="church-header">
          <h2>CHRIST'S TABERNACLE</h2>
          <p>† Prayer &amp; Worship Centre — Sacred Repertoire †</p>
        </div>
        <div class="song-title">${song.title}</div>
        <div class="song-meta">
          <span><strong>Author:</strong> ${song.author || "Christ's Tabernacle"}</span>
          <span><strong>Key:</strong> ${song.key || "Standard"}</span>
          <span><strong>Tempo:</strong> ${song.tempo || "Worship"}</span>
          <span><strong>Language:</strong> ${song.language || "Tamil"}</span>
        </div>

        <div class="section-title">Tamil Lyrics (தமிழ் வரிகள்)</div>
        <div class="lyrics-block">${(song.lyrics || "").replace(/\n/g, "<br>")}</div>

        ${song.englishLyrics ? `
          <div class="section-title">English Lyrics / Translation</div>
          <div class="lyrics-block">${song.englishLyrics.replace(/\n/g, "<br>")}</div>
        ` : ""}

        ${song.chords ? `
          <div class="section-title">Musical Chords &amp; Arrangement</div>
          <div class="chords-block">${song.chords.replace(/\n/g, "<br>")}</div>
        ` : ""}

        <div class="footer">
          "Sing to the LORD a new song; sing to the LORD, all the earth." — Psalm 96:1<br>
          Christ's Tabernacle Sacred Hymnal • christstabernacle.org
        </div>
      </body>
    </html>
  `);
  w.document.close();
  setTimeout(() => w.print(), 350);
}

/* ═══════════════════════════════════════════════════════════════
   PRESENTER FULLSCREEN MODE (Church Sanctuary Projector)
═══════════════════════════════════════════════════════════════ */
function SanctuaryPresenterModal({ song, onClose }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [lang, setLang] = useState("tamil");
  const [isBlackout, setIsBlackout] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

  const activeText = lang === "tamil" ? (song.lyrics || song.englishLyrics) : (song.englishLyrics || song.lyrics);
  const rawSlides = activeText ? activeText.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean) : [];

  const goNext = useCallback(() => setSlideIdx(i => Math.min(i + 1, rawSlides.length - 1)), [rawSlides.length]);
  const goPrev = useCallback(() => setSlideIdx(i => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "b" || e.key === "B") {
        setIsBlackout(v => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  const currentSlide = rawSlides[slideIdx] || "";
  const lines = currentSlide.split("\n").map(l => l.trim()).filter(Boolean);
  const isTaggedHeader = lines[0] && /^\[.*?\]$/.test(lines[0]);
  const slideTag = isTaggedHeader ? lines[0].replace(/\[|\]/g, "") : null;
  const slideLines = isTaggedHeader ? lines.slice(1) : lines;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: isBlackout ? "#000000" : "radial-gradient(ellipse at center, #133929 0%, #0C2219 55%, #05100B 100%)",
      display: "flex", flexDirection: "column",
      color: "#FAF6EE", transition: "background 0.3s ease",
      userSelect: "none"
    }}>
      {/* Projection Top Toolbar */}
      <div style={{
        padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(12, 34, 25, 0.75)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(214, 182, 107, 0.2)"
      }}>
        {/* Left: Language & Blackout Controls */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => setLang("tamil")}
            style={{
              padding: "6px 16px", borderRadius: 20, border: "none",
              background: lang === "tamil" ? "#D6B66B" : "rgba(255,255,255,0.12)",
              color: lang === "tamil" ? "#0C2219" : "#FAF6EE",
              fontWeight: 800, fontSize: "0.82rem", cursor: "pointer"
            }}
          >
            தமிழ் Tamil
          </button>
          {song.englishLyrics && (
            <button
              onClick={() => setLang("english")}
              style={{
                padding: "6px 16px", borderRadius: 20, border: "none",
                background: lang === "english" ? "#D6B66B" : "rgba(255,255,255,0.12)",
                color: lang === "english" ? "#0C2219" : "#FAF6EE",
                fontWeight: 800, fontSize: "0.82rem", cursor: "pointer"
              }}
            >
              English
            </button>
          )}
          <button
            onClick={() => setIsBlackout(v => !v)}
            title="Press 'B' key to blackout projector screen for prayer"
            style={{
              padding: "6px 14px", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.25)",
              background: isBlackout ? "#EF4444" : "rgba(0,0,0,0.4)",
              color: "#fff", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer"
            }}
          >
            {isBlackout ? "Un-Blackout (B)" : "Blackout (B)"}
          </button>
        </div>

        {/* Center: Slide indicator */}
        <div style={{ color: "#D6B66B", fontSize: "0.9rem", fontWeight: 700, letterSpacing: 1 }}>
          ✝ {song.title} &nbsp;•&nbsp; Slide {slideIdx + 1} of {rawSlides.length}
        </div>

        {/* Right: Font Controls & Close */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: "3px 8px" }}>
            <button onClick={() => setFontSizeMultiplier(m => Math.max(0.8, m - 0.1))} style={{ background: "none", border: "none", color: "#FAF6EE", cursor: "pointer" }}><FaMinus size={11} /></button>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#D6B66B", minWidth: 32, textAlign: "center" }}>{Math.round(fontSizeMultiplier * 100)}%</span>
            <button onClick={() => setFontSizeMultiplier(m => Math.min(1.4, m + 0.1))} style={{ background: "none", border: "none", color: "#FAF6EE", cursor: "pointer" }}><FaPlus size={11} /></button>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(239, 68, 68, 0.8)", border: "none", color: "#fff",
              width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {/* Slide Body */}
      {!isBlackout && (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "60px 80px", textAlign: "center", position: "relative"
        }}>
          {/* Subtle Church Watermark */}
          <div style={{ fontSize: "2rem", color: "rgba(214, 182, 107, 0.28)", marginBottom: 16 }}>✝</div>

          {slideTag && (
            <div style={{
              display: "inline-block", padding: "5px 22px", borderRadius: 30,
              background: "rgba(214, 182, 107, 0.15)", border: "1px solid rgba(214, 182, 107, 0.4)",
              color: "#E8CC8F", fontSize: `clamp(0.85rem, 1.6vw, 1.15rem)`,
              fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, marginBottom: 30
            }}>
              — {slideTag} —
            </div>
          )}

          <div style={{ maxWidth: 1100 }}>
            {slideLines.map((line, idx) => (
              <div
                key={idx}
                style={{
                  fontSize: `clamp(2rem, ${4.2 * fontSizeMultiplier}vw, 4.4rem)`,
                  fontWeight: 700,
                  lineHeight: 1.55,
                  color: "#FAF6EE",
                  textShadow: "0 4px 24px rgba(0,0,0,0.7)",
                  marginBottom: 10,
                  fontFamily: "'Noto Sans Tamil', 'Inter', sans-serif"
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Bottom Church Footer Tag */}
          <div style={{
            position: "absolute", bottom: 44, color: "rgba(214, 182, 107, 0.5)",
            fontSize: "0.85rem", letterSpacing: 2, textTransform: "uppercase"
          }}>
            ✝ Christ's Tabernacle — Sanctuary Worship ✝
          </div>
        </div>
      )}

      {/* Bottom Slide Controller Navigation */}
      <div style={{
        padding: "16px 28px", display: "flex", justifyContent: "center", alignItems: "center", gap: 20,
        background: "rgba(12, 34, 25, 0.75)", borderTop: "1px solid rgba(214, 182, 107, 0.2)"
      }}>
        <button
          onClick={goPrev} disabled={slideIdx === 0}
          style={{
            padding: "10px 24px", borderRadius: 10,
            background: slideIdx === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.18)",
            color: "#FAF6EE", border: "1px solid rgba(255,255,255,0.25)",
            fontWeight: 800, fontSize: "0.88rem", cursor: slideIdx === 0 ? "not-allowed" : "pointer"
          }}
        >
          ← Prev Slide
        </button>

        {/* Slide Dots / Scrubber */}
        <div style={{ display: "flex", gap: 6 }}>
          {rawSlides.map((_, i) => (
            <div
              key={i}
              onClick={() => setSlideIdx(i)}
              style={{
                width: i === slideIdx ? 26 : 8, height: 8, borderRadius: 4,
                background: i === slideIdx ? "#D6B66B" : "rgba(255,255,255,0.25)",
                cursor: "pointer", transition: "all 0.2s"
              }}
            />
          ))}
        </div>

        <button
          onClick={goNext} disabled={slideIdx === rawSlides.length - 1}
          style={{
            padding: "10px 24px", borderRadius: 10,
            background: slideIdx === rawSlides.length - 1 ? "rgba(255,255,255,0.06)" : "#184332",
            color: "#D6B66B", border: "1px solid #D6B66B",
            fontWeight: 800, fontSize: "0.88rem", cursor: slideIdx === rawSlides.length - 1 ? "not-allowed" : "pointer"
          }}
        >
          Next Slide →
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PPT VISUAL FRONT COVER MOCKUP COMPONENT
═══════════════════════════════════════════════════════════════ */
function PPTDeckPreview({ song, onPresenterClick, onDownloadClick }) {
  const lyricsPreview = (song.lyrics || song.englishLyrics || "")
    .replace(/\[.*?\]/g, "")
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div style={{
      background: "linear-gradient(145deg, #0C2219 0%, #184332 60%, #122D24 100%)",
      borderRadius: 16,
      border: "1.5px solid rgba(214, 182, 107, 0.35)",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(12, 34, 25, 0.25)",
      position: "relative"
    }}>
      {/* 16:9 Slide Screen Ratio */}
      <div style={{
        aspectRatio: "16 / 9",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        background: "radial-gradient(circle at 50% 20%, rgba(214,182,107,0.12) 0%, rgba(12,34,25,0.95) 75%)"
      }}>
        {/* Slide Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#D6B66B", fontSize: "0.72rem", fontWeight: 800, letterSpacing: 1.5 }}>
            <FaFilePowerpoint size={14} color="#F59E0B" />
            <span>CHURCH SLIDE DECK (16:9)</span>
          </div>
          <span style={{
            background: "rgba(214, 182, 107, 0.2)", color: "#E8CC8F",
            fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: 12,
            border: "1px solid rgba(214, 182, 107, 0.3)"
          }}>
            READY FOR PROJECTION
          </span>
        </div>

        {/* Slide Center Worship Preview */}
        <div style={{ textAlign: "center", margin: "auto 0" }}>
          <div style={{ fontSize: "1.1rem", color: "#D6B66B", marginBottom: 4 }}>✝</div>
          <div style={{
            fontSize: "1.05rem", fontWeight: 800, color: "#FAF6EE",
            lineHeight: 1.3, marginBottom: 8, fontFamily: "'Playfair Display', serif"
          }}>
            {song.title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {lyricsPreview.map((line, i) => (
              <div key={i} style={{ fontSize: "0.75rem", color: "rgba(250, 246, 238, 0.8)", fontStyle: "italic" }}>
                "{line}"
              </div>
            ))}
          </div>
        </div>

        {/* Slide Bottom Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(214, 182, 107, 0.2)", paddingTop: 8 }}>
          <span style={{ fontSize: "0.68rem", color: "#A88A42", letterSpacing: 1 }}>CHRIST'S TABERNACLE</span>
          <span style={{ fontSize: "0.68rem", color: "#E8CC8F" }}>{song.language} Repertoire</span>
        </div>
      </div>

      {/* Action Footer Beneath Slide */}
      <div style={{
        padding: "14px 18px", background: "rgba(12, 34, 25, 0.9)",
        borderTop: "1px solid rgba(214, 182, 107, 0.25)",
        display: "flex", gap: 10
      }}>
        <button
          onClick={onPresenterClick}
          style={{
            flex: 1, padding: "9px 12px", borderRadius: 8, border: "none",
            background: "linear-gradient(135deg, #D6B66B 0%, #A88A42 100%)",
            color: "#0C2219", fontWeight: 800, fontSize: "0.82rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            cursor: "pointer", boxShadow: "0 2px 10px rgba(214, 182, 107, 0.3)"
          }}
        >
          <FaDesktop size={12} /> Presenter View
        </button>

        {song.pptUrl ? (
          <button
            onClick={onDownloadClick}
            style={{
              flex: 1, padding: "9px 12px", borderRadius: 8,
              background: "rgba(255,255,255,0.08)", border: "1px solid #D6B66B",
              color: "#FAF6EE", fontWeight: 700, fontSize: "0.82rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              cursor: "pointer"
            }}
          >
            <FaDownload size={11} color="#D6B66B" /> Download PPT
          </button>
        ) : (
          <div style={{
            flex: 1, padding: "9px 8px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.2)",
            color: "#7A9288", fontSize: "0.78rem", fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4
          }}>
            No PPT File
          </div>
        )}
      </div>
    </div>
  );
}



/* ═══════════════════════════════════════════════════════════════
   OVERALL SINGLE BOX LYRICS RENDERER (NO PALLAVI / SARANAM TAGS)
═══════════════════════════════════════════════════════════════ */
function StanzaLyricsView({ lyricsText, fontSizeMultiplier = 1, title, onCopy }) {
  const [copied, setCopied] = useState(false);

  if (!lyricsText) {
    return (
      <div style={{
        textAlign: "center", padding: "50px 24px", color: "#7A9288",
        background: "#FFFFFF", borderRadius: 16, border: "1.5px dashed #EDE5D8"
      }}>
        No lyrics entered for this section yet.
      </div>
    );
  }

  // Filter out any Pallavi, Saranam, Chorus, Verse bracketed or section header markers
  const cleanLines = lyricsText
    .split("\n")
    .filter(line => {
      const trimmed = line.trim();
      if (!trimmed) return true; // keep blank line for stanza separation
      // Strip bracketed headers like [பல்லவி], [பல்லவி - Chorus], [சரணம் 1], [Chorus], [Verse 1]
      if (/^\[.*?\]$/.test(trimmed)) return false;
      // Strip unbracketed labels like பல்லவி:, சரணம் 1:, Chorus:, Verse 1:
      if (/^(பல்லவி|சரணம்\s*\d*|chorus|verse\s*\d*|bridge|intro|outro)[:\s-]*$/i.test(trimmed)) return false;
      return true;
    });

  // Re-join and split by paragraphs (consecutive blank lines)
  const fullCleanText = cleanLines.join("\n").trim();
  const paragraphs = fullCleanText
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(para => para.split("\n").map(l => l.trim()).filter(Boolean));

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCleanText);
    setCopied(true);
    if (onCopy) onCopy(fullCleanText);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1.5px solid #EDE5D8",
        borderRadius: 18,
        padding: "32px 38px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        position: "relative"
      }}
    >
      {/* Box Header Toolbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 16,
        marginBottom: 24,
        borderBottom: "1.5px solid #F0E8DC"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#D6B66B", fontSize: "1.2rem", fontWeight: 700 }}>✝</span>
          <span style={{
            fontSize: "0.88rem",
            fontWeight: 800,
            color: "#184332",
            letterSpacing: 1.2,
            textTransform: "uppercase"
          }}>
            {title || "Sanctuary Worship Lyrics"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: copied ? "#16A34A" : "#FAF6EE",
            border: `1.5px solid ${copied ? "#16A34A" : "#EDE5D8"}`,
            color: copied ? "#FFFFFF" : "#184332",
            padding: "7px 16px",
            borderRadius: 8,
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s ease",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
          }}
        >
          {copied ? <><FaCheck size={11} /> Copied to Clipboard!</> : <><FaCopy size={11} color="#A88A42" /> Copy Full Lyrics</>}
        </button>
      </div>

      {/* Continuous Lyrics inside the single unified box */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {paragraphs.map((paraLines, pIdx) => (
          <div
            key={pIdx}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}
          >
            {paraLines.map((line, lIdx) => (
              <div
                key={lIdx}
                style={{
                  fontSize: `${1.1 * fontSizeMultiplier}rem`,
                  fontWeight: 600,
                  lineHeight: 1.9,
                  color: "#184332",
                  fontFamily: "'Noto Sans Tamil', 'Inter', -apple-system, sans-serif"
                }}
              >
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Box Footer Note */}
      <div style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px dashed #EDE5D8",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        fontSize: "0.78rem",
        color: "#7A9288"
      }}>
        <span style={{ color: "#A88A42", fontWeight: 700 }}>
          ✝ Christ's Tabernacle — Sacred Hymnal
        </span>
        <span>
          "Let everything that has breath praise the LORD." — Psalm 150:6
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SONG DETAIL VIEW COMPONENT
═══════════════════════════════════════════════════════════════ */
function SongDetailView({ song, songs, onBack, onSelectSong }) {
  const [activeTab, setActiveTab] = useState("tamil"); // "tamil" | "english" | "dual"
  const [showPresenter, setShowPresenter] = useState(false);
  const [showChords, setShowChords] = useState(false);
  const [chordsSemitones, setChordsSemitones] = useState(0);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2400);
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/songs/lyrics/${song._id || song.id}`
      : "";

    const shareData = {
      title: `${song.title} — Christ's Tabernacle Worship`,
      text: `🎶 Worship with "${song.title}" at Christ's Tabernacle Prayer & Worship Centre\n${shareUrl}`,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User closed or dismissed share sheet
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast("Direct song link copied to clipboard!");
    }
  };

  const handleCopyAll = () => {
    const text = activeTab === "tamil" ? song.lyrics : (song.englishLyrics || song.lyrics);
    if (text) {
      navigator.clipboard.writeText(text);
      showToast("Full lyrics copied to clipboard!");
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
      showToast("No PowerPoint file attached to this song yet.");
    }
  };

  const embedUrl = getYouTubeEmbedUrl(song.youtubeUrl);
  const watchUrl = getYouTubeWatchUrl(song.youtubeUrl);

  // Filter other recommended songs in setlist
  const relatedSongs = songs
    .filter(s => (s._id || s.id) !== (song._id || song.id))
    .slice(0, 4);

  return (
    <div style={{ maxWidth: 1380, margin: "0 auto" }}>
      {showPresenter && (
        <SanctuaryPresenterModal song={song} onClose={() => setShowPresenter(false)} />
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: "fixed", bottom: 30, right: 30, zIndex: 9999,
          background: "#184332", color: "#D6B66B", padding: "12px 24px",
          borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          fontWeight: 800, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 10,
          border: "1px solid #D6B66B"
        }}>
          <FaCheck color="#D6B66B" /> {toastMsg}
        </div>
      )}

      {/* Top Breadcrumb Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "9px 20px", borderRadius: 30,
            background: "#FFFFFF", border: "1.5px solid #EDE5D8",
            color: "#184332", fontWeight: 800, fontSize: "0.85rem",
            cursor: "pointer", transition: "all 0.15s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#D6B66B"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE5D8"}
        >
          <FaChevronLeft size={11} color="#A88A42" />
          <span>Back to Worship Repertoire</span>
        </button>

        <div style={{ fontSize: "0.84rem", color: "#7A9288" }}>
          <span style={{ cursor: "pointer", color: "#184332", fontWeight: 700 }} onClick={onBack}>Songs</span>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "#A88A42", fontWeight: 700 }}>Lyrics</span>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "#4A6355" }}>{song.title}</span>
        </div>
      </div>

      {/* Distinctive Sanctuary Songsheet Header (NO Hero Banner Section) */}
      <div style={{
        marginBottom: 28,
        padding: "4px 0 24px",
        borderBottom: "1.5px solid #EDE5D8",
        position: "relative"
      }}>
        {/* Eyebrow Pill Row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
          <span style={{
            background: "#FAF6EE",
            color: "#A88A42",
            border: "1.5px solid #EDE5D8",
            fontSize: "0.74rem",
            fontWeight: 800,
            padding: "4px 14px",
            borderRadius: 20,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 6
          }}>
            <span style={{ color: "#D6B66B" }}>†</span> {song.language || "Tamil"} Worship Hymn
          </span>

          {song.theme && (
            <span style={{
              background: "#EAF2EE",
              color: "#184332",
              border: "1px solid #D1E2D8",
              fontSize: "0.76rem",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 20
            }}>
              • {song.theme}
            </span>
          )}

          {song.key && (
            <span style={{
              background: "#FAF5FF",
              border: "1px solid #DDD6FE",
              color: "#6D28D9",
              fontSize: "0.76rem",
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 5
            }}>
              🎵 Key: <strong>{song.key}</strong>
            </span>
          )}

          {song.tempo && (
            <span style={{ fontSize: "0.8rem", color: "#7A9288", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
              ⏱ {song.tempo}
            </span>
          )}

          {song.duration && (
            <span style={{ fontSize: "0.8rem", color: "#7A9288", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
              ⌛ {song.duration}
            </span>
          )}

          {song.views != null && (
            <span style={{ fontSize: "0.8rem", color: "#7A9288", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
              👁 {song.views} views
            </span>
          )}
        </div>

        {/* Title & Author */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{
            fontSize: "clamp(2rem, 3.8vw, 2.85rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 0 10px",
            color: "#0C2219",
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: "-0.015em"
          }}>
            {song.title}
          </h1>
          {song.author && (
            <div style={{
              fontSize: "0.96rem",
              color: "#4A6355",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Cinzel', Georgia, serif"
            }}>
              <span style={{ color: "#D6B66B", fontSize: "1.1rem" }}>✍</span>
              <span>Composed &amp; Written by <strong style={{ color: "#184332" }}>{song.author}</strong></span>
            </div>
          )}
        </div>

        {/* ═══ UNIQUE SANCTUARY ACTION DOCK ═══ */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          background: "#FFFFFF",
          padding: "12px 18px",
          borderRadius: 14,
          border: "1.5px solid #EDE5D8",
          boxShadow: "0 4px 18px rgba(12, 34, 25, 0.04)"
        }}>
          {/* Presenter Mode */}
          <button
            onClick={() => setShowPresenter(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 22px", borderRadius: 8, border: "none",
              background: "linear-gradient(135deg, #D6B66B 0%, #A88A42 100%)",
              color: "#0C2219", fontWeight: 800, fontSize: "0.86rem",
              cursor: "pointer", boxShadow: "0 3px 12px rgba(214, 182, 107, 0.35)",
              transition: "transform 0.15s"
            }}
          >
            <FaDesktop size={13} /> Sanctuary Presenter
          </button>

          {/* Download PPT Deck */}
          {song.pptUrl ? (
            <button
              onClick={handleDownloadPPT}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 20px", borderRadius: 8,
                background: "#FEF3C7", border: "1.5px solid #F59E0B",
                color: "#B45309", fontWeight: 800, fontSize: "0.86rem",
                cursor: "pointer", transition: "all 0.15s"
              }}
            >
              <FaFilePowerpoint size={14} color="#D97706" /> Download PPT Deck
            </button>
          ) : (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 16px", borderRadius: 8,
              background: "#F9FAFB", border: "1px dashed #D1D5DB",
              color: "#9CA3AF", fontWeight: 600, fontSize: "0.82rem"
            }}>
              <FaFilePowerpoint size={12} /> No PPT Attached
            </span>
          )}

          {/* Musical Chords Toggle */}
          {song.chords && (
            <button
              onClick={() => setShowChords(v => !v)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 20px", borderRadius: 8,
                background: showChords ? "#7C3AED" : "#F5F3FF",
                border: "1.5px solid #8B5CF6",
                color: showChords ? "#FFFFFF" : "#6D28D9",
                fontWeight: 800, fontSize: "0.86rem",
                cursor: "pointer", transition: "all 0.15s"
              }}
            >
              <FaGuitar size={13} /> Chords {showChords ? "Active" : "View"}
            </button>
          )}

          {/* Print Sheet */}
          <button
            onClick={() => handlePrintSong(song)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 8,
              background: "#FFFFFF", border: "1.5px solid #EDE5D8",
              color: "#184332", fontWeight: 700, fontSize: "0.86rem",
              cursor: "pointer", transition: "all 0.15s"
            }}
          >
            <FaPrint size={13} color="#A88A42" /> Print Sheet
          </button>

          {/* YouTube Video */}
          {watchUrl && (
            <a
              href={watchUrl} target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "10px 20px", borderRadius: 8,
                background: "#DC2626", border: "none",
                color: "#FFFFFF", fontWeight: 800, fontSize: "0.86rem",
                textDecoration: "none", boxShadow: "0 3px 10px rgba(220, 38, 38, 0.25)",
                cursor: "pointer"
              }}
            >
              <FaYoutube size={14} /> Watch on YouTube
            </a>
          )}

          {/* Direct Device Native Share */}
          <button
            onClick={handleShare}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 20px", borderRadius: 8,
              background: "#184332", border: "none",
              color: "#FAF6EE", fontWeight: 800, fontSize: "0.86rem",
              cursor: "pointer", transition: "all 0.15s",
              boxShadow: "0 3px 10px rgba(24, 67, 50, 0.2)"
            }}
          >
            <FaShareAlt size={13} color="#D6B66B" /> Share
          </button>
        </div>
      </div>

      {/* Transposed Chords Box (When Active) */}
      {showChords && song.chords && (
        <div style={{
          background: "#FAF5FF", border: "2px solid #C4B5FD",
          borderRadius: 16, padding: "24px 28px", marginBottom: 28,
          boxShadow: "0 8px 24px rgba(109, 40, 217, 0.08)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: "#7C3AED", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaGuitar size={16} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#5B21B6" }}>
                  Musical Chords &amp; Score
                </h3>
                <div style={{ fontSize: "0.78rem", color: "#7C3AED" }}>
                  Original Key: <strong>{song.key || "Standard"}</strong> {chordsSemitones !== 0 && `(Transposed: ${chordsSemitones > 0 ? `+${chordsSemitones}` : chordsSemitones})`}
                </div>
              </div>
            </div>

            {/* Transpose Controls */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6D28D9" }}>Transpose:</span>
              <button
                onClick={() => setChordsSemitones(s => s - 1)}
                style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #C4B5FD", background: "#fff", color: "#5B21B6", fontWeight: 800, cursor: "pointer" }}
              >
                -1
              </button>
              <button
                onClick={() => setChordsSemitones(0)}
                style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #C4B5FD", background: chordsSemitones === 0 ? "#7C3AED" : "#fff", color: chordsSemitones === 0 ? "#fff" : "#5B21B6", fontWeight: 800, cursor: "pointer" }}
              >
                Reset
              </button>
              <button
                onClick={() => setChordsSemitones(s => s + 1)}
                style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #C4B5FD", background: "#fff", color: "#5B21B6", fontWeight: 800, cursor: "pointer" }}
              >
                +1
              </button>
              <button
                onClick={() => setShowChords(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", marginLeft: 8 }}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <pre style={{
            margin: 0, fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: "0.95rem", lineHeight: 1.9, color: "#4C1D95",
            whiteSpace: "pre-wrap", background: "#FFFFFF", padding: "18px 22px",
            borderRadius: 12, border: "1px solid #DDD6FE"
          }}>
            {transposeChordsText(song.chords, chordsSemitones)}
          </pre>
        </div>
      )}

      {/* Main Grid: Left Lyrics Area & Right Sanctuary Sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>

        {/* ════ LEFT COLUMN: LYRICS ════ */}
        <div>
          {/* Lyrics Bar Controls */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "#FFFFFF", padding: "12px 20px", borderRadius: 16,
            border: "1.5px solid #EDE5D8", marginBottom: 20, flexWrap: "wrap", gap: 12
          }}>
            {/* Language Tabs */}
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setActiveTab("tamil")}
                style={{
                  padding: "8px 18px", borderRadius: 20, border: "none",
                  background: activeTab === "tamil" ? "#184332" : "#FAF6EE",
                  color: activeTab === "tamil" ? "#FAF6EE" : "#4A6355",
                  fontWeight: 800, fontSize: "0.85rem", cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                தமிழ் Tamil Lyrics
              </button>

              {song.englishLyrics && (
                <button
                  onClick={() => setActiveTab("english")}
                  style={{
                    padding: "8px 18px", borderRadius: 20, border: "none",
                    background: activeTab === "english" ? "#184332" : "#FAF6EE",
                    color: activeTab === "english" ? "#FAF6EE" : "#4A6355",
                    fontWeight: 800, fontSize: "0.85rem", cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  English Lyrics
                </button>
              )}

              {song.englishLyrics && (
                <button
                  onClick={() => setActiveTab("dual")}
                  style={{
                    padding: "8px 16px", borderRadius: 20, border: "none",
                    background: activeTab === "dual" ? "#184332" : "#FAF6EE",
                    color: activeTab === "dual" ? "#FAF6EE" : "#4A6355",
                    fontWeight: 800, fontSize: "0.85rem", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.15s"
                  }}
                >
                  <FaColumns size={12} /> Bilingual Side-by-Side
                </button>
              )}
            </div>

            {/* Font Resizer & Copy All */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#FAF6EE", padding: "4px 10px", borderRadius: 14 }}>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#7A9288" }}>Font:</span>
                <button onClick={() => setFontSizeMultiplier(m => Math.max(0.85, m - 0.1))} style={{ background: "none", border: "none", color: "#184332", cursor: "pointer", fontWeight: 800 }}><FaMinus size={10} /></button>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#184332", minWidth: 28, textAlign: "center" }}>{Math.round(fontSizeMultiplier * 100)}%</span>
                <button onClick={() => setFontSizeMultiplier(m => Math.min(1.35, m + 0.1))} style={{ background: "none", border: "none", color: "#184332", cursor: "pointer", fontWeight: 800 }}><FaPlus size={10} /></button>
              </div>

              <button
                onClick={handleCopyAll}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 10,
                  background: "#FAF6EE", border: "1px solid #EDE5D8",
                  color: "#184332", fontWeight: 700, fontSize: "0.82rem",
                  cursor: "pointer"
                }}
              >
                <FaCopy size={12} color="#A88A42" /> Copy Full Lyrics
              </button>
            </div>
          </div>

          {/* Active Lyrics Container */}
          {activeTab === "dual" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <StanzaLyricsView
                lyricsText={song.lyrics}
                fontSizeMultiplier={fontSizeMultiplier}
                title="தமிழ் வரிகள் (Tamil Lyrics)"
                onCopy={() => showToast("Tamil lyrics copied to clipboard")}
              />
              <StanzaLyricsView
                lyricsText={song.englishLyrics}
                fontSizeMultiplier={fontSizeMultiplier}
                title="English Lyrics / Translation"
                onCopy={() => showToast("English lyrics copied to clipboard")}
              />
            </div>
          ) : (
            <StanzaLyricsView
              lyricsText={activeTab === "tamil" ? song.lyrics : song.englishLyrics}
              fontSizeMultiplier={fontSizeMultiplier}
              title={activeTab === "tamil" ? "தமிழ் வரிகள் (Tamil Lyrics)" : "English Lyrics"}
              onCopy={() => showToast("Lyrics copied to clipboard")}
            />
          )}

          {/* Tags Section */}
          {song.tags && song.tags.length > 0 && (
            <div style={{
              marginTop: 28, padding: "18px 24px", background: "#FFFFFF",
              borderRadius: 16, border: "1px solid #EDE5D8",
              display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center"
            }}>
              <FaTag size={13} color="#A88A42" />
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#184332", marginRight: 6 }}>Repertoire Tags:</span>
              {song.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    background: "#FAF6EE", color: "#184332",
                    fontSize: "0.78rem", fontWeight: 700, padding: "3px 12px",
                    borderRadius: 20, border: "1px solid #EDE5D8"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Submission / Correction Note */}
          <div style={{
            marginTop: 20, background: "#FAF6EE", borderRadius: 14,
            padding: "18px 22px", border: "1.5px solid #EDE5D8",
            display: "flex", alignItems: "center", gap: 16
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#EAF2EE", color: "#184332", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <FaExclamationCircle size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: "#184332", fontSize: "0.9rem" }}>Notice a typo or missing musical chord?</div>
              <div style={{ fontSize: "0.8rem", color: "#4A6355" }}>Help the Tabernacle Worship Team maintain sacred accuracy in the church hymnal.</div>
            </div>
            <a
              href="mailto:contact@christstabernacle.org?subject=Correction%20for%20Song"
              style={{
                padding: "8px 16px", borderRadius: 8, background: "#184332",
                color: "#FAF6EE", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none"
              }}
            >
              Report Typo
            </a>
          </div>
        </div>

        {/* ════ RIGHT SIDEBAR: MEDIA & METADATA ════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* PPT Front Page Mockup Deck */}
          <div>
            <div style={{
              fontSize: "0.78rem", fontWeight: 800, color: "#184332",
              textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10
            }}>
              📊 Sanctuary Slide Deck
            </div>
            <PPTDeckPreview
              song={song}
              onPresenterClick={() => setShowPresenter(true)}
              onDownloadClick={handleDownloadPPT}
            />
          </div>

          {/* YouTube Video Player Embed */}
          {embedUrl && (
            <div style={{
              background: "#FFFFFF", borderRadius: 16, overflow: "hidden",
              border: "1.5px solid #EDE5D8", boxShadow: "0 6px 20px rgba(0,0,0,0.04)"
            }}>
              <div style={{
                background: "#0C2219", padding: "8px 16px", display: "flex",
                alignItems: "center", gap: 8, color: "#FAF6EE"
              }}>
                <FaYoutube color="#EF4444" size={18} />
                <span style={{ fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Official Worship Video
                </span>
              </div>
              <iframe
                src={embedUrl}
                title={song.title}
                width="100%"
                height="200"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ display: "block" }}
              />
            </div>
          )}

          {/* Song Technical Info Card */}
          <div style={{
            background: "#FFFFFF", borderRadius: 16, padding: "20px 22px",
            border: "1.5px solid #EDE5D8", boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
          }}>
            <div style={{
              fontSize: "0.78rem", fontWeight: 800, color: "#A88A42",
              textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14,
              borderBottom: "1px solid #FAF6EE", paddingBottom: 8
            }}>
              Hymn Details &amp; Arrangement
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Original Key", value: song.key },
                { label: "Tempo / Meter", value: song.tempo },
                { label: "Author / Choir", value: song.author },
                { label: "Theme Category", value: song.theme },
                { label: "Language", value: song.language },
                { label: "PowerPoint Deck", value: song.pptUrl ? "Available ✓" : "Pending" },
                { label: "Chords Sheet", value: song.chords ? "Included ✓" : "Pending" },
              ].filter(item => item.value).map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.84rem", paddingBottom: 6, borderBottom: "1px solid #FAF6EE" }}>
                  <span style={{ color: "#7A9288", fontWeight: 600 }}>{item.label}</span>
                  <span style={{ color: item.value.includes("✓") ? "#16A34A" : "#184332", fontWeight: 700 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Worship Setlist Recommendations */}
          <div style={{
            background: "#FAF6EE", borderRadius: 16, padding: "20px 22px",
            border: "1.5px solid #EDE5D8"
          }}>
            <div style={{
              fontSize: "0.78rem", fontWeight: 800, color: "#184332",
              textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14
            }}>
              Suggested For Worship Set
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {relatedSongs.map(rel => {
                const thumb = getYouTubeThumbnail(rel.youtubeUrl);
                return (
                  <div
                    key={rel._id || rel.id}
                    onClick={() => onSelectSong(rel)}
                    style={{
                      display: "flex", gap: 12, alignItems: "center", cursor: "pointer",
                      padding: "8px 10px", borderRadius: 10, background: "#FFFFFF",
                      border: "1px solid #EDE5D8", transition: "all 0.15s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#D6B66B"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#EDE5D8"}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 8, overflow: "hidden",
                      background: "#0C2219", flexShrink: 0, display: "flex",
                      alignItems: "center", justifyContent: "center"
                    }}>
                      {thumb ? (
                        <img src={thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <FaMusic size={16} color="#D6B66B" />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: "0.85rem", fontWeight: 700, color: "#184332",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                      }}>
                        {rel.title}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#A88A42", fontWeight: 600 }}>
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
   MAIN PUBLIC EXPORT: LYRICS COMPONENT
   Routes: /songs/lyrics & /songs/lyrics/:id
═══════════════════════════════════════════════════════════════ */
export default function Lyrics() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [pptFilterOnly, setPptFilterOnly] = useState(false);
  const [chordsFilterOnly, setChordsFilterOnly] = useState(false);

  // Native device share handler
  const handleShareSong = async (songToShare) => {
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/songs/lyrics/${songToShare._id || songToShare.id}`
      : "";

    const shareData = {
      title: `${songToShare.title} — Christ's Tabernacle Worship`,
      text: `🎶 Worship with "${songToShare.title}" at Christ's Tabernacle Prayer & Worship Centre\n${shareUrl}`,
      url: shareUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User closed native share
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert("Song link copied to clipboard!");
    }
  };

  // Load all songs once
  useEffect(() => {
    getPublicSongs()
      .then(data => {
        setSongs(data && data.length > 0 ? data : DEFAULT_SONGS);
      })
      .catch(() => {
        setSongs(DEFAULT_SONGS);
      })
      .finally(() => setLoading(false));
  }, []);

  // When id param exists, find matching song
  const activeSong = id
    ? songs.find(s => String(s._id) === String(id) || String(s.id) === String(id))
    : null;

  // Navigate to song details (updates URL to /songs/lyrics/:id)
  const openSong = (song) => {
    navigate(`/songs/lyrics/${song._id || song.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back to songs listing
  const handleBackToList = () => {
    navigate("/songs/lyrics");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter songs
  const filtered = songs.filter(s => {
    const matchLang = langFilter === "All" || s.language?.toLowerCase() === langFilter.toLowerCase();
    const q = search.toLowerCase().trim();
    const matchSearch = !q ||
      s.title?.toLowerCase().includes(q) ||
      s.lyrics?.toLowerCase().includes(q) ||
      s.englishLyrics?.toLowerCase().includes(q) ||
      s.author?.toLowerCase().includes(q) ||
      s.theme?.toLowerCase().includes(q);

    const matchPpt = !pptFilterOnly || !!s.pptUrl;
    const matchChords = !chordsFilterOnly || !!s.chords;

    return matchLang && matchSearch && matchPpt && matchChords;
  });

  const extractSnippet = (text, len = 120) => {
    if (!text) return "";
    return text.replace(/\[.*?\]/g, "").replace(/\n+/g, " ").trim().slice(0, len) + (text.length > len ? "…" : "");
  };

  /* ═══════════════════════════════════════════════════════════
     VIEW 1: SONG DETAIL VIEW (/songs/lyrics/:id)
  ═══════════════════════════════════════════════════════════ */
  if (id) {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <div style={{ fontSize: "2rem", color: "#D6B66B", animation: "pulse 1.2s infinite" }}>✝</div>
          <div style={{ marginTop: 16, fontSize: "1rem", color: "#184332", fontWeight: 700 }}>
            Loading Sanctuary Song Sheet...
          </div>
        </div>
      );
    }

    if (!activeSong) {
      return (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <FaMusic size={42} color="#D6B66B" style={{ marginBottom: 16, opacity: 0.6 }} />
          <h2 style={{ fontSize: "1.5rem", color: "#184332", marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>
            Song Not Found in Repertoire
          </h2>
          <p style={{ color: "#7A9288", marginBottom: 24 }}>
            The song you are looking for may have been updated or moved.
          </p>
          <button
            onClick={handleBackToList}
            style={{
              padding: "10px 24px", borderRadius: 30, background: "#184332",
              color: "#FAF6EE", border: "none", fontWeight: 800, cursor: "pointer"
            }}
          >
            ← Browse All Songs
          </button>
        </div>
      );
    }

    return (
      <SongDetailView
        song={activeSong}
        songs={songs}
        onBack={handleBackToList}
        onSelectSong={openSong}
      />
    );
  }

  /* ═══════════════════════════════════════════════════════════
     VIEW 2: SONG LISTING VIEW (/songs/lyrics)
  ═══════════════════════════════════════════════════════════ */
  return (
    <div style={{ maxWidth: 1260, margin: "0 auto" }}>

      {/* Sanctuary Search & Header Bar */}
      <div style={{
        background: "linear-gradient(135deg, #0C2219 0%, #184332 100%)",
        borderRadius: 20,
        padding: "36px 36px 30px",
        marginBottom: 32,
        color: "#FAF6EE",
        border: "1.5px solid rgba(214, 182, 107, 0.3)",
        boxShadow: "0 10px 30px rgba(12, 34, 25, 0.15)"
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: "#D6B66B", fontSize: "0.78rem", fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            † Christ's Tabernacle Hymnal †
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)", fontWeight: 800, margin: "0 0 12px", fontFamily: "'Playfair Display', serif" }}>
            Search Worship Songs &amp; PowerPoint Slides
          </h2>
          <p style={{ color: "#EAF2EE", fontSize: "0.92rem", lineHeight: 1.6, margin: "0 0 24px" }}>
            Access verified Tamil &amp; English lyrics, transposable musical chords, and presentation slide decks for Sunday services.
          </p>

          {/* Search Input Box */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "#FFFFFF", borderRadius: 40, padding: "8px 22px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.25)", border: "2px solid #D6B66B"
          }}>
            <FaSearch color="#184332" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by Tamil title, English words, author (e.g. Gersson), or lyrics..."
              style={{
                flex: 1, border: "none", outline: "none", fontSize: "0.98rem",
                color: "#184332", background: "transparent", fontWeight: 600
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#7A9288", display: "flex" }}
              >
                <FaTimes size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Quick Action Badges */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 24, flexWrap: "wrap", gap: 14
      }}>
        {/* Language Tabs */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[
            { key: "All", label: "All Songs" },
            { key: "Tamil", label: "தமிழ் Tamil" },
            { key: "English", label: "English" },
          ].map(lang => (
            <button
              key={lang.key}
              onClick={() => setLangFilter(lang.key)}
              style={{
                padding: "8px 20px", borderRadius: 24,
                background: langFilter === lang.key ? "#184332" : "#FFFFFF",
                color: langFilter === lang.key ? "#FAF6EE" : "#4A6355",
                fontWeight: 800, fontSize: "0.85rem", cursor: "pointer",
                boxShadow: langFilter === lang.key ? "0 4px 14px rgba(24,67,50,0.25)" : "0 1px 4px rgba(0,0,0,0.06)",
                border: `1.5px solid ${langFilter === lang.key ? "#184332" : "#EDE5D8"}`,
                transition: "all 0.15s"
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Feature Toggles (PPT / Chords) */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setPptFilterOnly(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 20,
              background: pptFilterOnly ? "#F59E0B" : "#FFFFFF",
              color: pptFilterOnly ? "#0C2219" : "#4A6355",
              border: `1.5px solid ${pptFilterOnly ? "#F59E0B" : "#EDE5D8"}`,
              fontWeight: 700, fontSize: "0.8rem", cursor: "pointer"
            }}
          >
            <FaFilePowerpoint size={12} color={pptFilterOnly ? "#0C2219" : "#F59E0B"} />
            With PPT Deck
          </button>

          <button
            onClick={() => setChordsFilterOnly(v => !v)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 20,
              background: chordsFilterOnly ? "#7C3AED" : "#FFFFFF",
              color: chordsFilterOnly ? "#FFFFFF" : "#4A6355",
              border: `1.5px solid ${chordsFilterOnly ? "#7C3AED" : "#EDE5D8"}`,
              fontWeight: 700, fontSize: "0.8rem", cursor: "pointer"
            }}
          >
            <FaGuitar size={12} color={chordsFilterOnly ? "#FFFFFF" : "#7C3AED"} />
            With Chords
          </button>

          <span style={{ fontSize: "0.84rem", color: "#7A9288", fontWeight: 700, marginLeft: 6 }}>
            {filtered.length} song{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Repertoire Song List Cards */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, height: 120, border: "1px solid #EDE5D8", animation: "pulse 1.4s infinite" }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          background: "#FFFFFF", borderRadius: 20, padding: "80px 20px",
          textAlign: "center", border: "1.5px solid #EDE5D8"
        }}>
          <FaMusic size={40} color="#D6B66B" style={{ opacity: 0.5, marginBottom: 16 }} />
          <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem", fontWeight: 800, color: "#184332", fontFamily: "'Playfair Display', serif" }}>
            No Matching Worship Songs Found
          </h3>
          <p style={{ margin: 0, color: "#7A9288" }}>
            Try adjusting your search keywords or toggle off filter options.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((song) => {
            const thumb = getYouTubeThumbnail(song.youtubeUrl);
            const snippet = extractSnippet(song.lyrics || song.englishLyrics, 140);

            return (
              <div
                key={song._id || song.id}
                onClick={() => openSong(song)}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 16,
                  border: "1.5px solid #EDE5D8",
                  padding: "18px 24px",
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  position: "relative"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#D6B66B";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(24, 67, 50, 0.08)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#EDE5D8";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
                }}
              >
                {/* Left Visual Box: YouTube Thumbnail or PPT Slide Preview */}
                <div style={{
                  width: 140, height: 86, borderRadius: 12, overflow: "hidden",
                  flexShrink: 0, background: "#0C2219", position: "relative",
                  border: "1px solid rgba(214,182,107,0.3)"
                }}>
                  {thumb ? (
                    <>
                      <img src={thumb} alt={song.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{
                        position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(220,38,38,0.9)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                          <FaPlay size={10} style={{ marginLeft: 2 }} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{
                      width: "100%", height: "100%",
                      background: "linear-gradient(135deg, #0C2219 0%, #184332 100%)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      color: "#D6B66B", gap: 4
                    }}>
                      <div style={{ fontSize: "1.2rem" }}>✝</div>
                      <div style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: 1, color: "#E8CC8F" }}>
                        SANCTUARY
                      </div>
                    </div>
                  )}

                  {/* Corner Badge */}
                  {song.pptUrl && (
                    <div style={{
                      position: "absolute", bottom: 4, right: 4,
                      background: "#F59E0B", color: "#0C2219",
                      fontSize: "0.62rem", fontWeight: 900, padding: "1px 5px",
                      borderRadius: 4
                    }}>
                      PPT
                    </div>
                  )}
                </div>

                {/* Center: Title & Lyrics Preview */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h3 style={{
                      margin: 0, fontSize: "1.1rem", fontWeight: 800,
                      color: "#184332", lineHeight: 1.3,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      fontFamily: "'Playfair Display', Georgia, serif"
                    }}>
                      {song.title}
                    </h3>

                    <span style={{
                      background: song.language?.toLowerCase() === "tamil" ? "#EAF2EE" : "#F5F3FF",
                      color: song.language?.toLowerCase() === "tamil" ? "#184332" : "#6D28D9",
                      fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: 12,
                      flexShrink: 0
                    }}>
                      {song.language}
                    </span>
                  </div>

                  <p style={{
                    margin: "0 0 10px", fontSize: "0.85rem", color: "#4A6355",
                    fontStyle: "italic", lineHeight: 1.5,
                    overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
                  }}>
                    "{snippet}"
                  </p>

                  {/* Badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: "0.76rem" }}>
                    {song.author && (
                      <span style={{ color: "#7A9288", fontWeight: 600 }}>
                        ✍ {song.author}
                      </span>
                    )}
                    {song.key && (
                      <span style={{ background: "#FAF6EE", color: "#A88A42", fontWeight: 700, padding: "1px 8px", borderRadius: 10, border: "1px solid #EDE5D8" }}>
                        🎵 Key: {song.key}
                      </span>
                    )}
                    {song.pptUrl && (
                      <span style={{ background: "#FEF3C7", color: "#92400E", fontWeight: 800, padding: "1px 8px", borderRadius: 10 }}>
                        📊 PPT Ready
                      </span>
                    )}
                    {song.chords && (
                      <span style={{ background: "#F5F3FF", color: "#6D28D9", fontWeight: 800, padding: "1px 8px", borderRadius: 10 }}>
                        🎸 Chords
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareSong(song);
                    }}
                    title="Share this song via device"
                    style={{
                      padding: "9px 14px", borderRadius: 10,
                      background: "#FAF6EE", border: "1.5px solid #EDE5D8",
                      color: "#184332", fontWeight: 700,
                      fontSize: "0.84rem", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6,
                      transition: "all 0.15s"
                    }}
                  >
                    <FaShareAlt size={12} color="#A88A42" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openSong(song);
                    }}
                    style={{
                      padding: "9px 18px", borderRadius: 10, border: "none",
                      background: "#184332", color: "#D6B66B", fontWeight: 800,
                      fontSize: "0.84rem", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 6,
                      boxShadow: "0 2px 8px rgba(24,67,50,0.2)"
                    }}
                  >
                    <span>View Lyrics</span>
                    <FaChevronRight size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
