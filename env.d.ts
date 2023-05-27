/// <reference types="vite/client" />
/// <reference types="element-plus/global" />

interface Ikun {
  name: string
  age: 18
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
