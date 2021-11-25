import Layout from '@/layout/index.vue'

export const nestedRouter = {
  path: '/menu',
  name: 'Menu',
  //   redirect: '/menu1',
  component: Layout,
  meta: {
    title: '菜单',
    icon: 'menu'
  },
  auth: '菜单',
  nested: true,
  children: [
    {
      path: '/menu1',
      name: 'Menu1',
      component: () => import('@/views/menu/index.vue'),
      meta: {
        title: '子菜单',
        icon: 'menu'
      },
      auth: '子菜单'
    },
    {
      path: '/menu1-1',
      name: 'Menu11',
      redirect: '/menu1-1-1',
      meta: {
        title: '子菜单1-1',
        icon: 'menu'
      },
      auth: '子菜单11',
      component: () => import('@/views/menu/menu1.vue'),
      nested: true,
      children: [
        {
          path: '/menu1-1-1',
          name: 'Menu1-1-1',
          component: () => import('@/views/menu/menu1.vue'),
          meta: {
            title: '子菜单1-1-1',
            icon: 'menu'
          },
          auth: '子菜单111'
        },
        {
          path: '/menu1-1-2',
          name: 'Menu1-1-2',
          component: () => import('@/views/menu/menu1.vue'),
          meta: {
            title: '子菜单1-1-2',
            icon: 'menu'
          },
          auth: '子菜单111'
        }
      ]
    }
  ]
}
