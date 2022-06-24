<!--  -->
<template>
  <div class="index">
    <div id="pdf" ref="pdfRef" class="pdf">
      <!-- <pdf src="https://cdn.jsdelivr.net/gh/mozilla/pdf.js@c6e8ca86/test/pdfs/annotation-link-text-popup.pdf" :page="1"></pdf> -->
      <vue-pdf-embed :source="pdfSrc" />
    </div>
    <div class="img">
      <img
        v-for="(it, id) in imgList"
        :id="'img' + id"
        :key="it"
        class="img-item"
        :src="it"
        alt=""
        draggable
        @dragstart="dragStart"
        @dragover="dragOver"
        @dragend="dragEnd($event, id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const pdfSrc = ref('https://cdn.jsdelivr.net/gh/mozilla/pdf.js@c6e8ca86/test/pdfs/annotation-link-text-popup.pdf')

const imgList = reactive([
  'https://picsum.photos/50/100',
  'https://picsum.photos/50/50',
  'https://picsum.photos/100/100'
])

const pdfRef = ref<HTMLElement | null>(null)

onMounted(() => {
  //   func();
  //   init();
  console.log(pdfRef.value)
})

const init = () => {}

const dragStart = (e: any) => {
  console.log('拖拽开始', e)
}
const dragOver = (e: any) => {
  console.log('拖拽经过', e)
}
const dragEnd = (e: any, id: Number) => {
  console.log('拖拽结束', e, id)
}
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  align-items: center;
  justify-content: center;

  .pdf {
    width: 500px;
    height: 800px;
    border: 1px solid red;
  }

  .img {
    display: flex;
    flex-direction: column;

    .img-item {
      margin-bottom: 20px;

      &:hover {
        cursor: move;
      }
    }
  }
}
</style>
