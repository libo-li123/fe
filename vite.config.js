import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // work/ 存放验证脚本、截图与临时浏览器配置，无需参与热更新监视。
    watch: {
      ignored: ['**/work/**'],
    },
  },
  build: {
    // ECharts 与地图数据分别独立成块并延迟加载，其余首屏代码约 80 kB。
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/echarts') || id.includes('node_modules/zrender')) return 'echarts'
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) return 'vue'
        },
      },
    },
  },
})
