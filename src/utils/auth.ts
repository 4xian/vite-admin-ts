/* 菜单/路由权限 */

// import { getCookie } from './cookies'
export const handlePermission = (v: string) => {
  //   const auth = getCookie("auth");
  const auth = ['首页', '关于', '系统管理', '用户管理', '角色管理']
  return auth.some((t) => t === v)
  //   return true;
}
