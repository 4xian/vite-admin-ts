<template>
  <div class="crop flex-column-center">
    <a-divider content-position="center">图片裁剪demo</a-divider>
    <div class="crop-item align-center">
      <CropImg ref="cropRef" :src="src"></CropImg>
      <img :src="afterImg" style="max-width: 500px;" />
    </div>
    <div class="action">
      <a-button type="primary" @click="instance?.reset()">重置</a-button>
      <a-button type="primary" @click="cropFunc">裁剪</a-button>
    </div>
    <!-- <div>{{ imgInfo }}</div> -->
  </div>
</template>
<script setup lang="ts">
import CropImg from '@/components/cropImg/index.vue'
import Cropper from 'cropperjs'
import { ref, unref, nextTick, onMounted } from 'vue'
// const src = ref('https://picsum.photos/500/400')
const src = ref('https://i.picsum.photos/id/1059/500/400.jpg?hmac=jBBfjYMVw1EmeWsbTw7xZFDKJEz7sLpdAW9Q7zNXiRA')
const cropRef = ref<any>(null)
const afterImg = ref('')
const imgInfo = ref<Cropper.Data>()
const instance = ref<Cropper>()

const cropFunc = () => {
  unref(instance)
    ?.getCroppedCanvas()
    .toBlob((blob: any) => {
      const file: FileReader = new FileReader()
      file.onloadend = (e: ProgressEvent) => {
        // @ts-ignore
        afterImg.value = e.target.result
        imgInfo.value = unref(instance)?.getData()
      }
      file.readAsDataURL(blob)
    }, 'image/jpeg')
}

onMounted(() => {
  nextTick(() => {
    if (unref(cropRef)) {
      instance.value = unref(cropRef).cropper
    }
  })
})
</script>
<style scoped lang="scss">
.crop {
  &-item {
    width: 100%;
    margin-bottom: 50px;
    justify-content: space-around;
  }
}
</style>
