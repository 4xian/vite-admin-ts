import type { PropType, CSSProperties } from 'vue'
export const propsData = {
  // 自定义class
  customClass: {
    type: String,
    default: ''
  },
  fileList: {
    type: Array as PropType<Array<FileType>>
  },
  options: {
    type: Object as PropType<Partial<OptionsType>>,
    default: () => {}
  }
}

export interface OptionsType {
  immediate: boolean
  action: string
  listType: string
  length: number
  size: number
  max: number
  multiple: boolean
  fileType: string
}

export interface FileType {
  name: string
  url: string
  uid: string
}

interface CssType {
  [propName: string]: CSSProperties
}

export const style: CssType = {
  minUpload: {
    height: '100px'
  },
  upload: {
    width: '100px',
    height: '100px',
    border: '1px dashed #d9d9d9',
    cursor: 'pointer',
    borderRadius: '10px'
  }
}
