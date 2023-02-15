<script lang="ts" setup>
import { FormItem, Modal, TableColumn, GlobalConfig } from '@ygp/ygp-design-vue'
import type { RuleObject } from 'ant-design-vue/lib/form/interface'
import { reactive, ref, onMounted } from 'vue'

const items: FormItem[] = [
  {
    name: 'username',
    label: '',
    autofocus: true,
    placeholder: '设置`autofocus: true`在页面挂载完的时候自动获取焦点'
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
  },
  {
    name: 'age',
    type: 'number',
    label: '年龄',
    disabled: true,
    required: true,
    placeholder: '设置`disabled: true`禁用组件'
  },
  {
    name: 'height',
    type: 'number',
    label: '身高',
    required: true
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
  }
]

const visibleLine = ref(2)
const formData = reactive({})
const crud = ref()
const tableProps = ref<any>({})

const columns: TableColumn[] = [
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '名称1',
    dataIndex: 'name1'
  },
  {
    title: '名称2',
    dataIndex: 'name2'
  },
  {
    title: '名称3',
    dataIndex: 'name3'
  },
  {
    title: '名称4',
    dataIndex: 'name4'
  },
  {
    title: '名称5',
    dataIndex: 'name5'
  }
]

const data = [
  {
    id: '1',
    name: 'iPhone13',
    status: '已发布'
  },
  {
    id: '2',
    name: 'iPhone13 pro',
    status: '已发布'
  },
  {
    id: '3',
    name: 'iPhone14',
    status: '未发布'
  }
]

function detail(props: any) {
  Modal.info({
    content: '查看详情'
  })
}
function onHide() {
  console.log('on hide')
}

function onExport() {
  console.log('export')
}

function onSetHeader() {
  crud.value.setTableHeader()
}

function onSetTableProps(option: { key: string; value: [string | boolean] }) {
  const { key, value } = option
  tableProps.value[key] = value
  console.log(11, tableProps.value)
  // crud.value.setTableProps(option)
}

onMounted(() => {
  // 需要先全局设置 appName(系统简称) 和 userCode(当前登录用户的userCode)
  GlobalConfig.set({
    appConfig: {
      appName: 'pms',
      userCode: 'test123'
    }
  })
})
</script>

<template>
  <y-page>
    <a-form-item label="通过visibleLine属性控制显示行数">
      <y-slider
        v-model="visibleLine"
        :min="1"
        :max="5"
        :marks="{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }"
      />
    </a-form-item>
    <y-divider />
    <y-search-table
      ref="crud"
      :model="formData"
      rowKey="id"
      :data="data"
      :columns="columns"
      :items="items"
      :visibleLine="visibleLine"
      v-bind="tableProps"
      @export="onExport"
      seq
    >
      <template #top-action>
        <y-btn primary label="创建询价单" />
        <y-btn label="Excel导入询价单" />
        <y-btn label="下载导入模版" />
        <y-btn link label="最近导入记录" />
      </template>
      <template #form-extraAction>
        <y-table-setting-btn
          @setHeader="onSetHeader"
          @setTableProps="onSetTableProps"
        />
      </template>
      <template #body-cell-operation="props">
        <y-btn link label="查看明细" @click="detail(props)" />
      </template>
      <template #form-item-password-prefix> 1234 </template>
    </y-search-table>
  </y-page>
</template>
