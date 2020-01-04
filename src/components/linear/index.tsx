import { Linear, LinearType } from './linear'
import { LinearItem, LinearItemType } from './linear-item'

import './index.scss'

type IndexType = LinearType & {
    Item: LinearItemType
}

const Index = Linear as IndexType
Index.Item = LinearItem

export { Index as Linear }
