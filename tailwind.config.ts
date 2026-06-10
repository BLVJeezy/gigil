import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0E0D0B",
        carbon: "#1A1814",
        ivory: "#FAF7F2",
        sand: "#EFE9DF",
        gold: "#C9A24B",
        golddeep: "#9A7A2E",
        smoke: "#6B6459",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.22em" },
    },
  },
  plugins: [],
};
export default config;
