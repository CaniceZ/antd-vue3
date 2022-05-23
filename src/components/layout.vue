<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <h3 style="color: #fff">勾八系统</h3>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
           <a-sub-menu :key="item.path" v-for="item in userRoutes2" >
            <template #title>
              <span>
                <user-outlined />
                {{item.meta.title}}
              </span>
            </template>
            <a-menu-item v-for="item2 in item.children.filter(item3=>!item3.meta.isHidden)" :key="item2.path">{{item2.meta.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view v-slot="{ Component }">
            <transition>
              <keep-alive>
              <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { userRoutes } from '../router';
import { ref } from 'vue';
const userRoutes2 = ref<any>(userRoutes)
const selectedKeys2 =ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const openKeys = ref<string[]>(['sub1'])
</script>
<style>
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
