import { createRouter, createWebHistory } from 'vue-router'
import MyUser from '../views/user/MyUser.vue'
import MyUser2 from '../views/user/MyUser2.vue'
import System from '../views/system/System.vue'
import System2 from '../views/system/System2.vue'
import LayOut from '../components/layout.vue'
const routes = [
  {
    path: '/user',
    component: LayOut,
    meta:{
      title: "用户管理"
    },
    children:[
      {
        path: '/user/user-1',
        component: MyUser,
        meta:{
          title: "用户管理-1"
        },
      },
      {
        path: '/user/user-2',
        component: MyUser2,
        meta:{
          title: "用户管理-2"
        },
      },
      {
        path: '/user/user-3',
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
    component: LayOut,
    meta:{
      title: "系统管理"
    },
    children:[
      {
        path: '/system/system-1',
        component: System,
        meta:{
          title: "用户管理-1"
        },
      },
      {
        path: '/system/system-2',
        component: System2,
        meta:{
          title: "用户管理-2"
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
