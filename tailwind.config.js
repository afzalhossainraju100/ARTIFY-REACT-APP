/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["'Josefin Sans'", "sans-serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
      },
      colors: {
        amber: {
          600: "#c49b4b",
          700: "#a88137",
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.9s ease both",
        fadeInRight: "fadeInRight 0.8s ease both",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
