import type { DefineComponent } from 'vue'
type MetaType = {
  title: string
  isHidden?: boolean
  [key: string]: any
}
export interface RouteInter {
  path: string
  component: DefineComponent
  children?: Array<MetaType>
  meta: MetaType
}
