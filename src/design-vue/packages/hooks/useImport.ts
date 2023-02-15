import { reactive, ref } from 'vue'

export default function useImport(fetchData) {
  const fileList: any = ref([])
  const taskId = ref('')
  const status = ref('') // uploading 、 done 、 error

  const customRequest = async ({ file, data }) => {
    const { uid, name, size, type } = file
    const fileObj: any = {
      uid: uid,
      name: name,
      size: size,
      type: type,
      percent: 0
    }
    // 假进度写死99
    fileObj.percent = 99
    fileObj.status = 'uploading'
    // 添加到文件列表回显示
    fileList.value.push(fileObj)
    const formData = new FormData()
    formData.append('file', file)

    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    const fileItem = fileList.value.find(f => f.uid === uid)
    fetchData(formData)
      .then(res => {
        status.value = fileItem.status = 'done'
        fileItem.percent = 100
        fileItem.taskId = res
        taskId.value = res
      })
      .catch(e => {
        status.value = fileItem.status = 'error'
        fileItem.errInfo = e
      })
  }

  const uploadProps = reactive({
    modelValue: fileList,
    customRequest
  })

  return { taskId, status, uploadProps }
}
