module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your React component files
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#F8D7DA',
        'custom-gray': '#E2E3E5'
      },
    },
  },
  plugins: [],
};
