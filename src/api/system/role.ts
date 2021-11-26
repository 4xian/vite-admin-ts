import { http } from '@/utils/request/index'
import { Response } from '#/request'
import { SystemType } from '#/system'
const prefix = ''
enum Api {
  GET_ROLE_LIST = '/api/getRoleList'
}

// 获取角色列表
export const getRoleList = (params?: SystemType.GetParamsType) => {
  return http.get<Response<SystemType.RoleList[]>>({
    url: Api.GET_ROLE_LIST,
    params
  })
}
