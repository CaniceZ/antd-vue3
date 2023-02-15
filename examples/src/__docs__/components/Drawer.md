# y-drawer 抽屉

<a-btn label="a-drawer" href="https://next.antdv.com/components/drawer-cn" />

屏幕边缘滑出的浮层面板。暂时完全继承 `a-drawer` 的属性，可以通过 <y-link blank label="a-drawer" href="https://next.antdv.com/components/drawer-cn" /> 查看更多选项

## 基本用法

```vue demo
<template>
  <y-radio-group
    v-model="placement"
    :options="['top', 'right', 'bottom', 'left']"
    style="margin-right: 8px"
  />
  <a-button type="primary" @click="showDrawer">Open</a-button>
  <y-drawer
    title="Basic Drawer"
    :placement="placement"
    v-model="visible"
    @close="onClose"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </y-drawer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const placement = ref<string>('right')
    const visible = ref<boolean>(false)

    const showDrawer = () => {
      visible.value = true
    }

    const onClose = () => {
      visible.value = false
    }
    return {
      placement,
      visible,
      showDrawer,
      onClose
    }
  }
})
</script>
```

## 创建全局自定抽屉

用全局 `Drawer.create` 方法创建模态窗

```vue demo src="./drawer/DrawerGlobal.vue"

```

如要创建可受`Drawer.create`支持的组件，则需要遵守个别约定，如：`ygp-modal`必须加上`v-bind="$attrs"`属性透传，详情见该范例：`DrawerLogin.vue`

```vue demo src="./drawer/DrawerLogin.vue"

```
