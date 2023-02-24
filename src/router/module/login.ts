const loginPage = () => import('@/views/login/index.vue')

const login = {
  path: '/login',
  name: 'loginPage',
  meta: {
    title: '登录',
    isHidden: true
  },
  component: loginPage
}
export default login
