<!-- 头部 -->
<template>
  <div class="flex navbar align-center">
    <TriggleIcon :active="sideOpened" @triggleIcon="handleTriggleIcon" />
    <Breadcrumb />
    <div class="flex justify-end head-right align-center">
      <FullScreen />
      <Profile />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TriggleIcon from '@/components/layout/TriggerIcon.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import FullScreen from '@/components/layout/FullScreen.vue'
import Profile from '@/components/layout/Profile.vue'
import { useLayoutSetting } from '@/store/modules/layout/index'
const layoutSetting = useLayoutSetting()

const sideOpened = computed(() => layoutSetting.sideOpened)

const handleTriggleIcon = () => {
  layoutSetting.setSideOpened(!sideOpened.value)
}
</script>
<style lang="scss" scoped>
.navbar {
  height: $navbarHeight;
  line-height: $navbarHeight;
  border: 1px solid #e5e7eb;

  .head-right {
    flex: 1;
    justify-content: end;
    height: 100%;
  }
}
</style>
