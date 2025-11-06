/// <reference types="vite/client" />

// CSS Modules 类型声明
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// SVG 图片
declare module '*.svg' {
  const content: string
  export default content
}
