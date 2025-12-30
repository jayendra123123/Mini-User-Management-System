import React, { useState } from 'react';
import { login } from '../services/authService';
import { useToast } from './ToastContext';

const LoginForm = ({ onSwitchToRegister, onLoginSuccess }) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });
      
      if (response.success) {
        // Pass user data to parent
        onLoginSuccess({
          fullName: response.user.fullName,
          email: response.user.email,
          role: response.user.role
        });
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage, 5000);
    }
  };

  return (
    <div className="layout-content-container relative z-10 flex w-full max-w-[480px] flex-col rounded-xl border border-[#dbe0e6] dark:border-[#2a3441] bg-white dark:bg-[#1a232d] shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
      {/* Form Header */}
      <div className="flex flex-col gap-3 p-8 pb-4 text-center">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
            shield_person
          </span>
        </div>
        <h1 className="text-[#111418] dark:text-white text-3xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-[#617589] dark:text-[#94a3b8] text-sm font-medium">
          Access the secure administration portal.
        </p>
      </div>

      {/* Interaction Area */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 pt-4">
        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#111418] dark:text-[#e2e8f0]" htmlFor="email">
            Corporate Email
          </label>
          <input 
            id="email"
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@system.com"
            className="w-full rounded-lg border border-[#dbe0e6] dark:border-[#334155] bg-white dark:bg-[#101922] px-4 py-3 text-base outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4 dark:text-white"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#111418] dark:text-[#e2e8f0]" htmlFor="password">
              Password
            </label>
            <button type="button" className="text-xs font-bold text-primary hover:underline">
              Reset Key?
            </button>
          </div>
          <div className="relative flex">
            <input 
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-[#dbe0e6] dark:border-[#334155] bg-white dark:bg-[#101922] px-4 py-3 text-base outline-none ring-primary/20 transition-all focus:border-primary focus:ring-4 dark:text-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617589] hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button 
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-lg bg-primary py-3 px-6 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[0.99] active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : "Secure Login"}
        </button>

        {/* Feedback Messages */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600 dark:border-red-800/30 dark:bg-red-900/10 dark:text-red-400">
             <span className="material-symbols-outlined text-[18px]">warning</span>
             {error}
          </div>
        )}
      </form>

      {/* Form Footer */}
      <div className="bg-gray-50/50 dark:bg-white/5 p-4 text-center text-sm border-t border-[#dbe0e6] dark:border-[#2a3441]">
        <span className="text-[#617589]">Need a system account?</span>{" "}
        <button type="button" onClick={onSwitchToRegister} className="font-bold text-primary hover:underline">Sign Up</button>
      </div>
    </div>
  );
};

export default LoginForm;
