<template>
  <div class="role-detail">
    <Descriptions bordered :column="1" :label-style="labelStyle" :content-style="contentStyle">
      <Descriptions.Item label="用户名">
        {{ detail?.userName }}
      </Descriptions.Item>
      <Descriptions.Item label="角色名">
        {{ detail?.roleName }}
      </Descriptions.Item>
      <Descriptions.Item label="密码">
        {{ detail?.password }}
      </Descriptions.Item>
    </Descriptions>
  </div>
</template>
<script setup lang="ts">
import { SystemType } from '#/system'
import { Descriptions } from 'ant-design-vue'
import { computed, CSSProperties } from 'vue'
const props = defineProps({
  detail: Object as PropType<Partial<SystemType.UserList>>
})

const contentStyle = computed(
  (): CSSProperties => {
    return { display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }
)
const labelStyle = computed(
  (): CSSProperties => {
    return { width: '140px' }
  }
)
</script>
<style lang="scss" scoped></style>
