const outdent = require('outdent')
const template = require('@babel/template').default

/**
 * 该 babel 插件用于将如下一段 jsx 格式的 react 示例代码：
 *
 *     import { Button } from 'nami'
 *     render(<Button>text</Button>)
 *
 * 转换为如下形式：
 *
 *     import React, { Component } from 'react'
 *     import { Button } from 'nami'
 *
 *     export default function render() {
 *         return <Button>text</Button>
 *     }
 */

const templateOptions = {
    sourceType: 'module',
    plugins: ['jsx'],
}

const buildFunctionComponent = template(
    outdent`
    export default function render() {
        return %%renderContent%%
    }
`,
    templateOptions
)

const funIdent = 'render'

module.exports = function({ types: t }) {
    const programVisitor = {
        Program(path) {
            path.unshiftContainer(
                'body',
                t.importDeclaration(
                    [
                        t.importDefaultSpecifier(t.identifier('React')),
                        t.importSpecifier(t.identifier('Component'), t.identifier('Component')),
                    ],
                    t.stringLiteral('react')
                )
            )

            path.traverse(transformRenderVisitor)
        },
    }

    const transformRenderVisitor = {
        CallExpression(path) {
            const callee = path.get('callee')
            const firstArgument = path.get('arguments.0')
            const renderContent = firstArgument ? firstArgument.node : t.identifier('null')
            const isInGlobal = !path.scope.parent
            const binding = path.scope.getBinding(funIdent)

            if (!t.isIdentifier(callee.node, { name: funIdent })) {
                return
            }

            if (isInGlobal && binding) {
                throw binding.path.buildCodeFrameError(
                    `Please do not define the "render" identifier in the module's global scope.`
                )
            }

            if (!isInGlobal && !binding) {
                throw path.buildCodeFrameError(
                    `Please call "render" function in the module's global scope.`
                )
            }

            if (!isInGlobal) {
                // only in global scope
                return
            }

            callee.getStatementParent().replaceWith(buildFunctionComponent({ renderContent }))
        },
    }

    return { visitor: programVisitor }
}
