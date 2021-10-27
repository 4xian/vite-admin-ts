import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './menu'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute
})

export default router
