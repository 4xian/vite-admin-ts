<!-- 头部右侧 -->
<template>
  <div class="min-profile">
    <Dropdown :overlay-style="{ zIndex: 10001 }">
      <div class="flex align-center">
        <img class="min-profile-info" src="@/assets/logo.png" alt="" />
        <span>{{ userName }}</span>
      </div>
      <template #overlay>
        <Menu>
          <MenuItem @click="$router.push('/')">
            <HomeOutlined />
            <span>首页</span>
          </MenuItem>
          <MenuItem @click="changePwd">
            <WarningOutlined />
            <span>修改密码</span>
          </MenuItem>
          <MenuItem @click="logOut">
            <LogoutOutlined />
            <span>退出</span>
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { userUserStoreSetup } from '@/store/modules/user/index'
import { Modal, message, Dropdown, MenuItem, Menu } from 'ant-design-vue'
import { WarningOutlined, HomeOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
const userStore = userUserStoreSetup()
const { userName } = userStore.getUserInfo

const router = useRouter()
const changePwd = () => {
  console.log('修改密码')
}
const logOut = () => {
  Modal.confirm({
    title: '确认退出登录吗?',
    icon: createVNode(ExclamationCircleOutlined),
    okText: '确定',
    cancelText: '取消',
    maskClosable: true,
    onOk: async () => {
      await userStore.logout()
      message.success('退出成功!', 1)
      router.push('/login')
    }
  })
}
</script>

<style lang="scss">
.min-profile {
  cursor: pointer;
  border-radius: 4px;

  &-info {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
