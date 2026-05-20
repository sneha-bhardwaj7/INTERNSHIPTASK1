import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 5173
  },
  preview: {
    // Allow preview from external hosts (Render preview). Using wildcard to avoid blocked host errors.
    allowedHosts: ["*"]
  }
});