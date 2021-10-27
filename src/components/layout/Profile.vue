<!-- 头部右侧 -->
<template>
  <!-- <div class=" flex align-center"> -->
  <el-dropdown class="min-profile flex-center">
    <div class="flex align-center">
      <img class="min-profile-info" src="@/assets/logo.png" alt="" />
      <span>{{ username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
        <el-dropdown-item @click="changePwd">修改密码</el-dropdown-item>
        <el-dropdown-item @click="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- </div> -->
</template>
<script setup lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { userUserStoreSetup } from '@/store/modules/user/index'
const userStore = userUserStoreSetup()
const { username } = userStore.getUserInfo

const router = useRouter()
const changePwd = () => {
  console.log('修改密码')
}
const logOut = () => {
  ElMessageBox.confirm('确认退出登录吗?', '退出登录', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await userStore.logout()
      ElMessage.success('退出成功!')
      router.push('/login')
    })
    .catch(() => {})
}
</script>

<style lang="scss">
.min-profile {
  height: 100%;
  padding: 0 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f6f6f6;
  }

  &-info {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
  }
}
</style>
