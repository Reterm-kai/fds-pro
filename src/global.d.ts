// CSS Modules 类型声明
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// 普通 CSS 文件（全局样式）
declare module '*.css' {
  const content: Record<string, never>
  export default content
}

declare module '*.scss' {
  const content: Record<string, never>
  export default content
}

declare module '*.sass' {
  const content: Record<string, never>
  export default content
}

declare module '*.less' {
  const content: Record<string, never>
  export default content
}

// 图片和资源文件
declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.ico' {
  const content: string
  export default content
}

declare module '*.bmp' {
  const content: string
  export default content
}
