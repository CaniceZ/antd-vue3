<template>
  <a-radio-group v-model:value="obj.current">
    <a-radio-button v-for="item in obj.routerList" :key="item.path" :value="item.path">{{item.meta?.title}}</a-radio-button>
    <!-- <a-radio-button value="b">Shanghai</a-radio-button>
    <a-radio-button value="c">Beijing</a-radio-button>
    <a-radio-button value="d">Chengdu</a-radio-button> -->
  </a-radio-group>
  <router-view></router-view>
</template>
<script lang="ts" setup>
  import { reactive, watch } from "vue"
  import { useRoute, useRouter } from "vue-router"
  const route = useRoute()
  const router = useRouter()
  const obj = reactive({
    current: route.matched[2].path.split("/")[3],
    routerList: router.options.routes.find(item=>item.name === route.matched[0].name)?.children?.find(item2=>item2.name === route.matched[1].name)?.children
  })
  watch(
    () => obj.current,
    (val:any) => {
      if (val) {
        router.push(route.matched[1].path + '/' + val)
        console.log(obj.current)
      }
    },
  );
</script>