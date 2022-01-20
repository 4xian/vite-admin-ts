import { MockMethod } from 'vite-plugin-mock'
import { superAuth, adminAuth, userAuth } from '@/utils/auth'
const userMockList: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    statusCode: 200,
    response: ({ body }: any) => {
      const { userName, password } = body
      if (password === '123456') {
        return {
          code: 1,
          message: '登录成功',
          data: {
            userName,
            permission: userName === 'super' ? superAuth : userName === 'admin' ? adminAuth : userAuth,
            token: new Date().getTime().toString(32)
          }
        }
      } else {
        return {
          code: 0,
          message: '密码错误',
          data: null
        }
      }
    }
  },
  {
    url: '/api/logout',
    method: 'get',
    response: ({ query }: any) => {
      return {
        code: 20000,
        message: 'success',
        data: query
      }
    }
  }
]

export default userMockList
