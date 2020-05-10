import React, { FunctionComponent } from 'react'
import { useColor } from './color-picker-base'
import Color from '@biossun/color'
import { VLinear } from '../linear'

export const ColorPickerInnerDebug: FunctionComponent = function(props) {
    const model = useColor(null)

    return (
        <VLinear style={{ fontSize: 12 }}>
            <span>inner value: {Color.format(model.value)}</span>
            <span>inner normalized value: {Color.format(model.normalizedValue)}</span>
            <span>inner format: {model.format}</span>
        </VLinear>
    )
}
