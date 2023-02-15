import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Time from '..'
// import Antd from 'ant-design-vue'

// const global = {
//   plugins: [Antd],
// }

describe('YTag', () => {
  it('is create ATimePicker', async () => {
    const wrapper = mount(Time as any, {
      props: {
        range: false
      },
      shallow: true
    })

    console.log(wrapper.html())

    // 生成快照
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  it('is create ATimePicker', async () => {
    const wrapper = mount(Time as any, {
      props: {
        range: true
      },
      shallow: true
    })

    console.log(wrapper.html())

    // 生成快照
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
