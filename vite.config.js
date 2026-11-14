import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // This matches the existing GitHub Pages repository URL: /sindh-clean/
  base: "/sindh-clean/",
});
