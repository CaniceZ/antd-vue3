import { defineComponent } from 'vue'

const DefaultCreateModal = defineComponent({
  name: 'YDefaultCreateModal',
  emits: ['ok', 'hide'],
  setup(_, { attrs, slots, emit }) {
    function onOk() {
      emit('ok')
      emit('hide')
    }
    return () => <y-modal title="提示" {...attrs} onOk={onOk} v-slots={slots} />
  }
})

export default DefaultCreateModal
