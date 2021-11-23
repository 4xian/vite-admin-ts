<template v-if="!item.hide">
  <div class="side-item">
    <!-- 多个子菜单 -->
    <template v-if="handleNestMenu(item)">
      <!-- <el-sub-menu :index="item.path" popper-class="custom-popper-class">
        <template #title>
          <i v-show="item.meta.icon" :class="item.meta.icon" />
          <span :style="iconStyle(item?.meta.icon)">{{ item.meta.title }}</span>
          <span v-if="handleNotice(item.meta.title)" class="side-menu-notice">{{ handleNotice(item.meta.title) }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <SideItem :item="child" :index="child.path" />
        </template>
      </el-sub-menu> -->

      <a-sub-menu :key="item.path" popup-class-name="custom-popper-class">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>
          <span>{{ item.meta.title }}</span>
          <span v-if="handleNotice(item.meta.title)" class="side-menu-notice">{{ handleNotice(item.meta.title) }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <SideItem :item="child" :index="child.path" />
        </template>
      </a-sub-menu>
    </template>

    <!-- 单个主菜单 -->
    <!-- <template v-else>
      <el-menu-item v-if="handlePermission(item.auth)" :index="item.path">
        <i v-show="item.meta.icon" :class="item.meta.icon" />
        <template #title>
          <span :style="iconStyle(item?.meta.icon)">{{ item.meta.title }}</span>
          <span v-if="handleNotice(item.meta.title)" class="side-menu-notice">{{ handleNotice(item.meta.title) }}</span>
        </template>
      </el-menu-item>
    </template> -->
    <template v-else>
      <a-menu-item v-if="handlePermission(item.auth)" :key="item.path">
        <template #icon><AppstoreOutlined /> </template>
        <span>{{ item.meta.title }}</span>
        <span v-if="handleNotice(item.meta.title)" class="side-menu-notice">{{ handleNotice(item.meta.title) }}</span>
      </a-menu-item>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, onBeforeMount } from 'vue'
import { handlePermission, handleNotice } from '@/utils/auth'
import { AppstoreOutlined } from '@ant-design/icons-vue'
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

const handleNestMenu = (v: any) => {
  if (v.nested) {
    return handlePermission(v.auth)
  }
  return false
}
toRefs(props)
</script>
