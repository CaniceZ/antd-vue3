<template>
    <h2>接口返回数据：</h2>
    <div>{{text}}</div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue"
import { creditmanagementPage } from "@/api/home"
const text = ref<object>({})
onMounted(()=>{
  creditmanagementPage({qq:"15919689346",password: "c8508fee37755bfbf682d0ff9034ac2c"}).then(res=>{
    text.value = res.data
  })
})
</script>