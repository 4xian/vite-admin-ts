<template>
  <div class="about">
    关于页面
    <el-button v-if="handlePermission('按钮权限')">按钮权限</el-button>
  </div>
</template>

<script lang="ts" setup>
import { handlePermission } from '@/utils/auth'
</script>
<style></style>
