<script lang="ts" setup>
import { FormItem } from '@ygp/ygp-design-vue'
import { ref, watch } from 'vue'

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
  }
]

const form = ref()
const visible = ref(true)
watch(visible, newVal => {
  newVal ? form.value?.show('username') : form.value?.hide('username')
})
</script>

<template>
  <y-divider left>
    <y-switch v-model="visible" /> {{ visible ? '显示' : '隐藏' }}用户名
  </y-divider>
  <y-form ref="form" :items="items" />
</template>
