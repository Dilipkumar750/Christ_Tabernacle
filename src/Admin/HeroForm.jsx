import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllHeroSlidesAdmin, createHeroSlide, updateHeroSlide, uploadImageFile } from "../services/api";
import { FaArrowLeft, FaUpload, FaImages, FaSave, FaTimes } from "react-icons/fa";

const IS = { width:"100%", padding:"11px 14px", background:"#FFFFFF", border:"1.5px solid #CBD5E1", borderRadius:10, color:"#0F172A", fontSize:"0.94rem", outline:"none", boxSizing:"border-box" };
const LS = { display:"block", fontSize:"0.82rem", color:"#184332", fontWeight:700, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.3px" };

export default function HeroForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({ title:"", subtitle:"", tag:"", verse:"", actionText:"Plan a Visit", actionLink:"/contact", image:"", alt:"", order:1, isActive:true });

  useEffect(() => {
    if (isEdit) {
      getAllHeroSlidesAdmin()
        .then((slides) => {
          const slide = slides.find((s) => s._id === id);
          if (slide) setFormData({ title:slide.title||"", subtitle:slide.subtitle||"", tag:slide.tag||"", verse:slide.verse||"", actionText:slide.actionText||"Plan a Visit", actionLink:slide.actionLink||"/contact", image:slide.image||"", alt:slide.alt||"", order:slide.order||1, isActive:slide.isActive!==undefined?slide.isActive:true });
          else setError("Slide not found.");
        })
        .catch(() => setError("Failed to load slide data."))
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
      setFormData((prev) => ({ ...prev, image: imgUrl, alt: prev.alt || file.name.replace(/\.[^/.]+$/, "") })); 
    }
    catch (err) { alert("Upload failed: " + err.message); }
    finally { setUploadingImage(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle || !formData.image) { 
      setError("Please fill in Title, Subtitle, and provide an Image."); 
      return; 
    }
    try { 
      setSaving(true); 
      if (isEdit) {
        await updateHeroSlide(id, formData);
      } else {
        await createHeroSlide(formData);
      }
      navigate("/admin/hero", { state: { success: isEdit ? "Hero banner updated!" : "New hero banner created!" } }); 
    }
    catch (err) { setError("Failed to save: " + err.message); setSaving(false); }
  };

  if (loading) return <div style={{textAlign:"center",padding:"80px 0",color:"#184332",fontWeight:600}}>Loading slide data...</div>;

  return (
    <div style={{maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
        <button onClick={() => navigate("/admin/hero")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 16px",background:"#F1F5F9",border:"1.5px solid #CBD5E1",color:"#475569",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:"0.88rem"}}>
          <FaArrowLeft /> Back to Hero Banners
        </button>
        <div>
          <div style={{color:"#A88A42",fontSize:"0.8rem",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>HOMEPAGE DYNAMIC SECTION</div>
          <h1 style={{fontFamily:"var(--font-serif,serif)",fontSize:"1.7rem",color:"#122D24",margin:"2px 0 0",fontWeight:700}}>{isEdit?"Edit Hero Banner Slide":"Create New Hero Banner Slide"}</h1>
        </div>
      </div>
      {error && <div style={{background:"#FEF2F2",border:"1px solid #FCA5A5",color:"#B91C1C",padding:"12px 16px",borderRadius:10,marginBottom:20}}>{error}</div>}
      <div style={{background:"#FFFFFF",border:"1.5px solid #E2E8F0",borderRadius:16,padding:"32px 36px",boxShadow:"0 4px 20px rgba(0,0,0,0.04)"}}>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:20}}><label style={LS}>Hero Headline / Title *</label><input type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} placeholder="e.g. Christ's Tabernacle Prayer & Worship Centre" required style={IS}/></div>
          <div style={{marginBottom:20}}><label style={LS}>Subtitle / Mission Statement *</label><textarea rows={2} value={formData.subtitle} onChange={(e)=>setFormData({...formData,subtitle:e.target.value})} placeholder="e.g. A House of Prayer • A Place of Deliverance" required style={{...IS,resize:"vertical"}}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            <div><label style={LS}>Badge Tag</label><input type="text" value={formData.tag} onChange={(e)=>setFormData({...formData,tag:e.target.value})} placeholder="e.g. Established 1991" style={IS}/></div>
            <div><label style={LS}>Scripture Verse Reference</label><input type="text" value={formData.verse} onChange={(e)=>setFormData({...formData,verse:e.target.value})} placeholder="e.g. Isaiah 56:7" style={IS}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
            <div><label style={LS}>Action Button Label</label><input type="text" value={formData.actionText} onChange={(e)=>setFormData({...formData,actionText:e.target.value})} placeholder="e.g. Plan a Visit" style={IS}/></div>
            <div><label style={LS}>Action Button Route / URL</label><input type="text" value={formData.actionLink} onChange={(e)=>setFormData({...formData,actionLink:e.target.value})} placeholder="e.g. /contact" style={IS}/></div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={LS}>Banner Image Source *</label>
            <div style={{display:"flex",gap:10,marginBottom:10}}>
              <input type="text" value={formData.image} onChange={(e)=>setFormData({...formData,image:e.target.value})} placeholder="Paste image URL or upload a file" required style={{...IS,flex:1}}/>
              <label style={{padding:"10px 16px",background:"#EAF3EE",border:"1.5px solid #184332",color:"#184332",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:"0.88rem",fontWeight:700,whiteSpace:"nowrap"}}>
                <FaUpload/>{uploadingImage?"Uploading...":"Upload File"}<input type="file" accept="image/*" onChange={handleFileUpload} style={{display:"none"}}/>
              </label>
            </div>
            {formData.image&&<div style={{borderRadius:10,overflow:"hidden",height:160,border:"1.5px solid #E2E8F0",position:"relative"}}><img src={formData.image} alt="Preview" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={(e)=>(e.target.style.display="none")}/><span style={{position:"absolute",bottom:8,left:10,background:"rgba(18,45,36,0.85)",color:"#FAF6EE",fontSize:"0.72rem",fontWeight:600,padding:"2px 8px",borderRadius:4}}><FaImages style={{marginRight:4}}/>Live Preview</span></div>}
          </div>
          <div style={{marginBottom:20}}><label style={LS}>Image Alt Text</label><input type="text" value={formData.alt} onChange={(e)=>setFormData({...formData,alt:e.target.value})} placeholder="e.g. Church sanctuary Sunday worship service" style={IS}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:28}}>
            <div><label style={LS}>Display Order Sequence</label><input type="number" value={formData.order} onChange={(e)=>setFormData({...formData,order:Number(e.target.value)})} min={1} style={IS}/></div>
            <div style={{display:"flex",alignItems:"center",gap:10,paddingTop:26}}>
              <input type="checkbox" id="heroIsActive" checked={formData.isActive} onChange={(e)=>setFormData({...formData,isActive:e.target.checked})} style={{width:20,height:20,accentColor:"#184332",cursor:"pointer"}}/>
              <label htmlFor="heroIsActive" style={{fontSize:"0.94rem",color:"#122D24",fontWeight:600,cursor:"pointer"}}>Publish on Public Homepage</label>
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",gap:12,paddingTop:20,borderTop:"1px solid #E2E8F0"}}>
            <button type="button" onClick={()=>navigate("/admin/hero")} style={{padding:"11px 22px",background:"#F1F5F9",border:"1px solid #CBD5E1",color:"#475569",borderRadius:8,cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",gap:8}}><FaTimes/>Cancel</button>
            <button type="submit" disabled={saving} style={{padding:"11px 26px",background:"linear-gradient(135deg,#184332 0%,#122D24 100%)",color:"#FFFFFF",border:"none",borderRadius:8,cursor:saving?"not-allowed":"pointer",fontWeight:700,boxShadow:"0 4px 14px rgba(24,67,50,0.25)",opacity:saving?0.75:1,display:"flex",alignItems:"center",gap:8}}><FaSave/>{saving?"Saving...":isEdit?"Save Changes":"Create Slide"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
