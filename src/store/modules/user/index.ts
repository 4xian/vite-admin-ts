import { defineStore } from 'pinia'
import { getCookie, setCookie, removeCookie } from '@/utils/cookies'
import { loginApi } from '@/api/user'
import { store } from '@/store/index'
import { Response } from '#/request'
import { UserInfo, LoginResult } from '@/api/models/user'
import { flatArray } from '@/utils/util'
import { menuTreeList } from '@/utils/auth'
interface UserState {
  userInfo: Partial<UserInfo>
  token?: string
}

export const useUserStore = defineStore({
  id: 'user-info',
  state: (): UserState => ({
    userInfo: {},
    token: undefined
  }),

  getters: {
    getUserInfo(): any {
      return getCookie('userInfo', true)
    },
    getToken(): string {
      return getCookie('token', true) || ''
    }
  },

  actions: {
    setToken(t: string) {
      this.token = t || ''
      setCookie('token', t, true)
    },
    setUserInfo(v: Partial<UserInfo>) {
      this.userInfo = v
      setCookie('userInfo', v as string, true)
    },

    resetState() {
      removeCookie('token')
      removeCookie('userInfo')
    },

    // 异步
    async login(params: { userName: string; password: string }): Promise<Response<LoginResult>> {
      try {
        const userData = await loginApi(params)
        const { data } = userData
        if (data) {
          this.setToken(data.token)
          const tempAuth: string[] = []
          data.permission?.forEach((v) => {
            flatArray(menuTreeList)?.forEach((t) => {
              if (v === t.key) {
                tempAuth.push(t.title)
              }
            })
          })
          this.setUserInfo({ userName: data.userName, permission: tempAuth })
        }
        return userData
      } catch (err) {
        return Promise.reject(err)
      }
    },

    async logout() {
      this.resetState()
    }
  }
})

export function userUserStoreSetup() {
  return useUserStore(store)
}

const test = {
  userName: 'super',
  permission: [
    '首页',
    '关于',
    '系统管理',
    '用户管理',
    '角色管理',
    '菜单',
    '子菜单',
    '子菜单11',
    '子菜单111',
    '组件',
    '无缝滚动',
    '富文本',
    '图片裁剪',
    '数字滚动',
    '图片上传',
    '按钮权限',
    '角色新增',
    '角色编辑',
    '角色详情',
    '角色删除',
    '用户新增',
    '用户编辑',
    '用户详情',
    '用户删除'
  ]
}
