<script setup lang="tsx">
import { LoadingOutlined } from '@ant-design/icons-vue'
import { FormItem, Message, Modal } from '@ygp/ygp-design-vue'
import { reactive } from 'vue'
// @ts-ignore
import { http } from '@ygp/ygp-design-vue/http'
// @ts-ignore
import { useAsync, useFetch } from '@ygp/ygp-design-vue/hooks'
import { useRoute } from 'vue-router'
import { version as vers, fetchVersion as fetchVers } from '../hooks/useVersion'
import { useLocalStorage } from '@vueuse/core'

const route = useRoute()
const { version } = route.query
const formRef = $ref<any>()
let tab = $ref('last')
let changelog = $(useLocalStorage('update-changelog-textarea', ''))
const formData = reactive({
  type: '2',
  username: void 0,
  password: void 0,
  version: version === 'major' ? version : 'patch',
  changelog
})
const currentTabPaneRef = $ref<any>()
function getVersion(version: string, index: 0 | 1 | 2) {
  if (!version) {
    return ''
  }
  const list = version.split('.').map(Number)
  list[index]++
  if (index === 0) {
    list[1] = 0
    list[2] = 0
  }
  if (index === 1) {
    list[2] = 0
  }
  return list.join('.')
}
function wrapVersion(label: string, version: string, index: 0 | 1 | 2) {
  return `${label}${version ? `（${getVersion(version, index)}）` : ''}`
}
const items = $computed<FormItem[]>(() => [
  {
    name: 'type',
    label: '更新类型',
    type: 'radio',
    options: [
      // { type: '1', name: '更新mock数据' },
      { type: '2', name: '更新版本' }
    ]
    // componentProps: { button: true },
  },
  { name: 'username', label: '域账号', required: true, autofocus: true },
  { name: 'password', type: 'password', label: '域密码', required: true },
  {
    name: 'version',
    label: '版本',
    type: 'radio',
    hide: formData.type === '1',
    options: [
      ...(version === 'major'
        ? [{ type: 'major', name: wrapVersion('大版本', vers.value, 0) }]
        : []),
      { type: 'minor', name: wrapVersion('小版本', vers.value, 1) },
      { type: 'patch', name: wrapVersion('补丁', vers.value, 2) }
    ],
    extra: vers.value ? `当前版本: ${vers.value}` : void 0,
    required: true
  },
  // {
  //   name: 'changetype',
  //   label: '更新类型',
  //   type: 'checkbox',
  //   options: [
  //     { type: 'features', name: '新功能' },
  //     { type: 'fixes', name: '修复' },
  //     { type: 'breaking change', name: '破坏性更新' },
  //   ],
  // },
  {
    name: 'changelog',
    label: '更新日志',
    type: 'textarea',
    hide: formData.type === '1',
    placeholder: `## Features
    
## Fixes
    `,
    componentProps: {
      rows: 5
    },
    onChange(e: any) {
      changelog = e?.target?.value || ''
    }
  }
])

const [last, lastLoading, fetchLast] = useFetch(() =>
  http.get({ url: '/last' }).then((res: string) => wrap(res))
)
const [current, currentLoading, fetchCurrent] = useFetch(
  async () => {
    const res = await http.get({ url: '/current' })
    if (res.status === 'processing') {
      setTimeout(() => {
        fetchCurrent()
      }, 3000)
    } else if (res.status === 'done') {
      fetchVers()
      changelog = ''
    }
    let data = res.data ? wrap(res.data) : ''
    if (
      current.value.data &&
      !res.data &&
      ['done', 'error'].includes(res.status)
    ) {
      const last = await http.get({ url: '/last' })
      data = wrap(last)
    }
    setTimeout(() => {
      const el = currentTabPaneRef?.$el
      if (el) {
        el.scrollTop = el.scrollHeight
      }
    }, 0)
    return {
      ...res,
      data
    }
  },
  { defaultValue: {} }
)
const [handleSubmit, submitLoading] = useAsync((data: any) =>
  http.post({
    url: '/publish',
    data,
    timeout: 0
  })
)

async function onSubmit() {
  await formRef?.validate()
  Modal.confirm({
    title: '更新确认',
    content: '确认更新吗？',
    onOk() {
      const { type, username, password, ...other } = formData
      handleSubmit(
        type === '1' ? { username, password } : { username, password, ...other }
      ).then((data: string) => {
        tab = 'current'
        fetchCurrent()
        Message.info(data)
      })
    }
  })
}

function wrap(val?: string) {
  return val?.replace(/\r?\n/g, '<br />') || ''
}
</script>
<template>
  <div style="height: calc(100vh - 64px); padding: 20px">
    <!-- <y-alert v-if="error" style="margin-bottom: 20px" error showIcon message="报错了" /> -->
    <y-row style="height: 100%" :gutter="40">
      <y-col style="height: 100%" :span="12">
        <y-form
          ref="formRef"
          :model="formData"
          :items="items"
          :defaultSpan="24"
          labelWidth="100px"
        >
          <!-- <template #item-changetype="{ props }"> -->
          <!--   <y-checkbox-group -->
          <!--     :options="props.options" -->
          <!--     :modelValue="changetype" -->
          <!--     @change="onTypeChange" -->
          <!--   /> -->
          <!-- </template> -->
          <template #action>
            <y-btn
              :disabled="!current"
              submit
              primary
              :loading="
                submitLoading ||
                (current.status && current.status === 'processing')
              "
              label="更新"
              @click="onSubmit"
            />
          </template>
        </y-form>
      </y-col>
      <y-col style="height: 100%" :span="12">
        <y-tabs bordered fit card contentPadding="10px" v-model="tab">
          <y-tab-pane
            ref="currentTabPaneRef"
            key="current"
            style="overflow-y: auto"
            v-if="current.data"
            tab="当前执行日志"
          >
            <div v-html="current.data" />
            <div
              class="text-color-primary"
              v-if="current.status === 'processing'"
            >
              <br />
              <LoadingOutlined />&nbsp;&nbsp;&nbsp;执行中...
              <br />
              <br />
            </div>
          </y-tab-pane>
          <y-tab-pane key="last" tab="上一次执行日志" style="overflow-y: auto">
            <div v-html="last" />
          </y-tab-pane>
        </y-tabs>
      </y-col>
    </y-row>
  </div>
</template>
