<template>
  <div class="count-scroll">
    <!--  单个数字滚动 -->
    <div class="single-count flex">
      <!-- 此处的key需独一无二 -->
      <div v-for="(v, idx) in count" :key="v" class="single-count-item">
        <MinCountScroll :key="uniqueKey()" :value="v" :delay="idx + 1"></MinCountScroll>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="change">切换</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import MinCountScroll from '@/components/count-scroll/index.vue'
const count = ref([6, 5, 4, 3])
const change = () => {
  count.value = [6, 5, 4, 3]
}
const uniqueKey = () => {
  return `${new Date().getTime()}`
}
</script>

<style scoped lang="scss">
.count-scroll {
  .single-count {
    margin-bottom: 40px;

    &-item {
      margin: 0 10px;
      border: 1px solid;
      border-radius: 4px;
    }
  }
}
</style>
