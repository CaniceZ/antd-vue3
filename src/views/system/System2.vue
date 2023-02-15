<template>
  <y-divider left>data</y-divider>
  {{ formData }}
  <y-divider left>编辑状态：<y-switch v-model="editable" /></y-divider>
  <y-table
    ref="tableRef"
    :columns="columns"
    :data="formData"
    :editable="editable"
  />
  <y-divider left>
    <y-space>
      <y-btn label="保存" primary @click="onSave()" />
      <y-btn label="清空校验规则" @click="clearValidate()" />
    </y-space>
  </y-divider>
</template>
<script lang="ts" setup>
import { TableColumn } from '@design-vue'
import { message } from 'ant-design-vue'
import { reactive, ref } from 'vue'

const editable = ref(true)
const tableRef = ref()
const formData = reactive([
  {
    id: Date.now(),
    name: '苹果',
    status: 0,
    statusName: '未出库',
    desc: '没货了'
  },
  {
    id: Date.now() + 1,
    name: '华为',
    status: 1,
    statusName: '已出库'
  }
])

async function onSave() {
  await tableRef.value?.validate()
  message.success('保存成功')
}

function clearValidate() {
  tableRef.value?.form.clearValidate()
}

const options = ref([])

setTimeout(() => {
  options.value = [{ value2: 'luffy' }, { value2: 'nami' }, { value2: 'zoro' }]
}, 8000)

const columns: TableColumn[] = [
  {
    title: '自动完成',
    dataIndex: 'autocomplete',
    type: 'autocomplete',
    required: true,
    item: () => {
      return {
        type: 'autocomplete',
        options: options.value,
        propMap: {
          value: 'value2'
        }
      }
    }
  },
  {
    title: '名称1',
    dataIndex: 'name1',
    required: true
  },
  {
    title: '名称2',
    dataIndex: 'name2',
    required: true
  },
  {
    title: '名称（已出库时禁用）',
    dataIndex: 'name',
    required: true,
    item({ record, index }) {
      return {
        disabled: record['status'] === 1,
        rules:
          index === 2
            ? [
                {
                  validator: async (_rule, value: string) => {
                    if (value && value !== '1234') {
                      return Promise.reject('第三行名称请一定要输入1234')
                    }
                    return Promise.resolve()
                  },
                  trigger: 'change'
                }
              ]
            : []
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    required: true,
    item: ({ record, index, column }) => {
      return {
        type: 'select',
        options: [
          { type: 0, name: '未出库' },
          { type: 1, name: '已出库' }
        ],
        onChange(val, option) {
          if (val || val === 0) {
            record['statusName'] = option.label
          } else {
            delete record['statusName']
          }
        }
      }
    }
  },
  {
    title: '未出库原因（已出库不可编辑）',
    dataIndex: 'desc',
    editable: ({ record }) => record['status'] === 0
  }
]

function onSubmit() {
  console.log('submit')
}
</script>
