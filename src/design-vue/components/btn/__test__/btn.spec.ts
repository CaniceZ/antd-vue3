import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Btn from '..'
import Ygpd from '../../../index'

describe('YBtn', () => {
  it('Btn component type is ok?', async () => {
    const wrapper = mount(Btn as any, {
      props: {
        label: '这是btn',
        primary: true
      },
      shallow: true
    })

    // 断言 直接传入类型的值是否生效，如果生效则能获取type，条件成立则为true
    expect(wrapper.find('a-button-stub').attributes('type')).toBe('primary')

    await wrapper.setProps({ type: 'link' })

    // 断言 传入type，是否能够覆盖本身的直接传入的type值，如果能够获取属性type为link则证明可以覆盖，
    expect(wrapper.find('a-button-stub').attributes('type')).toBe('link')

    await wrapper.setProps({ submit: true })

    // 断言传入submit，如果htmltype为submit则证明修改成功，条件成立
    expect(wrapper.find('a-button-stub').attributes('htmltype')).toBe('submit')

    await wrapper.setProps({ circle: true })

    // 断言 设置按钮形状，如果在组件身上的属性shape值为circle则证明透传成功，条件成立
    expect(wrapper.find('a-button-stub').attributes('shape')).toBe('circle')

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // it('Btn component confirm is ok?', async () => {
  //   const wrapper = mount(Btn as any, {
  //     props: {
  //       label: '这是btn',
  //       confirm: true,
  //     },
  //     global: {
  //       plugins: [Ygpd],
  //     },
  //   })

  //   await wrapper.find('.ygp-btn').trigger('click')
  //   await asyncExpect(() => {
  //     console.log(wrapper.html())
  //     // expect(wrapper.html()).toMatchSnapshot()
  //   }, 0)
  // })
})
