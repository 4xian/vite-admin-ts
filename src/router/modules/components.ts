// import Layout from '@/layout/components/AppMain.vue'
import Layout from '@/layout/index.vue'
import { RouterItem } from '../type'
import type { RouteRecordRaw } from 'vue-router'

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
  redirect: '/components/gapless-scroll',
  children: [
    {
      path: '/components/gapless-scroll',
      name: 'ComponentsGaplessScroll',
      component: () => import('@/views/components/gapless-scroll/index.vue'),
      meta: {
        title: '无缝滚动'
      },
      auth: '无缝滚动'
    },
    {
      path: '/components/rich-text',
      name: 'ComponentsRichText',
      component: () => import('@/views/components/richText/index.vue'),
      meta: {
        title: '富文本'
      },
      auth: '富文本'
    },
    {
      path: '/components/crop-img',
      name: 'ComponentsCropImg',
      component: () => import('@/views/components/cropImg/index.vue'),
      meta: {
        title: '图片裁剪'
      },
      auth: '图片裁剪'
    },
    {
      path: '/components/count-scroll',
      name: 'ComponentsCountScroll',
      component: () => import('@/views/components/count-scroll/index.vue'),
      meta: {
        title: '数字滚动'
      },
      auth: '数字滚动'
    },
    {
      path: '/components/upload',
      name: 'ComponentsUpload',
      component: () => import('@/views/components/upload/index.vue'),
      meta: {
        title: '图片上传'
      },
      auth: '图片上传'
    }
  ]
}
