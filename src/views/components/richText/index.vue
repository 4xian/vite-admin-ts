<!-- 法一：使用自定义组件 -->
<template>
  <div class="rich">
    <el-divider content-position="center">富文本demo</el-divider>
    <div ref="richText" class="rich-item">
      <MinRichText ref="minRich" :init-value="text" @get-value="getValue"></MinRichText>
    </div>
    <el-button type="primary" @click="getHtml">提取html</el-button>
    <el-divider>分割线</el-divider>
    <div class="rich-item-one">
      <MinRichText ref="minRichOne" :init-value="textOne" :config="richConfig" @get-value="getValueOne"></MinRichText>
    </div>
    <el-button type="primary" @click="getHtmlOne">提取另一个html</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import MinRichText from '@/components/richText/index.vue'
const text = ref()
const textOne = ref()
const minRich = ref()
const minRichOne = ref()
const richConfig = reactive({
  height: 500
})
const getValue = (e: any) => {
  console.log('取值:', e)
}
const getValueOne = (e: any) => {
  console.log('另一个取值:', e)
}
onMounted(() => {
  handleInit()
})

const handleInit = () => {
  setTimeout(() => {
    //   模拟接口返回初始值
    text.value = '你好，初始值'
    textOne.value = '另一个500高度的编辑器'
  }, 3000)
}

const getHtml = () => {
  console.log(minRich.value.html)
}
const getHtmlOne = () => {
  console.log(minRichOne.value.html)
}
</script>

<!-- 法二：使用抽离的hooks -->
<!--<template>
  <div class="rich">
    <el-divider content-position="center">富文本demo</el-divider>
    <div class="rich-item" ref="richText">
    </div>
    <el-button type="primary" @click="getHtml">提取html</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import useRichText from '@/hooks/useRichText'
const editor = reactive<{ text: any; instance: any }>({
  text: '',
  instance: {}
})
const richText = ref<HTMLElement | null>(null)
onMounted(() => {
  handleInit1()
})

const handleInit1 = () => {
  nextTick(() => {
    const [html, instance] = useRichText({ ref: richText.value, value: '' })
    editor.text = html
    editor.instance = instance
  })
  setTimeout(() => {
    //   模拟接口返回初始值
    editor.instance.txt.html('初始值')
  }, 3000)
}
const getHtml1 = () => {
  console.log(editor.text?.html)
}
</script>
-->
