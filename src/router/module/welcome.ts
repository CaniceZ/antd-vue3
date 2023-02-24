const Welecome = () => import('@/views/welcome/index.vue')
const LayOut = () => import('@/components/layout.vue')

const welecome = {
  path: '/',
  redirect: '/welcome',
  component: LayOut,
  name: 'Welcome',
  meta: {
    title: '主页',
    isHidden: true
  },
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: Welecome,
      meta: {
        title: '欢迎',
        keepAlive: true,
        isHidden: true
      }
    }
  ]
}
export default welecome
