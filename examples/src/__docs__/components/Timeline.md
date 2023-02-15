# y-timeline 时间轴

<a-btn label="a-timeline" href="https://next.antdv.com/components/timeline-cn" />

完全继承 `a-timeline` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-timeline" href="https://next.antdv.com/components/timeline-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <y-timeline>
    <y-timeline-item>Create a services site 2015-09-01</y-timeline-item>
    <y-timeline-item>Solve initial network problems 2015-09-01</y-timeline-item>
    <y-timeline-item>Technical testing 2015-09-01</y-timeline-item>
    <y-timeline-item>Network problems being solved 2015-09-01</y-timeline-item>
  </y-timeline>
</template>
```

## 左右交替

```vue demo
<template>
  <y-timeline mode="alternate">
    <y-timeline-item>Create a services site 2015-09-01</y-timeline-item>
    <y-timeline-item color="green"
      >Solve initial network problems 2015-09-01</y-timeline-item
    >
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </y-timeline-item>
    <y-timeline-item color="red"
      >Network problems being solved 2015-09-01</y-timeline-item
    >
    <y-timeline-item>Create a services site 2015-09-01</y-timeline-item>
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      Technical testing 2015-09-01
    </y-timeline-item>
  </y-timeline>
</template>
<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue'
</script>
```

## `couple` 模式，左右成对显示

`mode="couple"`

```vue demo
<template>
  <y-timeline couple>
    <y-timeline-item>
      <template #left>2015-09-01</template>
      <template #right>
        <div>Create a services site</div>
        <div>Create a services site</div>
      </template>
    </y-timeline-item>
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      <template #left></template>
      <template #right>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </template>
    </y-timeline-item>
    <y-timeline-item color="red">
      <template #left>2015-09-01</template>
      <template #right> Network problems being solved </template>
    </y-timeline-item>
    <y-timeline-item>
      <template #left>2015-09-01</template>
      <template #right>Create a services site</template>
    </y-timeline-item>
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      <template #left>2015-09-01</template>
      <template #right>Technical testing</template>
    </y-timeline-item>
  </y-timeline>
</template>
<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue'
</script>
```

## 自定义左宽度

```vue demo
<template>
  <y-timeline couple leftWidth="200px">
    <y-timeline-item>
      <template #left>2015-09-01</template>
      <template #right>
        <div>Create a services site</div>
        <div>Create a services site</div>
      </template>
    </y-timeline-item>
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      <template #left></template>
      <template #right>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </template>
    </y-timeline-item>
    <y-timeline-item color="red">
      <template #left>2015-09-01</template>
      <template #right> Network problems being solved </template>
    </y-timeline-item>
    <y-timeline-item>
      <template #left>2015-09-01</template>
      <template #right>Create a services site</template>
    </y-timeline-item>
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      <template #left>2015-09-01</template>
      <template #right>Technical testing</template>
    </y-timeline-item>
  </y-timeline>
</template>
<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue'
</script>
```

## 自定义右宽度

```vue demo
<template>
  <y-timeline couple leftWidth="calc(100% - 200px)">
    <y-timeline-item>
      <template #right>2015-09-01</template>
      <template #left>
        <div>Create a services site</div>
        <div>Create a services site</div>
      </template>
    </y-timeline-item>
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      <template #right></template>
      <template #left>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </template>
    </y-timeline-item>
    <y-timeline-item color="red">
      <template #right>2015-09-01</template>
      <template #left> Network problems being solved </template>
    </y-timeline-item>
    <y-timeline-item>
      <template #right>2015-09-01</template>
      <template #left>Create a services site</template>
    </y-timeline-item>
    <y-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      <template #right>2015-09-01</template>
      <template #left>Technical testing</template>
    </y-timeline-item>
  </y-timeline>
</template>
<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue'
</script>
```

## Timeline Props

| 属性名 | 说明 | 类型 | 默认值 |
| ------ | ---- | ---- | ------ |
