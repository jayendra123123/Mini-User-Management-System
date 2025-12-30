import './App.css';
import { useState, useEffect } from 'react';
import { ToastProvider } from './component/ToastContext';
import LoginLayout from './component/LoginLayout';
import RegistrationPortal from './component/RegistrationPortal';
import UserDashboard from './component/UserDashboard';
import AdminDashboard from './admin/AdminDashboard';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [user, setUser] = useState(null); // null = not logged in
  const [loading, setLoading] = useState(true);
  
  // Check localStorage on mount to persist login
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);
  
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setShowRegistration(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  // Show loading state while checking localStorage
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // If user is logged in, show appropriate dashboard based on role
  if (user) {
    return (
      <ToastProvider>
        {user.role === 'admin' ? (
          <AdminDashboard user={user} onLogout={handleLogout} />
        ) : (
          <UserDashboard user={user} onLogout={handleLogout} />
        )}
      </ToastProvider>
    );
  }
  
  // Otherwise show login or registration
  return (
    <ToastProvider>
      <div className="App">
        {showRegistration ? 
          <RegistrationPortal 
            onSwitchToLogin={() => setShowRegistration(false)} 
            onSignupSuccess={handleSignup}
          /> : 
          <LoginLayout 
            onSwitchToRegister={() => setShowRegistration(true)}
            onLoginSuccess={handleLogin}
          />
        }
      </div>
    </ToastProvider>
  );
}

export default App;
