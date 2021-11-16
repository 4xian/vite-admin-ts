/* layout布局store */
import { defineStore } from 'pinia'
import { store } from '../../index'
// import { TabMenuType, LayoutType } from '#/store'
// import { setCookie, getCookie } from "@/utils/cookies";
import { layoutSetting } from '@/settings'

export const useLayoutStore = defineStore({
  id: 'layout-setting',
  state: (): any => ({
    showLogo: layoutSetting.showLogo, // 是否显示侧边栏logo
    showHeader: layoutSetting.showHeader, // 是否显示右侧头部
    showCrumbs: layoutSetting.showCrumbs, // 是否显示面包屑
    showTabs: layoutSetting.showTabs, // 是否显示标签
    onlyOpenOneMenu: layoutSetting.menuUniqueOpened, // 是否始终只打开一个菜单
    sideOpened: true, // 侧边栏打开状态
    hideBreadcrumb: false, // 隐藏面包屑
    isFullScreen: false, // 是否全屏true:是; false:否
    tabsMenuList: [
      {
        path: '/home',
        title: '首页',
        fullPath: '/home',
        query: {}
      }
    ], // 头部标签列表
    cacheTabs: false, // 是否缓存头部标签页列表
    isMobile: false, // 是否为手机布局
    pageCache: layoutSetting.pageCache // 页面是否缓存
  }),
  getters: {
    getSideStatus(): boolean {
      return this.sideOpened
    },
    getScreenStatus(): boolean {
      return this.isFullScreen
    },
    getTabsMenuList(): any {
      return this.tabsMenuList
    },
    getCrumbsStatus(): boolean | undefined {
      return this.showCrumbs
    },
    getCacheTabs(): boolean {
      return this.cacheTabs
    },
    getMobileStatus(): boolean {
      return this.isMobile
    },
    getBreadStatus(): boolean {
      return this.hideBreadcrumb
    },
    getTabStatus(): boolean | undefined {
      return this.showTabs
    },
    getOnlyOneMenu(): boolean {
      return this.onlyOpenOneMenu
    }
  },
  actions: {
    setLogoStatus(v: boolean) {
      this.showLogo = v
    },
    setHeaderStatus(v: boolean) {
      this.showHeader = v
    },
    setCrumbsStatus(v: boolean) {
      this.showCrumbs = v
    },
    setSideOpened(v: boolean) {
      this.sideOpened = v
    },
    setScreenStatus(v: boolean) {
      this.isFullScreen = v
    },
    setTabsMenuList(v: any) {
      this.tabsMenuList = v
    },
    setMobileStatus(v: boolean) {
      this.isMobile = v
    },
    setBreadStatus(v: boolean) {
      this.hideBreadcrumb = v
    }
  }
})

export function useLayoutSetting() {
  return useLayoutStore(store)
}
