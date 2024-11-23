/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Ensure it includes the main HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include React, JavaScript, TypeScript, and JSX/TSX files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
