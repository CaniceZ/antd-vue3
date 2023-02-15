# y-descriptions 详情

<a-btn label="a-descriptions / a-descriptions-item" href="https://next.antdv.com/components/descriptions-cn" />

完全继承 `a-descriptions` `a-descriptions-item` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-descriptions / a-descriptions-item" href="https://next.antdv.com/components/descriptions-cn" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-descriptions title="User Info">
  <a-descriptions-item label="UserName">Zhou Maomao</a-descriptions-item>
  <a-descriptions-item label="Telephone">1810000000</a-descriptions-item>
  <a-descriptions-item label="Live">Hangzhou, Zhejiang</a-descriptions-item>
  <a-descriptions-item label="Remark">empty</a-descriptions-item>
  <a-descriptions-item label="Address">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </a-descriptions-item>
</a-descriptions>
```

<col-end />
<col-start />

新写法

```html
<y-descriptions title="User Info">
  <y-descriptions-item label="UserName">Zhou Maomao</y-descriptions-item>
  <y-descriptions-item label="Telephone">1810000000</y-descriptions-item>
  <y-descriptions-item label="Live">Hangzhou, Zhejiang</y-descriptions-item>
  <y-descriptions-item label="Remark">empty</y-descriptions-item>
  <y-descriptions-item label="Address">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </y-descriptions-item>
</y-descriptions>
```

<col-end />
<row-end />

## API

## 基础用法

```vue demo
<script lang="ts" setup></script>
<template>
  <y-descriptions bordered title="这里是标题">
    <y-descriptions-item label="用户名">章三</y-descriptions-item>
    <y-descriptions-item :span="2" label="用户名2">李四</y-descriptions-item>
    <y-descriptions-item label="用户名3">王五</y-descriptions-item>
  </y-descriptions>
</template>
```

```vue demo
<template>
  <y-descriptions title="User Info">
    <y-descriptions-item label="UserName">Zhou Maomao</y-descriptions-item>
    <y-descriptions-item :span="2" label="Telephone"
      >1810000000</y-descriptions-item
    >
    <y-descriptions-item label="Live">Hangzhou, Zhejiang</y-descriptions-item>
    <y-descriptions-item label="Remark">empty</y-descriptions-item>
    <y-descriptions-item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </y-descriptions-item>
  </y-descriptions>
</template>
```
