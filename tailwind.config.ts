import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1210",       // near-black text
        paper: "#FFFFFF",     // white surfaces
        mist: "#F6F7F6",      // faint off-white background
        line: "#E4E7E5",      // hairline borders
        muted: "#6B7573",     // secondary text
        teal: {
          DEFAULT: "#0F766E",
          deep: "#0B4F4A",
          bright: "#14B8A6",
          wash: "#EAF6F4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "10px",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(15, 118, 110, 0.45)" },
          "70%": { boxShadow: "0 0 0 8px rgba(15, 118, 110, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(15, 118, 110, 0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.8s ease-out infinite",
        slideDown: "slideDown 0.16s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
