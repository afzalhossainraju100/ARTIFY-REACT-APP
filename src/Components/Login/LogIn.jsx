import React, { useState, use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "./LogIn.css";

// ===== ICON COMPONENTS =====
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

// ===== DATA CONSTANTS =====
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

// ===== SUCCESS MESSAGE COMPONENT =====
const SuccessMessage = () => (
  <div className="min-h-screen w-full bg-amber-50 flex items-center justify-center p-6">
    <div className="text-center">
      <div className="font-josefin text-5xl font-light tracking-wider text-stone-900 mb-4">
        ART<span className="font-semibold text-amber-700">IFY</span>
      </div>
      <div className="font-cormorant text-3xl text-amber-600 italic mb-3">
        Welcome back!
      </div>
      <p className="font-josefin text-sm tracking-widest text-stone-500 uppercase">
        You have signed in successfully.
      </p>
    </div>
  </div>
);

// ===== MAIN LOGIN COMPONENT =====
const LogIn = () => {
  const navigate = useNavigate();
  const authContext = use(AuthContext);
  const { signInWithGoogle, user, loading } = authContext || {};

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/profile");
    }
  }, [user, loading, navigate]);

  // ===== STATE MANAGEMENT =====
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const [quoteIdx] = useState(() => Math.floor(Math.random() * QUOTES.length));

  const quote = QUOTES[quoteIdx];

  // ===== FORM HANDLERS =====
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
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSuccess(true);
    console.log("Login payload:", form);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setGoogleError("");
    try {
      if (!signInWithGoogle) {
        throw new Error(
          "Google Sign-In not configured. Please check your Firebase setup.",
        );
      }
      const result = await signInWithGoogle();
      if (result?.user) {
        console.log("Google sign-in successful:", result.user.email);
        setSuccess(true);
        // Navigation will happen via the useEffect watching 'user' state
      }
    } catch (error) {
      console.error("Google sign-in error:", error.message || error);
      const errorMessage =
        error?.code === "auth/popup-blocked"
          ? "Popup was blocked. Please allow popups and try again."
          : error?.code === "auth/popup-closed-by-user"
            ? "Sign-in was cancelled."
            : "Failed to sign in with Google. Please try again.";
      setGoogleError(errorMessage);
      setGoogleLoading(false);
    }
  };

  // ===== RENDER SUCCESS STATE =====
  if (success) {
    return <SuccessMessage />;
  }

  // ===== RENDER LOGIN FORM =====
  return (
    <div className="font-josefin min-h-screen flex flex-col md:flex-row">
      {/* ===== LEFT PANEL — FORM ===== */}
      <div className="flex-1 bg-amber-50 flex flex-col justify-center p-8 md:p-16 overflow-y-auto md:overflow-y-visible animate-alFadeLeft">
        {/* Logo */}
        <div className="font-josefin text-2xl font-light tracking-widest text-stone-900 mb-1">
          ART<span className="font-semibold">IFY</span>
        </div>
        <div className="text-xs uppercase tracking-widest text-stone-500 mb-8">
          Welcome back. Sign in to your account.
        </div>

        {/* Email Field */}
        <div className="mb-5">
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
            <span className="text-xs text-red-600 tracking-wider mt-1 block">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Password
            </label>
            <button
              onClick={() =>
                alert(
                  "Password reset flow — integrate your auth provider here.",
                )
              }
              className="text-xs tracking-wider text-amber-600 hover:underline bg-none border-none cursor-pointer font-josefin p-0"
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-300 bg-white font-josefin text-sm text-stone-800 tracking-wider focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
          />
          {errors.password && (
            <span className="text-xs text-red-600 tracking-wider mt-1 block">
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-stone-900 text-white font-josefin text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 hover:bg-amber-600 active:scale-95 mb-6"
        >
          Sign in to Artify
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-stone-300"></div>
          <span className="text-xs uppercase tracking-widest text-stone-400 whitespace-nowrap">
            or continue with
          </span>
          <div className="flex-1 h-px bg-stone-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full py-3.5 bg-white border border-stone-300 font-josefin text-xs tracking-wider text-stone-600 cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:border-amber-600 hover:shadow-lg disabled:opacity-60 mb-3"
        >
          <GoogleIcon />
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        {googleError && (
          <p className="text-xs text-red-600 text-center mb-3 tracking-wider">
            {googleError}
          </p>
        )}

        {/* Register Link */}
        <div className="text-center text-xs text-stone-500 tracking-wider">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-amber-600 no-underline hover:underline cursor-pointer"
          >
            Create one free
          </a>
        </div>
      </div>

      {/* ===== RIGHT PANEL — QUOTE ===== */}
      <div className="flex-1 bg-linear-to-br from-purple-900 via-purple-700 to-amber-900 relative flex flex-col items-center justify-center overflow-hidden min-h-screen md:min-h-auto animate-alFadeRight">
        {/* Background Orbs */}
        <div
          className="al-orb-1 absolute w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: "rgba(196,155,75,0.1)",
            top: "-100px",
            left: "-80px",
          }}
        ></div>
        <div
          className="al-orb-2 absolute w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{
            background: "rgba(100,40,120,0.3)",
            bottom: "20px",
            right: "-60px",
          }}
        ></div>
        <div
          className="al-orb-3 absolute w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: "rgba(196,155,75,0.07)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        {/* Quote Content */}
        <div className="al-quote-content relative z-10 text-center px-8 py-12 animate-alFadeUp">
          <div className="font-josefin text-4xl md:text-5xl font-light tracking-widest text-white mb-8">
            ART<span className="font-semibold text-amber-600">IFY</span>
          </div>
          <div className="font-cormorant text-6xl md:text-7xl text-amber-600/25 leading-none mb-0 select-none">
            "
          </div>
          <p className="font-cormorant text-lg md:text-2xl text-white/80 italic leading-loose max-w-sm mx-auto">
            {quote.text}
          </p>
          <div className="w-10 h-px bg-amber-600/50 mx-auto mt-6 mb-0"></div>
          <div className="text-xs uppercase tracking-widest text-white/40 mt-4">
            — {quote.author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
