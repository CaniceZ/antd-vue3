import { defineComponent } from 'vue'
import './App.less'

export default defineComponent({
  name: 'App',
  setup() {},
  render() {
    return (
      <y-config-provider>
        <router-view></router-view>;
      </y-config-provider>
    )
  }
})
