import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto)", "sans-serif"],
      },
      colors: {
        brand: {
          blue: "#4682b4",
          "blue-dark": "#2e5d8e",
          "blue-light": "#5a9fd4",
          sky: "#b0e0e6",
          "sky-dark": "#87cedc",
          red: "#b22222",
          warm: "#665e53",
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
