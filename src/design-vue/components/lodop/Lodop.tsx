import { defineComponent, ref, computed, onMounted, onBeforeMount } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'
import { getPrefix } from '../../_utils/common'
import { Lodop } from './types'
import { getLodop, loadCLodop, needCLodop } from '../../packages//utils'
import { PrinterOutlined } from '@ant-design/icons-vue'
import LodopTip from './LodopTip'
import Modal from '../../plugins/modal'
import axios from 'axios'

const [prefixName, prefixCls] = getPrefix('lodop')

const lodopProps = () => ({
  label: {
    type: String,
    default: ''
  },
  showPrinterSelector: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  preview: {
    type: Boolean,
    default: false
  }
})

const LodopBtn = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...lodopProps()
  },
  setup(props, { attrs, emit, expose }) {
    let lodop = ref<Lodop>({ state: 4 })
    let curPrinter = ref('')
    let printing = ref(false)
    const printerOptions = ref<string[]>([])

    const lodopSate = computed(() => {
      return lodop.value ? lodop.value.state : 4
    })

    const isDisable = computed(() => {
      // return props.disabled || !curPrinter.value || printing.value
      return props.disabled || printing.value
    })

    function getPrinters() {
      const LODOP = lodop.value.LODOP
      if (!LODOP) {
        return
      }
      const iCount = LODOP.GET_PRINTER_COUNT()
      for (var i = 0; i < iCount; i++) {
        let printerName = LODOP.GET_PRINTER_NAME(i)
        printerOptions.value.push(printerName)
      }
      if (printerOptions.value.length > 0) {
        curPrinter.value = printerOptions.value[0]
      }
    }

    function onPrinterChange(value) {
      curPrinter.value = value
    }

    onBeforeMount(() => {
      if (needCLodop()) {
        loadCLodop()
      }
    })

    onMounted(() => {
      setTimeout(() => {
        lodop.value = getLodop() as Lodop
        getPrinters()
      }, 1000)
    })

    function onPrintBefore() {
      if (printing.value) {
        return
      }
      printing.value = true
      const LODOP = lodop.value.LODOP
      if (!LODOP) {
        Modal.create(LodopTip, {
          state: lodopSate.value,
          lodop: lodop.value
        }).onHide(() => {
          clearPrinting()
        })
        return
      }
      emit('printBefore', lodop.value)
      return true
    }
    function onPrint() {
      onPrintBefore()
      emit('print', lodop.value)
    }

    async function getFileBase64(url) {
      let fileData: any = null
      try {
        fileData = await axios({
          method: 'get',
          url: url, // 请求地址
          responseType: 'blob' // 指明服务器返回的数据类型
        })
      } catch {
        fileData = null
      }
      return new Promise((resolve, reject) => {
        if (fileData && fileData.data) {
          const file = new Blob([fileData.data], { type: 'application/pdf' })
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        } else {
          reject('文件读取错误')
        }
      })
    }

    function lodopBase64({ url, filename, type }) {
      const LODOP = lodop.value.LODOP
      if (!LODOP) {
        return
      }
      getFileBase64(url).then(
        (res: any) => {
          if (filename) {
            LODOP.PRINT_INIT(filename)
          }

          LODOP.SET_PRINT_PAGESIZE(1, '210mm', '297mm', 'A4') // 设置纸张大小
          if (type === 'img') {
            LODOP.ADD_PRINT_IMAGE(
              0,
              0,
              '100%',
              '100%',
              `<img border='0' src='${res}' />`
            )
            LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2) //按原图比例(不变形)缩放模式
          } else {
            LODOP.ADD_PRINT_PDF(
              0,
              0,
              '100%',
              '100%',
              res?.split('data:application/pdf;base64,')[1]
            )
          }

          if (props.preview) {
            LODOP.PREVIEW()
          } else {
            if (LODOP.SET_PRINTER_INDEX(curPrinter.value)) {
              LODOP.PRINT()
            } else {
              LODOP.PREVIEW()
            }
          }
          printing.value = false
        },
        () => {
          printing.value = false
        }
      )
    }

    function onItemPrint({ url, filename, type }) {
      lodopBase64({ url, filename, type })
    }

    function clearPrinting() {
      printing.value = false
    }

    expose({
      printerOptions: printerOptions.value,
      clearPrinting,
      onItemPrint,
      onPrintBefore
    })

    return () => (
      <y-space class={prefixCls} size={8} {...attrs}>
        <div class="select_box">
          {printerOptions.value.length === 0 ? (
            <y-alert
              class="warn_tip"
              message="没有监测到打印机"
              warning
              banner
              closable
            />
          ) : (
            props.showPrinterSelector && (
              <div class="select_printer">
                <span class="flex-shrink-0">选择打印机：</span>
                <y-select
                  modelValue={curPrinter.value}
                  options={printerOptions.value}
                  onChange={onPrinterChange}
                />
              </div>
            )
          )}
        </div>
        <y-btn primary disabled={isDisable.value} onClick={onPrint}>
          <PrinterOutlined />
          {props.label || '打印'}
        </y-btn>
      </y-space>
    )
  }
})

export type LodopProps = PropsType<typeof LodopBtn> &
  PropsType<typeof lodopProps>
export type LodopExpose = {}
export type LodopSlots = Readonly<DefaultSlots>

export default LodopBtn as GlobalComponentConstructor<LodopProps, LodopSlots>
