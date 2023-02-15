# y-spin 加载中

<a-btn label="a-spin" href="https://next.antdv.com/components/spin-cn" />

继承 `a-spin` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-spin" href="https://next.antdv.com/components/spin-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <a-spin />
</template>
```

```vue demo
<template>
  <a-spin :indicator="indicator" />
</template>
<script lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue'
import { defineComponent, h } from 'vue'
export default defineComponent({
  setup() {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '24px'
      },
      spin: true
    })
    return {
      indicator
    }
  }
})
</script>
```
