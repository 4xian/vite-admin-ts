import { Nullable } from 'element-plus/lib/utils/types'
import { defineStore } from 'pinia'
import { getCookie, setCookie, removeCookie } from '@/utils/cookies'
import { loginApi } from '@/api/user'
import { store } from '@/store/index'
enum RoleItem {
  SUPER = 'super',
  TEST = 'test'
}

interface UserInfo {
  id?: string | number
  username?: string
  avatar?: string
  roles?: string[]
}

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roles: RoleItem[]
}

export const useUserStore = defineStore({
  id: 'user-info',
  state: (): UserState => ({
    userInfo: null,
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
    setUserInfo(v: Nullable<UserInfo>) {
      this.userInfo = v
      setCookie('userInfo', v as string)
    },

    resetState() {
      //   this.userInfo = null
      //   this.token = undefined
      //   this.roles = []
      removeCookie('token')
      removeCookie('userInfo')
    },

    // 异步
    async login(_params: { userName: string; password: string }): Promise<UserInfo> {
      try {
        // const userData = await loginApi(params)
        // const { token } = userData
        this.setToken('1')
        this.setUserInfo({ username: 'ceshi' })
        const info = this.getUserInfo || {}
        return info
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
