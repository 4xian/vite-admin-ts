// 滚动方向
export enum DirectionEnum {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

// 滚动初始化选项
export interface ScrollOptions {
  scrollType?: number
  direction?: DirectionEnum
  speed?: number
  step?: number
  autoPlay?: boolean
  hoverStop?: boolean
  interval?: number
  controls?: boolean
  animateTime?: number
  loop?: boolean
  emptyImg?: string
  emptyText?: string
  emptyWidth?: string
  marginBias?: number
}
