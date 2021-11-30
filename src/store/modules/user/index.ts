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
          console.log(data)

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
