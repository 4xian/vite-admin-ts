import { defineStore } from 'pinia'
import { getCookie, setCookie, removeCookie } from '@/utils/cookies'
import { loginApi } from '@/api/user'
import { store } from '@/store/index'
import { Response } from '#/request'
import { UserInfo, LoginResult } from '@/api/models/user'
import { flatArray } from '@/utils/util'
import { menuTreeList } from '@/utils/auth'
import { superAuth } from '@/utils/auth'
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
  // 开启数据缓存(默认存在sessionStorage，store的id作为key，state的内容作为value)
  /* persist: {
    enabled: true,
    // 自定义缓存字段key，缓存位置，指定缓存的字段
    strategies: [
      {
        key: 'custom-user',
        storage: localStorage,
        paths: ['token']
      }
    ]
  }, */
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
        const userData: Response<LoginResult> = {
          code: 1,
          message: '登录成功',
          data: {
            userName: 'super',
            permission: superAuth,
            token: new Date().getTime().toString(32)
          }
        }
        // const userData = await loginApi(params)
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
