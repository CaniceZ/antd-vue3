import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Tabs from '..'
import Ygpd from '../../../index'

describe('YTabs', () => {
  it('tabs component default slot render is ok', async () => {
    const wrapper = mount(Tabs as any, {
      global: {
        plugins: [Ygpd],
        renderStubDefaultSlot: true
      },
      slots: {
        default: `<y-tab-pane tab="选项一">选项一</y-tab-pane>
        <y-tab-pane tab="选项二">选项二</y-tab-pane>`
      },
      shallow: true
    })

    // 断言 默认插槽是否能够正常使用，如果能够获取我们传入的两个pane组件则证明传入正确，条件为真
    expect(wrapper.findAllComponents('y-tab-pane-stub').length === 2).toBe(true)

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)

    // console.log(wrapper.html())
  })

  it('tabs component change is ok', async () => {
    const wrapper = mount(Tabs as any, {
      props: {
        card: true
      },
      global: {
        plugins: [Ygpd]
      },
      slots: {
        default: `<y-tab-pane key="1" tab="选项一">选项一</y-tab-pane>
        <y-tab-pane key="2" tab="选项二">选项二</y-tab-pane>`
      }
    })

    expect(wrapper.find('.ant-tabs-tab-active .ant-tabs-tab-btn').text()).toBe(
      '选项一'
    )

    await wrapper.setProps({ modelValue: '2' })

    expect(wrapper.find('.ant-tabs-tab-active .ant-tabs-tab-btn').text()).toBe(
      '选项二'
    )

    // 判断card：true有没有生效
    expect(wrapper.find('.ant-tabs-card').exists()).toBe(true)

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
