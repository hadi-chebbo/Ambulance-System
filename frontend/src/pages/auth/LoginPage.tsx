import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ercIcon from '../../assets/erc-icon.png';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]       = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'Invalid email or password.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
      className="min-h-screen w-full flex flex-col items-center justify-between bg-[#F0F2F5] px-5 py-12"
    >

      {/* ── Top: Logo + Org name ── */}
      <div className="flex flex-col items-center gap-4 mt-8">

        {/* Logo — rounded square card with red circle inside */}
        <div className="flex h-24 w-24 items-center justify-center rounded-[22px] bg-white border border-[#E5E7EB] shadow-md">
          <div className="flex h-17 w-17 items-center justify-center rounded-2xl bg-[#DC2626]">
            <img
              src={ercIcon}
              alt="ERC Logo"
              className="h-10 w-10 object-contain brightness-0 invert"
            />
          </div>
        </div>

        {/* Org name */}
        <div className="text-center">
          <h1 className="text-[22px] font-extrabold tracking-widest text-[#111827] uppercase leading-tight">
            Emergency &amp; Relief Corps
          </h1>
          <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9CA3AF]">
            Secured Personnel Entry
          </p>
        </div>
      </div>

      {/* ── Card ── */}
      <div className="w-full max-w-sm rounded-2xl bg-white border border-[#E5E7EB] px-7 py-8">

        <h2 className="text-[20px] font-bold text-[#111827]">Welcome Back</h2>
        <p className="mt-1 mb-6 text-[13px] text-[#9CA3AF] leading-relaxed">
          Enter your credentials to access the system.
        </p>

        {/* Error banner */}
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <svg className="h-4 w-4 shrink-0 text-red-500" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="0.75" fill="currentColor"/>
            </svg>
            <p className="text-[13px] text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-[#9CA3AF] mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D1D5DB]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@erc.gov"
                required
                className="w-full h-12.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] pl-10 pr-4 text-[14px] text-[#374151] placeholder:text-[#D1D5DB] outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#9CA3AF]">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#DC2626] hover:text-red-800 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D1D5DB]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-12.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] pl-10 pr-11 text-[14px] text-[#374151] placeholder:text-[#C4C8D0] outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4"/>
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 rounded-full bg-[#DC2626] text-white text-[13px] font-black tracking-[0.12em] uppercase hover:bg-[#1f2937] active:scale-[0.98] transition-all disabled:opacity-60 mt-2"
          >
            {isLoading ? 'Signing in…' : 'Login'}
          </button>

        </form>
      </div>

      {/* ── Footer ── */}
      <div className="mt-8 flex flex-col items-center gap-3 pb-2">
        <div className="flex items-center gap-6">
          <button type="button" className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#C4C8D0] hover:text-[#6B7280] transition-colors">
            Privacy Policy
          </button>
          <span className="text-[#E5E7EB]">·</span>
          <button type="button" className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#C4C8D0] hover:text-[#6B7280] transition-colors">
            Security Protocol
          </button>
          <span className="text-[#E5E7EB]">·</span>
          <button type="button" className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#C4C8D0] hover:text-[#6B7280] transition-colors">
            Contact Support
          </button>
        </div>
        <p className="text-[10px] tracking-[0.08em] uppercase text-[#D1D5DB] text-center">
          © 2024 Emergency &amp; Relief Corps · Authorized Personnel Only
        </p>
      </div>

    </div>
  );
};

export default LoginPage;