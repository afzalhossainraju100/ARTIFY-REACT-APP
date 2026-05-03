import React, { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400;600&display=swap');

  .al-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .al-root {
    font-family: 'Josefin Sans', sans-serif;
    min-height: 100vh;
    display: flex;
  }

  /* ══════════ LEFT — FORM PANEL ══════════ */
  .al-form-side {
    flex: 0 0 50%;
    background: #f5f0e8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 72px;
    animation: alFadeLeft 0.8s ease both;
  }

  @keyframes alFadeLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .al-logo {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1.55rem;
    font-weight: 300;
    letter-spacing: 0.32em;
    color: #1a1a1a;
    margin-bottom: 6px;
  }
  .al-logo span { font-weight: 600; }

  .al-welcome {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 44px;
  }

  .al-field-group { margin-bottom: 20px; }

  .al-field-label {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    color: #999;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: block;
  }

  .al-pw-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .al-forgot {
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    color: #c49b4b;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Josefin Sans', sans-serif;
    padding: 0;
  }
  .al-forgot:hover { text-decoration: underline; }

  .al-input {
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
  }
  .al-input:focus {
    border-color: #c49b4b;
    box-shadow: 0 0 0 3px rgba(196,155,75,0.12);
  }
  .al-input::placeholder { color: #ccc; }

  .al-error {
    font-size: 0.62rem;
    color: #c0392b;
    letter-spacing: 0.05em;
    margin-top: 5px;
    display: block;
  }

  .al-btn-primary {
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
    margin-top: 6px;
  }
  .al-btn-primary:hover { background: #c49b4b; }
  .al-btn-primary:active { transform: scale(0.98); }

  .al-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
  }
  .al-div-line { flex: 1; height: 1px; background: #ddd; }
  .al-div-text {
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    color: #bbb;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .al-btn-social {
    width: 100%;
    padding: 13px;
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
    margin-bottom: 10px;
  }
  .al-btn-social:hover {
    border-color: #c49b4b;
    box-shadow: 0 2px 12px rgba(196,155,75,0.15);
  }

  .al-register {
    text-align: center;
    margin-top: 24px;
    font-size: 0.7rem;
    color: #aaa;
    letter-spacing: 0.05em;
  }
  .al-register a {
    color: #c49b4b;
    text-decoration: none;
    cursor: pointer;
  }
  .al-register a:hover { text-decoration: underline; }

  /* ══════════ RIGHT — QUOTE PANEL ══════════ */
  .al-quote-side {
    flex: 0 0 50%;
    background: linear-gradient(135deg, #2d1b4e 0%, #4a2060 35%, #6b3a6b 60%, #7a5c30 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    animation: alFadeRight 0.9s ease both;
  }

  @keyframes alFadeRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .al-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    pointer-events: none;
  }
  .al-orb1 {
    width: 380px; height: 380px;
    background: rgba(196,155,75,0.1);
    top: -100px; left: -80px;
    animation: alOrb 9s ease-in-out infinite alternate;
  }
  .al-orb2 {
    width: 260px; height: 260px;
    background: rgba(100,40,120,0.3);
    bottom: 20px; right: -60px;
    animation: alOrb 7s ease-in-out infinite alternate-reverse;
  }
  .al-orb3 {
    width: 160px; height: 160px;
    background: rgba(196,155,75,0.07);
    top: 50%; left: 50%;
    animation: alOrb 11s ease-in-out infinite alternate;
  }

  @keyframes alOrb {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(18px, -18px) scale(1.1); }
  }

  .al-quote-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 50px 60px;
    animation: alFadeUp 1s ease 0.3s both;
  }

  @keyframes alFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .al-q-brand {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 2.6rem;
    font-weight: 300;
    letter-spacing: 0.35em;
    color: #fff;
    margin-bottom: 52px;
  }
  .al-q-brand span { color: #c49b4b; font-weight: 600; }

  .al-q-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem;
    color: rgba(196,155,75,0.28);
    line-height: 1;
    margin-bottom: -10px;
    user-select: none;
  }

  .al-q-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    color: rgba(255,255,255,0.8);
    line-height: 1.8;
    font-style: italic;
    max-width: 420px;
    margin: 0 auto;
  }
  .al-q-text em {
    color: #c49b4b;
    font-style: normal;
  }

  .al-q-rule {
    width: 40px;
    height: 1px;
    background: rgba(196,155,75,0.45);
    margin: 22px auto 0;
  }

  .al-q-author {
    margin-top: 16px;
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
  }

  /* ══════════ RESPONSIVE ══════════ */
  @media (max-width: 900px) {
    .al-root { flex-direction: column; }
    .al-form-side { flex: none; padding: 48px 32px; }
    .al-quote-side { flex: none; min-height: 320px; }
    .al-quote-content { padding: 36px 28px; }
    .al-q-brand { font-size: 2rem; margin-bottom: 32px; }
    .al-q-text { font-size: 1.15rem; }
  }
`;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const QUOTES = [
  {
    text: (
      <>
        Every artist dips his brush in his own soul, and paints his{" "}
        <em>own nature</em> into his pictures.
      </>
    ),
    author: "Henry Ward Beecher",
  },
  {
    text: (
      <>
        The purpose of art is washing the dust of daily life off our{" "}
        <em>souls.</em>
      </>
    ),
    author: "Pablo Picasso",
  },
  {
    text: (
      <>
        Creativity takes courage. Every brushstroke is a declaration of{" "}
        <em>who you are.</em>
      </>
    ),
    author: "Henri Matisse",
  },
];

const LogIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [quoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));

  const quote = QUOTES[quoteIdx];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (form.password.length < 6)
      e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSuccess(true);
    console.log("Login payload:", form);
  };

  /* ── Success State ── */
  if (success) {
    return (
      <>
        <style>{styles}</style>
        <div
          className="al-root"
          style={{
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f0e8",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "80px 40px",
              animation: "alFadeUp 0.7s ease both",
            }}
          >
            <div
              className="al-logo"
              style={{ fontSize: "2rem", marginBottom: 16 }}
            >
              ART<span>IFY</span>
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                color: "#c49b4b",
                fontStyle: "italic",
                marginBottom: 12,
              }}
            >
              Welcome back!
            </p>
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                color: "#999",
                textTransform: "uppercase",
              }}
            >
              You have signed in successfully.
            </p>
          </div>
        </div>
      </>
    );
  }

  /* ── Main Render ── */
  return (
    <>
      <style>{styles}</style>
      <div className="al-root">
        {/* ═══ LEFT — FORM ═══ */}
        <div className="al-form-side">
          <div className="al-logo">
            ART<span>IFY</span>
          </div>
          <div className="al-welcome">
            Welcome back. Sign in to your account.
          </div>

          {/* Email */}
          <div className="al-field-group">
            <label className="al-field-label">Email Address</label>
            <input
              className="al-input"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="al-error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="al-field-group">
            <div className="al-pw-header">
              <label className="al-field-label" style={{ marginBottom: 0 }}>
                Password
              </label>
              <button
                className="al-forgot"
                onClick={() =>
                  alert(
                    "Password reset flow — integrate your auth provider here.",
                  )
                }
              >
                Forgot password?
              </button>
            </div>
            <input
              className="al-input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="al-error">{errors.password}</span>
            )}
          </div>

          {/* Submit */}
          <button className="al-btn-primary" onClick={handleSubmit}>
            Sign in to Artify
          </button>

          {/* Divider */}
          <div className="al-divider">
            <div className="al-div-line" />
            <span className="al-div-text">or continue with</span>
            <div className="al-div-line" />
          </div>

          {/* Social Buttons */}
          <button
            className="al-btn-social"
            onClick={() => console.log("Google sign-in")}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Register Link */}
          <div className="al-register">
            Don't have an account? <a href="#">Create one free</a>
          </div>
        </div>

        {/* ═══ RIGHT — QUOTE PANEL ═══ */}
        <div className="al-quote-side">
          <div className="al-orb al-orb1" />
          <div className="al-orb al-orb2" />
          <div className="al-orb al-orb3" />

          <div className="al-quote-content">
            <div className="al-q-brand">
              ART<span>IFY</span>
            </div>
            <div className="al-q-mark">"</div>
            <p className="al-q-text">{quote.text}</p>
            <div className="al-q-rule" />
            <div className="al-q-author">— {quote.author}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
