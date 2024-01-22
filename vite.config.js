import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ["@babel/plugin-syntax-import-attributes"]
    }
  }
  )],
  server: {
    hmr: false,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
