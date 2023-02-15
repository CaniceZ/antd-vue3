import { Tabs as ATabs, TabsProps as ATabsProps } from 'ant-design-vue'
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { getPrefix, suffixUnit } from '../../_utils/common'
import YTab from './Tab'
import { ATabsSlots } from './type'

function isBasicType(val) {
  return typeof val === 'string' || typeof val === 'number'
}

const [prefixName, prefixCls] = getPrefix('tabs')

const Tabs = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number]
    },
    card: {
      type: Boolean,
      default: false
    },
    editableCard: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    propMap: {
      type: Object,
      default: () => ({
        label: 'name',
        value: 'type'
      })
    },
    disabled: {
      type: Boolean,
      default: false
    },
    gutter: Number as PropType<ATabsProps['tabBarGutter']>,
    fit: Boolean,
    bordered: Boolean,
    contentPadding: {
      type: [String, Number],
      default: 0
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, slots, emit }) {
    let initActiveKey = false
    const activeKey = ref(props.modelValue)
    watch(activeKey, val => {
      emit('update:modelValue', val)
      emit('change', val)
    })
    watch(
      () => props.modelValue,
      val => {
        activeKey.value = val
      }
    )
    const type = computed(() => {
      if (attrs.type) {
        return attrs.type as ATabsProps['type']
      } else if (props.card) {
        return 'card'
      } else if (props.editableCard) {
        return 'editable-card'
      } else {
        return 'line'
      }
    })
    const tabBarGutter = computed(() => {
      if (props.gutter !== void 0) {
        return props.gutter
      } else if (['card', 'editable-card'].includes(type.value!)) {
        return -1
      } else {
        return void 0
      }
    })
    return () => (
      <ATabs
        class={[
          prefixCls,
          {
            [`${prefixCls}-fit`]: props.fit,
            [`${prefixCls}-border`]: props.bordered
          }
        ]}
        style={`--tabs-content-padding: ${suffixUnit(props.contentPadding)};`}
        tabBarGutter={tabBarGutter.value}
        {...attrs}
        type={type.value}
        v-model:activeKey={activeKey.value}
        v-slots={{
          ...slots,
          default: () => {
            const childs = slots.default?.()
            if (childs) {
              const allKeyEmpty = childs.every(row => row.key === null)
              return childs.map((child, index) => {
                if (allKeyEmpty) {
                  child.key = index + 1
                }
                if (props.modelValue === void 0 && !initActiveKey) {
                  activeKey.value = child.key as any
                  initActiveKey = true
                }
                return child
              })
            } else {
              return props.options.map((row: any) => (
                <YTab
                  key={isBasicType(row) ? row : row[props.propMap.value]}
                  tab={isBasicType(row) ? row : row[props.propMap.label]}
                  disabled={
                    props.disabled
                      ? true
                      : typeof row === 'object' && row.disabled
                  }
                />
              ))
            }
          }
        }}
      />
    )
  }
})

export type TabsProps = PropsType<typeof Tabs> & PropsType<ATabsProps>
export type TabsExpose = {}
export type TabsSlots = ATabsSlots

export default Tabs as GlobalComponentConstructor<TabsProps, TabsSlots>
