# y-upload 上传组件

<a-btn label="a-upload" href="https://next.antdv.com/components/upload-cn" />

继承 `a-upload` 的属性、事件、插槽、方法，可以通过 <y-link blank label="a-upload" href="https://next.antdv.com/components/upload-cn" /> 查看更多选项

## 自定义导入

```vue demo
<template>
  <p>自定义导入</p>
  <p>{{ uploadProps.modelValue }}</p>
  <y-upload
    accept=".xls, .xlsx"
    listType="card"
    sizeLimit="2MB"
    :limit="1"
    :multiple="true"
    :data="{ aaaa: '1111' }"
    v-bind="uploadProps"
  >
    <template #downloadTemplate>
      <a @click="handleDownload">下载导入模版</a>
    </template>
  </y-upload>
</template>
<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import axios from 'axios'
import { useImport } from '@ygp/ygp-design-vue/hooks'

const token = '1edf906352453966c337ec26969a57e4'
const imports = async (file: any) => {
  let { data } = await axios.post(
    `http://gateway-dev1.yigongpin.net/api/pms/category/imports`,
    file,
    {
      headers: {
        token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return data.data
}

const { taskId, status, uploadProps } = useImport(imports)

const handleDownload = () => {
  console.log('handleDownload')
}
watch(taskId, val => {
  console.log('taskId111111', val)
})
watch(status, val => {
  console.log('status', val)
})
</script>
```

## 异步上传

```vue demo
<template>
  <p>异步上传</p>
  <p>{{ fileList }}</p>
  <y-upload
    ref="dom"
    v-model="fileList"
    listType="photo"
    accept=".jpg, jpeg, .png, .pdf"
    categoryCode="bciFmsCreditPCAccessory"
    sizeLimit="30MB"
    :async="true"
    :isPrivate="true"
    :multiple="true"
    :getTokens="getUploadToken"
    :getUrls="getPrivateDownloadUrls"
    :fieldMap="{
      width: 'someWidth',
      height: 'someHeight'
    }"
  >
  </y-upload>
  <y-btn type="primary" @click="handleUpload">上传</y-btn>
</template>
<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'

const dom = ref()
const fileList = ref([])
const token = '1edf906352453966c337ec26969a57e4'

const handleUpload = async () => {
  let res = await dom.value.executeUpload()
  console.log('res', res)
}

const getUploadToken = async (params: any) => {
  let { data } = await axios.post(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getUploadTokenMap`,
    params,
    {
      headers: {
        token
      }
    }
  )
  return data.data
}

const getPrivateDownloadUrls = async params => {
  let { data } = await axios.get(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getPrivateDownloadUrls`,
    {
      params,
      headers: {
        token
      }
    }
  )
  return data.data
}
</script>
```

## 卡片式上传

```vue demo
<template>
  <p>卡片式上传</p>
  <p>{{ fileList }}</p>
  <y-upload
    v-model="fileList"
    listType="card"
    categoryCode="bciFmsCreditPCAccessory"
    width="300px"
    sizeLimit="30MB"
    :multiple="true"
    :isPrivate="true"
    :getTokens="getUploadToken"
    :getUrls="getPrivateDownloadUrls"
    :customFileName="customFileName"
  >
  </y-upload>
</template>
<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'

const fileList = ref([])
const token = '1edf906352453966c337ec26969a57e4'

const getUploadToken = async (params: any) => {
  let { data } = await axios.post(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getUploadTokenMap`,
    params,
    {
      headers: {
        token
      }
    }
  )
  return data.data
}

const getPrivateDownloadUrls = async params => {
  let { data } = await axios.get(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getPrivateDownloadUrls`,
    {
      params,
      headers: {
        token
      }
    }
  )
  return data.data
}
const customFileName = () => {
  return `JG${Date.now()}`
}
</script>
```

## 加密上传

```vue demo
<template>
  <p>加密上传</p>
  <p>{{ fileList }}</p>
  <y-upload
    v-model="fileList"
    listType="photo"
    accept=".jpg, jpeg, .png, .xls, .xlsx"
    categoryCode="bciFmsCreditPCAccessory"
    sizeLimit="20MB"
    imageSize="900*400"
    :limit="5"
    :isPrivate="true"
    :multiple="true"
    showSeq
    :getTokens="getUploadToken"
    :getUrls="getPrivateDownloadUrls"
  >
    <template #downloadTemplate>
      <a>导入员工模版</a>
    </template>
    <y-btn>上传文件</y-btn>
  </y-upload>
</template>
<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'

const fileList = ref([])
const token = '1edf906352453966c337ec26969a57e4'

onMounted(() => {
  setTimeout(() => {
    fileList.value = [
      {
        uid: 'vc-upload-1644758541980-6',
        uFilename: '5f2cff60f9f7484bafd509d24eecd0cd.png',
        lastModified: 1627725930000,
        lastModifiedDate: '2021-07-31T10:05:30.000Z',
        name: '页面-1-4-猫社区-用户首页-标准.png',
        size: 2089361,
        type: 'image/png',
        percent: 100,
        originFileObj: '[object File]',
        status: 'done',
        fileName: '页面-1-4-猫社区-用户首页-标准.png',
        fileType: 'image/png',
        fileSize: 2089361,
        filePath:
          'private/bciFmsCreditPCAccessory/2022-02-13/5e3b91108152a9c4df07afb8e0a77bec.png'
      },
      {
        uid: 'vc-upload-1644758541980-7',
        uFilename: '361482113d23498ca26566d1ec440dfa.png',
        lastModified: 1627725931000,
        lastModifiedDate: '2021-07-31T10:05:31.000Z',
        name: '页面-1-5-猫社区-用户首页-未关注.png',
        size: 2086331,
        type: 'image/png',
        percent: 100,
        originFileObj: '[object File]',
        status: 'done',
        fileName: '页面-1-5-猫社区-用户首页-未关注.png',
        fileType: 'image/png',
        fileSize: 2086331,
        filePath:
          'private/bciFmsCreditPCAccessory/2022-02-13/68d26ed6e22a464d70783c6fe775d562.png'
      }
    ]
  }, 2000)
})

const getUploadToken = async (params: any) => {
  let { data } = await axios.post(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getUploadTokenMap`,
    params,
    {
      headers: {
        token
      }
    }
  )
  return data.data
}

const getPrivateDownloadUrls = async params => {
  let { data } = await axios.get(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getPrivateDownloadUrls`,
    {
      params,
      headers: {
        token
      }
    }
  )
  return data.data
}
</script>
```

## 非加密上传

```vue demo
<template>
  <p>非加密上传</p>
  <!-- <p>{{ fileList }}</p> -->
  <y-upload
    v-model="fileList"
    accept=".jpg,.png,.jpeg,.bmp,.pdf,.xls,.xlsx,.doc,.dot"
    categoryCode="dev"
    :getTokens="getUploadToken"
    :limit="9"
    :multiple="true"
    listType="photo"
    sizeLimit="100mb"
    :previewMask="setPreviewMask"
  >
    <div v-if="fileList.length < 9">
      <plus-outlined />
    </div>
    <template #hint> 自定义上传提示语…… </template>
    <!-- <template #previewMask> 预览 </template> -->
  </y-upload>
</template>
<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'

const fileList = ref([])
const token = 'bb070d787b50d667fa6bcb29757c2032'

function setPreviewMask() {
  return '预览'
}

onMounted(() => {
  setTimeout(() => {
    fileList.value = [
      {
        id: 317,
        orderCode: 'RKTZ202201190004',
        orderType: 1,
        fileName: '1.jpeg',
        fileOriginalName: null,
        fileRemarker: null,
        fileType: 'image/jpeg',
        fileSize: 4320054,
        filePath:
          'https://qiniu-cdn-test.yigongpin.net/pms/category/image/2022-02-10/f07ba2888aa91618696039023904b1b1.jpg',
        uploadDatetime: null,
        uploaderCode: null,
        uploaderName: null,
        active: 1,
        createTime: '2022-01-19 17:56:46',
        creatorCode: 'SCP1481888818462171137',
        creator: '俊全',
        createIp: null,
        updateTime: '2022-01-19 17:56:46',
        updaterCode: 'SCP1481888818462171137',
        updater: '俊全',
        updateIp: null,
        isSuccess: null,
        failReason: null,
        orderSn: '1'
      },
      {
        id: 318,
        orderCode: 'RKTZ202201190004',
        orderType: 1,
        fileName: '2.jpeg',
        fileOriginalName: null,
        fileRemarker: null,
        fileType: 'image/jpeg',
        fileSize: 4320054,
        filePath:
          'https://qiniu-cdn-test.yigongpin.net/pms/category/image/2022-02-10/b5d15a4a7371c2a296e043bf34a2ef19.jpg',
        uploadDatetime: null,
        uploaderCode: null,
        uploaderName: null,
        active: 1,
        createTime: '2022-01-19 17:56:46',
        creatorCode: 'SCP1481888818462171137',
        creator: '俊全',
        createIp: null,
        updateTime: '2022-01-19 17:56:46',
        updaterCode: 'SCP1481888818462171137',
        updater: '俊全',
        updateIp: null,
        isSuccess: null,
        failReason: null,
        orderSn: '1'
      },
      {
        uid: 'vc-upload-1663559041995-7',
        thumbUrl:
          'blob:http://localhost:3000/76bfec90-d6e2-4ca2-aed5-4db16cd2b896',
        uFilename: '7da1397d18a94aabbe5be9a00f240a27.pdf',
        lastModified: 1660221827097,
        lastModifiedDate: '2022-08-11T12:43:47.097Z',
        name: '交易凭证 (7).pdf',
        size: 428050,
        type: 'application/pdf',
        percent: 100,
        originFileObj: '[object File]',
        status: 'done',
        fileName: '交易凭证 (7).pdf',
        fileType: 'application/pdf',
        fileSize: 428050,
        url: 'https://qiniu-cdn-test.yigongpin.net/dev1/dev/2022-09-19/9b8e80976bfda887afc68b1a8757b75d.pdf',
        filePath:
          'https://qiniu-cdn-test.yigongpin.net/dev1/dev/2022-09-19/9b8e80976bfda887afc68b1a8757b75d.pdf'
      }
    ]
  }, 2000)
})

const getUploadToken = async (params: any) => {
  let { data } = await axios.post(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getUploadTokenMap`,
    params,
    {
      headers: {
        token
      }
    }
  )
  return data.data
}
</script>
```

## 按钮上传

```vue demo
<template>
  <p>按钮上传</p>
  <p>{{ fileList }}</p>
  <y-upload
    v-model="fileList"
    categoryCode="bciFmsCreditPCAccessory"
    accept=".jpg, .jpeg, .png, .xlsx, .xls, .pdf"
    sizeLimit="30MB"
    :limit="2"
    :isPrivate="true"
    :getTokens="getUploadToken"
    :getUrls="getPrivateDownloadUrls"
  >
    <y-btn>上传文件</y-btn>
  </y-upload>
</template>
<script setup lang="ts">
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'

const fileList = ref([])
const token = '1edf906352453966c337ec26969a57e4'

const getUploadToken = async (params: any) => {
  let { data } = await axios.post(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getUploadTokenMap`,
    params,
    {
      headers: {
        token
      }
    }
  )
  return data.data
}

const getPrivateDownloadUrls = async params => {
  let { data } = await axios.get(
    `http://gateway-dev1.yigongpin.net/api/sys/king/file/filesystem/getPrivateDownloadUrls`,
    {
      params,
      headers: {
        token
      }
    }
  )
  return data.data
}
</script>
```

## API

api:props

| 属性名         | 说明                                                                              | 类型                    | 默认值       |
| -------------- | --------------------------------------------------------------------------------- | ----------------------- | ------------ |
| v-model        | 文件列表（双向绑定）                                                              | object[]                | []           |
| accept         | 允许上传的格式，例：'.xlsx, .xls'                                                 | string                  | 无           |
| getTokens      | 批量获取 token 的 promise 方法 【可全局配置】                                     | () => Promise           | 无           |
| getUrls        | 批量解密图片的 promise 方法 【可全局配置】                                        | () => Promise           | 无           |
| categoryCode   | 文件分类 code 【可全局配置】                                                      | string                  | 无           |
| isPrivate      | 是否是加密文件，默认值为 false 即非加密文件。如果是加密文件【必传】               | boolean                 | false        |
| async          | 是否开启异步上传                                                                  | boolean                 | false        |
| params         | 调用获取 token 接口的额外参数                                                     | object                  | 无           |
| limit          | 限制文件上传个数                                                                  | number                  | 无           |
| sizeLimit      | 限制文件上传大小                                                                  | [string, number]        | 无           |
| imageSize      | 图片尺寸展示文字                                                                  | string                  | 无           |
| fieldMap       | 文件信息和后端字段设计的映射关系 , 可选择覆盖 【可全局配置】                      | object                  | 【详细见下】 |
| imagePreview   | 图片预览方式 modal \| open                                                        | string                  | modal        |
| listType       | 上传列表的内建样式，支持 5 种基本样式 text、card、photo、 picture 和 picture-card | string                  | text         |
| showSeq        | 显示序号，listType 为 photo 时生效                                                | boolean                 | false        |
| width          | 组件宽度                                                                          | string                  | 100%         |
| customFileName | 自定义文件名                                                                      | () => string            | 无           |
| photoPreview   | 预览参数，为 false 时禁用，listType 为 photo 时生效                               | [false, function, slot] | -            |
| previewMask    | 自定义 mask，listType 为 photo 时生效                                             | [boolean, previewType]  | -            |

api:fieldMap

| 属性名 | 说明           | 类型   | 默认值   |
| ------ | -------------- | ------ | -------- |
| uid    | 文件的唯一 key | string | id       |
| name   | 文件名         | string | fileName |
| size   | 文件大小       | string | fileSize |
| path   | 文件路径       | string | filePath |
| type   | 文件格式       | string | fileType |
| width  | 图片宽度       | string | width    |
| height | 图片高度       | string | height   |

api:emits

| 事件名      | 说明           | 回调参数                        |
| ----------- | -------------- | ------------------------------- |
| change      | 文件改变的回调 | Function({file,fileList}) => {} |
| ...其余事件 | 透传           |

api:slots
| 插槽名 | 说明 | props |
| ----------------------------------------------------------- | ----------------------------| ------------------------------- |
| hint | 自定义提示语 | - |
| downloadTemplate | 导入模板 | - |
