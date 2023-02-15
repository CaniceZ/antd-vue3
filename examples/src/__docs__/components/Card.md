# y-card 卡片

<a-btn label="a-card" href="https://www.antdv.com/components/card-cn" />

完全继承 `a-card` 的属性、事件、插槽、方法，可以通过 <y-link label="a-tag" blank href="https://www.antdv.com/components/card-cn" /> 查看更多选项

## API

<row-start />
<col-start />

## 基本用法

包含标题、内容、操作区域。 可通过设置 size 为 default 或者 small，控制尺寸

```vue demo
<template>
  <y-card title="Default size card" style="width: 300px">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </y-card>
  <br />
  <y-card size="small" title="Small size card" style="width: 300px">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </y-card>
</template>
```

<col-end />
<col-start />

## 更灵活的内容展示

可以利用 Card.Meta 支持更灵活的内容

```vue demo
<template>
  <y-card hoverable style="width: 300px">
    <template #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </template>
    <template #actions>
      <setting-outlined key="setting" />
      <edit-outlined key="edit" />
      <ellipsis-outlined key="ellipsis" />
    </template>
    <y-card-meta title="Card title" description="This is the description">
      <template #avatar>
        <y-avatar src="https://joeschmoe.io/api/v1/random" />
      </template>
    </y-card-meta>
  </y-card>
</template>
<script lang="ts" setup>
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined
} from '@ant-design/icons-vue'
</script>
```

<col-end />
<row-end />

## 网格型内嵌卡片

```vue demo
<template>
  <y-card title="Card Title">
    <y-card-grid style="width: 25%; text-align: center">Content</y-card-grid>
    <y-card-grid style="width: 25%; text-align: center" :hoverable="false">
      no hover
    </y-card-grid>
    <y-card-grid style="width: 25%; text-align: center">Content</y-card-grid>
    <y-card-grid style="width: 25%; text-align: center">Content</y-card-grid>
    <y-card-grid style="width: 25%; text-align: center">Content</y-card-grid>
    <y-card-grid style="width: 25%; text-align: center">Content</y-card-grid>
    <y-card-grid style="width: 25%; text-align: center">Content</y-card-grid>
    <y-card-grid style="width: 25%; text-align: center">Content</y-card-grid>
  </y-card>
</template>
```

## ygp 的 title 样式

`ygpTitle` 属性显示 ygp 常用的 title 样式

```vue demo
<template>
  <y-card ygpTitle :headStyle="{ background: '#fff' }">
    <template #title>特殊title样式</template>
    <template #extra><a href="#">more</a></template>
    <div>card content</div>
  </y-card>
  <br />
  <y-card :bordered="false" ygpTitle title="特殊title样式">
    <template #extra><a href="#">more</a></template>
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </y-card>
</template>
```
