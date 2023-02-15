# y-popover

<a-btn label="a-popover" href="https://next.antdv.com/components/popover-cn" />

继承 `a-popover` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-popover" href="https://next.antdv.com/components/popover-cn" /> 查看更多选项

## API

## 基础用法

```vue demo
<template>
  <div class="demo-placement">
    <a-popover title="Title" trigger="hover">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <a-button>Hover me</a-button>
    </a-popover>
    <a-popover title="Title" trigger="focus">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <a-button>Focus me</a-button>
    </a-popover>
    <a-popover title="Title" trigger="click">
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <a-button>Click me</a-button>
    </a-popover>
  </div>
</template>
```

```vue demo
<template>
  <a-popover trigger="click">
    <template #content>
      <div>气泡提示中，最长宽度为 400px。</div>
    </template>
    <a-button type="primary">触发提示</a-button>
  </a-popover>
</template>
```
