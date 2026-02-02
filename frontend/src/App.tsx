import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import GlucoseTracker from './pages/GlucoseTracker/GlucoseTracker'
import RiskAssessment from './pages/RiskAssessment/RiskAssessment'
import Education from './pages/Education/Education'
import About from './pages/About/About'
import Privacy from './pages/Privacy/Privacy'
import Terms from './pages/Terms/Terms'
import Contact from './pages/Contact/Contact'
import Profile from './pages/Profile/Profile'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="education" element={<Education />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="contact" element={<Contact />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="glucose" element={<GlucoseTracker />} />
              <Route path="risk-assessment" element={<RiskAssessment />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
