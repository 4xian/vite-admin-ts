<template>
  <div>测试自动注册组件</div>
  <img :src="getRandomImage(300, 200, 'jpg')" alt="" />
</template>
<script lang="ts" setup>
import { getRandomImage } from '@/utils/util'
</script>
<style lang="scss" scoped></style>
