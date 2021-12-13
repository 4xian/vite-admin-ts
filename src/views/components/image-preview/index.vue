<template>
  <div class="image-preview">
    <img
      v-for="(item, idx) in imgList"
      :key="item"
      class="image-preview-item"
      :src="item"
      alt=""
      @click="handlePreview(idx)"
    />
    <ImagePreview
      v-model:show="show"
      :list="imgList"
      :index="idx"
      :click-mask-close="true"
      @closeModal="close"
      @activeIndex="handleActive"
    />
    <a-button type="primary" @click="preview">预览</a-button>
  </div>
</template>
<script lang="ts" setup>
import ImagePreview from '@/components/ImagePreview/index.vue'
import { reactive, ref } from 'vue'
const imgList = reactive<string[]>([
  'https://picsum.photos/800/600',
  'https://picsum.photos/600/400',
  'https://picsum.photos/300/200',
  'https://picsum.photos/300/400'
])
const show = ref(false)
const idx = ref(0)

const handlePreview = (e: number) => {
  show.value = true
  idx.value = e
}

const handleActive = (e: number) => {
  console.log(e)
}

const close = () => {
  console.log(show.value)
}

const preview = () => {
  show.value = true
}
</script>

<style scoped lang="scss">
.image-preview-item {
  position: relative;
  cursor: pointer;
}
</style>
