<template>
  <div class="role-search">
    <Button v-if="handlePermission('角色新增')" type="primary" @click="add">
      <template #icon><PlusOutlined /></template> 新增
    </Button>
    <div class="search-right">
      <Form ref="formRef" :model="form" autocomplete="off">
        <Form.Item label="角色名" name="roleName">
          <Input v-model:value="form.roleName" placeholder="请输入角色名" />
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
import { handlePermission } from '@/utils/auth'
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
  roleName: ''
})
const formRef = ref<HTMLElement | null>(null)
</script>
<style lang="scss" scoped>
.role-search {
  //   margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  .search-right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
}
</style>
