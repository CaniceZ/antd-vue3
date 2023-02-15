import { computed, defineComponent, ref, PropType, watch, nextTick } from 'vue'
import { TableColumn } from './types'
import { MenuOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import cloneDeep from 'lodash-es/cloneDeep'
import Sortable from 'sortablejs'
import { isEmpty } from '../../_utils/common'

export default defineComponent({
  name: 'YTheadConfig',
  inheritAttrs: false,
  props: {
    initColumns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    },
    tableColumns: {
      type: Array as PropType<TableColumn[]>,
      default: () => []
    }
  },
  emits: ['ok'],
  setup(props, { expose, emit }) {
    let visible = ref(false)
    let checkAll = ref(false)
    let checkList = ref<(string | undefined)[]>([])

    const indeterminate = computed(() => {
      return (
        !!checkList.value.length &&
        checkList.value.length < props.initColumns.length
      )
    })

    expose({
      show() {
        visible.value = true
      },
      hide() {
        visible.value = false
      }
    })

    watch(visible, val => {
      if (val) {
        checkList.value = props.tableColumns.map(item => item.title)
        checkAll.value = checkList.value.length === props.initColumns.length
        setSort()
      }
    })

    const onCheckAllChange = e => {
      const checked = e.target.checked
      if (checked) {
        props.initColumns.forEach(item => {
          if (!checkList.value.includes(item.title)) {
            checkList.value.push(item.title)
          }
        })
      } else {
        checkList.value = []
      }
    }

    const handleReset = () => {
      checkList.value = props.initColumns.map(item => item.title)
    }

    const handleCancel = () => {
      visible.value = false
    }

    const handleOk = () => {
      const checkNum = checkList.value.length
      if (!checkNum) {
        message.warning('请选择需要显示的字段')
        return
      }

      const normal: TableColumn[] = []
      const fixedR: TableColumn[] = []
      const fixedL: TableColumn[] = []
      let columns: TableColumn[] = []
      const initColumns = cloneDeep(props.initColumns)

      checkList.value.forEach(key => {
        initColumns.forEach(item => {
          if (item.title === key) {
            if (item.fixed === 'right') {
              fixedR.push(item)
            } else if (
              item.fixed === 'left' ||
              (typeof item.fixed === 'boolean' && item.fixed)
            ) {
              fixedL.push(item)
            } else {
              normal.push(item)
            }
          }
        })
      })
      columns = [...fixedL, ...normal, ...fixedR]
      emit('ok', { columns })
      visible.value = false
    }

    const setSort = () => {
      nextTick(() => {
        const el = document.querySelector('.sort_group') as HTMLElement
        const ops = {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          chosenClass: 'chosen',
          //拖动结束
          onEnd: function (evt) {
            const { oldIndex, newIndex } = evt
            if (
              isEmpty(oldIndex) ||
              isEmpty(newIndex) ||
              newIndex === oldIndex
            ) {
              return
            }
            const curItem = checkList.value[oldIndex]
            checkList.value.splice(oldIndex, 1)
            checkList.value.splice(newIndex, 0, curItem)
          }
        }
        Sortable.create(el, ops)
      })
    }

    return () => {
      return (
        <y-modal
          ref="modal"
          v-model={visible.value}
          title="配置表头"
          width={750}
          destroyOnClose={true}
          class="thead-config-modal"
          v-slots={{
            footer: () => {
              return (
                <div class="modal_footer">
                  <div class="modal-left">
                    <y-checkbox
                      v-model={checkAll.value}
                      indeterminate={indeterminate.value}
                      onChange={onCheckAllChange}
                    >
                      全选
                    </y-checkbox>
                  </div>
                  <div class="modal-right">
                    <y-btn link onClick={handleReset}>
                      重置
                    </y-btn>
                    <y-btn onClick={handleCancel}>取消</y-btn>
                    <y-btn primary onClick={handleOk}>
                      确定
                    </y-btn>
                  </div>
                </div>
              )
            }
          }}
        >
          <div class="main">
            <div class="show_fields">
              <div class="title">
                显示字段 ({checkList.value.length}){' '}
                <span class="color45">拖动可自定义排序</span>
              </div>
              <div class="field_box">
                <y-row class="sort_group">
                  {checkList.value.length ? (
                    checkList.value.map((title: string) => {
                      return (
                        <y-col key={title} span={6} class="marginB10">
                          <div class="pointer">
                            <MenuOutlined class="icon-menu" />
                            <span>{title}</span>
                          </div>
                        </y-col>
                      )
                    })
                  ) : (
                    <y-col span={24} class="tac">
                      请勾选需要显示的字段
                    </y-col>
                  )}
                </y-row>
              </div>
            </div>
            <div class="config_fields">
              <div class="title"> 可配置字段 ({props.initColumns.length}) </div>
              <div class="field_box">
                <y-checkbox-group v-model={checkList.value}>
                  <y-row>
                    {props.initColumns.map((item: any) => {
                      return (
                        <y-col key={item.dataIndex} span={6} class="marginB10">
                          <y-checkbox value={item.title}>
                            {item.title}
                          </y-checkbox>
                        </y-col>
                      )
                    })}
                  </y-row>
                </y-checkbox-group>
              </div>
            </div>
          </div>
        </y-modal>
      )
    }
  }
})
