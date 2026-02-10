import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // 项目根目录
  root: '.',

  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: true
  },

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        cases: resolve(__dirname, 'cases.html'),
        about: resolve(__dirname, 'about.html')
      }
    }
  },

  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@styles': resolve(__dirname, './styles'),
      '@scripts': resolve(__dirname, './scripts'),
      '@images': resolve(__dirname, './images')
    }
  },

  // CSS配置
  css: {
    devSourcemap: true
  }
})
