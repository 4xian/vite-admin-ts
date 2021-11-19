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
import { propsData } from './props'
const props = defineProps(propsData)
const animateTimer = ref<NodeJS.Timeout | number>()

/**
 * @description 类型一
 */
// 列表
const defaultList = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
// 自定义样式后的单个数字高度
const singleHeight = ref(0)
// 数字当前滚动的高度
const scrollH = ref(0)
const singleRef = ref<HTMLElement | null>(null)
const isFinish = ref(false)
const timer = ref(0)
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

/**
 * @description 类型二
 */

// 适用于类型二的emits
const emits = defineEmits(['finished'])

// 索引
const idx = ref(0)
const allItemRef = ref<HTMLElement | null>(null)
const refList = reactive<{ allRef: any }>({
  allRef: []
})

// 处理props数据列表
const allList = computed(() => {
  return [...formatSeparator(String(props.value), 3, props.separator)]
})

/**
 * @description methods
 */

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
@import './index.scss';
</style>
