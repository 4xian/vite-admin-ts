import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'
import { superAuth, adminAuth, userAuth } from '@/utils/auth'
import { SystemType } from '#/system'
import { Response } from '#/request'
Random.extend({
  permission: () => {
    return Random.pick(['管理员', '普通用户', '超级管理员'])
  }
})

/* 角色权限接口 */
// 角色权限
const list: SystemType.RoleList[] = [
  Mock.mock({
    roleId: Random.integer(100, 10000),
    roleName: '超级管理员',
    createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
    updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
    permission: superAuth
  }),
  Mock.mock({
    roleId: Random.integer(100, 10000),
    roleName: '管理员',
    createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
    updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
    permission: adminAuth
  }),
  Mock.mock({
    roleId: Random.integer(100, 10000),
    roleName: '普通用户',
    createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
    updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
    permission: userAuth
  })
]

// mock接口
export const rolesList: MockMethod[] = [
  {
    url: '/api/getRoleList',
    method: 'get',
    statusCode: 200,
    response: ({ query }: any): Response<SystemType.RoleList[]> => {
      return {
        code: 1,
        message: '获取成功',
        data: query.roleName
          ? list.filter((v) => {
            return v.roleName.includes(query.roleName)
          })
          : list
      }
    }
  }
]

/* 用户管理接口 */
const users = (): SystemType.UserList[] => {
  const arr = []
  for (let idx = 0; idx < 12; idx++) {
    arr.push(
      Mock.mock({
        userId: Random.integer(100, 10000),
        userName: Random.cname(),
        roleName: '@permission',
        createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
        updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
        password: Random.integer(1000, 100000)
      })
    )
  }
  return arr
}

// mock接口
export const userList: MockMethod[] = [
  {
    url: '/api/getUserList',
    method: 'get',
    statusCode: 200,
    response: ({ query }: any): Response<SystemType.UserList[]> => {
      return {
        code: 1,
        message: '获取成功',
        data: query.roleName
          ? users().filter((v) => {
            return v.roleName.includes(query.roleName)
          })
          : users()
      }
    }
  }
]
