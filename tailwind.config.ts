import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#0a0a0a",
        "bg-section": "#1a1a1a",
        "text-primary": "#f5f5f5",
        "text-secondary": "#a0a0a0",
        accent: "#ff6b6b",
        "accent-subtle": "#ff8787",
        overlay: "rgba(0,0,0,0.85)",
      },
      fontFamily: {
        base: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "'Open Sans'",
          "'Helvetica Neue'",
          "sans-serif",
        ],
        display: ["Georgia", "'Times New Roman'", "serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4rem",
      },
      lineHeight: {
        tight: "1.2",
        normal: "1.5",
        relaxed: "1.75",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "8rem",
      },
      maxWidth: {
        container: "1400px",
        "container-narrow": "800px",
        "container-wide": "1800px",
      },
      transitionTimingFunction: {
        fast: "0.15s ease",
        base: "0.3s ease",
        slow: "0.6s ease",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      zIndex: {
        background: "-1",
        content: "1",
        overlay: "10",
        modal: "100",
        toast: "1000",
      },
    },
  },
  plugins: [],
};

export default config;
