import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllMembersAdmin,
  deleteMember,
  toggleMemberStatus,
} from "../services/api";
import {
  FaUserPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaUserCheck,
  FaEye,
  FaTimes,
  FaPrint,
  FaWhatsapp,
  FaCalendarAlt,
  FaBirthdayCake,
  FaFilter,
} from "react-icons/fa";

export default function MemberManager() {
  const navigate = useNavigate();
  const location = useLocation();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [baptizedFilter, setBaptizedFilter] = useState("All");

  const [selectedMember, setSelectedMember] = useState(null); // For Details Modal

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getAllMembersAdmin(searchQuery, statusFilter, genderFilter, baptizedFilter);
      setMembers(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load church members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    if (location.state?.success) {
      setSuccess(location.state.success);
      window.history.replaceState({}, document.title);
      setTimeout(() => setSuccess(""), 4000);
    }
  }, [statusFilter, genderFilter, baptizedFilter, location.state]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove member "${name}" from the church registry?`)) return;
    try {
      await deleteMember(id);
      setSuccess(`Member "${name}" removed successfully.`);
      fetchMembers();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      alert("Failed to delete member: " + err.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleMemberStatus(id);
      fetchMembers();
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  // Local filter for instant client-side responsive search
  const filteredMembers = members.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) ||
      m.mobile?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.address?.toLowerCase().includes(q) ||
      m.occupation?.toLowerCase().includes(q)
    );
  });

  // Calculate metrics
  const totalCount = members.length;
  const activeCount = members.filter((m) => m.status === "Active").length;
  const baptizedCount = members.filter((m) => m.baptized === "Yes").length;
  const youthCount = members.filter((m) => m.age && m.age <= 30).length;
  const elderCount = members.filter((m) => m.age && m.age >= 50).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: 1250, margin: "0 auto" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              color: "#A88A42",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
            }}
          >
            SANCTUARY CONGREGATION REGISTRY
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "2rem",
              color: "#122D24",
              margin: "4px 0 0",
              fontWeight: 700,
            }}
          >
            Church Members List
          </h1>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={handlePrint}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 18px",
              background: "#FFFFFF",
              color: "#184332",
              border: "1.5px solid #CBD5E1",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
            title="Print member roster"
          >
            <FaPrint /> <span>Print Directory</span>
          </button>

          <button
            onClick={() => navigate("/admin/members/new")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 22px",
              background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
              color: "#FFFFFF",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(24, 67, 50, 0.25)",
            }}
          >
            <FaUserPlus /> <span>+ Add New Member</span>
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {success && (
        <div
          style={{
            background: "#DCFCE7",
            border: "1px solid #86EFAC",
            color: "#15803D",
            padding: "12px 18px",
            borderRadius: 8,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          style={{
            background: "#FEE2E2",
            border: "1px solid #FECACA",
            color: "#B91C1C",
            padding: "12px 18px",
            borderRadius: 8,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      )}

      {/* Metric Cards Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div style={statCardStyle}>
          <div style={{ color: "#64748B", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
            Total Members
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#184332", margin: "4px 0" }}>
            {totalCount}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Enrolled in sanctuary</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ color: "#16A34A", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
            Active Believers
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#16A34A", margin: "4px 0" }}>
            {activeCount}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Regular fellowship</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ color: "#2563EB", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
            Water Baptized
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#2563EB", margin: "4px 0" }}>
            {baptizedCount}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Baptized in Christ</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ color: "#D97706", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
            Youth &amp; Teens
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#D97706", margin: "4px 0" }}>
            {youthCount}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Age ≤ 30 Years</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ color: "#7C3AED", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
            Senior Elders
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#7C3AED", margin: "4px 0" }}>
            {elderCount}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Age ≥ 50 Years</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: 14,
          padding: "18px 20px",
          marginBottom: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
        }}
      >
        {/* Search Input */}
        <div style={{ position: "relative", minWidth: 280, flex: 1 }}>
          <FaSearch style={{ position: "absolute", left: 14, top: 12, color: "#94A3B8" }} />
          <input
            type="text"
            placeholder="Search by name, mobile, email, address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 38px",
              background: "#F8FAF9",
              border: "1.5px solid #CBD5E1",
              borderRadius: 8,
              fontSize: "0.9rem",
              color: "#1E293B",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Filter Controls */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {/* Status Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={selectFilterStyle}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>Gender:</span>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              style={selectFilterStyle}
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Baptism Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600 }}>Baptism:</span>
            <select
              value={baptizedFilter}
              onChange={(e) => setBaptizedFilter(e.target.value)}
              style={selectFilterStyle}
            >
              <option value="All">All</option>
              <option value="Yes">Baptized (Yes)</option>
              <option value="No">Not Yet (No)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1.5px solid #E2E8F0",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#184332", fontWeight: 600 }}>
            Loading church members registry...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "2.5rem", color: "#CBD5E1", marginBottom: 12 }}>👥</div>
            <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.3rem", color: "#122D24", margin: 0 }}>
              No church members found
            </h3>
            <p style={{ color: "#64748B", fontSize: "0.9rem", maxWidth: 400, margin: "8px auto 20px" }}>
              {searchQuery ? "Try different search terms or reset the filters." : "Start building your congregation roster by adding the first member."}
            </p>
            <button
              onClick={() => navigate("/admin/members/new")}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
              }}
            >
              + Add First Member
            </button>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "#F8FAF9", borderBottom: "2px solid #E2E8F0", color: "#184332" }}>
                  <th style={thStyle}>Member Name</th>
                  <th style={thStyle}>Age / DOB</th>
                  <th style={thStyle}>Contact Details</th>
                  <th style={thStyle}>Residential Address</th>
                  <th style={thStyle}>Baptism</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => {
                  const initials = member.name
                    ? member.name
                        .split(" ")
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "M";

                  const cleanPhone = member.mobile ? member.mobile.replace(/[^0-9+]/g, "") : "";

                  return (
                    <tr
                      key={member._id}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAF9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Name & Avatar */}
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              background: member.gender === "Female" ? "#FCE7F3" : "#E0E7FF",
                              color: member.gender === "Female" ? "#BE185D" : "#3730A3",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              border: "1.5px solid rgba(0,0,0,0.06)",
                            }}
                          >
                            {initials}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.92rem" }}>
                              {member.name}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#64748B", display: "flex", gap: 6, alignItems: "center" }}>
                              <span>{member.gender || "Member"}</span>
                              {member.maritalStatus && <span>• {member.maritalStatus}</span>}
                              {member.bloodGroup && (
                                <span
                                  style={{
                                    background: "#FEE2E2",
                                    color: "#DC2626",
                                    padding: "1px 6px",
                                    borderRadius: 4,
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  {member.bloodGroup}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Age / DOB */}
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: "#1E293B" }}>
                          {member.age ? `${member.age} yrs` : "—"}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                          {member.dob ? member.dob : "DOB not provided"}
                        </div>
                      </td>

                      {/* Contact Details */}
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                          <FaPhoneAlt style={{ fontSize: "0.72rem", color: "#16A34A" }} />
                          <a
                            href={`tel:${cleanPhone}`}
                            style={{ color: "#0F172A", textDecoration: "none", fontWeight: 600 }}
                          >
                            {member.mobile}
                          </a>
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone.replace("+", "")}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              style={{ color: "#25D366", fontSize: "0.95rem", display: "flex" }}
                            >
                              <FaWhatsapp />
                            </a>
                          )}
                        </div>
                        {member.email ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem" }}>
                            <FaEnvelope style={{ fontSize: "0.7rem", color: "#64748B" }} />
                            <a
                              href={`mailto:${member.email}`}
                              style={{ color: "#475569", textDecoration: "none" }}
                            >
                              {member.email}
                            </a>
                          </div>
                        ) : (
                          <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>No email</div>
                        )}
                      </td>

                      {/* Address */}
                      <td style={{ ...tdStyle, maxWidth: 220 }}>
                        <div
                          style={{
                            color: "#334155",
                            lineHeight: 1.4,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={member.address}
                        >
                          {member.address}
                        </div>
                        {member.occupation && (
                          <div style={{ fontSize: "0.74rem", color: "#64748B" }}>
                            💼 {member.occupation}
                          </div>
                        )}
                      </td>

                      {/* Baptism */}
                      <td style={tdStyle}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: 20,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            background: member.baptized === "Yes" ? "#E0F2FE" : "#F1F5F9",
                            color: member.baptized === "Yes" ? "#0284C7" : "#64748B",
                          }}
                        >
                          {member.baptized === "Yes" ? "✓ Baptized" : "Not Yet"}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={tdStyle}>
                        <button
                          onClick={() => handleToggleStatus(member._id)}
                          title="Click to toggle status"
                          style={{
                            background: member.status === "Active" ? "#DCFCE7" : "#FEE2E2",
                            color: member.status === "Active" ? "#16A34A" : "#DC2626",
                            border: "none",
                            borderRadius: 20,
                            padding: "4px 12px",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            transition: "all 0.15s",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: member.status === "Active" ? "#16A34A" : "#DC2626",
                            }}
                          />
                          <span>{member.status || "Active"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ ...tdStyle, textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: 6 }}>
                          <button
                            onClick={() => setSelectedMember(member)}
                            title="View Full Profile"
                            style={{
                              background: "#F1F5F9",
                              border: "1px solid #CBD5E1",
                              color: "#334155",
                              padding: "7px 10px",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontSize: "0.85rem",
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/members/edit/${member._id}`)}
                            title="Edit Member"
                            style={{
                              background: "#EAF3EE",
                              border: "1px solid #BBF7D0",
                              color: "#166534",
                              padding: "7px 10px",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontSize: "0.85rem",
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(member._id, member.name)}
                            title="Delete Member"
                            style={{
                              background: "#FEE2E2",
                              border: "1px solid #FECACA",
                              color: "#DC2626",
                              padding: "7px 10px",
                              borderRadius: 6,
                              cursor: "pointer",
                              fontSize: "0.85rem",
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(18, 45, 36, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 580,
              background: "#FFFFFF",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.25)",
              border: "1.5px solid #E2E8F0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
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
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#D6B66B",
                    color: "#184332",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedMember.name
                    ? selectedMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "M"}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontFamily: "var(--font-serif, serif)" }}>
                    {selectedMember.name}
                  </h3>
                  <span style={{ fontSize: "0.78rem", color: "#D6B66B" }}>
                    Church Member Profile • {selectedMember.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "#FFFFFF",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Profile Content */}
            <div style={{ padding: "24px 28px", maxHeight: "75vh", overflowY: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <div style={detailLabel}>Date of Birth</div>
                  <div style={detailVal}>{selectedMember.dob || "—"}</div>
                </div>
                <div>
                  <div style={detailLabel}>Age</div>
                  <div style={detailVal}>{selectedMember.age ? `${selectedMember.age} Years` : "—"}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <div style={detailLabel}>Gender</div>
                  <div style={detailVal}>{selectedMember.gender || "—"}</div>
                </div>
                <div>
                  <div style={detailLabel}>Marital Status</div>
                  <div style={detailVal}>{selectedMember.maritalStatus || "—"}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <div style={detailLabel}>Mobile Phone</div>
                  <div style={{ ...detailVal, color: "#16A34A", fontWeight: 700 }}>
                    {selectedMember.mobile}
                  </div>
                </div>
                <div>
                  <div style={detailLabel}>Mail ID (Optional)</div>
                  <div style={detailVal}>{selectedMember.email || "Not provided"}</div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={detailLabel}>Residential Address</div>
                <div style={{ ...detailVal, whiteSpace: "pre-line", lineHeight: 1.5 }}>
                  {selectedMember.address}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <div style={detailLabel}>Water Baptism</div>
                  <div style={detailVal}>{selectedMember.baptized === "Yes" ? "✓ Baptized" : "No"}</div>
                </div>
                <div>
                  <div style={detailLabel}>Blood Group</div>
                  <div style={detailVal}>{selectedMember.bloodGroup || "—"}</div>
                </div>
                <div>
                  <div style={detailLabel}>Enrolled Date</div>
                  <div style={detailVal}>{selectedMember.membershipDate || "—"}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <div style={detailLabel}>Occupation</div>
                  <div style={detailVal}>{selectedMember.occupation || "—"}</div>
                </div>
                <div>
                  <div style={detailLabel}>Emergency Contact</div>
                  <div style={detailVal}>{selectedMember.emergencyContact || "—"}</div>
                </div>
              </div>

              {selectedMember.notes && (
                <div style={{ marginTop: 14, background: "#F8FAF9", padding: "12px 16px", borderRadius: 8 }}>
                  <div style={detailLabel}>Ministry / Prayer Notes</div>
                  <div style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.5 }}>
                    {selectedMember.notes}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #E2E8F0",
                background: "#F8FAF9",
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              <button
                onClick={() => {
                  const id = selectedMember._id;
                  setSelectedMember(null);
                  navigate(`/admin/members/edit/${id}`);
                }}
                style={{
                  padding: "9px 18px",
                  background: "linear-gradient(135deg, #184332 0%, #122D24 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Edit Details
              </button>
              <button
                onClick={() => setSelectedMember(null)}
                style={{
                  padding: "9px 16px",
                  background: "#E2E8F0",
                  color: "#334155",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const statCardStyle = {
  background: "#FFFFFF",
  border: "1.5px solid #E2E8F0",
  borderRadius: 12,
  padding: "18px 20px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
};

const selectFilterStyle = {
  padding: "7px 12px",
  borderRadius: 6,
  border: "1.5px solid #CBD5E1",
  background: "#F8FAF9",
  color: "#334155",
  fontSize: "0.84rem",
  fontWeight: 600,
  outline: "none",
};

const thStyle = {
  padding: "14px 16px",
  fontWeight: 700,
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "14px 16px",
  verticalAlign: "middle",
};

const detailLabel = {
  fontSize: "0.74rem",
  fontWeight: 700,
  color: "#64748B",
  textTransform: "uppercase",
  marginBottom: 2,
};

const detailVal = {
  fontSize: "0.92rem",
  fontWeight: 600,
  color: "#0F172A",
};
