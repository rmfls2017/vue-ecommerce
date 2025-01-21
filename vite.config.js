import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2015', // Node 16 환경에 맞는 target 설정
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue', 'vue-router'],
          // 필요한 다른 청크들 추가 가능
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    cors: true
  }
})