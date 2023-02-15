# y-modal 模态窗

<a-btn label="a-modal" href="https://next.antdv.com/components/modal-cn" />

完全继承 `a-modal` 的属性、插槽、事件和方法，可以通过 <y-link blank label="a-modal" href="https://next.antdv.com/components/modal-cn" /> 查看更多选项

全局导出的 `Modal` 除了完全继承 `info/success/error/warning/confirm/destroyAll` 等方法以外，另外扩展了一个 `create` 方法，用于创建全局自定义模态窗，详情见下方示例

## API

api:props

| 属性名         | 说明                                           | 类型    | 默认值 |
| -------------- | ---------------------------------------------- | ------- | ------ |
| modelValue     | 表单数据对象                                   | boolean | false  |
| destroyOnClose | 关闭时销毁模态窗（默认值预设为 true）          | boolean | true   |
| maskClosable   | 点击背景区域时关闭模态窗（默认值预设为 false） | boolean | false  |

api:emits

| 事件名 | 说明                                                                          | 回调参数 |
| ------ | ----------------------------------------------------------------------------- | -------- |
| hide   | 隐藏模态窗事件（与原有 hide 事件的区别在于，已封装至 after-close 属性中触发） |          |
| cancel | 取消模态窗事件                                                                |          |

api:methods

| 方法名 | 说明       | 参数 | 返回值 |
| ------ | ---------- | ---- | ------ |
| show   | 显示模态窗 |
| hide   | 隐藏模态窗 |      |        |

api:Modal

| 方法名 | 说明       | 参数                      | 返回值                                    |
| ------ | ---------- | ------------------------- | ----------------------------------------- |
| create | 创建模态窗 | Component, ComponentProps | { onOk, onCancel, onHide, hide, destroy } |

## 基本用法

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

function show() {
  visible.value = true
}
</script>

<template>
  <y-btn primary label="展示常规模态窗" @click="show" />
  <y-modal v-model="visible">
    <h1>Hello World!</h1>
  </y-modal>
</template>
```

## 使用 Modal.create 打开自定义模态窗

用 `Modal.create` 方法创建模态窗，有利于逻辑解耦，快来试试吧

```vue demo src="./modal/ModalGlobal.vue"

```

如要创建可受`Modal.create`支持的组件，则需要遵守个别约定，如：`ygp-modal`必须加上`v-bind="$attrs"`属性透传，详情见该范例：`ModalLogin.vue`

```vue demo src="./modal/ModalLogin.vue"

```

## 全局 Modal API

```vue demo
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { Modal } from '@ygp/ygp-design-vue'

function onInfo() {
  Modal.info('正常提示')
}

function onSuccess() {
  Modal.success('成功提示')
}

function onError() {
  Modal.error('错误提示')
}

function onWarning() {
  Modal.warning('警告提示')
}

function onConfirm() {
  Modal.confirm({
    title: '确认',
    content: '确定xxxx吗？'
  })
}

function onCreate() {
  Modal.create('默认提示窗口')
}

function onCreate2() {
  Modal.create('默认提示窗口', {
    title: '自定义标题'
  })
}

function onCreate3() {
  Modal.create('试试点击取消/关闭，点击确定')
    .onOk(() => {
      message.success('点击了确定')
    })
    .onCancel(() => {
      message.error('操作取消')
    })
}
</script>
<template>
  <y-space>
    <y-btn label="Modal.info.信息提示" @click="onInfo()" />
    <y-btn label="Modal.success.成功提示" @click="onSuccess()" />
    <y-btn label="Modal.error.失败提示" @click="onError()" />
    <y-btn label="Modal.warning.警告提示" @click="onWarning()" />
    <y-btn label="Modal.confirm.确认提示" @click="onConfirm()" />
  </y-space>
  <y-divider />
  <y-space>
    <y-btn label="Modal.create.默认提示信息" @click="onCreate()" />
    <y-btn label="Modal.create.自定义标题的提示" @click="onCreate2()" />
    <y-btn label="Modal.create.获取确认与取消回调的提示" @click="onCreate3()" />
  </y-space>
</template>
```

## 使用 Modal.create 打开 `tsx` 类型的 modal 组件

```vue demo
<script setup lang="ts">
import { h } from 'vue'
import { Modal } from '@ygp/ygp-design-vue'
import TsxModal from './modal/TsxModal'
import FunctionalModal from './modal/FunctionalModal'

function onClick() {
  Modal.create(
    TsxModal,
    {},
    {
      customRow: message => h('h1', message)
    }
  )
}
function onClick2() {
  Modal.create(FunctionalModal)
}
</script>
<template>
  <y-space>
    <y-btn label="打开tsx modal" @click="onClick" />
    <y-btn label="打开functional modal" @click="onClick2" />
  </y-space>
</template>
```

`TsxModal.tsx`

```vue demo src="./modal/TsxModal.tsx"

```

## 通过 Modal.create 传递 slots

```vue demo
<script setup lang="ts">
import { h } from 'vue'
import { Modal } from '@ygp/ygp-design-vue'
import SlotModal from './modal/SlotModal.vue'

function onClick() {
  Modal.create(
    SlotModal,
    {},
    {
      customRow: ({ message }) => h('h1', message)
    }
  )
}
</script>
<template>
  <y-btn label="打开slot modal" @click="onClick" />
</template>
```

`SlotModal.vue`

```vue demo src="./modal/SlotModal.vue"

```
