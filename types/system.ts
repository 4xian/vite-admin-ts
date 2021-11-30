export declare namespace SystemType {
  // 角色类型
  type RoleList = {
    roleId: number
    roleName: string
    permission: (string | number)[]
    createTime: string
    updateTime: string
  }
  type GetParamsType = {
    roleName?: string
  }
  interface RoleInitValues extends RoleList {
    test: string
  }
  type PermissionType = {
    key: string | number
    title: string
    children: PermissionType[]
  }

  //   用户类型
  type UserList = {
    userId: string
    userName: string
    password: string
    createTime: string
    updateTime: string
    roleName: string
  }
  type UserParamsType = {
    userName?: string
    roleName?: string
  }
}
