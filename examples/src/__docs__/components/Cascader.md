# y-cascader

<a-btn label="a-cascader" href="https://next.antdv.com/components/cascader-cn" />

完全继承 `a-cascader` 的属性、事件、插槽、方法，可以通过 <y-link blank href="https://next.antdv.com/components/cascader-cn" label="a-cascader"/> 查看更多选项

## 基础用法

```vue demo
<template>
  常规<br />
  <y-cascader
    v-model="value"
    :options="options"
    placeholder="请选择"
    disabled
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['选项', '选项2', '选项3'])
const options = [
  {
    value: '选项',
    label: '选项',
    children: [
      {
        value: '选项2',
        label: '选项2',
        children: [
          {
            value: '选项3',
            label: '选项3'
          }
        ]
      }
    ]
  }
]
</script>
```

```vue demo
<template>
  禁用选项<br />
  <y-cascader v-model="value" :options="options" placeholder="请选择" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
const options = [
  {
    value: '选项0',
    label: '选项',
    children: [
      {
        value: '选项2',
        label: '不可选项',
        disabled: true
      }
    ]
  },
  {
    value: '选项',
    label: '选项',
    children: [
      {
        value: '选项2',
        label: '选项2',
        children: [
          {
            value: '不可选项',
            label: '选项3',
            disabled: true
          },
          {
            value: '选项33',
            label: '选项33'
          },
          {
            value: '选项333',
            label: '选项333'
          }
        ]
      }
    ]
  }
]
</script>
```

```vue demo
<template>
  动态加载选项<br />
  <y-cascader
    v-model="value"
    :options="options"
    :load-data="loadData"
    placeholder="请选择"
    change-on-select
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
const options = ref([
  {
    value: '选项',
    label: '选项',
    isLeaf: false
  },
  {
    value: '选项1',
    label: '选项1',
    isLeaf: false
  }
])
const loadData = selectedOptions => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  targetOption.loading = true
  setTimeout(() => {
    targetOption.loading = false
    targetOption.children = [
      {
        label: `选项2`,
        value: '选项2'
      },
      {
        label: `选项22`,
        value: '选项22'
      }
    ]
    options.value = [...options.value]
  }, 1000)
}
</script>
```
