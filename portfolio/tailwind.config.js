/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      colors: {
        brand: {
          indigo: "var(--brand-indigo)",
          "indigo-light": "var(--brand-indigo-light)",
          blue: "var(--brand-blue)",
          "blue-deep": "var(--brand-blue-deep)",
          "blue-light": "var(--brand-blue-light)",
          orange: "var(--brand-orange)", // mapped to primary blue accent for consistency
          "orange-hover": "var(--brand-orange-hover)",
          "dark-green": "var(--brand-dark-green)", // mapped to silver
          "purple-muted": "var(--brand-purple-muted)",
        },
        silver: {
          50: "var(--silver-50)",
          100: "var(--silver-100)",
          200: "var(--silver-200)",
          300: "var(--silver-300)",
          400: "var(--silver-400)",
          500: "var(--silver-500)",
          600: "var(--silver-600)",
        },
        bg: {
          light: "var(--bg-light)",
          white: "var(--bg-white)",
          translucent: "var(--bg-translucent)",
        },
        text: {
          dark: "var(--text-dark)",
          muted: "var(--text-muted)",
          light: "var(--text-light)",
          "light-muted": "var(--text-light-muted)",
        },
        bdr: {
          light: "var(--border-light)",
          translucent: "var(--border-translucent)",
        }
      },
      borderRadius: {
        pill: "var(--radius-pill)",
        card: "var(--radius-card)",
        xl: "var(--radius-xl)",
        ui: "var(--radius-ui)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
        orange: "var(--shadow-orange)",
        silver: "var(--shadow-silver)",
      }
    },
  },
  plugins: [],
};