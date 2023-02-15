import { defineComponent, ref } from 'vue'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('lodop-tutorial-drawer')

const LodopTutorialDrawer = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {},
  setup(_props, { attrs }) {
    const drawer = ref()
    function onCancel() {
      drawer.value?.cancel()
    }

    return () => (
      <y-drawer
        ref={drawer}
        class={prefixCls}
        width={930}
        maskClosable
        footer-style={{ textAlign: 'right' }}
        {...attrs}
        v-slots={{
          footer: () => <y-btn primary label="关闭" onClick={onCancel} />
        }}
      >
        <y-lodop-tutorial />
      </y-drawer>
    )
  }
})

export default LodopTutorialDrawer
