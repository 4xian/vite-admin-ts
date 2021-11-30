<template>
  <Form ref="userRef" v-bind="layout" layout="horizontal" :rules="rules" :model="initForm" autocomplete="off">
    <Form.Item label="所属角色" name="roleName">
      <Select v-model:value="initForm.roleName" :options="selOpts" style="width: 120px;" @change="selChange"></Select>
    </Form.Item>
    <Form.Item label="用户名" name="userName">
      <Input v-model:value="initForm.userName" placeholder="请输入用户名" />
    </Form.Item>
    <Form.Item label="密码" name="password">
      <InputPassword v-model:value="initForm.password" placeholder="请输入密码" />
    </Form.Item>
  </Form>
</template>
<script lang="ts" setup>
import { reactive, ref, withDefaults } from 'vue'
import type { UnwrapRef } from 'vue'
import { SystemType } from '#/system'
import { Form, Input, Select, InputPassword } from 'ant-design-vue'
interface P {
  isEdit: boolean
  initValues: Partial<SystemType.UserList>
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
const userRef = ref<HTMLElement | null>(null)
const initForm = reactive<UnwrapRef<Partial<SystemType.UserList>>>(props.initValues)
const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  roleName: [
    {
      required: true,
      message: '请选择角色名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

const selOpts = ref<{ value: string; label: string }[]>([
  {
    value: '超级管理员',
    label: '超级管理员'
  },
  {
    value: '管理员',
    label: '管理员'
  },
  {
    value: '普通用户',
    label: '普通用户'
  }
])

const selChange = (e: string) => {
  console.log(e)
}

defineExpose({
  userRef
})
</script>
