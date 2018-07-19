import { createContext } from 'react'
import { DocsIndexInfo } from '@site/utils/docs-index-info.interface'

export const DocsIndexContext = createContext<DocsIndexInfo>(undefined)
