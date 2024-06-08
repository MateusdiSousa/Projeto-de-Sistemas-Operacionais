/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {}
  },
  daisyui:{
    themes: [
      {
        mytheme : {
          "primary": "#7AD67C",
          "secondary": "#3AA852",
          "accent": "#6B4316",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        }
      }
      
    ]
  },

  plugins: [require('daisyui')],
}

