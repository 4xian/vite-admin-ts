import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './modules/index'
import { whiteRouter } from './modules/white'
const allConstantRoute = [...whiteRouter, ...constantRoute]

// 动态路由
const asyncRouter = []

const router = createRouter({
  history: createWebHistory(),
  routes: allConstantRoute
})

export default router
