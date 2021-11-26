import { PropType as VuePropType, ComponentRenderProxy, VNode, DefineComponent } from 'vue'
declare global {
  declare type PropType<T> = VuePropType<T>
  declare type VueNode = VNodeChild | JSX.Element
  declare type Nullable<T> = T | null
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
    /* interface Element extends VNode {}
    interface ElementClass extends Vue {} */
  }
}
