import { mount, shallowMount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Text from '..'

describe('YTag', () => {
  it('this is Text Component have level', async () => {
    const wrapper = mount(Text as any, {
      props: {
        h1: 'h1'
      },
      slots: {
        default: '123'
      }
    })
    const textEle: any = wrapper.find('.ygp-text')

    // 判断输入level后是不是输出<a-typography-title></a-typography-title>组件的内容
    expect(wrapper.html()).toMatch(/<\/h1>/)

    // 判断当有level时是否含有对应类名
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['ant-typography', 'ygp-text'])
    )

    // 判断默认插槽是否生效
    expect(textEle.text()).toBe('123')

    // 生成快照
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  it('this Text Component is ATypographyText', async () => {
    const wrapper = mount(Text as any, {
      props: {
        style: { width: '100px' },
        ellipsis: false,
        content: '易工品测试'
      }
    })
    const textEle: any = wrapper.find('.ygp-text')

    await wrapper.vm.$nextTick()

    // 判断输入没有level时，为ATypographyText组件，判断是否包含对应的class
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['ant-typography', 'ygp-text'])
    )

    await wrapper.setProps({ ellipsis: true })

    // const titleEle: any = wrapper.find('[title="易工品测试"]')

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['ant-typography-ellipsis'])
    )

    // 判断默认插槽是否生效
    expect(textEle.text()).toBe('易工品测试')

    // 判断省略是否存在，保证组件不出问题
    // expect(titleEle.text()).toBe('...')
    // console.log(titleEle)

    // 生成快照
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // it('is create ATypographyText', async () => {
  //   const wrapper = mount(Text as any, {
  //     shallow: true,
  //     props: {
  //       style: { width: '100px' },
  //       ellipsis: false,
  //       content: '易工品测试',
  //     },
  //   })

  //   // 判断省略是否存在，保证组件不出问题
  //   // expect(titleEle.text()).toBe('...')
  //   console.log(wrapper.html())

  //   // 生成快照
  //   await asyncExpect(() => {
  //     expect(wrapper.html()).toMatchSnapshot()
  //   }, 0)
  // })
})
