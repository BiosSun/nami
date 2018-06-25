import React, {
    Component,
    createRef,
    ReactNode,
    HTMLAttributes,
    RefObject,
    cloneElement,
    Fragment,
    DOMElement,
    ComponentElement,
    HTMLProps,
} from 'react'
import { createPortal } from 'react-dom'
import Popper from 'popper.js'
import classnames from 'classnames'
import omit from 'object.omit'
import shallowequal from 'shallowequal'
import { warning } from '@utils/log'

import Reference from './reference'
import globalController from './global-controller'

import './styles'

interface BasePopoverProps {
    /**
     * 该弹出层所绑定的目标元素，弹出层将相对该元素对齐
     */
    of:
        | ComponentElement<any, Component>
        | DOMElement<any, Element>
        | ((open: boolean) => ComponentElement<any, Component> | DOMElement<any, Element>)

    /**
     * 弹出层相对于目标元素的位置
     * @default 'bottom'
     */
    at?: Popper.Placement

    /**
     * 弹出层相对于目标元素的偏移长度
     * @default 0
     */
    offset?: number | string

    /**
     * 是否打开弹出层
     */
    open?: boolean

    /**
     * 默认是否打开弹出层
     */
    defaultOpen?: boolean

    /**
     * 弹出层显示触发事件<br>
     * *在组件为受控状态时，该参数无效*
     * @default 'click'
     */
    event?: 'click' | 'hover'

    /**
     * 禁止点击绑定元素时关闭弹出层<br>
     * *在组件为受控状态时，或使用悬停切换时，该参数无效*
     */
    disabledCloseOnOfClick?: boolean

    /**
     * 禁止点击页面其它位置时（弹出层及所绑定元素之外的位置）关闭弹出层
     */
    disabledCloseOnOtherClick?: boolean

    /**
     * 禁止按下 Escape 键时关闭弹出层
     */
    disabledCloseOnEscape?: boolean

    /**
     * 在受控状态下，需要隐藏弹出层时触发的事件
     */
    onClose?: (e: CustomEvent) => void

    /**
     * 是否显示箭头指针
     */
    arrow?: boolean

    /**
     * 弹出层内容
     */
    children?: ReactNode
}

export type PopoverProps = BasePopoverProps & HTMLAttributes<HTMLDivElement>

interface PopoverState {
    /**
     * 组件当前是否处于打开状态
     */
    open: boolean

    /**
     * 弹出层当前相对于目标元素的实际位置
     */
    at: Popper.Placement

    /**
     * 要为弹出层设置的样式
     */
    style: Object

    /**
     * 要为箭头指针设置的样式
     */
    arrowStyle: Object
}

/**
 * @component
 *
 * @displayname 弹出层
 * @group general
 *
 * @description
 *
 *     Popover 提供一个可以相对某个元素进行绝对定位的弹出层组件。
 *
 *     {@demo "./demos/default.jsx"}
 *
 * @example - 定位
 *
 *     Popover 提供两个定位参数：
 *
 *     - at：指定弹出层相对于目标元素的位置；
 *     - offset：指定弹出层相对于目标元素的偏移；
 *
 *     {@demo "./demos/position.jsx"}
 *
 * @example - 箭头指针
 *
 *     通过设置 `arrow` 参数为 `true`，可以让弹出层额外显示一个箭头指针指向目标元素：
 *
 *     {@demo "./demos/arrow.jsx"}
 *
 * @example - 悬停切换
 *
 *     Popover 默认是通过用户点击目标元素来切换弹出层的打开/关闭状态，
 *     但额外的也支持通过鼠标悬停/离开来切换弹出层。
 *
 *     {@demo "./demos/hover.jsx"}
 *
 *     不过应尽量避免使用悬停切换，
 *     因为「点击」才是一种明确的触发行为，而「悬停」更多的是一种试探性的查看行为，
 *     所以通常只用于反馈一些提示性的内容以引导用户进行后续操作。
 *
 * @example - 触发关闭
 *
 *     默认有三种操作会导致弹出层被关闭：
 *
 *     - 点击目标元素中的任意位置；
 *     - 点击页面中除目标元素及弹出层元素之外的任意位置；
 *     - 按下 `Esc` 键；
 *
 *     相应的，可以选择是否禁止让某个操作导致弹出层关闭：
 *
 *     {@demo "./demos/disabled-close.jsx"}
 *
 *     如果用户作出了一些会触发弹出层关闭的操作，弹出层组件会触发 `onClose` 事件回调，该事件没有捕获及冒泡阶段，只会在组件上触发。
 *
 * @example - 渲染目标元素
 *
 *     如果想要在目标元素中根据当前弹出层的打开或关闭状态来呈现不同的样式或内容，那么可以改为为 `of` 参数指定一个渲染函数，
 *     在这个函数中，你能够知道当前弹出层的状态：
 *
 *     {@demo "./demos/render-of.jsx"}
 *
 * @example - 受控组件
 *
 *     但如果你想要在目标元素之外根据弹出层的状态作些改变，或是想要自己控制弹出层的打开或关闭，那么你需要将 Popover 作为受控组件来使用它：
 *
 *     {@demo "./demos/controlled.jsx"}
 *
 *     *注意：在受控状态下，用户点击目标组件时将不会导致弹出层关闭。*
 */
export default class Popover extends Component<PopoverProps, PopoverState> {
    static defaultProps: PopoverProps = {
        of: null,
        at: 'bottom',
        offset: 0,
        event: 'click',
    }

    static propKeys: string[] = [
        'of',
        'at',
        'offset',
        'open',
        'defaultOpen',
        'event',
        'disabledCloseOnEscape',
        'disabledCloseOnOfClick',
        'disabledCloseOnOtherClick',
        'onClose',
        'arrow',
        'children',
    ]

    // 弹出层元素的引用
    private popperRef: RefObject<HTMLDivElement> = createRef()

    // 内部绑定元素
    private referenceElement: Element | null | Text = null

    // 弹出层元素的插入口
    private portal: HTMLDivElement = this.createPortal()

    // popper 实例
    private popper: Popper = null

    // 该组件实例是否处于受控状态
    controlled: boolean = 'open' in this.props
    private didWarnUncontrolledToControlled: boolean = false
    private didWarnControlledToUncontrolled: boolean = false

    // 该组件实例是否已经注册到全局控制器中
    private registeredToGlobalController: boolean = false

    // 使用 `hover` 事件模式时鼠标移入或移出目标元素时用于打开或关闭弹出层时的计时器
    private hoverTimer: number = undefined

    // 指定 state 默认值
    readonly state: PopoverState = {
        open: !!(this.controlled ? this.props.open : this.props.defaultOpen),
        style: null,
        arrowStyle: null,
        at: null,
    }

    constructor(props: PopoverProps, context?: any) {
        super(props, context)

        if ('open' in this.props && 'defaultOpen' in this.props) {
            warning(
                'A component contains a popover with both `open` and `defaultOpen` props.',
                'Popover component must be either controlled or uncontrolled',
                '(specify either the `open` prop, or the `defaultOpen` prop, but not both).',
                'Decide between using a controlled or uncontrolled input element and remove one of these props.'
            )
        }

        if ('open' in this.props && typeof this.props.onClose !== 'function') {
            warning(
                'Failed prop type: You provided a `open` prop to a popover component without an `onClose` handler.',
                'This will render an unable to ' +
                    (this.props.open ? 'close' : 'open') +
                    ' popover.',
                'If the popover component should be uncontroller use `defaultOpen`. Otherwise, set `onClose`.'
            )
        }
    }

    static getDerivedStateFromProps(props: PopoverProps, state: PopoverState): PopoverState {
        if (!props.of) {
            warning('Failed prop type: You shoule provide an `of` prop for popover component.')
        }

        return {
            ...state,
            open: 'open' in props ? props.open : state.open,
        }
    }

    componentDidMount() {
        this.mountPortal()

        if (this.state.open) {
            this.open()
        }
    }

    componentWillUnmount() {
        if (this.registeredToGlobalController) {
            globalController.unregister(this)
            this.registeredToGlobalController = false
        }

        this.destoryPopper()
        this.destoryPortal()
    }

    shouldComponentUpdate(nextProps: PopoverProps, nextState: PopoverState): boolean {
        const { props, state } = this
        const shouldUpdate = !shallowequal(props, nextProps) || !shallowequal(state, nextState)
        return shouldUpdate
    }

    componentDidUpdate() {
        if (
            this.controlled &&
            'defaultOpen' in this.props &&
            !this.didWarnControlledToUncontrolled
        ) {
            warning(
                'A component is changing a controlled popover to be uncontrolled.',
                'Popover component should not switch from controlled to uncontrolled(or vice versa).',
                'Decide between using a controlled or uncontrolled popover component for the lifetime of the component.'
            )

            this.didWarnControlledToUncontrolled = true
        }

        if (!this.controlled && 'open' in this.props && !this.didWarnUncontrolledToControlled) {
            warning(
                'A component is changing a uncontrolled popover to be controlled.',
                'Popover component should not switch from uncontrolled to controlled(or vice versa).',
                'Decide between using a controlled or uncontrolled popover component for the lifetime of the component.'
            )

            this.didWarnUncontrolledToControlled = true
        }

        if (this.state.open) {
            this.open()
        } else {
            this.close()
        }
    }

    render() {
        const { arrow, className, event, style: customStyle, children } = this.props
        const { open, at, style: popperStyle, arrowStyle } = this.state

        const { portal } = this

        const style = {
            ...customStyle,
            ...popperStyle,
        }

        const classes = {
            root: classnames(
                'popover',
                {
                    [`popover--open`]: open,
                    [`popover--has-arrow`]: arrow,
                },
                className
            ),

            inner: classnames('popover__inner'),
            arrow: classnames('popover__arrow'),
        }

        const otherProps = omit(this.props, Popover.propKeys)

        if (!this.controlled && event === 'hover') {
            otherProps.onMouseEnter = this.handlePopperMouseEnter
            otherProps.onMouseLeave = this.handlePopperMouseLeave
        }

        const el = (
            <div
                {...otherProps}
                ref={this.popperRef}
                className={classes.root}
                style={style}
                x-at={at}
            >
                <div className={classes.inner}>{children}</div>
                {arrow && <div className={classes.arrow} style={arrowStyle} x-arrow="true" />}
            </div>
        )

        return (
            <Fragment>
                {this.renderReference()}
                {createPortal(el, portal)}
            </Fragment>
        )
    }

    /**
     * 渲染目标元素
     */
    private renderReference() {
        const { props, state } = this

        const reference = typeof props.of === 'function' ? props.of(state.open) : props.of
        const referenceProps: HTMLProps<Element> = {}

        const originalOnClick: (e: MouseEvent) => void = reference.props.onClick
        const originalOnMouseEnter: (e: MouseEvent) => void = reference.props.onMouseEnter
        const originalOnMouseLeave: (e: MouseEvent) => void = reference.props.onMouseLeave

        if (!this.controlled) {
            switch (this.props.event) {
                case 'click':
                    referenceProps.onClick = fuseHandle(this.handleReferenceClick, originalOnClick)
                    break
                case 'hover':
                    referenceProps.onMouseEnter = fuseHandle(
                        this.handleReferenceMouseEnter,
                        originalOnMouseEnter
                    )
                    referenceProps.onMouseLeave = fuseHandle(
                        this.handleReferenceMouseLeave,
                        originalOnMouseLeave
                    )
                    break
            }
        }

        return (
            <Reference innerElement={element => (this.referenceElement = element)}>
                {cloneElement(reference, referenceProps)}
            </Reference>
        )
    }

    /**
     * 在非受控状态下，处理目标元素上的点击事件
     */
    private handleReferenceClick = (e: MouseEvent): void => {
        if (!this.state.open) {
            this.setState({ open: true })
        } else if (!this.props.disabledCloseOnOfClick) {
            this.triggerClose(e)
        }
    }

    private handleReferenceMouseEnter = (): void => {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = window.setTimeout(() => {
            this.setState({ open: true })
        }, 100)
    }

    private handleReferenceMouseLeave = (e: MouseEvent): void => {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = window.setTimeout(() => {
            this.triggerClose(e)
        }, 100)
    }

    private handlePopperMouseEnter = (): void => {
        clearTimeout(this.hoverTimer)
    }

    private handlePopperMouseLeave = (e: MouseEvent): void => {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = window.setTimeout(() => {
            this.triggerClose(e)
        }, 100)
    }

    /**
     * 处理弹出层打开操作
     */
    private open() {
        const referenceEl = this.getReferenceElement()
        const popperEl = this.getPopperElement()

        const { at, offset } = this.props

        this.createPopper(referenceEl, popperEl, at, offset)
        this.updatePopper()

        if (!this.registeredToGlobalController) {
            globalController.register(this)
            this.registeredToGlobalController = true
        }
    }

    /**
     * 处理弹出层关闭操作
     */
    private close() {
        if (this.registeredToGlobalController) {
            globalController.unregister(this)
            this.registeredToGlobalController = false
        }
    }

    /**
     * 触发关闭弹出层操作（在受控姿态下，将只会触发 onClose 事件）
     * @param sourceEvent 导致触发该弹出层关闭的操作事件
     */
    triggerClose(sourceEvent: Event) {
        const onClose = this.props.onClose
        const event = new CustomEvent('popover.close', {
            bubbles: false,
            cancelable: true,
            detail: { sourceEvent },
        })

        onClose && onClose(event)

        if (!this.controlled && !event.defaultPrevented) {
            this.setState({ open: false })
        }
    }

    /**
     * 获取目标元素
     */
    getReferenceElement(): Element {
        const { referenceElement } = this

        if (referenceElement == null) {
            return null
        } else if (referenceElement instanceof Text) {
            throw new Error(
                'Failed prop type: You shoule provide an vaild `of` prop for popover component.'
            )
        } else {
            return referenceElement
        }
    }

    /**
     * 获取弹出层元素
     */
    getPopperElement(): HTMLDivElement {
        return this.popperRef.current
    }

    private createPortal(): HTMLDivElement {
        this.portal = document.createElement('div')
        this.portal.classList.add('popover-portal')

        return this.portal
    }

    private mountPortal() {
        if (this.portal.parentElement !== document.body) {
            document.body.appendChild(this.portal)
        }
    }

    private unmountPortal() {
        this.portal.remove()
    }

    private destoryPortal() {
        if (this.portal.parentElement) {
            this.unmountPortal()
        }

        this.portal = undefined
    }

    private createPopper(
        reference: Element,
        popper: Element,
        placement: Popper.Placement,
        offset: number | string
    ): Popper {
        offset = typeof offset === 'string' && offset.includes(',') ? offset : '0, ' + offset

        if (
            this.popper &&
            this.popper.options.placement === placement &&
            this.popper.options.modifiers.offset.offset === offset
        ) {
            return this.popper
        } else {
            const options = {
                placement,
                modifiers: {
                    offset: { offset },
                    applyStyle: { enabled: false },
                    applyReactStyle: {
                        enabled: true,
                        fn: this.applyReactStyle,
                        order: 900,
                    },
                },
            }

            this.popper = new Popper(reference, popper, options)

            return this.popper
        }
    }

    private updatePopper() {
        this.popper.scheduleUpdate()
    }

    private destoryPopper() {
        if (this.popper) {
            this.popper.destroy()
        }
    }

    private applyReactStyle = (
        data: Popper.Data & { arrowStyles: CSSStyleDeclaration }
    ): Popper.Data => {
        this.setState(({ style, arrowStyle }) => ({
            style: shallowequal(style, data.styles) ? style : data.styles,
            arrowStyle: shallowequal(arrowStyle, data.arrowStyles) ? arrowStyle : data.arrowStyles,
            at: data.placement,
        }))

        return data
    }
}

function fuseHandle(
    h1: (...args: any[]) => void,
    h2: (...args: any[]) => void
): (...args: any[]) => void {
    return !h2
        ? h1
        : !h1
            ? h2
            : (...args) => {
                  h1(...args)
                  return h2(...args)
              }
}
