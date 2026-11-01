import { useState } from "react";
import logoImg from "../../assets/logo.jpeg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "Healing",
    message: "",
    confidential: true,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#FAF8F5] border border-[#184332]/20 rounded-xl text-sm text-[#112218] focus:outline-none focus:ring-2 focus:ring-[#D6B66B]/40 focus:border-[#D6B66B] transition-all";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#184332] mb-1.5";

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-16 font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0C2419] via-[#184332] to-[#276D52] text-white py-14 sm:py-18 px-5 text-center relative border-b-2 border-[#D6B66B]" aria-labelledby="contact-title">
        <div className="flex justify-center mb-4">
          <img
            src={logoImg}
            alt="Christ's Tabernacle Emblem"
            className="w-20 h-20 rounded-full border-2 border-[#D6B66B] shadow-lg object-cover bg-white"
          />
        </div>
        <div className="text-xs uppercase tracking-widest text-[#E8CC8F] font-bold mb-2">
          † We Are Here to Pray With You †
        </div>
        <h1 id="contact-title" className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-3 leading-tight">
          Connect <span className="text-[#F5E0B0]">With Us</span>
        </h1>
        <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." — Philippians 4:6
        </p>
      </section>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-9 items-start">
          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-[#D6B66B]/35 p-6 sm:p-9 shadow-md">
            {formSubmitted ? (
              <div className="text-center py-10 px-4">
                <span className="text-5xl block mb-3">🙏</span>
                <h3 className="font-serif text-2xl text-[#122D24] mb-2 font-bold">
                  Your Prayer Request is Received
                </h3>
                <p className="text-[#4A6355] text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
                  Pastor Saravanan Immanuel and our dedicated intercessory team will hold your request in prayer before the altar of God. May the Lord bring peace, healing, and answer your heart's cry!
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", contact: "", category: "Healing", message: "", confidential: true });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#E0C47A] via-[#D6B66B] to-[#A88A42] text-[#122D24] shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Submit Another Prayer Request
                </button>
              </div>
            ) : (
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#184332]/10 text-[#184332] border border-[#D6B66B]/30 mb-3">
                  † Altar of Intercession †
                </span>
                <h2 className="font-serif text-2xl text-[#122D24] font-bold mb-2">
                  Send a Prayer Request or Message
                </h2>
                <p className="text-[#4A6355] text-sm mb-6 leading-relaxed">
                  Our pastoral care team intercedes daily for each request received. Please share how we can stand in faith with you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Peter"
                        className={inputClass}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone or Email</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +91 98765 43210"
                        className={inputClass}
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Prayer Need Category</label>
                    <select
                      className={inputClass}
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Healing">Divine Healing &amp; Health</option>
                      <option value="Deliverance">Spiritual Deliverance &amp; Peace</option>
                      <option value="Family">Family, Marriage &amp; Children</option>
                      <option value="Breakthrough">Financial / Job Breakthrough</option>
                      <option value="Salvation">Salvation &amp; Life Guidance</option>
                      <option value="General">General Inquiry or Pastoral Visit</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Your Prayer Request</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please share details of your prayer need or question..."
                      className={`${inputClass} resize-none`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="confidential"
                      checked={formData.confidential}
                      onChange={(e) => setFormData({ ...formData, confidential: e.target.checked })}
                      className="rounded border-slate-300 text-[#184332] focus:ring-[#D6B66B]"
                    />
                    <label htmlFor="confidential" className="text-xs text-[#4A6355] cursor-pointer">
                      Keep this request strictly confidential between pastors only
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#184332] to-[#122D24] text-[#D6B66B] border border-[#D6B66B] shadow-md hover:bg-[#D6B66B] hover:text-[#122D24] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>🙏 Send Prayer Request to Pastors</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl border border-[#D6B66B]/25 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#184332]/10 text-[#184332] border border-[#D6B66B]/30 mb-2">
                † Visit Our Sanctuary †
              </span>
              <h3 className="font-serif text-xl text-[#122D24] font-bold">
                Christ's Tabernacle Church
              </h3>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0C2419] to-[#184332] text-[#F5E0B0] flex items-center justify-center text-lg shrink-0 border border-[#D6B66B]" aria-hidden="true">
                📍
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#122D24] mb-0.5">Church Address</h4>
                <p className="text-xs text-[#4A6355] leading-relaxed m-0">
                  Christ's Tabernacle — Prayer &amp; Worship Centre<br />
                  Chennai, Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0C2419] to-[#184332] text-[#F5E0B0] flex items-center justify-center text-lg shrink-0 border border-[#D6B66B]" aria-hidden="true">
                🕒
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#122D24] mb-0.5">Service Hours</h4>
                <p className="text-xs text-[#4A6355] leading-relaxed m-0">
                  <strong className="text-[#184332]">Sunday Worship:</strong> 8:15 AM – 11:15 AM<br />
                  <strong className="text-[#184332]">Fasting Vigils:</strong> New &amp; Full Moon Days<br />
                  <strong className="text-[#184332]">Evening Prayer:</strong> 7:00 PM – 8:30 PM
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0C2419] to-[#184332] text-[#F5E0B0] flex items-center justify-center text-lg shrink-0 border border-[#D6B66B]" aria-hidden="true">
                📞
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#122D24] mb-0.5">Pastoral Helpline</h4>
                <p className="text-xs text-[#4A6355] leading-relaxed m-0">
                  Available for emergency hospital visits, home blessings, and prayer counseling.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-[#122D24] mb-2">Connect on Social Media</h4>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold border border-[#D6B66B]/30 bg-[#FAF6EE] text-[#184332]">📺 YouTube</span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold border border-[#D6B66B]/30 bg-[#FAF6EE] text-[#184332]">📘 Facebook</span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold border border-[#D6B66B]/30 bg-[#FAF6EE] text-[#184332]">📷 Instagram</span>
              </div>
            </div>

            <div className="bg-[#D6B66B]/10 border border-[#D6B66B]/35 rounded-xl p-4 text-xs italic text-[#184332] leading-relaxed">
              "The LORD bless you and keep you; the LORD make His face shine upon you, and be gracious to you."
              <cite className="block not-italic font-bold text-[#A88A42] mt-1 text-[11px] uppercase tracking-wider">— Numbers 6:24–25</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
