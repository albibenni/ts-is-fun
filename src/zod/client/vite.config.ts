import { resolve } from "node:path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

const port = 4000;

export default defineConfig({
  plugins: [react()],
  server: {
    port,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@server": resolve(__dirname, "../server"),
      "@shared": resolve(__dirname, "../shared"),
    },
  },
});
