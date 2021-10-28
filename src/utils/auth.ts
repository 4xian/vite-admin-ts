/* 菜单/路由权限 */

// import { getCookie } from './cookies'
export const handlePermission = (v: string) => {
  //   const auth = getCookie("auth");
  const auth = [
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
    '无缝滚动'
  ]
  return auth.some((t) => t === v)
  //   return true;
}
