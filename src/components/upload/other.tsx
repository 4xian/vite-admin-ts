import { propsData, OptionsType, style } from './props'
import { ref, reactive, defineComponent } from 'vue'
import { Plus } from '@element-plus/icons'
import { ElUpload, ElIcon } from 'element-plus'
// 初始化配置
const initOptions: OptionsType = {
  accept: 'image/*',
  // 是否立即上传，false为手动上传
  immediate: true,
  // 立即上传时的上传地址
  action: 'https://jsonplaceholder.typicode.com/posts/',
  // 文件展示的形式,默认卡片
  listType: 'picture-card',
  // 文件名长度限制
  length: 15,
  // 是否多选
  multiple: true,
  // 文件上传最大数量
  max: 15,
  // 文件大小
  size: 2,
  disabled: false,
  width: 100,
  text: '',
  tip: ''
}
export default defineComponent({
  name: 'MinUpload',
  props: propsData,
  setup(props) {
    const mergeOptions = reactive<OptionsType>({ ...initOptions, ...props.options })
    const { action, immediate, listType } = mergeOptions
    const handleFunc = {
      action,
      'file-list': props.fileList,
      'auto-upload': immediate,
      'list-type': listType,
      beforeUpload: (e: any) => {
        console.log(e)
      },
      onChange: (e: any) => {
        console.log(e)
      }
    }
    return {
      mergeOptions,
      props,
      handleFunc
    }
  },
  render() {
    return (
      <ElUpload {...this.handleFunc} class="custom-upload">
        <ElIcon>
          <Plus />
        </ElIcon>
      </ElUpload>
    )
  }
})
