import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPhotosAdmin, createPhoto, updatePhoto } from "../services/api";
import { FaArrowLeft, FaUpload, FaImages, FaSave, FaTimes, FaStar, FaLink, FaCheckCircle } from "react-icons/fa";

const CATEGORIES = ["Sanctuary", "Worship", "Prayer", "Scripture", "Youth", "Events", "Fellowship"];

const IS = {
  width: "100%", padding: "11px 14px", background: "#FFFFFF",
  border: "1.5px solid #CBD5E1", borderRadius: 10, color: "#0F172A",
  fontSize: "0.94rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit",
};
const LS = {
  display: "block", fontSize: "0.82rem", color: "#184332", fontWeight: 700,
  marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.3px",
};

// Compress image via Canvas — stored as base64 directly in MongoDB
function compressImage(file, maxWidthPx = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > maxWidthPx) {
          height = Math.round((height * maxWidthPx) / width);
          width = maxWidthPx;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(ev.target.result);
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const defaultDate = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

const currentYear = String(new Date().getFullYear());

const EMPTY = {
  title: "", category: "Sanctuary", image: "", caption: "",
  date: defaultDate, year: currentYear, isFeatured: false, order: 1,
};

export default function PhotoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const fileInputRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [processingImg, setProcessingImg] = useState(false);
  const [imgMode, setImgMode] = useState("upload"); // "upload" | "url"
  const [urlInput, setUrlInput] = useState("");
  const [formData, setFormData] = useState(EMPTY);

  // Load existing photo when editing
  useEffect(() => {
    if (!isEdit) return;
    getAllPhotosAdmin()
      .then((photos) => {
        const photo = photos.find((p) => p._id === id);
        if (photo) {
          setFormData({
            title: photo.title || "", category: photo.category || "Sanctuary",
            image: photo.image || "", caption: photo.caption || "",
            date: photo.date || defaultDate,
            year: photo.year || (photo.date ? (photo.date.match(/\b(19\d{2}|20\d{2})\b/)?.[0] || currentYear) : currentYear),
            isFeatured: photo.isFeatured || false, order: photo.order || 1,
          });
          if ((photo.image || "").startsWith("http")) {
            setImgMode("url");
            setUrlInput(photo.image);
          }
        } else {
          setError("Photo not found.");
        }
      })
      .catch(() => setError("Failed to load photo data."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  // File selected → compress → base64
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) { setError("File too large — max 15 MB."); return; }
    setError("");
    setProcessingImg(true);
    try {
      const base64 = await compressImage(file, 1600, 0.82);
      setFormData((prev) => ({
        ...prev,
        image: base64,
        title: prev.title || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
    } catch {
      setError("Could not process image. Try a different file.");
    } finally {
      setProcessingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Apply URL
  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) { setError("Please enter a valid image URL."); return; }
    setError("");
    setFormData((prev) => ({ ...prev, image: trimmed }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) { setError("Please upload a photo or enter an image URL."); return; }
    setError("");
    const payload = {
      ...formData,
      title: formData.title?.trim() || `${formData.category || 'Church'} Photo`,
    };
    try {
      setSaving(true);
      if (isEdit) await updatePhoto(id, payload);
      else await createPhoto(payload);
      navigate("/admin/gallery", {
        state: { success: isEdit ? "Photo updated!" : "New photo added to gallery!" },
      });
    } catch (err) {
      setError("Failed to save: " + err.message);
      setSaving(false);
    }
  };

  if (loading) return <div style={{ textAlign: "center", padding: "80px 0", color: "#184332", fontWeight: 600 }}>Loading photo data...</div>;

  const isBase64 = formData.image.startsWith("data:");
  const sizeKB = isBase64 ? Math.round((formData.image.length * 3) / 4 / 1024) : 0;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <button
          onClick={() => navigate("/admin/gallery")}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "#F1F5F9", border: "1.5px solid #CBD5E1", color: "#475569", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: "0.88rem" }}
        >
          <FaArrowLeft /> Back to Gallery
        </button>
        <div>
          <div style={{ color: "#A88A42", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>CHURCH MEDIA &amp; MEMORIES</div>
          <h1 style={{ fontFamily: "var(--font-serif,serif)", fontSize: "1.7rem", color: "#122D24", margin: "2px 0 0", fontWeight: 700 }}>
            {isEdit ? "Edit Gallery Photo" : "Add New Gallery Photo"}
          </h1>
        </div>
      </div>

      {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", padding: "12px 16px", borderRadius: 10, marginBottom: 20, fontWeight: 500 }}>{error}</div>}

      <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "32px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <form onSubmit={handleSubmit}>

          {/* Title + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={LS}>Photo Title (Optional)</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Optional photo title" style={IS} />
            </div>
            <div>
              <label style={LS}>Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={IS}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* ── IMAGE SECTION ── */}
          <div style={{ marginBottom: 20 }}>
            <label style={LS}>Gallery Photo *</label>

            {/* Mode tabs */}
            <div style={{ display: "flex", border: "1.5px solid #CBD5E1", borderRadius: 10, overflow: "hidden", marginBottom: 14 }}>
              {[
                { key: "upload", icon: <FaUpload />, label: "Upload from Device" },
                { key: "url", icon: <FaLink />, label: "Paste Image URL" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setImgMode(tab.key)}
                  style={{
                    flex: 1, padding: "10px 16px", border: "none",
                    borderLeft: tab.key === "url" ? "1.5px solid #CBD5E1" : "none",
                    cursor: "pointer", fontWeight: 700, fontSize: "0.88rem",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: imgMode === tab.key ? "#184332" : "#F8FAFC",
                    color: imgMode === tab.key ? "#FFFFFF" : "#64748B",
                    transition: "all 0.2s",
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Upload drop zone */}
            {imgMode === "upload" && (
              <label
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 12, padding: "28px 20px", border: "2px dashed #CBD5E1",
                  borderRadius: 12, cursor: processingImg ? "wait" : "pointer",
                  background: "#F8FAFC", textAlign: "center",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith("image/")) handleFileSelect({ target: { files: [file] } });
                }}
              >
                <FaImages style={{ fontSize: "2rem", color: "#184332" }} />
                <div>
                  <div style={{ fontWeight: 700, color: "#122D24", fontSize: "0.95rem" }}>
                    {processingImg ? "⏳ Compressing image…" : "Click to select or drag & drop a photo"}
                  </div>
                  <div style={{ color: "#64748B", fontSize: "0.8rem", marginTop: 4 }}>
                    JPG, PNG, WEBP up to 15 MB · Stored permanently in the database
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                  disabled={processingImg}
                />
              </label>
            )}

            {/* URL input */}
            {imgMode === "url" && (
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyUrl(); } }}
                  placeholder="https://example.com/church-photo.jpg"
                  style={{ ...IS, flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  style={{ padding: "11px 18px", background: "#184332", border: "none", color: "#FFFFFF", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: "0.88rem", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}
                >
                  <FaCheckCircle /> Apply URL
                </button>
              </div>
            )}

            {/* Preview */}
            {formData.image && (
              <div style={{ marginTop: 14, borderRadius: 12, overflow: "hidden", height: 220, border: "1.5px solid #E2E8F0", position: "relative", background: "#0c2419" }}>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { e.target.style.display = "none"; setError("Image URL could not be loaded. Please check the URL."); }}
                  onLoad={(e) => { e.target.style.display = "block"; setError(""); }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 14px", background: "rgba(12,36,25,0.88)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#FAF6EE", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                    <FaImages />
                    {isBase64
                      ? <span>✓ Photo ready — stored in database <span style={{ color: "#A3E635" }}>({sizeKB} KB)</span></span>
                      : <span>External URL photo</span>
                    }
                  </span>
                  <button
                    type="button"
                    onClick={() => { setFormData((p) => ({ ...p, image: "" })); setUrlInput(""); }}
                    style={{ background: "#EF4444", border: "none", color: "#fff", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700 }}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          <div style={{ marginBottom: 20 }}>
            <label style={LS}>Caption / Description (Optional)</label>
            <textarea
              rows={2}
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="e.g. Congregation gathered for Sunday morning prayer and worship..."
              style={{ ...IS, resize: "vertical" }}
            />
          </div>

          {/* Date + Year + Order + Featured */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div>
              <label style={LS}>Date / Month</label>
              <input type="text" value={formData.date} onChange={(e) => {
                const val = e.target.value;
                const match = val.match(/\b(19\d{2}|20\d{2})\b/);
                setFormData((prev) => ({
                  ...prev,
                  date: val,
                  year: match ? match[1] : prev.year,
                }));
              }} placeholder="e.g. October 2026" style={IS} />
            </div>
            <div>
              <label style={LS}>Year</label>
              <input type="text" value={formData.year || ''} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="e.g. 2026" style={IS} />
            </div>
            <div>
              <label style={LS}>Display Order</label>
              <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })} min={1} style={IS} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 26 }}>
              <input type="checkbox" id="photoFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} style={{ width: 20, height: 20, accentColor: "#184332", cursor: "pointer" }} />
              <label htmlFor="photoFeatured" style={{ fontSize: "0.94rem", color: "#122D24", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <FaStar style={{ color: "#D97706" }} /> Feature
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 20, borderTop: "1px solid #E2E8F0" }}>
            <button type="button" onClick={() => navigate("/admin/gallery")} style={{ padding: "11px 22px", background: "#F1F5F9", border: "1px solid #CBD5E1", color: "#475569", borderRadius: 8, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              disabled={saving || processingImg}
              style={{ padding: "11px 26px", background: "linear-gradient(135deg,#184332 0%,#122D24 100%)", color: "#FFFFFF", border: "none", borderRadius: 8, cursor: (saving || processingImg) ? "not-allowed" : "pointer", fontWeight: 700, boxShadow: "0 4px 14px rgba(24,67,50,0.25)", opacity: (saving || processingImg) ? 0.75 : 1, display: "flex", alignItems: "center", gap: 8 }}
            >
              <FaSave />
              {saving ? "Saving…" : processingImg ? "Processing…" : isEdit ? "Save Changes" : "Add to Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
