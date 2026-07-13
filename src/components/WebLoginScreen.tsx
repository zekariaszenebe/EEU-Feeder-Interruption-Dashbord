import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import EEULogo from './EEULogo';
import loginBg from '../assets/images/login_bg_1783314180079.jpg';

interface WebLoginScreenProps {
  onLoginSuccess: (isAdmin: boolean) => void;
}

export default function WebLoginScreen({ onLoginSuccess }: WebLoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load saved credentials if 'remember me' is checked
  useEffect(() => {
    const savedRemember = localStorage.getItem('eeu_remember_me') === 'true';
    setRememberMe(savedRemember);
    if (savedRemember) {
      const savedUser = localStorage.getItem('eeu_saved_username') || '';
      const savedPass = localStorage.getItem('eeu_saved_password') || '';
      setUsername(savedUser);
      setPassword(savedPass);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Normalize user input to handle typing with or without the leading '@'
    const normalizedUsername = username.trim().toLowerCase();
    const cleanUsername = normalizedUsername.startsWith('@') 
      ? normalizedUsername 
      : `@${normalizedUsername}`;

    // Target credentials:
    // User / Agent: @contactcenter
    // Admin: @admin
    // Password: Eeu@1234
    
    setTimeout(() => {
      if ((cleanUsername === '@contactcenter' || cleanUsername === '@admin') && password === 'Eeu@1234') {
        if (rememberMe) {
          localStorage.setItem('eeu_remember_me', 'true');
          localStorage.setItem('eeu_saved_username', username);
          localStorage.setItem('eeu_saved_password', password);
        } else {
          localStorage.removeItem('eeu_remember_me');
          localStorage.removeItem('eeu_saved_username');
          localStorage.removeItem('eeu_saved_password');
        }
        const isUserAdmin = cleanUsername === '@admin';
        onLoginSuccess(isUserAdmin);
      } else {
        if (!username.trim() || !password) {
          setError('Please fill in both username and password fields.');
        } else {
          setError('Access Denied: Invalid operator credentials. Please check your username and password.');
        }
        setIsSubmitting(false);
      }
    }, 600); // Realistic slight verification delay for premium feel
  };

  const handleFillAgentDemo = () => {
    setUsername('@contactcenter');
    setPassword('Eeu@1234');
    setError('');
  };

  const handleFillAdminDemo = () => {
    setUsername('@admin');
    setPassword('Eeu@1234');
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative selection:bg-eeu-green selection:text-white overflow-hidden bg-slate-900">
      {/* Background Image with referrerPolicy="no-referrer" */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={loginBg}
          alt="Login Background"
          className="w-full h-full object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Decorative backdrop glow dots */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-eeu-yellow/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-eeu-green/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Container Card */}
      <div 
        id="web-login-card" 
        className="w-full max-w-md bg-white/80 dark:bg-slate-900/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center relative z-10 transition-transform duration-300 pt-10"
      >
        {/* EEU Branded Logo Frame */}
        <div className="w-28 h-28 rounded-2xl bg-white border border-gray-150 shadow-md flex items-center justify-center p-1.5 mb-5 transition-transform duration-300 hover:scale-105">
          <EEULogo size={96} />
        </div>

        {/* Branding & Titles */}
        <div className="text-center mb-6">
          <span className="font-display font-medium text-xs leading-none text-[#F48B20] block tracking-wide">
            የኢትዮጵያ ኤሌክትሪክ አገልግሎት
          </span>
          <h1 className="font-sans font-black text-lg tracking-tight text-gray-900 mt-1">
            Ethiopian Electric Utility
          </h1>
          <p className="text-[13px] font-bold text-gray-500 mt-1.5 leading-relaxed font-sans">
            Power interruptions management portal for contact center
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-left text-xs font-semibold text-gray-700 mb-1.5 uppercase font-sans tracking-wider">
              USERNAME
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <User className="w-4 h-4" />
              </span>
              <input
                id="login-username-input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-eeu-green focus:border-transparent transition-all disabled:opacity-50"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-left text-xs font-semibold text-gray-700 mb-1.5 uppercase font-sans tracking-wider">
              PASSWORD
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="login-password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white/50 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-eeu-green focus:border-transparent transition-all disabled:opacity-50"
                autoComplete="current-password"
              />
              <button
                id="login-password-toggle"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1 pb-3 select-none">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                id="login-remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4 rounded border-gray-300 text-[#5FA354] focus:ring-[#5FA354] cursor-pointer accent-[#5FA354]"
              />
              <span className="text-xs text-gray-700 dark:text-gray-400 font-semibold font-sans">
                Remember me
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-eeu-green hover:bg-[#4d8643] active:bg-[#44773a] text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-[#5FA354]/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 leading-none"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
              </>
            )}
          </button>
        </form>

      </div>

      {/* Footer copyright */}
      <div className="text-[10px] text-white/90 font-medium mt-6 select-none font-sans text-center space-y-1 relative z-10">
        <p>© {new Date().getFullYear()} Ethiopian Electric Utility. All grid logs secure and audited.</p>
        <p className="font-semibold text-white">Developed by <span className="text-[#96F385] font-bold">Zekarias Zenebe</span></p>
      </div>
    </div>
  );
}
