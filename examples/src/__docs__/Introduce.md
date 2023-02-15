# Ygp Design Vue

> 基于 [Vue3](https://vue3js.cn/docs/zh/guide/introduction.html) 和 [Ant Design Vue](https://next.antdv.com/docs/vue/introduce-cn/) 封装的组件库集合

> 适用于易工品内部中后台系统的通用组件库

## 安装

```bash
# npm
npm install @ygp/ygp-design-vue@latest --registry http://npm.yigongpin.net/

# yarn
yarn add @ygp/ygp-design-vue@latest --registry http://npm.yigongpin.net/
```

## 使用

<row-start />
<col-start />

`src/main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Ygpd from '@ygp/ygp-design-vue'
import '@ygp/ygp-design-vue/dist/ygpdv.less'

const app = createApp(App)
app.use(Antd)
app.use(Ygpd)

app.mount('#app')
```

<col-end />
<col-start />

`vite.config.ts`

```typescript
export default defineConfig({
  ...
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
```

**PS: `vite.config.ts` 中记得启用 less 中的 javascript 解析配置**

<col-end />
<row-end />

## 维护团队

<y-space>
  <y-tooltip title="陆万全">
    <y-link href="https://gitlab.yigongpin.net/luwanquan" blank>
      <a-avatar size="large" src="https://gitlab.yigongpin.net/uploads/-/system/user/avatar/218/avatar.png?width=50" />
    </y-link>
  </y-tooltip>
  <y-tooltip title="谢其恩">
    <y-link href="https://gitlab.yigongpin.net/xieqien" blank>
      <a-avatar size="large">谢其恩</a-avatar>
    </y-link>
  </y-tooltip>
</y-space>

## 贡献者

<y-space>
  <y-tooltip title="谭裕丰">
    <y-link href="https://gitlab.yigongpin.net/tanyufeng" blank>
      <a-avatar size="large">谭裕丰</a-avatar>
    </y-link>
  </y-tooltip>
</y-space>

## 外部依赖

- vue@3.x
- ant-design-vue@alpha.3.x
- @ant-design/icons-vue
- dayjs
- axios

## 使用到的技术

- [Vue3](https://v3.cn.vuejs.org/)
- [Vite2](https://cn.vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/zh/)
- [Jsx/Tsx for Vue3](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)
- [Ant Design Vue](https://next.antdv.com/)
- [Rollup](https://rollupjs.org/guide/en/)
- [Axios](https://axios-http.com/)
- [Lodash](https://lodash.com/docs/4.17.15)
- [VueUse](https://vueuse.org/)
