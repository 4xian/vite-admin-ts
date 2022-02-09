import type { App } from 'vue'
import { createPinia } from 'pinia'
// 数据持久化
import piniaPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPersist)
export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
