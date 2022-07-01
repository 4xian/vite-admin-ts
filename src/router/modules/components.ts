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
    icon: 'component'
  },
  auth: '组件',
  nested: true,
  redirect: '/components/gapless-scroll',
  children: [
    {
      path: '/components/rich-text',
      name: 'ComponentsRichText',
      component: () => import('@/views/components/richText/index.vue'),
      meta: {
        title: '富文本',
        icon: 'rich-text'
      },
      auth: '富文本'
    },
    {
      path: '/components/gapless-scroll',
      name: 'ComponentsGaplessScroll',
      component: () => import('@/views/components/gapless-scroll/index.vue'),
      meta: {
        title: '无缝滚动',
        icon: 'gapless-scroll'
      },
      auth: '无缝滚动'
    },
    {
      path: '/components/count-scroll',
      name: 'ComponentsCountScroll',
      component: () => import('@/views/components/count-scroll/index.vue'),
      meta: {
        title: '数字滚动',
        icon: 'count-scroll'
      },
      auth: '数字滚动'
    },

    {
      path: '/components/upload',
      name: 'ComponentsUpload',
      component: () => import('@/views/components/upload/index.vue'),
      meta: {
        title: '图片上传',
        icon: 'upload'
      },
      auth: '图片上传'
    },
    {
      path: '/components/image-preview',
      name: 'ComponentsImagePreview',
      component: () => import('@/views/components/image-preview/index.vue'),
      meta: {
        title: '图片预览',
        icon: 'image-preview'
      },
      auth: '图片预览'
    },
    {
      path: '/components/crop-img',
      name: 'ComponentsCropImg',
      component: () => import('@/views/components/cropImg/index.vue'),
      meta: {
        title: '图片裁剪',
        icon: 'crop-img'
      },
      auth: '图片裁剪'
    },
    {
      path: '/components/pdf-preview',
      name: 'PdfPreview',
      component: () => import('@/views/components/pdfPreview/index.vue'),
      meta: {
        title: 'pdf上浮图片拖拽',
        icon: 'crop-img'
      },
      auth: '图片裁剪'
    },
    {
      path: '/components/html-canvas',
      name: 'HtmlCanvas',
      component: () => import('@/views/components/html-canvas/index.vue'),
      meta: {
        title: 'HTML转canvas',
        icon: 'image-preview'
      },
      auth: '图片裁剪'
    }
  ]
}
