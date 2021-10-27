import { configure, start, done } from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import { whiteRoute, constantRoute } from '@/router/menu'
import { getCookie } from '@/utils/cookies'
import type { RouteLocationNormalized } from 'vue-router'
import { flatTree } from '@/utils/util'
import { handlePermission } from '@/utils/auth'
import { pageTitle } from '@/settings'
configure({
  showSpinner: false
})

router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next) => {
  start()
  const token = getCookie('token')
  document.title = (to.meta.title as string) + pageTitle // 页面标题
  if (token) {
    if (to.path === '/login') {
      next('/')
      done()
    } else {
      let temp: any = []
      constantRoute.forEach((v) => {
        if (v.children && v.children.length) {
          temp = [...temp, ...flatTree(v)]
        } else {
          temp = [...temp, v]
        }
      })
      const obj = temp.find((v: { path: string }) => to.path === v.path)
      if (obj && (!obj.auth || handlePermission(obj.auth))) {
        next()
      } else {
        next('/404')
      }
    }
  } else {
    if (whiteRoute.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      done()
    }
  }
})

router.afterEach(() => {
  done()
})
