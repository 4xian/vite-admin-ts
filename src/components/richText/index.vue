<template>
  <div ref="richText" class="min-rich"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, reactive, onBeforeUnmount, computed } from 'vue'
import WangEditor from 'wangeditor'
const props = defineProps({
  initValue: {
    type: String,
    default: ''
  },
  config: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['getValue'])
const richText = ref<HTMLElement | null>(null)
const html = ref<string>('')
let instance = reactive({}) as WangEditor
onMounted(() => {
  init()
})

const initValue = computed(() => props.initValue)

watch(initValue, () => {
  instance.txt.html(props.initValue)
})

const init = () => {
  instance = new WangEditor(richText.value)
  Object.assign(
    instance.config,
    {
      onchange() {
        html.value = instance.txt.html() as string
        emits('getValue', html.value)
      }
    },
    props.config
  )
  instance.create()
  instance.txt.html(props.initValue)
}

defineExpose({ html, instance })

onBeforeUnmount(() => {
  instance.destroy()
})
</script>
