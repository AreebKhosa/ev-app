import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--color-bg-base)",
        "bg-panel": "var(--color-bg-panel)",
        "bg-panel-hover": "var(--color-bg-panel-hover)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "volt-cyan": "var(--color-volt-cyan)",
        "volt-purple": "var(--color-volt-purple)",
        "volt-pink": "var(--color-volt-pink)",
        "volt-accent": "var(--color-volt-accent)",
        "btn-dark": "var(--color-btn-dark)",
        "btn-dark-text": "var(--color-btn-dark-text)",
        hairline: "var(--color-hairline)",
        "hairline-bright": "var(--color-hairline-bright)",
      },
    },
  },
  plugins: [],
};

export default config;
