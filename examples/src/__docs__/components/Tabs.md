# y-tabs 标签页

<a-btn label="a-tabs" href="https://next.antdv.com/components/tabs-cn" />

完全继承 `a-tabs` 的属性、事件、插槽、方法，可以通过 <y-link label="a-tabs" blank href="https://next.antdv.com/components/tabs-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <p>默认选中第一项</p>
  <y-tabs @change="onEmptyChange">
    <y-tab-pane tab="选项一">选项一</y-tab-pane>
    <y-tab-pane tab="选项二">选项二</y-tab-pane>
    <y-tab-pane tab="选项三">选项三</y-tab-pane>
    <y-tab-pane tab="选项四">选项四</y-tab-pane>
  </y-tabs>
  <y-divider />
  <y-tabs v-model="activeKey" @change="onChange">
    <y-tab-pane key="1" tab="选项一">选项一</y-tab-pane>
    <y-tab-pane key="2" tab="选项二" force-render>选项二</y-tab-pane>
    <y-tab-pane key="3" tab="选项三">选项三</y-tab-pane>
  </y-tabs>
  <y-divider />
  <p>用作单选效果，不显示 tab-pane</p>
  <p>tab1: {{ tab1 }}</p>
  <y-tabs v-model="tab1" card>
    <y-tab :key="1" tab="选项一" />
    <y-tab :key="2" tab="选项二" />
    <y-tab :key="3" tab="选项三" />
  </y-tabs>
  <y-divider />
  <p>使用<code>options</code>配置tabs</p>
  <p>tab2: {{ tab2 }}</p>
  <y-tabs
    v-model="tab2"
    card
    :options="[
      { type: 1, name: '选项一' },
      { type: 2, name: '选项二' },
      { type: 3, name: '选项三' }
    ]"
  />
  <y-divider />
  <p>配置基础类型的<code>options</code></p>
  <p>tab3: {{ tab3 }}</p>
  <p>tab4: {{ tab4 }}</p>
  <y-tabs v-model="tab3" card :options="['选项一', '选项二', '选项三']" />
  <y-tabs v-model="tab4" card disabled :options="[1, 2, 3, 4, 5, 6]" />
  <y-divider />
  <p>禁用部分<code>tab</code></p>
  <y-tabs v-model="tab1" card>
    <y-tab :key="1" tab="选项一" />
    <y-tab :key="2" tab="选项二" />
    <y-tab :key="3" tab="选项三" disabled />
  </y-tabs>
  <y-tabs
    v-model="tab2"
    card
    :options="[
      { type: 1, name: '选项一' },
      { type: 2, name: '选项二' },
      { type: 3, name: '选项三', disabled: true }
    ]"
  />
  <y-divider />
  <p>禁用全部<code>tab</code></p>
  <y-tabs
    v-model="tab3"
    disabled
    card
    :options="['选项一', '选项二', '选项三']"
  />
  <y-tabs v-model="tab4" disabled :options="[1, 2, 3, 4, 5, 6]" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@ygp/ygp-design-vue'

const activeKey = ref('1')
const tab1 = ref(1)
const tab2 = ref(1)
const tab3 = ref('选项一')
const tab4 = ref(1)

function onEmptyChange(val) {
  console.log(val)
}

function onChange() {
  Message.info(activeKey.value)
}
</script>
```

```vue demo
<template>
  卡片
  <y-tabs v-model="activeKey" card>
    <y-tab-pane key="1" tab="选项一">选项一</y-tab-pane>
    <y-tab-pane key="2" tab="选项二">选项二</y-tab-pane>
    <y-tab-pane key="3" tab="选项三">选项三</y-tab-pane>
  </y-tabs>
  <br />
  禁用
  <y-tabs v-model="activeKey2">
    <y-tab-pane key="1" tab="选项一">选项一</y-tab-pane>
    <y-tab-pane key="2" tab="选项二" disabled>选项二</y-tab-pane>
    <y-tab-pane key="3" tab="选项三">选项三</y-tab-pane>
  </y-tabs>
  可以在页签右边添加附加操作
  <y-tabs v-model="activeKey3">
    <y-tab-pane key="1" tab="选项一">选项一</y-tab-pane>
    <y-tab-pane key="2" tab="选项二">选项二</y-tab-pane>
    <y-tab-pane key="3" tab="选项三">选项三</y-tab-pane>
    <template #rightExtra>
      <a>链接地址</a>
    </template>
  </y-tabs>
  新增和关闭页签
  <y-tabs v-model="activeKey4" editable-card :gutter="10" @edit="onEdit">
    <y-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
      :closable="pane.closable"
    >
      {{ pane.content }}
    </y-tab-pane>
  </y-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const activeKey = ref('1')
const activeKey2 = ref('1')
const activeKey3 = ref('3')
const panes = ref([
  { title: '选项一', content: '选项一', key: '1' },
  { title: '选项二', content: '选项二', key: '2' },
  { title: '选项三', content: '选项三', key: '3', closable: false }
])
const activeKey4 = ref(panes.value[0].key)
const newTabIndex = ref(0)
const callback = (key: string) => {
  console.log(key)
}

const add = () => {
  activeKey4.value = `newTab${++newTabIndex.value}`
  panes.value.push({
    title: `新增选项${newTabIndex.value}`,
    content: `新增选项${newTabIndex.value}`,
    key: activeKey4.value
  })
}

const remove = (targetKey: string) => {
  let lastIndex = 0
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1
    }
  })
  panes.value = panes.value.filter(pane => pane.key !== targetKey)
  if (panes.value.length && activeKey4.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey4.value = panes.value[lastIndex].key
    } else {
      activeKey4.value = panes.value[0].key
    }
  }
}

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'add') {
    add()
  } else {
    remove(targetKey as string)
  }
}
</script>
```

## 使用 fit 属性自适应固高容器

使用 bordered 添加边框

使用 contentPadding 添加内部内间距

```vue demo
<template>
  <div style="height: 200px; width: 50%">
    <y-tabs card fit bordered contentPadding="10px">
      <y-tab-pane tab="fit 自适应" style="background: pink; overflow-y: auto">
        <p v-for="item in 20" :key="item">hello world!</p>
      </y-tab-pane>
      <y-tab-pane tab="bordered 边框" />
      <y-tab-pane tab="contentPadding 内间距" />
    </y-tabs>
  </div>
</template>
```

## tabPosition 控制头部显示方向

```vue demo
<template>
  <div></div>
  位置切换：<y-radio-group
    v-model="tabPosition"
    button
    :options="['top', 'bottom', 'left', 'right']"
  />
  <y-divider />
  <div style="width: 500px">
    <y-tabs v-model="activeKey" :gutter="50" :tab-position="tabPosition">
      <y-tab-pane key="1" tab="选项一">选项一</y-tab-pane>
      <y-tab-pane key="2" tab="选项二">选项二</y-tab-pane>
      <y-tab-pane key="3" tab="选项三">选项三</y-tab-pane>
    </y-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const tabPosition = ref('top')
    const activeKey = ref('1')

    return {
      tabPosition,
      activeKey
    }
  }
})
</script>
```

api:props

| 属性名         | 说明                                              | 类型                             | 默认值                          |
| -------------- | ------------------------------------------------- | -------------------------------- | ------------------------------- |
| modelValue     | 把 `activeKey(v-model)` 改为 `modelValue`         | string \| number                 |                                 |
| card           | 等同于 type="card"                                | boolean                          | false                           |
| editableCard   | 等同于 type="editableCard"                        | boolean                          | false                           |
| options        | 用于配置单选模式的 tabs                           | array                            | []                              |
| propMap        | 用于配置 options 的字段映射                       | { label: string, value: string } | {label: 'name', value: 'type' } |
| disabled       | 用于禁用全部 tab（目前仅适用于 options 单选模式） | boolean                          | false                           |
| fit            | 里外适应高度 100%                                 | boolean                          |                                 |
| bordered       | 外边框                                            | boolean                          |                                 |
| contentPadding | 内部内间距                                        | string \| number                 |                                 |
