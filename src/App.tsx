import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/admin/PrivateRoute';
import Login from './components/admin/Login';
import ForgotPassword from './components/admin/ForgotPassword';
import Dashboard from './components/admin/Dashboard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Technology from './components/Technology';
import Innovation from './components/Innovation';
import Timeline from './components/Timeline';
import Clients from './components/Clients';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Services />
              <Technology />
              <Innovation />
              <Timeline />
              <Clients />
              <CTA />
              <Contact />
              <Footer />
            </>
          } />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
