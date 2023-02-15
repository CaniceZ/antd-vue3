# y-ciphertext 脱敏

## 用法

```vue
<y-ciphertext :model="data" name="xxx" />
```

## API

api:props

| 参数  | 说明         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| model | 数据对象     | object |
| name  | 脱敏字段名称 | string |

api:emits

| 事件名  | 说明             | 回调参数                |
| ------- | ---------------- | ----------------------- |
| decrypt | 解密后的回调事件 | (value: string) => void |

## 脱敏的使用场景统计以及需要满足的场景

- [x] `y-form` 表单下的 `y-input`
- [ ] `y-form` 表单下的 `y-select`
- [ ] `y-form` 表单下的 `y-auto-complete`
- [x] `y-form` 表单下的 `detail` 模式
- [x] `y-table` 表格下的 `detail` 模式
- [x] 自定义展示脱敏字段
- [x] 自定义脱敏字段输入框
- [x] `y-form`、`y-table` 需要支持配置解密服务前缀
- [x] 每个 `form-item`、每个 `column` 需要支持配置解密服务前缀
- [x] `y-form` 表单下的 `y-input` 禁用/只读解密
- [ ] `y-form` 表单下的 `y-select` 禁用/只读解密

## 全局配置解密的异步函数 `keywordDecryptApi`

`src/main.ts`

```ts
import { createApp } from 'vue'
import App from './App'
import Ygpd from '@ygp/ygp-design-vue'

const app = createApp(App)

app.use(Ygpd, {
  appConfig: {
    // 关键字解密接口
    keywordDecryptApi: async (
      data: { cipherText: string; text: string },
      apiPrefix?: string
    ) => {
      const res = await http.request({
        url: `${apiPrefix}/...`,
        method: 'POST',
        data
      })
      return res.data
    }
  }
})
```

## 表单中或表格中的脱敏字段

**场景有：`y-form` 的编辑和详情、`y-table` 的编辑和详情**

**以上场景均不需要用户处理，不需要修改任何代码**

```vue demo
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFetch } from '@ygp/ygp-design-vue/hooks'

const [demo, loading, refetch] = useFetch(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        parentName: null,
        address: '广州市海珠区华就路10号时代方舟*****',
        address_encrypt:
          'U011ba83c48d7aac00795668614be30d2bc9aa5b1673e9aebde4abfa4fa211e718b1251a13dea74ef0fdb8b4011b61805a04172d1e6c74631249ec8068f239e6a1f',
        customerName: '李**',
        customerName_encrypt: 'U0119c4f4b47020a28561522a599fe28bd3',
        contracts: [
          {
            name: '欧阳**',
            name_encrypt: 'U0116d519a6a07d59ac2f5731f27dc6dd5b',
            phone: '138****8000',
            phone_encrypt: 'U012b6c17559025ab0cb4e1fd2b25e0c57a',
            telPhone: '010-66666666'
          }
        ],
        contractArr: null,
        cname: '张**',
        cname_encrypt: 'U0119c4f4b47020a28561522a599fe28bd3'
      })
    }, 1500)
  })
})

const items = [
  { name: 'customerName', label: '客户姓名', detail: true },
  { name: 'address', label: '地址' },
  { name: 'cname', label: '中文名', disabled: true }
]

const columns = computed(() => [
  { dataIndex: 'name', title: '姓名' },
  { dataIndex: 'phone', title: '手机号', editable: true },
  { dataIndex: 'telPhone', title: '联系电话' }
])
</script>
<template>
  {{ demo }}
  <y-divider />
  <y-btn primary label="点击这里刷新数据" @click="refetch" />
  <y-divider />

  <y-spin :spinning="loading">
    <y-form :model="demo" :items="items" preffix="cis" />
    <y-tabs card>
      <y-tab-pane :tab="`联系人信息 (${demo.contracts?.length || 0})`">
        <y-table no-pagination :data="demo.contracts" :columns="columns" />
      </y-tab-pane>
    </y-tabs>
  </y-spin>

  <y-divider left>
    <y-btn label="提交" primary />
  </y-divider>
</template>
```

## 表单中或表格中的脱敏字段支持自定义解密服务器前缀

```vue demo
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFetch } from '@ygp/ygp-design-vue/hooks'

const [demo, loading, refetch] = useFetch(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        parentName: null,
        address: '广州市海珠区华就路10号时代方舟*****',
        address_encrypt:
          'U011ba83c48d7aac00795668614be30d2bc9aa5b1673e9aebde4abfa4fa211e718b1251a13dea74ef0fdb8b4011b61805a04172d1e6c74631249ec8068f239e6a1f',
        customerName: '李**',
        customerName_encrypt: 'U0119c4f4b47020a28561522a599fe28bd3',
        contracts: [
          {
            name: '欧阳**',
            name_encrypt: 'U0116d519a6a07d59ac2f5731f27dc6dd5b',
            phone: '138****8000',
            phone_encrypt: 'U012b6c17559025ab0cb4e1fd2b25e0c57a',
            telPhone: '010-66666666'
          }
        ],
        contractArr: null,
        cname: '张天'
      })
    }, 1500)
  })
})

const items = [
  {
    name: 'customerName',
    label: '客户姓名',
    detail: true,
    decryptApiPrefix: 'scp'
  },
  { name: 'address', label: '地址' },
  { name: 'cname', label: '中文名', detail: true, decryptApiPrefix: 'cis' }
]

const columns = computed(() => [
  { dataIndex: 'name', title: '姓名', decryptApiPrefix: 'spm' },
  {
    dataIndex: 'phone',
    title: '手机号',
    editable: true,
    decryptApiPrefix: 'oms'
  },
  { dataIndex: 'telPhone', title: '联系电话' }
])
</script>
<template>
  {{ demo }}
  <y-divider />
  <y-btn primary label="点击这里刷新数据" @click="refetch" />
  <y-divider />

  <y-spin :spinning="loading">
    <y-form :model="demo" :items="items" decryptApiPrefix="tms" />
    <y-tabs card>
      <y-tab-pane :tab="`联系人信息 (${demo.contracts?.length || 0})`">
        <y-table
          no-pagination
          :data="demo.contracts"
          :columns="columns"
          decryptApiPrefix="ocs"
        />
      </y-tab-pane>
    </y-tabs>
  </y-spin>

  <y-divider left>
    <y-btn label="提交" primary />
  </y-divider>
</template>
```

## 使用脱敏组件

```vue demo
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFetch } from '@ygp/ygp-design-vue/hooks'

const [demo, loading, refetch] = useFetch(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        parentName: null,
        address: '广州市海珠区华就路10号时代方舟*****',
        address_encrypt:
          'U011ba83c48d7aac00795668614be30d2bc9aa5b1673e9aebde4abfa4fa211e718b1251a13dea74ef0fdb8b4011b61805a04172d1e6c74631249ec8068f239e6a1f',
        customerName: '李**',
        customerName_encrypt: 'U0119c4f4b47020a28561522a599fe28bd3',
        contracts: [
          {
            name: '欧阳**',
            name_encrypt: 'U0116d519a6a07d59ac2f5731f27dc6dd5b',
            phone: '138****8000',
            phone_encrypt: 'U012b6c17559025ab0cb4e1fd2b25e0c57a',
            telPhone: '010-66666666'
          }
        ],
        contractArr: null,
        cname: '张天'
      })
    }, 1500)
  })
})

const items = [
  { name: 'customerName', label: '客户姓名', detail: true },
  { name: 'address', label: '地址' },
  { name: 'cname', label: '中文名', detail: true, decryptApiPrefix: 'cis' }
]

const columns = computed(() => [
  { dataIndex: 'customer', title: '客户' },
  { dataIndex: 'telPhone', title: '联系电话' }
])
</script>
<template>
  {{ demo }}
  <y-divider />
  <y-btn primary label="点击这里刷新数据" @click="refetch" />
  <y-divider />

  <y-spin :key="demo" :spinning="loading">
    <y-form :model="demo" :items="items" decryptApiPrefix="tms">
      <template #item-customerName>
        自定义脱敏-<y-ciphertext
          :model="demo"
          decryptApiPrefix="srm"
          name="customerName"
        />
      </template>
    </y-form>
    <y-tabs card>
      <y-tab-pane :tab="`联系人信息 (${demo.contracts?.length || 0})`">
        <y-table
          no-pagination
          :data="demo.contracts"
          :columns="columns"
          decryptApiPrefix="ocs"
        >
          <template #body-cell-customer="{ record }">
            <p>姓名：<y-ciphertext :model="record" name="name" /></p>
            <p style="display: flex; align-items: center;">
              自定义手机输入：
              <y-ciphertext
                :model="record"
                decryptApiPrefix="crm"
                name="phone"
                @decrypt="val => (record.phone = val)"
              >
                <y-input style="width: 200px" v-model="record.phone" />
              </y-ciphertext></p
          ></template>
        </y-table>
      </y-tab-pane>
    </y-tabs>
  </y-spin>

  <y-divider left>
    <y-btn label="提交" primary />
  </y-divider>
</template>
```
