<template>
  <div class="demo-gapless-scroll">
    <div class="scroll-title">
      <el-divider content-position="center">无缝滚动demo</el-divider>
    </div>
    <div class="scroll flex-center">
      <GaplessScroll :width="200" :height="236" :options="options" :data="list" @activeIndex="activeIndex">
        <template #up>
          <i class="el-icon-arrow-up"></i>
        </template>
        <template #down>
          <i class="el-icon-arrow-down"></i>
        </template>
        <!-- <template #left>
          <i class="el-icon-arrow-left"></i>
        </template>
        <template #right>
          <i class="el-icon-arrow-right"></i>
        </template> -->
        <div v-for="v in list" :key="v" class="scroll-item">{{ v }}</div>
      </GaplessScroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GaplessScroll from '@/components/gapless-scroll/index.vue'
import { ref, reactive, computed } from 'vue'
import { ScrollOptions } from '@/components/gapless-scroll/type'

const list = reactive([
  /* '滚动内容第一条哈哈哈哈哈哈',
  '滚动内容第二条哈哈哈哈哈哈',
  '滚动内容第三条哈哈哈哈哈哈',
  '滚动内容第四条哈哈哈哈哈哈',
  '滚动内容第五条哈哈哈哈哈哈',
  '滚动内容第六条哈哈哈哈哈哈' */
  '滚动内容第四条',
  '滚动内容第五条',
  '滚动内容第六条',
  '滚动内容第七条',
  '滚动内容第八条',
  '滚动内容第九条',
  '滚动内容第十条'
])

const options = reactive<Partial<ScrollOptions>>({
  speed: 1,
  autoPlay: false,
  direction: 'up',
  scrollType: 1,
  interval: 3000,
  step: 44,
  //   step: 100,
  animateTime: 0.5,
  controlsPadding: [30, 0]
})

const activeIndex = (e: any) => {
  console.log(e)
}
</script>

<style lang="scss" scoped>
.demo-gapless-scroll {
  .scroll {
    &-item {
      //   width: 100px;
      //   height: 126px;
      padding: 10px 0;
      border: 1px solid;
    }
  }
}
</style>
