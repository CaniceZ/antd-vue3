export const extname = (url = '') => {
  const temp = url.split('/')
  const filename = temp[temp.length - 1]
  const filenameWithoutSuffix = filename.split(/#|\?/)[0]
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0]
}

const isImageFileType = type => !!type && type.indexOf('image/') === 0

export const isImageUrl = file => {
  if (isImageFileType(file.type)) {
    return true
  }
  const url = file.thumbUrl || file.url
  const extension = extname(url)
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false
  }
  if (extension) {
    // other file types which have extension
    return false
  }
  return true
}

export const getFileType = file => {
  if (!file) {
    return
  }
  const attachmentUrl = file.url

  const type = extname(attachmentUrl)
  let fileType = ''
  if (
    isImageFileType(file.type) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(type)
  ) {
    fileType = 'image'
  } else if (type === '.pdf') {
    fileType = 'pdf'
  } else if (['.doc', '.dot'].includes(type)) {
    fileType = 'word'
  } else if (['.xls', '.xlsx'].includes(type)) {
    fileType = 'excel'
  } else {
    fileType = 'file'
  }
  return fileType
}

export const imageDimensions = file =>
  new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img
      resolve({ width, height })
    }

    img.onerror = () => {
      reject('There was some problem with the image.')
    }

    img.src = URL.createObjectURL(file)
  })

export const isUrl = (url: string) => {
  const regex = /^(http|https)/
  return regex.test(url.toLowerCase())
}
