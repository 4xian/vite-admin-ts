<script lang="tsx">
import { defineComponent, reactive, ref, unref, CSSProperties, computed, watchEffect } from 'vue'
import {
  CloseCircleOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  UndoOutlined,
  RedoOutlined,
  ReloadOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons-vue'

interface ImageOptions {
  scale: number
  rotate: number
  show: boolean
  idx: number
  src: string
}
enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right'
}

const props = {
  // 是否显示预览
  show: {
    type: Boolean,
    default: false
  },
  // 预览图片数组
  list: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  // 当前图片索引
  index: {
    type: Number,
    default: 0
  },
  // 点击遮罩层是否关闭预览
  clickMaskClose: {
    type: Boolean,
    default: true
  }
}

export default defineComponent({
  name: 'ImagePreview',
  props,
  emits: ['activeIndex', 'closeModal', 'update:show'],
  setup(props, { emit }) {
    const imageOptions = reactive<ImageOptions>({
      scale: 1,
      rotate: 0,
      show: false,
      idx: props.index,
      src: ''
    })

    const imageStyle = computed(
      (): CSSProperties => {
        return {
          transform: `scale(${imageOptions.scale}) rotate(${imageOptions.rotate}deg)`
        }
      }
    )
    const handleImageScale = (e: Event, v: number) => {
      e.stopPropagation()
      const flag = imageOptions.scale <= 0.4 && v < 0
      if (!flag) {
        imageOptions.scale += v
      }
    }

    const handleImageRotate = (e: Event, v: number) => {
      e.stopPropagation()
      const flag = imageOptions.rotate === -270 || imageOptions.rotate === 270
      imageOptions.rotate = flag ? 0 : imageOptions.rotate + v
    }

    const resetImage = (e: Event) => {
      e.stopPropagation()
      imageOptions.scale = 1
      imageOptions.rotate = 0
    }

    const handleClose = () => {
      imageOptions.show = false
      emit('update:show', false)
      emit('closeModal')
    }

    const initPreview = () => {
      const { index, show } = props
      imageOptions.idx = index
      imageOptions.src = props.list[index]
      imageOptions.show = show
    }

    const handleControl = (e: Event, dir: string) => {
      e.stopPropagation()
      const { idx } = imageOptions
      const { list } = props
      if (dir === DIRECTION.LEFT) {
        imageOptions.idx -= 1
        if (idx <= 0) {
          imageOptions.idx = list.length - 1
        }
      } else if (dir === DIRECTION.RIGHT) {
        imageOptions.idx += 1
        if (idx >= list.length - 1) {
          imageOptions.idx = 0
        }
      }
      emit('activeIndex', imageOptions.idx)
      imageOptions.src = props.list[imageOptions.idx]
    }

    const handleClickMask = () => {
      if (props.clickMaskClose) handleClose()
    }

    watchEffect(() => {
      if (props.show) initPreview()
    })

    /* 关闭 */
    const renderClose = (): JSX.Element => {
      return (
        <div class='image-preview-close'>
          <CloseCircleOutlined title='关闭' style={{ fontSize: '30px', color: '#fff' }} onClick={() => handleClose()} />
        </div>
      )
    }
    /* 预览工具 */
    const renderUtils = (): JSX.Element => {
      return (
        <div class='preview-util justify-space-between'>
          <UndoOutlined
            title='左转'
            style={{ fontSize: '30px', color: '#ffffff59' }}
            onClick={(e) => handleImageRotate(e, -90)}
          />
          <RedoOutlined
            title='右转'
            style={{ fontSize: '30px', color: '#ffffff59' }}
            onClick={(e) => handleImageRotate(e, 90)}
          />
          <ZoomInOutlined
            title='放大'
            style={{ fontSize: '30px', color: '#ffffff59' }}
            onClick={(e) => handleImageScale(e, 0.2)}
          />
          <ZoomOutOutlined
            title='缩小'
            style={{ fontSize: '30px', color: '#ffffff59', marginRight: '20px' }}
            onClick={(e) => handleImageScale(e, -0.2)}
          />
          <ReloadOutlined
            title='还原'
            style={{ fontSize: '30px', color: '#ffffff59' }}
            onClick={(e) => resetImage(e)}
          />
        </div>
      )
    }
    /* 左右控制 */
    const renderControl = (): JSX.Element => {
      return (
        <div class='image-control justify-space-between'>
          <div class='image-control-left' onClick={(e) => handleControl(e, DIRECTION.LEFT)}>
            <LeftOutlined style={{ fontSize: '24px', color: '#E4E4E4' }} />
          </div>
          <div class='image-control-right' onClick={(e) => handleControl(e, DIRECTION.RIGHT)}>
            <RightOutlined style={{ fontSize: '24px', color: '#E4E4E4' }} />
          </div>
        </div>
      )
    }

    const renderPreview = (): JSX.Element | boolean => {
      return (
        imageOptions.show && (
          <div class='image-modal flex-center' onClick={() => handleClickMask()}>
            <img src={imageOptions.src} style={unref(imageStyle)} />
            {renderClose()}
            {renderUtils()}
            {renderControl()}
          </div>
        )
      )
    }

    return () => {
      return <div class='min-image'>{renderPreview()}</div>
    }
  }
})
</script>

<style lang="scss" scoped>
.min-image {
  position: relative;
  overflow: hidden;

  &-item {
    cursor: pointer;
  }

  .image-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $imagePreviewZIndex;
    background: rgb(0 0 0 / 50%);
    user-select: none;

    .image-preview-close {
      position: absolute;
      top: 50px;
      right: 50px;
      cursor: pointer;

      span {
        &:hover {
          transform: rotate(180deg);
          transition: transform 0.5s ease-in;
        }
      }
    }

    .preview-util {
      position: absolute;
      bottom: 50px;
      left: 50%;
      z-index: 5;
      width: 300px;
      transform: translateX(-50%);

      span {
        cursor: pointer;
      }
    }

    .image-control {
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      z-index: 5;
      padding: 0 50px;
      transform: translateY(-50%);
      align-items: center;

      span {
        padding: 8px;
        cursor: pointer;
        border-radius: 50%;

        &:hover {
          background-color: #ffffff79;
        }
      }
    }
  }
}
</style>
