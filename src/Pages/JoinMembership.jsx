import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaCheckCircle, FaCross, FaArrowLeft, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUsers, FaHeart } from "react-icons/fa";
import { createMember } from "../services/api";

export default function JoinMembership() {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.mobile.trim()) {
      setError("Please enter your mobile phone number.");
      return;
    }
    if (!formData.address.trim()) {
      setError("Please enter your residential address.");
      return;
    }

    try {
      setSubmitting(true);
      await createMember(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to submit membership registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Set page title
  useEffect(() => {
    document.title = "Church Member Registration | Christ's Tabernacle Congregation";
    return () => { document.title = "Christ's Tabernacle Congregation"; };
  }, []);

  return (
    <div style={{ background: "#F8FAF9", minHeight: "100vh", paddingBottom: 60 }}>
      {/* Hero Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #0B2318 0%, #123727 60%, #1E5641 100%)",
          color: "#FFFFFF",
          padding: "70px 20px 60px",
          textAlign: "center",
          position: "relative",
          borderBottom: "3px solid #D6B66B",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.85)",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: "0.8rem",
              cursor: "pointer",
              marginBottom: 18,
              fontFamily: "inherit",
            }}
          >
            <FaArrowLeft style={{ fontSize: "0.7rem" }} />
            Back
          </button>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              background: "rgba(214, 182, 107, 0.15)",
              border: "1px solid rgba(214, 182, 107, 0.35)",
              borderRadius: 30,
              color: "#D6B66B",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <FaCross />
            <span>Christ's Tabernacle Congregation</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              margin: "0 0 14px",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            Church Member Registration
          </h1>

          <p
            style={{
              fontSize: "1.02rem",
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: 620,
              margin: "0 auto 20px",
              lineHeight: 1.6,
            }}
          >
            "So then you are no longer strangers and aliens, but you are fellow citizens with the saints and members of the household of God." — Ephesians 2:19
          </p>
        </div>
      </section>

      {/* Main Registration Card */}
      <div style={{ maxWidth: 800, margin: "-30px auto 0", padding: "0 18px", position: "relative", zIndex: 10 }}>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            border: "1.5px solid #E2E8F0",
            padding: "36px 40px",
            boxShadow: "0 10px 35px rgba(0, 0, 0, 0.06)",
          }}
        >
          {success ? (
            <div style={{ textAlign: "center", padding: "40px 10px" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "#DCFCE7",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.4rem",
                  margin: "0 auto 20px",
                  boxShadow: "0 6px 18px rgba(22, 163, 74, 0.25)",
                }}
              >
                <FaCheckCircle />
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif, serif)",
                  fontSize: "1.85rem",
                  color: "#122D24",
                  margin: "0 0 10px",
                }}
              >
                Welcome to Christ's Tabernacle!
              </h2>

              <p style={{ color: "#475569", fontSize: "1.02rem", maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.6 }}>
                Dear <strong style={{ color: "#184332" }}>{formData.name}</strong>, your church membership details have been recorded successfully in the sanctuary registry. Our pastoral and fellowship team looks forward to worshiping with you.
              </p>

              <div
                style={{
                  background: "#F8FAF9",
                  border: "1.5px dashed #D6B66B",
                  borderRadius: 12,
                  padding: "16px 24px",
                  color: "#184332",
                  fontSize: "0.92rem",
                  fontStyle: "italic",
                  maxWidth: 540,
                  margin: "0 auto 32px",
                }}
              >
                "The Lord bless you and keep you; the Lord make his face shine upon you and be gracious to you; the Lord lift up his countenance upon you and give you peace." — Numbers 6:24-26
              </div>

              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialForm);
                    setSuccess(false);
                  }}
                  style={{
                    padding: "12px 24px",
                    background: "#F1F5F9",
                    border: "1.5px solid #CBD5E1",
                    color: "#334155",
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.92rem",
                  }}
                >
                  + Add Another Family Member
                </button>
                <Link
                  to="/"
                  style={{
                    padding: "12px 28px",
                    background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
                    color: "#FFFFFF",
                    borderRadius: 8,
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.92rem",
                    boxShadow: "0 4px 14px rgba(24, 67, 50, 0.25)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Return to Home Sanctuary →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: 16, marginBottom: 24 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontSize: "1.5rem",
                    color: "#122D24",
                    margin: "0 0 6px",
                  }}
                >
                  Member Information Form
                </h2>
                <p style={{ margin: 0, color: "#64748B", fontSize: "0.9rem" }}>
                  Please complete the following details. Fields marked with <span style={{ color: "#DC2626" }}>*</span> are required.
                </p>
              </div>

              {error && (
                <div
                  style={{
                    background: "#FEE2E2",
                    border: "1px solid #FECACA",
                    color: "#DC2626",
                    padding: "12px 16px",
                    borderRadius: 8,
                    fontSize: "0.9rem",
                    marginBottom: 20,
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {/* Row 1: Full Name & Gender */}
              <div className="jm-row jm-row-2" style={{ marginBottom: 18 }}>
                <div>
                  <label style={LBL}>
                    Full Name <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    style={INP}
                  />
                </div>
                <div>
                  <label style={LBL}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={INP}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Date of Birth & Age */}
              <div className="jm-row jm-row-half" style={{ marginBottom: 18 }}>
                <div>
                  <label style={LBL}>
                    Date of Birth (DOB) <span style={{ color: "#64748B", fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    style={INP}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label style={LBL}>
                    Age <span style={{ color: "#64748B", fontWeight: 400 }}>(Years)</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Calculated automatically or enter"
                    min="1"
                    max="125"
                    style={INP}
                  />
                </div>
              </div>

              {/* Row 3: Mobile & Mail ID */}
              <div className="jm-row jm-row-half" style={{ marginBottom: 18 }}>
                <div>
                  <label style={LBL}>
                    Mobile Number <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="e.g. +91 98401 23456"
                    required
                    style={INP}
                  />
                </div>
                <div>
                  <label style={LBL}>
                    Mail ID <span style={{ color: "#16A34A", fontWeight: 600 }}>(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    style={INP}
                  />
                </div>
              </div>

              {/* Row 4: Residential Address */}
              <div style={{ marginBottom: 18 }}>
                <label style={LBL}>
                  Residential Address <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Street Address, City, Pincode"
                  required
                  style={{ ...INP, resize: "vertical" }}
                />
              </div>

              {/* Row 5: Additional Info */}
              <div className="jm-row jm-row-3" style={{ marginBottom: 18 }}>
                <div>
                  <label style={LBL}>Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={INP}>
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
                  <label style={LBL}>Marital Status</label>
                  <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} style={INP}>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={LBL}>Water Baptized?</label>
                  <select name="baptized" value={formData.baptized} onChange={handleChange} style={INP}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Occupation & Emergency Contact */}
              <div className="jm-row jm-row-half" style={{ marginBottom: 18 }}>
                <div>
                  <label style={LBL}>Occupation / Profession</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Teacher, Engineer, Student"
                    style={INP}
                  />
                </div>
                <div>
                  <label style={LBL}>Emergency Contact / Guardian</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Name and contact number"
                    style={INP}
                  />
                </div>
              </div>

              {/* Row 7: Notes */}
              <div style={{ marginBottom: 26 }}>
                <label style={LBL}>
                  Prayer Requests / Ministry Areas <span style={{ color: "#64748B", fontWeight: 400 }}>(Optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Share any special prayers or ministries you would like to participate in..."
                  style={{ ...INP, resize: "vertical" }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "14px 28px",
                  background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 10,
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.75 : 1,
                  boxShadow: "0 4px 16px rgba(24, 67, 50, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "all 0.2s",
                }}
              >
                <FaUserPlus />
                <span>{submitting ? "Submitting Registration..." : "Complete Church Membership Registration"}</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .jm-row {
          display: grid;
          gap: 16px;
        }
        .jm-row-2 {
          grid-template-columns: 2fr 1fr;
        }
        .jm-row-half {
          grid-template-columns: 1fr 1fr;
        }
        .jm-row-3 {
          grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 640px) {
          .jm-row-2,
          .jm-row-half,
          .jm-row-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const LBL = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "#184332",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
};

const INP = {
  width: "100%",
  padding: "11px 14px",
  background: "#F8FAF9",
  border: "1.5px solid #CBD5E1",
  borderRadius: 10,
  color: "#0F172A",
  fontSize: "0.94rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};
