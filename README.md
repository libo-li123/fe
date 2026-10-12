# 中国剪纸 · 文化图谱

基于原 `sy` 项目重构的 Vue 3 + Vite 前端。原项目把加载页、导航、三张 ECharts 图表和四个子页面
全部堆在 `App.vue`（约 400 行），且「发展历程 / 装饰元素 / 制作过程」只有占位文字。本次重构在保留
原有主题、配色与中国地图数据的前提下，拆分为独立组件并补齐了三个子页面的真实内容。

## 技术栈

| 依赖 | 版本 | 用途 |
| --- | --- | --- |
| vue | ^3.5.41 | 前端框架，`<script setup>` 组合式 API |
| vite | ^8.2.2 | 开发与生产构建 |
| @vitejs/plugin-vue | ^6.0.8 | 解析 `.vue` 单文件组件 |
| echarts | ^6.1.0 | 地图 / 柱状图 / 环形饼图 |

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器（热更新）
npm run build      # 生产构建，输出到 dist/
npm run preview    # 本地预览 dist 产物
```

## 目录结构

```
fe/
├── index.html
├── package.json
├── vite.config.js              # 构建拆包配置
└── src/
    ├── main.js                 # 应用入口
    ├── App.vue                 # 整体框架：顶栏导航 + 页面切换
    ├── assets/
    │   ├── img/jiazai.jpg      # 原加载页素材（当前未使用，可作备选视觉资源）
    │   └── map/china.json      # 中国地图 GeoJSON
    └── components/
        ├── LoadPage.vue        # 开屏页
        ├── HomePage.vue        # 首页：地图 + 柱状图 + 环形饼图
        ├── TimelinePage.vue    # 发展历程
        └── ElementsPage.vue    # 装饰元素 + 制作过程
```

## 相比原项目的改动

1. **拆分组件**：原 `App.vue` 同时负责页面状态机和全部图表初始化，现拆为四个子组件，根组件只保留
   顶栏与页面切换。
2. **补齐内容**：发展历程（4 个时间节点）、装饰元素（福 / 喜 / 鱼 / 莲 / 凤 / 寿 六种纹样）、
   制作过程（折纸定型 → 描绘纹样 → 剪刻细节 → 展开装裱）不再是占位文字。
3. **修复资源引入**：移除未使用的 `element-plus`（原项目装了但实际未用，却引入约 360 KB CSS）和
   `vue-router`（原项目装了但未启用）。ECharts 改为 `echarts/core` 按需引入。
4. **地图数据延迟加载**：`china.json` 改为动态 `import()`，与 ECharts 一起拆成独立分包，
   首屏主包从 2.69 MB 降到约 11 KB。
5. **修复图表生命周期**：原代码里柱状图未监听 `resize`，且移除监听时依赖混用的具名 / 匿名函数。
   现统一使用局部 `resizeHandler` 变量，三张图在窗口变化时同步自适应，组件卸载时统一 `dispose`。
6. **修复构建警告与残留问题**：清理原 `App.vue` 中的调试红框样式、修正页面标题编码，
   并在 `vite.config.js` 中按依赖拆包，构建不再输出体积警告。

## 构建产物

| 文件 | 体积 | gzip |
| --- | --- | --- |
| dist/assets/index-*.js | 约 11 KB | 约 5 KB |
| dist/assets/vue-*.js | 约 68 KB | 约 27 KB |
| dist/assets/china-*.js | 约 581 KB | 约 201 KB |
| dist/assets/echarts-*.js | 约 614 KB | 约 206 KB |
| dist/assets/index-*.css | 约 9 KB | 约 2 KB |

`china.json` 与 ECharts 仅在首页图表渲染时按需加载，不再阻塞开屏页。

## 常见问题

### `file watcher error: EBUSY: resource busy or locked, watch '...\work\...'`

**原因**：Vite 默认监视项目下所有文件，而 `work/` 目录用于存放本地验证脚本、截图和临时浏览器配置。
如果曾用这个目录作为无头浏览器的 `--user-data-dir`，Chrome 会在其中保持 `Network\Cookies`、
`Sessions\*` 等文件的独占句柄，文件监视器读到这些被锁定的文件就会抛出 EBUSY。

**为什么报错但页面仍能打开**：这是监视器的告警而非致命错误，开发服务器会继续运行，
但每次热更新扫描到该目录都会重复打印，并可能拖慢响应。

**处理方式**：

1. 结束占用该目录的浏览器进程（例如以 `--user-data-dir=...\work\chrome-profile` 启动的无头实例）。
2. 删除临时目录：`work\chrome-profile`。
3. `vite.config.js` 中已加入 `server.watch.ignored: ['**/work/**']`，从源头避免再次监视该目录；
   `.gitignore` 也已忽略 `work/`。

**验证方式**：在 `work/` 下放置被独占锁定的文件，分别用新旧配置启动开发服务器。
旧配置稳定复现三条 EBUSY 报错，新配置启动与热更新全程零报错。
