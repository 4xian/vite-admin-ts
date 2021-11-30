export interface UserInfo {
  id?: string | number
  userName?: string
  avatar?: string
  roles?: string[]
  permission: string[]
}

export interface UserId {
  id: string
}

export interface LoginParams {
  userName: string
  password: string
}

export interface LoginResult {
  userId: string
  avatar: string
  name: string
  id: string | number
  userName: string
  token: string
  roles: string[]
  permission: string[]
}
