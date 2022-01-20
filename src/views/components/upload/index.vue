<template>
  <div>
    <Divider content-position="center">图片上传demo</Divider>
    <div class="upload">
      <MinUpload ref="uploadRef" :file-list="fileList" @finish="uploadFinish"></MinUpload>
      <Button @click="getImg">获取</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import MinUpload from '@/components/upload/index.vue'
import { Divider, Button } from 'ant-design-vue'
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
