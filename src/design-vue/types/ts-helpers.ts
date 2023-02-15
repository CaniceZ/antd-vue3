import {
  VNodeProps,
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes
} from 'vue'

// https://github.com/vuejs/vue-next/blob/d84d5ecdbdf709570122175d6565bb61fae877f2/packages/runtime-core/src/apiDefineComponent.ts#L29-L31
// TODO: This can be imported from vue directly once this PR gets merged: https://github.com/vuejs/vue-next/pull/2403
export type PublicProps = VNodeProps &
  AllowedComponentProps &
  ComponentCustomProps

// Can't use `DefineComponent` because of the false prop inferring behavior, it doesn't pick up the required types when an interface is passed
// This PR will probably solve the problem as it moves the prop inferring behavior to `defineComponent` function: https://github.com/vuejs/vue-next/pull/4465
// GlobalComponentConstructor helper is kind of like the ComponentConstructor type helper, but simpler and keeps the Volar errors simpler,
// and also similar to the usage in official Vue packages: https://github.com/vuejs/vue-next/blob/d84d5ecdbdf709570122175d6565bb61fae877f2/packages/runtime-core/src/components/BaseTransition.ts#L258-L264 or https://github.com/vuejs/vue-router-next/blob/5dd5f47515186ce34efb9118dda5aad0bb773439/src/RouterView.ts#L160-L172 etc.
// TODO: This can be replaced with `DefineComponent` once this PR gets merged: https://github.com/vuejs/vue-next/pull/4465
export type GlobalComponentConstructor<Props = {}, Slots = {}> = {
  new (): {
    $props: PublicProps & Props
    $slots: Slots
  }
}

export type ParseUnionProps<T> = T extends {
  new (...args: any[]): { $props: infer Props }
}
  ? Props
  : T extends () => infer Props
  ? Partial<ExtractPropTypes<Props>>
  : T

export type PropsType<T> = ParseUnionProps<T>

// 首字母大写
type UpperHeadLetter<T> = T extends `${infer FirstLetter}${infer Rest}`
  ? `${Uppercase<FirstLetter>}${Rest}`
  : never

// 小驼峰 camelCase
export type CamelCase<S extends string> =
  S extends `${infer P1}-${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>

// 大驼峰 CamelCase
export type UpperCamelCase<T extends string> = UpperHeadLetter<CamelCase<T>>

// 短横杆
export type KebabCase<
  T extends string,
  A extends string = ''
> = T extends `${infer F}${infer R}`
  ? KebabCase<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A
