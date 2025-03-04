import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
const { version } = require("./package.json")

const projectRoot = __dirname

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    mkcert(),
    
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // 减少缓存大小
        maximumFileSizeToCacheInBytes: 3000000,
      },
      manifest: false,
      devOptions: {
        enabled: true,
        type: 'module'
      },
      includeAssets: [
        "apple-touch-icon.png", 
        "favicon-32x32.png", 
        "favicon-16x16.png", 
        "safari-pinned-tab.svg"
      ]
    })
  ],
  build: {
    // 优化构建配置
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    // 分割代码块
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'player': ['shikwasa2']
        }
      }
    }
  },
  server: {
    hmr: {
      // 减少HMR内存使用
      overlay: false
    },
    host: "0.0.0.0",
    proxy: {
      '/api': {
        //target: 'https://podcast-together-cloud-server.vercel.app/',
        target: 'https://podcast-together-hb.glitch.me',
        changeOrigin: true
      }
   },
  },
  resolve: {
    alias: {
      "@": resolve(projectRoot, "src"),
    }
  },
  define: {
    "PT_ENV": {
      "version": version,
      "client": "web"
    }
  }
})
