import Layout from '@/layout/index.vue'
// import Layout from '@/layout/components/AppMain.vue'

export const aboutRouter = {
  path: '/about',
  name: 'About',
  component: Layout,
  meta: {
    title: '关于',
    icon: 'about'
  },
  auth: '关于',
  nested: false,
  children: [
    {
      path: '/about',
      component: () => import('@/views/About.vue')
    }
  ]
}
