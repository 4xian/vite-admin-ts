import { systemRouter } from './system'
import { aboutRouter } from './common'
import { nestedRouter } from './nested'
import { componentRouter } from './components'
import { homeRouter } from './home'

// 静态路由
export const constantRoute = [homeRouter, systemRouter, componentRouter, aboutRouter, nestedRouter]
