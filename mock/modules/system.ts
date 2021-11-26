import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'
import { menuTreeList } from '@/utils/auth'

Random.extend({
  permission: () => {
    return Random.pick(['管理员', '普通用户', '超级管理员'])
  }
})

const list = () => {
  /* let data = []
  for (let idx = 0; idx < 10; idx++) {
    data.push(
      Mock.mock({
        roleId: Random.integer(100, 10000),
        roleName: '@PERMISSION',
        createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
        updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
        permission: [
          {
            key: Random.integer(10, 100000),
            title: '首页',
            children: []
          },
          {
            key: Random.integer(100, 100000),
            title: '系统管理',
            children: [
              {
                key: Random.integer(1000, 100000),
                title: '-角色管理',
                children: []
              },
              {
                key: Random.integer(1000, 100000),
                title: '-用户管理',
                children: []
              }
            ]
          }
        ]
      })
    )
  } */
  return [
    Mock.mock({
      roleId: Random.integer(100, 10000),
      roleName: '超级管理员',
      createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      permission: menuTreeList
    }),
    Mock.mock({
      roleId: Random.integer(100, 10000),
      roleName: '管理员',
      createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      permission: [
        {
          key: 100,
          title: '首页',
          children: []
        },
        {
          key: 101,
          title: '系统管理',
          children: [
            {
              key: 1010,
              title: '角色管理',
              children: []
            },
            {
              key: 1011,
              title: '用户管理',
              children: []
            }
          ]
        },
        {
          title: '组件',
          key: 102,
          children: [
            {
              title: '无缝滚动',
              key: 1020,
              children: []
            },
            {
              title: '富文本',
              key: 1021,
              children: []
            },
            {
              title: '图片裁剪',
              key: 1022,
              children: []
            },
            {
              title: '数字滚动',
              key: 1023,
              children: []
            },
            {
              title: '图片上传',
              key: 1024,
              children: []
            }
          ]
        }
      ]
    }),
    Mock.mock({
      roleId: Random.integer(100, 10000),
      roleName: '普通用户',
      createTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      updateTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      permission: [
        {
          key: 100,
          title: '首页',
          children: []
        },
        {
          title: '组件',
          key: 102,
          children: [
            {
              title: '无缝滚动',
              key: 1020,
              children: []
            },
            {
              title: '富文本',
              key: 1021,
              children: []
            },
            {
              title: '图片裁剪',
              key: 1022,
              children: []
            },
            {
              title: '数字滚动',
              key: 1023,
              children: []
            },
            {
              title: '图片上传',
              key: 1024,
              children: []
            }
          ]
        },
        {
          title: '关于',
          key: 103,
          children: []
        },
        {
          title: '菜单',
          key: 104,
          children: [
            {
              title: '子菜单',
              key: 1041,
              children: []
            },
            {
              title: '子菜单1-1',
              key: 1041,
              children: [
                {
                  title: '子菜单1-1-1',
                  key: 10411,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    })
  ]
}

export const rolesList: MockMethod[] = [
  {
    url: '/api/getRoleList',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 1,
        message: '获取成功',
        data: list
      }
    }
  }
]
