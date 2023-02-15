<script lang="ts" setup>
import { FormItem, Message } from '@ygp/ygp-design-vue'
import type { RuleObject } from 'ant-design-vue/lib/form/interface'
import { reactive, ref } from 'vue'

const items: FormItem[] = [
  {
    name: 'username',
    label: '用户名',
    required: true,
    placeholder: '通过`required: true`设置必填验证'
  },
  {
    name: 'createTime',
    label: '创建日期',
    names: ['createStartTime', 'createEndTime'],
    placeholder: ['创建开始日期', '创建结束日期'],
    type: 'datetimerange',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: '密码',
    required: true
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: '确认密码',
    required: true
  }
]

const formRef = ref()
const formRef2 = ref()
const data = reactive<any>({})
const data2 = reactive<any>({})

async function onSubmit() {
  try {
    await formRef.value?.validate()
    Message.success('submit success')
  } catch (error: any) {
    const [fields] = error.errorFields
    if (fields && fields.name) {
      const itemRef = formRef.value.getItemRef(fields.name[0])
      itemRef?.item?.focus()
    }
  }
}
async function onSubmit2() {
  await formRef2.value?.validate()
  Message.success('submit success')
}
function onReset() {
  formRef.value?.reset()
}
function onReset2() {
  formRef2.value?.reset()
}
</script>

<template>
  <y-divider left
    >通过 formRef expose 的 getItemRef 调用 item.focus() 手动focus</y-divider
  >
  <y-form ref="formRef" :model="data" :items="items">
    <template #action>
      <y-btn primary @click="onSubmit" label="保存" />
      <y-btn link label="重置" @click="onReset" />
    </template>
  </y-form>
  <y-divider left>通过 y-form 属性 focusToFirstError 自动 focus</y-divider>
  <y-form ref="formRef2" :model="data2" :items="items" focusToFirstError>
    <template #action>
      <y-btn primary @click="onSubmit2" label="保存" />
      <y-btn link label="重置" @click="onReset2" />
    </template>
  </y-form>
</template>
