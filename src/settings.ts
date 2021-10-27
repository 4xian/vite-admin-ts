import { reactive } from 'vue'
import { LayoutType } from '#/layout'

export const SysTitle = 'Vite-TS-Admin后台管理系统' // 登录页面标题

export const copyright = '版权所有@Jian' // 登录页面底部信息

// 布局设置
export const layoutSetting = reactive<Partial<LayoutType>>({
  showLogo: true, // 是否显示左侧logo
  showTabs: true, // 是否显示顶部标签
  showHeader: true,
  showCrumbs: true, // 是否显示面包屑
  menuUniqueOpened: true // 侧边栏是否只打开一个菜单
})

export const pageTitle = ' - Vite-TS-Admin'
