<!--  -->
<template>
  <div class="preview-pdf">
    <Button type="primary" @click="reset">重置</Button>
    <div id="pdf" ref="pdfRef" class="pdf-box">
      <!-- <vue-pdf-embed :source="pdfSrc" /> -->
      <iframe
        id="ceshi-pdf"
        name="ceshi-pdf"
        :src="`/public/pdfView/web/viewer.html?file=../../../../public/ceshi.pdf`"
        style="width: 100%; height: 100%; border: none;"
      />
    </div>
    <div class="img-box">
      <!-- <img
        v-for="(it, id) in imgList"
        :id="'img' + id"
        :key="it"
        class="img-item"
        :src="it"
        alt=""
        draggable
      /> -->
      <iframe
        id="ceshi-img"
        name="ceshi-img"
        src="../../../../public/ceshi.html"
        style="width: 100%; height: 100%; border: none;"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { message, Button } from 'ant-design-vue'
import VuePdfEmbed from 'vue-pdf-embed'

const pdfSrc = ref('/public/ceshi.pdf')

const imgList = reactive([
  'https://picsum.photos/50/100',
  'https://picsum.photos/50/50',
  'https://picsum.photos/100/100'
])

// 上一次位置存储
const offsetList = reactive<any>([])
const pdfRef = ref<HTMLElement | null>(null)
const tempEle = ref<any>(null)
const startX = ref<number>(0)
const startY = ref<number>(0)

// 图片父节点
const imgParentEle = ref<any>(null)
// 文档父节点
const pdfParentEle = ref<any>(null)

// 文档子window
const iframeDoc = ref<any>(null)
// 图片子window
const imgIframeDoc = ref<any>(null)

let ele: any = null

let imgEle: any = null

onMounted(() => {
  //   func();
  init()
})

const reset = () => {
  imgEle.firstElementChild && imgEle.removeChild(imgEle.firstElementChild)
  imgEle.innerHTML = ele
  let child = pdfParentEle.value.lastElementChild
  while (child && child.className === 'img-item') {
    pdfParentEle.value.removeChild(child)
    child = pdfParentEle.value.lastElementChild
  }
}

const init = () => {
  /* document.addEventListener("dragstart", (e) => {
    console.log("父拖拽第一次开始", e, e.target);
    startX.value = e.offsetX;
    startY.value = e.offsetY;
    tempEle.value = e.target;
  }); */
  /* document.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("拖拽移动中", e);
  });
  document.addEventListener("drop", (e: any) => {
    console.log("拖拽落下", e, e.target);
    e.preventDefault();
    if (e.target.className == "viewerContainer") {
      tempEle.value.parentNode.removeChild(tempEle.value);
      tempEle.value.style.position = "absolute";
      tempEle.value.style.cursor = "move";
      tempEle.value.style.left = `${e.offsetX - startX.value}px`;
      tempEle.value.style.top = `${e.offsetY - startY.value}px`;
      e.target.appendChild(tempEle.value);
    } else {
      message.error("请拖拽到pdf中");
    }
  }); */
  const iframe: any = document.getElementById('ceshi-pdf')
  iframeDoc.value = iframe.contentWindow
  const imgIframe: any = document.getElementById('ceshi-img')
  imgIframeDoc.value = imgIframe.contentWindow

  imgIframeDoc.value.onload = () => {
    imgEle = imgIframeDoc.value.document.getElementById('ceshi-box')
    ele = imgEle.firstElementChild.outerHTML
  }

  imgIframeDoc.value.addEventListener('dragstart', (e: any) => {
    // console.log("子图片拖拽开始", e, e.target, e.target.parentNode);
    startX.value = e.offsetX
    startY.value = e.offsetY
    tempEle.value = e.target
  })
  iframeDoc.value.addEventListener('dragstart', (e: any) => {
    // console.log("子文档拖拽开始", e, e.target);
    startX.value = e.offsetX
    startY.value = e.offsetY
    tempEle.value = e.target
  })
  iframeDoc.value.addEventListener('dragover', (e: any) => {
    e.preventDefault()
    // console.log("拖拽移动中", e);
  })
  iframeDoc.value.addEventListener('drop', (e: any) => {
    // console.log("拖拽落下", e);
    pdfParentEle.value = e.target
    e.preventDefault()
    if (e.target.id === 'viewerContainer') {
      tempEle.value.parentNode.removeChild(tempEle.value)
      tempEle.value.style.position = 'absolute'
      tempEle.value.style.cursor = 'move'
      tempEle.value.style.left = `${e.offsetX - startX.value}px`
      tempEle.value.style.top = `${e.offsetY - startY.value}px`
      e.target.appendChild(tempEle.value)
      console.log('左上角x:', e.offsetX, 'y:', e.offsetY)
    } else {
      message.error('请拖拽到pdf中')
    }
  })
}

// 方法一

/* <img
        v-for="(it, id) in imgList"
        :id="'img' + id"
        :key="it"
        class="img-item"
        :src="it"
        alt=""
        draggable
        @mousedown="dragInit"
        @dragover="dragOver"
        @dragend="dragEnd($event, id)"
      /> */

const dragInit = (e: any) => {
  console.log('拖拽初始化', e)
  console.log(pdfRef.value?.getBoundingClientRect())
  startX.value = e.offsetX
  startY.value = e.offsetY
}
const dragStart = (e: any, id: number) => {
  console.log('拖拽开始', e, id)
}
const dragOver = (e: any) => {
  console.log('拖拽经过', e)
  e.preventDefault()
  e.dataTransfer.dropEffect = 'none'
}
const dragEnd = (e: any, id: number) => {
  console.log('拖拽结束', e, id)
  const img: any = document.getElementById(`img${id}`);
  let left = 0;
  let top = 0
  left = (offsetList[id]?.[0]['left'] || 0) + e.offsetX - startX.value
  top = (offsetList[id]?.[0]['top'] || 0) + e.offsetY - startY.value
  offsetList[id] = [{ left: left, top: top }]
  img.style.left = `${left}px`
  img.style.top = `${top}px`
  console.log(img.getBoundingClientRect())
}
</script>

<style lang="scss" scoped>
.preview-pdf {
  display: flex;
  align-items: center;
  justify-content: center;

  .pdf-box {
    width: 500px;
    height: 800px;
    border: 1px solid red;
  }

  .img-box {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 600px;
    // position: absolute;
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    border: 1px solid red;
    // z-index: 5;
    .img-item {
      width: min-content;
      margin-bottom: 20px;
      //   position: absolute;
      //   z-index: 5;
      cursor: move;

      &:hover {
        cursor: move;
      }
    }
  }
}
</style>
