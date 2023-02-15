import { mount } from '@vue/test-utils'
import { asyncExpect } from '../../../tests/utils'
import SearchTable from '..'
import Ygpd from '../../../index'
import {
  SEARCH_TABLE_TEST_DATA,
  SEARCH_TABLE_COLUMNS,
  SEARCH_TABLE_ITEMS
} from './searchTable'

describe('SearchTable', () => {
  const { getComputedStyle } = window
  window.getComputedStyle = elt => getComputedStyle(elt)

  // 关于插槽能够成功渲染的用例
  it('SearchTable component table and form component slot render is ok', async () => {
    const wrapper = mount(SearchTable as any, {
      props: {
        ref: 'crud',
        rowKey: 'id',
        data: SEARCH_TABLE_TEST_DATA,
        items: [
          {
            name: 'realname',
            label: '姓名',
            newline: true,
            placeholder: '设置`newline: true`换行'
          }
        ],
        columns: SEARCH_TABLE_COLUMNS
      },
      global: {
        plugins: [Ygpd]
        // renderStubDefaultSlot: true,
      },
      slots: {
        default: '<div class="slot-table">这是自定义table的插槽</div>',
        form: '<div class="slot-form">这是自定义form的插槽</div>',
        tabs: '<div class="slot-tabs">这是自定义tabs的插槽</div>'
      }
      // shallow: true,
    })

    // 断言 获取渲染在对应form插槽的元素，如果获取成功则为true 通过
    expect(wrapper.find('.ygp-search-table-form .slot-form').exists()).toBe(
      true
    )

    // 断言 获取渲染在对应table插槽的元素，如果获取成功则为true 通过
    expect(wrapper.find('.ygp-search-table-content .slot-table').exists()).toBe(
      true
    )

    // 断言 获取渲染在对应tabs插槽的元素，如果获取成功则为true 通过
    expect(wrapper.find('.ygp-search-table-tabs .slot-tabs').exists()).toBe(
      true
    )

    await asyncExpect(() => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // 使用y-form能否成功渲染的用例
  it('SearchTable component YForm component render is ok', async () => {
    const wrapper = mount(SearchTable as any, {
      props: {
        ref: 'crud',
        rowKey: 'id',
        data: SEARCH_TABLE_TEST_DATA,
        items: SEARCH_TABLE_ITEMS,
        columns: SEARCH_TABLE_COLUMNS,
        'form-name': 'basic'
      },
      global: {
        plugins: [Ygpd]
        // renderStubDefaultSlot: true,
      },
      slots: {
        default: '<div class="slot-table">这是自定义table的插槽</div>',
        tabs: '<div class="slot-tabs">这是自定义tabs的插槽</div>'
      }
      // shallow: true,
    })

    await asyncExpect(async () => {
      const formItem = await wrapper.findAll('.ygp-form-item')
      // 断言 form表单一开始生成元素，在超过一定数量的时候会将一部分元素先隐藏起来，如果获取的formitem - 1 数量大于了0小于需要生成的最大item数，则为真
      // 也证明了收起的功能是有用的
      expect(
        formItem.length - 1 > 0 &&
          formItem.length - 1 < SEARCH_TABLE_ITEMS.length
      ).toBe(true)

      // 点击展开生成对应的元素
      await wrapper.findAll('.action_box .ygp-btn')[2].trigger('click')

      // 断言 展开后生成的formitem 跟我们引入的items，数量一直，则为真
      // 也证明了展开是可行的
      expect(
        wrapper.findAll('.ygp-form-item').length - 1 ===
          SEARCH_TABLE_ITEMS.length
      ).toBe(true)

      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })

  // 使用y-table能否成功渲染的用例
  it('SearchTable component YTable component render is ok', async () => {
    const wrapper = mount(SearchTable as any, {
      props: {
        ref: 'crud',
        rowKey: 'id',
        data: SEARCH_TABLE_TEST_DATA,
        columns: SEARCH_TABLE_COLUMNS
      },
      global: {
        plugins: [Ygpd]
        // renderStubDefaultSlot: true,
      },
      slots: {
        form: '<div class="slot-table">这是自定义table的插槽</div>',
        tabs: '<div class="slot-tabs">这是自定义tabs的插槽</div>'
      },
      shallow: true
    })

    const tableEle = wrapper.find('y-table-stub')
    // 断言 没有default 插槽，希望能生成y-table组件，如果为真则是渲染了y-table组件
    expect(wrapper.findComponent('y-table-stub').exists()).toBe(true)

    // 断言 根据传入的data数据如果为两个，则为[object Object],[object Object]，如果相等则证明打data传入成功
    expect(tableEle.attributes('data')).toBe('[object Object],[object Object]')

    // 断言 根据传入的columns数据如果为两个，则为4个[object Object]，如果相等则证明打columns传入成功
    expect(tableEle.attributes('columns')).toBe(
      '[object Object],[object Object],[object Object],[object Object]'
    )

    await wrapper.setProps({
      data: [
        {
          id: '1',
          name: 'iPhone13',
          status: '已发布'
        }
      ],
      columns: [
        {
          name: 'realname',
          label: '姓名',
          newline: true,
          placeholder: '设置`newline: true`换行'
        }
      ]
    })

    // 断言 根据传入的data数据如果为1个，则为[object Object]，如果相等则证明打data传入成功
    expect(tableEle.attributes('data')).toBe('[object Object]')

    // 断言 根据传入的columns数据如果为1个，则为[object Object]，如果相等则证明打columns传入成功
    expect(tableEle.attributes('columns')).toBe('[object Object]')

    // expect(tableEle.attributes('rowKey')).toBe('id')
    // console.log(tableEle.attributes('rowKey'))

    // console.log(wrapper.find('y-table-stub').html())

    await asyncExpect(async () => {
      expect(wrapper.html()).toMatchSnapshot()
    }, 0)
  })
})
