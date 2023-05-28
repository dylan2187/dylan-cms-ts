/// <reference types="vite/client" />
/// <reference types="element-plus/global" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
  interface IModalConfig {}
  export { IModalConfig }
}

declare module '*.mjs'
