import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css'
// import 'element-plus/dist/index.css'
// global css
import './styles/index.scss'
import App from './App.vue'
import router from './router/index'
import { store } from './store/index'
import './permission'
// svg register
import 'virtual:svg-icons-register'
import autoRegisterComponents from '@/components/index'

const app = createApp(App)
// Automatically register global components
autoRegisterComponents(app)
app.use(router).use(store).mount('#app')

export default app
