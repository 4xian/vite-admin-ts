import { LocationQuery, RouteLocationNormalizedLoaded } from 'vue-router'

interface LayoutType {
  showLogo: boolean | undefined
  showHeader: boolean | undefined
  showCrumbs: boolean | undefined
  showTabs: boolean | undefined
  sideOpened: boolean
  isFullScreen: boolean
  tabsMenuList: Partial<TabMenuType>[]
  cacheTabs: boolean
  isMobile: boolean
  hideBreadcrumb: boolean
  menuUniqueOpened?: boolean
}

interface TabMenuType extends RouteLocationNormalizedLoaded {
  title: string | unknown
  query: LocationQuery
  fullPath: string
}

enum screenSize {
  XS = 480,
  SM = 576,
  MD = 768,
  LG = 992,
  XL = 1200,
  XXL = 1600
}

export { TabMenuType, screenSize, LayoutType }
