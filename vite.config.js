import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ["@babel/plugin-syntax-import-attributes"]
    }
  }
  )],
  base: process.env.VITE_BASE_URL || "/",
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
