# y-divider 分割线

<a-btn label="a-divider" href="https://next.antdv.com/components/divider-cn" />

完全继承 `a-divider` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-divider" href="https://next.antdv.com/components/divider-cn" /> 查看更多选项

<row-start />
<col-start />

原来的写法

```html
<a-divider orientation="left">水平分割线</a-divider>
<!-- 垂直分割线 -->
<a-divider type="vertical" />
```

<col-end />
<col-start />

新写法

```html
<y-divider left label="水平分割线" />
<!-- 垂直分割线 -->
<y-divider vertical />
```

<col-end />
<row-end />

## API

## 水平分割线

```vue demo
<template>
  <div>
    <p>默认为水平分割线，可在中间加入文字</p>
    <y-divider label="With Text" />
    <p>文字位置在左边</p>
    <y-divider left label="Left Text" />
    <p>文字位置在右边</p>
    <y-divider right label="Right Text" />
  </div>
</template>
```

## 垂直分割线

```vue demo
<template>
  <div>
    Text
    <y-divider vertical />
    <y-link href="#">Link</y-link>
    <y-divider vertical />
    <y-link href="#">Link</y-link>
  </div>
</template>
```

## 样式自定义

```vue demo
<template>
  <div>
    <y-divider style="height: 2px; background-color: #7cb305" />
    <y-divider style="border-color: #7cb305" dashed />
  </div>
</template>
```
