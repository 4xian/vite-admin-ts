import { onBeforeUnmount, reactive } from 'vue'
import WangEditor from 'wangeditor'

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
  Object.assign(
    instance.config,
    {
      onchange() {
        ctx.html = instance.txt.html() as string
      }
    },
    props.config
  )
  instance.create()
  instance.txt.html(props.value)
  onBeforeUnmount(() => {
    instance.destroy()
  })
  return [ctx, instance]
}
export default useRichText
