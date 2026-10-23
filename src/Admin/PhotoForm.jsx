import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPhotosAdmin, createPhoto, updatePhoto, uploadImageFile } from "../services/api";
import { FaArrowLeft, FaUpload, FaImages, FaSave, FaTimes, FaStar } from "react-icons/fa";

const CATEGORIES = ["Sanctuary","Worship","Prayer","Scripture","Youth","Events","Fellowship"];
const IS = { width:"100%", padding:"11px 14px", background:"#FFFFFF", border:"1.5px solid #CBD5E1", borderRadius:10, color:"#0F172A", fontSize:"0.94rem", outline:"none", boxSizing:"border-box" };
const LS = { display:"block", fontSize:"0.82rem", color:"#184332", fontWeight:700, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.3px" };

export default function PhotoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({ title:"", category:"Sanctuary", image:"", caption:"", date:new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"}), isFeatured:false, order:1 });

  useEffect(() => {
    if (isEdit) {
      getAllPhotosAdmin()
        .then((photos) => {
          const photo = photos.find((p) => p._id === id);
          if (photo) setFormData({ title:photo.title||"", category:photo.category||"Sanctuary", image:photo.image||"", caption:photo.caption||"", date:photo.date||"", isFeatured:photo.isFeatured||false, order:photo.order||1 });
          else setError("Photo not found.");
        })
        .catch(() => setError("Failed to load photo data."))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try { 
      setUploadingImage(true); 
      const res = await uploadImageFile(file); 
      const imgUrl = res?.fileUrl || res?.url;
      setFormData((prev) => ({ ...prev, image: imgUrl, title: prev.title || file.name.replace(/\.[^/.]+$/, "") })); 
    }
    catch (err) { alert("Upload failed: " + err.message); }
    finally { setUploadingImage(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) { setError("Please provide a Photo Title and an Image."); return; }
    try { 
      setSaving(true); 
      if (isEdit) {
        await updatePhoto(id, formData);
      } else {
        await createPhoto(formData);
      }
      navigate("/admin/gallery", { state: { success: isEdit ? "Photo updated!" : "New photo added to gallery!" } }); 
    }
    catch (err) { setError("Failed to save: " + err.message); setSaving(false); }
  };

  if (loading) return <div style={{textAlign:"center",padding:"80px 0",color:"#184332",fontWeight:600}}>Loading photo data...</div>;

  return (
    <div style={{maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
        <button onClick={()=>navigate("/admin/gallery")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 16px",background:"#F1F5F9",border:"1.5px solid #CBD5E1",color:"#475569",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:"0.88rem"}}>
          <FaArrowLeft/>Back to Gallery
        </button>
        <div>
          <div style={{color:"#A88A42",fontSize:"0.8rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>CHURCH MEDIA & MEMORIES</div>
          <h1 style={{fontFamily:"var(--font-serif,serif)",fontSize:"1.7rem",color:"#122D24",margin:"2px 0 0",fontWeight:700}}>{isEdit?"Edit Gallery Photo":"Add New Gallery Photo"}</h1>
        </div>
      </div>
      {error&&<div style={{background:"#FEF2F2",border:"1px solid #FCA5A5",color:"#B91C1C",padding:"12px 16px",borderRadius:10,marginBottom:20}}>{error}</div>}
      <div style={{background:"#FFFFFF",border:"1.5px solid #E2E8F0",borderRadius:16,padding:"32px 36px",boxShadow:"0 4px 20px rgba(0,0,0,0.04)"}}>
        <form onSubmit={handleSubmit}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:20}}>
            <div><label style={LS}>Photo Title *</label><input type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} placeholder="e.g. Sunday Worship Service 2026" required style={IS}/></div>
            <div><label style={LS}>Category</label>
              <select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} style={IS}>
                {CATEGORIES.map((c)=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={LS}>Gallery Image *</label>
            <div style={{display:"flex",gap:10,marginBottom:10}}>
              <input type="text" value={formData.image} onChange={(e)=>setFormData({...formData,image:e.target.value})} placeholder="Paste image URL or upload a file" required style={{...IS,flex:1}}/>
              <label style={{padding:"10px 16px",background:"#EAF3EE",border:"1.5px solid #184332",color:"#184332",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:"0.88rem",fontWeight:700,whiteSpace:"nowrap"}}>
                <FaUpload/>{uploadingImage?"Uploading...":"Upload File"}<input type="file" accept="image/*" onChange={handleFileUpload} style={{display:"none"}}/>
              </label>
            </div>
            {formData.image&&(
              <div style={{borderRadius:10,overflow:"hidden",height:220,border:"1.5px solid #E2E8F0",position:"relative"}}>
                <img src={formData.image} alt="Preview" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={(e)=>(e.target.style.display="none")}/>
                <span style={{position:"absolute",bottom:8,left:10,background:"rgba(18,45,36,0.85)",color:"#FAF6EE",fontSize:"0.72rem",fontWeight:600,padding:"2px 8px",borderRadius:4}}><FaImages style={{marginRight:4}}/>Photo Preview</span>
              </div>
            )}
          </div>
          <div style={{marginBottom:20}}><label style={LS}>Caption / Description</label><textarea rows={2} value={formData.caption} onChange={(e)=>setFormData({...formData,caption:e.target.value})} placeholder="e.g. Congregation gathered for Sunday morning prayer and worship..." style={{...IS,resize:"vertical"}}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:28}}>
            <div><label style={LS}>Date / Month</label><input type="text" value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} placeholder="e.g. October 2026" style={IS}/></div>
            <div><label style={LS}>Display Order</label><input type="number" value={formData.order} onChange={(e)=>setFormData({...formData,order:Number(e.target.value)})} min={1} style={IS}/></div>
            <div style={{display:"flex",alignItems:"center",gap:10,paddingTop:26}}>
              <input type="checkbox" id="photoFeatured" checked={formData.isFeatured} onChange={(e)=>setFormData({...formData,isFeatured:e.target.checked})} style={{width:20,height:20,accentColor:"#184332",cursor:"pointer"}}/>
              <label htmlFor="photoFeatured" style={{fontSize:"0.94rem",color:"#122D24",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><FaStar style={{color:"#D97706"}}/>Feature Photo</label>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingTop:20,borderTop:"1px solid #E2E8F0"}}>
            <button type="button" onClick={()=>navigate("/admin/gallery")} style={{padding:"11px 22px",background:"#F1F5F9",border:"1px solid #CBD5E1",color:"#475569",borderRadius:8,cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",gap:8}}><FaTimes/>Cancel</button>
            <button type="submit" disabled={saving} style={{padding:"11px 26px",background:"linear-gradient(135deg,#184332 0%,#122D24 100%)",color:"#FFFFFF",border:"none",borderRadius:8,cursor:saving?"not-allowed":"pointer",fontWeight:700,boxShadow:"0 4px 14px rgba(24,67,50,0.25)",opacity:saving?0.75:1,display:"flex",alignItems:"center",gap:8}}><FaSave/>{saving?"Saving...":isEdit?"Save Changes":"Add to Gallery"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
