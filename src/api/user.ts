import { http } from '@/utils/request/index'
import { UserInfo, UserId, LoginParams, LoginResult } from './models/user'
const prefix = '/cloud/device'
enum Api {
  USER_INFO = '/xx/',
  GET_LIST = '/xxxx/',
  LOGIN = '/xxx/'
}

export const getUserInfo = (params?: UserId) => {
  return http.get<UserInfo[]>({
    url: Api.USER_INFO,
    params
  })
}

export const loginApi = (params: LoginParams) => {
  return http.post<LoginResult>({
    url: Api.LOGIN,
    params
  })
}

export function getSpinScreen(params: any) {
  return http.get(
    {
      url: `/screen/rotateScreen`,
      params
    },
    {
      prefix
    }
  )
}

export function getWarningDetail(params: any) {
  return http.get(
    {
      url: `/screen/alarmDetail`,
      params
    },
    { prefix }
  )
}
