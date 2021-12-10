import { ref } from 'vue'

/* 控制弹框标题和显隐 */
export default function useModalConfig() {
  const visible = ref(false)
  const title = ref('新增')
  const setVisible = (v: boolean) => {
    visible.value = v
  }
  const setTitle = (v: string) => {
    title.value = v
  }

  return {
    setVisible,
    setTitle,
    title,
    visible
  }
}
