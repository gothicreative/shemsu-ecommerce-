import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Add this if you keep getting the jsx key error
  esbuild: {
    jsx: "automatic",
  },
  server: {
    // Only proxy API calls to your backend during development.
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false
      },
    },
  },
});