<template>
  <div class="image-preview">
    <Divider content-position="center">图片预览demo</Divider>
    <div>
      自定义插槽预览(需自定义预览显隐show与图片索引index)
      <ImagePreview v-model:show="show" :index="idx" :list="imgList" src-name="url" :click-mask-close="false">
        <img
          v-for="(item, idx) in imgList"
          :key="item.url"
          class="image-preview-item"
          :src="item.url"
          alt=""
          @click="handlePreview(idx)"
        />
      </ImagePreview>
    </div>
    <div>
      默认图片预览(多图)
      <ImagePreview
        root-class="image-box-class"
        image-class="image-item-class"
        :list="imgList"
        src-name="url"
        :click-mask-close="false"
      />
    </div>
    <div>
      默认图片预览(单图)
      <ImagePreview list="https://picsum.photos/320/180" :click-mask-close="false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import ImagePreview from '@/components/ImagePreview/index.vue'
import { Divider } from 'ant-design-vue'
import { reactive, ref } from 'vue'
const imgList = reactive<{ url: string }[]>([
  {
    url: 'https://picsum.photos/800/600'
  },
  {
    url: 'https://picsum.photos/600/400'
  },
  {
    url: 'https://picsum.photos/300/200'
  },
  {
    url: 'https://picsum.photos/300/400'
  }
])

const defaultList = reactive<string[]>(['https://picsum.photos/320/180'])
const show = ref(false)
const idx = ref(0)

const handlePreview = (e: number) => {
  show.value = true
  idx.value = e
}
const preview = () => {
  show.value = true
}
</script>

<style scoped lang="scss">
.image-preview-item {
  position: relative;
  width: 300px;
  margin-right: 30px;
  cursor: pointer;

  &:nth-last-of-type(1) {
    margin-right: 0;
  }
}
</style>
<style>
.image-box-class {
  display: flex;
}

.image-item-class {
  margin-right: 30px;
}
</style>
