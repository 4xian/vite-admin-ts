<template>
  <div class="about">
    关于页面
    <Button v-if="handlePermission('按钮权限')" type="primary">按钮权限</Button>
    <Second />
    <Test />
    <Three />
  </div>
</template>

<script lang="ts" setup>
import { handlePermission } from '@/utils/auth'
import { Button } from 'ant-design-vue'
</script>
<style></style>
