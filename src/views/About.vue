<template>
  <div class="about">
    关于页面
    <a-button v-if="handlePermission('按钮权限')" type="primary">按钮权限</a-button>
    <Second />
    <Test />
    <Three />
  </div>
</template>

<script lang="ts" setup>
import { handlePermission } from '@/utils/auth'
</script>
<style></style>
