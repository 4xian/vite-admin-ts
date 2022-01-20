import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
import indexModule from '@/mocks/index'

export function setupMockConfig() {
  createProdMockServer([...indexModule])
}
