# y-alert 警告提示

<a-btn label="a-alert" href="https://next.antdv.com/components/alert-cn" />

完全继承`a-alert`的属性、事件、插槽、方法，可以通过 <y-link blank label="a-alert" href="https://next.antdv.com/components/alert-cn" /> 查看更多选项

## 基础用法

```vue demo
<template>
  <p>顶部公告</p>
  <y-alert message="Warning text" banner />
  <br />
  <y-alert
    message="Very long warning text warning text text text text text text text"
    banner
    closable
  />
  <br />
</template>
```

```vue demo
<template>
  <p>不同状态样式</p>
  <y-alert message="Success Tips" success showIcon closable />
  <br />
  <y-alert message="Informational Notes" info showIcon />
  <br />
  <y-alert message="Warning" warning type="warning" showIcon />
  <br />
  <y-alert message="Error" error showIcon />
  <br />
  <y-alert
    message="Success Tips"
    description="Detailed description and advices about successful copywriting."
    success
    showIcon
  />
  <br />
  <y-alert
    message="Informational Notes"
    description="Additional description and informations about copywriting."
    info
    showIcon
  />
  <br />
  <y-alert
    message="Warning"
    description="This is a warning notice about copywriting."
    warning
    showIcon
  />
  <br />
  <y-alert
    message="Error"
    description="This is an error message about copywriting."
    error
    showIcon
  />
</template>
```

```vue demo
<template>
  <p>关闭按钮</p>
  <y-alert showIcon>
    <template #message>
      提示文案，常规提示。 <a href="#">文字链接</a>
    </template>
    <template #closeText>
      <y-btn primary label="确定" />
    </template>
  </y-alert>
</template>
```
