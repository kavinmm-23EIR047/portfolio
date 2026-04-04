/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🔥 REQUIRED
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 🎯 BRAND COLORS */
        primary: "#0ea5e9",     // sky-500
        secondary: "#6366f1",   // indigo-500

        /* 🌞 LIGHT THEME */
        lightBg: "#ffffff",
        lightCard: "#f8fafc",   // soft gray
        lightText: "#0f172a",   // slate-900
        lightSubtext: "#64748b", // slate-500

        /* 🌙 DARK THEME (BLUE STYLE) */
        darkBg: "#020617",      // deep blue-black
        darkCard: "#0f172a",    // slate-900
        darkBorder: "#1e293b",  // slate-800

        /* ✨ ACCENT */
        accent: "#38bdf8",      // sky-400
      },
    },
  },
  plugins: [],
};