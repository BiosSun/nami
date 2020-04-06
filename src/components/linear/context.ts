import { createContext } from 'react'

export interface LinearContextType {
    direction: 'horizontal' | 'vertical'
    isReverse: boolean
}

const defaultContextValue: LinearContextType = {
    direction: 'horizontal',
    isReverse: false,
}

export const LinearContext = createContext<LinearContextType>(defaultContextValue)
