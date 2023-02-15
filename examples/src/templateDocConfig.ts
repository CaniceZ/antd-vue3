import Index from './__docs__/templateDoc/index.md'
import Auth from './__docs__/templateDoc/auth.md'
import Deploy from './__docs__/templateDoc/deploy.md'
import Icon from './__docs__/templateDoc/icon.md'
import Introduction from './__docs__/templateDoc/introduction.md'
import Lib from './__docs__/templateDoc/lib.md'
import Lint from './__docs__/templateDoc/lint.md'
import Menu from './__docs__/templateDoc/menu.md'
import Mock from './__docs__/templateDoc/mock.md'
import Router from './__docs__/templateDoc/router.md'
import Settings from './__docs__/templateDoc/settings.md'
import Style from './__docs__/templateDoc/style.md'

const templateRoutes = [
  {
    path: '/template',
    title: '项目模板',
    children: [
      { path: '/introduce', title: '简介', component: Introduction },
      { path: '/index', title: '开始', component: Index },
      { path: '/settings', title: '项目配置', component: Settings },
      { path: '/router', title: '路由', component: Router },
      { path: '/menu', title: '菜单', component: Menu },
      { path: '/auth', title: '权限', component: Auth },
      { path: '/style', title: '样式', component: Style },
      { path: '/lib', title: '外部模块', component: Lib },
      { path: '/deploy', title: '构建&部署', component: Deploy },
      { path: '/mock', title: '联调&Mock', component: Mock },
      { path: '/icon', title: '图标', component: Icon },
      { path: '/lint', title: '项目规范', component: Lint }
    ]
  }
]

function filter(arr: any[]) {
  arr.forEach(row => {
    if (row.component) {
      row['anchor'] = row.component?.$vd?.toc
    }
    if (row.children) {
      filter(row.children)
    }
  })
}

filter(templateRoutes)

export default {
  title: '项目模板',
  routes: templateRoutes
}
