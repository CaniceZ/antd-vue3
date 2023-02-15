import { YTabs, YTabPane } from '@ygp/ygp-design-vue'
import { createApp, getCurrentInstance, onMounted, h, nextTick } from 'vue'

function insertAfter(referenceNode: ChildNode, newNode: ChildNode) {
  referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling)
}

export default function reviewApi() {
  nextTick(() => {
    const vuedoc = document.querySelector('.ant-layout-content>.vuedoc')
    const codes: { [key: string]: ChildNode[] } = {}
    const deleteNodes: ChildNode[] = []
    let prev: ChildNode | undefined = void 0
    let field = ''
    for (let i = 0; i < (vuedoc?.childNodes || []).length; i++) {
      const node: any = vuedoc?.childNodes[i]
      if (node.nodeName === 'H2' && node.id === 'api') {
        prev = node
        continue
      }
      const reg = new RegExp('^api:(.*?)$')
      const [, matchName] = node.innerText.match(reg) || []
      if (matchName) {
        deleteNodes.push(node)
        field = matchName.trim()
        codes[field] = []
        continue
      }
      if (field) {
        codes[field].push(node)
      }
      if (
        node.nodeName === 'TABLE' ||
        [...(node.classList || [])].includes('vuedoc__hljs')
      ) {
        field = ''
      }
    }

    if (prev && Object.keys(codes).length > 0) {
      Object.keys(codes).forEach(key => {
        codes[key].forEach(child => vuedoc?.removeChild(child))
      })
      deleteNodes.forEach(child => vuedoc?.removeChild(child))
      const app = createApp({
        setup() {
          const proxy = getCurrentInstance()?.proxy!
          onMounted(() => {
            const el = proxy.$el
            Object.keys(codes).forEach(key => {
              const dom = el.querySelector(`.api-${key}`)
              codes[key].forEach(child => dom.appendChild(child))
            })
          })
          return () =>
            h(YTabs, { type: 'card' }, () =>
              Object.keys(codes).map(name => {
                return h(YTabPane, {
                  key: name,
                  tab: name,
                  class: `api-${name}`
                })
              })
            )
        }
      })
      const container = document.createElement('div')
      insertAfter(prev, container)
      app.mount(container)
    }
  })
}
