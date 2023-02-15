export const FORM_TYPE_MOCK = [
  {
    name: 'select',
    type: 'select',
    label: '单选下拉框',
    options: [
      {
        name: '是',
        type: 1
      },
      {
        name: '否',
        type: 0
      }
    ]
  },
  {
    name: 'textarea',
    type: 'textarea',
    label: '多行文本',
    row: true
  },
  {
    name: 'search',
    type: 'search',
    label: '搜索输入框'
  },
  {
    name: 'multipleselect',
    type: 'multipleselect',
    label: '多选下拉框',
    options: [
      {
        name: '足球',
        type: '1'
      },
      {
        name: '篮球',
        type: '2'
      }
    ]
  },
  {
    name: 'date',
    label: '日期',
    type: 'date'
  },
  {
    name: 'daterange',
    label: '日期范围',
    type: 'daterange'
  }
]
