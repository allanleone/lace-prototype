import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { defineConfig } from "vite"
import pugPlugin from "vite-plugin-pug"

const options = { pretty: true } 
const locals = { name: "My Pug" }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // isCustomElement: (tag) => ['Brand', UserMenu].includes(tag),
      }
    }
  }), vueJsx(), pugPlugin(options, locals)],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
