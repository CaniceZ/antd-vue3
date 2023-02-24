import { createRouter, createWebHistory } from 'vue-router'
import user from './module/user'
import system from './module/system'
import login from './module/login'
import welecome from './module/welcome'

const commonRoutes = [login, welecome]
const allowRoutes = [user, system]
const routes = [...commonRoutes, ...allowRoutes]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //拦截跳转到无权限的路由
  if (to.path === '/404') {
    return
  }
  //拦截未登录或无权限路由
  if (!localStorage.getItem('userInfo') && to.path !== '/login') {
    router
      .replace({
        path: '/login'
      })
      .catch(() => {})
  } else {
    next()
  }
})

export const userRoutes = routes
export default router
