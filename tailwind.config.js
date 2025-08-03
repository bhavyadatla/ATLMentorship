/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        gradientStart: "#fbfcfc", // Lightest color at 40%
        gradientMid: "#abebc6", // Middle color at 70%
        gradientEnd: "#f9e79f", // End color at 100%
      },
    },
  },
  plugins: [],
}
