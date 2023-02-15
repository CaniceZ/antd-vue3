import { SelectProps as ASelectProps } from 'ant-design-vue'
import { isBasicType } from '../../_utils/common'
import { PropMapType } from '../../_utils/select-utils'
import { OptionsType } from './type'

export default function propMapOptions(
  options: OptionsType,
  propMap: PropMapType
): ASelectProps['options']
export default function propMapOptions(options: any[], propMap: PropMapType) {
  return options?.map(row => {
    const option = {
      label: isBasicType(row) ? row : row[propMap.label!],
      value: isBasicType(row) ? row : row[propMap.value!],
      item: row
    }
    if (typeof row === 'object') {
      const fields = ['disabled', 'title', 'key']
      fields.forEach(field => {
        if (field in row) {
          option[field] = row[field]
        }
      })
    }
    return option
  })
}
