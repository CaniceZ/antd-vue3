import { createRouter, createWebHistory } from 'vue-router'
const MyUser = () => import('../views/user/MyUser.vue')
const MyUser2 = () => import('../views/user/MyUser2.vue')
const System = () => import('../views/system/System.vue')
const System2 = () => import('../views/system/System2.vue')
const LayOut = () => import('../components/layout.vue')
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/user/user-1',
    meta:{
      title: "主页",
      isHidden: true
    },
  },
  {
    path: '/user',
    component: LayOut,
    name: 'User',
    meta:{
      title: "用户管理"
    },
    children:[
      {
        path: 'user-1',
        name: 'User1',
        component: MyUser,
        meta:{
          title: "用户管理-1",
          keepAlive: true
        },
      },
      {
        path: 'user-2',
        name: 'User2',
        component: MyUser2,
        meta:{
          title: "用户管理-2"
        },
      },
      {
        path: 'user-3',
        name: 'User3',
        component: MyUser2,
        meta:{
          title: "用户管理-3",
          isHidden: true
        },
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: LayOut,
    meta:{
      title: "系统管理"
    },
    children:[
      {
        path: 'system-1',
        name: 'System1',
        component: System,
        meta:{
          title: "系统管理-1",
          keepAlive: true
        },
      },
      {
        path: 'system-2',
        name: 'System2',
        component: System2,
        meta:{
          title: "系统管理-2"
        },
      },
    ]
  },
]

const router = createRouter({
  // @ts-ignored
  history: createWebHistory(),
  routes
})
export const userRoutes = routes
export default router;
