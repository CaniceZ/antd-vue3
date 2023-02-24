<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#fff',
        boxShadow: '0 6px 12px 0 rgb(0 21 41 / 12%)'
      }"
    >
      <div class="logo">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFHklEQVRYR42XfWiXVRTHP8f1JsJwJUNp1tCapvNlm29QYcWCwlpgRUX9IURBQVBI5uzVUudb2R+B9EYUpC1yBTMwsv4xxxr5VhkyYSSaJFLLgZm13RP3ufc+b7/nmY6x3d/vPs+53/M953zPuQKgby1oYFg7gFZUq1FQFFG7CaogqtF/+8d+b5du3z4JYuzSb0RG/dpu2h/jFqI6hLIbrWqXjkP94g/vRbUmesIbTdb+kAiEA2Z/o3X6kAhd6n0PPrYXgPh3BAahapHom/N3gC71dhGP1HmeOyx4mvcw5XnCVB5MGqBnEumyAM6oarWkaAqHOy/jhx3dgaHYw0Bt8mzG62jbGpJUWGLHhkS3zHNB9BSm45xmwcUvTXvK6CiMhNi7MypzQ/SNlojpKKGifZ9kBZ5alsKzFfHPxbgs9hkgUUhfb7HkZDM8ne0WnAdW7EUq2/NJGYPKe65gnMOim1t8YANFngX70aRoLyote6A1FMe5vIqK6HclvdmGIEt7SD6b0eHcwrK7IO05zzPaEBJxU7Mr7YzYeOGJ67rEUFHdW2MRvenQJEmeZ0LMxmZNexevC43bpAkRKzmg4vBiRQxAxGywDKRkt6SkRgUWVNAnVkaGy+Q5iJxZ3+R1AJg0A2qn+aRK0RbYGOizeQv1873A5ypg+Dzs74aZrVBdm0hzcMq+aw/u7YLzfztJNx0WgE+ItrVoTR1yqDvoknvh8nHI7c+g7y8DMwLX3eSMT1kA4yfBD1+4z2cHYe/H8NwuOHkETvyScsY62ACzboMVzTA84hqbWdcU54A8uh2qLkUHf3M1GoRp3FVQ14iuuxnOnUkk9YGNYAx0rky+u+QKZE0f+vVWOH44YcFWTPMSqK2HTffFz4uunRuJmj1OVvTAn8dh6JSn2He/mmvg937oXJ6V06d2wI+74Nt3goxC9US48+nkswU4Zox7b2QYvtsOx36KgcUARAV9eCsyYSq677O4N0RPWiNn/4K+zsRTqUJW96HbnoXD3yTft62Eljb44wQyeSba8ymycClqwzHpetjzCXy+wQEwNgSvzXU5cOW1cMuTyA2t6N4PoGExXDYW9nVB4x3w7zl4+5GEgQn1yPKd6KYlcPpYAuDxd+HUAOzdjqz8Eu3phPomWH8PrNkD3Vugx04AvouaV+e41dga5LFt0LsNPT0A92+A95bB9Fth4YNwcCf8uh8mTnPor5yMNN+N7t7qGLJWDuyEJz50AP77B+pmQn8PUt+EHtkDNz4E69rg5NEkBGa1AyB1c6MK4GA3zL4LbCKe+Bnm3etKxsZ66kIYf3WS2Wm1s0YOfQUzFvveb+Do91A7JSlJe/DAgcy4JhGAoi52QZ0v64JeNAr7f+U7Yl6ZnQhRegbIaHlaTpNWWtbhKtt2eljNDiZiXg4AchNtRla9ggVFs0CLGk4MOtcn0u/lBh0xL1kAuYYRf84bKmhAGdYKBtEQigoQftY0L85y0Y4GiwvP9RX0Bq/LGpFPibLZUMwLszJDaUVcKzzMJVIMPp18ZYwWDKXmeQsgnyQlh+QTMxxeFuNRYh8GFjGrGv3cVXSrKQOWq4q45AqGz6I9L8OR/uiqxjOqVJcPEaPNdaPslV7VwvwfDbxDou2NO9S4q1n0U3KpLKztkGAXO46H6TmM5EKXaPucBsxwryo1F81CPHgGwKlrV6YqCnIpLksdFGVRdCXU9ukNjFR1YLTVhWM0OU2u2hcNOHN5ZQhhN0bb5aOB/v8Bi2vgmvh+i9AAAAAASUVORK5CYII="
          alt=""
        />
        <div class="tit">后台管理系统</div>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys2"
        v-model:openKeys="openKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
        @click="toRouter"
      >
        <a-sub-menu
          v-for="item in userRoutes2?.filter((item3:any)=>!item3.meta.isHidden)"
          :key="item.path"
        >
          <template #title>
            <span>
              <user-outlined />
              {{ item.meta.title }}
            </span>
          </template>
          <a-menu-item
            v-for="item2 in item.children?.filter((item3:any)=>!item3.meta.isHidden)"
            :key="item2.path"
            >{{ item2.meta.title }}</a-menu-item
          >
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px', minHeight: '100vh' }">
      <a-layout-header
        :style="{
          background: '#fff',
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 9,
          boxShadow: 'rgb(0 21 41 / 12%) 0px 0 6px 0px'
        }"
      >
        <a-breadcrumb style="margin: 16px; display: flex; font-weight: 700">
          <a-breadcrumb-item
            v-for="title in $route.matched.map(it => it.meta.title)"
            :key="title"
            >{{ title }}</a-breadcrumb-item
          >
        </a-breadcrumb>
        <div class="header-right">
          <a-avatar src="/public/favicon.ico" />
          <a-dropdown :trigger="['click']">
            <div class="nickname" @click.prevent>{{ nickname }}</div>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="loginOut">
                  <LogoutOutlined />
                  退出系统
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component :is="Component" v-if="isKeepAlive" :key="route.path" />
          </keep-alive>
          <component :is="Component" v-if="!isKeepAlive" />
        </router-view>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { userRoutes } from '../router'
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import watermark from '../utils/watermark'
import { doLogout } from '@/api/user'
import { routerInfo } from '@/api/user'
import { flatten } from '@/utils/permissions.js'

watermark.set('https://github.com/CaniceZ/antd-vue3')
// import { RouteInter } from '../type/type'
const userRoutes2 = ref<any>(userRoutes)
const router = useRouter()
const route = useRoute()
// 二级菜单
const selectedKeys2 = ref([
  route.matched[1].path.split('/')[route.matched[1].path.split('/').length - 1]
])
// 一级菜单
const openKeys = ref([route.matched[0].path])
const isKeepAlive = computed(() => {
  if (route.meta.keepAlive === undefined) {
    return false
  }
  return route.meta.keepAlive
})
const toRouter = ({ keyPath }: { keyPath: string[] }) => {
  router.push(keyPath.join('/'))
  // console.log(item, key, keyPath)
}
const loginOut = async () => {
  const { succeed } = await doLogout()
  if (succeed) {
    quit()
  }
}
const quit = () => {
  //清除本地数据
  localStorage.removeItem('router')
  localStorage.removeItem('userInfo')
  router.push('/login')
}
const nickname = ref()
onBeforeMount(() => {
  nickname.value = JSON.parse(localStorage.getItem('userInfo')).nickname
  routerGet()
})
async function routerGet() {
  // 获取权限
  const { data, succeed } = await routerInfo({})
  if (succeed) {
    if (data && data.length) {
      localStorage.setItem('router', JSON.stringify(data))
      localStorage.setItem('routes', JSON.stringify(flatten(data)))
    }
  }
}
</script>

<style>
.site-layout .site-layout-background {
  background: #fff;
}
</style>
<style lang="less" scoped>
.logo {
  padding: 16px;
  color: #333333;
  display: flex;
  align-items: center;
  img {
    width: 80;
    height: 80;
    vertical-align: top;
  }
  .tit {
    margin-left: 10px;
    opacity: 1;
    font-weight: 700;
  }
}
.header-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nickname {
  margin: 0 20px 0 10px;
  cursor: pointer;
}
</style>
