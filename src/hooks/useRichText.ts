import { onBeforeUnmount, reactive } from 'vue'
import WangEditor from 'wangeditor'
import { message } from 'ant-design-vue'
import { uploadImg } from '@/api/index'
interface P {
  html: string
}

interface Props {
  ref: HTMLElement | null
  value?: string
  config?: any
}

const useRichText = (props: Props): any => {
  const ctx = reactive<P>({
    html: ''
  })
  let instance = reactive({}) as WangEditor
  instance = new WangEditor(props.ref)

  // 富文本配置
  const editConfig = {
    excludeMenus: ['video'],
    showLinkImg: false,
    uploadImgMaxLength: 1,
    pasteIgnoreImg: true,
    focus: false,
    onchange() {
      ctx.html = instance.txt.html() as string
    },
    customUploadImg: function (file: any, insertImgFn: any) {
      const isLt10M = file[0].size / 1024 / 1024 < 2
      const nameLength = file[0].name.length
      if (!isLt10M) {
        message.error('图片需小于2MB!')
        return
      }
      if (nameLength > 20) {
        message.error('图片名称需要小于20字符')
        return
      }
      message.success('正在上传中...', 1)
      handleEditorUpload(file)
        .then((res: FileType) => {
          insertImgFn(res.fileUrl)
          message.success('上传成功!')
        })
        .catch((err) => {
          console.log(err)
          message.error(err)
        })
    }
  }

  // 富文本内图片开始上传
  const handleEditorUpload = (file: any) => {
    return new Promise<any>((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', file[0])
      uploadImg(formData)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  Object.assign(instance.config, editConfig, props.config)
  instance.create()
  instance.txt.html(props.value)
  onBeforeUnmount(() => {
    instance.destroy()
  })

  return [ctx, instance]
}
export default useRichText
