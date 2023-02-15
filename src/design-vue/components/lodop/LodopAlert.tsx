import { ref, defineComponent, onMounted, computed } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'
import { getPrefix } from '../../_utils/common'
import { Lodop } from './types'
import { getLodop } from '../../packages//utils'
import Drawer from '../../plugins/drawer'
import LodopTutorialDrawer from './LodopTutorialDrawer'

const [prefixName, prefixCls] = getPrefix('lodop-alert')

const lodopAlertProps = () => ({
  hold: Boolean // 是否一直展示提示语
})

const LodopAlert = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...lodopAlertProps()
  },
  setup(props, { attrs, slots }) {
    let lodop = ref<Lodop>({ state: 4 })

    const lodopSate = computed(() => {
      return lodop.value ? lodop.value.state : 4
    })
    onMounted(() => {
      setTimeout(() => {
        lodop.value = getLodop() as Lodop
      }, 1000)
    })

    function showTutorial() {
      Drawer.create(LodopTutorialDrawer)
    }

    return () => {
      return (
        (lodopSate.value !== 4 || props.hold) && (
          <y-alert
            class={prefixCls}
            showIcon
            closable
            {...attrs}
            v-slots={{
              message: () => {
                return (
                  <div>
                    {(lodopSate.value < 3 || props.hold) && (
                      <>
                        页面中需要打印功能，请点击
                        <y-link
                          primary
                          underline
                          label=" 此处"
                          href={lodop.value.lodopExe}
                        />
                        下载打印机驱动，安装成功后请刷新本页面。（若此前已安装过，可
                        <y-link
                          href="CLodop.protocol:setup"
                          target="_self"
                          label="点这里直接再次启动"
                        />
                        ）
                      </>
                    )}
                    {lodopSate.value === 3 && (
                      <>
                        页面中需要打印功能，您的打印控件需要升级，点击
                        <y-link
                          primary
                          underline
                          label=" 此处"
                          href={lodop.value.lodopExe}
                        />
                        执行升级，升级后请刷新页面。
                      </>
                    )}
                    {slots.tutorial ? (
                      slots.tutorial()
                    ) : (
                      <y-link
                        underline
                        label="查看安装教程"
                        onClick={showTutorial}
                      />
                    )}
                  </div>
                )
              }
            }}
          />
        )
      )
    }
  }
})

export type LodopAlertProps = PropsType<typeof LodopAlert> &
  PropsType<typeof lodopAlertProps>
export type LodopAlertExpose = {}
export type LodopAlertSlots = Readonly<DefaultSlots>

export default LodopAlert as GlobalComponentConstructor<
  LodopAlertProps,
  LodopAlertSlots
>
