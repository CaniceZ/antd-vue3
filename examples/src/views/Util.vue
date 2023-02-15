<script setup lang="ts">
import { ref } from 'vue'

const parseValue = ref('')
const parseRef = ref()

function onChange(e: any) {
  const value = e.target.value
  const list = value.split('\n').filter(Boolean)
  const res = `const columns: TableColumn[] = [
${list
  .map((title: string) => `  { title: '${title}', dataIndex: 'lulutest' },`)
  .join('\n')}
]`
  parseValue.value = res
}
</script>
<template>
  <div
    style="
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #eee;
    "
  >
    <y-row style="width: 100%; height: 100%" :gutter="20">
      <y-col :span="12" style="height: 100%; padding: 20px">
        <y-input autofocus textarea style="height: 100%" @change="onChange" />
      </y-col>
      <y-col :span="12" style="height: 100%; padding: 20px">
        <y-input
          ref="parseRef"
          v-model="parseValue"
          textarea
          style="height: 100%"
        />
      </y-col>
    </y-row>
  </div>
</template>
