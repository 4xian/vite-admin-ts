<template>
  <Form ref="roleRef" v-bind="layout" layout="horizontal">
    <Form.Item label="角色名" required v-bind="validateInfos.roleName">
      <Input v-model:value="initForm.roleName" placeholder="请输入角色名" />
    </Form.Item>
    <Form.Item label="权限配置" required name="permission">
      <Tree
        v-model:checkedKeys="tree.checkedKeys"
        checkable
        :tree-data="menuTreeList"
        :expanded-keys="tree.openKeys"
        @expand="expandNode"
        @select="selectNode"
      ></Tree>
    </Form.Item>
  </Form>
</template>

<script lang="ts" setup>
import { reactive, ref, unref } from 'vue'
import type { UnwrapRef } from 'vue'
import { SystemType } from '#/system'
import { Form, Input, Tree } from 'ant-design-vue'
import { menuTreeList } from '@/utils/auth'
const props = defineProps({
  isEdit: Boolean,
  initValues: Object as PropType<Partial<SystemType.RoleList>>
})
const layout = {
  labelCol: { span: 4, offset: 2 },
  wrapperCol: { span: 10 }
}
const handleMenu = (v: SystemType.PermissionType[]): (string | number)[] => {
  let arr: (string | number)[] = []
  const nest = (v: SystemType.PermissionType[]) => {
    v.forEach((t: SystemType.PermissionType) => {
      arr = [...arr, t.key]
      if (t.children && t.children.length) {
        nest(t.children)
      }
    })
  }
  nest(v)
  return arr
}
const roleRef = ref<HTMLElement | null>(null)
const useForm = Form.useForm
const initForm = reactive<UnwrapRef<Partial<SystemType.RoleList>>>(props.initValues || {})
const rules = reactive({
  roleName: [
    {
      required: true,
      message: '请输入角色名'
    }
  ]
})
const { validateInfos, validate } = useForm(initForm, rules)
const tree = reactive<{ [key: string]:(string | number)[] }>({
  openKeys: [],
  checkedKeys: handleMenu(unref(initForm).permission || [])
})
const expandNode = (v: string[] | number[]) => {
  tree.openKeys = v
}
const selectNode = (v: number[]) => {
  console.log(v)
}

defineExpose({
  validate
})
</script>
