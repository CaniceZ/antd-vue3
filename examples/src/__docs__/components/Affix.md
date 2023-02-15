# y-affix 固钉

<a-btn label="a-affix" href="https://next.antdv.com/components/affix-cn" />

完全继承`a-affix`的属性、事件、插槽、方法，可以通过 <y-link blank label="a-affix" href="https://next.antdv.com/components/affix-cn" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-affix>...</a-affix>
```

<col-end />
<col-start />

新写法

```html
<y-affix>...</y-affix>
```

<col-end />
<row-end />

## API

## 基础用法

```vue demo
<template>
  <div style="height: 100vh">
    <y-affix :offset-top="top">
      <y-btn primary @click="top += 10">Affix top</y-btn>
    </y-affix>
    <br />
    <y-affix :offset-bottom="bottom">
      <y-btn primary @click="bottom += 10">Affix bottom</y-btn>
    </y-affix>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const top = ref<number>(10)
    const bottom = ref<number>(10)
    return {
      top,
      bottom
    }
  }
})
</script>
```
