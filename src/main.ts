import { createApp } from 'vue'
import { hasBtn, has } from './utils/permissions.js'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Ygpd from './design-vue'
import router from './router'
import './style/index.less'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
app.use(router)
app.use(Ygpd)
import './design-vue/ygpd.less'
app.use(Antd).mount('#app')
app.config.globalProperties.$hasBtn = hasBtn
app.directive('has', {
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el, binding) {
    if (!has(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})
