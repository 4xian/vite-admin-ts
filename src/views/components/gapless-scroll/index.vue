<template>
  <div class="demo-gapless-scroll">
    <div class="scroll-title">无缝滚动demo</div>
    <div class="scroll-item">
      <GaplessScroll :options="options" :data="list">
        <div v-for="v in list" :key="v" class="scroll">{{ v }}</div>
      </GaplessScroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GaplessScroll from '@/components/gapless-scroll/index.vue'
import { ref, reactive, computed } from 'vue'
import { ScrollOptions } from '@/components/gapless-scroll/type'

const list = reactive([
  '滚动内容第一条',
  '滚动内容第二条',
  '滚动内容第三条',
  '滚动内容第四条',
  '滚动内容第五条',
  '滚动内容第六条',
  '滚动内容第七条',
  '滚动内容第八条',
  '滚动内容第九条',
  '滚动内容第十条'
])

const options = reactive<Partial<ScrollOptions>>({
  speed: 0.5,
  direction: 'up',
  scrollType: 0,
  interval: 2500,
  step: 42
})
</script>

<style lang="scss" scoped>
.demo-gapless-scroll {
  height: 100%;
  padding: 20px 10px;
  border: 1px solid red;

  .scroll {
    padding: 10px 0;
    // border: 1px solid;
  }
}
</style>
