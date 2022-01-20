<template v-if="!item.hide">
  <div class="side-item">
    <!-- 带副菜单 -->
    <template v-if="handleNestMenu(item)">
      <SubMenu :key="item.path" popup-class-name="custom-popper-class">
        <template #icon>
          <MySvg v-if="item.meta.icon" :name="item.meta.icon" />
        </template>
        <template #title>
          <span>{{ item.meta.title }}</span>
          <span v-if="handleNotice(item.meta.title)" class="side-menu-notice">{{ handleNotice(item.meta.title) }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <SideItem :item="child" :index="child.path" />
        </template>
      </SubMenu>
    </template>
    <!-- 单个菜单 -->
    <template v-else>
      <MenuItem v-if="handlePermission(item.auth)" :key="item.path">
        <template #icon><MySvg v-if="item.meta.icon" :name="item.meta.icon" /> </template>
        <span>{{ item.meta.title }}</span>
        <span v-if="handleNotice(item.meta.title)" class="side-menu-notice">{{ handleNotice(item.meta.title) }}</span>
      </MenuItem>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { handlePermission, handleNotice } from '@/utils/auth'
import MySvg from '@/components/SvgIcon/index.vue'
import { SubMenu, MenuItem } from 'ant-design-vue'
const props = defineProps({
  item: {
    required: true,
    type: Object
  }
})
const handleNestMenu = (v: any) => {
  if (v.nested) {
    return handlePermission(v.auth)
  }
  return false
}
</script>
