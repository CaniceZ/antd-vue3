import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Input from '..'

// import Form from '../../form';
// import focusTest from '../../../tests/shared/focusTest'
// import { AInput } from '@ant-design';

// const { TextArea, Password } = Input

function commonType(type, output) {
  return it(`this input type is ${type}`, async () => {
    const wrapper = mount(Input as any, {
      props: { type }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toEqual(expect.arrayContaining([output]))
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
}

describe('YInput', () => {
  commonType('password', 'ygp-input-password')
  commonType('search', 'ygp-input-search')
  commonType('number', 'ygp-input-number')
  commonType('text', 'ygp-input')
  commonType('input', 'ygp-input')
  // commonType('textarea', 'ygp-textarea')
  it(`this input type is textarea`, async () => {
    const wrapper = mount(Input as any, {
      props: { textarea: true, autoSize: { minRows: 2, maxRows: 6 }, rows: 1 }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['ygp-textarea']))
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  it('should support fillPrecision', async () => {
    const wrapper = mount(Input as any, {
      props: {
        number: true,
        precision: 6,
        fillPrecision: true
      },
      sync: false
    })
    const passwordInput: any = wrapper.find('.ant-input-number-input')
    await wrapper.vm.$nextTick()
    // await wrapper.setData({ modelValue: 1.0 })
    await passwordInput.setValue(3)
    await passwordInput.trigger('blur')
    // expect(wrapper.vm.$props.number).toBeTypeOf('boolean')
    expect(passwordInput.element.value).toBe('3.000000')
    // expect(wrapper.vm.$props.number).toBeTypeOf('boolean')
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
