<template>
    <div>system</div>
</template>
<script setup lang="ts">
import {onMounted} from "vue"
import { creditmanagementPage } from "@/api/home"
onMounted(()=>{
  creditmanagementPage({qq:"15919689346",password: "c8508fee37755bfbf682d0ff9034ac2c"})
})
</script>