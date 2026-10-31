import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberById, createMember, updateMember } from "../services/api";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

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
      <div className="text-center py-20 text-green font-semibold text-base">
        Loading church member details...
      </div>
    );
  }

  const labelClass = "block text-xs font-bold text-green mb-1.5 uppercase tracking-wide";
  const inputClass =
    "w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-light/40 focus:border-green transition-all";

  return (
    <div className="max-w-[840px] mx-auto">
      {/* Top Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/members")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-300 text-slate-600 rounded-lg cursor-pointer font-bold text-sm hover:bg-slate-200 transition-all"
        >
          <FaArrowLeft /> Back to Members
        </button>
        <div>
          <div className="text-gold-dark text-xs font-bold tracking-wider uppercase">
            CONGREGATION REGISTRATION
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-green-dark mt-0.5 mb-0 font-bold">
            {isEdit ? "Edit Member Profile" : "Enroll New Church Member"}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 font-medium text-sm">
          {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 md:p-9 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Details */}
          <div className="mb-5 border-b border-slate-200 pb-2.5">
            <h3 className="m-0 mb-1 text-base sm:text-[1.05rem] text-green font-serif font-bold">
              1. Personal Identity
            </h3>
            <span className="text-xs text-slate-500">Basic membership profile and age</span>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4.5">
            <div>
              <label className={labelClass}>Date of Birth (DOB)</label>
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
              <label className={labelClass}>Age (Years)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Auto or enter"
                min="1"
                max="125"
                className={inputClass}
              />
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
          </div>

          {/* Section 2: Contact Details */}
          <div className="mt-7 mb-5 border-b border-slate-200 pb-2.5">
            <h3 className="m-0 mb-1 text-base sm:text-[1.05rem] text-green font-serif font-bold">
              2. Communication &amp; Residence
            </h3>
            <span className="text-xs text-slate-500">
              Mobile phone, mail ID (optional), and residential address
            </span>
          </div>

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
                placeholder="member@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-4.5">
            <label className={labelClass}>
              Residential Address <span className="text-red-600">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              placeholder="Door number, street name, locality, city, pincode"
              required
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Section 3: Church & Fellowship Details */}
          <div className="mt-7 mb-5 border-b border-slate-200 pb-2.5">
            <h3 className="m-0 mb-1 text-base sm:text-[1.05rem] text-green font-serif font-bold">
              3. Spiritual &amp; Fellowship Status
            </h3>
            <span className="text-xs text-slate-500">
              Baptism status, membership status, and medical info
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4.5">
            <div>
              <label className={labelClass}>Water Baptism</label>
              <select name="baptized" value={formData.baptized} onChange={handleChange} className={inputClass}>
                <option value="Yes">Yes (Baptized)</option>
                <option value="No">No (Not Yet)</option>
              </select>
            </div>
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
              <label className={labelClass}>Membership Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                <option value="Active">Active Believer</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4.5">
            <div>
              <label className={labelClass}>Occupation / Profession</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="e.g. Teacher, Engineer, Homemaker"
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
                placeholder="e.g. Spouse / Relative Phone"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-7">
            <label className={labelClass}>Ministry Roles / Remarks / Prayer Needs</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              placeholder="e.g. Choir member, Sunday School teacher, fasting prayer group..."
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-5 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate("/admin/members")}
              className="px-5 py-2.5 bg-slate-100 border border-slate-300 text-slate-600 rounded-lg cursor-pointer font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all"
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-7 py-2.5 bg-gradient-to-br from-green to-green-dark text-white rounded-lg font-bold text-sm flex items-center gap-2 shadow-[0_4px_14px_rgba(24,67,50,0.25)] hover:opacity-95 transition-all disabled:cursor-not-allowed disabled:opacity-75"
            >
              <FaSave /> {saving ? "Saving..." : isEdit ? "Save Changes" : "Enroll Church Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
