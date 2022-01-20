<!-- 顶部面包屑 -->
<template>
  <div v-if="crumbsStatus" class="min-breadcrumb" :class="{ isMobile: isMobile }">
    <Breadcrumb separator=" > ">
      <BreadcrumbItem
        v-for="(v, idx) in routeList"
        :key="v.path"
      ><span v-if="idx === routeList.length">{{ v.meta.title }}</span>
        <router-link v-else :to="v.redirect || v.path">{{ v.meta.title }}</router-link>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'
import { useLayoutSetting } from '@/store/modules/layout'
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue'
const layoutSetting = useLayoutSetting()
const route = useRoute()
const routeList = computed((): Pick<RouteLocationMatched, 'meta' | 'path' | 'redirect'>[] =>
  route.matched.filter((v) => v.meta && v.meta.title)
)
const isMobile = computed(() => layoutSetting.getBreadStatus)
const crumbsStatus = computed(() => {
  return layoutSetting.getCrumbsStatus
})
</script>

<style lang="scss" scoped>
.min-breadcrumb {
  padding: 0 10px;

  :deep(.el-breadcrumb) {
    font-size: $customFontSize;
  }
}

.isMobile {
  display: none;
}
</style>
