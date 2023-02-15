function pick<T extends object, K extends keyof T>(
  obj: T,
  fields: K[]
): Partial<Pick<T, K>> {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({})
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i]
    if (key in obj) {
      shallowCopy[key] = obj[key]
    }
  }
  return shallowCopy
}
export default pick
