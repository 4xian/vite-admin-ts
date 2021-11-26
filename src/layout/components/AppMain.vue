<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <keep-alive v-if="cache">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutSetting } from '@/store/modules/layout'
const layoutStore = useLayoutSetting()
const cache = computed(() => layoutStore.pageCache)
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  padding: 40px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
}
</style>
