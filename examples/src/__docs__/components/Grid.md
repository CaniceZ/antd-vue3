# Grid 栅格

基于行（row）和列（col）来定义信息区块

<a-btn label="a-row / a-col" href="https://next.antdv.com/components/grid-cn" />

完全继承 `a-row` `a-col` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-row / a-col" href="https://next.antdv.com/components/grid-cn" /> 查看更多选项

## API

## 基本用法

```vue demo
<template>
  <div class="grid-demo">
    <y-row>
      <y-col :span="12">col-12</y-col>
      <y-col :span="12">col-12</y-col>
    </y-row>
    <y-row>
      <y-col :span="8">col-8</y-col>
      <y-col :span="8">col-8</y-col>
      <y-col :span="8">col-8</y-col>
    </y-row>
    <y-row>
      <y-col :span="6">col-6</y-col>
      <y-col :span="6">col-6</y-col>
      <y-col :span="6">col-6</y-col>
      <y-col :span="6">col-6</y-col>
    </y-row>
  </div>
</template>
```
