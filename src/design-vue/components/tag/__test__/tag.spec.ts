import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Tag from '..'

describe('YTag', () => {
  it('this is Tag Component label', async () => {
    const wrapper = mount(Tag as any, {
      props: {
        label: 'tag1'
      }
    })
    const tagEle: any = wrapper.find('.ygp-tag')
    await wrapper.vm.$nextTick()

    // 判断输入的label是不是预想的tag1
    expect(tagEle.text()).toBe('tag1')

    // 生成快照
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  it('this is ACheckableTag Component checked', async () => {
    const wrapper = mount(Tag as any, {
      props: {
        checked: true
      }
    })
    await wrapper.vm.$nextTick()

    // 判断输入的label是不是预想的tag1
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['ant-tag-checkable', 'ant-tag-checkable-checked'])
    )

    // 生成快照
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  it('this is Tag Component slot', async () => {
    const wrapper = mount(Tag as any, {
      slots: {
        default: 'tag2'
      }
    })
    const tagEle: any = wrapper.find('.ygp-tag')
    await wrapper.vm.$nextTick()

    // 判断slot有正确嵌入
    expect(tagEle.text()).toBe('tag2')

    // 生成快照
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
