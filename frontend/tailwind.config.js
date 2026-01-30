// // frontend/tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// export default {
//   // 'content' tells Tailwind to scan all your files in the 'src' folder
//   // for class names like "flex", "p-4", "bg-red-500", etc.
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // This scans every .js and .jsx file in /src
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 🌙 This is key for the Light/Dark toggle
  theme: {
    extend: {
      colors: {
        // Minimalist Palette
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0f172a", // Deep slate for light mode
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f1f5f9", // Light gray for light mode
          foreground: "#0f172a",
        },
        muted: {
          DEFAULT: "#f8fafc",
          foreground: "#64748b",
        },
      },
    },
  },
  plugins: [],
};