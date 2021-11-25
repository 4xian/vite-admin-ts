<template>
  <router-view v-if="isShow" />
</template>

<script setup lang="ts">
import { provide, nextTick, ref } from 'vue'
import { useResize } from '@/hooks/useResize'
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
