type Watermark = {
  set: (text: string, sourceBody?: HTMLElement) => void
}
const watermark: Watermark = {
  /**
   *  该方法只允许调用一次
   *  @param:
   *  @text == 水印内容
   *  @sourceBody == 水印添加在哪里，不传就是body
   * */
  set: (text, sourceBody) => {
    setWatermark(text, sourceBody)
    // setInterval(() => {
    //   if (document.getElementsByClassName('ygpwater').length === 0) {
    //     id = setWatermark(text, sourceBody)
    //   }
    // }, 2000)
    window.onresize = () => {
      setWatermark(text, sourceBody)
    }
  }
}

const setWatermark = (text: string, sourceBody?: HTMLElement) => {
  const id =
    Math.random() * 10000 +
    '-' +
    Math.random() * 10000 +
    '/' +
    Math.random() * 10000

  if (document.getElementsByClassName('ygpwater').length > 0) {
    document.body.removeChild(
      document.getElementsByClassName('ygpwater')[
        document.getElementsByClassName('ygpwater').length - 1
      ]
    )
  }

  const can = document.createElement('canvas')
  can.width = 305
  can.height = 190

  const cans = can.getContext('2d') as CanvasRenderingContext2D
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = '13px Microsoft JhengHei'
  cans.fillStyle = 'rgba(0, 0, 0, .12)'
  cans.textAlign = 'left'
  cans.textBaseline = 'middle'
  cans.fillText(text, can.width / 20, can.height)

  const water_div = document.createElement('div')
  water_div.id = id
  water_div.className = 'ygpwater'
  water_div.style.pointerEvents = 'none'
  water_div.style.background =
    'url(' + can.toDataURL('image/png') + ') left top repeat'
  if (sourceBody) {
    water_div.style.width = '100%'
    water_div.style.height = '100%'
    sourceBody.appendChild(water_div)
  } else {
    water_div.style.top = '3px'
    water_div.style.left = '0px'
    water_div.style.position = 'fixed'
    water_div.style.zIndex = '100000'
    water_div.style.width = document.documentElement.clientWidth + 'px'
    water_div.style.height = document.documentElement.clientHeight + 'px'
    document.body.appendChild(water_div)
  }
  monitor(
    water_div.getAttribute('style') as string,
    sourceBody as HTMLElement,
    text as string
  )
  return id
}
function monitor(styleStr: string, sourceBody: HTMLElement, text: string) {
  const parentNode = document.getElementsByClassName('ygpwater')[0]
  const observer = new MutationObserver(() => {
    const wmInstance = parentNode
    if (
      (wmInstance && wmInstance.getAttribute('style') !== styleStr) ||
      !wmInstance.getAttribute('style')
    ) {
      // 如果标签在，只修改了属性，重新赋值属性
      if (wmInstance) {
        // 避免一直触发
        // observer.disconnect();
        wmInstance.setAttribute('style', styleStr)
      } else {
        observer.disconnect()
      }
    }
    if (document.getElementsByClassName('ygpwater').length === 0) {
      setWatermark(text, sourceBody)
    }
  })
  observer.observe(document.body, {
    childList: true,
    attributes: true,
    characterData: false,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false
  }) // 监听body节点
}
export default watermark
