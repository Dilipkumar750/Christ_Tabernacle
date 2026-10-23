import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllTestimonialsAdmin, createTestimonial, updateTestimonial } from "../services/api";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

const CATEGORIES = ["Healing","Deliverance","Family","Breakthrough","Prayer","Salvation","General"];
const IS = { width:"100%", padding:"11px 14px", background:"#FFFFFF", border:"1.5px solid #CBD5E1", borderRadius:10, color:"#0F172A", fontSize:"0.94rem", outline:"none", boxSizing:"border-box" };
const LS = { display:"block", fontSize:"0.82rem", color:"#184332", fontWeight:700, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.3px" };

export default function TestimonialForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name:"", location:"Chennai, India", category:"Healing", title:"", story:"", verse:"", date:new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"}), isApproved:true, isFeatured:false });

  useEffect(() => {
    if (isEdit) {
      getAllTestimonialsAdmin()
        .then((items) => {
          const item = items.find((t) => t._id === id);
          if (item) setFormData({ name:item.name||"", location:item.location||"", category:item.category||"Healing", title:item.title||"", story:item.story||"", verse:item.verse||"", date:item.date||"", isApproved:item.isApproved!==undefined?item.isApproved:true, isFeatured:item.isFeatured||false });
          else setError("Testimony not found.");
        })
        .catch(() => setError("Failed to load testimony."))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.story) { setError("Please fill in Member Name, Title, and Testimony Story."); return; }
    try { 
      setSaving(true); 
      if (isEdit) {
        await updateTestimonial(id, formData);
      } else {
        await createTestimonial(formData);
      }
      navigate("/admin/testimonials", { state: { success: isEdit ? "Testimony updated!" : "New testimony saved!" } }); 
    }
    catch (err) { setError("Failed to save: " + err.message); setSaving(false); }
  };

  if (loading) return <div style={{textAlign:"center",padding:"80px 0",color:"#184332",fontWeight:600}}>Loading testimony data...</div>;

  return (
    <div style={{maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
        <button onClick={()=>navigate("/admin/testimonials")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 16px",background:"#F1F5F9",border:"1.5px solid #CBD5E1",color:"#475569",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:"0.88rem"}}>
          <FaArrowLeft/>Back to Testimonies
        </button>
        <div>
          <div style={{color:"#A88A42",fontSize:"0.8rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>CONGREGATION PRAISE & BLESSINGS</div>
          <h1 style={{fontFamily:"var(--font-serif,serif)",fontSize:"1.7rem",color:"#122D24",margin:"2px 0 0",fontWeight:700}}>{isEdit?"Edit Testimony":"Record New Testimony of Grace"}</h1>
        </div>
      </div>
      {error&&<div style={{background:"#FEF2F2",border:"1px solid #FCA5A5",color:"#B91C1C",padding:"12px 16px",borderRadius:10,marginBottom:20}}>{error}</div>}
      <div style={{background:"#FFFFFF",border:"1.5px solid #E2E8F0",borderRadius:16,padding:"32px 36px",boxShadow:"0 4px 20px rgba(0,0,0,0.04)"}}>
        <form onSubmit={handleSubmit}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            <div><label style={LS}>Testifier Name *</label><input type="text" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} placeholder="e.g. Sister Hannah D." required style={IS}/></div>
            <div><label style={LS}>City / Location</label><input type="text" value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})} placeholder="e.g. Chennai, India" style={IS}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            <div><label style={LS}>Category *</label>
              <select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} style={IS}>
                {CATEGORIES.map((c)=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label style={LS}>Date Recorded</label><input type="text" value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} placeholder="e.g. October 2026" style={IS}/></div>
          </div>
          <div style={{marginBottom:20}}><label style={LS}>Testimony Title / Miracle Headline *</label><input type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} placeholder="e.g. Miraculous Healing from Chronic Illness" required style={IS}/></div>
          <div style={{marginBottom:20}}><label style={LS}>Full Testimony Story *</label><textarea rows={6} value={formData.story} onChange={(e)=>setFormData({...formData,story:e.target.value})} placeholder="Write the full miracle testimony..." required style={{...IS,resize:"vertical",lineHeight:1.6}}/></div>
          <div style={{marginBottom:24}}><label style={LS}>Scripture Verse of Praise</label><input type="text" value={formData.verse} onChange={(e)=>setFormData({...formData,verse:e.target.value})} placeholder="e.g. Jeremiah 30:17" style={IS}/></div>
          <div style={{display:"flex",gap:28,marginBottom:28,flexWrap:"wrap"}}>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#122D24",fontWeight:600}}>
              <input type="checkbox" checked={formData.isApproved} onChange={(e)=>setFormData({...formData,isApproved:e.target.checked})} style={{width:20,height:20,accentColor:"#184332"}}/>
              <span>Publish to Congregation</span>
            </label>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#122D24",fontWeight:600}}>
              <input type="checkbox" checked={formData.isFeatured} onChange={(e)=>setFormData({...formData,isFeatured:e.target.checked})} style={{width:20,height:20,accentColor:"#184332"}}/>
              <span>Feature on Highlights</span>
            </label>
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingTop:20,borderTop:"1px solid #E2E8F0"}}>
            <button type="button" onClick={()=>navigate("/admin/testimonials")} style={{padding:"11px 22px",background:"#F1F5F9",border:"1px solid #CBD5E1",color:"#475569",borderRadius:8,cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",gap:8}}><FaTimes/>Cancel</button>
            <button type="submit" disabled={saving} style={{padding:"11px 26px",background:"linear-gradient(135deg,#184332 0%,#122D24 100%)",color:"#FFFFFF",border:"none",borderRadius:8,cursor:saving?"not-allowed":"pointer",fontWeight:700,boxShadow:"0 4px 14px rgba(24,67,50,0.25)",opacity:saving?0.75:1,display:"flex",alignItems:"center",gap:8}}><FaSave/>{saving?"Saving...":isEdit?"Save Changes":"Publish Testimony"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
