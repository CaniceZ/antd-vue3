<script lang="ts" setup>
import { FormItem, Message } from '@ygp/ygp-design-vue'
import { RuleObject } from 'ant-design-vue/lib/form/interface'
import { reactive, ref, h } from 'vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'

const items: FormItem[] = [
  {
    name: 'switch',
    label: '切换',
    type: 'switch'
  },
  {
    name: 'username',
    label: '用户名用户名用户名用户',
    required: true,
    span: 12,
    placeholder: '通过`required: true`设置必填验证',
    labelTip: '标签提示',
    tip: '组件提示'
  },
  {
    name: 'realname',
    label: '姓名',
    newline: true,
    placeholder: '设置`newline: true`换行',
    labelTip: {
      title: '标签提示',
      placement: 'bottom',
      color: '#fff',
      textColor: '#323233',
      // icon: 'InfoCircleOutlined', // 使用 string 需要提前全局注册该组件
      icon: h(InfoCircleOutlined)
    },
    tip: {
      title: '组件提示',
      placement: 'bottom',
      color: '#fff',
      textColor: '#323233'
    }
  },
  {
    name: 'createTime',
    label: '创建日期',
    names: ['createStartTime', 'createEndTime'],
    placeholder: ['创建开始日期', '创建结束日期'],
    type: 'datetimerange',
    required: true,
    row: true,
    onChange(val) {
      console.log('onchange', val)
    }
  },
  {
    name: 'password',
    label: '密码',
    autofocus: true,
    span: 10,
    placeholder: '设置`autofocus: true`在页面挂载完的时候自动获取焦点'
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
    label: '附件',
    disabled: true,
    tip: '1234'
  },
  {
    name: 'age',
    type: 'number',
    label: '年龄',
    disabled: true,
    required: true,
    labelTip: '1234',
    tip: '1234',
    placeholder: '设置`disabled: true`禁用组件'
  },
  {
    name: 'height',
    type: 'number',
    label: '身高',
    required: true
  },
  {
    name: 'sku',
    label: 'SKU号',
    detail: true
  },
  {
    name: 'value0',
    label: '值为0的状态',
    detail: true
  },
  {
    name: 'summary',
    label: '订单搜索',
    row: true,
    required: true,
    rules: [
      {
        validator: async (rule: RuleObject, value: string) => {
          if (value && value !== '1234') {
            return Promise.reject('请一定要输入1234')
          }
          return Promise.resolve()
        },
        trigger: 'change'
      }
    ]
  },
  {
    name: 'file',
    type: 'upload',
    label: '上传',
    componentProps: {
      listType: 'link',
      accept: '.jpg, .jpeg, .png, .xlsx, .xls, .pdf',
      sizeLimit: '10MB',
      limit: 5
    },
    required: true
  }
]

const form = ref()
const data = reactive<any>({
  sku: 'A0000131600001',
  value0: 0
})
async function onSubmit() {
  await form.value?.validate()
  Message.success('submit success')
}
function onReset() {
  form.value?.reset()
}
</script>

<template>
  {{ data }}
  <y-form
    ref="form"
    :model="data"
    :items="items"
    :inputDefaultPlaceholder="false"
  >
    <template #item-username-prefix> 输入框前缀 </template>
    <template #label-height>这里是身高标题slot</template>
    <template #item-height="{ props }">
      <y-input v-bind="props" type="number" placeholder="这里是身高内容slot" />
    </template>
    <template #item-summary="{ props }">
      <y-input v-bind="props" placeholder="消息SLot" />
      <y-tooltip>
        <template #title>prompt text</template>
        <y-btn label="弹出消息" />
      </y-tooltip>
    </template>
    <template #action>
      <y-btn primary @click="onSubmit()" label="保存" />
      <y-btn link label="重置" @click="onReset" />
    </template>
  </y-form>
</template>
