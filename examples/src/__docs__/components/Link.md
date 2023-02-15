# y-link 链接

文字超链接，继承 a 标签原生属性

## 基本用法

```vue demo
<template>
  <div>
    <y-link label="info" />
  </div>
  <div>
    <y-link
      label="易工品组件库"
      href="https://ygpdv.yigongpin.net/introduce"
      blank
    />
  </div>
</template>
```

## 主题色的链接样式

```vue demo
<template>
  <div>
    <y-link primary label="primary link" />
  </div>
</template>
```

## 自定义颜色的 link

```vue demo
<template>
  <div>
    <y-link color="pink" label="pink link" />
  </div>
</template>
```

## 下划线

```vue demo
<template>
  <div>
    <y-link primary underline label="underline link" />
  </div>
  <div>
    <y-link primary hover-underline label="hover underline link" />
  </div>
</template>
```
