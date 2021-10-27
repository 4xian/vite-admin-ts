<template>
  <div v-if="tabStatus" class="flex justify-space-between min-tabmenu align-center">
    <el-scrollbar :vertical="false">
      <router-link
        v-for="v in list"
        :key="v.path"
        class="tabmenu-item"
        :class="{ 'tabmenu-active': route.path === v.path }"
        :to="{ path: v.path, query: v.query, fullPath: v.fullPath }"
      >
        {{ v.title }}
        <i
          v-show="route.path === v.path && route.path !== '/home'"
          class="el-icon-close"
          @click.prevent="closeTab(1, v)"
        ></i>
      </router-link>
    </el-scrollbar>
    <div class="tabmenu-right">
      <el-dropdown>
        <i class="el-icon-arrow-down"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeTab(1, route)">关闭当前页</el-dropdown-item>
            <el-dropdown-item @click="closeTab(2)">关闭其他页</el-dropdown-item>
            <el-dropdown-item @click="closeTab(0)">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutSetting } from '@/store/modules/layout/index'
import { TabMenuType } from '#/layout'
const layoutStore = useLayoutSetting()
const route = useRoute()
const router = useRouter()
const list = computed((): Partial<TabMenuType>[] => layoutStore.getTabsMenuList)

const tabStatus = computed(() => {
  return layoutStore.getTabStatus
})

const currentRoute = () => {
  const current: Partial<TabMenuType> = {
    path: route.path,
    title: route.meta.title,
    query: route.query,
    fullPath: route.fullPath
  }
  const flag = list.value.some((v) => v.path === current.path)
  if (!flag && current.path !== '/home' && current.path !== '/login') {
    layoutStore.setTabsMenuList([...list.value, current])
  }
}

/* 关闭tabs */
const closeTab = (type: number, v?: Partial<TabMenuType>) => {
  if (type === 0) {
    //   关闭所有
    list.value.splice(1)
    router.push('/')
  } else if (type === 1) {
    //   关闭当前页
    const idx = list.value.findIndex((t) => t.path === v?.path)
    if (list.value.length !== 1) {
      if (idx >= 1 && idx < list.value.length - 1) {
        router.push(list.value[idx + 1].path || '/')
      } else {
        // 其他
        router.push(list.value[idx - 1].path || '/')
      }
      list.value.splice(idx, 1)
    }
  } else {
    //   关闭其他页
    if (route.path !== '/home') {
      layoutStore.setTabsMenuList([
        {
          path: '/home',
          title: '首页',
          fullPath: '/home',
          query: {}
        },
        {
          path: route.path,
          title: route.meta.title,
          query: route.query,
          fullPath: route.fullPath
        }
      ])
    } else {
      layoutStore.setTabsMenuList([
        {
          path: route.path,
          title: route.meta.title,
          query: route.query,
          fullPath: route.fullPath
        }
      ])
    }
  }
}

watch(
  route,
  () => {
    currentRoute()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.min-tabmenu {
  padding: 4px 8px;
  overflow: hidden;
  font-size: $subFontSize;
  white-space: nowrap;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

  .tabmenu-item {
    display: inline-block;
    height: 26px;
    padding: 0 10px 0 12px;
    margin: 0 4px;
    line-height: 26px;
    color: #495060;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;

    i {
      padding: 2px;

      &:hover {
        color: red;
      }
    }
  }

  .tabmenu-active {
    position: relative;
    padding: 0 10px 0 14px;
    color: #fff;
    background-color: $min-theme;

    &::before {
      position: absolute;
      top: 50%;
      left: 6px;
      display: inline-block;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border-radius: 50%;
      content: '';
      transform: translateY(-50%);
    }
  }

  .tabmenu-right {
    i {
      cursor: pointer;
    }
  }
}
</style>
