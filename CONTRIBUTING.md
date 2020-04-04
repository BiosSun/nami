# 开发手册

## NPM Scripts

Nami 中提供如下几个 NPM 的 scripts 命令：

-   `start` 启动开发环境；
-   `storebook` 启动 Storybook；
-   `format` 格式化整个项目中的所有文件；
-   `publish-site` 发布网站；

## 提交信息格式

```
[类型] [范围] - [简介]

[说明|破坏性变更说明]

[关联内容]
```

### [类型]

为便于查阅，所有类型统一使用 [gitmoji](https://gitmoji.carloscuesta.me) 中所列出
的 emoji 图标进行表示，其中常用的有如下几个：

-   ✨ - 新增特性（如组件、功能等）；
-   💄 - 更新组件样式或交互效果；
-   🐛 - 修复 Bug；
-   ♻️ - 代码重构；
-   ⚡️ - 优化性能；
-   ✅ - 添加测试；
-   📝 - 增补、优化或精减文档；
-   🎨 - 改进项目结构/代码格式；
-   🔖 - 发布新的版本；
-   👷 - 构建发布等相关修改；

### [范围]

声明提交内容所涉及的范围，如：

-   某个组件 —— `<component>`；
-   基础工具集 —— `units`；
-   基础样式 —— `styles`；
-   网站 —— `site`；
-   文档 —— `docs`；
-   构建 —— `builds`；
-   或其它内容。

### [简介]

一段对所提交内容的简洁描述，一句话，不超过 50 个字，结尾使用分号。

### [说明]

可选，一份关于所提交内容的更详细的描述，使用 markdown 格式。

**若提交中包含破坏性变更，则必须添加此条目，并以 `[BREAKING CHANGE]` 开头，在其后详细说明
此变更的原因、理由、对用户的影响及更新方法。**

### [关联内容]

与此提交相关的其它内容。