<template>
  <ConfigProvider :locale="zhCN">
    <router-view v-if="isShow" />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { provide, nextTick, ref } from 'vue'
import { useResize } from '@/hooks/useResize'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
const isShow = ref(true)
useResize()
const refresh = () => {
  isShow.value = false
  nextTick(() => {
    isShow.value = true
  })
}
provide('refresh', refresh)
</script>
