# y-image 图片

<a-btn label="a-image" href="https://www.antdv.com/components/image-cn" />

可预览的图片

## 基本用法

```vue demo
<template>
  <y-image
    :width="200"
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
</template>
```

## 多张图片预览

```vue demo
<template>
  <y-image-preview-group>
    <y-image :width="200" src="https://aliyuncdn.antdv.com/vue.png" />
    <y-image :width="200" src="https://aliyuncdn.antdv.com/logo.png" />
  </y-image-preview-group>
</template>
```

## 当 src 为空时，自动取 fallback 显示

`PS: 原a-image的src为空时，显示空图，不会显示fallback图片`

```vue demo
<template>
  <y-text strong>a-image</y-text>
  <a-image
    style="border: 1px solid #eee"
    :width="200"
    fallback="https://aliyuncdn.antdv.com/vue.png"
  />
  <y-text strong>y-image</y-text>
  <y-image
    style="border: 1px solid #eee"
    :width="200"
    fallback="https://aliyuncdn.antdv.com/vue.png"
  />
</template>
```
