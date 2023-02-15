# y-import 导入组件

可通过配置化实现的接入 Excel 服务导入

_若应用系统接入 Excel 服务，后端相关可联系 **张居瓦**_

写法

```vue
<template>
  <y-import templateCode="ygp-oms-roleAssigmentImport" />
</template>
```

## API

## 基础用法

仅需提供 templateCode 参数，即可获得 文件导入、导入结果 等功能，默认调用 excel 的接口

```vue demo
<template>
  <y-import templateCode="ygp-oms-roleAssigmentImport" />
</template>
```

## 自定义配置

```vue demo src="./import/ImportBasic.vue"

```

api:props

| 属性名             | 说明                                  | 类型          | 默认值        |
| ------------------ | ------------------------------------- | ------------- | ------------- |
| getBatchNumber     | 导入(获取导入批次号)的 api 方法(必传) | () => Promise |               |
| getImportResult    | 获取导入结果的 api 方法(必传)         | () => Promise |               |
| extraData          | 导入接口的传参放在 extraData 里       | Object        |               |
| label              | 按钮文本/弹窗标题                     | String        | `导入`        |
| showIcon           | 按钮图标                              | Boolean       | `false`       |
| btnProps           | 按钮设置参数，同 y-btn                | Object        |               |
| modelProps         | 导入弹窗设置参数，同 y-model          | Object        |               |
| accept             | 允许上传的格式                        | String        | `.xls, .xlsx` |
| sizeLimit          | 限制文件上传大小                      | String        | `20MB`        |
| templateUrl        | `下载导入模板`的地址                  | String        |               |
| templateCode       | 模板编码（用于 excel 服务的导入）     | String        |               |
| lastResult         | 是否展示`最近导入记录`                | Boolean       | `true`        |
| importLatestResult | 最近导入记录的 api 方法               | () => Promise |               |
| resultProps        | 可设置获取导入结果的相关属性参数      | Object        |               |
| wrapCount          | 获取结果轮询次数，每 3s 请求一次      | Number        | `20`          |

api:slots

| 插槽名           | 说明               | props |
| ---------------- | ------------------ | ----- |
| icon             | 图标插槽           |       |
| addonBefore      | 导入前置内容插槽   |       |
| addonAfter       | 导入后置内容插槽   |       |
| downloadTemplate | `下载导入模板`插槽 |       |

## 判断逻辑

Excel 服务判断逻辑：主要通过文件上传的状态判断，若上传的状态是 **4** 这一直轮询

**status 导入状态：1-全部成功，2-部分成功 3-失败 4-处理中**

PMS 服务判断逻辑：主要通过是否有值返回，返回为空时继续轮询

```typescript
// resultProps
const resultProps = {
  isPms: true, // pms服务的必须要加这个标识
  importBizSet: ['INQUIRY_DRAFT', 'INQUIRY_MATCH_IMPORT'],
  importBiz: 'INQUIRY_DRAFT',
  typeMap: {
    INQUIRY_MATCH_IMPORT: '数据清洗导入',
    INQUIRY_DRAFT: '询价导入'
  },
  extraData: {
    importBiz: 'INQUIRY_DRAFT'
  }
}
```
