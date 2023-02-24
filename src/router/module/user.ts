const MyUser = () => import('@/views/user/MyUser.vue')
const MyUser2 = () => import('@/views/user/MyUser2.vue')
const LayOut = () => import('@/components/layout.vue')

const user = {
  path: '/user',
  component: LayOut,
  name: 'User',
  meta: {
    title: '用户管理'
  },
  children: [
    {
      path: 'user-1',
      name: 'User1',
      component: MyUser,
      meta: {
        title: '用户管理-1',
        keepAlive: true
      }
    },
    {
      path: 'user-2',
      name: 'User2',
      component: MyUser2,
      meta: {
        title: '用户管理-2'
      }
    },
    {
      path: 'user-3',
      name: 'User3',
      component: MyUser2,
      meta: {
        title: '用户管理-3',
        isHidden: true
      }
    }
  ]
}
export default user
