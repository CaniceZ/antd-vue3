<script lang="ts" setup>
import { FormItem } from '@ygp/ygp-design-vue'
import { reactive } from 'vue'

const items: FormItem[] = [
  {
    name: 'text',
    label: '默认文本框'
  },
  {
    name: 'number',
    type: 'number',
    label: '数字输入框'
  },
  {
    name: 'search',
    type: 'search',
    label: '搜索输入框'
  },
  {
    name: 'password',
    type: 'password',
    label: '密码框'
  },
  {
    name: 'textarea',
    type: 'textarea',
    label: '多行文本',
    row: true
  },
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
      },
      {
        name: '桌球',
        type: '3'
      }
    ]
  },
  {
    name: 'radio',
    type: 'radio',
    label: '单选按钮',
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
    name: 'checkbox',
    type: 'checkbox',
    label: '多选按钮',
    options: [
      {
        name: '足球',
        type: '1'
      },
      {
        name: '篮球',
        type: '2'
      },
      {
        name: '桌球',
        type: '3'
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
  },
  {
    name: 'time',
    label: '时间',
    type: 'time'
  },
  {
    name: 'timerange',
    label: '时间范围',
    type: 'timerange'
  },
  {
    name: 'datetime',
    label: '日期时间',
    type: 'datetime'
  },
  {
    name: 'datetimerange',
    label: '日期时间范围',
    type: 'datetimerange'
  },
  {
    name: 'week',
    label: '星期',
    type: 'week'
  },
  {
    name: 'weekrange',
    label: '星期范围',
    type: 'weekrange'
  },
  {
    name: 'month',
    label: '月份',
    type: 'month'
  },
  {
    name: 'monthrange',
    label: '月份范围',
    type: 'monthrange'
  },
  {
    name: 'year',
    label: '年份',
    type: 'year'
  },
  {
    name: 'yearrange',
    label: '年份范围',
    type: 'yearrange'
  },
  {
    name: 'quarter',
    label: '季度',
    type: 'quarter'
  },
  {
    name: 'quarterrange',
    label: '季度范围',
    type: 'quarterrange'
  },
  {
    name: 'datetimerange2',
    names: ['createStartTime', 'createEndTime'],
    label: '日期时间范围2',
    type: 'datetimerange2',
    span: 24
  },
  {
    name: 'autocomplete',
    label: '自动完成',
    type: 'autocomplete',
    options: ['luffy', 'zoro', 'nami', 'brook']
  }
]

const formData = reactive({
  autocomplete: '1234',
  text: '1234',
  select: 1,
  multipleselect: ['1', '2', '3'],
  radio: 1,
  checkbox: ['1', '2'],
  createStartTime: '2022-01-01 00:00:00',
  createEndTime: '2022-01-10 23:59:59'
})
</script>

<template>
  {{ formData }}
  <y-form :model="formData" :items="items" />
</template>
