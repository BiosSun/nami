---
name: about
displayName: 关于 Nami
---

> **警告：**
>
> -   该项目仍处于早期开发阶段，因此仍缺失一些关键组件及功能，且其更新策略较为激进，会有大量破坏性更新；
> -   使用 CSS 变量等较新特性，浏览器兼容性较差；
> -   只兼容 React 16 及以上版本；

Nami 是一个基于 React 开发的桌面端组件库；源于作者对前端技术和交互设计的学习与探索，以及个人使用上的需要。

## 兼容性

-   `Chrome` 49+
-   `Firefox` 42+
-   `Safari` 9.1
-   `Opera` 36+
-   `Edge` 16+
-   `IE` _no support_

## 安装

目前 Nami 只提供了一份 UMD 格式的打包文件：

```bash
$ yarn add @biossun/nami
```

```jsx
// import nami styles
import '@biossun/nami/dist/index.css'

// import components
import { Button } from '@biossun/nami'

// use it!
render(<Button>text</Button>)
```

_支持树抖动且加载方式更加友好的 ES6 Modules 格式的发布构建将按计划在 0.4.0 版本发布。_
