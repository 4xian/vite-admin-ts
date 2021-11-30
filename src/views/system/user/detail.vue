<template>
  <div class="role-detail">
    <Descriptions bordered :column="1" :content-style="contentStyle">
      <Descriptions.Item :label-style="{ width: '140px' }" label="角色名">
        {{ detail?.roleName }}
      </Descriptions.Item>
      <Descriptions.Item :label-style="{ width: '140px' }" label="角色权限">
        <Tree v-model:checkedKeys="permission" default-expand-all checkable :tree-data="menuTreeList"></Tree>
      </Descriptions.Item>
    </Descriptions>
  </div>
</template>
<script setup lang="ts">
import { SystemType } from '#/system'
import { menuTreeList } from '@/utils/auth'
import { Descriptions, Tree } from 'ant-design-vue'
import { ref, computed, CSSProperties } from 'vue'
const props = defineProps({
  detail: Object as PropType<Partial<SystemType.RoleList>>
})

const permission = ref(props.detail?.permission)
const contentStyle = computed(
  (): CSSProperties => {
    return { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }
)
</script>
<style lang="scss" scoped></style>
