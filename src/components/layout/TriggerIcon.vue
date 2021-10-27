<!-- 头部关闭/打开左侧菜单icon -->
<template>
  <div class="triggle-icon" :title="iconText" @click="triggleEmits('triggleIcon')">
    <svg
      :class="{ 'triggle-icon-active': active }"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutSetting } from '@/store/modules/layout'
const sidebar = useLayoutSetting()
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const iconText = computed(() => {
  return sidebar.sideOpened ? '关闭侧边栏' : '打开侧边栏'
})
const triggleEmits = defineEmits(['triggleIcon'])
</script>

<style lang="scss" scoped>
.triggle-icon {
  margin-left: 10px;

  svg {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    cursor: pointer;
  }

  &-active {
    transform: rotate(180deg);
  }
}
</style>
