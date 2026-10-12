<template>
  <div>
    <div class="page-head"><div><span class="kicker">OVERVIEW / 01</span><h2>纸上乾坤，<em>方寸之间</em></h2><p>从地域分布到纹样寓意，探索剪纸艺术在当代的生命力。</p></div><div class="stat"><strong>1,500+</strong><span>年历史 · 中国剪纸</span></div></div>
    <section class="hero-grid">
      <article class="panel map-panel"><div class="panel-head"><div><span class="index">01</span><h3>剪纸分布地图</h3><p>点击省份查看代表性流派</p></div><span class="tag">INTERACTIVE</span></div><div ref="mapEl" class="chart map"></div></article>
      <article class="panel bar-panel"><div class="panel-head"><div><span class="index">02</span><h3>地域流派概览</h3><p>六大代表地区 · 传承数量</p></div><span class="unit">单位：项</span></div><div ref="barEl" class="chart bar"></div></article>
      <article class="panel pie-panel"><div class="panel-head"><div><span class="index">03</span><h3>受欢迎地区</h3><p>公众关注度分布</p></div></div><div ref="pieEl" class="chart pie"></div></article>
    </section>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, MapChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([BarChart, MapChart, PieChart, GridComponent, LegendComponent, TooltipComponent, VisualMapComponent, CanvasRenderer])

const mapEl = ref()
const barEl = ref()
const pieEl = ref()
const palette = ['#8f2430', '#b85845', '#d18b68', '#d9ae85', '#e0c5a7']

let charts = []
let resizeHandler
let disposed = false

function renderCharts(chinaJson) {
  if (disposed) return
  echarts.registerMap('china', chinaJson)

  const map = echarts.init(mapEl.value)
  map.setOption({ tooltip: { trigger: 'item', formatter: p => `${p.name}：${p.value || '暂无数据'}` }, visualMap: { min: 0, max: 100, left: 12, bottom: 8, show: false, inRange: { color: ['#f0dfca', '#d99978', '#8f2430'] } }, series: [{ type: 'map', map: 'china', roam: true, zoom: 1.15, label: { show: false }, itemStyle: { borderColor: '#b9755d', borderWidth: .7 }, emphasis: { label: { show: true, color: '#fff' }, itemStyle: { areaColor: '#8f2430' } }, data: [{ name: '河北省', value: 90 }, { name: '陕西省', value: 88 }, { name: '山西省', value: 85 }, { name: '江苏省', value: 82 }, { name: '浙江省', value: 75 }, { name: '四川省', value: 92 }, { name: '广东省', value: 76 }, { name: '山东省', value: 80 }, { name: '河南省', value: 60 }, { name: '甘肃省', value: 68 }, { name: '福建省', value: 70 }] }] })

  const bar = echarts.init(barEl.value)
  bar.setOption({ grid: { left: 38, right: 14, top: 12, bottom: 42 }, tooltip: { trigger: 'axis' }, xAxis: { type: 'category', data: ['河北蔚县', '陕西', '山西', '江苏扬州', '浙江乐清', '广东佛山'], axisLabel: { color: '#897b70', fontSize: 10, interval: 0, rotate: 25 } }, yAxis: { type: 'value', splitLine: { lineStyle: { color: '#eee4da' } }, axisLabel: { color: '#897b70' } }, series: [{ type: 'bar', barWidth: '48%', data: [5, 8, 6, 4, 3, 5], itemStyle: { color: '#8f2430', borderRadius: [3, 3, 0, 0] } }] })

  const pie = echarts.init(pieEl.value)
  pie.setOption({ tooltip: { trigger: 'item' }, legend: { bottom: 2, left: 'center', itemWidth: 8, itemHeight: 8, textStyle: { fontSize: 10, color: '#897b70' } }, series: [{ type: 'pie', radius: ['46%', '70%'], center: ['50%', '45%'], label: { show: false }, itemStyle: { borderColor: '#fdf9f4', borderWidth: 2 }, data: [{ name: '河北蔚县', value: 30 }, { name: '陕西旬邑', value: 22 }, { name: '甘肃庆阳', value: 18 }, { name: '山西中阳', value: 15 }, { name: '江苏扬州', value: 15 }], color: palette }] })

  charts = [map, bar, pie]
  resizeHandler = () => charts.forEach(chart => chart.resize())
  window.addEventListener('resize', resizeHandler)
}

onMounted(async () => {
  const { default: chinaJson } = await import('../assets/map/china.json')
  renderCharts(chinaJson)
})

onBeforeUnmount(() => {
  disposed = true
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  charts.forEach(chart => chart.dispose())
  charts = []
})
</script>
<style scoped>
.page-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:34px}.kicker,.index{font:11px Arial,sans-serif;letter-spacing:2px;color:#a65a48}.page-head h2{margin:10px 0 8px;font-size:clamp(27px,4vw,46px);font-weight:900;letter-spacing:3px}.page-head h2 em{font-style:normal;color:var(--red)}.page-head p{margin:0;color:var(--muted);font-size:14px}.stat{text-align:right;border-left:1px solid var(--line);padding-left:26px}.stat strong{display:block;color:var(--red);font:700 34px Arial,sans-serif}.stat span{color:var(--muted);font-size:11px}.hero-grid{display:grid;grid-template-columns:1.15fr .85fr;grid-template-rows:280px 250px;gap:18px}.panel{background:rgba(255,252,247,.8);border:1px solid var(--line);padding:22px;min-width:0}.map-panel{grid-row:1 / span 2}.panel-head{display:flex;justify-content:space-between;align-items:flex-start}.panel-head h3{margin:5px 0 3px;font-size:18px}.panel-head p{margin:0;color:var(--muted);font-size:12px}.index{display:block}.tag,.unit{color:#a65a48;font:10px Arial,sans-serif;letter-spacing:1px;border:1px solid #e5c5b1;padding:5px 7px}.chart{width:100%;height:calc(100% - 58px)}.pie{height:calc(100% - 62px)}@media(max-width:850px){.page-head{align-items:flex-start;gap:20px}.stat{display:none}.hero-grid{display:flex;flex-direction:column}.panel{height:340px}.map-panel{height:420px}}
</style>
