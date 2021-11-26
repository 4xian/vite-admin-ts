/* 菜单/路由权限 */

// import { getCookie } from './cookies'
import { SystemType } from '#/system'
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

// 侧边栏菜单树形数据
export const menuTreeList: SystemType.PermissionType[] = [
  {
    title: '首页',
    key: 100,
    children: []
  },
  {
    title: '系统管理',
    key: 101,
    children: [
      {
        title: '角色管理',
        key: 1010,
        children: []
      },
      {
        title: '用户管理',
        key: 1011,
        children: []
      }
    ]
  },
  {
    title: '组件',
    key: 102,
    children: [
      {
        title: '无缝滚动',
        key: 1020,
        children: []
      },
      {
        title: '富文本',
        key: 1021,
        children: []
      },
      {
        title: '图片裁剪',
        key: 1022,
        children: []
      },
      {
        title: '数字滚动',
        key: 1023,
        children: []
      },
      {
        title: '图片上传',
        key: 1024,
        children: []
      }
    ]
  },
  {
    title: '关于',
    key: 103,
    children: []
  },
  {
    title: '菜单',
    key: 104,
    children: [
      {
        title: '子菜单',
        key: 1041,
        children: []
      },
      {
        title: '子菜单1-1',
        key: 1041,
        children: [
          {
            title: '子菜单1-1-1',
            key: 10411,
            children: []
          }
        ]
      }
    ]
  }
]

export const handleNotice = (v: string): number | null => {
  const obj = noticeList.find((t: any) => t.name === v)
  return obj ? obj.total : null
}
