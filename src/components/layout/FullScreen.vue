<!-- 全屏 -->
<template>
  <el-tooltip effect="dark" content="全屏" placement="bottom">
    <span class="min-fullscreen" @click="handleToggle">
      <i class="el-icon-full-screen" />
    </span>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { useLayoutSetting } from '@/store/modules/layout'
const { toggle, isFullscreen } = useFullscreen()
const store = useLayoutSetting()
store

const handleToggle = () => {
  toggle()
  store.setScreenStatus(!isFullscreen.value)
}
</script>

<style lang="scss" scoped>
.min-fullscreen {
  height: 100%;

  &:hover {
    background-color: #f6f6f6;
  }
}

.el-icon-full-screen {
  margin: 0 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>
