# y-tooltip

<a-btn label="a-tooltip" href="https://next.antdv.com/components/tooltip-cn" />

完全继承 `a-tooltip` 的属性、事件、插槽、方法，可以通过 <y-link label="a-tooltip" blank href="https://next.antdv.com/components/tooltip-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <y-tooltip>
    <template #title>prompt text</template>
    Tooltip will show when mouse enter.
  </y-tooltip>
</template>
```

```vue demo
<template>
  <div class="demo-placement">
    <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
      <y-tooltip defaultVisible placement="topLeft">
        <template #title>
          <span>通过 defaultVisible 属性设置默认显示</span>
        </template>
        <y-btn>TL</y-btn>
      </y-tooltip>
      <y-tooltip placement="top">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>Top</y-btn>
      </y-tooltip>
      <y-tooltip placement="topRight">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>TR</y-btn>
      </y-tooltip>
    </div>
    <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
      <y-tooltip placement="leftTop">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>LT</y-btn>
      </y-tooltip>
      <y-tooltip placement="left">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>Left</y-btn>
      </y-tooltip>
      <y-tooltip placement="leftBottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>LB</y-btn>
      </y-tooltip>
    </div>
    <div
      :style="{
        width: `${buttonWidth}px`,
        marginLeft: `${buttonWidth * 4 + 24}px`
      }"
    >
      <y-tooltip placement="rightTop">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>RT</y-btn>
      </y-tooltip>
      <y-tooltip placement="right">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>Right</y-btn>
      </y-tooltip>
      <y-tooltip placement="rightBottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>RB</y-btn>
      </y-tooltip>
    </div>
    <div
      :style="{
        marginLeft: `${buttonWidth}px`,
        clear: 'both',
        whiteSpace: 'nowrap'
      }"
    >
      <y-tooltip placement="bottomLeft">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>BL</y-btn>
      </y-tooltip>
      <y-tooltip placement="bottom">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>Bottom</y-btn>
      </y-tooltip>
      <y-tooltip placement="bottomRight">
        <template #title>
          <span>prompt text</span>
        </template>
        <y-btn>BR</y-btn>
      </y-tooltip>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {
      buttonWidth: 70
    }
  }
})
</script>
```

## 自定义 tooltip 的显示和隐藏

```vue demo
<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)
const tooltipRef = ref()
function onClick(flag) {
  if (flag) {
    tooltipRef.value?.show()
  } else {
    tooltipRef.value?.hide()
  }
}
</script>
<template>
  <y-row :gutter="20">
    <y-col :span="10">
      <y-space style="margin-bottom: 10px;">
        <y-btn label="显示/隐藏" @click="visible = !visible" />
        <y-divider vertical />
        <y-tooltip title="自定义tooltip的显示和隐藏" :modelValue="visible">
          <span>自定义tooltip的显示和隐藏</span>
        </y-tooltip>
      </y-space>
      <y-divider style="margin-top: 10px" />
      <y-space>
        <y-btn label="显示" @click="onClick(true)" />
        <y-btn label="关闭" @click="onClick(false)" />
        <y-divider vertical />
        <y-tooltip ref="tooltipRef" title="自定义tooltip的显示和隐藏">
          <span>自定义tooltip的显示和隐藏</span>
        </y-tooltip>
      </y-space>
    </y-col>
    <y-col style="text-align: center;" :span="2">
      <y-divider style="height: 100%;" vertical />
    </y-col>
    <y-col :span="10">
      <y-tooltip :modelValue="true" title="tooltip一直显示">
        <span>tooltip一直显示</span>
      </y-tooltip>
    </y-col>
  </y-row>
</template>
```

## `y-form` 表单里使用

```vue demo
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

const visible = ref(true)
const items = computed(() => [
  {
    label: '自定义tip的显示和隐藏',
    name: 'tooltip',
    tip: {
      modelValue: visible.value,
      title: '自定义tip的显示和隐藏'
    },
    labelTip: {
      modelValue: visible.value,
      title: '自定义labelTip的显示和隐藏'
    }
  },
  {
    label: 'tip一直显示',
    name: 'tooltip2',
    tip: {
      modelValue: true,
      title: 'tip一直显示'
    },
    labelTip: {
      modelValue: true,
      title: 'labelTip一直显示'
    }
  }
])
const formData = reactive({})
</script>
<template>
  <y-form :model="formData" :items="items" />
  <y-divider><y-btn label="显示/隐藏" @click="visible = !visible" /></y-divider>
</template>
```
