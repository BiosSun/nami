import React from 'react'

export interface Component extends React.Component {
    didWarnControlledToUncontrolled?: boolean
    didWarnUncontrolledToControlled?: boolean
}

/**
 * 打印一条警告信息
 */
function warning(...str: string[]): void {
    if (typeof console !== 'undefined') {
        console.error(...str)
    }
}

namespace warning {
    /**
     * 打印一条关于组件受控状态冲突的警告信息
     * @param component - 组件名称
     * @param prop - 用于切换控制状态的属性名称
     */
    export function conflictOfControl(component: string, prop: string): void {
        warning(
            `A component contains a ${component} with both \`${prop}\``,
            `and \`default${capitalize(prop)}\` props.`,
            `${capitalize(component)} component must be either controlled`,
            `or uncontrolled (specify either the \`${prop}\` prop,`,
            `or the \`default${capitalize(prop)}\` prop, but not both).`,
            `Decide between using a controlled or uncontrolled ${component}`,
            `component and remove one of these props.`
        )
    }

    /**
     * 打印一条关于没有给受控组件指定一个监听受控属性改变的回调函数的警告信息
     * @param component - 组件名称
     * @param prop - 用于切换控制状态的属性名称
     * @param event - 用于监听受控属性的事件名称
     * @param unableTo - 描述没有提供 `event` 的后果
     */
    export function disappearedListenerInControlled(
        component: string,
        prop: string,
        event: string,
        unableTo: string
    ): void {
        warning(
            `Failed prop type: You provided a \`${prop}\` prop to`,
            `a ${component} component without an \`${event}\` handler.`,
            `This will render an unable to ${unableTo}.` +
                `If the ${component} component should be uncontroller`,
            `use \`default${capitalize(prop)}\`. Otherwise, set \`${event}\`.`
        )
    }

    /**
     * 打印一条从受控组件切换到非受控组件的警告信息
     * @param component - 组件名称
     * @param element - 打印该警告的组件元素，用于确保在该元素的整个生命周期内该警告只会打印一次
     */
    export function controlledToUncontrolled(component: string, element: Component): void {
        if (!element.didWarnControlledToUncontrolled) {
            warning(
                `A component is changing a controlled ${component} to be uncontrolled.`,
                `${capitalize(component)} component should not switch from controlled`,
                `to uncontrolled(or vice versa). Decide between using a controlled`,
                `or uncontrolled ${component} component for the lifetime of the component.`
            )

            element.didWarnControlledToUncontrolled = true
        }
    }

    /**
     * 打印一条从非受控组件切换到受控组件的警告信息
     * @param component - 组件名称
     * @param element - 打印该警告的组件元素，用于确保在该元素的整个生命周期内该警告只会打印一次
     */
    export function uncontrolledToControlled(component: string, element: Component): void {
        if (!element.didWarnUncontrolledToControlled) {
            warning(
                `A component is changing a uncontrolled ${component} to be controlled.`,
                `${capitalize(component)} component should not switch from uncontrolled`,
                `to controlled(or vice versa). Decide between using a controlled`,
                `or uncontrolled ${component} component for the lifetime of the component.`
            )

            element.didWarnUncontrolledToControlled = true
        }
    }
}

export { warning }

function capitalize(word: string): string {
    return word[0].toUpperCase() + word.slice(1)
}
