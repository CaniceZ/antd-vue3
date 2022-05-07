<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
import { creditmanagementPage } from "../api/home"
defineProps<{ msg: string }>()
onMounted(()=>{
  creditmanagementPage({accountOrMobile:"15919689346",password: "c8508fee37755bfbf682d0ff9034ac2c"})
})
const count = ref(0)
const value = reactive([])
const options2: CascaderProps['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <!-- <h1>{{ msg }}</h1> -->
  <a-cascader v-model:value="value" :options="options2" placeholder="Please select" />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
