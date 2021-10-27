import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useLayoutSetting } from '@/store/modules/layout/index'
import { screenSize } from '#/layout'
const layoutStore = useLayoutSetting()
const layoutWidth = ref(screenSize.LG)
const mobileWidth = ref(screenSize.SM)
// 屏幕变化 侧边栏,面包屑隐藏/显示
const handleResize = () => {
  const rect = document.body.getBoundingClientRect()
  const flag = rect.width - 1 < layoutWidth.value
  const mobile = rect.width - 1 < mobileWidth.value
  layoutStore.setSideOpened(!flag)
  layoutStore.setBreadStatus(flag)
  layoutStore.setMobileStatus(!mobile)
  layoutStore.setMobileStatus(mobile)
}

export const useResize = () => {
  handleResize()
  onBeforeMount(() => {
    window.addEventListener('resize', handleResize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
}
