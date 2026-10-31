import { useState, useEffect } from "react";
import { FaUserPlus, FaTimes, FaCheckCircle } from "react-icons/fa";
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

  const labelClass = "block text-xs font-bold text-green mb-1.5 uppercase tracking-wide";
  const inputClass =
    "w-full px-3 py-2.5 bg-[#F8FAF9] border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-light/40 focus:border-green transition-all";

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#0B2318]/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
    >
      <div
        className="w-full max-w-[680px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gold/35 relative m-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-br from-[#0B2318] via-[#123727] to-[#1E5641] text-white px-6 py-5 flex items-center justify-between border-b-2 border-gold">
          <div className="flex items-center gap-3">
            <div className="w-[38px] h-[38px] rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold text-base flex-shrink-0">
              <FaUserPlus />
            </div>
            <div>
              <div className="text-[0.74rem] text-gold tracking-[1.5px] uppercase font-bold">
                Christ's Tabernacle Congregation
              </div>
              <h2
                id="member-modal-title"
                className="m-0 text-lg sm:text-xl font-serif text-white font-bold leading-tight"
              >
                Church Member Registration
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 border-0 text-white w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-sm transition-all"
            aria-label="Close form"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 sm:px-7 py-6 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-7 px-2.5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-[0_4px_14px_rgba(22,163,74,0.2)]">
                <FaCheckCircle />
              </div>
              <h3 className="font-serif text-2xl text-green-dark mb-2 font-bold">
                Member Enrolled Successfully!
              </h3>
              <p className="text-slate-600 text-[0.95rem] max-w-[440px] mx-auto mb-4 leading-relaxed">
                Welcome to Christ's Tabernacle Prayer &amp; Worship Centre! Your membership details have been stored in the church registry.
              </p>
              <div className="bg-[#F8FAF9] border border-dashed border-gold rounded-xl px-4.5 py-3 text-green text-[0.85rem] italic max-w-[480px] mx-auto mb-6">
                "Now you are the body of Christ, and each one of you is a part of it." — 1 Corinthians 12:27
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer text-sm hover:bg-slate-200 transition-all"
                >
                  + Add Another Member
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-br from-green to-green-dark text-white rounded-lg font-bold cursor-pointer text-sm shadow-[0_4px_12px_rgba(24,67,50,0.25)] hover:opacity-95 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="m-0 mb-4.5 text-slate-500 text-[0.88rem] leading-normal">
                Please fill in the membership details below. All stored data is securely kept in the Admin Sanctuary members registry.
              </p>

              {error && (
                <div className="bg-red-100 border border-red-200 text-red-600 px-3.5 py-2.5 rounded-lg text-sm mb-4.5 flex items-center gap-2 font-medium">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Row 1: Full Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sister Hannah D. / Bro. David"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Date of Birth & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div>
                  <label className={labelClass}>
                    Date of Birth (DOB) <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={inputClass}
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Age <span className="text-slate-500 font-normal">(Years)</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Auto or enter age"
                    min="1"
                    max="125"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 3: Mobile Number & Mail ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div>
                  <label className={labelClass}>
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="e.g. +91 98401 23456"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Mail ID <span className="text-green-600 font-semibold">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 4: Residential Address */}
              <div className="mb-4">
                <label className={labelClass}>
                  Residential Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Door No., Street Name, Area, City, Pincode"
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Row 5: Additional Church & Family Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
                <div>
                  <label className={labelClass}>Blood Group</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={inputClass}>
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
                  <label className={labelClass}>Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Water Baptized?</label>
                  <select name="baptized" value={formData.baptized} onChange={handleChange} className={inputClass}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Occupation & Emergency Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div>
                  <label className={labelClass}>Occupation / Profession</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Teacher, Engineer, Business"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Emergency Contact / Guardian</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="e.g. Spouse / Parent Contact"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 7: Notes or Prayer Request */}
              <div className="mb-5.5">
                <label className={labelClass}>
                  Ministry Interests / Prayer Needs / Remarks <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="e.g. Choir, Sunday school teacher, healing prayer..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4.5 py-2.5 bg-slate-100 border border-slate-300 text-slate-600 rounded-lg font-semibold cursor-pointer text-sm hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-gradient-to-br from-green to-green-dark text-white rounded-lg font-bold text-sm cursor-pointer shadow-[0_4px_14px_rgba(24,67,50,0.25)] hover:opacity-95 transition-all inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <FaUserPlus />
                  <span>{submitting ? "Enrolling Member..." : "Submit Member Registration"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
