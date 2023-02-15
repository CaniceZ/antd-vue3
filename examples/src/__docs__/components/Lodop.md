# y-lodop 打印

LODOP 打印组件，调研 CLODOP 打印控件，包含安装教程和检测打印控件是否已安装启动或者需要升级，减少重复检测

## 打印控件安装提示

`hold` 属性，不管是否启动 lodop 打印控件，都一直展示提示语

继承`y-alert`的属性

```vue demo
<template>
  <div>
    <y-lodop-alert hold />
  </div>
</template>
```

## 基本用法

```vue demo
<template>
  <div>
    <y-lodop ref="lodopRef" preview @print="onPrint" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Drawer, YLodopTutorial } from '@ygp/ygp-design-vue'

const lodopRef = ref()
const lodopRef2 = ref()

const onPrint = option => {
  console.log(option, lodopRef.value)
  // todo 打印业务逻辑
  const pdfUrl =
    'https://qiniu-cdn-test.yigongpin.net/uat/spm-quote-img/2022-09-21/6ca3d619e6ce1ec5596a6b5c42b77866.png'
  lodopRef.value.onItemPrint({
    url: pdfUrl,
    type: 'img'
  })
}

function onClick() {
  const pdfUrl =
    'https://qiniu-cdn-test.yigongpin.net/uat/spm-quote-img/2022-09-21/a21532e9718b84ba6233d873fecb05e1.pdf'
  lodopRef.value.onPrintBefore()
  lodopRef.value.onItemPrint({
    url: pdfUrl,
    filename: '支付凭证'
  })
}
</script>
```

## API

api:props

| 属性名              | 说明                                     | 类型      | 默认值 |
| ------------------- | ---------------------------------------- | --------- | ------ |
| label               | 按钮文字                                 | `string`  | '打印' |
| showPrinterSelector | 可选择打印机，选项取本地可选的打印机列表 | `boolean` |        |
| preview             | 是否先预览再打印                         | `boolean` | false  |

api:lodop

| 属性名     | 说明          | 类型    | 默认值 |
| ---------- | ------------- | ------- | ------ |
| LODOP      | LODOP 对象    |         |        |
| lodopExe   | 安装包地址    | string  |        |
| state      | 状态值,       | number  |        |
| msg        | 状态描述      | string  |        |
| needCLodop | 是否是 CLodop | boolean |        |

api:slots

| 插槽名 | 说明     | props |
| ------ | -------- | ----- |
| icon   | 图标插槽 |

api:emits

| 事件名      | 说明       | 回调参数          |
| ----------- | ---------- | ----------------- |
| print       | 打印事件   | `Function(lodop)` |
| printBefore | 打印前校验 | `Function(lodop)` |

api:methods

| 方法名名      | 说明           | 参数                                            | 返回值 |
| ------------- | -------------- | ----------------------------------------------- | ------ |
| clearPrinting | 清除打印中状态 |                                                 |
| onItemPrint   | 打印 pdf       | { url, filename?, type? } `type`可选`pdf` `img` |
| onPrintBefore | 打印前校验     |                                                 |
