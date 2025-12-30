import React, { useState, useEffect } from 'react';
import { getWelcomeGreeting } from '../services/geminiService.js';
import { signup } from '../services/authService';
import InputGroup from './InputGroup.jsx';
import { useToast } from './ToastContext';

const RegistrationPortal = ({ onSwitchToLogin, onSignupSuccess }) => {
  const toast = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('Start managing your users today.');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (formData.fullName.trim().length > 2) {
        setIsAiLoading(true);
        const greeting = await getWelcomeGreeting(formData.fullName);
        setWelcomeMessage(greeting);
        setIsAiLoading(false);
      } else {
        setWelcomeMessage('Start managing your users today.');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [formData.fullName]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      const errorMsg = "Passwords don't match!";
      setError(errorMsg);
      toast.error(errorMsg, 4000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (response.success) {
        // Pass user data to parent
        onSignupSuccess({
          fullName: response.user.fullName,
          email: response.user.email,
          role: response.user.role
        });
      }
    } catch (err) {
      setIsSubmitting(false);
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage, 5000);
    }
  };

  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return 0;
    if (len < 4) return 1;
    if (len < 8) return 2;
    if (len < 12) return 3;
    return 4;
  };

  const strength = getPasswordStrength();

  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark transition-colors duration-300">
      <header className="flex items-center justify-between border-b border-solid border-b-[#f0f2f4] dark:border-b-[#2a3441] px-6 md:px-10 py-3 bg-white dark:bg-background-dark sticky top-0 z-50">
        <div className="flex items-center gap-3 text-[#111418] dark:text-white">
          <div className="size-8 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined !text-[32px]">manage_accounts</span>
          </div>
          <h2 className="hidden sm:block text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            User Manager
          </h2>
          <h2 className="sm:hidden text-[#111418] dark:text-white text-lg font-bold">UM</h2>
        </div>
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
          >
            <span className="material-symbols-outlined">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button onClick={onSwitchToLogin} className="flex items-center justify-center rounded-full h-10 bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white text-sm font-bold px-4 hover:opacity-80 transition-opacity">
            Log In
          </button>
          <button className="flex items-center justify-center rounded-full h-10 bg-primary text-white text-sm font-bold px-4 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            Sign Up
          </button>
        </div>
      </header>

      <main className="flex grow flex-col justify-center items-center py-10 px-4">
        <div className="w-full max-w-[1000px] flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-[#1a2632] transform transition-all">
          <div className="hidden md:flex w-[45%] bg-primary/10 dark:bg-primary/5 flex-col justify-center items-center p-8 relative overflow-hidden border-r border-gray-100 dark:border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-0"></div>
            <div className="relative z-10 text-center animate-fadeIn">
              <div 
                className="w-full aspect-square max-w-[280px] bg-center bg-no-repeat bg-contain mx-auto mb-8 rounded-2xl"
                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnUPlAVLmT6g0CoRevH_9R79FM45d0-OrpsQXJ6KBWODPUqKxGSEnsIB_JCReI9j-R0NdqZQwfxCqO-Mwv0Z_yI1tSpDZrDMQlxkZl9e8S3V3CnBUtJ-liCjRPxuvGFn7-leW12UOTSlAu9OVK3Zk1VfEfgwNYmMeB8NRY4seASe6h3ssePKBUkBiB4I98tl5gznru-0mfRKdw2RARk1ER2bG-eQQ9rSO9CVE2OV_qKs6bPSJkc8uQxzS_EneNMD06dbinhlLSOurL")` }}
              ></div>
              <h3 className="text-2xl font-bold text-[#111418] dark:text-white mb-3">Scale with ease</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-[260px] mx-auto leading-relaxed">
                Experience seamless management of your digital workspace and users.
              </p>
            </div>
          </div>

          <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-[#111418] dark:text-white tracking-tight text-[32px] font-black leading-tight mb-2">
                Join the platform
              </h1>
              <p className={`text-base font-medium leading-normal transition-all duration-500 ${isAiLoading ? 'opacity-40 animate-pulse' : 'opacity-100'} text-primary`}>
                {welcomeMessage}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <InputGroup
                label="Full Name"
                id="fullName"
                type="text"
                icon="person"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
              />

              <InputGroup
                label="Email"
                id="email"
                type="email"
                icon="mail"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />

              <div className="flex flex-col gap-2">
                <InputGroup
                  label="Password"
                  id="password"
                  type="password"
                  icon="lock"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleInputChange}
                  showPasswordToggle
                  onTogglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
                  isPasswordVisible={isPasswordVisible}
                />
                <div className="flex gap-1 h-1.5 px-0.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`flex-1 rounded-full h-full transition-all duration-300 ${
                        strength >= step 
                          ? (strength === 1 ? 'bg-red-500' : strength === 2 ? 'bg-orange-500' : strength === 3 ? 'bg-yellow-500' : 'bg-green-500') 
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <InputGroup
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                icon="lock_reset"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />

              <div className="flex flex-col gap-2">
                <label className="text-[#111418] dark:text-white text-base font-medium leading-normal">
                  Select Account Role
                </label>
                <div className="flex flex-col gap-3">
                  <label 
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.role === 'user' 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="mt-1 h-5 w-5 text-primary focus:ring-primary cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                        <span className="text-[#111418] dark:text-white font-semibold">User</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Standard access</p>
                    </div>
                  </label>
                  
                  <label 
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.role === 'admin' 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === 'admin'}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="mt-1 h-5 w-5 text-primary focus:ring-primary cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">admin_panel_settings</span>
                        <span className="text-[#111418] dark:text-white font-semibold">Admin</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Full access</p>
                    </div>
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 flex w-full items-center justify-center rounded-xl h-12 bg-primary hover:bg-primary/90 text-white text-base font-bold shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Already registered? <button type="button" onClick={onSwitchToLogin} className="font-bold text-primary hover:underline">Sign In</button>
              </p>
            </form>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Modern User Management</p>
        </footer>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RegistrationPortal;
