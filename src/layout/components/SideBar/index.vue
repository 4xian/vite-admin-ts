<template>
  <div class="sidebar-wrap">
    <div class="flex sidebar-logo align-center" @click="$router.push('/')">
      <!-- <img src="@/assets/logo.png" alt="" />
      <span v-show="!isOpen">Vite-TS-admin</span> -->
    </div>
    <!-- <el-scrollbar> -->
    <!-- <el-menu
      :router="true"
      :default-active="$route.path"
      :unique-opened="onlyone"
      :collapse="isOpen"
      :show-timeout="200"
    >
      <SidebarItem v-for="v in routerList" :key="v.path" :item="v"></SidebarItem>
    </el-menu> -->
    <!-- </el-scrollbar> -->
    <a-menu
      v-model:selectedKeys="path.selectKeys"
      v-model:openKeys="path.openKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="isOpen"
      @click="clickMenu"
      @openChange="menuChange"
    >
      <SidebarItem v-for="v in routerList" :key="v.path" :item="v"></SidebarItem>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SideItem.vue'
import { constantRoute } from '@/router/modules/index'
import { useLayoutSetting } from '@/store/modules/layout/index'
import { RouterItem } from '@/router/type'
const layoutStore = useLayoutSetting()
const route = useRoute()
const router = useRouter()
const sideStatus = computed(() => layoutStore.getSideStatus)
const isOpen = computed(() => !sideStatus.value)
const onlyone = computed(() => layoutStore.getOnlyOneMenu)
const routerList = computed(() => constantRoute)

const handleRootKeys = (item: any[]): string[] => {
  const arr: string[] = []
  item.forEach((t) => {
    arr.push(t.path)
    if (t.children && t.children.length) {
      handleRootKeys(t.children)
    }
  })
  return arr
  //   return unref(routerList).map((v) => v.path)
}

const handleOpenKeys = (): string[] => {
  console.log(route)

  let obj: any
  /* unref(routerList).forEach((v: any) => {
    if (v.children && v.children.length) {
      v.children.find((t: RouterItem) => {
        if (t.path === route.path) obj = v
      })
    }
  }) */

  /* const nest = (item: any) => {
    item.forEach((v: RouterItem) => {
      if (v.children && v.children.length) {
        nest(v.children)
      } else {
        if (v.path === route.path) {
          console.log(v)

          obj = v
        }
      }
    })
  }
  nest(unref(routerList)) */
  //   arr = obj ? obj.children.map((t: RouterItem) => t.path) : []
  return route.matched.map((v) => v.path)
}
const path = reactive<{ [propName: string]: string[] }>({
  rootKeys: handleRootKeys(unref(routerList)),
  // 当前选中菜单
  selectKeys: [route.path],
  // 当前选中菜单的父级数组
  openKeys: handleOpenKeys(),
  // 临时存储subMenuClick
  tempKeys: []
})

// 点击菜单项
const clickMenu = (e: any) => {
  router.push(e.key)
  path.selectKeys = [e.key]
  const flag = unref(path.rootKeys).some((v: any) => v === e.key)
  console.log(e)
  /* if(flag){
      path.
  } */
  path.openKeys = e.keyPath
}

const menuChange = (e: any) => {
  const flag = unref(path.rootKeys).some((v: any) => v === e.slice(-1)[0])
  if (flag) {
    path.openKeys = e.slice(-1)
    path.tempKeys = e.slice(-1)
  } else {
    path.openKeys = [...path.tempKeys, ...e]
  }
}
</script>
