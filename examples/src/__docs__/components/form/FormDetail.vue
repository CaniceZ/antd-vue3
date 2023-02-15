<script lang="ts" setup>
import { FormItem } from '@ygp/ygp-design-vue'
import { reactive } from 'vue'

const items: FormItem[] = [
  {
    name: 'username',
    label: '用户名'
  },
  {
    name: 'realname',
    label: '姓名'
  },
  {
    name: 'age',
    label: '年龄'
  },
  {
    name: 'num',
    label: '编号'
  },
  {
    name: 'username2',
    label: '用户名2'
  },
  {
    name: 'realname2',
    label: '姓名2'
  },
  {
    name: 'age2',
    label: '年龄2'
  },
  {
    name: 'num2',
    label: '编号2'
  }
]

const formData = reactive({
  username: 'zhangsan',
  realname: '张三',
  age: 18,
  num: '1234123412341234123412341234123412341234',
  username2: 'zhangsan',
  realname2: '张三',
  age2: 18,
  num2: '1234123412341234123412341234123412341234'
})
const propsData = reactive<
  Partial<{
    compact: boolean
    labelAlign: 'left' | 'right'
    labelWidthAuto: boolean
  }>
>({})
const propsItems = [
  { label: '紧凑', name: 'compact', type: 'switch' },
  {
    label: 'label居左',
    name: 'labelAlign',
    type: 'radio',
    options: [
      { type: 'left', name: '左' },
      { type: 'right', name: '右' }
    ],
    componentProps: {
      button: true
    }
  },
  {
    label: 'label宽度自动',
    name: 'labelWidthAuto',
    type: 'switch'
  }
]
</script>

<template>
  {{ propsData }}
  <y-form :model="propsData" :items="propsItems" :defaultSpan="8" />
  <y-form
    :model="formData"
    :items="items"
    :defaultSpan="6"
    detail
    v-bind="propsData"
    :labelWidth="propsData.labelWidthAuto ? 'auto' : void 0"
  />
</template>
