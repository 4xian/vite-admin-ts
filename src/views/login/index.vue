<template>
  <div class="min-login flex-center">
    <img class="min-login-logo" :class="{ hidelogo: !sideStatus }" src="@/assets/images/login.svg" alt="" />
    <div class="min-login-form flex-center">
      <div class="form-title">{{ SysTitle }}</div>
      <el-form ref="loginForm" class="login-form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SysTitle } from '@/settings'
import { ref, unref, reactive, computed } from 'vue'
import { setCookie } from '@/utils/cookies'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useLayoutSetting } from '@/store/modules/layout/index'
import { userUserStoreSetup } from '@/store/modules/user/index'
import { AxiosError } from 'axios'
const layoutStore = useLayoutSetting()
const sideStatus = computed(() => layoutStore.getSideStatus)
const userStore = userUserStoreSetup()
const router = useRouter()

const loginForm = ref()
const form = reactive({
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
  unref(loginForm).validate((valid: boolean) => {
    if (valid) {
      userStore
        .login(form)
        .then((res: any) => {
          console.log(res)
          ElMessage.success('登录成功')
          router.push('/')
        })
        .catch((err: AxiosError) => {
          console.log(err)
          ElMessage.error('登录失败')
        })
    } else {
      ElMessage.error('请填写必填字段!')
    }
  })
}
</script>
<style lang="scss" scoped>
.min-login {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 600px;

  &-logo {
    width: 50%;
  }

  &-form {
    height: 600px;
    min-width: 600px;
    padding: 50px;
    text-align: center;
    border-radius: 10%;
    flex-direction: column;

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
