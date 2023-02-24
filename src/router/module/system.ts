const System = () => import('@/views/system/System.vue')
const System2 = () => import('@/views/system/System2.vue')
const LayOut = () => import('@/components/layout.vue')

const system = {
  path: '/system',
  name: 'System',
  component: LayOut,
  meta: {
    title: '系统管理'
  },
  children: [
    {
      path: 'system-1',
      name: 'System1',
      component: System,
      meta: {
        title: 'http请求测试',
        keepAlive: true
      }
    },
    {
      path: 'system-2',
      name: 'System2',
      component: System2,
      meta: {
        title: '系统管理-2'
      }
    }
  ]
}
export default system
