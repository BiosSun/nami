import React, {
    Component,
    createRef,
    ReactNode,
    HTMLAttributes,
    RefObject,
    cloneElement,
    Fragment,
    HTMLProps,
    ReactElement,
    CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'
import Popper from 'popper.js'
import clsx from 'clsx'
import omit from 'object.omit'
import shallowequal from 'shallowequal'
import Reference from './reference'
import globalController from './global-controller'

import './index.scss'

export interface BasePopoverProps {
    /**
     * 该弹出层所绑定的目标元素，弹出层将相对该元素对齐
     */
    of: ReactElement<any> | ((props: { open: boolean }) => ReactElement<any>)

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
     * 是否将弹出层的宽度限定为目标元素宽度
     * @default false
     */
    widthFollowOf?: boolean

    /**
     * 是否将弹出层的最小宽度限定为目标元素宽度
     * @default false
     */
    minWidthFollowOf?: boolean

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

export interface PopoverState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

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
    style: CSSProperties

    /**
     * 要为箭头指针设置的样式
     */
    arrowStyle: CSSProperties
}

export default class Popover extends Component<PopoverProps, PopoverState> {
    static defaultProps: PopoverProps = {
        of: null,
        at: 'bottom',
        offset: 0,
        event: 'click',
        widthFollowOf: false,
        minWidthFollowOf: false,
    }

    static propKeys: string[] = [
        'of',
        'at',
        'offset',
        'widthFollowOf',
        'minWidthFollowOf',
        'open',
        'defaultOpen',
        'event',
        'disabledCloseOnOfClick',
        'disabledCloseOnOtherClick',
        'disabledCloseOnEscape',
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

    // 该组件实例是否已经注册到全局控制器中
    private registeredToGlobalController: boolean = false

    // 使用 `hover` 事件模式时鼠标移入或移出目标元素时用于打开或关闭弹出层时的计时器
    private hoverTimer: number = undefined

    // 指定 state 默认值
    readonly state: PopoverState = {
        controlled: this.controlled,
        open: !!(this.controlled ? this.props.open : this.props.defaultOpen),
        style: null,
        arrowStyle: null,
        at: null,
    }

    static getDerivedStateFromProps(props: PopoverProps, state: PopoverState): PopoverState {
        return {
            ...state,
            open: state.controlled ? !!props.open : state.open,
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
            root: clsx(
                'nami-popover',
                {
                    [`nami-popover--open`]: open,
                    [`nami-popover--has-arrow`]: arrow,
                },
                className
            ),

            inner: clsx('nami-popover__inner'),
            arrow: clsx('nami-popover__arrow'),
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

        const reference = typeof props.of === 'function' ? props.of({ open: state.open }) : props.of
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

        const { at, offset, widthFollowOf, minWidthFollowOf } = this.props

        this.createPopper(referenceEl, popperEl, at, offset, widthFollowOf, minWidthFollowOf)
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
        this.portal.classList.add('nami-popover-portal')

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
        offset: number | string,
        widthFollowOf: boolean,
        minWidthFollowOf: boolean
    ): Popper {
        offset = typeof offset === 'string' && offset.includes(',') ? offset : '0, ' + offset

        if (
            this.popper &&
            this.popper.options.placement === placement &&
            this.popper.options.modifiers.offset.offset === offset &&
            this.popper.options.modifiers.widthFollowOf.enabled === widthFollowOf &&
            this.popper.options.modifiers.minWidthFollowOf.enabled === minWidthFollowOf
        ) {
            return this.popper
        } else {
            this.destoryPopper()

            const options = {
                placement,
                modifiers: {
                    widthFollowOf: {
                        order: 1,
                        enabled: widthFollowOf,
                        fn: this.widthFollowOfModifier,
                    },
                    minWidthFollowOf: {
                        order: 2,
                        enabled: minWidthFollowOf,
                        fn: this.minWidthFollowOfModifier,
                    },
                    offset: { offset },
                    applyStyle: { enabled: false },
                    applyReactStyle: {
                        order: 900,
                        enabled: true,
                        fn: this.applyReactStyleModifier,
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

        this.popper = undefined
    }

    /**
     * 一个 Popper.js 的 ModifierFn，
     * 用于将最终的弹出层样式添加到 Popover 组件中。
     */
    private applyReactStyleModifier = (data: Popper.Data): Popper.Data => {
        this.setState(({ style, arrowStyle }) => ({
            style: (shallowequal(style, data.styles) ? style : data.styles) as CSSProperties,
            arrowStyle: (shallowequal(arrowStyle, data.arrowStyles)
                ? arrowStyle
                : data.arrowStyles) as CSSProperties,
            at: data.placement,
        }))

        return data
    }

    /**
     * 一个 Popper.js 的 ModifierFn，
     * 用于限定 'popper' 的宽度为 'reference' 的宽度。
     */
    private widthFollowOfModifier = (data: Popper.Data): Popper.Data => {
        data.offsets.popper.width = data.offsets.reference.width
        data.styles.width = data.offsets.reference.width + 'px'
        return data
    }

    /**
     * 一个 Popper.js 的 ModifierFn，
     * 用于限定 'popper' 的最小宽度为 'reference' 的宽度。
     */
    private minWidthFollowOfModifier = (data: Popper.Data): Popper.Data => {
        const { popper, reference } = data.offsets

        if (popper.width < reference.width) {
            popper.width = reference.width
        }

        data.styles.minWidth = reference.width + 'px'

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
