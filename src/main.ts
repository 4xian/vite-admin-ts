import { createApp } from 'vue'

import 'element-plus/dist/index.css'
// global css
import './styles/index.scss'

import App from './App.vue'
import router from './router/index'

import { store } from './store/index'

import './permission'

const app = createApp(App)

app.use(router).use(store).mount('#app')

export default app
