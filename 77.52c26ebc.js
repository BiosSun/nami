(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{660:function(n){n.exports={name:"icon",displayName:"Icon *图标*",group:"general",text:'\nIcon 组件提供一组 SVG 格式的图标。\n\n``` demo.ff9525c8\nimport { Icon } from \'nami\'\n\nfunction IconBox({ name }) {\n    return (\n        <li className="icon-box">\n            <Icon name={name} />\n            <span className="icon-box__name">{name}</span>\n        </li>\n    )\n}\n\nfunction IconBoxList({ children }) {\n    return <ul className="icon-box-list">{children}</ul>\n}\n\nrender(\n    <IconBoxList>\n        <IconBox name="up" />\n        <IconBox name="down" />\n        <IconBox name="left" />\n        <IconBox name="right" />\n        <IconBox name="check" />\n        <IconBox name="github" />\n    </IconBoxList>\n)\n```\n\n## "SVG Icon" vs "Icon Font"\n\nIcon 组件之所以选择提供 SVG 格式的图标，而非通常所使用的 "Icon Font"，\n是因为我们认为「图标应当是一种图形，而非文字」。_（有关详细的区别，请参阅[这篇文章](https://css-tricks.com/icon-fonts-vs-svg/)）_\n\n当然，"Icon Font" 也是有很多优点的，而最要紧的一点是："Icon Font" 的图标颜色默认即为文本颜色，\n为在 SVG 图标中实现这一优点，我们为图标设置了 `fill: currentColor;` 样式，以使图标颜色与其父元素的文本颜色的保持一致。\n\n## 参数\n\n### Icon\n\n| 参数   | 说明     | 类型     | 默认值 |\n| ------ | -------- | -------- | ------ |\n| `name` | 图标名称 | `string` |        |\n',path:"./src/components/icon/index.md",demos:{ff9525c8:{name:"icons"}}}}}]);