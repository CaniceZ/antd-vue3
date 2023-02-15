import { mount } from '@vue/test-utils'
import Table from '..'
import Ygpd from '../../../index'

describe('Table', () => {
  const { getComputedStyle } = window
  window.getComputedStyle = elt => getComputedStyle(elt)

  it('table props defaultExpandAllRows2 and childrenColumnName is ok?', async () => {
    const wrapper = mount(Table as any, {
      props: {
        columns: [{ dataIndex: 'name', title: '姓名' }],
        data: Array(2)
          .fill(void 0)
          .map((_, i) => ({
            id: i,
            name: `zhangsan${i}`,
            abc: Array(2)
              .fill(void 0)
              .map((_, j) => ({ id: `${i}${j}`, name: `lisi${i}${j}` }))
          })),
        defaultExpandAllRows2: true,
        childrenColumnName: 'abc'
      },
      global: {
        plugins: [Ygpd]
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.ant-table-row')).toHaveLength(6)

    await wrapper.setProps({
      data: Array(2)
        .fill(void 0)
        .map((_, i) => ({
          id: i,
          name: `zhangsan${i}`,
          abc: Array(4)
            .fill(void 0)
            .map((_, j) => ({ id: `${i}${j}`, name: `lisi${i}${j}` }))
        }))
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('.ant-table-row')).toHaveLength(10)
  })
})
