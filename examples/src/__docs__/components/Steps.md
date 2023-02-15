# y-steps 步骤条

<a-btn label="a-steps" href="https://next.antdv.com/components/steps-cn" />

继承 `a-steps` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-steps" href="https://next.antdv.com/components/steps-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <p class="mgb32">ygp业务常用样式 步骤条</p>
  <y-steps v-model:current="current" size="small">
    <y-step>
      <template #title>状态文案</template>
      <template #description>
        <span>辅助说明</span>
      </template>
    </y-step>
    <y-step title="进行中" sub-title="子标题" description="辅助说明" />
    <y-step title="error" description="辅助说明" status="error" disabled />
    <y-step title="Waiting" description="辅助说明" />
    <y-step status="wait" title="Done">
      <template #icon>
        <smile-outlined />
      </template>
    </y-step>
  </y-steps>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    SmileOutlined
  },
  setup() {
    const current = ref<number>(1)

    return {
      current
    }
  }
})
</script>
```

```vue demo
<template>
  <p class="mgb32">标签平放图标右侧</p>
  <y-steps :current="1" labelPlacement="horizontal">
    <y-step>
      <template #title>状态文案</template>
      <template #description>
        <span>辅助说明</span>
      </template>
    </y-step>
    <y-step title="进行中" sub-title="子标题" description="辅助说明" />
    <y-step title="Waiting" description="辅助说明" />
    <y-step title="Waiting" description="辅助说明" />
  </y-steps>
</template>
```

```vue demo
<template>
  <p class="mgb32">点状步骤条</p>
  <y-steps progress-dot :current="1">
    <y-step title="Finished" description="This is a description." />
    <y-step title="In Progress" description="This is a description." />
    <y-step title="Waiting" description="This is a description." />
  </y-steps>
</template>
```

```vue demo
<template>
  <p class="mgb32">竖直方向的步骤条</p>
  <y-steps :current="1" direction="vertical">
    <y-step>
      <template #title>状态文案</template>
      <template #description>
        <span>辅助说明</span>
      </template>
    </y-step>
    <y-step title="进行中" sub-title="子标题" description="辅助说明" />
    <y-step title="Waiting" description="辅助说明" />
  </y-steps>
</template>
```

```vue demo
<template>
  <p class="mgb32">导航步骤条</p>
  <y-steps v-model:current="current" type="navigation">
    <y-step status="finish" title="Step 1" />
    <y-step status="process" title="Step 2" />
    <y-step status="wait" title="Step 3" />
  </y-steps>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const current = ref<number>(0)
    return {
      current
    }
  }
})
</script>
```

```vue demo
<template>
  <p class="mgb32">ygp块状步骤条</p>
  <y-steps v-model:current="current" :block="true">
    <y-step title="Step 1" />
    <y-step title="Step 2" />
    <y-step title="Step 3" />
  </y-steps>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const current = ref<number>(0)
    return {
      current
    }
  }
})
</script>
```

## Steps 扩展 Props

| 参数           | 说明                                                                                             | 类型    | 默认值   |
| -------------- | ------------------------------------------------------------------------------------------------ | ------- | -------- |
| type           | 步骤条类型，有 default 和 navigation 两种； 值为 navigation 时，labelPlacement 强制为 horizontal | string  | default  |
| labelPlacement | 指定标签放置位置，默认水平放图标下方，可选 horizontal 放图标右侧                                 | string  | vertical |
| block          | 块状步骤条                                                                                       | Boolean | false    |
