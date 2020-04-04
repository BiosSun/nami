import React, { FunctionComponent } from 'react'
import { LinearProps, Linear } from './linear'

type LinearSugarProps = Omit<LinearProps, 'direction'>

export type HLinearProps = LinearSugarProps
export type VLinearProps = LinearSugarProps
export type HrLinearProps = LinearSugarProps
export type VrLinearProps = LinearSugarProps

export type HLinearType = FunctionComponent<HLinearProps>
export type VLinearType = FunctionComponent<VLinearProps>
export type HrLinearType = FunctionComponent<HrLinearProps>
export type VrLinearType = FunctionComponent<VrLinearProps>

export const HLinear: VLinearType = props => {
    return <Linear {...props} direction="horizontal" />
}

export const VLinear: VLinearType = props => {
    return <Linear {...props} direction="vertical" />
}

export const HrLinear: VLinearType = props => {
    return <Linear {...props} direction="horizontal-reverse" />
}

export const VrLinear: VLinearType = props => {
    return <Linear {...props} direction="vertical-reverse" />
}
