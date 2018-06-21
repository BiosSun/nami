import React, {
    Component,
    createRef,
    ReactNode,
    HTMLAttributes,
    ReactInstance,
    RefObject,
} from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import Popper from 'popper.js'
import classnames from 'classnames'
import shallowequal from 'shallowequal'
import isRefObject from '@utils/is-ref-object'

import './styles'

interface BasePopupProps {
    /**
     * 该弹出层所绑定的目标元素，弹出层将相对该元素对齐
     */
    of: RefObject<ReactInstance> | ReactInstance

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
     * 是否显示弹出层
     * @default false
     */
    show?: boolean

    /**
     * 是否显示箭头指针
     * @default false
     */
    arrow?: boolean

    /**
     * 弹出层内容
     */
    children?: ReactNode
}

export type PopupProps = BasePopupProps & HTMLAttributes<HTMLDivElement>

interface PopupState {
    /**
     * 该弹出层所绑定的 DOM 结点
     */
    ofEl: Element

    /**
     * 要为弹出层设置的样式
     */
    style: Object

    /**
     * 要为箭头指针设置的样式
     */
    arrowStyle: Object

    /**
     * 弹出层当前相对于目标元素的实际位置
     */
    at: Popper.Placement
}

/**
 * @component
 *
 * @displayname 弹出层
 * @group basic
 *
 * @description
 *
 *     用于打开一个弹出层，并相对于某个组件元素进行绝对定位。
 *
 *     {@demo "./demos/default.jsx"}
 *
 *     **NOTE:** *一般你不需要直接使用 Popup 组件，而是应该将其封装为其它功能组件或业务组件。*
 *
 * @example - 定位
 *
 *     Popup 提供两个定位参数：
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
 */
export default class Popup extends Component<PopupProps, PopupState> {
    static defaultProps: PopupProps = {
        of: null,
        at: 'bottom',
        offset: 0,
    }

    portal: HTMLDivElement = document.createElement('div')

    readonly state: Readonly<PopupState> = {
        ofEl: null,
        style: null,
        arrowStyle: null,
        at: null,
    }

    popper: Popper = null

    elRef: RefObject<HTMLDivElement> = createRef()

    static getDerivedStateFromProps(props: PopupProps, state: PopupState) {
        return {
            ...state,
            ofEl: getOfElement(props.of),
        }
    }

    componentDidMount() {
        this.portal.classList.add('popup-portal')
        document.body.appendChild(this.portal)

        // NOTE: 通过触发强制刷新的方式拿到 of 引用。
        if (isRefObject(this.props.of)) {
            this.forceUpdate()
        }
    }

    componentWillUnmount() {
        this.popper && this.popper.destroy()
        document.body.removeChild(this.portal)
    }

    shouldComponentUpdate(nextProps: PopupProps, nextState: PopupState): boolean {
        const { props, state } = this

        const shouldUpdate =
            !shallowequal(props, nextProps) ||
            (!shallowequal(state, nextState) &&
                (!shallowequal(state.style, nextState.style) ||
                    !shallowequal(state.arrowStyle, nextState.arrowStyle)))

        return shouldUpdate
    }

    componentDidUpdate(prevProps: PopupProps) {
        const referenceEl = this.state.ofEl
        const popperEl = this.elRef.current

        if (!this.state.ofEl || !this.elRef.current) {
            return
        }

        let { at, offset, show } = this.props
        const { at: prevAt, offset: prevOffset } = prevProps

        if (!show) {
            return
        }

        if (!this.popper || at !== prevAt || offset !== prevOffset) {
            offset = typeof offset === 'string' && offset.includes(',') ? offset : '0, ' + offset

            const options = {
                placement: at,
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

            this.popper = new Popper(referenceEl, popperEl, options)
        }

        this.popper.scheduleUpdate()
    }

    render() {
        const {
            of,
            at: originalAt,
            offset: originalOffset,
            show,
            arrow,
            children,
            className,
            style: customStyle,
            ...otherProps
        } = this.props

        const { style: popperStyle, arrowStyle, at } = this.state

        const { portal } = this

        const style = {
            ...customStyle,
            ...popperStyle,
        }

        const classes = {
            root: classnames(
                'popup',
                {
                    [`popup--show`]: show,
                    [`popup--has-arrow`]: arrow,
                },
                className
            ),

            inner: classnames('popup__inner'),
            arrow: classnames('popup__arrow'),
        }

        const el = (
            <div {...otherProps} ref={this.elRef} className={classes.root} style={style} x-at={at}>
                <div className={classes.inner}>{children}</div>
                {arrow && <div className={classes.arrow} style={arrowStyle} x-arrow="true" />}
            </div>
        )

        return createPortal(el, portal)
    }

    applyReactStyle = (data: Popper.Data & { arrowStyles: CSSStyleDeclaration }): Popper.Data => {
        this.setState(() => ({
            style: data.styles,
            arrowStyle: data.arrowStyles,
            at: data.placement,
        }))

        return data
    }
}

/**
 * 从传入的 of 参数中获取 DOM 元素
 */
function getOfElement(of: RefObject<ReactInstance> | ReactInstance): Element {
    let element = findDOMNode(isRefObject<ReactInstance>(of) ? of.current : of)

    return element && element instanceof Element ? element : null
}
