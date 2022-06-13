import { createRouter, createWebHistory } from 'vue-router'
const MyUser = () => import('@/views/user/MyUser.vue')
const MyUser2 = () => import('../views/user/MyUser2.vue')
const System = () => import('../views/system/System.vue')
const System2 = () => import('../views/system/System2.vue')
const Luckydraw = () => import('../views/activity/Luckydraw.vue')
const Luckystar = () => import('../views/activity/Luckystar.vue')
const Luckycloud = () => import('../views/activity/Luckycloud.vue')
const Luckycard = () => import('../views/activity/Luckycard.vue')
const LayOut = () => import('../components/layout.vue')
const ActivityLayOut = () => import('../views/activity/index.vue')
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/activity/luck/luckdraw',
    meta:{
      title: "主页",
      isHidden: true
    },
  },
  {
    path: '/activity',
    component: LayOut,
    name: 'Activity',
    meta:{
      title: "活动"
    },
    children:[
      {
        path: 'luck',
        redirect: '/activity/luck/luckdraw',
        name: 'ActivityLuck',
        component: ActivityLayOut,
        meta:{
          title: "抽奖",
        },
        children:[
          {
            path: 'luckdraw',
            name: 'Luckdraw',
            component: Luckydraw,
            meta:{
              title: "大转盘",
            },
          },
          {
            path: 'luckystar',
            name: 'Luckystar',
            component: Luckystar,
            meta:{
              title: "文字随机",
            },
          },
          {
            path: 'luckycloud',
            name: 'Luckycloud',
            component: Luckycloud,
            meta:{
              title: "cloud滚动",
            },
          },
          {
            path: 'Luckycard',
            name: 'Luckycard',
            component: Luckycard,
            meta:{
              title: "卡片抽奖",
            },
          },
        ]
      },
    ]
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
          title: "http请求测试",
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
