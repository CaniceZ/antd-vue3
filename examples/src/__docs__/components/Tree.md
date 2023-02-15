# y-tree

<y-space>
  <a-btn label="a-tree" href="https://next.antdv.com/components/tree-cn" />
</y-space>

继承<code>a-tree</code>的属性、事件、插槽、方法，可以通过 [a-tree](https://next.antdv.com/components/tree-cn) 查看更多选项

## 基础用法

```vue demo
<template>
  <div style="width: 500px">
    <y-tree
      :inputProps="inputProps"
      showSearch
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      v-model:checkedKeys="checkedKeys"
      v-model:searchValue="searchValue"
      :fieldNames="{ title: 'title', key: 'key', children: 'children' }"
      :auto-expand-parent="true"
      checkable
      :tree-data="treeData"
      :custom-name-filter="customNameFilter"
      @valueChange="valueChange"
    >
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </y-tree>
  </div>
</template>

<script lang="ts" setup>
import type { TreeProps } from 'ant-design-vue'
import { ref, watch, reactive } from 'vue'

const treeData: TreeProps['treeData'] = ref([])

setTimeout(() => {
  treeData.value = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { title: 'leaf', key: '0-0-0-1' }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ key: '0-0-1-0', title: 'sss' }]
        }
      ]
    }
  ]
}, 1000)

const expandedKeys = ref<string[]>(['0-0'])
const selectedKeys = ref<string[]>(['0-0'])
const checkedKeys = ref<string[]>([])
const searchValue = ref('')

const inputProps = reactive({
  type: 'search',
  'enter-button': '搜索',
  placeholder: '请输入需要搜索的内容'
})

function customNameFilter(val, item) {
  console.log(val, item)
  return item.title.indexOf(val) > -1 || item.key.indexOf(val) > -1
}

const valueChange = data => {
  console.log(data, 'data')
  expandedKeys.value = data
}
watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys)
})
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys)
})
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys)
})
</script>
```
