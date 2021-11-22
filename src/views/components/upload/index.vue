<template>
  <div class="upload">
    <MinUpload ref="uploadRef" :file-list="fileList" @finish="uploadFinish"></MinUpload>
    <!-- <TestUpload /> -->
    <a-button @click="getImg">获取</a-button>
  </div>
</template>
<script setup lang="ts">
import MinUpload from '@/components/upload/index.vue'
import TestUpload from '@/components/upload/test.vue'
import { ref, reactive } from 'vue'

const uploadRef = ref()
const fileList = reactive([
  {
    uid: '-1',
    name: 'image.png',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }
])

const getImg = () => {
  console.log(uploadRef.value.getFileList())
}
const uploadFinish = (e: any) => {
  console.log(e)
}
</script>
<style lang="scss" scoped>
.upload {
  display: flex;
  width: 300px;
}
</style>
