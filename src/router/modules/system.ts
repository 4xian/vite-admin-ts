import Layout from '@/layout/index.vue'
// import Layout from '@/layout/components/AppMain.vue'

export const systemRouter = {
  path: '/system',
  name: 'System',
  component: Layout,
  meta: {
    title: '系统管理',
    icon: 'el-icon-setting'
  },
  auth: '系统管理',
  nested: true,
  //   redirect: '/system/role',
  children: [
    {
      path: '/system/role',
      name: 'SystemRole',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理'
        //   icon: "el-icon-key",
      },
      auth: '角色管理'
    },
    {
      path: '/system/user',
      name: 'SystemUser',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理'
        //   icon: "el-icon-user",
      },
      auth: '用户管理'
    }
  ]
}
