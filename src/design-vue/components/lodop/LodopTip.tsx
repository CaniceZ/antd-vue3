import { defineComponent, ref, computed } from 'vue'
import { getPrefix } from '../../_utils/common'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import Drawer from '../../plugins/drawer'
import LodopTutorialDrawer from './LodopTutorialDrawer'

const [prefixName, prefixCls] = getPrefix('lodop-tip')

const LodopTip = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    state: {
      type: Number,
      default: 4
    },
    lodop: {
      type: Object,
      default: null
    }
  },
  setup(props, { attrs }) {
    const modalRef = ref()
    const needUpdate = computed(() => {
      return props.state === 3
    })

    function onCancel() {
      modalRef.value?.hide()
    }

    function toTutorials() {
      onCancel()
      Drawer.create(LodopTutorialDrawer)
    }

    return () => (
      <y-modal
        ref={modalRef}
        class={prefixCls}
        width={500}
        maskClosable
        {...attrs}
        v-slots={{
          footer: () => (
            <y-space>
              <y-btn label="查看安装教程" onClick={toTutorials} />
              <y-link href={props.lodop.lodopExe}>
                <y-btn
                  primary
                  label={needUpdate.value ? '执行升级' : '下载打印控件'}
                  onClick={onCancel}
                />
              </y-link>
            </y-space>
          )
        }}
      >
        <div class="tip_box">
          <ExclamationCircleFilled class="warn_icon" />
          <div>
            {needUpdate.value ? (
              <>
                <div>您的打印控件需要升级，否则无法打印</div>
                <div class="color45">
                  点击下方按键执行升级，升级后，请刷新页面
                </div>
              </>
            ) : (
              <>
                <div>您没有安装打印控件，无法打印</div>
                <div class="color45">
                  点击下方按键安装，安装完成后，请刷新页面
                </div>
              </>
            )}
          </div>
        </div>
      </y-modal>
    )
  }
})

export default LodopTip
