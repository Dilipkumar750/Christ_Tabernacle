import { useState, useEffect } from "react";
import { FaUserPlus, FaTimes, FaCheckCircle, FaCross, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { createMember } from "../services/api";

export default function AddMemberModal({ isOpen, onClose, onMemberAdded }) {
  const initialForm = {
    name: "",
    dob: "",
    age: "",
    gender: "Male",
    mobile: "",
    email: "",
    address: "",
    occupation: "",
    bloodGroup: "",
    maritalStatus: "Single",
    baptized: "Yes",
    emergencyContact: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-calculate age whenever DOB changes
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age >= 0) {
          setFormData((prev) => ({ ...prev, age: String(age) }));
        }
      }
    }
  }, [formData.dob]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setError("");
      setSuccess(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter member full name.");
      return;
    }
    if (!formData.mobile.trim()) {
      setError("Please enter member mobile number.");
      return;
    }
    if (!formData.address.trim()) {
      setError("Please enter residential address.");
      return;
    }

    try {
      setSubmitting(true);
      await createMember(formData);
      setSuccess(true);
      if (onMemberAdded) onMemberAdded();
    } catch (err) {
      setError(err.message || "Failed to submit member registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setSuccess(false);
    setError("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(11, 35, 24, 0.72)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
    >
      <div
        style={{
          width: "100%",
          maxWidth: 680,
          background: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
          border: "1.5px solid rgba(214, 182, 107, 0.35)",
          position: "relative",
          margin: "auto",
          animation: "modalFadeUp 0.25s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            background: "linear-gradient(135deg, #0B2318 0%, #123727 60%, #1E5641 100%)",
            color: "#FFFFFF",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #D6B66B",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(214, 182, 107, 0.2)",
                border: "1.5px solid #D6B66B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D6B66B",
                fontSize: "1rem",
                flexShrink: 0,
              }}
            >
              <FaUserPlus />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.74rem",
                  color: "#D6B66B",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Christ's Tabernacle Congregation
              </div>
              <h2
                id="member-modal-title"
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontFamily: "var(--font-serif, serif)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              >
                Church Member Registration
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              border: "none",
              color: "#FFFFFF",
              width: 32,
              height: 32,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.95rem",
              transition: "all 0.2s",
            }}
            aria-label="Close form"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: "24px 28px", maxHeight: "80vh", overflowY: "auto" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#DCFCE7",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  margin: "0 auto 16px",
                  boxShadow: "0 4px 14px rgba(22, 163, 74, 0.2)",
                }}
              >
                <FaCheckCircle />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif, serif)",
                  fontSize: "1.5rem",
                  color: "#122D24",
                  margin: "0 0 8px",
                }}
              >
                Member Enrolled Successfully!
              </h3>
              <p style={{ color: "#475569", fontSize: "0.95rem", maxWidth: 440, margin: "0 auto 16px", lineHeight: 1.6 }}>
                Welcome to Christ's Tabernacle Prayer &amp; Worship Centre! Your membership details have been stored in the church registry.
              </p>
              <div
                style={{
                  background: "#F8FAF9",
                  border: "1px dashed #D6B66B",
                  borderRadius: 10,
                  padding: "12px 18px",
                  color: "#184332",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  maxWidth: 480,
                  margin: "0 auto 24px",
                }}
              >
                "Now you are the body of Christ, and each one of you is a part of it." — 1 Corinthians 12:27
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: "10px 20px",
                    background: "#F1F5F9",
                    border: "1px solid #CBD5E1",
                    color: "#334155",
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  + Add Another Member
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: "10px 24px",
                    background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.88rem",
                    boxShadow: "0 4px 12px rgba(24, 67, 50, 0.25)",
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ margin: "0 0 18px", color: "#64748B", fontSize: "0.88rem", lineHeight: 1.5 }}>
                Please fill in the membership details below. All stored data is securely kept in the Admin Sanctuary members registry.
              </p>

              {error && (
                <div
                  style={{
                    background: "#FEE2E2",
                    border: "1px solid #FECACA",
                    color: "#DC2626",
                    padding: "10px 14px",
                    borderRadius: 8,
                    fontSize: "0.86rem",
                    marginBottom: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Row 1: Full Name & Gender */}
              <div className="ct-form-row ct-form-row-2" style={{ marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>
                    Full Name <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sister Hannah D. / Bro. David"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Date of Birth & Age */}
              <div className="ct-form-row ct-form-row-half" style={{ marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>
                    Date of Birth (DOB) <span style={{ color: "#64748B", fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    style={inputStyle}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Age <span style={{ color: "#64748B", fontWeight: 400 }}>(Years)</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Auto or enter age"
                    min="1"
                    max="125"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 3: Mobile Number & Mail ID (Optional) */}
              <div className="ct-form-row ct-form-row-half" style={{ marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>
                    Mobile Number <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="e.g. +91 98401 23456"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Mail ID <span style={{ color: "#16A34A", fontWeight: 600 }}>(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 4: Residential Address */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>
                  Residential Address <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Door No., Street Name, Area, City, Pincode"
                  required
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* Row 5: Additional Church & Family Details (Blood Group, Marital Status, Baptism) */}
              <div className="ct-form-row ct-form-row-3" style={{ marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={inputStyle}>
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Marital Status</label>
                  <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={inputStyle}>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Water Baptized?</label>
                  <select name="baptized" value={formData.baptized} onChange={handleChange} style={inputStyle}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Occupation & Emergency Contact */}
              <div className="ct-form-row ct-form-row-half" style={{ marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Occupation / Profession</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Teacher, Engineer, Business"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Emergency Contact / Guardian</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="e.g. Spouse / Parent Contact"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 7: Notes or Prayer Request */}
              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>
                  Ministry Interests / Prayer Needs / Remarks <span style={{ color: "#64748B", fontWeight: 400 }}>(Optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="e.g. Choir, Sunday school teacher, healing prayer..."
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* Form Action Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 12,
                  paddingTop: 16,
                  borderTop: "1px solid #E2E8F0",
                }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: "10px 18px",
                    background: "#F1F5F9",
                    border: "1px solid #CBD5E1",
                    color: "#475569",
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "11px 26px",
                    background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
                    border: "none",
                    color: "#FFFFFF",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.75 : 1,
                    boxShadow: "0 4px 14px rgba(24, 67, 50, 0.25)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <FaUserPlus />
                  <span>{submitting ? "Enrolling Member..." : "Submit Member Registration"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modalFadeUp {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ct-form-row {
          display: grid;
          gap: 14px;
        }
        .ct-form-row-2 {
          grid-template-columns: 2fr 1fr;
        }
        .ct-form-row-half {
          grid-template-columns: 1fr 1fr;
        }
        .ct-form-row-3 {
          grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 600px) {
          .ct-form-row-2,
          .ct-form-row-half,
          .ct-form-row-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 700,
  color: "#184332",
  marginBottom: 5,
  textTransform: "uppercase",
  letterSpacing: "0.4px",
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  background: "#F8FAF9",
  border: "1.5px solid #CBD5E1",
  borderRadius: 8,
  fontSize: "0.88rem",
  color: "#1E293B",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};
