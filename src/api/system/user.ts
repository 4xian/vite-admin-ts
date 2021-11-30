import { http } from '@/utils/request/index'
import { Response } from '#/request'
import { SystemType } from '#/system'
const prefix = ''
enum Api {
  GET_USER_LIST = '/api/getUserList'
}

// 获取用户列表
export const getUserList = (params?: SystemType.UserParamsType) => {
  return http.get<Response<SystemType.UserList[]>>({
    url: Api.GET_USER_LIST,
    params
  })
}
