<script lang="ts" setup>
import { FormItem } from '@ygp/ygp-design-vue'
import type { RuleObject } from 'ant-design-vue/lib/form/interface'
import { reactive } from 'vue'

const items: FormItem[] = [
  {
    name: 'username',
    label: '用户名',
    required: true,
    span: 12,
    placeholder: '通过`required: true`设置必填验证'
  },
  {
    name: 'username',
    label: '密码',
    required: true,
    requiredMsg: '密码不能为空',
    type: 'password',
    span: 12,
    placeholder: '通过`requiredMsg: string`设置必填提示信息'
  },
  {
    name: 'remark',
    type: 'textarea',
    required: true,
    label: '备注',
    row: true,
    span: 12,
    placeholder:
      '通过`rules: [{ validator: () => {...} }]`设置自定义验证（支持异步验证），你输入个123试试',
    rules: [
      {
        validator: async (rule: RuleObject, value: string) => {
          if (value && value !== '1234') {
            return Promise.reject('请一定要输入1234')
            // 异步验证
            // return new Promise((resolve, reject) => {
            //   setTimeout(() => {
            //     reject('请一定要输入1234')
            //   }, 3000)
            // })
          }
          return Promise.resolve()
        },
        trigger: 'change'
      }
    ]
  }
]
const data = reactive({})

function onSubmit() {
  console.log('submit')
}
</script>

<template>
  <y-form :model="data" :items="items" @submit="onSubmit">
    <template #action><y-btn label="保存" primary submit /></template>
  </y-form>
</template>
