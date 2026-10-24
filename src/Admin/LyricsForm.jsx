import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSongById, getAllSongsAdmin, createSong, updateSong, uploadPPTFile } from "../services/api";
import {
  FaArrowLeft, FaSave, FaTimes, FaUpload, FaCheck
} from "react-icons/fa";

const IS = {
  width: "100%", padding: "11px 14px", background: "#FFFFFF",
  border: "1.5px solid #CBD5E1", borderRadius: 10, color: "#0F172A",
  fontSize: "0.94rem", outline: "none", boxSizing: "border-box"
};

const LS = {
  display: "block", fontSize: "0.82rem", color: "#184332",
  fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.4px"
};

const LANGUAGES = ["Tamil", "English", "Telugu", "Hindi"];

export default function LyricsForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [uploadingPPT, setUploadingPPT] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    language: "Tamil",
    theme: "Adoration & Grace",
    key: "D Major",
    tempo: "68 BPM • Slow Worship",
    author: "Christ's Tabernacle Worship",
    youtubeUrl: "",
    pptUrl: "",
    lyrics: "",
    englishLyrics: "",
    chords: "",
    tags: "",
    order: 1,
    isActive: true,
  });

  const populateForm = (song) => {
    setFormData({
      title: song.title || "",
      language: song.language || "Tamil",
      theme: song.theme || "Adoration & Grace",
      key: song.key || "",
      tempo: song.tempo || "",
      author: song.author || "",
      youtubeUrl: song.youtubeUrl || "",
      pptUrl: song.pptUrl || "",
      lyrics: song.lyrics || "",
      englishLyrics: song.englishLyrics || "",
      chords: song.chords || "",
      tags: Array.isArray(song.tags) ? song.tags.join(", ") : (song.tags || ""),
      order: song.order !== undefined ? song.order : 1,
      isActive: song.isActive !== undefined ? song.isActive : true,
    });
  };

  useEffect(() => {
    if (isEdit) {
      getSongById(id)
        .then((song) => {
          if (song) {
            populateForm(song);
          } else {
            throw new Error("Song not found");
          }
        })
        .catch(() => {
          return getAllSongsAdmin()
            .then((songs) => {
              const song = songs.find((s) => String(s._id) === String(id) || String(s.id) === String(id));
              if (song) {
                populateForm(song);
              } else {
                setError("Worship song not found.");
              }
            });
        })
        .catch((err) => setError(err.message || "Failed to load song"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handlePPTUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPPT(true);
      setError("");
      const res = await uploadPPTFile(file);
      const url = res?.fileUrl || res?.url;
      if (url) {
        setFormData(prev => ({ ...prev, pptUrl: url }));
      }
    } catch (err) {
      setError("PPT Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploadingPPT(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.lyrics.trim()) {
      setError("Song title and Tamil lyrics are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        tags: typeof formData.tags === "string"
          ? formData.tags.split(",").map(t => t.trim()).filter(Boolean)
          : formData.tags,
      };

      if (isEdit) {
        await updateSong(id, payload);
      } else {
        await createSong(payload);
      }

      navigate("/admin/lyrics", {
        state: { success: isEdit ? "Worship song updated successfully!" : "New worship song added!" }
      });
    } catch (err) {
      setError(err.message || "Failed to save worship song");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#184332", fontWeight: 700 }}>
        Loading Song Details...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", paddingBottom: 60 }}>
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button
          onClick={() => navigate("/admin/lyrics")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "9px 16px", background: "#F1F5F9", border: "1.5px solid #CBD5E1",
            color: "#475569", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: "0.88rem"
          }}
        >
          <FaArrowLeft /> Back to Repertoire
        </button>

        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#184332", fontFamily: "var(--font-serif, serif)" }}>
          {isEdit ? "Edit Worship Song" : "Add New Worship Song"}
        </h2>
      </div>

      {error && (
        <div style={{
          padding: "12px 18px", background: "#FEF2F2", border: "1px solid #F87171",
          borderRadius: 10, color: "#991B1B", fontWeight: 600, fontSize: "0.9rem", marginBottom: 20
        }}>
          {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} style={{ background: "#FFFFFF", borderRadius: 16, border: "1.5px solid #E2E8F0", padding: "32px 36px", boxShadow: "0 4px 18px rgba(0,0,0,0.03)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <label style={LS}>Song Title (Tamil &amp; English)</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Tholainthu Pona Ennai (தொலைந்து போன என்னை)"
              style={IS}
            />
          </div>

          <div>
            <label style={LS}>Primary Language</label>
            <select
              value={formData.language}
              onChange={e => setFormData({ ...formData, language: e.target.value })}
              style={IS}
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <label style={LS}>Musical Key</label>
            <input
              type="text"
              value={formData.key}
              onChange={e => setFormData({ ...formData, key: e.target.value })}
              placeholder="e.g. D Major / G"
              style={IS}
            />
          </div>

          <div>
            <label style={LS}>Tempo / Rhythm</label>
            <input
              type="text"
              value={formData.tempo}
              onChange={e => setFormData({ ...formData, tempo: e.target.value })}
              placeholder="e.g. 68 BPM • Slow Worship"
              style={IS}
            />
          </div>

          <div>
            <label style={LS}>Author / Worship Leader</label>
            <input
              type="text"
              value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
              placeholder="e.g. Gersson Edinbaro"
              style={IS}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div>
            <label style={LS}>YouTube Video URL</label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                value={formData.youtubeUrl}
                onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                style={IS}
              />
            </div>
          </div>

          <div>
            <label style={LS}>Worship Theme</label>
            <input
              type="text"
              value={formData.theme}
              onChange={e => setFormData({ ...formData, theme: e.target.value })}
              placeholder="e.g. Adoration & Grace, Deliverance, Praise"
              style={IS}
            />
          </div>
        </div>

        {/* PPT Upload Field */}
        <div style={{ background: "#FAF6EE", padding: "18px 20px", borderRadius: 12, border: "1.5px dashed #D6B66B", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ ...LS, color: "#184332", margin: 0 }}>
              📊 Church PowerPoint Presentation Slide (.pptx / .ppt)
            </label>
            {formData.pptUrl && (
              <span style={{ fontSize: "0.78rem", color: "#16A34A", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                <FaCheck /> PPT Attached
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              type="text"
              value={formData.pptUrl}
              onChange={e => setFormData({ ...formData, pptUrl: e.target.value })}
              placeholder="PPT File URL or Upload below"
              style={{ ...IS, background: "#fff", flex: 1 }}
            />

            <label style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "11px 18px", borderRadius: 8, background: "#184332",
              color: "#D6B66B", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
              whiteSpace: "nowrap"
            }}>
              <FaUpload /> {uploadingPPT ? "Uploading..." : "Upload PPT"}
              <input
                type="file"
                accept=".ppt,.pptx"
                onChange={handlePPTUpload}
                disabled={uploadingPPT}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        {/* Tamil Lyrics */}
        <div style={{ marginBottom: 20 }}>
          <label style={LS}>
            Tamil Lyrics (தமிழ் வரிகள்) — Full Song Lyrics (Separate stanzas with blank lines)
          </label>
          <textarea
            required
            rows={10}
            value={formData.lyrics}
            onChange={e => setFormData({ ...formData, lyrics: e.target.value })}
            placeholder="தொலைந்து போன என்னை&#10;அரவணைத்த அன்பை&#10;ஜீவன் உள்ள நாளெல்லாம்&#10;நான் பாடுவேன்&#10;&#10;அந்த அன்பிற்கு ஈடேதும் இல்லையே&#10;அதை பாடாத ஒரு நாளும் இல்லையே..."
            style={{ ...IS, fontFamily: "'Noto Sans Tamil', monospace", lineHeight: 1.7 }}
          />
        </div>

        {/* English Lyrics */}
        <div style={{ marginBottom: 20 }}>
          <label style={LS}>
            English Lyrics / Transliteration (Optional) — Full Song Lyrics
          </label>
          <textarea
            rows={8}
            value={formData.englishLyrics}
            onChange={e => setFormData({ ...formData, englishLyrics: e.target.value })}
            placeholder="Tholainthu Pona Ennai&#10;The boundless love that embraced me&#10;All the living days of my life&#10;I will sing Your praise..."
            style={{ ...IS, fontFamily: "monospace", lineHeight: 1.7 }}
          />
        </div>

        {/* Chords Sheet */}
        <div style={{ marginBottom: 20 }}>
          <label style={LS}>
            Musical Chords Sheet (Optional)
          </label>
          <textarea
            rows={5}
            value={formData.chords}
            onChange={e => setFormData({ ...formData, chords: e.target.value })}
            placeholder="[பல்லவி - Key: D]&#10;D        Bm       G        A&#10;தொலைந்து போன என்னை..."
            style={{ ...IS, fontFamily: "'Courier New', monospace", color: "#6D28D9", lineHeight: 1.7 }}
          />
        </div>

        {/* Tags & Order */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr", gap: 16, marginBottom: 28, alignItems: "center" }}>
          <div>
            <label style={LS}>Repertoire Tags (Comma Separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. Grace, Adoration, Tamil Hymn, Gersson"
              style={IS}
            />
          </div>

          <div>
            <label style={LS}>Display Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
              style={IS}
            />
          </div>

          <div style={{ paddingTop: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontWeight: 700, fontSize: "0.9rem", color: "#184332" }}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ width: 18, height: 18 }}
              />
              Publish to Website
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, borderTop: "1px solid #E2E8F0", paddingTop: 20 }}>
          <button
            type="button"
            onClick={() => navigate("/admin/lyrics")}
            style={{
              padding: "11px 22px", background: "#F1F5F9", border: "1px solid #CBD5E1",
              color: "#475569", borderRadius: 8, cursor: "pointer", fontWeight: 700,
              display: "flex", alignItems: "center", gap: 8
            }}
          >
            <FaTimes /> Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: "11px 28px", background: "#184332", border: "none",
              color: "#FAF6EE", borderRadius: 8, cursor: saving ? "not-allowed" : "pointer",
              fontWeight: 800, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 2px 10px rgba(24,67,50,0.25)"
            }}
          >
            <FaSave /> {saving ? "Saving Song..." : (isEdit ? "Update Worship Song" : "Save Worship Song")}
          </button>
        </div>
      </form>
    </div>
  );
}
