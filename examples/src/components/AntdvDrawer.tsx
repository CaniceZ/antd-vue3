import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs }) {
    const loading = ref(true)

    function onLoad() {
      loading.value = false
    }
    return () => (
      <y-drawer
        closable={false}
        maskClosable={true}
        width="80%"
        bodyStyle={{ padding: 0 }}
        {...attrs}
      >
        <y-spin
          wrapperClassName="full-height"
          style="max-height: unset; bottom: 0; right: 0;"
          fontSize="58px"
          spinning={loading.value}
        >
          <div style="width: 100%;height: 100%;overflow: hidden;">
            <iframe
              name="antdv"
              style="position: relative; left: -320px; top: -74px; bottom: -442px; width: calc(100% + 320px); height: calc(100% + 74px + 442px); border: 0;"
              onLoad={onLoad}
              src={props.href}
            />
          </div>
        </y-spin>
      </y-drawer>
    )
  }
})
