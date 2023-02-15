# y-popconfirm

<a-btn label="a-popconfirm" href="https://next.antdv.com/components/popconfirm-cn" />

继承 `a-popconfirm` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-popconfirm" href="https://next.antdv.com/components/popconfirm-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <y-popconfirm
    title="确定删除吗?"
    ok-text="确定"
    cancel-text="取消"
    @confirm="confirm"
    @cancel="cancel"
  >
    <a href="#">删除</a>
  </y-popconfirm>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup() {
    const confirm = (e: MouseEvent) => {
      message.success('Click on Yes')
    }

    const cancel = (e: MouseEvent) => {
      message.error('Click on No')
    }
    return {
      confirm,
      cancel
    }
  }
})
</script>
```
