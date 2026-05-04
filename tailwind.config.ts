import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        shore: "var(--shore)",
        bone: "var(--bone)",
        pearl: "var(--pearl)",
        mist: "var(--mist)",
        sage: "var(--sage)",
        copper: "var(--copper)",
        surf: "var(--surf)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        wider2: "0.22em",
      },
      keyframes: {
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
        },
      },
      animation: {
        "scroll-cue": "scroll-cue 1.8s var(--soft) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
