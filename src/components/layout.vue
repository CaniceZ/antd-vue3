<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img src="../assets/img/user.jpeg" alt="">
      </div>
      <h3 class="system-name">G8系统</h3>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          @click="toRouter"
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }">
           <a-sub-menu :key="item.path" v-for="item in userRoutes2.filter((item3:any)=>!item3.meta.isHidden)">
            <template #title>
              <span>
                <user-outlined />
                {{item.meta.title}}
              </span>
            </template>
            <a-menu-item v-for="item2 in item.children.filter((item3:any)=>!item3.meta.isHidden)" :key="item2.path">{{item2.meta.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0;display: flex;">
          <a-breadcrumb-item :key="title" v-for="title in $route.matched.map(it=>it.meta.title)">{{title}}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view v-slot="{ Component,route }">
            <keep-alive>
              <component v-if="isKeepAlive" :key="route.path" :is="Component" />
            </keep-alive>
            <component  v-if="!isKeepAlive" :is="Component" />
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup name="LayOut">
  import { UserOutlined } from '@ant-design/icons-vue';
  import { userRoutes } from '../router';
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router'
  // import { RouteInter } from '../type/type'
  const userRoutes2 = ref<any>(userRoutes)
  const router = useRouter()
  const route = useRoute()
  const selectedKeys2 =ref([route.matched[1].path.split('/')[route.matched[1].path.split('/').length-1]]) // 二级菜单
  const collapsed = ref<boolean>(false)
  const openKeys = ref([route.matched[0].path])  // 一级菜单
  const isKeepAlive = computed(() => {
    if (route.meta.keepAlive === undefined) {
      return false
    }
    return route.meta.keepAlive
  })
  const toRouter =({ keyPath })=>{
    router.push(keyPath.join("/"))
    // console.log(item, key, keyPath)
  }
</script>
<style lang="less">
.header{
  display: flex;
  align-items: center;
}
.logo{
  height: 45px;
  width: 45px;
  border-radius: 3px;
  overflow: hidden;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-right: 12px;
  img{
    width: 100%;
    height: 100%;
  }
}
.system-name {
  color: #fff;
  margin-bottom: 0;
  font-size: 18px;
}
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
