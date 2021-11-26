import { defineStore } from 'pinia'
import { getCookie, setCookie, removeCookie } from '@/utils/cookies'
import { loginApi } from '@/api/user'
import { store } from '@/store/index'
import { Response } from '#/request'
import { UserInfo, LoginResult } from '@/api/models/user'
enum RoleItem {
  SUPER = 'super',
  TEST = 'test'
}

/* interface UserInfo {
  id?: string | number
  userName?: string
  avatar?: string
  roles?: string[]
} */

interface UserState {
  userInfo: Partial<UserInfo>
  token?: string
  roles: RoleItem[]
}

export const useUserStore = defineStore({
  id: 'user-info',
  state: (): UserState => ({
    userInfo: {},
    token: undefined,
    roles: []
  }),

  getters: {
    getUserInfo(): any {
      return this.userInfo || getCookie('userInfo')
    },
    getToken(): string {
      return this.token || getCookie('token') || ''
    }
  },

  actions: {
    setToken(t: string) {
      this.token = t || ''
      setCookie('token', t)
    },
    setUserInfo(v: Partial<UserInfo>) {
      this.userInfo = v
      setCookie('userInfo', v as string)
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
          this.setUserInfo({ userName: data.userName })
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
