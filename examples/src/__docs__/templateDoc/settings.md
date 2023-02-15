# 项目配置项

用于修改项目的配色、布局、缓存、多语言、组件默认配置

## 环境变量配置

项目的环境变量配置位于项目根目录下的 [.env](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/.env)、[.env.development](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/.env.development)、[.env.production](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/.env.production)、[.env.qiankunLocal](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/.env.qiankunLocal)

具体可以参考 [Vite 文档](https://github.com/vitejs/vite#modes-and-environment-variables)

```bash
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
.env.qiankunLocal   # 统一登录本地调试用到的配置

```

::: tip 温馨提醒

- 只有以 `VITE_ ` 开头的变量会被嵌入到客户端侧的包中，可以项目代码中这样访问它们：

```js
console.log(import.meta.env.VITE_PROT)
```

- 以 `VITE_GLOB_*` 开头的的变量，在打包的时候，会被加入[\_app.config.js](#生产环境动态配置)配置文件当中.

- 建议本地设置一个 .env.development.local 用于本地开发的配置

:::

### 配置项说明

### .env

所有环境适用

```bash
# 端口号
VITE_PORT=3100

# 公共路径
VITE_PUBLIC_PATH = /

# 应用基本接口地址
VITE_GLOB_API_URL= /api

# 系统简称
VITE_APP_NAME = temp

# 系统编码（对应ucs上的设置）
VITE_APP_CODE = 521

# 系统标题
VITE_GLOB_APP_TITLE = 中后台管理系统

# 系统名，用于配置文件名字 不要出现空格、数字开头等特殊字符
VITE_GLOB_APP_SHORT_NAME = ygp_template_static
```

### .env.development

开发环境适用

```bash
# port
VITE_PORT = 3101

# 是否使用mock
VITE_USE_MOCK = true

# 是否删除所有日志打印
VITE_DROP_CONSOLE = false

# 公共路径
VITE_PUBLIC_PATH = /

# 是否开启路由/菜单权限，为 true 则根据ucs系统设置的菜单权限展示
VITE_ROUTE_PERMISSION = false

# 接口前缀，有些系统所有接口地址都有前缀，可以在这里统一加，方便切换
VITE_GLOB_API_URL_PREFIX=

# 跨域代理，对应设置各个环境
VITE_SERVICE_URL = http://gateway-dev1.yigongpin.net

```

::: warning 注意

这里配置的 `VITE_GLOB_API_URL`, /api 需要是唯一的，不要和接口有的名字冲突

如果你的接口是 `http://localhost:3000/api` 之类的，请考虑将 `VITE_GLOB_API_URL=/xxxx` 换成别的名字

:::

### .env.production

生产环境适用

```bash
# 是否使用mock
VITE_USE_MOCK = false

# 是否删除所有日志打印
VITE_DROP_CONSOLE = true

# 是否启用gzip或brotli压缩。
# 可选：gzip | brotli | none
# 如果你需要多个表格，你可以使用`,`来分隔
VITE_BUILD_COMPRESS = 'none'

# 在使用压缩时是否删除源文件，默认为false
VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE = false

# 接口前缀
VITE_GLOB_API_URL_PREFIX=

#使用PWA
VITE_USE_PWA = false

# 是否与旧版浏览器兼容
VITE_LEGACY = false

# 公共路径，兼容统一登录，改成 系统简称+Assets
VITE_PUBLIC_PATH = /tempAssets

```

### .env.qiankunLocal

统一登录本地调试环境适用

```bash
# 应用基本接口地址
VITE_GLOB_API_URL = /api

# 公共路径，对应 package.json 里统一登录本地调试时启动项目的端口号
VITE_PUBLIC_PATH = http://127.0.0.1:3101

# 使用生成模式
NODE_ENV=production


```

## 生产环境动态配置

### 说明

当执行`yarn build`构建项目之后，会自动生成 `_app.config.js` 文件并插入 `index.html`。

**注意: 开发环境不会生成**

```js
// _app.config.js
// 变量名命名规则  __PRODUCTION__xxx_CONF__   xxx：为.env配置的VITE_GLOB_APP_SHORT_NAME
window.__PRODUCTION__VUE_VBEN_ADMIN__CONF__ = {
  VITE_GLOB_APP_TITLE: '中后台管理系统',
  VITE_GLOB_APP_SHORT_NAME: 'ygp_template_static',
  VITE_GLOB_API_URL: '/app',
  VITE_GLOB_API_URL_PREFIX: '/'
}
```

### 作用

`_app.config.js` 用于项目在打包后，需要动态修改配置的需求，如接口地址。不用重新进行打包，可在打包后修改 `/dist/_app.config.js` 内的变量，刷新即可更新代码内的局部变量。

### 如何获取全局变量

想要获取 `_app.config.js` 内的变量，可以使用 [src/hooks/setting/index.ts](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/src/hooks/setting/index.ts) 提供的函数来进行获取

### 如何新增(新增一个可动态修改的配置项)

1. 首先在 `.env` 或者对应的开发环境配置文件内，新增需要可动态配置的变量，需要以 `VITE_GLOB_`开头

2. `VITE_GLOB_` 开头的变量会自动加入环境变量，通过在 `src/types/config.d.ts` 内修改 `GlobEnvConfig` 和 `GlobConfig` 两个环境变量的值来定义新添加的类型

3. [useGlobSetting](https://github.com/anncwb/vue-vben-admin/tree/main/src/hooks/setting/index.ts) 函数中添加刚新增的返回值即可

```js
const {
  VITE_GLOB_APP_TITLE,
  VITE_GLOB_API_URL,
  VITE_GLOB_APP_SHORT_NAME,
  VITE_GLOB_API_URL_PREFIX,
  VITE_GLOB_UPLOAD_URL,
} = ENV;

export const useGlobSetting = (): SettingWrap => {
  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL
  };
  return glob as Readonly<GlobConfig>;
};

```

## 项目配置

::: warning

项目配置文件用于配置项目内展示的内容、布局、文本等效果，存于`localStorage`中。如果更改了项目配置，需要手动**清空** `localStorage` 缓存，刷新重新登录后方可生效。

:::
todo 目前没有设置配置切换，其实不用存 localStorage 里也可以

### 配置文件路径

[src/settings/projectSetting.ts](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/src/settings/projectSetting.ts)

### 说明

```js
// ! 在更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // 是否显示配置按钮
  showSettingButton: false,

  // 与权限相关的缓存存储在 sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // color
  themeColor: primaryColor,

  // 是否取消菜单, the top, the multi-tab page display, for possible embedded in other systems
  fullContent: false,

  // 内容模式
  contentMode: ContentEnum.FULL,

  // 是否展示logo logo
  showLogo: true,

  // 是否展示底部
  showFooter: false,

  // Header 配置
  headerSetting: {
    // header背景色
    bgColor: '#ffffff',
    fixed: true,
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // 是否显示全屏按
    showFullScreen: true,
    // 是否显示菜单搜索
    showSearch: false
  },

  // Menu 配置
  menuSetting: {
    // sidebar 背景色
    bgColor: '#ffffff',
    // 菜单固定左边
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 在折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 菜单是否可拖拽，鼠标在菜单的右侧有一个拖动栏
    canDrag: false,
    // Whether to show no dom
    show: true,
    // Whether to show dom
    hidden: false,
    // 菜单宽度
    menuWidth: 208,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.LIGHT,
    // 分割菜单
    split: false,
    // 收起的触发位置
    trigger: TriggerEnum.FOOTER,
    // 手风琴模式，只显示一个菜单
    accordion: true,
    // 模块打开方法“单击“|”悬停”
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 固定扩展菜
    mixSideFixed: false
  },

  // 标签页
  multiTabsSetting: {
    cache: true,
    show: true,
    // 是否可以拖放排序选项卡
    canDrag: true,
    // 是否显示操作
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按
    showFold: false
  },

  // Transition Setting
  transitionSetting: {
    // 是否打开页面切换动画
    // 禁用状态还将禁用页面加载状态
    enable: true,

    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // 是否打开页面切换加载
    // 仅在 enable=true 时打开
    openPageLoading: true,

    // 是否要打开顶部的进度栏
    openNProgress: false
  },

  // 是否启用缓存，否则需要每次清除缓
  openKeepAlive: true,

  // 面包屑
  showBreadCrumb: true,

  // 回到顶部按钮
  useOpenBackTop: true,

  //  是否有可能嵌入iframe页面
  canEmbedIFramePage: true,

  // 在切换接口时，是否要删除未关闭的消息并发出通知
  closeMessageOnSwitch: true,

  // 是否取消在切换接口时已发送但未响应的http请求
  removeAllHttpPending: false
}
```

## 缓存配置

用于配置缓存内容加密信息，对缓存到浏览器的信息进行 AES 加密

在 [/@/settings/encryptionSetting.ts](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/src/settings/encryptionSetting.ts) 内可以配置 `localStorage` 及 `sessionStorage` 缓存信息

**前提:** 使用项目自带的缓存工具类 [/@/utils/cache](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/src/utils/cache/index.ts) 来进行缓存操作

```ts
import { isDevMode } from '/@/utils/env'

// 缓存默认过期时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// 开启缓存加密后，加密密钥。采用aes加密
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_'
}

// 是否加密缓存，默认生产环境加密，统一登录本地构建时可设为false方便调试
export const enableStorageEncryption = !isDevMode()
```

## 主题色配置

默认全局主题色配置位于 [build/config/themeConfig.ts](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/build/config/themeConfig.ts) 内

只需要修改 primaryColor 为您需要的配色，然后重新执行 `npm run dev` 即可

```js
/**
 * less global variable
 */
export const primaryColor = '#0960bd'
```

## 样式配置

### css 前缀设置

用于修改项目内组件 class 的统一前缀

- 在 [src/settings/designSetting.ts](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/src/settings/designSetting.ts) 内配置

```ts
export const prefixCls = 'ygp'
```

- 在 [src/style/var/index.less](https://gitlab.yigongpin.net/ygp-frontend/utils/create-ygp-static/-/blob/master/template-vue-ts/src/style/var/index.less) 配置 css 前缀

```less
@namespace: ygp;
```

### 前缀使用

**在 css 内**

```vue
<style lang="less" scoped>
/* namespace已经全局注入，不需要额外在引入 */
@prefix-cls: ~'@{namespace}-app-logo';

.@{prefix-cls} {
  width: 100%;
}
</style>
```

**在 vue/ts 内**

```ts
import { useDesign } from '/@/hooks/web/useDesign'

const { prefixCls } = useDesign('app-logo')

// prefixCls => vben-app-logo
```
