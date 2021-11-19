export const propsData = {
  // type:1 单个数字滚动 2: 数字一起滚动 一起停留
  type: {
    type: Number,
    default: 1
  },
  // 自定义数字样式class
  customClass: {
    type: String,
    default: ''
  },
  // 最终停留数字
  value: {
    type: [Number, String],
    default: 0
  },
  // 多数字数字之间的延迟停留
  delay: {
    type: Number,
    default: 2
  },
  // 滚动速度
  speed: {
    type: Number,
    default: 5
  },
  // 多组件同页面不同的key
  key: {
    type: [Number, String],
    default: new Date().getTime()
  },

  /* 类型二props */

  // 类型二时转几轮停下
  round: {
    type: Number,
    default: 1
  },
  // 类型二停下时缓慢步数
  step: {
    type: Number,
    default: 3
  },
  // 分隔符
  separator: {
    type: String,
    default: ''
  },
  // 分隔符样式
  separatorClass: {
    type: String,
    default: ''
  }
}
