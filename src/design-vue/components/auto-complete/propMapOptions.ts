import { AutoCompleteProps as AAutoCompleteProps } from 'ant-design-vue'
import { isBasicType } from '../../_utils/common'
import { PropMapType } from '../../_utils/select-utils'
import { OptionsType } from './types'

export default function propMapOptions(
  options: OptionsType,
  propMap: PropMapType
): AAutoCompleteProps['options'] {
  return (
    options?.map(row => {
      const option = {
        value: isBasicType(row) ? row : row[propMap.value!],
        item: row
      }
      if (typeof row === 'object' && row[propMap.options!]) {
        option['options'] = row[propMap.options!]
      }
      return option
    }) || []
  )
}
