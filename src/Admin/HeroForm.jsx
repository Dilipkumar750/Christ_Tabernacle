import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllHeroSlidesAdmin, createHeroSlide, updateHeroSlide } from "../services/api";
import { FaArrowLeft, FaUpload, FaImages, FaSave, FaTimes, FaLink, FaCheckCircle } from "react-icons/fa";

const IS = {
  width: "100%", padding: "11px 14px", background: "#FFFFFF",
  border: "1.5px solid #CBD5E1", borderRadius: 10, color: "#0F172A",
  fontSize: "0.94rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit",
};
const LS = {
  display: "block", fontSize: "0.82rem", color: "#184332", fontWeight: 700,
  marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.3px",
};

// Compress image via Canvas and return base64 data URL
// Image is stored directly in MongoDB — no server file system required
function compressImage(file, maxWidthPx = 1920, quality = 0.82) {
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
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(ev.target.result); // fallback: raw base64
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const EMPTY_FORM = {
  title: "", subtitle: "", tag: "", verse: "",
  actionText: "Plan a Visit", actionLink: "/contact",
  image: "", alt: "", order: 1, isActive: true,
};

export default function HeroForm() {
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
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Load existing slide when editing
  useEffect(() => {
    if (!isEdit) return;
    getAllHeroSlidesAdmin()
      .then((slides) => {
        const slide = slides.find((s) => s._id === id);
        if (slide) {
          setFormData({
            title: slide.title || "", subtitle: slide.subtitle || "",
            tag: slide.tag || "", verse: slide.verse || "",
            actionText: slide.actionText || "Plan a Visit",
            actionLink: slide.actionLink || "/contact",
            image: slide.image || "", alt: slide.alt || "",
            order: slide.order || 1,
            isActive: slide.isActive !== undefined ? slide.isActive : true,
          });
          if ((slide.image || "").startsWith("http")) {
            setImgMode("url");
            setUrlInput(slide.image);
          }
        } else {
          setError("Slide not found.");
        }
      })
      .catch(() => setError("Failed to load slide data."))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  // File selected → compress → store as base64
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setError("File too large — please select an image under 15 MB.");
      return;
    }
    setError("");
    setProcessingImg(true);
    try {
      const base64 = await compressImage(file, 1920, 0.82);
      setFormData((prev) => ({
        ...prev,
        image: base64,
        alt: prev.alt || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      }));
    } catch {
      setError("Could not process image. Try a different file.");
    } finally {
      setProcessingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Apply external URL
  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) { setError("Please enter a valid image URL."); return; }
    setError("");
    setFormData((prev) => ({ ...prev, image: trimmed }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) { setError("Title is required."); return; }
    if (!formData.subtitle.trim()) { setError("Subtitle is required."); return; }
    if (!formData.image) { setError("Please upload an image or enter an image URL."); return; }
    setError("");
    try {
      setSaving(true);
      if (isEdit) await updateHeroSlide(id, formData);
      else await createHeroSlide(formData);
      navigate("/admin/hero", {
        state: { success: isEdit ? "Hero banner updated!" : "New hero banner created!" },
      });
    } catch (err) {
      setError("Failed to save: " + err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "80px 0", color: "#184332", fontWeight: 600 }}>Loading slide data...</div>;
  }

  const isBase64 = formData.image.startsWith("data:");
  const sizeKB = isBase64 ? Math.round((formData.image.length * 3) / 4 / 1024) : 0;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <button
          onClick={() => navigate("/admin/hero")}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "#F1F5F9", border: "1.5px solid #CBD5E1", color: "#475569", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: "0.88rem" }}
        >
          <FaArrowLeft /> Back to Hero Banners
        </button>
        <div>
          <div style={{ color: "#A88A42", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>HOMEPAGE DYNAMIC SECTION</div>
          <h1 style={{ fontFamily: "var(--font-serif,serif)", fontSize: "1.7rem", color: "#122D24", margin: "2px 0 0", fontWeight: 700 }}>
            {isEdit ? "Edit Hero Banner Slide" : "Create New Hero Banner Slide"}
          </h1>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", padding: "12px 16px", borderRadius: 10, marginBottom: 20, fontWeight: 500 }}>
          {error}
        </div>
      )}

      {/* Form Card */}
      <div style={{ background: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: 16, padding: "32px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <label style={LS}>Hero Headline / Title *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Christ's Tabernacle Prayer & Worship Centre" required style={IS} />
          </div>

          {/* Subtitle */}
          <div style={{ marginBottom: 20 }}>
            <label style={LS}>Subtitle / Mission Statement *</label>
            <textarea rows={2} value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="e.g. A House of Prayer • A Place of Deliverance" required style={{ ...IS, resize: "vertical" }} />
          </div>

          {/* Tag + Verse */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={LS}>Badge Tag</label>
              <input type="text" value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} placeholder="e.g. Established 1991" style={IS} />
            </div>
            <div>
              <label style={LS}>Scripture Verse Reference</label>
              <input type="text" value={formData.verse} onChange={(e) => setFormData({ ...formData, verse: e.target.value })} placeholder="e.g. Isaiah 56:7" style={IS} />
            </div>
          </div>

          {/* CTA Button */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={LS}>Action Button Label</label>
              <input type="text" value={formData.actionText} onChange={(e) => setFormData({ ...formData, actionText: e.target.value })} placeholder="e.g. Plan a Visit" style={IS} />
            </div>
            <div>
              <label style={LS}>Action Button Route / URL</label>
              <input type="text" value={formData.actionLink} onChange={(e) => setFormData({ ...formData, actionLink: e.target.value })} placeholder="e.g. /contact" style={IS} />
            </div>
          </div>

          {/* ── IMAGE SECTION ── */}
          <div style={{ marginBottom: 20 }}>
            <label style={LS}>Banner Image *</label>

            {/* Mode Tabs */}
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
                  gap: 12, padding: "32px 20px", border: "2px dashed #CBD5E1",
                  borderRadius: 12, cursor: processingImg ? "wait" : "pointer",
                  background: "#F8FAFC", textAlign: "center", transition: "border-color 0.2s",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith("image/")) handleFileSelect({ target: { files: [file] } });
                }}
              >
                <FaImages style={{ fontSize: "2.2rem", color: "#184332" }} />
                <div>
                  <div style={{ fontWeight: 700, color: "#122D24", fontSize: "0.95rem" }}>
                    {processingImg ? "⏳ Compressing image, please wait…" : "Click to select or drag & drop an image"}
                  </div>
                  <div style={{ color: "#64748B", fontSize: "0.8rem", marginTop: 5 }}>
                    JPG, PNG, WEBP up to 15 MB · Image is compressed &amp; stored permanently in the database
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
                  placeholder="https://example.com/church-banner.jpg"
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

            {/* Live Preview */}
            {formData.image && (
              <div style={{ marginTop: 14, borderRadius: 12, overflow: "hidden", height: 200, border: "1.5px solid #E2E8F0", position: "relative", background: "#0c2419" }}>
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
                      ? <span>✓ Image ready — stored in database <span style={{ color: "#A3E635" }}>({sizeKB} KB)</span></span>
                      : <span>External URL image</span>
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

          {/* Alt text */}
          <div style={{ marginBottom: 20 }}>
            <label style={LS}>Image Alt Text (SEO &amp; Accessibility)</label>
            <input type="text" value={formData.alt} onChange={(e) => setFormData({ ...formData, alt: e.target.value })} placeholder="e.g. Church sanctuary Sunday worship service" style={IS} />
          </div>

          {/* Order + Active */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div>
              <label style={LS}>Display Order Sequence</label>
              <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })} min={1} style={IS} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 26 }}>
              <input type="checkbox" id="heroIsActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} style={{ width: 20, height: 20, accentColor: "#184332", cursor: "pointer" }} />
              <label htmlFor="heroIsActive" style={{ fontSize: "0.94rem", color: "#122D24", fontWeight: 600, cursor: "pointer" }}>Publish on Public Homepage</label>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 20, borderTop: "1px solid #E2E8F0" }}>
            <button type="button" onClick={() => navigate("/admin/hero")} style={{ padding: "11px 22px", background: "#F1F5F9", border: "1px solid #CBD5E1", color: "#475569", borderRadius: 8, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              disabled={saving || processingImg}
              style={{ padding: "11px 26px", background: "linear-gradient(135deg,#184332 0%,#122D24 100%)", color: "#FFFFFF", border: "none", borderRadius: 8, cursor: (saving || processingImg) ? "not-allowed" : "pointer", fontWeight: 700, boxShadow: "0 4px 14px rgba(24,67,50,0.25)", opacity: (saving || processingImg) ? 0.75 : 1, display: "flex", alignItems: "center", gap: 8 }}
            >
              <FaSave />
              {saving ? "Saving…" : processingImg ? "Processing…" : isEdit ? "Save Changes" : "Create Slide"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
