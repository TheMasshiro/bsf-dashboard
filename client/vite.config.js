import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: './', // Use relative paths for Android WebView assets
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimize for mobile
    target: 'es2015',
    minify: 'esbuild', // Use esbuild instead of terser
  },
  server: {
    host: true, // Allow external connections for testing on mobile
    port: 5173,
  },
});
