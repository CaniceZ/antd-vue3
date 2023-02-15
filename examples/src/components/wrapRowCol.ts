import { YCol, YRow } from '@ygp/ygp-design-vue'
import { createApp, onMounted, h, nextTick, onBeforeUpdate } from 'vue'

function insertAfter(referenceNode: ChildNode, newNode: ChildNode) {
  referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling)
}

export default function wrapRowCol() {
  nextTick(() => {
    const vuedoc = document.querySelector('.ant-layout-content>.vuedoc')

    function getNodes(): ChildNode[] {
      const nodes: ChildNode[] = []
      vuedoc?.childNodes.forEach(node => nodes.push(node))
      return nodes
    }

    function wrap(doms: ChildNode[][], prev: ChildNode) {
      console.log(doms)
      const container = document.createElement('div')
      const app = createApp({
        setup() {
          let colRefs: any[] = []
          const setColRef = (el: any) => el && colRefs.push(el)
          onBeforeUpdate(() => {
            colRefs = []
          })
          onMounted(() => {
            colRefs.forEach((ref, index) => {
              doms[index].forEach(child => {
                ref?.$el?.appendChild(child)
              })
            })
          })
          return () =>
            h(YRow, { gutter: 20 }, () =>
              doms.map(() =>
                h(YCol, {
                  style: { display: 'flex', 'flex-direction': 'column' },
                  span: 24 / doms.length,
                  ref: setColRef
                })
              )
            )
        }
      })
      insertAfter(prev, container)
      app.mount(container)
    }

    function recursion(nodes: ChildNode[]) {
      const doms: ChildNode[][] = []
      let index = 0
      let canPush = false
      let prev: ChildNode | undefined = void 0
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node?.nodeName === '#comment') {
          const textContent = node?.textContent?.trim()
          if (textContent === 'row-start') {
            vuedoc?.removeChild(node)
            if (i > 0) {
              prev = nodes[i - 1]
            }
            continue
          } else if (textContent === 'col-start') {
            doms[index] = []
            vuedoc?.removeChild(node)
            canPush = true
            continue
          } else if (textContent === 'col-end') {
            vuedoc?.removeChild(node)
            canPush = false
            index++
            continue
          } else if (textContent === 'row-end') {
            vuedoc?.removeChild(node)
            canPush = false
            if (prev) {
              wrap(doms, prev)
            }
            recursion(getNodes())
            break
          }
        } else {
          if (canPush && node) {
            if ([...((node as any).classList || [])].includes('hljs')) {
              ;(node as any).style.height = '100%'
              // ;(node as any).style.maxHeight = '300px'
            }
            doms[index].push(node)
            vuedoc?.removeChild(node)
          }
        }
      }
    }

    recursion(getNodes())
  })
}
