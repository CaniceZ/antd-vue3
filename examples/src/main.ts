import { createApp } from 'vue'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App'
import router from './router'
import 'vite-plugin-vuedoc/style.css'
import Antd from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'
import Ygpd, { Message } from '@ygp/ygp-design-vue'
import '../../src/design-vue/ygpd.less'
import CommentWrap from './components/CommentWrap'
import ABtn from './components/ABtn'
import CustomPage from './CustomPage.vue'

const app = createApp(App)
const icons: any = Icons

for (const i in icons) {
  app.component(i, icons[i])
}

;['row-start', 'row-end', 'col-start', 'col-end'].forEach(name => {
  app.component(name, CommentWrap(name))
})

app.component('ABtn', ABtn)

app.use(router)
app.use(Antd)
app.use(Ygpd, {
  page: CustomPage,
  appConfig: {
    keywordDecryptApi: async (
      { cipherText, text }: { cipherText: string; text: string },
      prefix: string
    ) => {
      console.log(cipherText, text)
      if (prefix) {
        Message.info(`这里调用的解密服务器是${prefix}`)
      }
      return new Promise(resolve => {
        const res = {
          '李**': '李小明',
          '张**': '张天',
          '欧阳**': '欧阳正华',
          '广州市海珠区华就路10号时代方舟*****':
            '广州市海珠区华就路10号时代方舟西区3A栋',
          '138****8000': '13800138000'
        }[text]
        setTimeout(() => {
          resolve(res)
        }, 1500)
      })
    }
  },
  httpConfig: {
    apiUrl: import.meta.env.VITE_API_URL
  }
})
app.mount('#app')
