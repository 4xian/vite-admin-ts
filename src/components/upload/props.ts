import type { PropType, CSSProperties } from 'vue'
export const propsData = {
  // 自定义class
  customClass: {
    type: String,
    default: ''
  },
  fileList: {
    type: Array as PropType<Array<Partial<FileItem>>>,
    required: true,
    default: []
  },
  options: {
    type: Object as PropType<Partial<OptionsType>>,
    default: () => {}
  }
}

export interface OptionsType {
  accept: string
  immediate: boolean
  action: string
  listType: 'picture-card' | 'picture' | 'text'
  length: number
  size: number
  max: number
  multiple: boolean
  disabled: boolean
  width: number
  text: string
  tip: string
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

export interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  type?: string
  size: number
  originFileObj: any
}

export interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}
