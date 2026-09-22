import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1020", // deep navy — primary background
          dark: "#151B2E", // secondary dark — cards, panels
        },
        ivory: "#F7F3EA", // warm ivory — light-surface accents
        gold: "#C8A96B", // muted gold — used sparingly (accents, dividers, icons)
        lavender: "#8D86C9", // soft lavender — secondary accent
        accentBlue: "#667EEA", // accent blue — links, primary buttons
        textPrimary: "#F8F8F5",
        textMuted: "#AEB4C2",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cosmic-gradient":
          "radial-gradient(ellipse at top, #151B2E 0%, #0B1020 60%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
