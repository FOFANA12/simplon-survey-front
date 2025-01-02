import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
        75: "18.75rem",
        70: "17.5rem",
        
      },
      colors: {
        primary: "var(--color-primary)",
        blue: {
          DEFAULT: "#C2002F", // Remplacement de blue par la couleur Simplon
          50: "#FDF2F5",
          100: "#FCE8ED",
          300: "#F59BAE",
          400: "#E8536B",
          500: "#C2002F", // Couleur principale
          600: "#A90028",
          700: "#8F0021",
          800: "#74001B",
          900: "#5A0014",
        },
      },
    },
  },
  plugins: [
    daisyui,
    function ({ addUtilities }) {
      addUtilities({
        ".checkbox-disabled": {
          border: "2px solid var(--color-primary) !important",
          opacity: ".6 !important",
        },
      });
    },
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#C2002F", // Rouge vif
          "primary-content": "#ffffff", // Contenu en blanc
        },
      },
    ],
  },
};
