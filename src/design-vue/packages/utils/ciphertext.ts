import get from 'lodash-es/get'

type Options = {
  sign: '*' | string
  suffix: '_encrypt' | string
}

const defaultOptions: Options = {
  sign: '*',
  suffix: '_encrypt'
}

/**
 * 获取密文的密钥字段名
 * @param name
 * @param opts
 * @returns
 */
export function getCiphertextField(
  name: string,
  opts: Partial<Options> = defaultOptions
): string {
  const options = {
    ...defaultOptions,
    ...opts
  }
  return `${name}${options.suffix}`
}

/**
 * 获取密文对象实例
 * @param model 数据对象
 * @param name 密文字段名称 / 密文字段路径
 * @param opts.sign 脱敏显示符号
 * @param opts.suffix 脱敏密文字段名后缀
 * @returns
 */
export function getCiphertext(
  model: object,
  name: string,
  opts: Partial<Options> = defaultOptions
): {
  text: string
  cipherText: string
} {
  const options = {
    ...defaultOptions,
    ...opts
  }
  const emptyRes = {
    text: '',
    cipherText: ''
  }
  if (typeof model === 'object') {
    const text = get(model, name)
    const cipherText = get(model, getCiphertextField(name, options))
    if (text && cipherText && text.includes(options.sign)) {
      return {
        text,
        cipherText
      }
    } else {
      return emptyRes
    }
  } else {
    return emptyRes
  }
}

/**
 * 判断是否密文
 * @param model 数据对象
 * @param name 密文字段名称 / 密文字段路径
 * @param opts.sign 脱敏显示符号
 * @param opts.suffix 脱敏密文字段名后缀
 */
export function isCiphertext(
  model: object,
  name: string,
  opts: Partial<Options> = defaultOptions
): boolean {
  const options = {
    ...defaultOptions,
    ...opts
  }
  const ciphertext = getCiphertext(model, name, options)
  return Boolean(ciphertext.text && ciphertext.cipherText)
}
