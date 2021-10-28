<template>
  <div class="demo-gapless-scroll">
    <div class="scroll-title">无缝滚动demo</div>
    <div class="scroll-item">
      <GaplessScroll />
    </div>
  </div>
</template>

<script lang="ts" setup>
import GaplessScroll from '@/components/gapless-scroll/index.vue'
// import Charts from '@/components/Charts/index.vue'
</script>
<style lang="scss" scoped>
.demo-gapless-scroll {
  height: 100%;
  padding: 50px 100px;
  border: 1px solid red;
}
</style>
