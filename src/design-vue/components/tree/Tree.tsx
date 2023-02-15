import { computed, defineComponent, PropType, useSlots, watch } from 'vue'
import { getPrefix } from '../../_utils/common'
import { Tree as ATree, TreeProps as ATreeProps } from 'ant-design-vue'
import useAttrs from '../../_hooks/useAttrs'
import { ATreeSlots } from './type'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'

const [prefixName, prefixCls] = getPrefix('tree')

const treeProps = () => ({
  /** 输入框透传属性 */
  inputProps: {
    type: Object,
    default: () => ({})
  },
  /** 搜索过滤模式 */
  showSearch: {
    type: Boolean,
    default: false
  },
  /** 数据源 */
  treeData: {
    type: Array as PropType<ATreeProps['treeData']>,
    default: () => []
  },
  /** 搜索框 */
  searchValue: {
    type: String
  },
  customNameFilter: Function
})

const Tree = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...treeProps()
  },
  emits: {
    valueChange: (_val: any[]) => true,
    'update:searchValue': (_val: string) => true
  },
  setup(props, { emit }) {
    const attrs = $(useAttrs<ATreeProps>())
    const slots = useSlots() as ATreeSlots
    watch(
      () => props.treeData,
      val => {
        if (props.showSearch) {
          generateList(val)
        }
      }
    )
    const {
      title: name = 'title',
      key = 'key',
      children = 'children',
      leaf = 'leaf'
    } = computed(() => {
      if ('fieldNames' in attrs) {
        return (attrs.fieldNames as never) || attrs['field-names']
      }
      return { title: 'title', key: 'key', children: 'children', leaf: 'leaf' }
    }).value
    const getParentKey = (code, tree) => {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node[children]) {
          if (node[children].some(item => item[key] === code)) {
            parentKey = node[key]
          } else if (getParentKey(code, node[children])) {
            parentKey = getParentKey(code, node[children])
          }
        }
      }
      return parentKey
    }

    let dataList = []
    const generateList = arr => {
      arr.forEach(item => {
        item.isLeaf = item[leaf]
        const child = item[children]
        dataList.push(item as never)
        if (child && Array.isArray(child)) {
          generateList(child)
        }
      })
    }

    const onInputSearch = val => {
      const value = val
      if (!value) {
        return
      }
      const expanded = dataList
        .map((item: object) => {
          const flag = props.customNameFilter
            ? props.customNameFilter(value, item)
            : item[name].indexOf(value) > -1
          if (flag) {
            return getParentKey(item[key], props.treeData)
          }

          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      emit('valueChange', expanded)
      emit('update:searchValue', val)
    }
    return () => {
      return (
        <>
          {props.showSearch && (
            <y-input
              onSearch={onInputSearch}
              {...props.inputProps}
              class="ygp-input-search-md"
            />
          )}
          <ATree
            class={prefixCls}
            {...attrs}
            treeData={props.treeData}
            v-slots={slots}
          />
        </>
      )
    }
  }
})

export type TreeProps = PropsType<typeof Tree> &
  PropsType<ATreeProps> &
  PropsType<typeof treeProps>
export type TreeExpose = {}
export type TreeSlots = ATreeSlots

export default Tree as GlobalComponentConstructor<TreeProps, TreeSlots>
