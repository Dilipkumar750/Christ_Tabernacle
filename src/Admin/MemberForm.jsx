import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberById, createMember, updateMember } from "../services/api";
import { FaArrowLeft, FaSave, FaTimes, FaUserCheck, FaUserPlus } from "react-icons/fa";

export default function MemberForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
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
    membershipDate: new Date().toISOString().split("T")[0],
    status: "Active",
    notes: "",
  });

  // Calculate age automatically from DOB
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        if (calculatedAge >= 0) {
          setFormData((prev) => ({ ...prev, age: String(calculatedAge) }));
        }
      }
    }
  }, [formData.dob]);

  useEffect(() => {
    if (isEdit) {
      getMemberById(id)
        .then((member) => {
          if (member) {
            setFormData({
              name: member.name || "",
              dob: member.dob || "",
              age: member.age !== undefined && member.age !== null ? String(member.age) : "",
              gender: member.gender || "Male",
              mobile: member.mobile || "",
              email: member.email || "",
              address: member.address || "",
              occupation: member.occupation || "",
              bloodGroup: member.bloodGroup || "",
              maritalStatus: member.maritalStatus || "Single",
              baptized: member.baptized || "Yes",
              emergencyContact: member.emergencyContact || "",
              membershipDate: member.membershipDate || new Date().toISOString().split("T")[0],
              status: member.status || "Active",
              notes: member.notes || "",
            });
          } else {
            setError("Member record not found.");
          }
        })
        .catch((err) => setError(err.message || "Failed to load member."))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter member name.");
      return;
    }
    if (!formData.mobile.trim()) {
      setError("Please enter mobile phone number.");
      return;
    }
    if (!formData.address.trim()) {
      setError("Please enter residential address.");
      return;
    }

    try {
      setSaving(true);
      if (isEdit) {
        await updateMember(id, formData);
        navigate("/admin/members", { state: { success: `Member "${formData.name}" updated successfully!` } });
      } else {
        await createMember(formData);
        navigate("/admin/members", { state: { success: `New member "${formData.name}" enrolled successfully!` } });
      }
    } catch (err) {
      setError("Failed to save member: " + err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "#184332", fontWeight: 600 }}>
        Loading church member details...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 840, margin: "0 auto" }}>
      {/* Top Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <button
          onClick={() => navigate("/admin/members")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            background: "#F1F5F9",
            border: "1.5px solid #CBD5E1",
            color: "#475569",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.88rem",
          }}
        >
          <FaArrowLeft /> Back to Members
        </button>
        <div>
          <div style={{ color: "#A88A42", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
            CONGREGATION REGISTRATION
          </div>
          <h1 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.8rem", color: "#122D24", margin: "2px 0 0", fontWeight: 700 }}>
            {isEdit ? "Edit Member Profile" : "Enroll New Church Member"}
          </h1>
        </div>
      </div>

      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", color: "#B91C1C", padding: "12px 16px", borderRadius: 10, marginBottom: 20 }}>
          {error}
        </div>
      )}

      {/* Form Card */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: 16,
          padding: "32px 36px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Details */}
          <div style={{ marginBottom: 20, borderBottom: "1px solid #E2E8F0", paddingBottom: 10 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "1.05rem", color: "#184332", fontFamily: "var(--font-serif, serif)" }}>
              1. Personal Identity
            </h3>
            <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Basic membership profile and age</span>
          </div>

          <div className="mf-row mf-row-2" style={{ marginBottom: 18 }}>
            <div>
              <label style={LBL}>
                Full Name <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sister Hannah D. / Bro. David"
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

          <div className="mf-row mf-row-3" style={{ marginBottom: 18 }}>
            <div>
              <label style={LBL}>Date of Birth (DOB)</label>
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
              <label style={LBL}>Age (Years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Auto or enter"
                min="1"
                max="125"
                style={INP}
              />
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
          </div>

          {/* Section 2: Contact Details */}
          <div style={{ marginTop: 28, marginBottom: 20, borderBottom: "1px solid #E2E8F0", paddingBottom: 10 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "1.05rem", color: "#184332", fontFamily: "var(--font-serif, serif)" }}>
              2. Communication &amp; Residence
            </h3>
            <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Mobile phone, mail ID (optional), and residential address</span>
          </div>

          <div className="mf-row mf-row-half" style={{ marginBottom: 18 }}>
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
                placeholder="member@example.com"
                style={INP}
              />
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={LBL}>
              Residential Address <span style={{ color: "#DC2626" }}>*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              placeholder="Door number, street name, locality, city, pincode"
              required
              style={{ ...INP, resize: "vertical" }}
            />
          </div>

          {/* Section 3: Church & Fellowship Details */}
          <div style={{ marginTop: 28, marginBottom: 20, borderBottom: "1px solid #E2E8F0", paddingBottom: 10 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "1.05rem", color: "#184332", fontFamily: "var(--font-serif, serif)" }}>
              3. Spiritual &amp; Fellowship Status
            </h3>
            <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Baptism status, membership status, and medical info</span>
          </div>

          <div className="mf-row mf-row-3" style={{ marginBottom: 18 }}>
            <div>
              <label style={LBL}>Water Baptism</label>
              <select name="baptized" value={formData.baptized} onChange={handleChange} style={INP}>
                <option value="Yes">Yes (Baptized)</option>
                <option value="No">No (Not Yet)</option>
              </select>
            </div>
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
              <label style={LBL}>Membership Status</label>
              <select name="status" value={formData.status} onChange={handleChange} style={INP}>
                <option value="Active">Active Believer</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mf-row mf-row-half" style={{ marginBottom: 18 }}>
            <div>
              <label style={LBL}>Occupation / Profession</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="e.g. Teacher, Engineer, Homemaker"
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
                placeholder="e.g. Spouse / Relative Phone"
                style={INP}
              />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={LBL}>Ministry Roles / Remarks / Prayer Needs</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              placeholder="e.g. Choir member, Sunday School teacher, fasting prayer group..."
              style={{ ...INP, resize: "vertical" }}
            />
          </div>

          {/* Form Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              paddingTop: 20,
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/admin/members")}
              style={{
                padding: "11px 22px",
                background: "#F1F5F9",
                border: "1px solid #CBD5E1",
                color: "#475569",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "11px 28px",
                background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                cursor: saving ? "not-allowed" : "pointer",
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(24, 67, 50, 0.25)",
                opacity: saving ? 0.75 : 1,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FaSave /> {saving ? "Saving..." : isEdit ? "Save Changes" : "Enroll Church Member"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .mf-row {
          display: grid;
          gap: 16px;
        }
        .mf-row-2 {
          grid-template-columns: 2fr 1fr;
        }
        .mf-row-half {
          grid-template-columns: 1fr 1fr;
        }
        .mf-row-3 {
          grid-template-columns: 1fr 1fr 1fr;
        }

        @media (max-width: 640px) {
          .mf-row-2,
          .mf-row-half,
          .mf-row-3 {
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
  color: "#184332",
  fontWeight: 700,
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.3px",
};

const INP = {
  width: "100%",
  padding: "11px 14px",
  background: "#FFFFFF",
  border: "1.5px solid #CBD5E1",
  borderRadius: 10,
  color: "#0F172A",
  fontSize: "0.94rem",
  outline: "none",
  boxSizing: "border-box",
};
