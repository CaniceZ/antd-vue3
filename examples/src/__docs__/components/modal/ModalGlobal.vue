<script lang="ts" setup>
import { Modal, Message } from '@ygp/ygp-design-vue'
import ModalLogin from './ModalLogin.vue'

function show() {
  const _modal = Modal.create(ModalLogin, {
    title: '登录'
  })
    .onOk(() => {
      // 组件内部手动 emit('ok') 的回调
      Message.success('登录成功')
    })
    .onCancel(() => {
      // 弹出窗 cancel 的回调
      Message.error('点击了取消或者关闭')
    })
    .onHide(() => {
      // 组件内部手动 emit('hide') 的回调
      Message.info('模态窗藏起来了')
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
