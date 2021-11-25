<!-- 全屏 -->
<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>全屏</span>
    </template>
    <span class="min-fullscreen" @click="handleToggle">
      <ExpandOutlined :style="{ fontSize: '16px' }" />
    </span>
  </a-tooltip>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { useLayoutSetting } from '@/store/modules/layout'
import { ExpandOutlined } from '@ant-design/icons-vue'
const { toggle, isFullscreen } = useFullscreen()
const store = useLayoutSetting()
const handleToggle = () => {
  toggle()
  store.setScreenStatus(!isFullscreen.value)
}
</script>

<style lang="scss" scoped>
.min-fullscreen {
  height: 100%;
  margin-right: 10px;
  cursor: pointer;
}

.el-icon-full-screen {
  margin: 0 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>
