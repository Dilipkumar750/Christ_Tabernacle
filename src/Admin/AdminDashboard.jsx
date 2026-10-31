import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authGetStats, toggleApproveTestimonial } from '../services/api';
import {
  FaImages,
  FaComments,
  FaCameraRetro,
  FaMusic,
  FaPlus,
  FaCheck,
  FaTimes,
  FaSync,
  FaUserFriends,
  FaUserPlus,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await authGetStats();
      setData(res);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const handleQuickToggleTestimonial = async (id) => {
    try {
      await toggleApproveTestimonial(id);
      fetchStats();
    } catch (err) {
      alert('Failed to update testimony approval: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-green">
        <div className="w-10 h-10 border-[3px] border-slate-200 border-t-green rounded-full animate-spin mx-auto mb-4" />
        <p className="font-semibold">Loading Sanctuary Dashboard metrics...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    hero: { total: 0, active: 0 },
    testimonials: { total: 0, approved: 0, pending: 0 },
    gallery: { total: 0 },
    lyrics: { total: 0 },
    members: { total: 0, active: 0 },
  };

  const recent = data?.recent || {
    testimonials: [],
    photos: [],
    songs: [],
    members: [],
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Top Banner Greeting */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-5 mb-8 shadow-sm">
        <div>
          <div className="text-gold-dark text-xs sm:text-[0.84rem] font-bold tracking-wider uppercase">
            CHRIST'S TABERNACLE ADMINISTRATION
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-green-dark my-1.5 font-bold">
            Welcome, Sanctuary Administrator
          </h1>
          <p className="text-slate-600 m-0 text-sm sm:text-[0.95rem] max-w-[680px]">
            Manage and publish dynamic hero slides, congregation testimonies, sanctuary gallery archives, and worship song videos in real time.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-[#EAF3EE] border border-green text-green rounded-lg cursor-pointer font-bold text-sm transition-all hover:bg-green hover:text-white"
          >
            <FaSync className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh Stats</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 font-medium text-sm">
          {error}
        </div>
      )}

      {/* 5 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4.5 mb-9">
        {/* Card 0: Church Members */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-green-700 uppercase tracking-wider font-bold">
                Church Members
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-green-dark mt-1">
                {stats.members?.total || 0}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#EAF3EE] text-green flex items-center justify-center text-xl flex-shrink-0">
              <FaUserFriends />
            </div>
          </div>
          <div className="mt-4.5 pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[0.84rem]">
            <span className="text-emerald-700 font-semibold">
              ● {stats.members?.active !== undefined ? `${stats.members.active} Active` : 'Active Congregation'}
            </span>
            <Link to="/admin/members" className="text-green no-underline font-bold hover:underline">
              View All →
            </Link>
          </div>
        </div>

        {/* Card 1: Hero Banners */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Hero Banners
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-green-dark mt-1">
                {stats.hero.total}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-[#EAF3EE] text-green flex items-center justify-center text-xl flex-shrink-0">
              <FaImages />
            </div>
          </div>
          <div className="mt-4.5 pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[0.84rem]">
            <span className="text-emerald-700 font-semibold">● {stats.hero.active} Active on Home</span>
            <Link to="/admin/hero" className="text-green no-underline font-bold hover:underline">
              Manage →
            </Link>
          </div>
        </div>

        {/* Card 2: Testimonials */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Testimonies
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-green-dark mt-1">
                {stats.testimonials.total}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-pink-50 text-pink-700 flex items-center justify-center text-xl flex-shrink-0">
              <FaComments />
            </div>
          </div>
          <div className="mt-4.5 pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[0.84rem]">
            <span className={stats.testimonials.pending > 0 ? 'text-amber-700 font-semibold' : 'text-emerald-700 font-semibold'}>
              {stats.testimonials.pending > 0
                ? `● ${stats.testimonials.pending} Pending Review`
                : `● ${stats.testimonials.approved} Published`}
            </span>
            <Link to="/admin/testimonials" className="text-green no-underline font-bold hover:underline">
              Review →
            </Link>
          </div>
        </div>

        {/* Card 3: Photo Gallery */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Photo Gallery
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-green-dark mt-1">
                {stats.gallery.total}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xl flex-shrink-0">
              <FaCameraRetro />
            </div>
          </div>
          <div className="mt-4.5 pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[0.84rem]">
            <span className="text-emerald-700 font-semibold">● All Albums Active</span>
            <Link to="/admin/gallery" className="text-green no-underline font-bold hover:underline">
              Upload →
            </Link>
          </div>
        </div>

        {/* Card 4: Worship Lyrics */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Worship Songs &amp; Videos
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-green-dark mt-1">
                {stats.lyrics.total}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-xl flex-shrink-0">
              <FaMusic />
            </div>
          </div>
          <div className="mt-4.5 pt-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[0.84rem]">
            <span className="text-emerald-700 font-semibold">● YouTube &amp; Lyrics</span>
            <Link to="/admin/lyrics" className="text-green no-underline font-bold hover:underline">
              Edit →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-9">
        <h3 className="text-lg sm:text-[1.15rem] text-green-dark mb-3.5 font-bold font-serif">
          Quick Management Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/members/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-br from-green to-green-dark text-white rounded-lg font-bold text-sm no-underline shadow-[0_4px_12px_rgba(24,67,50,0.2)] hover:opacity-95 transition-all"
          >
            <FaUserPlus /> <span>+ Add New Member</span>
          </Link>

          <Link
            to="/admin/hero?action=new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-green text-green rounded-lg font-bold text-sm no-underline shadow-sm hover:bg-green hover:text-white transition-all"
          >
            <FaPlus /> <span>New Hero Banner</span>
          </Link>

          <Link
            to="/admin/testimonials?action=new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-green text-green rounded-lg font-bold text-sm no-underline shadow-sm hover:bg-green hover:text-white transition-all"
          >
            <FaPlus /> <span>Add Testimony</span>
          </Link>

          <Link
            to="/admin/gallery?action=new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-green text-green rounded-lg font-bold text-sm no-underline shadow-sm hover:bg-green hover:text-white transition-all"
          >
            <FaPlus /> <span>Upload Gallery Photo</span>
          </Link>

          <Link
            to="/admin/lyrics?action=new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-green text-green rounded-lg font-bold text-sm no-underline shadow-sm hover:bg-green hover:text-white transition-all"
          >
            <FaPlus /> <span>Add Worship Video &amp; Lyrics</span>
          </Link>
        </div>
      </div>

      {/* Split Section: Recent Testimonials & Recent Photos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recent Testimonies */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4.5">
            <h3 className="m-0 text-lg sm:text-[1.18rem] text-green-dark font-serif font-bold">
              Recent Testimonies
            </h3>
            <Link to="/admin/testimonials" className="text-green text-sm no-underline font-bold hover:underline">
              View All →
            </Link>
          </div>

          {recent.testimonials?.length === 0 ? (
            <p className="text-slate-500 text-sm">No testimonies submitted yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recent.testimonials.map((t) => (
                <div
                  key={t._id}
                  className="bg-[#F8FAF9] border border-slate-200 rounded-lg p-3.5 sm:px-4 flex items-center justify-between gap-3"
                >
                  <div className="max-w-[70%]">
                    <div className="font-bold text-green-dark text-sm truncate">{t.title}</div>
                    <div className="text-xs text-slate-500 mt-1 truncate">
                      By <strong className="text-green">{t.name}</strong> • {t.category} • {t.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleQuickToggleTestimonial(t._id)}
                      title={t.isApproved ? 'Click to unpublish' : 'Click to approve & publish'}
                      className={`px-3 py-1.5 rounded-md cursor-pointer text-xs font-bold flex items-center gap-1.5 transition-all border ${
                        t.isApproved
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : 'bg-amber-100 border-amber-300 text-amber-800'
                      }`}
                    >
                      {t.isApproved ? <FaCheck /> : <FaTimes />}
                      <span>{t.isApproved ? 'Approved' : 'Pending'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Photos in Gallery */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4.5">
            <h3 className="m-0 text-lg sm:text-[1.18rem] text-green-dark font-serif font-bold">
              Recent Gallery Images
            </h3>
            <Link to="/admin/gallery" className="text-green text-sm no-underline font-bold hover:underline">
              View All →
            </Link>
          </div>

          {recent.photos?.length === 0 ? (
            <p className="text-slate-500 text-sm">No gallery photos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {recent.photos.map((p) => (
                <div
                  key={p._id}
                  className="relative rounded-lg overflow-hidden h-[120px] border border-slate-200"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1548625361-125dd14d18ce?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/90 via-transparent to-transparent flex flex-col justify-end p-2.5">
                    <span className="text-[0.82rem] font-bold text-white leading-tight truncate">
                      {p.title}
                    </span>
                    <span className="text-[0.7rem] text-gold-light truncate">{p.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
