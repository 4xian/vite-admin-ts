<template>
  <div ref="scrollWrap" class="min-gapless-wrap" :style="wrapStyle">
    <div v-if="data.length > 0" style="height: 100%;">
      <div class="left-controls">
        <slot name="left"></slot>
      </div>
      <div class="right-controls">
        <slot name="right"></slot>
      </div>
      <div
        ref="scrollContent"
        :class="{ 'gapless-scroll-content': !isVertical }"
        :style="posStyle"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
      >
        <div ref="scrollItem" :style="slotStyle">
          <slot></slot>
        </div>
        <div v-if="isGapless" :style="slotStyle" v-html="copyScrollHtml"></div>
      </div>
    </div>
    <div v-else class="scroll-empty flex-center">
      <img v-show="emptyImg" :src="emptyImg" :style="{ width: emptyWidth }" />
      <p>{{ emptyText }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref, reactive, computed, watch, nextTick } from 'vue'
import type { PropType } from 'vue'
import { DirectionEnum, ScrollOptions } from './type'
import { cloneDeep, isEqual, assign } from 'lodash-es'
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'

/**
    @description props / data / emits
*/

const props = defineProps({
  // 外容器宽度
  width: {
    type: Number,
    default: 200
  },
  // 外容器高度
  height: {
    type: Number,
    default: 220
  },
  // 数据列表
  data: {
    type: Array as PropType<unknown[]>,
    required: true,
    default: () => []
  },
  // 配置
  options: Object as PropType<Partial<ScrollOptions>>
})

const { width, height, options } = props
// 初始化配置
const initOptions = reactive<ScrollOptions>({
  // 0:无缝滚动(用于无点击事件) 1: 触底滚动(到达最后一个会返回顶部，用于点击事件滚动) 2:单纯图片轮播
  scrollType: 0,
  // 滚动方向 up:向上滚动 down:向下 left:向左 right:向右
  direction: DirectionEnum.UP,
  // 滚动速度 越大越快
  speed: 1,
  // 符合滚动条件后是否自动滚动
  autoPlay: true,
  // 鼠标悬停是否停止滚动
  hoverStop: true,
  // 单次滚动(轮播)距离
  step: 0,
  // 轮播停留间隔 0为自动滚动
  interval: 0,
  // 轮播图片是否显示左右控制器
  controls: true,
  // 单次轮播动画时间,若为滚动此项需为0
  animateTime: 0,
  // 轮播图片时是否首尾相连轮播
  loop: true,
  // 无内容时显示的图
  emptyImg: '',
  // 无内容时显示的文字
  emptyText: '暂无数据',
  // 无数据时图片显示大小
  emptyWidth: '30%',
  //  解决水平无缝时magin间隔问题
  marginBias: 0
})

const mergeOptions: ScrollOptions = unref(computed(() => assign({}, initOptions, options)))

const {
  emptyImg,
  autoPlay,
  speed,
  interval,
  step,
  hoverStop,
  emptyText,
  emptyWidth,
  direction,
  animateTime,
  marginBias,
  scrollType
} = mergeOptions

const scrollWrap = ref<HTMLElement | null>(null)
const scrollContent = ref<HTMLElement | null>(null)
const copyScrollHtml = ref<any>(null)
// 位置偏移量X，Y
const x = ref(0)
const y = ref(0)
// 实际内容宽高
const realW = ref(0)
const realH = ref(0)

const offset = ref(0)
const transitionTime = ref(0)
// 鼠标是否悬浮容器中
const isHover = ref(false)

const animateTimer = ref<NodeJS.Timeout | number | null>(null)
const timer = ref<NodeJS.Timeout | null>(null)

const isGapless = ref(false)

const emits = defineEmits(['activeIndex'])

/**
    @description computed
*/
const wrapStyle = computed(() => {
  return {
    width: `${width}px`,
    height: `${height}px`
  }
})

const isVertical = computed(() => {
  return direction === DirectionEnum.UP || direction === DirectionEnum.DOWN
})

const slotStyle = computed(() => {
  return isVertical.value ? { overflow: 'hidden' } : { display: 'flex' }
})

const posStyle = computed(() => {
  return {
    transform: `translate(${-unref(x)}px,${-unref(y)}px)`,
    transition: `all ${animateTime}s ease-in`
  }
})
const isScroll = computed(() => {
  return vScroll() || hScroll()
})

// const isGapless = computed(() => {
//   return scrollType === 0 && isScroll.value
// })

/**
    @description watch
*/

watch(
  props.data,
  (val, old) => {
    if (!isEqual(val, old)) {
      nextTick(() => {
        // reset()
        // init()
      })
    }
  },
  { immediate: true }
)

/**
    @description methods
*/
// 是否满足垂直/水平滚动条件
const vScroll = () => {
  const wrap: any = unref(scrollWrap)
  const content: any = unref(scrollContent)
  return content?.offsetHeight > wrap?.offsetHeight && content.offsetWidth <= wrap.offsetWidth
}
const hScroll = () => {
  const wrap: any = unref(scrollWrap)
  const content: any = unref(scrollContent)
  return content?.offsetHeight <= wrap?.offsetHeight && content.scrollWidth > wrap.offsetWidth + marginBias
}

// 重置变量
const reset = () => {
  cancelScroll()
  x.value = 0
  y.value = 0
  isGapless.value = scrollType === 0 && isScroll.value
}

// 取消滚动
const cancelScroll = () => {
  cancelAnimationFrame(Number(animateTimer))
  clearTimeout(Number(timer.value))
}

// 开始滚动
const startScroll = () => {
  cancelScroll()
  if (isHover.value) return
  animateTimer.value = requestAnimationFrame(() => {
    transitionTime.value = 0
    // 垂直滚动
    if (vScroll()) {
      // 向上
      if (direction === DirectionEnum.UP) {
        if (scrollType === 1) {
          if (y.value >= realH.value - height) y.value = 0
          else y.value += speed
        } else {
          if (y.value >= realH.value) y.value = 0
          else y.value += speed
        }
      } else if (direction === DirectionEnum.DOWN) {
        //   向下
        if (scrollType === 1) {
          if (y.value <= 0) y.value = realH.value - height
          else y.value -= speed
        } else {
          if (y.value < realH.value - height) y.value = realH.value * 2 - height
          else y.value -= speed
        }
      }
    } else if (hScroll()) {
      // 水平滚动
      // 向左
      if (direction === DirectionEnum.LEFT) {
        if (scrollType === 1) {
          if (x.value > realW.value - width) x.value = 0
          else x.value += speed
        } else {
          if (x.value > realW.value) x.value = 0
          else x.value += speed
        }
      } else if (direction === DirectionEnum.RIGHT) {
        // 向右
        if (x.value < realW.value - width) x.value = realW.value * 2 - width
        else x.value -= speed
      }
    }

    if (timer.value) clearTimeout(Number(timer.value))
    // 滚动间隔
    if (interval) {
      if (vScroll()) offset.value = y.value
      else if (hScroll()) offset.value = x.value
      if (offset.value % step === 0) {
        emits('activeIndex', offset.value / step)
        timer.value = setTimeout(() => {
          startScroll()
        }, interval)
      } else {
        startScroll()
      }
    } else {
      startScroll()
    }
  })
}

const mouseEnter = () => {
  if (hoverStop && autoPlay && unref(isScroll)) {
    isHover.value = true
    cancelScroll()
  }
}
const mouseLeave = () => {
  if (hoverStop && autoPlay && unref(isScroll)) {
    isHover.value = false
    startScroll()
  }
}
const init = () => {
  realH.value = unref(scrollContent)?.offsetHeight || 0
  realW.value = unref(scrollContent)?.scrollWidth || 0
  if (autoPlay && unref(isScroll)) {
    if (unref(isGapless)) copyScrollHtml.value = unref(scrollContent)?.innerHTML
    startScroll()
  } else cancelScroll()
}

/**
    @description life circle
*/

// tryOnMounted(() => {
//   init()
// })
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
