import filterUnit from './filterUnit'

export default function filterMoney(
  val: string | number,
  defaultValue?: string | number,
  unit?: string
) {
  return filterUnit(val, unit || '元', defaultValue)
}
