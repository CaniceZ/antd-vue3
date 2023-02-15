import { createApp } from 'vue'
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
