/* 菜单/路由权限 */

import { getCookie } from './cookies'
import { SystemType } from '#/system'
export const handlePermission = (v: string): boolean => {
  const auth = getCookie('userInfo').permission
  /* const btn = ['按钮权限']
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
  ] */
  return auth?.some((t: string) => t === v)
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
        children: [
          {
            title: '角色增加',
            key: 10100,
            children: []
          },
          {
            title: '角色详情',
            key: 10101,
            children: []
          },
          {
            title: '角色编辑',
            key: 10102,
            children: []
          },
          {
            title: '角色删除',
            key: 10103,
            children: []
          }
        ]
      },
      {
        title: '用户管理',
        key: 1011,
        children: [
          {
            title: '用户管理',
            key: 1011,
            children: [
              {
                title: '用户增加',
                key: 10110,
                children: []
              },
              {
                title: '用户详情',
                key: 10111,
                children: []
              },
              {
                title: '用户编辑',
                key: 10112,
                children: []
              },
              {
                title: '用户删除',
                key: 10113,
                children: []
              }
            ]
          }
        ]
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
        key: 1042,
        children: [
          {
            title: '子菜单1-1-1',
            key: 10421,
            children: []
          }
        ]
      }
    ]
  }
]

// 超级管理员权限
export const superAuth = [
  102,
  1020,
  1021,
  1022,
  1023,
  1024,
  103,
  1041,
  1042,
  10421,
  100,
  101,
  1010,
  1011,
  10100,
  10101,
  10102,
  10103,
  10110,
  10111,
  10112,
  10113
]
// 管理员权限
export const adminAuth = [102, 1020, 1021, 1022, 1023, 1024, 101, 1010, 1011, 100]
// 普通用户权限
export const userAuth = [102, 1020, 1021, 1022, 1023, 1024, 100]

export const handleNotice = (v: string): number | null => {
  const obj = noticeList.find((t: any) => t.name === v)
  return obj ? obj.total : null
}
