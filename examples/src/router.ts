import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from './layouts/Layout'
import config from './config'
import templateDocConfig from './templateDocConfig'
import reviewApi from './components/reviewApi'
import wrapRowCol from './components/wrapRowCol'

const expandRoutes = () => {
  let current: RouteRecordRaw[] = []
  const data = [...config.routes, ...templateDocConfig.routes]
  data.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((child: any) => {
        child.path = item.path + child.path
        current.push({
          ...child,
          meta: {
            title: child.title,
            anchor: child.anchor,
            ...(child.meta || {})
          }
        })
      })
    } else {
      current.push({
        ...item,
        meta: {
          title: item.title,
          anchor: item.anchor,
          ...(item.meta || {})
        }
      })
    }
  })

  return current
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: config.routes[0].path,
      children: expandRoutes()
    },
    {
      path: '/util',
      name: 'Util',
      component: () => import('./views/Util.vue')
    }
  ]
})

router.afterEach(wrapRowCol)
router.afterEach(reviewApi)

export default router
