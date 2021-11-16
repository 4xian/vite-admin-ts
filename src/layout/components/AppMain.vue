<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in">
        <template v-if="cache">
          <keep-alive>
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </template>
        <template v-else>
          <component :is="Component" :key="route.fullPath" />
        </template>
      </transition>
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
  flex: 1;
  padding: 40px;
}
</style>
