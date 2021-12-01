<template>
  <div class="min-upload">
    <a-upload
      :class="[customClass]"
      :action="action"
      :before-upload="beforeUpload"
      :remove="fileRemove"
      :list-type="listType"
      :multiple="multiple"
      :disabled="disabled"
      :accept="accept"
      :file-list="imgList"
      @change="fileChange"
    >
      <template v-if="listType === 'picture-card'">
        <a-tooltip placement="topLeft" :title="`限制 ${max} 张，${tip}`">
          <PlusOutlined />
          <div style="margin-top: 8px;">{{ text }}</div>
        </a-tooltip>
      </template>
      <template v-else>
        <a-tooltip placement="topLeft" :title="`限制 ${max} 张，${tip}`">
          <a-button>
            <template #icon><PlusOutlined /></template>
            {{ text }}
          </a-button>
        </a-tooltip>
      </template>
    </a-upload>
  </div>
</template>

<script lang="ts" setup>
import { propsData, OptionsType, FileItem, FileInfo } from './props'
import { ref, reactive, unref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { uploadImg } from '@/api/index'
const props = defineProps(propsData)
const emits = defineEmits(['finish'])

// 初始化配置
const initOptions: OptionsType = {
  // 接受上传类型
  accept: 'image/*',
  // 是否立即上传，false为手动上传
  immediate: true,
  // 立即上传时的上传地址
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  // 文件展示的形式,默认卡片
  listType: 'picture-card',
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
const mergeOptions = reactive<OptionsType>({ ...initOptions, ...props.options })
const { accept, action, listType, multiple, disabled, width, size, immediate, length, text, tip, max } = mergeOptions
const uploadwidth = ref(`${width}px`) // 图片宽高
const imgList = ref<Partial<FileItem>[]>(props.fileList) // 文件列表

/* 上传之前拦截 */
const beforeUpload = (file: FileItem) => {
  const isLimit = file.size / 1024 / 1024 < size
  const nameLimit = file.name ? file.name.length : 0
  if (!isLimit) {
    message.error(`图片需小于${size}mb`)
  }
  if (nameLimit > length) {
    message.error(`图片名称需要小于${length}个长度`)
  }
  imgList.value = [...imgList.value, file]
  return immediate
}

/* change事件 */
const fileChange = (e: FileInfo) => {
  if (!validFile(e.file.size, e.file.name)) {
    // 剔除不符合选项的图片
    const id = e.fileList.findIndex((t) => t.uid === e.file.uid)
    e.fileList.splice(id, 1)
    imgList.value = e.fileList
  } else {
    imgList.value = e.fileList.slice(-max)
  }
  if (immediate) {
    const done = e.fileList.filter((f) => f.status === 'done')
    const flag =
      max === 1 ? e.file.status === 'done' : done && done.length === e.fileList.length - props.fileList.length
    if (flag) {
      // 全都上传完毕
      imgList.value = e.fileList
      emits('finish', formatList(e.fileList))
    }
    if (e.file.status === 'error') {
      message.error('上传出错，请重试!')
      const idx = e.fileList.findIndex((t) => t.status === 'error')
      e.fileList.splice(idx, 1)
      imgList.value = e.fileList
    }
  }
}

/* 移除事件 */
const fileRemove = (e: FileItem) => {
  const idx = imgList.value.findIndex((t) => t.url === e.url)
  imgList.value.splice(idx, 1)
}

const validFile = (s: number, len = '') => {
  const isLimit = s / 1024 / 1024 < size
  return isLimit && len.length <= length
}

/* 格式化列表 */
const formatList = (list: Partial<FileItem>[]) => {
  const temp = list.filter((v) => v.status && v.status === 'done')
  const old = list.filter((o) => o.url)
  return [
    ...old.map((o: any) => {
      return {
        name: o.name,
        uid: o.uid,
        url: o.url
      }
    }),
    ...temp.map((t: any) => {
      return {
        name: t.response.name,
        uid: t.uid,
        url: t.response.url
      }
    })
  ]
}

/* 手动上传 */
const customUpload = () => {
  return new Promise((resolve, reject) => {
    if (unref(imgList).length) {
      const pending = unref(imgList).filter((v) => v.originFileObj) // 待上传列表
      const old = unref(imgList).filter((o) => o.url)
      if (pending.length) {
        Promise.all(
          pending.map((v) => {
            const formData = new FormData()
            formData.append('file', v.originFileObj)
            return new Promise((_resolve, _reject) => {
              uploadImg(formData, {
                fileType: '2',
                menu: 'image'
              })
                .then((res) => {
                  _resolve(res.data)
                })
                .catch((err) => {
                  _reject(err)
                })
            })
          })
        )
          .then((res) => {
            const temp = res.map((f: any) => {
              return {
                name: '',
                url: f.fileUrl,
                uid: f.fileId
              }
            })
            resolve([...old, ...temp])
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        resolve(old)
      }
    } else {
      message.error('请先上传图片')
      reject('请先上传图片')
    }
  })
}

/* 暴露列表给父组件 */
const getFileList = () => {
  return formatList(unref(imgList))
}

defineExpose({
  getFileList,
  customUpload
})
</script>
<style lang="scss" scoped>
.min-upload {
  width: 100%;

  :deep(.ant-upload.ant-upload-select-picture-card),
  :deep(.ant-upload-list-picture-card-container) {
    width: v-bind(uploadwidth);
    height: v-bind(uploadwidth);
  }

  :deep(.ant-upload-list-picture-card .ant-upload-list-item) {
    width: 100%;
    height: 100%;
  }
}
</style>
