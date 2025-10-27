/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9",
        accent: "#FACC15",
        dark: "#0F0F1A"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 20px rgba(109, 40, 217, 0.8)",
        glow: "0 0 30px rgba(250, 204, 21, 0.7)"
      },
      animation: {
        "pulse-slow": "pulse 4s infinite ease-in-out"
      }
    }
  },
  plugins: []
};
