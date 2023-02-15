import { defineComponent, VNode } from 'vue'
import { SettingOutlined, TableOutlined } from '@ant-design/icons-vue'
import { getPrefix } from '../../_utils/common'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName] = getPrefix('table-setting-btn')

const TableSettingBtn = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    setHeader: {
      type: Boolean,
      default: true
    },
    setSize: {
      type: Boolean,
      default: true
    },
    gap: {
      type: Number,
      default: 10
    }
  },
  emits: ['setHeader', 'setSize', 'setTableProps'],
  setup(props, { emit, slots, attrs }) {
    function onSetHeader() {
      emit('setHeader')
    }

    function onSelectSize(option: any) {
      const { key } = option

      if (['small', 'middle', 'large'].includes(key)) {
        // > 1.0.0版本可用
        emit('setTableProps', { key: 'size', value: key })
        // 兼容旧版本
        emit('setSize', key)
      }
      if (['bordered', 'no_bordered'].includes(key)) {
        const isBordered = key === 'bordered'
        emit('setTableProps', { key: 'bordered', value: isBordered })
      }
      if (['ellipsis', 'wrap'].includes(key)) {
        const isEllipsis = key === 'ellipsis'
        emit('setTableProps', { key: 'ellipsis', value: isEllipsis })
      }
    }

    return () => {
      return (
        <div {...attrs} class={['table_setting', attrs.class]}>
          <y-space size={props.gap}>
            {slots.prefix?.()}
            {props.setHeader && (
              <div title="配置表头" onClick={onSetHeader}>
                {slots['set-header-btn']?.() || <SettingOutlined />}
              </div>
            )}

            {/* 表格类型 */}
            {props.setSize && (
              <y-dropdown
                placement="bottom"
                trigger="click"
                v-slots={{
                  overlay: () => (
                    <a-menu onClick={onSelectSize}>
                      <a-menu-item key="small">紧凑表格</a-menu-item>
                      <a-menu-item key="middle">标准表格</a-menu-item>
                      <a-menu-item key="large">宽松表格</a-menu-item>
                      <a-menu-item key="bordered">带边框</a-menu-item>
                      <a-menu-item key="no_bordered">无边框</a-menu-item>
                      <a-menu-item key="ellipsis">单元格自动省略</a-menu-item>
                      <a-menu-item key="wrap">单元格自动换行</a-menu-item>
                    </a-menu>
                  )
                }}
              >
                {slots['set-size-btn']?.() || <TableOutlined />}
              </y-dropdown>
            )}
            {slots.suffix?.()}
          </y-space>
        </div>
      )
    }
  }
})

export type TableSettingBtnProps = PropsType<typeof TableSettingBtn>
export type TableSettingBtnExpose = {}
export type TableSettingBtnSlots = Readonly<{
  prefix?(): VNode[]
  'set-header-btn'?(): VNode[]
  'set-size-btn'?(): VNode[]
  suffix?(): VNode[]
}>

export default TableSettingBtn as GlobalComponentConstructor<
  TableSettingBtnProps,
  TableSettingBtnSlots
>
