/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      colors: {
        primary: "#441752",
        secondary: "#8174A0", 
        accent: "#A888B5",
         light:"#EFB6C8" 
      },
    },
  },
  plugins: [],
}

