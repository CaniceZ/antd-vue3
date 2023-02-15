<script lang="ts" setup>
import { FormItem } from '@ygp/ygp-design-vue'
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
const drawer = ref()
async function onOk() {
  await form.value?.validate()

  // 触发Drawer.create(...)onOk(() => ...)的回调
  emit('ok')

  // 手动关闭当前模态窗的方法一
  emit('hide')
  // 手动关闭当前模态窗的方法二
  // drawer.value?.hide()
}

const data = reactive({})

function onCancel() {
  drawer.value?.cancel()
}
</script>

<template>
  <!-- 如果当前组件需要在 Drawer.create 中使用，则 `y-drawer` 必须添加 `v-bind="$attrs"` 属性透传 -->
  <y-drawer ref="drawer" v-bind="$attrs">
    <y-form ref="form" :model="data" :items="items" :defaultSpan="24" />
    <template #footer>
      <div style="text-align: right">
        <y-btn label="取消" @click="onCancel()" style="margin-right: 8px" />
        <y-btn primary label="登录" @click="onOk()" />
      </div>
    </template>
  </y-drawer>
</template>
