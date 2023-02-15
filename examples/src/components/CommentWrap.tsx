import { defineComponent, onMounted, ref } from 'vue'

const CommentWrap = function (name: string) {
  return defineComponent({
    setup() {
      const div = ref()
      onMounted(() => {
        div.value?.parentNode.replaceChild(
          document.createComment(name),
          div.value
        )
      })
      return () => <div ref={div} />
    }
  })
}

export default CommentWrap
