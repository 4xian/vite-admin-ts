<template>
  <div v-if="tabStatus" class="flex justify-space-between min-tabmenu align-center">
    <div :class="['horizontal-scrollbar']">
      <router-link
        v-for="v in list"
        :key="v.path"
        class="tabmenu-item"
        :class="{ 'tabmenu-active': route.path === v.path }"
        :to="{ path: v.path, query: v.query, fullPath: v.fullPath }"
      >
        {{ v.title }}
        <CloseOutlined
          v-show="route.path === v.path && route.path !== '/home'"
          class="icon-close"
          @click.prevent="closeTab(1, v)"
        />
      </router-link>
    </div>
    <div class="tabmenu-right">
      <a-dropdown :overlay-style="{ zIndex: 10001 }">
        <DownOutlined />
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <ReloadOutlined />
              <span @click="refresh()">刷新页面</span>
            </a-menu-item>
            <a-menu-item>
              <DeleteRowOutlined />
              <span @click="closeTab(1, route)">关闭当前页</span>
            </a-menu-item>
            <a-menu-item>
              <EllipsisOutlined />
              <span @click="closeTab(2)">关闭其他页</span>
            </a-menu-item>
            <a-menu-item>
              <CloseOutlined />
              <span @click="closeTab(0)">关闭所有</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutSetting } from '@/store/modules/layout/index'
import { TabMenuType } from '#/layout'
import { CloseOutlined, DownOutlined, ReloadOutlined, DeleteRowOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
const layoutStore = useLayoutSetting()
const route = useRoute()
const router = useRouter()
const list = computed((): Partial<TabMenuType>[] => layoutStore.getTabsMenuList)
const tabStatus = computed(() => {
  return layoutStore.getTabStatus
})
const refreshFunc: Function = inject('refresh') || Function
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

// 刷新路由
const refresh = () => {
  message.info('正在刷新...', 1)
  refreshFunc()
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
  padding: 6px 15px 6px 12px;
  overflow: hidden;
  font-size: $subFontSize;
  white-space: nowrap;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

  .horizontal-scrollbar {
    margin-right: 10px;
    overflow-x: auto;
    @include scrollbar;
  }

  .tabmenu-item {
    display: inline-block;
    height: 26px;
    padding: 0 10px 0 12px;
    margin: 0 4px;
    line-height: 22px;
    color: #495060;
    cursor: pointer;
    border: 1px solid #e6e6e6;

    &:hover {
      color: #fff;
      background-color: $min-theme;
    }

    .icon-close {
      font-size: 10px;

      &:hover {
        color: red;
      }
    }
  }

  .tabmenu-active {
    position: relative;
    padding: 0 10px 0 16px;
    color: #fff;
    background-color: $min-theme;

    &::before {
      position: absolute;
      top: 50%;
      left: 5px;
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
