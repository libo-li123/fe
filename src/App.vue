<template>
  <Transition name="fade" mode="out-in">
    <LoadPage v-if="showIntro" @enter="showIntro = false" />
    <div v-else class="app-shell">
      <header class="topbar">
        <div class="brand" @click="active = 'home'">
          <span class="brand-mark">剪</span>
          <span><strong>中国剪纸</strong><small>文化图谱 · 数据可视化</small></span>
        </div>
        <nav class="nav" aria-label="主导航">
          <button v-for="item in navItems" :key="item.id" :class="{ active: active === item.id }" @click="active = item.id">
            <span>{{ item.label }}</span><small>{{ item.sub }}</small>
          </button>
        </nav>
        <div class="header-note"><span class="dot"></span>非遗数字档案 · 2026</div>
      </header>
      <main class="page">
        <HomePage v-if="active === 'home'" />
        <TimelinePage v-else-if="active === 'timeline'" />
        <ElementsPage v-else />
      </main>
      <footer><span>© 中国剪纸文化图谱</span><span>以纸为媒 · 以艺传心</span></footer>
    </div>
  </Transition>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import LoadPage from './components/LoadPage.vue'
import HomePage from './components/HomePage.vue'
import TimelinePage from './components/TimelinePage.vue'
import ElementsPage from './components/ElementsPage.vue'

const showIntro = ref(true)
const active = ref('home')
const navItems = [
  { id: 'home', label: '首页', sub: 'Overview' },
  { id: 'timeline', label: '发展历程', sub: 'Timeline' },
  { id: 'elements', label: '装饰元素', sub: 'Motifs' },
  { id: 'process', label: '制作过程', sub: 'Process' },
]

watch(active, async value => {
  if (value !== 'process') return
  await nextTick()
  document.querySelector('.process')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&display=swap');
:root { --red:#8f2430; --red-dark:#651b25; --ink:#2d2522; --paper:#f5eee5; --line:#dfd2c4; --muted:#897b70; }
* { box-sizing:border-box; } body { margin:0; color:var(--ink); background:#f8f4ef; font-family:'Noto Serif SC','STSong',serif; } button { font:inherit; }
.app-shell { min-height:100vh; display:flex; flex-direction:column; background:radial-gradient(circle at 90% 5%, #fffaf4 0, transparent 28%), var(--paper); }
.topbar { height:88px; padding:0 5vw; display:flex; align-items:center; gap:40px; border-bottom:1px solid var(--line); background:rgba(250,247,242,.9); }
.brand { display:flex; align-items:center; gap:12px; min-width:260px; cursor:pointer; } .brand-mark { width:40px; height:40px; display:grid; place-items:center; color:#fff; background:var(--red); font-size:23px; box-shadow:4px 4px 0 #d9b8a8; } .brand strong { display:block; font-size:19px; letter-spacing:2px; } .brand small { color:var(--muted); font:11px Arial,sans-serif; letter-spacing:1px; }
.nav { display:flex; align-self:stretch; gap:10px; flex:1; } .nav button { position:relative; border:0; background:none; color:#8b7d73; padding:0 16px; cursor:pointer; text-align:left; } .nav button span { display:block; font-size:15px; } .nav button small { display:block; margin-top:3px; font:10px Arial,sans-serif; letter-spacing:1px; opacity:.6; } .nav button:after { content:''; position:absolute; height:3px; left:16px; right:16px; bottom:0; background:transparent; } .nav button.active { color:var(--red); font-weight:700; } .nav button.active:after { background:var(--red); }
.header-note { color:var(--muted); font-size:11px; white-space:nowrap; } .dot { display:inline-block; width:6px; height:6px; background:#b35a45; border-radius:50%; margin-right:7px; }
.page { width:min(1280px,90vw); margin:0 auto; flex:1; padding:46px 0 64px; } footer { display:flex; justify-content:space-between; padding:18px 5vw; color:#a4968b; border-top:1px solid var(--line); font-size:11px; }
.fade-enter-active,.fade-leave-active { transition:opacity .35s; } .fade-enter-from,.fade-leave-to { opacity:0; }
@media(max-width:850px){ .topbar{height:auto;min-height:80px;padding:16px 5vw;flex-wrap:wrap;gap:16px}.brand{min-width:200px}.header-note{display:none}.nav{order:3;flex-basis:100%;height:42px}.nav button{padding:0 8px}.nav button:after{left:8px;right:8px}.page{padding-top:28px;width:90vw} footer{font-size:10px} }
</style>
