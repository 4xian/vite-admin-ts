<template>
  <a-config-provider :locale="zhCN">
    <router-view v-if="isShow" />
  </a-config-provider>
</template>

<script setup lang="ts">
import { provide, nextTick, ref } from 'vue'
import { useResize } from '@/hooks/useResize'
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
