import { useState, useEffect } from "react";
import { getPublicSongs } from "../../services/api";

const SONGS_DB = [
  {
    id: 1,
    title: "En Uyirana Yesuvae (என் உயிரான இயேசுவே)",
    language: "Tamil",
    theme: "Adoration & Surrender",
    key: "D Major",
    tempo: "Slow / Reverent",
    lyrics: `[பல்லவி]
என் உயிரான இயேசுவே
என் உயிருள்ள நாளெல்லாம்
உம்மை புகழ்ந்து பாடுவேன்
உம்மையே போற்றி துதிப்பேன்

[சரணம் 1]
என்னை தாங்கும் கன்மலையே
என்னை காக்கும் புகலிடமே
காரிருள் சூழ்ந்த வேளையிலும்
என் தீபமாய் வந்தவரே

[சரணம் 2]
தாயினும் மேலாய் அன்பு கூர்ந்து
தழும்புகளால் என்னை சுகமாக்கினீர்
ஜீவனை எனக்காய் ஈந்தவரே
ஜீவனுள்ள தேவா ஸ்தோத்திரம்`,
  },
  {
    id: 2,
    title: "Amazing Grace (My Chains Are Gone)",
    language: "English",
    theme: "Deliverance & Grace",
    key: "G Major",
    tempo: "Moderately Slow",
    lyrics: `[Verse 1]
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
His Word my hope secures;
He will my shield and portion be
As long as life endures.`,
  },
  {
    id: 3,
    title: "Aayathamaa (ஆயத்தமா நீ ஆயத்தமா)",
    language: "Tamil",
    theme: "Second Coming & Vigilance",
    key: "E Minor",
    tempo: "Fast / Marching",
    lyrics: `[பல்லவி]
ஆயத்தமா நீ ஆயத்தமா
இயேசுவின் வருகைக்கு ஆயத்தமா?
எக்காளம் தொனித்திடும் வேளையிலே
மகிமையில் பறந்திட ஆயத்தமா?

[சரணம் 1]
வான தூதர்கள் சேனையோடு
வல்லமையோடு வரப்போகிறார்
கண்ணிமைக்கும் நேரத்தில் மாறிடவே
பரிசுத்தமாய் நீ ஆயத்தமா?

[சரணம் 2]
உலகத்தின் ஆசைகள் விட்டுவிட்டு
சிலுவையை அனுதினம் சுமந்து கொண்டு
விசுவாசப் பாதையில் ஓடிடவே
ஜெபத்தோடு நீயும் ஆயத்தமா?`,
  },
  {
    id: 4,
    title: "What a Beautiful Name",
    language: "English",
    theme: "Praise & Exaltation",
    key: "D Major",
    tempo: "70 BPM Worship",
    lyrics: `[Verse 1]
You were the Word at the beginning
One with God the Lord Most High
Your hidden glory in creation
Now revealed in You our Christ

[Chorus 1]
What a beautiful Name it is
What a beautiful Name it is
The Name of Jesus Christ my King
What a beautiful Name it is, nothing compares to this
What a beautiful Name it is, the Name of Jesus

[Bridge]
Death could not hold You, the veil tore before You
You silenced the boast of sin and grave
The heavens are roaring the praise of Your glory
For You are raised to life again!

[Chorus 2]
What a powerful Name it is
The Name of Jesus Christ my King!`,
  },
  {
    id: 5,
    title: "Kaathirupom Karthaavaikkaaga (காத்திருப்போம்)",
    language: "Tamil",
    theme: "Prayer & Holy Spirit",
    key: "C Major",
    tempo: "Mid-tempo Prayer",
    lyrics: `[பல்லவி]
காத்திருப்போம் கர்த்தருக்காக
புது பெலன் அடைந்திடுவோம்
கழுகைப் போல செட்டைகளை அடித்து
உயரத்திலே எழும்பிடுவோம்

[சரணம் 1]
நடந்தாலும் சோர்வடையோம்
ஓடினாலும் இளைப்படையோம்
ஆவியானவர் நம்மோடு உண்டு
அனுதினமும் ஜெயம் எடுப்போம்

[சரணம் 2]
விண்ணக வல்லமை ஊற்றிடுவார்
அக்கினி நாவுகளாய் இறங்கிடுவார்
சாத்தானின் கோட்டைகள் தகர்த்திடுவோம்
இயேசுவின் நாமத்தில் ஜெயமெடுப்போம்`,
  },
  {
    id: 6,
    title: "How Great Thou Art (O Lord My God)",
    language: "English",
    theme: "Majesty & Reverence",
    key: "Bb Major",
    tempo: "Majestic",
    lyrics: `[Verse 1]
O Lord my God, when I in awesome wonder
Consider all the worlds Thy hands have made,
I see the stars, I hear the rolling thunder,
Thy power throughout the universe displayed.

[Chorus]
Then sings my soul, my Savior God, to Thee:
How great Thou art! How great Thou art!
Then sings my soul, my Savior God, to Thee:
How great Thou art! How great Thou art!

[Verse 2]
When through the woods and forest glades I wander,
And hear the birds sing sweetly in the trees;
When I look down from lofty mountain grandeur,
And see the brook and feel the gentle breeze;

[Verse 3]
And when I think that God, His Son not sparing,
Sent Him to die, I scarce can take it in;
That on the cross, my burden gladly bearing,
He bled and died to take away my sin!`,
  },
];

export default function Lyrics() {
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState("All");
  const [songs, setSongs] = useState(SONGS_DB);
  const [activeSong, setActiveSong] = useState(SONGS_DB[0]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDynamicSongs = async () => {
      try {
        const data = await getPublicSongs(selectedLang, search);
        if (data && data.length > 0) {
          setSongs(data);
          setActiveSong(data[0]);
        }
      } catch (err) {
        // Fallback to static SONGS_DB silently
      }
    };
    fetchDynamicSongs();
  }, [selectedLang]);

  const filtered = songs.filter((s) => {
    const matchesLang = selectedLang === "All" || s.language === selectedLang;
    const matchesSearch =
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      s.theme?.toLowerCase().includes(search.toLowerCase()) ||
      s.lyrics?.toLowerCase().includes(search.toLowerCase());
    return matchesLang && matchesSearch;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeSong.title}\n\n${activeSong.lyrics}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        .lyrics-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 32px;
          align-items: start;
        }

        .lyrics-sidebar {
          background: var(--white);
          border-radius: 18px;
          border: 1.5px solid var(--border-gold-subtle);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .lyrics-search {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid rgba(24, 67, 50, 0.16);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          margin-bottom: 16px;
          background: var(--ivory);
        }
        .lyrics-search:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(214, 182, 107, 0.18);
        }

        .lyrics-lang-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 20px;
        }
        .lyrics-lang-btn {
          flex: 1;
          padding: 7px 10px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid var(--border-gold-subtle);
          background: var(--white);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }
        .lyrics-lang-btn.active {
          background: var(--grad-green-accent);
          color: var(--gold-bright);
          border-color: var(--gold);
        }

        .lyrics-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 520px;
          overflow-y: auto;
        }
        .lyrics-item {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: all 0.2s;
          background: var(--ivory);
        }
        .lyrics-item:hover {
          border-color: var(--gold);
          background: var(--white);
        }
        .lyrics-item.active {
          background: var(--grad-sanctuary);
          border-color: var(--gold);
          color: var(--ivory);
        }
        .lyrics-item-title {
          font-weight: 700;
          font-size: 0.88rem;
          margin-bottom: 4px;
          display: block;
        }
        .lyrics-item-meta {
          font-size: 0.74rem;
          opacity: 0.8;
          display: flex;
          justify-content: space-between;
        }

        /* Viewer */
        .lyrics-viewer {
          background: var(--white);
          border-radius: 18px;
          border: 1.5px solid var(--border-gold);
          padding: 36px 32px;
          box-shadow: var(--shadow-md);
        }
        .lyrics-viewer-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--border-gold-subtle);
          padding-bottom: 20px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .lyrics-viewer-title {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 3vw, 1.85rem);
          color: var(--green-dark);
          margin: 0 0 8px;
          font-weight: 700;
        }
        .lyrics-viewer-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .lyrics-pre {
          font-family: var(--font-sans);
          font-size: 1.02rem;
          line-height: 1.9;
          color: var(--text-main);
          white-space: pre-wrap;
          background: var(--ivory);
          border-radius: 14px;
          padding: 28px;
          border: 1px solid var(--border-gold-subtle);
        }

        @media (max-width: 900px) {
          .lyrics-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="lyrics-layout">
        {/* Sidebar */}
        <aside className="lyrics-sidebar">
          <input
            type="search"
            placeholder="🔍 Search songs, lyrics, theme..."
            className="lyrics-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="lyrics-lang-tabs" role="tablist">
            {["All", "Tamil", "English"].map((lang) => (
              <button
                key={lang}
                className={`lyrics-lang-btn${selectedLang === lang ? " active" : ""}`}
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
              </button>
            ))}
          </div>

          <ul className="lyrics-list">
            {filtered.map((song) => {
              const isSelected = activeSong && (activeSong._id ? activeSong._id === song._id : activeSong.id === song.id);
              return (
                <li
                  key={song._id || song.id}
                  className={`lyrics-item${isSelected ? " active" : ""}`}
                  onClick={() => setActiveSong(song)}
                >
                  <span className="lyrics-item-title">{song.title}</span>
                  <div className="lyrics-item-meta">
                    <span>{song.theme}</span>
                    <span>{song.key}</span>
                  </div>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li style={{ padding: "20px 10px", textAlign: "center", color: "var(--text-light)" }}>
                No songs matching your search.
              </li>
            )}
          </ul>
        </aside>

        {/* Viewer */}
        <section className="lyrics-viewer" aria-labelledby="song-title">
          {activeSong ? (
            <>
              <div className="lyrics-viewer-head">
                <div>
                  <span className="ct-badge" style={{ marginBottom: 8 }}>
                    {activeSong.language} Praise • {activeSong.theme}
                  </span>
                  <h2 id="song-title" className="lyrics-viewer-title">{activeSong.title}</h2>
                  <div className="lyrics-viewer-badges">
                    <span style={{ fontSize: "0.82rem", color: "var(--gold-dark)", fontWeight: 700 }}>
                      🎹 Key: {activeSong.key}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      ⏱️ Tempo: {activeSong.tempo}
                    </span>
                  </div>
                </div>

                <button onClick={handleCopy} className="ct-btn-gold" style={{ padding: "9px 18px", fontSize: "0.8rem" }}>
                  {copied ? "✓ Lyrics Copied!" : "📋 Copy Lyrics"}
                </button>
              </div>

              <div className="lyrics-pre">{activeSong.lyrics}</div>
            </>
          ) : (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-muted)" }}>
              Select a song from the playlist to display sacred lyrics.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
