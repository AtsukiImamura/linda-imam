import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math"; @import "@/assets/sass/_variables.scss"; @import "@/assets/sass/main.scss";`,
        // prependData: `@import "@/assets/_variables.scss";`,
      },
    },
  },
  build: { 
    watch: {}, //監視する
    rollupOptions: {
      output: {
        dir: "../client/dist",
        // file: "imam-beditor.js"
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})
