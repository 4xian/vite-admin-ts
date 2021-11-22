import { reactive, ref, defineEmits } from 'vue'
import { message, Upload } from 'ant-design-vue'
interface OptionsType {
  accept: string
  immediate: boolean
  action: string
  listType: 'picture-card' | 'picture'
  length: number
  size: number
  max: number
  multiple: boolean
  disabled: boolean
  width: number
  text: string
  tip: string
}
interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  type?: string
  size: number
  originFileObj: any
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

interface P {
  options: Partial<OptionsType>
  fileList: Partial<FileItem>[]
}
interface R {
  imgList: Partial<FileItem>[]
}

// 初始化配置
const initOptions: OptionsType = {
  // 接受上传类型
  accept: 'image/*',
  // 是否立即上传，false为手动上传
  immediate: true,
  // 立即上传时的上传地址
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  // 文件展示的形式,默认卡片
  listType: 'picture',
  // 文件名长度限制
  length: 15,
  // 是否多选
  multiple: true,
  // 文件上传最大数量
  max: 3,
  // 文件大小
  size: 2,
  // 是否禁用
  disabled: false,
  // 图片宽高
  width: 100,
  // 上传按钮文字
  text: '点击上传',
  // 上传图片提示
  tip: '大小：200 x 200'
}
export const useUpload = (props: P) => {
  const mergeOptions = reactive<OptionsType>({ ...initOptions, ...props.options })
  const emits = defineEmits(['finish'])
  const { immediate, length, size, max } = mergeOptions
  const imgList = ref<Partial<FileItem>[]>(props.fileList) // 文件列表
  const finished = ref(false)
  const uploadProps = {
    beforeUpload: (file: FileItem) => {
      const isLimit = file.size / 1024 / 1024 < size
      const nameLimit = file.name ? file.name.length : 0
      if (!isLimit) {
        message.error(`图片需小于${size}mb`)
        return Upload.LIST_IGNORE
      }
      if (nameLimit > length) {
        message.error(`图片名称需要小于${length}个长度`)
        return Upload.LIST_IGNORE
      }
      imgList.value = [...imgList.value, file]
      return immediate
    },
    fileChange: (e: FileInfo) => {
      console.log('change', e)
      imgList.value = e.fileList
      if (immediate) {
        const done = e.fileList.filter((f) => f.status === 'done')
        const flag =
            max === 1 ? e.file.status === 'done' : done && done.length === e.fileList.length - props.fileList.length
        if (flag) {
          // 全都上传完毕
          imgList.value = e.fileList
          finished.value = true
        }
        if (e.file.status === 'error') {
          message.error('上传出错，请重试!')
          const idx = e.fileList.findIndex((t) => t.status === 'error')
          e.fileList.splice(idx, 1)
          imgList.value = e.fileList
        }
      }
    }
  }
  return { imgList, uploadProps, finished }
}
