import { CheckBox, CheckBoxType } from './checkbox'
import { CheckBoxGroup, CheckBoxGroupType } from './checkbox-group'

import './index.scss'

type IndexType = CheckBoxType & {
    Group: CheckBoxGroupType
}

const Index = CheckBox as IndexType
Index.Group = CheckBoxGroup

export { Index as CheckBox }
