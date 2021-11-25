import Layout from '@/layout/index.vue'

export const homeRouter = {
  path: '/',
  name: 'Home',
  component: Layout,
  redirect: '/home',
  auth: '首页',
  meta: {
    title: '首页',
    icon: 'home'
  },
  nested: false,
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Index.vue')
    }
  ]
}
