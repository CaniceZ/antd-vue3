# y-pagination 分页

<a-btn label="a-pagination" href="https://next.antdv.com/components/pagination-cn" />

继承 `a-pagination` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-pagination" href="https://next.antdv.com/components/pagination-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <div>
    <p>基础分页</p>
    <y-pagination v-model:current="current" :total="50" show-less-items />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const current = ref(2)
</script>
```

```vue demo
<template>
  <div>
    <p>简约无边框版分页</p>
    <div class="mgb16">
      <y-pagination :border="false" :total="50" />
    </div>
    <div class="mgb16">
      <y-pagination
        :border="false"
        :total="50"
        show-size-changer
        show-quick-jumper
        :show-total="total => `共 ${total} 条`"
      />
    </div>
    <p>迷你版分页</p>
    <div class="mgb16">
      <y-pagination
        size="small"
        :total="50"
        show-size-changer
        show-quick-jumper
      />
    </div>
    <div class="mgb16">
      <y-pagination
        size="small"
        :total="50"
        :show-total="total => `共 ${total} 条`"
      />
    </div>
  </div>
</template>
```

```vue demo
<template>
  <p>简单的翻页</p>
  <y-pagination simple v-model:current="current" :total="50" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const current = ref<number>(2)
    return {
      current
    }
  }
})
</script>
```

## pagination 扩展 Props

| 参数   | 说明     | 类型    | 默认值 |
| ------ | -------- | ------- | ------ |
| border | 显示边框 | Boolean | true   |
