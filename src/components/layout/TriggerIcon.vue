<!-- 头部关闭/打开左侧菜单icon -->
<template>
  <div class="triggle-icon" :title="iconText" @click="triggleEmits('triggleIcon')">
    <MenuFoldOutlined v-if="active" :style="{ fontSize: '16px' }" />
    <MenuUnfoldOutlined v-else :style="{ fontSize: '16px' }" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutSetting } from '@/store/modules/layout'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
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
  cursor: pointer;
}
</style>
