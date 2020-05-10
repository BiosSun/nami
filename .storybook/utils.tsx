import React, { ReactNode } from 'react'
import clsx from 'clsx'

import styles from './utils.module.scss'
import { LinearItemProps } from 'nami'

interface DemoStageProps {
    children: React.ReactNode
}

export const DemoStage = ({ children, ...otherProps }: DemoStageProps) => {
    return <div {...otherProps}>{children}</div>
}

type AreaProps = LinearItemProps & {
    title?: string
    name?: string
    className?: string
    border?: boolean
    padding?: boolean
    children: ReactNode
}

DemoStage.Area = function Area({
    title,
    name,
    className,
    border,
    padding,
    children,
    ...otherProps
}: AreaProps) {
    return (
        <div
            className={clsx(
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
