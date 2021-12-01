import { http } from '@/utils/request/index'
import { UserInfo, UserId, LoginParams, LoginResult } from './models/user'
import { Response } from '#/request'
const prefix = '/cloud/device'
enum Api {
  USER_INFO = '/xx/',
  GET_LIST = '/xxxx/',
  LOGIN = '/api/login'
}

export const getUserInfo = (params?: UserId) => {
  return http.get<Response<UserInfo[]>>({
    url: Api.USER_INFO,
    params
  })
}

export const loginApi = (params: LoginParams) => {
  return http.post<Response<LoginResult>>({
    url: Api.LOGIN,
    params
  })
}
