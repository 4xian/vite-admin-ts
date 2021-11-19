<template>
  <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
    <el-icon><plus /></el-icon>
  </el-upload>
</template>
<script lang="ts">
import { Plus } from '@element-plus/icons'
export default {
  components: {
    Plus
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
