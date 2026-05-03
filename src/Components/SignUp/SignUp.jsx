import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400;600&display=swap');

  .artify-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .artify-root {
    font-family: 'Josefin Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }

  /* ---- LEFT PANEL ---- */
  .artify-left {
    flex: 0 0 50%;
    background: linear-gradient(135deg, #1a1f2e 0%, #2d3452 40%, #4a3728 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 100vh;
  }

  .artify-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 30% 70%, rgba(196,155,75,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 30%, rgba(74,55,40,0.4) 0%, transparent 50%);
  }

  .artify-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    animation: orbFloat 8s ease-in-out infinite alternate;
  }
  .artify-orb1 {
    width: 320px; height: 320px;
    background: rgba(196,155,75,0.1);
    top: -80px; right: -80px;
    animation-delay: 0s;
  }
  .artify-orb2 {
    width: 220px; height: 220px;
    background: rgba(74,55,40,0.25);
    bottom: 40px; left: -40px;
    animation-delay: -4s;
  }

  @keyframes orbFloat {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(20px, -20px) scale(1.1); }
  }

  .artify-left-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 40px;
    animation: fadeInUp 0.9s ease both;
  }

  .artify-brand-left {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 3rem;
    font-weight: 300;
    letter-spacing: 0.35em;
    color: #fff;
    margin-bottom: 8px;
  }
  .artify-brand-left span { color: #c49b4b; font-weight: 600; }

  .artify-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    color: rgba(255,255,255,0.72);
    line-height: 1.7;
    margin: 28px 0 52px;
    font-style: italic;
  }
  .artify-tagline em { color: #c49b4b; font-style: normal; }

  .artify-stats { display: flex; gap: 20px; justify-content: center; }

  .artify-stat-box {
    border: 1px solid rgba(196,155,75,0.4);
    padding: 22px 32px;
    text-align: center;
    backdrop-filter: blur(10px);
    background: rgba(255,255,255,0.04);
    transition: transform 0.3s, border-color 0.3s;
  }
  .artify-stat-box:hover {
    transform: translateY(-4px);
    border-color: rgba(196,155,75,0.7);
  }
  .artify-stat-val {
    font-size: 1.7rem;
    font-weight: 600;
    color: #c49b4b;
    letter-spacing: 0.05em;
  }
  .artify-stat-label {
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    color: rgba(255,255,255,0.45);
    margin-top: 5px;
    text-transform: uppercase;
  }

  /* ---- RIGHT PANEL ---- */
  .artify-right {
    flex: 0 0 50%;
    background: #f5f0e8;
    overflow-y: auto;
    padding: 52px 60px;
    animation: fadeInRight 0.8s ease both;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .artify-brand-logo {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1.55rem;
    font-weight: 300;
    letter-spacing: 0.32em;
    color: #1a1a1a;
    margin-bottom: 6px;
  }
  .artify-brand-logo span { font-weight: 600; }

  .artify-sub {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 36px;
  }

  .artify-role-label {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .artify-role-tabs {
    display: flex;
    margin-bottom: 30px;
    border: 1px solid #ddd;
  }

  .artify-role-tab {
    flex: 1;
    padding: 14px 16px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    transition: background 0.25s, color 0.25s;
  }
  .artify-role-tab.active { background: #1a1a1a; color: #fff; }
  .artify-role-tab:not(.active):hover { background: rgba(0,0,0,0.04); }

  .artify-name-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .artify-field-group { margin-bottom: 16px; }

  .artify-field-label {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: block;
  }

  .artify-input,
  .artify-select {
    width: 100%;
    padding: 13px 16px;
    border: 1px solid #ddd;
    background: #fff;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.82rem;
    color: #333;
    letter-spacing: 0.04em;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    -webkit-appearance: none;
  }
  .artify-input:focus,
  .artify-select:focus {
    border-color: #c49b4b;
    box-shadow: 0 0 0 3px rgba(196,155,75,0.12);
  }
  .artify-input::placeholder { color: #ccc; }

  .artify-select-wrap { position: relative; }
  .artify-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    pointer-events: none;
    font-size: 0.85rem;
  }

  .artify-checks { margin: 20px 0; }

  .artify-check-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .artify-check-row input[type='checkbox'] {
    width: 14px;
    height: 14px;
    accent-color: #c49b4b;
    margin-top: 2px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .artify-check-text {
    font-size: 0.7rem;
    color: #777;
    letter-spacing: 0.03em;
    line-height: 1.55;
  }
  .artify-check-text a { color: #c49b4b; text-decoration: underline; cursor: pointer; }

  .artify-btn-primary {
    width: 100%;
    padding: 16px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s, transform 0.15s;
    margin-bottom: 20px;
  }
  .artify-btn-primary:hover { background: #c49b4b; }
  .artify-btn-primary:active { transform: scale(0.98); }

  .artify-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
  .artify-divider-line { flex: 1; height: 1px; background: #ddd; }
  .artify-divider-text {
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    color: #bbb;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .artify-btn-google {
    width: 100%;
    padding: 14px;
    background: #fff;
    border: 1px solid #ddd;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    color: #555;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .artify-btn-google:hover {
    border-color: #c49b4b;
    box-shadow: 0 2px 12px rgba(196,155,75,0.15);
  }

  .artify-signin {
    text-align: center;
    margin-top: 22px;
    font-size: 0.7rem;
    color: #aaa;
    letter-spacing: 0.05em;
  }
  .artify-signin a { color: #c49b4b; text-decoration: none; cursor: pointer; }
  .artify-signin a:hover { text-decoration: underline; }

  .artify-error {
    font-size: 0.65rem;
    color: #c0392b;
    letter-spacing: 0.05em;
    margin-top: 5px;
    display: block;
  }

  /* ---- RESPONSIVE ---- */
  @media (max-width: 900px) {
    .artify-root { flex-direction: column; }
    .artify-left { flex: none; min-height: 300px; }
    .artify-right { flex: none; padding: 36px 28px; }
    .artify-name-row { grid-template-columns: 1fr; }
  }
`;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
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

const COUNTRIES = [
  'Australia','Bangladesh','Brazil','Canada','China','Egypt','France',
  'Germany','Ghana','India','Italy','Japan','Kenya','Mexico','Netherlands',
  'Nigeria','Pakistan','South Africa','South Korea','Spain','Sweden',
  'Turkey','United Arab Emirates','United Kingdom','United States',
];

const SignUp = () => {
  const [role, setRole] = useState('artist');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', country: '',
    agreeTerms: false, newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required.';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!form.country) e.country = 'Please select your country.';
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to the Terms of Service.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitted(true);
    console.log('SignUp payload:', { role, ...form });
  };

  if (submitted) {
    return (
      <>
        <style>{styles}</style>
        <div className="artify-root" style={{ alignItems: 'center', justifyContent: 'center', background: '#f5f0e8' }}>
          <div style={{ textAlign: 'center', padding: '60px 40px' }}>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '2rem', letterSpacing: '0.3em', color: '#1a1a1a', marginBottom: 16 }}>
              ART<span style={{ fontWeight: 600 }}>IFY</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#c49b4b', fontStyle: 'italic', marginBottom: 12 }}>
              Welcome, {form.firstName}!
            </div>
            <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.8rem', letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase' }}>
              Your account has been created. Check your inbox to verify your email.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="artify-root">

        {/* ── LEFT PANEL ── */}
        <div className="artify-left">
          <div className="artify-orb artify-orb1" />
          <div className="artify-orb artify-orb2" />
          <div className="artify-left-content">
            <div className="artify-brand-left">ART<span>IFY</span></div>
            <p className="artify-tagline">
              Join <em>12,400+</em> artists and collectors building<br />
              a new art world, together.
            </p>
            <div className="artify-stats">
              <div className="artify-stat-box">
                <div className="artify-stat-val">Free</div>
                <div className="artify-stat-label">To Join</div>
              </div>
              <div className="artify-stat-box">
                <div className="artify-stat-val">0%</div>
                <div className="artify-stat-label">Setup Fees</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="artify-right">
          <div className="artify-brand-logo">ART<span>IFY</span></div>
          <div className="artify-sub">Create your free account in minutes.</div>

          {/* Role Tabs */}
          <div className="artify-role-label">I am joining as</div>
          <div className="artify-role-tabs">
            <button
              className={`artify-role-tab ${role === 'artist' ? 'active' : ''}`}
              onClick={() => setRole('artist')}
            >
              <ArtistIcon />
              Artist / Seller
            </button>
            <button
              className={`artify-role-tab ${role === 'collector' ? 'active' : ''}`}
              onClick={() => setRole('collector')}
            >
              <CollectorIcon />
              Art Collector
            </button>
          </div>

          {/* Name Row */}
          <div className="artify-name-row">
            <div className="artify-field-group">
              <label className="artify-field-label">First Name</label>
              <input
                className="artify-input"
                type="text"
                name="firstName"
                placeholder="Layla"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="artify-error">{errors.firstName}</span>}
            </div>
            <div className="artify-field-group">
              <label className="artify-field-label">Last Name</label>
              <input
                className="artify-input"
                type="text"
                name="lastName"
                placeholder="Okafor"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="artify-error">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="artify-field-group">
            <label className="artify-field-label">Email Address</label>
            <input
              className="artify-input"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="artify-error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="artify-field-group">
            <label className="artify-field-label">Password</label>
            <input
              className="artify-input"
              type="password"
              name="password"
              placeholder="Minimum 8 characters"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="artify-error">{errors.password}</span>}
          </div>

          {/* Country */}
          <div className="artify-field-group">
            <label className="artify-field-label">Country</label>
            <div className="artify-select-wrap">
              <select
                className="artify-select"
                name="country"
                value={form.country}
                onChange={handleChange}
              >
                <option value="">Select your country...</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {errors.country && <span className="artify-error">{errors.country}</span>}
          </div>

          {/* Checkboxes */}
          <div className="artify-checks">
            <label className="artify-check-row">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
              />
              <span className="artify-check-text">
                I agree to Artify's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </span>
            </label>
            {errors.agreeTerms && <span className="artify-error" style={{ marginTop: -6, marginBottom: 8 }}>{errors.agreeTerms}</span>}
            <label className="artify-check-row">
              <input
                type="checkbox"
                name="newsletter"
                checked={form.newsletter}
                onChange={handleChange}
              />
              <span className="artify-check-text">
                Send me updates about new artists and curated collections (optional)
              </span>
            </label>
          </div>

          {/* Submit */}
          <button className="artify-btn-primary" onClick={handleSubmit}>
            Create My Account
          </button>

          {/* Divider */}
          <div className="artify-divider">
            <div className="artify-divider-line" />
            <span className="artify-divider-text">or sign up with</span>
            <div className="artify-divider-line" />
          </div>

          {/* Google */}
          <button className="artify-btn-google" onClick={() => console.log('Google sign-up')}>
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="artify-signin">
            Already have an account? <a href="#">Sign in</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
