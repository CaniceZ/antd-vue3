# 路由

项目路由配置存放于 [src/router/routes](https://gitlab.yigongpin.net/-/ide/project/ygp-frontend/utils/create-ygp-static/tree/master/-/template-vue-ts/src/router/routes/) 下面。 [src/router/routes/modules](https://gitlab.yigongpin.net/-/ide/project/ygp-frontend/utils/create-ygp-static/tree/master/-/template-vue-ts/src/router/routes/modules/)用于存放业务路由模块，在该目录下的文件会自动注册。

## 配置

### 模块说明

在 [src/router/routes/modules](https://gitlab.yigongpin.net/-/ide/project/ygp-frontend/utils/create-ygp-static/tree/master/-/template-vue-ts/src/router/routes/modules/) 内的 `.ts` 文件会被视为一个路由模块。

### 多级路由

::: warning 注意事项

- 整个项目所有路由 `name` 不能重复
- 所有的多级路由最终都会转成二级路由，所以不能内嵌子路由
- 除了 layout 对应的 path 前面需要加 `/`，其余子路由都不要以`/`开头

:::

**示例**

```ts
import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'

const List = () => import('/@/views/demo/List.vue')
const Detail = () => import('/@/views/demo/Detail.vue')

const demoList: AppRouteModule = {
  path: '/demo',
  name: 'DemoList',
  component: LAYOUT,
  redirect: '/demo/list',
  meta: {
    icon: 'ant-design:file-filled',
    title: 'demo',
    orderNo: 100000
  },
  children: [
    {
      path: 'list',
      name: 'List',
      component: List,
      meta: {
        title: '列表页',
        hideChildrenInMenu: true
      },
      children: [
        {
          path: 'detail',
          name: 'Detail',
          component: Detail,
          meta: {
            title: '详情页',
            currentActiveMenu: '/demo/list'
          }
        }
      ]
    }
  ]
}

export default demoList
```

### Meta 配置说明

```ts
export interface RouteMeta {
  // 菜单排序，只对第一级有效
  orderNo?: number
  // 路由title  一般必填
  title: string
  // 动态路由可打开Tab页数
  dynamicLevel?: number
  // 动态路由的实际Path, 即去除路由的动态部分;
  realPath?: string
  // 是否忽略权限
  ignoreAuth?: boolean
  // 可以访问的角色，暂时没有用到
  roles?: RoleEnum[]
  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean
  // 是否固定标签
  affix?: boolean
  // 图标，也是菜单图标
  icon?: string
  // 内嵌iframe的地址
  frameSrc?: string
  // 指定该路由切换的动画名，有bug，暂时把transition去掉
  transitionName?: string
  // 隐藏该路由在面包屑上面的显示
  hideBreadcrumb?: boolean
  // 如果该路由会携带参数，且需要在tab页上面显示。则需要设置为true
  carryParam?: boolean
  // 隐藏所有子菜单
  hideChildrenInMenu?: boolean
  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
  currentActiveMenu?: string
  // 当前路由不再标签页显示
  hideTab?: boolean
  // 当前路由不再菜单显示
  hideMenu?: boolean
  // 仅构建为菜单
  ignoreRoute?: boolean
  // 是否在子级菜单的完整path中忽略本级path
  hidePathForChildren?: boolean
}
```

### 外部页面嵌套

只需要将 `frameSrc` 设置为需要跳转的地址即可

```ts
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
{
  path: 'doc',
  name: 'Doc',
  component: IFrame,
  meta: {
    frameSrc: 'https://vvbin.cn/doc-next/',
    title: '外嵌页面',
  },
},
```

### 外链

只需要将 `path` 设置为需要跳转的**HTTP 地址**即可

```ts
{
  path: 'https://vvbin.cn/doc-next/',
  name: 'DocExternal',
  component: IFrame,
  meta: {
    title: '外部链接',
  },
}
```

### 动态路由 Tab 自动关闭功能

若需要开启该功能，需要在动态路由的`meta`中设置如下两个参数：

- `dynamicLevel` 最大能打开的 Tab 标签页数
- `realPath` 动态路由实际路径(考虑到动态路由有时候可能存在 N 层的情况, 例：`/:id/:subId/:...`), 为了减少计算开销, 使用配置方式事先规定好路由的实际路径(注意: 该参数若不设置，将无法使用该功能)

```ts
{
  path: 'detail/:id',
  name: 'TabDetail',
  component: () => import('/@/views/demo/feat/tabs/TabDetail.vue'),
  meta: {
    currentActiveMenu: '/feat/tabs',
    title: t('routes.demo.feat.tabDetail'),
    hideMenu: true,
    dynamicLevel: 3,
    realPath: '/feat/tabs/detail',
  },
}
```

## 图标

这里的 `icon` 配置，会同步到 **菜单**（icon 的值可以查看[此处](../components/icon.md)）。

## 新增路由

### 如何新增一个路由模块

1. 在 [src/router/routes/modules](https://gitlab.yigongpin.net/-/ide/project/ygp-frontend/utils/create-ygp-static/tree/master/-/template-vue-ts/src/router/routes/modules/) 内新增一个模块文件。

示例，新增 test.ts 文件

```ts
import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'

const List = () => import('/@/views/demo/List.vue')

const demoList: AppRouteModule = {
  path: '/demo',
  name: 'DemoList',
  component: LAYOUT,
  redirect: '/demo/newList',
  meta: {
    icon: 'ant-design:file-filled',
    title: 'newList',
    orderNo: 100000
  },
  children: [
    {
      path: 'newList',
      name: 'List',
      component: List,
      meta: {
        title: '列表页',
        hideChildrenInMenu: true
      }
    }
  ]
}

export default demoList
```

此时路由已添加完成，不需要手动引入，放在[src/router/routes/modules](https://gitlab.yigongpin.net/-/ide/project/ygp-frontend/utils/create-ygp-static/tree/master/-/template-vue-ts/src/router/routes/modules/) 内的文件会自动被加载。

### 验证

访问 **ip:端口/demo/newList** 出现对应组件内容即代表成功

## 路由刷新

项目中采用的是**重定向**方式

### 实现

```ts
import { useRedo } from '/@/hooks/web/usePage'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const redo = useRedo()
    // 执行刷新
    redo()
    return {}
  }
})
```

### Redirect

区分独立登录和在统一登录中的重定向
[src/views/sys/redirect/index.vue](https://gitlab.yigongpin.net/-/ide/project/ygp-frontend/utils/create-ygp-static/tree/master/-/template-vue-ts/src/views/sys/redirect/index.vue/)

```ts
<template>
  <!-- 重定向，用于当前路由刷新 -->
  <div></div>
</template>
<script lang="ts" setup>
  import { unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isInMicro } from '/@/utils/is';

  const { currentRoute, replace } = useRouter();

  const { params, query } = unref(currentRoute);
  const { path } = params;

  const _path = Array.isArray(path) ? path.join('/') : path;
  console.log('_path', _path);

  if (isInMicro()) {
    const { VITE_APP_NAME, VITE_GLOB_APP_SHORT_NAME } = import.meta.env;
    const newPath = `/${VITE_APP_NAME}/${_path}`;
    window.history.replaceState({}, VITE_GLOB_APP_SHORT_NAME, newPath);
  } else {
    replace({
      path: '/' + _path,
      query,
    });
  }
</script>
```

## 页面跳转

页面跳转建议采用项目提供的 `useGo`

### 方式

```ts
import { useGo } from '/@/hooks/web/usePage'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const go = useGo()

    // 执行刷新
    go()
    go(PageEnum.Home)
    return {}
  }
})
```

## 多标签页

标签页使用的是 `keep-alive` 和 `router-view` 实现，实现切换 tab 后还能保存切换之前的状态。

### 如何开启页面缓存

开启缓存有 3 个条件

1. 在 [src/settings/projectSetting.ts](https://gitlab.yigongpin.net/-/ide/project/ygp-frontend/utils/create-ygp-static/tree/master/-/template-vue-ts/src/settings/projectSetting.ts/) 内将`openKeepAlive` 设置为 `true`
2. 路由设置 `name`，且**不能重复**
3. 路由对应的组件加上 `name`，与路由设置的 `name` 保持一致

```ts
 {
   ...,
    // name
    name: 'Login',
    // 对应组件组件的name
    component: () => import('/@/views/sys/login/index.vue'),
    ...
  },

  // /@/views/sys/login/index.vue
  export default defineComponent({
    // 需要和路由的name一致
    name:"Login"
  });
```

:::warning 注意

keep-alive 生效的前提是：需要将路由的 `name` 属性及对应的页面的 `name` 设置成一样。因为：

**include - 字符串或正则表达式，只有名称匹配的组件会被缓存**
:::

### 如何让某个页面不缓存

**可在 router.meta 下配置**

可以将 `ignoreKeepAlive` 配置成 `true` 即可关闭缓存。

```ts
export interface RouteMeta {
  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean
}
```

## 如何更改首页路由

首页路由指的是应用程序中的默认路由，当不输入其他任何路由时，会自动重定向到该路由下，并且该路由在 Tab 上是固定的，即使设置`affix: false`也不允许关闭

例：首页路由配置的是`/welcome/index`，那么当直接访问 `http://localhost:3100/` 会自动跳转到`http://localhost:3100/#/welcome/index` 上(用户已登录的情况下)

可以将`pageEnum.ts`中的`BASE_HOME`更改为需要你想设置的首页即可

```ts
export enum PageEnum {
  // basic home path
  // 更改此处即可
  BASE_HOME = '/welcome'
}
```
