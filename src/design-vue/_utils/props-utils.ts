import { Fragment, isVNode, VNode, Comment } from 'vue'
import isValid from './isValid'

export function isEmptyElement(c) {
  return (
    c &&
    (c.type === Comment ||
      (c.type === Fragment && c.children.length === 0) ||
      (c.type === Text && c.children.trim() === ''))
  )
}

export function flattenChildren(children: VNode[] = [], filterEmpty = true) {
  const temp = Array.isArray(children) ? children : [children]
  const res: VNode[] = []
  temp.forEach(child => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty))
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children as VNode[], filterEmpty))
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child)
      } else if (!filterEmpty) {
        res.push(child)
      }
    } else if (isValid(child)) {
      res.push(child)
    }
  })
  return res
}
