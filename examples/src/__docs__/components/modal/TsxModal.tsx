import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['hide'],
  setup(_, { attrs, slots, emit }) {
    return () => (
      <y-modal title="tsx modal" {...attrs} onOk={() => emit('hide')}>
        <h1>Hello here is tsx modal</h1>
        {slots.customRow?.('here is slot[customRow]')}
      </y-modal>
    )
  }
})
