import { Ref, shallowReadonly } from 'vue'

/**
 * 用于二次封装组件透传 expose
 */
export default function useRefExpose<T extends object>(
  fields: (keyof T)[]
): [Ref<T>, Readonly<Partial<T>>]
export default function useRefExpose<T extends object, K extends keyof T>(
  fields: K[]
): [Ref<T>, Readonly<Pick<T, K>>]
export default function useRefExpose(fields) {
  const compRef = $ref()
  const res = (fields || []).reduce((obj, name) => {
    if (name) {
      obj[name] = (...args) => {
        if (name in compRef) {
          if (typeof compRef[name] === 'function') {
            return compRef[name](...args)
          } else {
            return compRef[name]
          }
        } else {
          console.error(`method [${name}] not found`)
          return
        }
      }
    }
    return obj
  }, {})
  return [$$(compRef), shallowReadonly(res)]
}
