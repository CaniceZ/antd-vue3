<script setup lang="ts">
const emit = defineEmits(['hide'])
</script>
<template>
  <y-modal title="slot modal" v-bind="$attrs" @ok="emit('hide')">
    <slot name="customRow" v-bind="{ message: 'here is modal slots' }"></slot>
  </y-modal>
</template>
