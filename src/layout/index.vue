<template>
  <div class="app-wrap flex" :class="customClass">
    <Sidebar />
    <div class="app-contain">
      <Navbar />
      <TabsMenu />
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutSetting } from '@/store/modules/layout'
import Sidebar from '@/layout/components/SideBar/index.vue'
import Navbar from '@/layout/components/NavBar/index.vue'
import TabsMenu from '@/layout/components/TabsMenu/index.vue'
import AppMain from '@/layout/components/AppMain.vue'
const layoutStore = useLayoutSetting()
const status = computed(() => layoutStore.getSideStatus)
const isMobile = computed(() => layoutStore.getMobileStatus)
const customClass = computed(() => {
  return {
    hideMenu: !status.value,
    mobile: isMobile.value
  }
})
</script>
<style lang="scss" scoped>
.app-wrap {
  width: 100%;
  height: 100%;

  .app-contain {
    display: flex;
    overflow: hidden;
    flex: 1;
    flex-direction: column;
  }
}
</style>
