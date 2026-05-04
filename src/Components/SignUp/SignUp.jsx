import React, { use, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './SignUp.css';

// ===== ICONS =====
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const ArtistIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 19l7-7 3 3-7 7-3-3z"/>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
    <path d="M2 2l7.586 7.586"/>
    <circle cx="11" cy="11" r="2"/>
  </svg>
);

const CollectorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400;600&display=swap');
`;

// ===== COUNTRIES LIST =====
const COUNTRIES = [
  'Australia','Bangladesh','Brazil','Canada','China','Egypt','France',
  'Germany','Ghana','India','Italy','Japan','Kenya','Mexico','Netherlands',
  'Nigeria','Pakistan','South Africa','South Korea','Spain','Sweden',
  'Turkey','United Arab Emirates','United Kingdom','United States',
];

// ===== SUCCESS MESSAGE COMPONENT =====
const SuccessMessage = ({ firstName }) => (
  <div className="min-h-screen w-full bg-amber-50 flex items-center justify-center p-6">
    <div className="text-center">
      <div className="font-josefin text-5xl font-light tracking-wider text-stone-900 mb-4">
        ART<span className="font-semibold text-amber-700">IFY</span>
      </div>
      <div className="font-cormorant text-3xl text-amber-600 italic mb-3">
        Welcome, {firstName}!
      </div>
      <p className="font-josefin text-sm tracking-widest text-stone-500 uppercase">
        Your account has been created. Check your inbox to verify your email.
      </p>
    </div>
  </div>
);

// ===== STAT BOX COMPONENT =====
const StatBox = ({ value, label }) => (
  <div className="border border-amber-600/40 px-8 py-6 text-center backdrop-blur-sm bg-white/5 transition-all duration-300 hover:border-amber-600/70 hover:-translate-y-1">
    <div className="text-2xl font-semibold text-amber-600 tracking-wider">{value}</div>
    <div className="text-xs uppercase tracking-wider text-white/45 mt-1">{label}</div>
  </div>
);

// ===== MAIN SIGNUP COMPONENT =====
const SignUp = () => {
  const { signInWithGoogle } = use(AuthContext);

  const [role, setRole] = useState('artist');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    agreeTerms: false,
    newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');

  // ===== FORM HANDLERS =====
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = 'Valid email is required.';
    }
    if (form.password.length < 8) {
      e.password = 'Password must be at least 8 characters.';
    }
    if (!form.country) e.country = 'Please select your country.';
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to the Terms of Service.';
    return e;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    console.log('SignUp payload:', { role, ...form });
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setGoogleError('');
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      console.log('Google sign-in successful:', user);
      // Navigate or handle successful sign-in here
    } catch (error) {
      console.error('Google sign-in error:', error);
      setGoogleError('Failed to sign in with Google. Please try again.');
      setGoogleLoading(false);
    }
  };

  // ===== RENDER SUCCESS STATE =====
  if (submitted) {
    return <SuccessMessage firstName={form.firstName} />;
  }

  // ===== RENDER SIGNUP FORM =====
  return (
    <div className="font-josefin min-h-screen flex flex-col md:flex-row">
      <style>{styles}</style>

      {/* ===== LEFT PANEL ===== */}
      <div className="artify-left-panel flex-1 bg-linear-to-br from-slate-900 via-slate-800 to-amber-900 relative flex flex-col items-center justify-center overflow-hidden min-h-screen md:min-h-auto p-8">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20" style={{
            background: 'radial-gradient(ellipse at 30% 70%, rgba(196,155,75,0.15) 0%, transparent 60%)',
          }}></div>
          <div className="absolute inset-0 opacity-40" style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(74,55,40,0.4) 0%, transparent 50%)',
          }}></div>
        </div>

        {/* Animated Orbs */}
        <div className="artify-orb-1 absolute w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none" style={{
          background: 'rgba(196,155,75,0.1)',
          top: '-80px',
          right: '-80px',
        }}></div>
        <div className="artify-orb-2 absolute w-56 h-56 rounded-full opacity-25 blur-3xl pointer-events-none" style={{
          background: 'rgba(74,55,40,0.25)',
          bottom: '40px',
          left: '-40px',
        }}></div>

        {/* Left Panel Content */}
        <div className="relative z-10 text-center px-8 animate-fadeInUp">
          <div className="font-josefin text-5xl font-light tracking-widest text-white mb-2">
            ART<span className="font-semibold text-amber-600">IFY</span>
          </div>
          <p className="font-cormorant text-2xl text-white/70 italic leading-loose my-7">
            Join <em className="text-amber-600 font-normal">12,400+</em> artists and collectors building
            <br />a new art world, together.
          </p>
          <div className="flex gap-5 justify-center flex-col sm:flex-row">
            <StatBox value="Free" label="To Join" />
            <StatBox value="0%" label="Setup Fees" />
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="artify-right-panel flex-1 bg-amber-50 overflow-y-auto p-8 md:p-16 animate-fadeInRight">
        {/* Brand Header */}
        <div className="font-josefin text-2xl font-light tracking-widest text-stone-900 mb-1">
          ART<span className="font-semibold">IFY</span>
        </div>
        <div className="text-xs uppercase tracking-widest text-stone-400 mb-9">
          Create your free account in minutes.
        </div>

        {/* Role Selection */}
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-3 font-medium">
          I am joining as
        </div>
        <div className="flex border border-stone-300 mb-8">
          {[
            { value: 'artist', label: 'Artist / Seller', icon: ArtistIcon },
            { value: 'collector', label: 'Art Collector', icon: CollectorIcon }
          // eslint-disable-next-line
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setRole(value)}
              className={`flex-1 py-3.5 px-4 flex flex-col items-center gap-1.5 cursor-pointer border-r border-stone-300 last:border-r-0 transition-colors duration-300 text-xs uppercase tracking-widest ${
                role === value
                  ? 'bg-stone-900 text-white'
                  : 'bg-transparent text-stone-500 hover:bg-stone-50'
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Layla"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 bg-white font-josefin text-sm text-stone-800 tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
            />
            {errors.firstName && (
              <span className="text-xs text-red-600 tracking-wider mt-1 block">{errors.firstName}</span>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2 font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Okafor"
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-stone-300 bg-white font-josefin text-sm text-stone-800 tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
            />
            {errors.lastName && (
              <span className="text-xs text-red-600 tracking-wider mt-1 block">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-300 bg-white font-josefin text-sm text-stone-800 tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
          />
          {errors.email && (
            <span className="text-xs text-red-600 tracking-wider mt-1 block">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Minimum 8 characters"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-300 bg-white font-josefin text-sm text-stone-800 tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
          />
          {errors.password && (
            <span className="text-xs text-red-600 tracking-wider mt-1 block">{errors.password}</span>
          )}
        </div>

        {/* Country Select */}
        <div className="mb-5">
          <label className="text-xs uppercase tracking-widest text-stone-500 block mb-2 font-medium">
            Country
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-300 bg-white font-josefin text-sm text-stone-800 tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '32px',
            }}
          >
            <option value="">Select your country...</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="text-xs text-red-600 tracking-wider mt-1 block">{errors.country}</span>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={form.agreeTerms}
              onChange={handleChange}
              className="w-3.5 h-3.5 mt-0.5 accent-amber-600 cursor-pointer shrink-0"
            />
            <span className="text-xs text-stone-600 tracking-wider leading-relaxed">
              I agree to Artify's <a href="#" className="text-amber-600 underline hover:no-underline">Terms of Service</a> and <a href="#" className="text-amber-600 underline hover:no-underline">Privacy Policy</a>
            </span>
          </label>
          {errors.agreeTerms && (
            <span className="text-xs text-red-600 tracking-wider block -mt-2">{errors.agreeTerms}</span>
          )}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
              className="w-3.5 h-3.5 mt-0.5 accent-amber-600 cursor-pointer shrink-0"
            />
            <span className="text-xs text-stone-600 tracking-wider leading-relaxed">
              Send me updates about new artists and curated collections (optional)
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-stone-900 text-white font-josefin text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 hover:bg-amber-600 active:scale-95 mb-5"
        >
          Create My Account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-stone-300"></div>
          <span className="text-xs uppercase tracking-widest text-stone-400 whitespace-nowrap">or sign up with</span>
          <div className="flex-1 h-px bg-stone-300"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full py-3.5 bg-white border border-stone-300 font-josefin text-xs tracking-wider text-stone-600 cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:border-amber-600 hover:shadow-lg disabled:opacity-60"
        >
          <GoogleIcon />
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {googleError && (
          <p className="text-xs text-red-600 text-center mt-3 tracking-wider">{googleError}</p>
        )}

        {/* Sign In Link */}
        <div className="text-center mt-6 text-xs text-stone-500 tracking-wider">
          Already have an account? <a href="/login" className="text-amber-600 no-underline hover:underline cursor-pointer">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
