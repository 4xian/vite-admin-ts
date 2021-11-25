<template>
  <div class="count-scroll flex-column-center">
    <!--  每次单个数字滚动 -->
    <div class="single-count flex">
      <template v-for="(v, idx) in count" :key="v">
        <MinCountScroll
          v-if="v !== ','"
          :key="`${v}-${idx}`"
          class="single-count-item"
          :value="v"
          :delay="idx + 0.5"
        ></MinCountScroll>
        <div v-else style="font-size: 24px;">,</div>
      </template>
    </div>
    <div>
      <a-button type="primary" @click="change">类型一：随机数字</a-button>
    </div>
    <!-- 多数字一起滚动 -->
    <div class="single-count flex">
      <MinCountScroll
        custom-class="all-class"
        separator-class="separator-class"
        :type="2"
        :value="allValue"
        separator=","
      >
        <!-- <template #prefix>
          <span>$</span>
        </template>
        <template #suffix>
          <span>(元)</span>
        </template> -->
      </MinCountScroll>
    </div>
    <div>
      <a-button type="primary" @click="changeTwo">类型二：切换数字</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import MinCountScroll from '@/components/count-scroll/index.vue'
import { formatSeparator } from '@/utils/util'
const count = ref<string[]>(['1', ',', '8', '7', '4'])
const allValue = ref('5678')
const change = () => {
  count.value = [...formatSeparator(String(Math.floor(Math.random() * 10000)), 3, ',')]
}
const changeTwo = () => {
  allValue.value = '35986'
}
</script>

<style scoped lang="scss">
.count-scroll {
  .single-count {
    margin: 40px 0;

    &-item {
      margin: 0 5px;
      font-size: 24px;
      //   border: 1px solid;
      border-radius: 10px;
    }
  }
}
</style>
<style>
.all-class {
  margin: 0 5px;
  font-size: 24px;
  color: cornflowerblue;
}

.separator-class {
  font-size: 24px;
  color: cornflowerblue;
}
</style>
