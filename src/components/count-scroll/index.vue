<template>
  <div class="min-count-scroll">
    <template v-if="type === 1">
      <div class="single-count" :style="{ height: `${singleHeight}px` }">
        <div
          v-for="(v, idx) in defaultList"
          :key="`single-count-${idx}`"
          ref="singleRef"
          class="single-count-item"
          :class="[customClass]"
          :style="scrollHeight"
        >
          <div :style="filterStyle" :class="[{ 'count-debounce': isFinish }]">{{ v }}</div>
        </div>
      </div>
    </template>
    <template v-if="type === 2">
      <!-- <div class="all-count">
        <div class="all-count-item" v-for="(it, idx) in allList" :key="`${new Date().getTime()}`"></div>
      </div> -->
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, CSSProperties, watch, nextTick, unref, onBeforeUnmount } from 'vue'
const props = defineProps({
  // type:1 单个数字滚动
  type: {
    type: Number,
    default: 1
  },
  // 自定义数字样式class
  customClass: {
    type: String,
    default: ''
  },
  // 最终停留数字
  value: {
    type: Number,
    default: 0
  },
  // 多数字数字之间的延迟停留
  delay: {
    type: Number,
    default: 2
  },
  // 滚动速度
  speed: {
    type: Number,
    default: 10
  },
  // 多组件同页面不同的key
  key: {
    type: [Number, String],
    default: new Date().getTime()
  }
})
const defaultList = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
// 自定义样式后的单个数字高度
const singleHeight = ref(0)
// 数字滚动的高度
const scrollH = ref(0)
const singleRef = ref<HTMLElement | null>(null)
const isFinish = ref(false)

const timer = ref(0)
const animateTimer = ref<NodeJS.Timeout | number>()

const scrollHeight = computed(
  (): CSSProperties => {
    return {
      transform: `translate3d(0,-${scrollH.value}px,0)`
    }
  }
)
const filterStyle = computed(
  (): CSSProperties => {
    return {
      filter: unref(isFinish) ? 'blur(0px)' : 'blur(2px)'
    }
  }
)

// 单个数字滚动初始化
const singleInit = () => {
  scrollH.value = 0
  singleHeight.value = singleRef.value?.offsetHeight || 0
  timer.value = new Date().getTime()
  singleScroll()
}

//
const init = () => {}

const clear = () => {
  cancelAnimationFrame(Number(animateTimer.value))
}

const singleScroll = () => {
  clear()
  animateTimer.value = requestAnimationFrame(() => {
    if (new Date().getTime() < unref(timer) + props.delay * 1000) {
      if (unref(scrollH) < unref(singleHeight) * 10) {
        scrollH.value += props.speed
        singleScroll()
      } else {
        scrollH.value = 0
        singleScroll()
      }
    } else {
      scrollH.value = props.value * unref(singleHeight)
      isFinish.value = true
    }
  })
}

watch(
  () => props.key,
  () => {
    nextTick(() => {
      props.type === 1 ? singleInit() : init()
    })
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  clear()
})
</script>

<style lang="scss" scoped>
.min-count-scroll {
  .single-count {
    overflow: hidden;

    &-item {
      padding: 10px;
    }
  }

  .all-count {
    overflow: hidden;
  }
}

.count-debounce {
  animation: count-debounce 1.5s 0s ease-in-out;
}
@keyframes count-debounce {
  0% {
    transform: translateY(6px);
  }

  25% {
    transform: translateY(-6px);
  }

  50% {
    transform: translateY(3px);
  }

  75% {
    transform: translateY(-3px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
