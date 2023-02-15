# y-space 间距

<a-btn label="a-space" href="https://next.antdv.com/components/space-cn" />

设置组件之间的间距。继承 `a-space` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-space" href="https://next.antdv.com/components/space-cn" /> 查看更多选项

## API

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

## 基本用法

```vue demo
<template>
  <div>
    <div>间距: small(默认)</div>
    <y-space>
      <y-btn type="primary">Primary</y-btn>
      <y-btn>Default</y-btn>
      <y-btn type="dashed">Dashed</y-btn>
      <y-btn type="link">Link</y-btn>
    </y-space>
    <br />
    <br />
    <div>间距: middle</div>
    <y-space middle>
      <y-btn type="primary">Primary</y-btn>
      <y-btn>Default</y-btn>
      <y-btn type="dashed">Dashed</y-btn>
      <y-btn type="link">Link</y-btn>
    </y-space>
    <br />
    <br />
    <div>间距: large</div>
    <y-space large>
      <y-btn type="primary">Primary</y-btn>
      <y-btn>Default</y-btn>
      <y-btn type="dashed">Dashed</y-btn>
      <y-btn type="link">Link</y-btn>
    </y-space>
    <br />
    <br />
    <div>垂直间距</div>
    <y-space vertical>
      <y-btn type="primary">Primary</y-btn>
      <y-btn>Default</y-btn>
      <y-btn type="dashed">Dashed</y-btn>
      <y-btn type="link">Link</y-btn>
    </y-space>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      size: ref(8)
    }
  }
})
</script>
```

## 自定义尺寸

```vue demo
<template>
  <div>
    <y-slider v-model="size" />
    <br />
    <br />
    <y-space :size="size">
      <y-btn type="primary">Primary</y-btn>
      <y-btn>Default</y-btn>
      <y-btn type="dashed">Dashed</y-btn>
      <y-btn type="link">Link</y-btn>
    </y-space>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      size: ref(8)
    }
  }
})
</script>
```
