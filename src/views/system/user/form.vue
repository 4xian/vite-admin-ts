<template>
  <Form ref="roleRef" v-bind="layout" layout="horizontal" :rules="rules" :model="initForm" autocomplete="off">
    <Form.Item label="角色名" name="roleName">
      <Input v-model:value="initForm.roleName" placeholder="请输入角色名" />
    </Form.Item>
    <Form.Item label="权限配置" name="permission">
      <Tree
        v-model:checkedKeys="initForm.permission"
        checkable
        :tree-data="menuTreeList"
        :expanded-keys="tree.openKeys"
        @Expand="expandNode"
      ></Tree>
    </Form.Item>
  </Form>
</template>
<script lang="ts" setup>
import { reactive, ref, withDefaults } from 'vue'
import type { UnwrapRef } from 'vue'
import { SystemType } from '#/system'
import { menuTreeList } from '@/utils/auth'
import { Form, Input, Tree } from 'ant-design-vue'
interface P {
  isEdit: boolean
  initValues: Partial<SystemType.RoleList>
}
const props = withDefaults(defineProps<P>(), {
  isEdit: false,
  initValues: () => {
    return { roleName: '', permission: [] }
  }
})

const layout = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 10, offset: 1 }
}
const roleRef = ref<HTMLElement | null>(null)
const initForm = reactive<UnwrapRef<Partial<SystemType.RoleList>>>(props.initValues)
const rules = reactive({
  roleName: [
    {
      required: true,
      message: '请输入角色名a',
      trigger: 'blur'
    }
  ],
  permission: [
    {
      required: true,
      validator: async (_: any, v: string) => {
        if (v && v.length) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择权限')
        }
      },
      trigger: 'blur'
    }
  ]
})
const tree = reactive<{ openKeys:(string | number)[] }>({
  openKeys: []
})
const expandNode = (v: string[] | number[]) => {
  tree.openKeys = v
}
defineExpose({
  roleRef
})
</script>
<!-- <script lang="tsx">
// tsx写法
import { reactive, ref, defineComponent,unref } from 'vue'
import type { UnwrapRef } from 'vue'
import { SystemType } from '#/system'
import { menuTreeList } from '@/utils/auth'
import {Form,Input,Tree} from 'ant-design-vue'
interface P {
  isEdit: boolean
  initValues: Partial<SystemType.RoleList>
}
const props = {
  isEdit: {
    type: Boolean,
    default: false
  },
  initValues: {
    type: Object as PropType<Partial<SystemType.RoleList>>,
    default: () => {
      return { roleName: '', permission: null }
    }
  }
}
export default defineComponent({
  name: 'FormItem',
  props,
  setup(props,{expose}) {
    const layout = {
      labelCol: { span: 4, offset: 2 },
      wrapperCol: { span: 10, offset: 1 }
    }
    const roleRef = ref<HTMLElement | null>(null)
    const initForm = reactive<UnwrapRef<Partial<SystemType.RoleList>>>(props.initValues)
    const rules = reactive({
      roleName: [
        {
          required: true,
          message: '请输入角色名a',
          trigger: 'blur'
        }
      ],
      permission: [
        {
          required: true,
          validator: async (_: any, v: string) => {
            if (v && v.length) {
              return Promise.resolve()
            } else {
              return Promise.reject('请选择权限')
            }
          },
          trigger: 'blur'
        }
      ]
    })
    const tree = reactive<{ openKeys: (string | number)[] }>({
      openKeys: []
    })
    const expandNode = (v: string[] | number[]) => {
      tree.openKeys = v
    }
	expose({
		roleRef
	})
	return ()=>(
		<Form ref={roleRef} {...layout} layout="horizontal" rules={rules} model={initForm} autocomplete="off">
    		<Form.Item label="角色名" name="roleName">
      			<Input v-model:value={initForm.roleName} placeholder="请输入角色名" />
    		</Form.Item>
    		<Form.Item label="权限配置" name="permission">
      			<Tree
        			v-model:checkedKeys={initForm.permission}
        			checkable
        			tree-data={menuTreeList}
        			expanded-keys={tree.openKeys}
        			onExpand={expandNode}
      			></Tree>
    		</Form.Item>
  		</Form>
	)
  }
})
</script> -->
