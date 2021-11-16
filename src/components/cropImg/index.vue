<template>
  <div class="min-crop">裁剪</div>
</template>
<script setup lang="ts">
import Cropper from 'cropperjs'
import { reactive } from 'vue'

type CropperType = Cropper.Options

const initOptions = reactive<CropperType>({
  aspectRatio: 16 / 9
})
</script>
