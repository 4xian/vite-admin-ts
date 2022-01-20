<template>
  <div :class="['sidebar-wrap', { 'light-theme': isLight }]">
    <!-- <div class="flex sidebar-logo align-center" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="" />
      <span v-show="!isOpen" class="sidebar-top-title">Vite-TS-admin</span>
    </div> -->
    <Menu
      v-model:selectedKeys="path.selectKeys"
      v-model:openKeys="path.openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="isOpen"
      @click="clickMenu"
      @openChange="menuChange"
    >
      <SidebarItem v-for="v in routerList" :key="v.path" :item="v"></SidebarItem>
    </Menu>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SideItem.vue'
import { constantRoute } from '@/router/modules'
import { useLayoutSetting } from '@/store/modules/layout/index'
import { Menu } from 'ant-design-vue'
const layoutStore = useLayoutSetting()
const route = useRoute()
const router = useRouter()
const sideStatus = computed(() => layoutStore.getSideStatus)
const isOpen = computed(() => !sideStatus.value)
const onlyone = computed(() => layoutStore.getOnlyOneMenu)
const routerList = computed(() => constantRoute)
const theme = computed(() => layoutStore.sideTheme)
const isLight = computed(() => unref(theme) === 'light')

const handleRootKeys = (): string[] => {
  return unref(routerList).map((v) => v.path)
}
const handleOpenKeys = (): string[] => {
  return route.matched.map((v) => v.path)
}
const path = reactive<{ [propName: string]: string[] }>({
  rootKeys: handleRootKeys(),
  // 当前选中菜单
  selectKeys: [route.path],
  // 当前选中菜单的父级数组
  openKeys: handleOpenKeys()
})

// 点击菜单项
const clickMenu = (e: any) => {
  router.push(e.key)
  if (e.key === '/home') {
    path.selectKeys = ['/']
  } else {
    path.selectKeys = [e.key]
  }
}

const menuChange = (e: any) => {
  if (unref(onlyone)) {
    if (path.rootKeys.indexOf(e.slice(-1)[0]) === -1) {
      path.openKeys = e
    } else {
      path.openKeys = e.slice(-1)
    }
  } else path.openKeys = e
}

watch(
  () => route.fullPath,
  () => {
    if (route.fullPath === '/home') {
      path.selectKeys = ['/']
    } else {
      path.selectKeys = [route.fullPath]
    }
  },
  { immediate: true }
)
</script>
