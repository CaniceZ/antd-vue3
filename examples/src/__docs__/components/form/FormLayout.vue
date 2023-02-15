<script lang="ts" setup>
import { FormItem } from '@ygp/ygp-design-vue'

const items: FormItem[] = [
  {
    name: 'username',
    label: '用户名',
    span: 12
  },
  {
    name: 'realname',
    label: '姓名',
    newline: true,
    placeholder: '设置`newline: true`换行'
  },
  {
    name: 'password',
    label: '密码',
    autofocus: true,
    span: 10
  },
  {
    name: 'confirmPassword',
    label: '确认密码'
  },
  {
    name: 'type',
    label: '类型',
    row: true,
    placeholder: '设置`row: true`独占一行'
  },
  {
    name: 'sex',
    label: '性别'
  },
  {
    name: 'hobby',
    label: '爱好'
  },
  {
    name: 'birthday',
    label: '生日'
  },
  {
    name: 'department',
    label: '部门'
  },
  {
    name: 'remark',
    label: '备注',
    span: 24,
    placeholder: '设置`span: 24`占满一整行'
  },
  {
    name: 'affix',
    label: '附件'
  }
]
</script>

<template>
  <y-form :items="items" />
</template>
