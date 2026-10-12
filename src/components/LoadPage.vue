<template>
  <section class="intro" @click="emit('enter')">
    <div class="intro-copy"><span class="eyebrow">INTANGIBLE CULTURAL HERITAGE · 01</span><h1>一纸一世界</h1><p>中国剪纸文化图谱</p><button>进入图谱 <span>→</span></button></div>
    <div class="seal">囍</div><div class="intro-side">PAPER<br/>CUTTING<br/><i>传承 · 创新</i></div>
  </section>
</template>
<script setup>
const emit = defineEmits(['enter'])
</script>
<style scoped>
.intro{min-height:100vh;position:relative;overflow:hidden;display:grid;place-items:center;background:linear-gradient(110deg,#741b29,#a8393b 56%,#79232e);color:#fff;cursor:pointer}.intro:before{content:'囍';position:absolute;right:10%;top:4%;font-size:min(55vw,560px);color:rgba(255,224,192,.08);font-weight:900}.intro-copy{position:relative;text-align:center;z-index:1}.eyebrow{font:11px Arial,sans-serif;letter-spacing:4px;color:#f2cbb3}.intro h1{margin:20px 0 4px;font-size:clamp(56px,10vw,130px);letter-spacing:14px;font-weight:900;text-shadow:6px 6px 0 rgba(60,0,10,.2)}.intro p{margin:0;color:#f6d8c0;font-size:20px;letter-spacing:8px}.intro button{margin-top:42px;border:1px solid #e8bfa8;background:transparent;color:#fff;padding:12px 24px;letter-spacing:3px;cursor:pointer}.intro button span{font-size:19px;margin-left:14px}.seal{position:absolute;left:8%;top:15%;font-size:42px;color:#f5d9b9;transform:rotate(-12deg);border:2px solid #f5d9b9;padding:8px}.intro-side{position:absolute;right:6%;bottom:10%;font:11px Arial,sans-serif;line-height:1.7;letter-spacing:4px;color:#ecc4ab}.intro-side i{font-family:serif;letter-spacing:2px}@media(max-width:600px){.intro h1{letter-spacing:7px}.seal{font-size:26px;top:8%}.intro-side{display:none}}
</style>
