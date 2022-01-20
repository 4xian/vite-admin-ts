<template>
  <div class="min-crop">
    <img ref="imgRef" :src="src" alt="" :style="imgStyle" />
  </div>
</template>
<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { PropType, CSSProperties } from 'vue'
type CropperType = Cropper.Options
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 400
  },
  options: {
    type: Object as PropType<Cropper>,
    default: () => {}
  }
})
const initOptions = reactive<CropperType>({
  aspectRatio: 16 / 9,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true
})

const imgRef = ref<HTMLImageElement | null>(null)
const cropper = ref<Cropper | null>(null)
const { width, height, options } = props
const imgStyle = computed(
  (): CSSProperties => {
    return {
      width: `${width}px`,
      height: `${height}px`
    }
  }
)

const init = () => {
  const ele = unref(imgRef)
  if (ele) {
    cropper.value = new Cropper(ele, { ...options })
  }
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})

defineExpose({
  cropper
})
</script>
