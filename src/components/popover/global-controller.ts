import Popover from './index'

// 使用栈结构存储所有被注册的弹出层组件实例，
// 最后一个栈元素就是最近被注册的（也就是最近被打开的）弹出层元素。
const stack: Popover[] = []

// 当前最近被注册的弹出层元素
let current: Popover = undefined

// 当前是否已开启全局事件监听
let listened: boolean = false

/**
 * 开启全局事件监听
 */
function startListen() {
    listened = true
    document.addEventListener('keyup', handleKeyUp, true)
    document.addEventListener('click', handleClick, true)
}

/**
 * 结束全局事件监听
 */
function endListen() {
    listened = false
    document.removeEventListener('keyup', handleKeyUp, true)
    document.removeEventListener('click', handleClick, true)
}

/**
 * 处理全局键盘事件
 */
function handleKeyUp(e: KeyboardEvent) {
    if (!isEscapeKey(e)) {
        return
    }

    if (current.props.disabledCloseOnEscape) {
        return
    }

    current.triggerClose(e)
}

/**
 * 处理全局点击事件
 */
function handleClick(e: MouseEvent) {
    if (isTriggerInPopper(e, current) || isTriggerInReference(e, current)) {
        return
    }

    if (current.props.disabledCloseOnOtherClick) {
        return
    }

    current.triggerClose(e)
}

/**
 * 判断是否是 Escape 揵的按下事件
 */
function isEscapeKey(e: KeyboardEvent): boolean {
    return e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 0x1b
}

/**
 * 判断所传入的事件是否是在某个弹出层的弹出元素中触发的
 */
function isTriggerInPopper(e: Event, popover: Popover): boolean {
    return isTriggerInAnElement(e, popover.getPopperElement())
}

/**
 * 判断所传入的事件是否是在某个弹出层所绑定的目标元素上触发的
 */
function isTriggerInReference(e: Event, popover: Popover): boolean {
    return isTriggerInAnElement(e, popover.getReferenceElement())
}

/**
 * 判断所传入的事件是否是在某个元素内触发的
 */
function isTriggerInAnElement(e: Event, parent: Element): boolean {
    if (!(e.target instanceof Node)) {
        return false
    }

    return parent.contains(e.target)
}

export default {
    /**
     * 当一个弹出层打开时，将其注册到全局控制器中
     */
    register(popover: Popover) {
        stack.push(popover)
        current = popover

        if (!listened) {
            startListen()
        }
    },

    /**
     * 当一个弹出层关闭时，将其从全局控制器中注销
     */
    unregister(popover: Popover) {
        const index = stack.lastIndexOf(popover)

        if (index === -1) {
            return
        }

        stack.splice(index, 1)

        if (current === popover) {
            current = stack[stack.length - 1]
        }

        if (stack.length === 0 && listened) {
            endListen()
        }
    },
}
