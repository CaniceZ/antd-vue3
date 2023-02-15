/**
 * 下载文件
 * @param url 下载路径
 * @returns void
 */
export default function downloadFile(url: string) {
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  a.click()
}
