# Nami

Nami 是一个基于 React 开发的组件库，兼容移动端及桌面端，它源于作者对前端技术和交互设计的学习与探索，以及个人使用上的需要。

## 兼容性

-   仅兼容 React 16.12 及以上版本；
-   仅兼容两年内的浏览器版本（IE 等两年内未更新的浏览器将不再支持）。
-   需安装 [PEP](https://github.com/jquery/PEP) 以支持 PointerEvents；

> **警告：**
>
> 目前仍在开发阶段，而且在很长一段时间内，该组件库都将是一个  供个人使用的、不稳定的及实验性质的组件库。
> 该项目目前没有单元测试，更新策略也较为激进，而且仍缺少一些关键的组件及功能，因此并不建议在正式项目中使用。

## 安装/使用

```bash
# install it,
$ yarn add @biossun/nami
```

```jsx
// import it,
import { Button } from '@biossun/nami'

// use it!
render(<Button>text</Button>)
```

目前 Nami 提供了两份发布版本：esm（ES Modules） 及 cmd（CommonJS2）。

通常我们建议使用 esm 版本，这可以让你利用树抖动等特性来避免引入实际并未用到的组件的代码。
如果你使用 webpack 等支持 `package.json` 中 `module` 配置的打包工具，那么你的打包工具会自动选择使用该版本。

> **注意：**
>
> 我们在 esm 中提供的是 ES2020 版本的 js 代码，以及使用 sass 编写的样式源代码。
>
> 因此你需要使用 babel 将 nami 中的 js 代码编译为你所需要的目标版本，并确保你的打包工具支持处理 `.scss` 文件。

如果你的打包工具只支持 cmd 版本的构建，那么你需要额外引入该组件库的样式文件：

```jsx
import '@biossun/nami/dist/index.css'
```
