import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/home/Home';
import Explore from './pages/home/Explore';
import About from './pages/home/About';
import SportEvent from './pages/home/Sportevent';
import Workout from './pages/home/Workout';
import Nutrition from './pages/home/Nutrition';
import Login from './pages/home/Login';
import Signup from './pages/home/Signup';
import Pricing from './pages/home/Pricing';
import Footer from './pages/home/footer';
import Signupathlete from './pages/home/signupathlete';
import AthleteProfiler from './pages/athleteDashboard/athleteProfiler';
import EditPofile from './pages/athleteDashboard/EditPofile';
import Settings from './pages/athleteDashboard/Settings';
import Sessions from './pages/athleteDashboard/sessions';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ margin: '2% 18%', minHeight: '37vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/sportevent" element={<SportEvent />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signupathlete />} />
          <Route path="/signupathlete" element={<Signupathlete />} />
          <Route path="/athleteProfiler" element={<AthleteProfiler />} />
          <Route path="/editPofile" element={<EditPofile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sessions" element={<Sessions />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
