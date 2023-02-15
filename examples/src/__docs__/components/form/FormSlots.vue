<script lang="ts" setup>
import { FormItem } from '@ygp/ygp-design-vue'

const items: FormItem[] = [
  {
    name: 'height',
    type: 'number',
    label: '身高'
  },
  {
    name: 'summary',
    label: '简介',
    span: 18
  }
]
</script>

<template>
  <y-form :items="items">
    <template #label-height>这里是身高标题slot</template>
    <template #item-height>
      <y-input type="number" placeholder="这里是身高内容slot" />
    </template>
    <template #summary-item-prefix>
      <label style="color: olive">这里是简介ygp-input的prefix slot</label>
    </template>
  </y-form>
</template>
