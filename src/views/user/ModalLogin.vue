<script lang="ts" setup>
import { FormItem } from '@/design-vue'
import { reactive, ref } from 'vue'

const emit = defineEmits(['ok', 'hide'])

const items: FormItem[] = [
  {
    name: 'username',
    label: '用户名',
    required: true,
    placeholder: '任意字符',
    autofocus: true
  },
  {
    name: 'password',
    label: '密码',
    type: 'password',
    required: true,
    placeholder: '任意字符'
  }
]

const form = ref()
const modal = ref()
async function onOk() {
  await form.value?.validate()

  // 触发Modal.create(...)onOk(() => ...)的回调
  emit('ok')

  // 手动关闭当前模态窗的方法一
  // emit('hide')
  // 手动关闭当前模态窗的方法二
  modal.value?.hide()
}

const data = reactive({})
</script>

<template>
  <!-- 如果当前组件需要在 Modal.create 中使用，则 `ygp-modal`` 必须添加 `v-bind="$attrs"` 属性透传 -->
  <y-modal ref="modal" footer-align="center" v-bind="$attrs" @ok="onOk">
    <y-form ref="form" :model="data" :items="items" :default-span="24" />
  </y-modal>
</template>
