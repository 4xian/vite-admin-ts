export declare namespace SystemType {
  type RoleList = {
    roleId: number
    roleName: string
    permission: PermissionType[]
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
}
