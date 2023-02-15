export default function filterUnit(
  val: string | number,
  unit: string,
  defaultValue?: string | number
): string {
  if (!val && val !== 0) {
    return String(defaultValue || defaultValue === 0 ? defaultValue : '/')
  }
  return `${val}${unit || ''}`
}
