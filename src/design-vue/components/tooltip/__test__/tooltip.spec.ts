import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Tooltip from '..'
import Ygpd from '../../../index'

describe('YTooltip', () => {
  // const { appendChild } = document

  it('YTooltip render is ok?', async () => {
    const wrapper: any = mount(Tooltip as any, {
      props: {
        title: 'title="tooltip一直显示',
        modelValue: true
      },

      global: {
        plugins: [Ygpd]
      },
      slots: {
        default: '<span>tooltip一直显示</span>'
      }
    })
    // wrapper.appendChild = appendChild

    // wrapper.setProps({
    //   getPopupContainer: () => {
    //     return wrapper.find('.ant-tooltip-open')
    //   },
    // })

    // 有这个class则证明ant的tooltip渲染成功
    expect(wrapper.find('.ant-tooltip-open').exists()).toBe(true)
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
