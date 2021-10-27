<template>
  <router-view />
</template>

<script setup lang="ts">
import { useResize } from '@/hooks/useResize'
useResize()
</script>
