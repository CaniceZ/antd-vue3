import { camelize, computed, ComputedRef, getCurrentInstance } from 'vue'
import transform from 'lodash-es/transform'

/**
 * vue 有提供一个 useAttrs 函数，但是不满足我们的需求，具体请看下述
 *
 * 通过 attrs 访问透传属性时，属性名不会自动转成小驼峰，boolean的默认属性不会自动转 true，且没有类型提示和类型保护，例如：
 *
 *  `<y-alert show-icon />` attrs 接收为 `{'show-icon': ''}`
 *
 * 通过调用当前方法 `useAttrs<{showIcon: boolean}>(['showIcon'])` 可以使 attrs 转为 `{showIcon: true}`，并获得类型保护与提示
 *
 * **PS: 当前方法只能在 setup() {} 作用域内的根级调用**
 *
 * @param {string[]} boolFields 指定字段值为 '' 时转 true，🌰 : `useAttrs(['showIcon'])`
 */
export default function useAttrs<T extends object>(
  boolFields?: Array<keyof T>
): ComputedRef<T & { class?: any; style?: any }>
export default function useAttrs<T extends object>(
  boolFields?: Array<keyof T>
): T & { class?: any; style?: any }
export default function useAttrs(boolFields?: any[]) {
  const { proxy } = getCurrentInstance() || {}
  return computed(() =>
    transform(
      proxy?.$attrs as object,
      (res, val, key: string) => {
        const camelizeKey = camelize(key)
        res[camelizeKey] =
          boolFields?.includes(camelizeKey) && val === '' ? true : val
      },
      {}
    )
  )
}
