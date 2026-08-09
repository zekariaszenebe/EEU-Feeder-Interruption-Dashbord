import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, Headphones, Shield, HelpCircle, Check } from 'lucide-react';
import EEULogo from './EEULogo';
import { UserRole, TeamLeaderUser } from '../types';

interface WebLoginScreenProps {
  onLoginSuccess: (role: UserRole, teamLeader?: TeamLeaderUser) => void;
  teamLeaders?: TeamLeaderUser[];
}

export default function WebLoginScreen({ onLoginSuccess, teamLeaders = [] }: WebLoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

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

    if (!username.trim() || !password) {
      setError('Please enter your Employee ID / Username and Password.');
      return;
    }

    setIsSubmitting(true);

    // Normalize user input to compare flexibly with or without leading '@'
    const rawUser = username.trim().toLowerCase();
    const strippedUser = rawUser.startsWith('@') ? rawUser.substring(1) : rawUser;
    const withAtUser = rawUser.startsWith('@') ? rawUser : `@${rawUser}`;

    setTimeout(() => {
      // 1. Check if Admin
      if ((strippedUser === 'admin' || withAtUser === '@admin') && password === 'Eeu@1234') {
        saveCredentials();
        onLoginSuccess('admin');
        return;
      }

      // 2. Check registered Team Leaders in database
      const matchedTL = teamLeaders.find((tl) => {
        const tlUser = tl.username.trim().toLowerCase();
        const tlStripped = tlUser.startsWith('@') ? tlUser.substring(1) : tlUser;
        return (tlUser === rawUser || tlUser === withAtUser || tlStripped === strippedUser) && tl.password === password;
      });

      if (matchedTL) {
        saveCredentials();
        onLoginSuccess('team_leader', matchedTL);
        return;
      }

      // Default hardcoded Team Leader fallback (Teams A, B, C, D)
      if (
        (strippedUser === 'teamleader' || strippedUser === 'tl' || strippedUser === 'team_a' || strippedUser === 'team_b' || strippedUser === 'team_c' || strippedUser === 'team_d' || strippedUser === 'teama' || strippedUser === 'teamb' || strippedUser === 'teamc' || strippedUser === 'teamd') && 
        (password === 'Tl@1234' || password === 'Eeu@1234')
      ) {
        let teamName = 'Team A Leader';
        if (strippedUser === 'team_b' || strippedUser === 'teamb') teamName = 'Team B Leader';
        if (strippedUser === 'team_c' || strippedUser === 'teamc') teamName = 'Team C Leader';
        if (strippedUser === 'team_d' || strippedUser === 'teamd') teamName = 'Team D Leader';

        saveCredentials();
        onLoginSuccess('team_leader', {
          id: `tl-fallback-${strippedUser}`,
          username: rawUser,
          password: 'Tl@1234',
          name: teamName,
          district: teamName.replace(' Leader', ''),
          createdAt: new Date().toISOString()
        });
        return;
      }

      // 3. Check Contact Center Agent
      if ((strippedUser === 'contactcenter' || strippedUser === 'agent') && password === 'Eeu@1234') {
        saveCredentials();
        onLoginSuccess('agent');
        return;
      }

      // Invalid
      setError('Access Denied: Invalid credentials. Please check your employee ID and password.');
      setIsSubmitting(false);
    }, 500);
  };

  const saveCredentials = () => {
    if (rememberMe) {
      localStorage.setItem('eeu_remember_me', 'true');
      localStorage.setItem('eeu_saved_username', username);
      localStorage.setItem('eeu_saved_password', password);
    } else {
      localStorage.removeItem('eeu_remember_me');
      localStorage.removeItem('eeu_saved_username');
      localStorage.removeItem('eeu_saved_password');
    }
  };

  const handleFillAgentDemo = () => {
    setUsername('@contactcenter');
    setPassword('Eeu@1234');
    setError('');
  };

  const handleFillTLDemo = () => {
    setUsername('@team_a');
    setPassword('Tl@1234');
    setError('');
  };

  const handleFillAdminDemo = () => {
    setUsername('@admin');
    setPassword('Eeu@1234');
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative selection:bg-[#E65100] selection:text-white overflow-x-hidden bg-[linear-gradient(180deg,#1c8333_0%,#309439_22%,#7c9215_52%,#ce6800_82%,#e45700_100%)]">
      {/* Main Glassmorphic Split Card Container */}
      <div 
        id="web-login-card" 
        className="w-full max-w-4xl h-[501px] bg-white/20 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 my-auto"
      >
        {/* LEFT COLUMN - EEU Brand & Logo Section */}
        <div className="md:col-span-5 bg-white/25 dark:bg-slate-900/20 backdrop-blur-md p-8 md:p-10 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-white/25">
          <div className="my-auto flex flex-col items-center">
            {/* Official EEU Brand Emblem Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-white/80 mb-4 flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <EEULogo size={110} showText={false} />
            </div>

            {/* EEU Title in Amharic and English */}
            <div className="text-center mb-3">
              <span className="font-display font-medium text-base leading-none text-[#F48B20] block tracking-wide">
                የኢትዮጵያ ኤሌክትሪክ አገልግሎት
              </span>
              <h2 className="font-sans font-black text-[21px] tracking-tight text-[#1E562A] mt-1">
                Ethiopian Electric Utility
              </h2>
            </div>

            {/* Slogan */}
            <p className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-100 max-w-xs leading-relaxed font-sans text-center mt-2">
              Powering Ethiopia.<br />
              Powering the Future.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 text-[11px] font-medium text-gray-700 dark:text-gray-200">
            Official Feeder Interruptions Dashboard And Bill & Smart Meter Calculator Contact Center Portal
          </div>
        </div>

        {/* RIGHT COLUMN - EEU Employee Portal Login Form */}
        <div className="md:col-span-7 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-center items-center text-center">
          <div className="w-full max-w-sm my-auto">
            {/* Form Header */}
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-xl md:text-2xl font-black font-sans tracking-tight leading-tight">
                  <span className="text-black">Contact Center Portal</span>
                </h1>
              </div>
              <p className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300 mt-2.5 max-w-xs">
                Feeder Interruptions Dashboard For Call Center
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5 font-sans uppercase tracking-wide">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 pointer-events-none">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    id="login-username-input"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/80 bg-white/90 dark:bg-slate-800/90 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent transition-all disabled:opacity-50 shadow-xs"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5 font-sans uppercase tracking-wide">
                  PASSWORD
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300/80 bg-white/90 dark:bg-slate-800/90 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent transition-all disabled:opacity-50 shadow-xs"
                    autoComplete="current-password"
                  />
                  <button
                    id="login-password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-1 select-none">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="login-remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isSubmitting}
                    className="w-4 h-4 rounded border-gray-300 text-[#078930] focus:ring-[#078930] cursor-pointer accent-[#078930]"
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold font-sans">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-[#1E562A] dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Box */}
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-left animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Button */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#078930] hover:bg-[#067328] active:bg-[#055d20] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-800/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 leading-none mt-2"
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
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-[11px] text-white/90 font-medium mt-6 select-none font-sans text-center space-y-1 relative z-10">
        <p>© {new Date().getFullYear()} Ethiopian Electric Utility. All rights reserved.</p>
        <p className="font-semibold text-white/95">Developed by <span className="text-[#96F385] font-bold">Zekarias Zenebe</span></p>
      </div>

      {/* IT Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1E562A] flex items-center justify-center font-bold">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">EEU IT Support Desk</h3>
                <p className="text-xs text-gray-500">Contact details for account authorization & reset</p>
              </div>
            </div>
            <div className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 font-mono">
              <p><strong>Hotline:</strong> 905 / +251 11 123 4567</p>
              <p><strong>IT Desk Email:</strong> support@eeu.gov.et</p>
              <p><strong>Location:</strong> EEU HQ - ICT Infrastructure Dept, Addis Ababa</p>
              <p><strong>Operating Hours:</strong> 24/7 Call Center Support</p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="px-4 py-2 bg-[#1E562A] text-white text-xs font-bold rounded-xl hover:bg-[#184822] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E65100] flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Password Recovery Guide</h3>
                <p className="text-xs text-gray-500">EEU Employee Credentials Security</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300 bg-orange-50/60 dark:bg-amber-950/30 p-4 rounded-xl border border-orange-200 dark:border-amber-900">
              <p className="font-semibold text-gray-900 dark:text-white">To reset your account password:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Contact your System Administrator or Team Leader.</li>
                <li>Team Leaders can request password reset via Admin Panel.</li>
                <li>Default initial credentials are issued upon employee onboarding.</li>
              </ul>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 bg-[#E65100] text-white text-xs font-bold rounded-xl hover:bg-[#d84a00] cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

