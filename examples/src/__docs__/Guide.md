# Guide 使用指南

## 我们的组件库主要解决什么问题？

1. 组件分散
1. 组件冗余
1. 不符合 UI 规范
1. 迁移代码不兼容
1. 缺少文档
1. 维护困难
1. 扩展性不佳
1. ...

## 之前的会议达成了哪些共识？

1. 技术架构采用 `vue3 + ant-design-vue`
1. 只在新项目中使用，暂不考虑 `vue2` 的旧项目
1. 暂时不考虑按需加载问题

## 哪些项目正在使用？

1. **[CIS - 中央库存系统](https://gitlab.yigongpin.net/ygp-frontend/ygp-cis-static)**
1. **[PCS - 项目协办](https://gitlab.yigongpin.net/ygp-frontend/ygp-pcs-static)**
1. **SCP - 供应链协同**

## 我们的组件库支持按需加载吗？

- 组件库的内容分为以下几个模块

  - component (default) - 不支持按需加载（原因是内部组件互相引用，耦合度略高）
  - /hooks - 支持按需加载
  - /utils - 支持按需加载
  - /http - 支持按需加载

- _由于我们组件库的代码量并不大，所以暂不需要过度考虑组件按需加载的需求_

## 我们的组件库有多大?

- 打包后的大小数据经过统计如下

  - `@ygp/ygp-design-vue` 约 **62KB / gzip 后约 18KB**
  - `ant-design-vue` 约 **1.5MB / gzip 后约 383KB**

## 项目中组件库版本升级时需要注意什么问题？

- 需要特别关注[更新日志](https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/-/blob/master/CHANGELOG.md)，特别是标识了 `BREAKING CHANGE 💥` 的破坏性更新
- 多人开发的项目中尽可能避免多人同时更新版本导致代码冲突，尽可能由指定的一人实时跟进组件库版本内容来进行统一的更新
- 需要注意组件库的 `latest` `alpha` `beta` 等版本的意义以及相应的更新命令

  - `npm install @ygp/ygp-design-vue@latest`
  - `npm install @ygp/ygp-design-vue@alpha`
  - `npm install @ygp/ygp-design-vue@beta`

<!-- ## 我们的组件库未来有哪些版本计划？

- 在 xxx(待内部讨论确定) 发布组件库的正式 `v1.0.0`
- 此前组件库将经历 `alpha-x` `beta-x` 版本迭代

  - 计划覆盖 `ant-design-vue` 的全部组件
  - 计划覆盖 `UI规范` 中的全部组件 -->

## 如何发起议题？

新建议题 -> 选择模版 -> 输入内容 -> 提交议题

<a-image src="https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/uploads/1b76c2b3470bdb1598d9f5a6ae012531/image.png" />
<a-image src="https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/uploads/de363829e82e72f6f85679bac775ae76/image.png" />
<a-image src="https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/uploads/ce982f23287bab037bd925b3549b81dd/image.png" />

## 如何认领议题？

议题列表 -> 编辑议题 -> 选择指派人 -> 选择结束日期

<a-image src="https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/uploads/ff90fea25f16bc1e028d411a90921455/image.png" />

## 关于旧系统的接入

- Vue2.x + ant-design-vue/element 系统：SRM、OMS、MWS、大宗系统
  - 此类系统不建议接入组件库。
  - Vue 需要从 V2 升级到 V3，系统业务多且复杂，基础依赖升级影响范围大需要全量回归，投入大产出低。
- Vue3 + ant-design 系统：OCS、TMS
  - ant-design 需要 V2 --> V3
  - OCS 系统业务多且复杂，不建议升级接入
  - TMS 目前业务功能较少，可以考虑接入试用
- Vue3 + element-plus 系统：FMS、CRM、SPM
  - 此类系统可尝试接入组件库，系统多个组件库并存，新增的页面和模块可以使用组件库

## 基于 ant-design-vue 做了哪些 breaking-change？

1. `a-input` `a-input-number` `a-input-search` `a-textarea` `a-input-password` 合并为 `y-input`，相应的 `value(v-model)` 属性改为 `modelValue`
1. `a-checkbox` `a-checkbox-group` 的 `checked(v-model)` `value(v-model)` 属性统一改为 `modelValue`
1. `a-radio` `a-radio-group` 的 `checked(v-model)` `value(v-model)` 属性统一改为 `modelValue`
1. `a-date-picker` `a-range-picker` 合并为 `y-date`，相应的 `value(v-model)` 属性改为 `modelValue`
1. `a-time-picker` `a-timer-range-picker` 合并为 `y-time`，相应的 `value(v-model)` 属性改为 `modelValue`
1. `a-button` 更名为 `y-btn`
1. `a-table` 的 `dataSource` 属性改为 `data`
1. `a-tabs` 的 `activeKey(v-model)` 属性改为 `modelValue`
1. `a-select` 的 `value(v-model)` 属性改为 `modelValue`

## 为了获得更好的 `Typescript` 支持，请安装以下插件

- VS Code

  - ESlint
  - TSlint
  - Vue Language Features (Volar)

- WebStorm

  - 待补充...

- Atom
  - 待补充...

<!-- ## 我们的组件库中有哪些约定？

> 适当的约定能为编码带来更大的效率

1. `y-select` `y-checkbox-group` `y-radio-group` `y-` 等组件的 `options` 由默认的 `{label, value}` 改为 `{name, type}`，同时可以通过 `propMap="{label: 'xxx', value: 'yyy'}"` 进行自定义设置

why

where

when

what

how -->
