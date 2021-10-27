<template>
  <div class="sidebar-wrap">
    <div class="flex sidebar-logo align-center" @click="$router.push('/')">
      <!-- <div> -->
      <img src="@/assets/logo.png" alt="" />
      <span v-show="!isOpen">Vite-TS-admin</span>
      <!-- </div> -->
    </div>
    <!-- <el-scrollbar> -->
    <el-menu :router="true" :default-active="$route.path" :collapse="isOpen" :show-timeout="200">
      <SidebarItem v-for="v in routerList" :key="v.path" :item="v"></SidebarItem>
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SidebarItem from './SideItem.vue'
import { constantRoute } from '@/router/menu'
import { useLayoutSetting } from '@/store/modules/layout/index'
const layoutStore = useLayoutSetting()

const sideStatus = computed(() => layoutStore.getSideStatus)
const isOpen = computed(() => !sideStatus.value)
const routerList = constantRoute.find((v) => v.path === '/')?.children || []
</script>
