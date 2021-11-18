<template>
  <div class="min-count-scroll">
    <!-- 类型一 -->
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
    <!-- 类型二 -->
    <template v-if="type === 2">
      <div class="all-count">
        <slot name="prefix"></slot>
        <div
          v-for="(it, idx) in allList"
          :ref="(e) => handleAllRef(e, idx)"
          :key="`all-column${it}-${idx}`"
          class="all-count-column"
          :style="handleAllStyle(it)"
        >
          <div v-if="it === props.separator" :class="[separatorClass]">{{ it }}</div>
          <div
            v-for="v in defaultList"
            v-else
            ref="allItemRef"
            :key="`all-count${v}`"
            :class="[customClass]"
            class="all-count-item"
          >
            <div :style="filterStyle" :class="[{ 'count-debounce': isFinish }]">{{ v }}</div>
          </div>
        </div>
        <slot name="suffix"></slot>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, CSSProperties, watch, nextTick, unref, onBeforeUnmount } from 'vue'
import { formatSeparator } from '@/utils/util'
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
    type: [Number, String],
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
    default: 5
  },
  // 多组件同页面不同的key
  key: {
    type: [Number, String],
    default: new Date().getTime()
  },

  /* 类型二props */

  // 类型二时转几轮停下
  round: {
    type: Number,
    default: 1
  },
  // 类型二停下时缓慢步数
  step: {
    type: Number,
    default: 3
  },
  // 分隔符
  separator: {
    type: String,
    default: ''
  },
  // 分隔符样式
  separatorClass: {
    type: String,
    default: ''
  }
})
const defaultList = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // 类型一列表
// 自定义样式后的单个数字高度
const singleHeight = ref(0)
// 数字滚动的高度
const scrollH = ref(0)
const singleRef = ref<HTMLElement | null>(null)
const isFinish = ref(false)
const timer = ref(0)
const animateTimer = ref<NodeJS.Timeout | number>()

// 类型二索引
const idx = ref(0)
const allItemRef = ref<HTMLElement | null>(null)
const refList = reactive<{ allRef: any }>({
  allRef: []
})

const emits = defineEmits(['finished'])

const scrollHeight = computed(
  (): CSSProperties => {
    return {
      transform: `translate3d(0,-${unref(scrollH)}px,0)`
    }
  }
)
const filterStyle = computed(
  (): CSSProperties => {
    return {
      filter: unref(isFinish) ? 'blur(0px)' : 'blur(3px)'
    }
  }
)

// 类型二列表
const allList = computed(() => {
  return [...formatSeparator(String(props.value), 3, props.separator)]
})

const handleAllRef = (e: any, idx: number) => {
  refList.allRef[idx] = e
}

const handleAllStyle = (idx: string): CSSProperties => {
  const flag = idx === props.separator
  const num = Number(idx) * unref(singleHeight)
  return {
    height: `${unref(singleHeight)}px`,
    transform: `translate3d(0,-${flag ? 0 : unref(isFinish) ? num : unref(scrollH)}px,0)`
  }
}

// 单个数字滚动初始化
const singleInit = () => {
  reset()
  singleHeight.value = unref(singleRef)?.offsetHeight || 0
  timer.value = new Date().getTime()
  singleScroll()
}

// 类型二初始化
const allInit = () => {
  reset()
  singleHeight.value = unref(allItemRef)?.offsetHeight || 0
  allScroll()
}

const clear = () => {
  cancelAnimationFrame(Number(animateTimer.value))
}

const reset = () => {
  scrollH.value = 0
  idx.value = 0
  isFinish.value = false
}

// 类型一
const singleScroll = () => {
  clear()
  animateTimer.value = requestAnimationFrame(() => {
    if (new Date().getTime() <= unref(timer) + props.delay * 1000) {
      if (unref(scrollH) < unref(singleHeight) * 10) {
        scrollH.value += props.speed
        singleScroll()
      } else {
        scrollH.value = 0
        singleScroll()
      }
    } else {
      if (unref(scrollH) >= unref(singleHeight) * 10) {
        scrollH.value = Number(props.value) * unref(singleHeight)
        isFinish.value = true
        clear()
      } else {
        scrollH.value += props.step
        singleScroll()
      }
    }
  })
}

// 类型二
const allScroll = () => {
  clear()
  animateTimer.value = requestAnimationFrame(() => {
    if (unref(idx) < props.round) {
      if (unref(scrollH) < unref(singleHeight) * 10) {
        scrollH.value += props.speed
        allScroll()
      } else {
        idx.value += 1
        scrollH.value = 0
        allScroll()
      }
    } else {
      if (unref(scrollH) >= unref(singleHeight) * 10) {
        isFinish.value = true
        emits('finished', true)
        clear()
      } else {
        scrollH.value += props.step
        allScroll()
      }
    }
  })
}

watch(
  () => props.value,
  (v, old) => {
    if (props.type === 2) {
      if (v !== old) {
        nextTick(() => {
          allInit()
        })
      }
    } else {
      nextTick(() => {
        singleInit()
      })
    }
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  clear()
})
</script>

<style lang="scss" scoped>
.min-count-scroll {
  .single-count {
    overflow: hidden;
  }

  .all-count {
    display: flex;
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
