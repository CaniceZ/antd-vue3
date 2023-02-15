// @ts-ignore
import { useFetch } from '@ygp/ygp-design-vue/hooks'
// @ts-ignore
import { http } from '@ygp/ygp-design-vue/http'
// @ts-ignore
import pkg from '../../../package.json'

const isDev = import.meta.env.MODE === 'development'

const [version, versionLoading, fetchVersion] = useFetch(
  async () => {
    if (isDev) {
      return pkg.version
    } else {
      return await http.get({ url: '/version' })
    }
  },
  {
    immediate: false,
    defaultValue: ''
  }
)

export { version, versionLoading, fetchVersion }
