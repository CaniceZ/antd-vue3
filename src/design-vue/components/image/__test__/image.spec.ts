import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Image, { ImagePreviewGroup } from '..'
import Ygpd from '../../../index'

describe('YImage', () => {
  it('Image component fallback and slot is ok?', async () => {
    const src =
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    const wrapper = mount(Image as any, {
      props: {
        fallback: src
      },
      slots: {
        previewMask: '<div class="preview-mask-slot">123</div>'
      }
    })

    // 断言 插槽是否能够正常使用，如果能获取到则为真
    expect(wrapper.find('.ant-image-mask .preview-mask-slot').exists()).toBe(
      true
    )

    // 断言 ant的image需要设置src还有fallback才会有容错图，y-image则是只需要fallback也可以有容错图，如果能获取到src的图片则为真

    expect(wrapper.find('.ant-image .ygp-image').attributes('src')).toBe(src)

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  it('ImageGroup component render is ok?', async () => {
    const src =
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    const wrapper = mount(ImagePreviewGroup as any, {
      props: {},
      slots: {
        default: `<y-image src="${src}"></y-image>`
      },
      global: {
        plugins: [Ygpd],
        renderStubDefaultSlot: true
      },
      shallow: true
    })

    // 断言 能否正常渲染出a-image-preview-group组件，能匹配上则为真
    expect(wrapper.html()).toMatch('<a-image-preview-group-stub')

    // 断言 获取group下的image元素如果存在则证明无误，条件成立则为真
    expect(
      wrapper.find('a-image-preview-group-stub y-image-stub').exists()
    ).toBe(true)

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
