import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `vite` (dev) serves index.html as the playground.
// `vite build` produces the library in dist/ (ESM + CJS).
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.js",
      name: "ReactGlowRipple",
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // don't bundle peers — consumers bring their own React
      external: ["react", "react-dom", "react/jsx-runtime", "canvas-confetti"],
    },
  },
});
