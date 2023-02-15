# y-dropdown 下拉菜单

<a-btn label="a-dropdown" href="https://next.antdv.com/components/dropdown-cn" />

完全继承 `a-dropdown` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-dropdown" href="https://next.antdv.com/components/dropdown-cn" /> 查看更多选项

## 基础用法

```vue demo
<template>
  下拉菜单
  <y-dropdown>
    <template #overlay>
      <y-menu @click="handleMenuClick">
        <y-menu-item key="1">
          <UserOutlined />
          1st menu item
        </y-menu-item>
        <y-menu-item key="2">
          <UserOutlined />
          2nd menu item
        </y-menu-item>
        <y-menu-item key="3">
          <UserOutlined />
          3rd item
        </y-menu-item>
      </y-menu>
    </template>
    <y-btn type="primary">
      Button
      <DownOutlined />
    </y-btn>
  </y-dropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const handleMenuClick = e => {
  console.log(e)
}
</script>
```
