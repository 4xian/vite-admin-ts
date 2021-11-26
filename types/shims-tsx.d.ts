import Vue, { VNode } from 'vue'

declare module '*.tsx' {
  import Vue from 'compatible-vue'
  export default Vue
}
