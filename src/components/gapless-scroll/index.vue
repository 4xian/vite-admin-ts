<template>
  <div ref="scrollWrap" class="min-gapless-wrap" :style="wrapStyle">
    <!-- 左右指示器 -->
    <template v-if="showControls && (direction === 'left' || direction === 'right')">
      <div class="scroll-controls left-controls" @click="handleLeftClick">
        <slot name="left"></slot>
      </div>
      <div class="scroll-controls right-controls" @click="handleRightClick">
        <slot name="right"></slot>
      </div>
    </template>
    <!-- 上下指示器 -->
    <template v-if="showControls && (direction === 'up' || direction === 'down')">
      <div class="scroll-controls up-controls" @click="handleUpClick">
        <slot name="up"></slot>
      </div>
      <div class="scroll-controls down-controls" @click="handleDownClick">
        <slot name="down"></slot>
      </div>
    </template>

    <div v-if="data.length > 0" ref="visualArea" :style="contentStyle">
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
    <!-- 无内容时 -->
    <div v-else class="scroll-empty flex-center">
      <img v-show="emptyImg" :src="emptyImg" :style="{ width: emptyWidth }" />
      <p>{{ emptyText }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref, reactive, computed, watch, nextTick, onDeactivated, onActivated } from 'vue'
import type { PropType, CSSProperties } from 'vue'
import { DirectionEnum, ScrollOptions } from './type'
import { isEqual, assign } from 'lodash-es'
import { tryOnBeforeUnmount } from '@vueuse/core'

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
  // 0:无缝滚动(用于无点击事件) 1: 触底滚动(到达最后一个会返回顶部，用于点击事件滚动)
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
  // 自定义控制器时，两边控制器宽(左右滚动时)或高(上下滚动时)总和
  // 即为外层容器width/height需补充的padding
  controlsPadding: [0, 0],
  // 单次轮播动画时间,若为滚动此项需为0
  animateTime: 0.4,
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
  scrollType,
  controls,
  controlsPadding
} = mergeOptions

const scrollWrap = ref<HTMLElement | null>(null)
const scrollContent = ref<HTMLElement | null>(null)
// 可视区域ref
const visualArea = ref<HTMLElement | null>(null)
const copyScrollHtml = ref<any>(null)
// 位置偏移量X，Y
const x = ref(0)
const y = ref(0)
// 实际内容宽高
const realW = ref(0)
const realH = ref(0)

// 实际可视区域 宽高
const realVisualW = ref(0)
const realVisualH = ref(0)

const offset = ref(0)
const transitionTime = ref(0)
// 鼠标是否悬浮容器中
const isHover = ref(false)

// 滚动定时器
const animateTimer = ref<NodeJS.Timeout | number | null>(null)
// 滚动间隔定时器
const timer = ref<NodeJS.Timeout | null>(null)

// 是否符合无缝条件(滚动,轮播)
const isGapless = ref(false)

const emits = defineEmits(['activeIndex'])

/**
    @description computed
*/
const wrapStyle = computed(
  (): CSSProperties => {
    return {
      width: `${width}px`,
      height: `${height}px`,
      padding: `${controlsPadding[0]}px ${controlsPadding[1]}px`
    }
  }
)

const contentStyle = computed(
  (): CSSProperties => {
    return {
      height: '100%',
      overflow: 'hidden'
    }
  }
)
const posStyle = computed(
  (): CSSProperties => {
    return {
      transform: `translate(${-unref(x)}px,${-unref(y)}px)`,
      transition: `all ${transitionTime.value}s ease-in`
    }
  }
)

const isVertical = computed((): boolean => {
  return direction === DirectionEnum.UP || direction === DirectionEnum.DOWN
})

const slotStyle = computed(
  (): CSSProperties => {
    return isVertical.value ? { overflow: 'hidden' } : { display: 'flex' }
  }
)

// 是否符合滚动条件
const isScroll = computed((): boolean => {
  return vScroll() || hScroll()
})
// 是否显示操作指示器
const showControls = computed(() => {
  return controls && interval && props.data.length
})

/**
    @description watch
*/

watch(
  props.data,
  (val, old) => {
    if (!isEqual(val, old)) {
      nextTick(() => {
        reset()
        init()
      })
    }
  },
  { immediate: true }
)

/**
    @description methods
*/
// 是否满足垂直/水平滚动条件
const vScroll = (): boolean => {
  const wrap: any = unref(scrollWrap)
  const content: any = unref(scrollContent)
  return content?.offsetHeight > wrap?.offsetHeight && content.offsetWidth <= wrap.offsetWidth
}
const hScroll = (): boolean => {
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
          if (y.value >= unref(realH) - unref(realVisualH)) y.value = 0
          else y.value += speed
        } else {
          y.value += speed
          if (y.value >= unref(realH)) y.value = 0
        }
      } else if (direction === DirectionEnum.DOWN) {
        //   向下
        if (scrollType === 1) {
          if (y.value <= 0) y.value = unref(realH) - unref(realVisualH)
          else y.value -= speed
        } else {
          y.value -= speed
          if (y.value <= unref(realH) - unref(realVisualH)) y.value = unref(realH) * 2 - unref(realVisualH)
        }
      }
    } else if (hScroll()) {
      // 水平滚动
      // 向左
      if (direction === DirectionEnum.LEFT) {
        if (scrollType === 1) {
          if (x.value >= unref(realW) - unref(realVisualW)) x.value = 0
          else x.value += speed
        } else {
          x.value += speed
          if (x.value >= unref(realW)) x.value = 0
        }
      } else if (direction === DirectionEnum.RIGHT) {
        // 向右
        if (scrollType === 1) {
          if (x.value <= 0) x.value = unref(realW) - unref(realVisualW)
          else x.value -= speed
        } else {
          x.value -= speed
          if (x.value <= unref(realW) - unref(realVisualW)) x.value = unref(realW) * 2 - unref(realVisualW)
        }
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

/* 间隔轮播点击事件 上下左右 */
const handleLeftClick = () => {
  transitionTime.value = animateTime
  if (x.value <= 0) {
    transitionTime.value = 0
    x.value = unref(realW) - unref(realVisualW)
  } else x.value -= step
}
const handleRightClick = () => {
  transitionTime.value = animateTime
  if (x.value >= unref(realW) - unref(realVisualW)) {
    transitionTime.value = 0
    x.value = 0
  } else x.value += step
}

const handleUpClick = () => {
  console.log('up', step)
  transitionTime.value = animateTime
  if (y.value <= 0) {
    transitionTime.value = 0
    y.value = unref(realH) - unref(realVisualH)
  } else y.value -= step
}
const handleDownClick = () => {
  console.log('down', step, y.value)
  transitionTime.value = animateTime
  if (y.value >= unref(realH) - unref(realVisualH)) {
    transitionTime.value = 0
    y.value = 0
  } else y.value += step
}

const init = () => {
  realH.value = unref(scrollContent)?.offsetHeight || 0
  realW.value = unref(scrollContent)?.scrollWidth || 0
  realVisualW.value = unref(scrollContent)?.offsetWidth || 0
  realVisualH.value = unref(visualArea)?.offsetHeight || 0
  if (autoPlay && unref(isScroll)) {
    if (unref(isGapless)) copyScrollHtml.value = unref(scrollContent)?.innerHTML
    startScroll()
  } else if (!autoPlay && interval) {
    if (unref(isGapless)) copyScrollHtml.value = unref(scrollContent)?.innerHTML
  } else cancelScroll()
}

/**
    @description life circle
*/

// tryOnMounted(() => {
//   init()
// })

tryOnBeforeUnmount(() => {
  reset()
  //   cancelScroll()
})
onDeactivated(() => {
  reset()
})
onActivated(() => {
  reset()
  init()
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
