import Layout from '@/layout/components/AppMain.vue'
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-help'
        },
        auth: '首页'
      },
      {
        path: '/system',
        name: 'System',
        component: Layout,
        meta: {
          title: '系统管理',
          icon: 'el-icon-setting'
        },
        auth: '系统管理',
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
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: {
          title: '关于',
          icon: 'el-icon-phone-outline'
        },
        auth: '关于'
      },
      {
        path: '/menu',
        name: 'Menu',
        // redirect: "/menu1",
        component: Layout,
        meta: {
          title: '菜单',
          icon: 'el-icon-menu'
        },
        auth: '菜单',
        children: [
          {
            path: '/menu1',
            name: 'Menu1',
            component: () => import('@/views/menu/index.vue'),
            meta: {
              title: '子菜单',
              icon: ''
            },
            auth: '子菜单'
          },
          {
            path: '/menu1-1',
            name: 'Menu11',
            // redirect: "/menu1-1-1",
            component: Layout,
            meta: {
              title: '子菜单1-1'
            },
            auth: '子菜单11',
            children: [
              {
                path: '/menu1-1-1',
                name: 'Menu1-1-1',
                component: () => import('@/views/menu/menu1.vue'),
                meta: {
                  title: '子菜单1-1-1'
                },
                auth: '子菜单111'
              }
            ]
          }
        ]
      }
    ]
  }
]

export const whiteRoute = ['/login']
