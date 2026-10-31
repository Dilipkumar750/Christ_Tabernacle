import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaCheckCircle, FaCross, FaArrowLeft } from "react-icons/fa";
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
    return () => {
      document.title = "Christ's Tabernacle Congregation";
    };
  }, []);

  const labelClass = "block text-xs font-bold text-green mb-1.5 uppercase tracking-wide";
  const inputClass =
    "w-full px-3.5 py-2.5 bg-[#F8FAF9] border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-light/40 focus:border-green transition-all";

  return (
    <div className="bg-[#F8FAF9] min-h-screen pb-16 font-sans">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0B2318] via-[#123727] to-[#1E5641] text-white py-16 sm:py-20 px-5 text-center relative border-b-4 border-gold">
        <div className="max-w-[800px] mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white/85 px-3.5 py-1.5 rounded-full text-xs cursor-pointer mb-4.5 transition-all"
          >
            <FaArrowLeft className="text-[0.7rem]" />
            Back
          </button>

          <div className="block">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/15 border border-gold/35 rounded-full text-gold text-xs font-bold tracking-wider uppercase mb-4">
              <FaCross />
              <span>Christ's Tabernacle Congregation</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl my-0 mb-3.5 text-white font-bold leading-tight">
            Church Member Registration
          </h1>

          <p className="text-base sm:text-[1.02rem] text-white/85 max-w-[620px] mx-auto mb-5 leading-relaxed">
            "So then you are no longer strangers and aliens, but you are fellow citizens with the saints and members of the household of God." — Ephesians 2:19
          </p>
        </div>
      </section>

      {/* Main Registration Card */}
      <div className="max-w-[800px] mx-auto -mt-8 px-4 relative z-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-9 md:p-10 shadow-lg">
          {success ? (
            <div className="text-center py-10 px-2.5">
              <div className="w-[72px] h-[72px] rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto mb-5 shadow-[0_6px_18px_rgba(22,163,74,0.25)]">
                <FaCheckCircle />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-green-dark mb-2.5 font-bold">
                Welcome to Christ's Tabernacle!
              </h2>

              <p className="text-slate-600 text-base sm:text-[1.02rem] max-w-[520px] mx-auto mb-6 leading-relaxed">
                Dear <strong className="text-green">{formData.name}</strong>, your church membership details have been recorded successfully in the sanctuary registry. Our pastoral and fellowship team looks forward to worshiping with you.
              </p>

              <div className="bg-[#F8FAF9] border-[1.5px] border-dashed border-gold rounded-xl px-5 py-4 text-green text-sm sm:text-[0.92rem] italic max-w-[540px] mx-auto mb-8">
                "The Lord bless you and keep you; the Lord make his face shine upon you and be gracious to you; the Lord lift up his countenance upon you and give you peace." — Numbers 6:24-26
              </div>

              <div className="flex gap-3.5 justify-center flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialForm);
                    setSuccess(false);
                  }}
                  className="px-6 py-3 bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer text-sm sm:text-[0.92rem] hover:bg-slate-200 transition-all"
                >
                  + Add Another Family Member
                </button>
                <Link
                  to="/"
                  className="px-7 py-3 bg-gradient-to-br from-green to-green-dark text-white rounded-lg font-bold text-sm sm:text-[0.92rem] no-underline shadow-[0_4px_14px_rgba(24,67,50,0.25)] hover:opacity-95 transition-all inline-flex items-center gap-2"
                >
                  Return to Home Sanctuary →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h2 className="font-serif text-xl sm:text-2xl text-green-dark mb-1.5 font-bold">
                  Member Information Form
                </h2>
                <p className="m-0 text-slate-500 text-sm">
                  Please complete the following details. Fields marked with <span className="text-red-600">*</span> are required.
                </p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-5 font-medium">
                  ⚠️ {error}
                </div>
              )}

              {/* Row 1: Full Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4.5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4.5">
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
                    placeholder="Calculated automatically or enter"
                    min="1"
                    max="125"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 3: Mobile & Mail ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4.5">
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
                    placeholder="your.email@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 4: Residential Address */}
              <div className="mb-4.5">
                <label className={labelClass}>
                  Residential Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Street Address, City, Pincode"
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Row 5: Additional Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4.5">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4.5">
                <div>
                  <label className={labelClass}>Occupation / Profession</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Teacher, Engineer, Student"
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
                    placeholder="Name and contact number"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 7: Notes */}
              <div className="mb-6.5">
                <label className={labelClass}>
                  Prayer Requests / Ministry Areas <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Share any special prayers or ministries you would like to participate in..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-7 bg-gradient-to-br from-green to-green-dark text-white rounded-xl text-base font-bold cursor-pointer shadow-[0_4px_16px_rgba(24,67,50,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2.5 disabled:cursor-not-allowed disabled:opacity-75"
              >
                <FaUserPlus />
                <span>{submitting ? "Submitting Registration..." : "Complete Church Membership Registration"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
