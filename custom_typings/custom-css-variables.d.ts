import react from 'react'

declare module 'react' {
    interface CSSProperties {
        '--value'?: string
        '--color'?: string
        '--percent'?: string
    }
}
