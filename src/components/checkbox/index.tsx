import { CheckBox, CheckBoxComponent as InnerCheckBoxComponent } from './checkbox'
import { CheckBoxGroup, CheckBoxGroupComponent } from './checkbox-group'

import './index.scss'

type CheckBoxComponent = InnerCheckBoxComponent & {
    Group: CheckBoxGroupComponent
}

const ExportCheckBox = CheckBox as CheckBoxComponent
ExportCheckBox.Group = CheckBoxGroup

export { ExportCheckBox as CheckBox }
