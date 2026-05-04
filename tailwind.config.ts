import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        shore: "var(--shore)",
        bone: "var(--bone)",
        pearl: "var(--pearl)",
        mist: "var(--mist)",
        sage: "var(--sage)",
        moss: "var(--moss)",
        copper: "var(--copper)",
        ember: "var(--ember)",
        surf: "var(--surf)",
        harbor: "var(--harbor)",
        brass: "var(--brass)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Times New Roman", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.22em",
        widest3: "0.3em",
        widest4: "0.4em",
      },
      keyframes: {
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll-cue": "scroll-cue 2s var(--soft) infinite",
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
