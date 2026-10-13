import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import ScrollToTop from './Components/ScrollToTop'

// Pages
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Journey from './Pages/About/Journey'
import Motto from './Pages/About/Motto'
import Vision from './Pages/About/Vision'
import Mission from './Pages/About/Mission'
import Faith from './Pages/About/Faith'
import Testimonials from './Pages/Testimonials/Testimonials'
import Media from './Pages/Media/Media'
import Photos from './Pages/Media/Photos'
import Videos from './Pages/Media/Videos'
import Songs from './Pages/Songs/Songs'
import Lyrics from './Pages/Songs/Lyrics'
import Audio from './Pages/Songs/Audio'
import Sermons from './Pages/Sermons/Sermons'
import BibleStudy from './Pages/Sermons/BibleStudy'
import SundaySermons from './Pages/Sermons/SundaySermons'
import Prayers from './Pages/Prayers/Prayers'
import SundayServices from './Pages/Prayers/SundayServices'
import Fasting from './Pages/Prayers/Fasting'
import Transformation from './Pages/Prayers/Transformation'
import Discipleship from './Pages/Prayers/Discipleship'
import SundaySchool from './Pages/Prayers/SundaySchool'
import Contact from './Pages/Contact/Contact'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* About — nested sub-routes */}
          <Route path="/about" element={<About />}>
            <Route path="journey" element={<Journey />} />
            <Route path="motto"   element={<Motto />} />
            <Route path="vision"  element={<Vision />} />
            <Route path="mission" element={<Mission />} />
            <Route path="faith"   element={<Faith />} />
          </Route>

          <Route path="/testimonies" element={<Testimonials />} />

          {/* Media */}
          <Route path="/media" element={<Media />}>
            <Route path="photos" element={<Photos />} />
            <Route path="videos" element={<Videos />} />
          </Route>

          {/* Songs */}
          <Route path="/songs" element={<Songs />}>
            <Route path="lyrics" element={<Lyrics />} />
            <Route path="audio"  element={<Audio />} />
          </Route>

          {/* Sermons */}
          <Route path="/sermons" element={<Sermons />}>
            <Route path="bible-study" element={<BibleStudy />} />
            <Route path="sunday"      element={<SundaySermons />} />
          </Route>

          {/* Prayers & Worship */}
          <Route path="/prayers" element={<Prayers />}>
            <Route path="sunday-services" element={<SundayServices />} />
            <Route path="fasting"         element={<Fasting />} />
            <Route path="transformation"  element={<Transformation />} />
            <Route path="discipleship"    element={<Discipleship />} />
            <Route path="sunday-school"   element={<SundaySchool />} />
          </Route>

          <Route path="/contact" element={<Contact />} />

          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)", textAlign: "center", padding: "80px 24px", background: "var(--ivory)" }}>
              <div>
                <span style={{ fontSize: "3.5rem", color: "var(--gold)" }}>✝</span>
                <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--green-dark)", fontSize: "2.4rem", margin: "16px 0 10px" }}>Page Not Found</h2>
                <p style={{ color: "var(--text-muted)", maxWidth: 480, margin: "0 auto 24px", fontSize: "1rem" }}>
                  The page you are looking for has moved or does not exist. Please return to the sanctuary home or use the navigation above.
                </p>
                <a href="/" className="ct-btn-gold">
                  Return to Home Sanctuary →
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
