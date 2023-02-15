import { RightOutlined } from '@ant-design/icons-vue'
import { Drawer, YBtn } from '@ygp/ygp-design-vue'
import { defineComponent, h } from 'vue'
import AntdvDrawer from './AntdvDrawer'

const ABtn = defineComponent({
  props: {
    href: {
      type: String,
      default: 'https://next.antdv.com/components/overview-cn'
    }
  },
  setup(props, { attrs }) {
    function onClick() {
      Drawer.create(AntdvDrawer, {
        href: props.href
      })
    }
    return () =>
      h(
        YBtn,
        {
          type: 'primary',
          ...attrs,
          onClick
        },
        () => [attrs['label'], h(RightOutlined)]
      )
  }
})

export default ABtn
