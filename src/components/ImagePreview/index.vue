<script lang="tsx">
import { defineComponent, reactive, ref, unref, CSSProperties, computed, watchEffect } from 'vue'
import {
  CloseOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  UndoOutlined,
  RedoOutlined,
  ReloadOutlined,
  LeftOutlined,
  RightOutlined,
  EyeOutlined
} from '@ant-design/icons-vue'
import { isString } from '@/utils/is'

interface ImageOptions {
  scale: number
  rotate: number
  show: boolean
  idx: number
  src: string
  isHover: boolean
}
enum DIRECTION {
  LEFT = 'left',
  RIGHT = 'right'
}
/* props */
const props = {
  // 预览图片数组
  list: {
    type: (null as unknown) as PropType<any[] | string>,
    default: () => []
  },
  // 数组中图片src自定义字段名
  srcName: {
    type: String,
    default: ''
  },
  // 点击遮罩层是否关闭预览
  clickMaskClose: {
    type: Boolean,
    default: true
  },

  /* 1.自定义slot时生效 */
  // 自定义slot时控制显隐预览
  show: {
    type: Boolean,
    default: false
  },
  // 当前图片索引
  index: {
    type: Number,
    default: 0
  },

  /* 2.默认时生效 */
  // 图片width
  width: {
    type: [Number, String],
    default: 300
  },
  // 图片height
  height: {
    type: [Number, String],
    default: 200
  },
  // 自定义图片class
  imageClass: {
    type: String,
    default: ''
  },
  // 自定义根class
  rootClass: {
    type: String,
    default: ''
  }
}

export default defineComponent({
  name: 'ImagePreview',
  inheritAttrs: false,
  props,
  emits: ['activeIndex', 'closeModal', 'update:show'],
  setup(props, { emit, slots }) {
    const imageOptions = reactive<ImageOptions>({
      scale: 1,
      rotate: 0,
      show: false,
      idx: props.index,
      src: '',
      isHover: false
    })

    const imageStyle = computed(
      (): CSSProperties => {
        return {
          transform: `scale(${imageOptions.scale}) rotate(${imageOptions.rotate}deg)`
        }
      }
    )

    const imageItemStyle = computed(
      (): CSSProperties => {
        const { width, height } = props
        return {
          width: `${width}px`,
          height: `${height}px`
        }
      }
    )

    const isShow = computed((): boolean => {
      if (imageOptions.show) {
        if (isString(props.list)) return Boolean(props.list)
        return (props.list as []) && (props.list as []).length > 0
      } else return false
    })

    const isSingleImage = computed((): boolean => isString(props.list))
    const isMultiplyImage = computed((): boolean => !isString(props.list) && props.list.length > 1)

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

    const resetImage = (e?: Event) => {
      e && e.stopPropagation()
      imageOptions.scale = 1
      imageOptions.rotate = 0
    }

    const handleClose = () => {
      imageOptions.show = false
      emit('update:show', false)
      emit('closeModal')
    }

    const initPreview = (slot: boolean, idx: number) => {
      resetImage()
      const { srcName, list } = props
      imageOptions.idx = idx
      imageOptions.src = unref(isSingleImage) ? list : srcName ? list[idx][srcName] : list[idx]
      imageOptions.show = slot ? props.show : true
    }

    const handleControl = (e: Event, dir: string) => {
      resetImage()
      e.stopPropagation()
      const { idx } = imageOptions
      const { list, srcName } = props
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
      imageOptions.src = unref(isSingleImage)
        ? list
        : srcName
          ? list[imageOptions.idx][srcName]
          : list[imageOptions.idx]
    }

    const handleClickMask = () => {
      if (props.clickMaskClose) handleClose()
    }

    /* 点击预览 */
    const handlePreview = (e: number) => {
      initPreview(false, e)
    }
    watchEffect(() => {
      if (slots.default && props.show) initPreview(true, props.index)
    })

    /* 关闭 */
    const renderClose = (): JSX.Element => {
      return (
        <div class='image-preview-close'>
          <CloseOutlined title='关闭' style={{ fontSize: '20px', color: '#fff' }} onClick={() => handleClose()} />
        </div>
      )
    }
    /* 预览工具 */
    const renderUtils = (): JSX.Element => {
      const utils = [
        {
          icon: UndoOutlined,
          title: '左转',
          onClick: handleImageRotate,
          args: -90
        },
        {
          icon: RedoOutlined,
          title: '右转',
          onClick: handleImageRotate,
          args: 90
        },
        {
          icon: ZoomInOutlined,
          title: '放大',
          onClick: handleImageScale,
          args: 0.2
        },
        {
          icon: ZoomOutOutlined,
          title: '缩小',
          onClick: handleImageScale,
          args: -0.2
        },
        {
          icon: ReloadOutlined,
          title: '还原',
          onClick: resetImage,
          args: 0
        }
      ]
      return (
        <div class='preview-util justify-space-between'>
          {utils.map(({ icon: SvgIcon, title, onClick, args }) => (
            <SvgIcon class='preview-util-icon' title={title} onClick={(e) => onClick(e, args)} key={title} />
          ))}
        </div>
      )
    }
    /* 左右控制 */
    const renderControl = (): JSX.Element | boolean => {
      return (
        unref(isMultiplyImage) && (
          <div class='image-control'>
            <div class='image-control-left' onClick={(e) => handleControl(e, DIRECTION.LEFT)}>
              <LeftOutlined style={{ fontSize: '20px', color: '#E4E4E4' }} />
            </div>
            <div class='image-control-right' onClick={(e) => handleControl(e, DIRECTION.RIGHT)}>
              <RightOutlined style={{ fontSize: '20px', color: '#E4E4E4' }} />
            </div>
          </div>
        )
      )
    }

    const renderPreview = (): JSX.Element | boolean => {
      return (
        unref(isShow) && (
          <div class='image-modal flex-center' onClick={() => handleClickMask()}>
            <img
              class='image-modal-preview'
              src={imageOptions.src}
              style={unref(imageStyle)}
              onClick={(e) => e.stopPropagation()}
            />
            {renderClose()}
            {renderUtils()}
            {renderControl()}
          </div>
        )
      )
    }
    /* 默认渲染 */
    const renderDefaultImage = (): JSX.Element => {
      const { srcName, imageClass, rootClass, list } = props
      return (
        <>
          {!unref(isSingleImage) ? (
            <div class={['image-preview-box', rootClass]}>
              {(props.list as []).map((v: any, index: number) => (
                <div class={['image-preview-item', imageClass]}>
                  <img
                    key={srcName ? v[srcName] : v}
                    src={srcName ? v[srcName] : v}
                    alt={v['alt']}
                    style={unref(imageItemStyle)}
                  />
                  <EyeOutlined
                    onClick={() => handlePreview(index)}
                    class='image-preview-item-eye'
                    title='预览'
                    style={{ fontSize: '20px', color: '#E6E6E6' }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div class={['image-preview-box', rootClass]}>
              <div class={['image-preview-item', imageClass]}>
                <img src={list as string} style={unref(imageItemStyle)} />
                <EyeOutlined
                  onClick={() => handlePreview(0)}
                  class='image-preview-item-eye'
                  title='预览'
                  style={{ fontSize: '20px', color: '#E6E6E6' }}
                />
              </div>
            </div>
          )}
        </>
      )
    }

    return () => (
      <div class='min-image'>
        {renderPreview()}
        {slots.default ? slots.default() : renderDefaultImage()}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
