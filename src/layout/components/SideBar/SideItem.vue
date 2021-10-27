<template v-if="item.meta && !item.hide">
  <div class="side-item">
    <el-sub-menu
      v-if="handlePermission(item.auth) && item.children && item.children.length"
      :index="item.path"
      popper-class="custom-popper-class"
    >
      <template #title>
        <i :class="item.meta.icon" />
        <span :style="iconStyle(item.meta.icon)">{{ item.meta.title }}</span>
      </template>

      <template v-for="child in item.children" :key="child.path">
        <SideItem
          v-if="handlePermission(child.auth) && child.children && child.children.length"
          :item="child"
          :index="child.path"
        />
        <template v-else>
          <el-menu-item v-if="handlePermission(child.auth)" :index="child.path">
            <i :class="child.meta.icon" />
            <template #title>
              <span :style="iconStyle(child.meta.icon)">{{ child.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-sub-menu>
    <template v-else>
      <el-menu-item v-if="handlePermission(item.auth)" :index="item.path">
        <i :class="item.meta.icon" />
        <template #title>
          <span :style="iconStyle(item.meta.icon)">{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, onBeforeMount } from 'vue'
import { handlePermission } from '@/utils/auth'
const props = defineProps({
  item: {
    required: true,
    type: Object
  }
})
const iconStyle = (icon: string) => {
  if (!icon) {
    return {
      marginLeft: '29px'
    }
  }
  return {}
}
// onBeforeMount(() => {
//   console.log(props.item);
// }),
toRefs(props)
</script>
