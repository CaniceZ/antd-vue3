<script lang="ts" setup>
import { Drawer, Message } from '@ygp/ygp-design-vue'
import DrawerLogin from './DrawerLogin.vue'

function show() {
  console.log(12, DrawerLogin)
  const _drawer = Drawer.create(DrawerLogin, {
    title: '登录'
  })
    .onOk(() => {
      // 组件内部手动 emit('ok') 的回调
      Message.success('登录成功')
    })
    .onCancel(() => {
      // drawer组件内部手动 emit('cancel') 的回调
      Message.error('点击了取消或者关闭')
    })
    .onHide(() => {
      // 组件内部手动 emit('hide') 的回调
      Message.info('抽屉藏起来了')
    })

  // 手动隐藏创建的全局模态窗组件
  // _modal.hide()

  // 手动销毁创建的全局模态窗组件
  // _modal.destroy()
}
</script>

<template>
  <y-btn primary label="登录" @click="show" />
</template>
