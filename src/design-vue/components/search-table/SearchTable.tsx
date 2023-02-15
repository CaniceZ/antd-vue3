import { computed, defineComponent, ref, VNode, watch, camelize } from 'vue'
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useGlobalConfig } from '../../plugins/global-config'
import { filterSlots, getPrefix, parseAttr } from '../../_utils/common'
import { omit } from '../../packages//utils'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { TableExpose, TableProps, TableSlots } from '../table'
import { FormExpose, FormProps, FormSlots } from '../form'
import kebabCase from 'lodash-es/kebabCase'

const [prefixName, prefixCls] = getPrefix('search-table')

const SearchTable = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    visibleLine: {
      type: Number,
      default: 2
    },
    wrapperClassName: [String, Object, Array],
    wrapperStyle: [String, Object]
  },
  emits: ['search'],
  setup(props, { slots, emit, expose, attrs }) {
    const globalConfig = useGlobalConfig()
    const formRef = ref<FormExpose>()
    const tableRef = ref<TableExpose>()

    const model = computed(() => attrs['model'] || {})

    const visible = ref(false)
    const newProps = computed(() => {
      const prefix = `form-`
      return Object.keys(attrs).reduce(
        ([formProps, tableProps], key) => {
          const reg = new RegExp(`^${prefix}(.*?)$`)
          const [, matchName] = kebabCase(key).match(reg) || []
          if (matchName || ['model', 'items'].includes(key)) {
            return [
              {
                ...formProps,
                [matchName ? camelize(matchName) : key]: attrs[key]
              },
              tableProps
            ]
          } else {
            return [formProps, { ...tableProps, [key]: attrs[key] }]
          }
        },
        [{}, {}]
      )
    })
    const formProps = computed(() => newProps.value[0])
    const tableProps = computed(() => newProps.value[1])
    const hideNames = computed(() => {
      const hideNames: string[] = []
      let totalSpan = 0
      formProps.value['items']?.forEach(item => {
        let span = Math.min(24, formRef.value?.getItemSpan(item.span) || 0)
        if (item.row) {
          span = 24 + (24 - (totalSpan % 24))
        } else if (item.newline) {
          span = 24 - ((totalSpan + span) % 24) + span
        }
        if ((totalSpan += span) > 24 * props.visibleLine) {
          hideNames.push(item.name)
        }
      })
      return hideNames
    })

    const stickyAttrs = computed(() => {
      const sticky = globalConfig.appConfig?.searchTableSticky
      if (sticky) {
        return { sticky }
      }
      return {}
    })

    function toggle() {
      visible.value = !visible.value
    }

    function expand() {
      visible.value = true
    }

    function collapse() {
      visible.value = false
    }

    function setTableHeader() {
      tableRef.value?.setHeader()
    }
    function setTableProps(option) {
      tableRef.value?.setTableProps(option)
    }

    async function onSearch() {
      await formRef.value?.validate()
      emit('search')
    }

    function onExport() {
      const exportFn = attrs['onExport']
      if (typeof exportFn === 'function') {
        exportFn()
      }
    }

    async function onReset() {
      await formRef.value?.reset()
      let res
      const resetFn = attrs['onReset']
      if (typeof resetFn === 'function') {
        res = await resetFn()
      }
      if (res !== false) {
        await onSearch()
      }
    }

    expose({
      search: onSearch,
      export: onExport,
      reset: onReset,
      toggle,
      expand,
      collapse,
      form: formRef,
      table: tableRef,
      setTableHeader: setTableHeader,
      setTableProps: setTableProps
    })

    watch([visible, hideNames, formRef], ([visible, names, form]) => {
      if (form) {
        form.showAll()
        visible ? form.show(names) : form.hide(names)
      }
    })

    return () => {
      const formSlots = filterSlots('form-', slots)
      const tableSlots = omit(
        slots,
        Object.keys(formSlots)
          .map(key => `form-${key}`)
          .concat(['top', 'top-action', 'tabs'])
      )
      return (
        <div
          style={props.wrapperStyle}
          class={[
            prefixCls,
            props.wrapperClassName,
            { [`${prefixCls}-fit`]: parseAttr(attrs.fit) }
          ]}
        >
          {(slots.top || slots['top-action']) && (
            <div style="margin-bottom: 16px;">
              {slots.top?.() ||
                (slots['top-action'] && (
                  <y-space
                    v-slots={{
                      default: slots['top-action']
                    }}
                  />
                ))}
            </div>
          )}
          <div class={`${prefixCls}-form`}>
            {slots.form?.() || (
              <y-form
                ref={formRef}
                defaultSpan={6}
                {...formProps.value}
                model={model.value}
                v-slots={{
                  action: () => (
                    <>
                      <y-btn
                        label="查询"
                        onClick={onSearch}
                        primary
                        loading={attrs['loading']}
                      />
                      {attrs['onExport'] && (
                        <y-btn
                          label="导出"
                          onClick={onExport}
                          {...((attrs['export-btn-props'] as object) ||
                            (attrs['exportBtnProps'] as object) ||
                            {})}
                        />
                      )}
                      {(formProps.value?.['items'] || []).length > 0 && (
                        <y-btn
                          link
                          label="重置筛选条件"
                          onClick={onReset}
                          disabled={attrs['loading']}
                        />
                      )}
                      {hideNames.value.length > 0 && (
                        <y-btn onClick={toggle} link>
                          {visible.value ? '收起' : '展开'}
                          {visible.value ? <UpOutlined /> : <DownOutlined />}
                        </y-btn>
                      )}
                    </>
                  ),
                  ...formSlots
                }}
              />
            )}
          </div>
          {slots.tabs && (
            <div class={`${prefixCls}-tabs`}>{slots.tabs?.()}</div>
          )}
          <div class={`${prefixCls}-content`}>
            {slots.default?.({
              tableProps: { ...stickyAttrs.value, ...tableProps.value },
              tableRef,
              tableSlots
            }) || (
              <y-table
                {...stickyAttrs.value}
                ref={tableRef}
                {...tableProps.value}
                v-slots={tableSlots}
              />
            )}
          </div>
        </div>
      )
    }
  }
})

type PrefixForm<T> = {
  [K in keyof T as K extends string ? `form-${K}` : never]: T[K]
}
export type SearchTableProps = PropsType<typeof SearchTable> &
  PropsType<TableProps> &
  Pick<FormProps, 'model' | 'items'> &
  PrefixForm<FormProps>
export type SearchTableExpose = {
  search: () => Promise<any>
  export(): void
  reset: () => Promise<any>
  toggle(): void
  expand(): void
  collapse(): void
  form: FormExpose
  table: TableExpose
  setTableHeader(): void
}
export type SearchTableSlots = TableSlots &
  Readonly<
    {
      top?(): VNode[]
      'top-action'?(): VNode[]
      tabs?(): VNode[]
      [key: `form-${string}`]: () => VNode[]
    } & PrefixForm<FormSlots>
  >
export default SearchTable as GlobalComponentConstructor<
  SearchTableProps,
  SearchTableSlots
>
