
import React, { useState } from 'react';
import DotBackground from './DotBackground';
import LoginForm from './LoginForm';

const LoginLayout = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center items-center overflow-hidden p-4">
      <DotBackground />

      {/* Theme Switcher */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white dark:bg-[#1a232d] shadow-md border border-[#dbe0e6] dark:border-[#2a3441] text-[#617589] dark:text-[#94a3b8] hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        title="Toggle dark mode"
      >
        <span className="material-symbols-outlined">
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      {/* Main Content */}
      <LoginForm onSwitchToRegister={onSwitchToRegister} onLoginSuccess={onLoginSuccess} />

      {/* Page Footer */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-xs text-[#617589] dark:text-[#64748b]">
          © {new Date().getFullYear()} User Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginLayout;
