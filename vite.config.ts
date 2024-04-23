import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 500, // 单位 kb
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
      treeshake: {
        preset: 'recommended',
        manualPureFunctions: ['console.log'],
      },
    },
  },
});
