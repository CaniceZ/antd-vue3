import kebabCase from 'lodash-es/kebabCase'
import upperFirst from 'lodash-es/upperFirst'
import { camelize, Ref, shallowReadonly } from 'vue'
import { KebabCase, UpperCamelCase } from '../types/ts-helpers'

export function isEmpty(value) {
  return (
    value === void 0 ||
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'string' && value.trim() === '')
  )
}

export function getComponent(type: string, hasOptions: boolean) {
  let result = type
  if (!type || ['number', 'password', 'search', 'textarea'].includes(type)) {
    result = 'input'
  } else if (['select', 'multipleselect'].includes(type)) {
    result = 'select'
  } else if (
    [
      'date',
      'daterange',
      'datetime',
      'datetimerange',
      'datetimerange2',
      'week',
      'weekrange',
      'month',
      'monthrange',
      'year',
      'yearrange',
      'quarter',
      'quarterrange'
    ].includes(type)
  ) {
    result = 'date'
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time'
  } else if (type === 'checkbox' && hasOptions) {
    result = 'checkbox-group'
  } else if (type === 'radio' && hasOptions) {
    result = 'radio-group'
  } else if (type === 'autocomplete') {
    result = 'auto-complete'
  }
  return `y-${result}`
}

export function filterSlots(prefix, slots, getKey?) {
  return Object.keys(slots).reduce((newSlots, slotName) => {
    const reg = new RegExp(`^${prefix}(.*?)$`)
    const [, matchName] = slotName.match(reg) || []
    if (matchName) {
      return {
        ...newSlots,
        [getKey ? getKey(slotName, matchName) : matchName]: slots[slotName]
      }
    }
    return newSlots
  }, {})
}

type getExposeReturnType<T extends string> = {
  [key in T]?: (...args: any) => void
}

export function getExpose<T extends string = string>(
  compRef: Ref<any>,
  methods: T[] = []
): Readonly<getExposeReturnType<T>> {
  if (!Array.isArray(methods)) {
    console.error('function getExpose [methods] should be string[]')
  }
  const res = methods.reduce<getExposeReturnType<T>>((obj, name) => {
    if (name) {
      obj[name] = (...args) =>
        compRef.value[name] && compRef.value[name](...args)
    }
    return obj
  }, {})
  return shallowReadonly(res)
}

// 由于 attrs 传递的指令式属性会默认为空字符串，所以增加这个方法用来判断 attr 是否为 true
export function isAttrTrue(attr) {
  return attr === '' || Boolean(attr)
}

// 由于 attrs 传递的指令式属性会默认为空字符串，所以增加这个方法用来转换 attr
export function parseAttr(attr, initialValue?): boolean | any {
  if (attr === '' || attr === true) {
    return true
  } else if (attr === void 0 && initialValue !== void 0) {
    return initialValue
  } else {
    return attr
  }
}

export function isBasicType(val) {
  return (
    typeof val === 'number' ||
    typeof val === 'string' ||
    typeof val === 'boolean'
  )
}

const hexList: string[] = []
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}

export function buildUUID(): string {
  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid.replace(/-/g, '')
}

let unique = 0
export function buildShortUUID(prefix = ''): string {
  const time = Date.now()
  const random = Math.floor(Math.random() * 1000000000)
  unique++
  return prefix + '_' + random + unique + String(time)
}

/**
 * 根据组件名称生成具有前缀的组件名称和具有前缀的基础类样式，例如
 *
 * ```ts
 * getPrefix('alert'); // ['YAlert', 'ygp-alert', 'ygp']
 * getPrefix('search-table'); // ['YSearchTable', 'ygp-search-table', 'ygp']
 * getPrefix('searchTable'); // ['YSearchTable', 'ygp-search-table', 'ygp']
 * ```
 * @param {string} name 组件名称
 */
export function getPrefix<T extends string>(name: T) {
  const compName = upperFirst(camelize(name))

  return [`Y${compName}`, `ygp-${kebabCase(name)}`, 'ygp'] as [
    UpperCamelCase<`y-${KebabCase<T>}`>,
    `ygp-${KebabCase<T>}`,
    'ygp'
  ]
}

export function suffixUnit(val: string | number, unit = 'px') {
  if (!val) {
    return ''
  }
  if (isNaN(Number(val))) {
    return val
  }
  if (typeof val === 'number' || typeof Number(val) === 'number') {
    return `${val}${unit}`
  }
  return val
}
