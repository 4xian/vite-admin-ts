<template>
  <div class="min-login flex-center">
    <img class="min-login-logo" :class="{ hidelogo: !sideStatus }" src="@/assets/images/login.svg" alt="" />
    <div class="min-login-form flex-center">
      <div class="form-title">{{ SysTitle }}</div>
      <a-form
        ref="loginRef"
        layout="horizontal"
        class="login-form"
        :label-col="formLayout.label"
        :rules="rules"
        :model="form"
      >
        <a-form-item label="用户名" required name="userName">
          <a-input v-model:value="form.userName" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码" required name="password">
          <a-input-password v-model:value="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
          <a-button type="primary" @click="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SysTitle } from '@/settings'
import { ref, unref, reactive, computed } from 'vue'
import type { UnwrapRef } from 'vue'
import { setCookie } from '@/utils/cookies'
import { useRouter } from 'vue-router'
import { useLayoutSetting } from '@/store/modules/layout/index'
import { userUserStoreSetup } from '@/store/modules/user/index'
import type { AxiosError } from 'axios'
import { message } from 'ant-design-vue'
import { Response } from '#/request'
import { LoginResult } from '@/api/models/user'
interface FormType {
  userName: string
  password: string
}

const formLayout = {
  label: { style: { width: '80px' }},
  wrapperCol: { span: 14 }
}
const layoutStore = useLayoutSetting()
const sideStatus = computed(() => layoutStore.getSideStatus)
const userStore = userUserStoreSetup()
const router = useRouter()
const loginRef = ref()

const form = reactive<UnwrapRef<FormType>>({
  userName: '',
  password: ''
})
const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名',
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

const submit = () => {
  unref(loginRef)
    .validate()
    .then((valid: FormType) => {
      userStore
        .login(valid)
        .then((res: Response<LoginResult>) => {
          if (res.code === 1) {
            message.success('登录成功')
            router.push('/')
          } else {
            message.error(res.message)
          }
        })
        .catch((err: AxiosError) => {
          console.log(err)
          message.error('登录失败')
        })
    })
    .catch((err: AxiosError) => {
      console.log('err', err)
    })
}
</script>
<style lang="scss" scoped>
.min-login {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 500px;

  &-logo {
    width: 50%;
  }

  &-form {
    height: 500px;
    min-width: 500px;
    padding: 0 30px;
    margin-left: 30px;
    text-align: center;
    border-radius: 10px;
    flex-direction: column;
    box-shadow: 0 1px 50px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

    .form-title {
      margin-bottom: 50px;
      font-size: 36px;
    }

    .login-form {
      width: 80%;
    }
  }

  .hidelogo {
    display: none;
  }
}
</style>
