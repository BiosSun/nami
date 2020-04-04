import React from 'react'
import classnames from 'classnames'

import styles from './utils.module.scss'

export function DemoStage({ children, ...otherProps }) {
    return <div {...otherProps}>{children}</div>
}

DemoStage.Area = function Area({
    title,
    name,
    className,
    border,
    padding,
    children,
    ...otherProps
}) {
    return (
        <div
            className={classnames(
                styles.stageArea,
                {
                    [styles.stageAreaBorder]: border,
                    [styles.stageAreaPadding]: padding,
                    [styles.withoutNameOrTitle]: !(title || name),
                },
                className
            )}
            {...otherProps}
        >
            {title ? (
                <span className={styles.stageAreaTitle}>{title}</span>
            ) : name ? (
                <span className={styles.stageAreaName}>{name}</span>
            ) : null}
            {children}
        </div>
    )
}
