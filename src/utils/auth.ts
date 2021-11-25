/* 菜单/路由权限 */

// import { getCookie } from './cookies'

export const handlePermission = (v: string) => {
  //   const auth = getCookie("auth");
  const btn = ['按钮权限']
  const menu = [
    '首页',
    '关于',
    '系统管理',
    '用户管理',
    '角色管理',
    '菜单',
    '子菜单',
    '子菜单11',
    '子菜单111',
    '组件',
    '无缝滚动',
    '富文本',
    '图片裁剪',
    '数字滚动',
    '图片上传'
  ]
  const auth = [...btn, ...menu]
  return auth.some((t) => t === v)
  //   return true;
}

/* 侧边栏通知个数 */
const noticeList = [
  {
    name: '首页',
    total: 10
  },
  {
    name: '组件',
    total: 9
  },
  {
    name: '数字滚动',
    total: 99
  }
]

export const handleNotice = (v: string): number | null => {
  const obj = noticeList.find((t: any) => t.name === v)
  return obj ? obj.total : null
}
