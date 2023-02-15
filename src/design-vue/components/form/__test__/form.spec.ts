import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import Form from '..'
import Ygpd from '../../../index'
import { FORM_TYPE_MOCK } from './formMock'

const components = {
  // YFormItem: FormItem,
  // YSpace: Space,
  // YRow: Row,
  // YCol: Col,
}

describe('Form', () => {
  // 用例，测试item的插槽能否成功渲染
  it('Form component item slot', async () => {
    const wrapper = mount(Form as any, {
      props: {
        name: 'basic',
        items: [
          {
            name: 'summary',
            label: '订单搜索',
            row: true
          }
        ]
      },
      slots: {
        'item-summary': '<div class="slot-class">123</div>',
        'label-summary': '<span class="label-class">这是自定义label</span>',
        action: '<div class="action-class">这是自定义的action插槽</div>'
      },
      global: {
        components,
        plugins: [Ygpd]
      }
    })
    await wrapper.vm.$nextTick()
    const formItemContent: any = wrapper.find('.slot-class')
    // 断言获取插槽的html。如果跟toBe的内容一致，则为真通过
    expect(formItemContent.html()).toBe('<div class="slot-class">123</div>')

    // 断言获取label插槽的text。如果跟toBe的内容一致，则为真通过
    expect(wrapper.find('.ant-form-item-label .label-class').text()).toBe(
      '这是自定义label'
    )

    // 断言获取action插槽是否存在。如果存在则为真通过
    expect(wrapper.find('.label-class').exists()).toBe(true)
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // 用例默认的a-input是否为真
  it('default Form component item is input', async () => {
    const wrapper = mount(Form as any, {
      props: {
        name: 'defaultBasic',
        items: [
          {
            name: 'defaultInput',
            label: '默认input',
            row: true
          }
        ]
      },
      global: {
        plugins: [Ygpd]
      }
    })
    await wrapper.vm.$nextTick()
    const formItemContent: any = wrapper.find('.ygp-form-item .ygp-input')
    // 判断是否能够找到input这个组件渲染的元素，如果能找到则为真
    expect(formItemContent.exists()).toBe(true)
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // 用例，expose的方法show，hide是否成功
  it('Form component item is show or hide', async () => {
    const wrapper = mount(Form as any, {
      props: {
        name: 'showBasic',
        items: [
          {
            name: 'showInput',
            label: '显示input',
            row: true
          }
        ]
      },
      global: {
        plugins: [Ygpd]
      }
    })
    await wrapper.vm.$nextTick()

    // 隐藏form-item元素是否成功，成功则exists判断元素是否存在时为false，
    await wrapper.vm.hide('showInput')

    // 获取元素
    let formItemContent: any = wrapper.find('.ygp-input')

    // 如果不存在则通过，证明expose的hide方法是有效的
    expect(formItemContent.exists()).toBe(false)

    // 显示form-item元素是否成功，成功则exists判断元素是否存在时为true，
    await wrapper.vm.show('showInput')

    formItemContent = wrapper.find('.ygp-input')

    // 如果存在则通过，证明expose的show方法是有效的
    expect(formItemContent.exists()).toBe(true)

    console.log(wrapper.vm.getItemRef('showInput'))

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // 用例，点击提交校验是否可行
  it('Form component item submit valid is ok?', async () => {
    const wrapper = mount(Form as any, {
      props: {
        name: 'showBasic',
        items: [
          {
            name: 'showInput',
            label: '显示input',
            required: true
          }
        ]
      },
      slots: {
        action: '<y-btn label="保存" primary submit />'
      },
      global: {
        plugins: [Ygpd]
      }
    })
    await wrapper.vm.$nextTick()

    let formItemContent: any = wrapper.find('.ygp-btn')

    // await formItemContent.setValue('123')

    await formItemContent.trigger('submit')

    await asyncExpect(async () => {
      // 断言 点击submit由于required为true所以直接提交会触发校验，直接校验是否存在没有输入值，如果没有输入可以获取error元素，条件则为真
      expect(wrapper.find('.ant-form-item-has-error').isVisible()).toBe(true)

      await wrapper.find('#showBasic_showInput').setValue('123')
      formItemContent.trigger('submit')

      // 断言 输入值123，再点击submit，如果输入了值则获取不到error元素，则与toBe条件对等
      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(false)

      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // 用例，props的span以及labelWidth是否生效还有就是row是否生效
  it('Form component item span and labelWidth is ok?', async () => {
    const wrapper = mount(Form as any, {
      props: {
        name: 'showBasic',
        labelWidth: '140px',
        items: [
          {
            name: 'showInput',
            label: '显示input',
            row: true,
            span: 14
          }
        ]
      },
      global: {
        plugins: [Ygpd]
      }
    })
    await wrapper.vm.$nextTick()

    // 获取设置span：14后的元素，如果能获取到证明设置span生效，则为true
    expect(wrapper.find('.ant-col-14').exists()).toBe(true)

    // 获取item的label，获取属性style如果label的width: 140px,则为true
    expect(wrapper.find('.ant-form-item-label').attributes('style')).toBe(
      'width: 140px;'
    )

    // 断言是否具备length属性，且值为2
    // 也就是说我上面设置了一个row：true，实现换行是通过前后添加空白的col实现
    expect(wrapper.findAll('.ant-col-24')).toHaveLength(2)

    await wrapper.setProps({
      items: [
        {
          name: 'showInput',
          label: '显示input',
          row: true,
          span: 14
        },
        {
          name: 'showInput',
          label: '显示input',
          row: true,
          span: 14
        }
      ]
    })

    // 断言是否具备length属性，且值为4
    // 也就是说我上面设置了两个row：true，实现换行是通过前后添加空白的col实现
    expect(wrapper.findAll('.ant-col-24')).toHaveLength(4)
    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // 用例：按照传入类型进行渲染
  it('Form component item type render is ok？', async () => {
    const wrapper = mount(Form as any, {
      props: {
        name: 'showBasic',
        items: FORM_TYPE_MOCK
      },
      global: {
        plugins: [Ygpd]
      }
    })
    await wrapper.vm.$nextTick()

    // 断言是否能获取下拉选择框
    expect(wrapper.find('.ant-form-item .ygp-select').exists()).toBe(true)

    // 断言是否能获取多行文本
    expect(wrapper.find('.ant-form-item .ygp-textarea').exists()).toBe(true)

    // 断言是否能获取搜索输入框
    expect(wrapper.find('.ant-form-item .ygp-input-search').exists()).toBe(true)

    // 断言是否能获取多选下拉选择框
    expect(wrapper.find('.ant-form-item .ant-select-multiple').exists()).toBe(
      true
    )

    // 断言是否能获取日期组件
    expect(wrapper.find('.ant-form-item .ygp-date').exists()).toBe(true)

    // 断言是否能获取时间范围组件
    expect(wrapper.find('.ant-form-item .ygp-date-range').exists()).toBe(true)

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
