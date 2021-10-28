// import Layout from '@/layout/components/AppMain.vue'
import Layout from '@/layout/index.vue'

export const componentRouter = {
  path: '/components',
  name: 'Components',
  component: Layout,
  meta: {
    title: '组件',
    icon: 'el-icon-setting'
  },
  auth: '组件',
  nested: true,
  children: [
    {
      path: '/components/gapless-scroll',
      name: 'ComponentsGaplessScroll',
      component: () => import('@/views/components/gapless-scroll/index.vue'),
      meta: {
        title: '无缝滚动'
      },
      auth: '无缝滚动'
    }
  ]
}
