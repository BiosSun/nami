---
name: color
displayName: ColorPicker *颜色选择器*
group: general
---

颜色选择器及其相关子组件。

### ColorPicker

ColorPicker 参考自 Sketch 的颜色选择器进行制作，如果你对颜色选择器没有额外的特殊需求，那么通常直接使用它即可：

{@demo "./demos/color-picker.jsx"}

相应的，如果 ColorPicker 不是你想要的，那么你可以使用下面将要讲到的子组件及 Hooks 自行拼装或制做你自己的颜色选择器。

### ColorSaturationAndValueSlider

对比度/亮度选择器，具有固定的宽高比：

{@demo "./demos/color-saturation-and-value-slider.jsx"}

### ColorHueSlider

色调选择器：

{@demo "./demos/color-hue-slider.jsx"}

### ColorAlphaSlider

透明度选择器：

{@demo "./demos/color-alpha-slider.jsx"}

### ColorScreen

颜色展示器：

{@demo "./demos/color-screen.jsx"}

### ColorHexTextBox

十六进制颜色文本框：

{@demo "./demos/color-hex-text-box.jsx"}

### ColorAlphaTextBox

透明度文本框：

{@demo "./demos/color-alpha-text-box.jsx"}

### ColorChannelsTextBox

颜色通道文本框：

{@demo "./demos/color-channels-text-box.jsx"}

### useColor

该 hooks 封装了所有颜色组件相关的处理逻辑，如果你需要自己创建颜色组件，那应该使用它（并结合 [@biossun/color](https://github.com/BiosSun/color) 模块）：

{@demo "./demos/use-color.jsx"}

### ColorPickerBase

颜色选择器的基础包装组件，你应当使用它来拼装以上所列出的颜色子组件或你自定义的颜色子组件：

{@demo "./demos/color-picker-base.jsx"}

## 参数

-   几乎所有组件都支持 `value`、`defaultValue` 及 `onChange` 三个属性；
-   所接收和返回的颜色值都是字符串类型；
-   支持的颜色字符串格式有如下几种：
    -   hex: `#fff`, `#ffff`, `#ffffff`, `#ffffffff`;
    -   rgb: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 1)`;
    -   hsl: `hsl(0, 0%, 100%)`, `hsla(0, 0%, 100%)`;
    -   hsv/hsb: `hsv(0, 0%, 100%)`, `hsba(0, 0%, 100%)`;

### ColorPicker

| 参数         | 说明                       | 类型                      | 默认值 |
| ------------ | -------------------------- | ------------------------- | ------ |
| value        | 颜色值                     | `string`                  |        |
| defaultValue | 默认颜色值                 | `string`                  |        |
| onChange     | 颜色值改变事件             | `(value: string) => void` |        |
| children     | 追加在面板正文的自定义内容 | `ReactNode`               |        |

### ColorSaturationAndValueSlider

| 参数         | 说明           | 类型                      | 默认值 |
| ------------ | -------------- | ------------------------- | ------ |
| value        | 颜色值         | `string`                  |        |
| defaultValue | 默认颜色值     | `string`                  |        |
| onChange     | 颜色值改变事件 | `(value: string) => void` |        |

### ColorHueSlider

| 参数         | 说明           | 类型                      | 默认值 |
| ------------ | -------------- | ------------------------- | ------ |
| value        | 颜色值         | `string`                  |        |
| defaultValue | 默认颜色值     | `string`                  |        |
| onChange     | 颜色值改变事件 | `(value: string) => void` |        |

### ColorScreen

| 参数  | 说明   | 类型     | 默认值 |
| ----- | ------ | -------- | ------ |
| value | 颜色值 | `string` |        |

### ColorHexTextBox

| 参数         | 说明           | 类型                      | 默认值 |
| ------------ | -------------- | ------------------------- | ------ |
| value        | 颜色值         | `string`                  |        |
| defaultValue | 默认颜色值     | `string`                  |        |
| onChange     | 颜色值改变事件 | `(value: string) => void` |        |

### ColorAlphaTextBox

| 参数         | 说明           | 类型                      | 默认值 |
| ------------ | -------------- | ------------------------- | ------ |
| value        | 颜色值         | `string`                  |        |
| defaultValue | 默认颜色值     | `string`                  |        |
| onChange     | 颜色值改变事件 | `(value: string) => void` |        |

### ColorChannelsTextBox

| 参数         | 说明           | 类型                      | 默认值 |
| ------------ | -------------- | ------------------------- | ------ |
| value        | 颜色值         | `string`                  |        |
| defaultValue | 默认颜色值     | `string`                  |        |
| onChange     | 颜色值改变事件 | `(value: string) => void` |        |

### useColor

| 参数         | 说明           | 类型                      | 默认值 |
| ------------ | -------------- | ------------------------- | ------ |
| value        | 颜色值         | `string`                  |        |
| defaultValue | 默认颜色值     | `string`                  |        |
| onChange     | 颜色值改变事件 | `(value: string) => void` |        |

### ColorPickerBase

| 参数         | 说明           | 类型                      | 默认值 |
| ------------ | -------------- | ------------------------- | ------ |
| value        | 颜色值         | `string`                  |        |
| defaultValue | 默认颜色值     | `string`                  |        |
| onChange     | 颜色值改变事件 | `(value: string) => void` |        |
