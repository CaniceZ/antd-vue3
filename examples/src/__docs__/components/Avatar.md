# y-avatar 头像

<a-btn label="a-avatar" href="https://next.antdv.com/components/avatar-cn" />

完全继承`a-avatar`的属性、事件、插槽、方法，可以通过 <y-link blank label="a-avatar" href="https://next.antdv.com/components/avatar-cn" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-avatar>...</a-avatar>

<a-avatar-group>
  <a-avatar></a-avatar>
</a-avatar-group>
```

<col-end />
<col-start />

新写法

```html
<y-avatar>...</y-avatar>

<y-avatar-group>
  <y-avatar></y-avatar>
</y-avatar-group>
```

<col-end />
<row-end />

## 基本用法

```vue demo
<template>
  <y-space>
    <y-avatar :size="64">
      <template #icon><UserOutlined /></template>
    </y-avatar>
    <y-avatar size="large">
      <template #icon><UserOutlined /></template>
    </y-avatar>
    <y-avatar>
      <template #icon><UserOutlined /></template>
    </y-avatar>
    <y-avatar size="small">
      <template #icon><UserOutlined /></template>
    </y-avatar>
  </y-space>
  <br />
  <br />
  <y-space>
    <y-avatar shape="square" :size="64">
      <template #icon><UserOutlined /></template>
    </y-avatar>
    <y-avatar shape="square" size="large">
      <template #icon><UserOutlined /></template>
    </y-avatar>
    <y-avatar shape="square">
      <template #icon><UserOutlined /></template>
    </y-avatar>
    <y-avatar shape="square" size="small">
      <template #icon><UserOutlined /></template>
    </y-avatar>
  </y-space>
</template>
<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
</script>
```
