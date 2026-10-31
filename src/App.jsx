import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';

// Public Pages
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Journey from './Pages/About/Journey';
import Motto from './Pages/About/Motto';
import Vision from './Pages/About/Vision';
import Mission from './Pages/About/Mission';
import Faith from './Pages/About/Faith';
import Testimonials from './Pages/Testimonials/Testimonials';
import Photos from './Pages/Media/Photos';
import Songs from './Pages/Songs/Songs';
import Lyrics from './Pages/Songs/Lyrics';
import Sermons from './Pages/Sermons/Sermons';
import BibleStudy from './Pages/Sermons/BibleStudy';
import SundaySermons from './Pages/Sermons/SundaySermons';
import Prayers from './Pages/Prayers/Prayers';
import SundayServices from './Pages/Prayers/SundayServices';
import Fasting from './Pages/Prayers/Fasting';
import Transformation from './Pages/Prayers/Transformation';
import Discipleship from './Pages/Prayers/Discipleship';
import SundaySchool from './Pages/Prayers/SundaySchool';
import Contact from './Pages/Contact/Contact';
import JoinMembership from './Pages/JoinMembership';

// Admin System
import { AdminAuthProvider } from './Admin/AdminAuthContext';
import ProtectedRoute from './Admin/ProtectedRoute';
import AdminLayout from './Admin/AdminLayout';
import AdminLogin from './Admin/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import MemberManager from './Admin/MemberManager';
import MemberForm from './Admin/MemberForm';
import HeroManager from './Admin/HeroManager';
import HeroForm from './Admin/HeroForm';
import TestimonialManager from './Admin/TestimonialManager';
import TestimonialForm from './Admin/TestimonialForm';
import PhotoManager from './Admin/PhotoManager';
import PhotoForm from './Admin/PhotoForm';
import LyricsManager from './Admin/LyricsManager';
import LyricsForm from './Admin/LyricsForm';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPath && <Header />}
      <main id="main-content">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />

          {/* About — nested sub-routes */}
          <Route path="/about" element={<About />}>
            <Route path="journey" element={<Journey />} />
            <Route path="motto" element={<Motto />} />
            <Route path="vision" element={<Vision />} />
            <Route path="mission" element={<Mission />} />
            <Route path="faith" element={<Faith />} />
          </Route>

          <Route path="/testimonies" element={<Testimonials />} />

          <Route path="/media/photos" element={<Photos />} />
          <Route path="/media" element={<Photos />} />

          {/* Songs — with /songs/lyrics and /songs/lyrics/:id routing */}
          <Route path="/songs" element={<Songs />}>
            <Route index element={<Lyrics />} />
            <Route path="lyrics" element={<Lyrics />} />
            <Route path="lyrics/:id" element={<Lyrics />} />
            <Route path="audio" element={<Navigate to="/songs/lyrics" replace />} />
          </Route>

          {/* Sermons */}
          <Route path="/sermons" element={<Sermons />}>
            <Route path="bible-study" element={<BibleStudy />} />
            <Route path="sunday" element={<SundaySermons />} />
          </Route>

          {/* Prayers & Worship */}
          <Route path="/prayers" element={<Prayers />}>
            <Route path="sunday-services" element={<SundayServices />} />
            <Route path="fasting" element={<Fasting />} />
            <Route path="transformation" element={<Transformation />} />
            <Route path="discipleship" element={<Discipleship />} />
            <Route path="sunday-school" element={<SundaySchool />} />
          </Route>

          <Route path="/contact" element={<Contact />} />
          <Route path="/join-membership" element={<JoinMembership />} />
          <Route path="/add-member" element={<JoinMembership />} />

          {/* Direct Route Aliases for smooth navigation across all sections */}
          <Route path="/journey" element={<Navigate to="/about/journey" replace />} />
          <Route path="/motto" element={<Navigate to="/about/motto" replace />} />
          <Route path="/vision" element={<Navigate to="/about/vision" replace />} />
          <Route path="/mission" element={<Navigate to="/about/mission" replace />} />
          <Route path="/faith" element={<Navigate to="/about/faith" replace />} />
          <Route path="/testimonials" element={<Navigate to="/testimonies" replace />} />
          <Route path="/photos" element={<Navigate to="/media/photos" replace />} />
          <Route path="/gallery" element={<Navigate to="/media/photos" replace />} />
          <Route path="/videos" element={<Navigate to="/media/photos" replace />} />
          <Route path="/lyrics" element={<Navigate to="/songs/lyrics" replace />} />
          <Route path="/biblestudy" element={<Navigate to="/sermons/bible-study" replace />} />
          <Route path="/sundaysermons" element={<Navigate to="/sermons/sunday" replace />} />
          <Route path="/sunday-sermons" element={<Navigate to="/sermons/sunday" replace />} />
          <Route path="/sundayservices" element={<Navigate to="/prayers/sunday-services" replace />} />
          <Route path="/sunday-services" element={<Navigate to="/prayers/sunday-services" replace />} />
          <Route path="/fasting" element={<Navigate to="/prayers/fasting" replace />} />
          <Route path="/transformation" element={<Navigate to="/prayers/transformation" replace />} />
          <Route path="/discipleship" element={<Navigate to="/prayers/discipleship" replace />} />
          <Route path="/studyschool" element={<Navigate to="/prayers/sunday-school" replace />} />
          <Route path="/sundayschool" element={<Navigate to="/prayers/sunday-school" replace />} />
          <Route path="/sunday-school" element={<Navigate to="/prayers/sunday-school" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="members" element={<MemberManager />} />
            <Route path="members/new" element={<MemberForm />} />
            <Route path="members/edit/:id" element={<MemberForm />} />
            <Route path="hero" element={<HeroManager />} />
            <Route path="hero/new" element={<HeroForm />} />
            <Route path="hero/edit/:id" element={<HeroForm />} />
            <Route path="testimonials" element={<TestimonialManager />} />
            <Route path="testimonials/new" element={<TestimonialForm />} />
            <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
            <Route path="gallery" element={<PhotoManager />} />
            <Route path="gallery/new" element={<PhotoForm />} />
            <Route path="gallery/edit/:id" element={<PhotoForm />} />
            <Route path="lyrics" element={<LyricsManager />} />
            <Route path="lyrics/new" element={<LyricsForm />} />
            <Route path="lyrics/edit/:id" element={<LyricsForm />} />
          </Route>

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: '60vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                  textAlign: 'center',
                  padding: '80px 24px',
                  background: 'var(--ivory)',
                }}
              >
                <div>
                  <span style={{ fontSize: '3.5rem', color: 'var(--gold)' }}>✝</span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--green-dark)',
                      fontSize: '2.4rem',
                      margin: '16px 0 10px',
                    }}
                  >
                    Page Not Found
                  </h2>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      maxWidth: 480,
                      margin: '0 auto 24px',
                      fontSize: '1rem',
                    }}
                  >
                    The page you are looking for has moved or does not exist. Please return to the sanctuary home or use the navigation above.
                  </p>
                  <a href="/" className="ct-btn-gold">
                    Return to Home Sanctuary →
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <AppContent />
      </AdminAuthProvider>
    </Router>
  );
}
