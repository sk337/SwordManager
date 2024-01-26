import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import VitePluginBuildMetadata from 'vite-plugin-build-metadata';
import ogPlugin from 'vite-plugin-open-graph';

dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-syntax-import-attributes"]
      }
    }),
    UnpluginInjectPreload({
      files: [{
        entryMatch: /.*\.ttf/
      }]
    }),
    VitePluginBuildMetadata(),
    ogPlugin({
      basic: {
        title: "Sword Manager",
        type: "website",
        url: process.env.VITE_URL || "http://sword-manager.pages.dev",
        image: {
          url: "./src/swordlogo.png",
          type: "image/png",
          width: 300,
          height: 300,
          alt: "Sword with Gear"
        },
        description: "100% client sided Sword Battle account manager written in react"
      },
      twitter: {
        
      }
    })
  ],
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
