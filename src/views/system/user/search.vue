<template>
  <div class="user-search">
    <Button type="primary" @click="add">
      <template #icon><PlusOutlined /></template> 新增
    </Button>
    <div class="search-right">
      <Form ref="formRef" layout="inline" :model="form" autocomplete="off">
        <Form.Item label="用户名" name="name">
          <Input v-model:value="form.name" placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="角色名" name="role">
          <Input v-model:value="form.role" placeholder="请输入角色名" />
        </Form.Item>
      </Form>
      <Button type="primary" :style="{ margin: '0 10px' }" @click="search(form)">
        <template #icon><SearchOutlined /></template> 搜索
      </Button>
      <Button danger @click="reset(unref(formRef))">
        <template #icon><ReloadOutlined /></template> 重置
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Button, Form, Input } from 'ant-design-vue'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { withDefaults, reactive, ref, unref } from 'vue'
interface P {
  add: () => void
  search: (v: any) => void
  reset?: (v: any) => void
}
const props = withDefaults(defineProps<P>(), {
  add: () => {},
  search: () => {},
  reset: () => {}
})

const form = reactive({
  name: '',
  role: ''
})
const formRef = ref<HTMLElement | null>(null)
</script>
<style lang="scss" scoped>
.user-search {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .search-right {
    display: flex;
  }
}
</style>
