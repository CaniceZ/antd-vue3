// import Vue from 'vue'

export function flatten(data) {
  return data.reduce(
    (acc, { menus = [], ...item }) => acc.concat([item], flatten(menus)),
    []
  )
}
export function flattenPerssion(data) {
  return data.reduce(
    (acc, { premissions = [], ...item }) =>
      acc.concat([item], flattenPerssion(premissions)),
    []
  )
}
// 权限检查方法
export function has(value) {
  let isExist = false
  // 获取用户权限
  const routes = JSON.parse(localStorage.getItem('routes'))
  const permissions = flatten(routes)
  if (!permissions.length) {
    return false
  }
  if (permissions.some(item => item.url === value)) {
    isExist = true
  }
  return isExist
}

// 按钮权限检查方法
export function hasBtn(value) {
  let isExist = false
  // 获取用户权限
  const routes = JSON.parse(localStorage.getItem('routes'))
  const permissions = flatten(routes)
  let btnPermissions = []
  permissions.forEach(item => {
    btnPermissions = btnPermissions.concat(
      item.premissions.filter(item2 => {
        return item2.rightType === 2
      })
    )
  })
  const permissionsAll = flattenPerssion(permissions)
  if (!permissionsAll.length) {
    return false
  }
  if (permissionsAll.some(item => item.url === value)) {
    isExist = true
  }
  return isExist
}
// 在js文件中使用 window.hasBtn("xxx")
window.hasBtn = hasBtn
// 在vue文件中使用 this.$hasBtn('XXX')
// Vue.prototype.$hasBtn = hasBtn
// /**权限指令**/
// Vue.directive('has', {
//   inserted: (el, binding) => {
//     if (!has(binding.value)) {
//       el.parentNode.removeChild(el)
//     }
//   },
// })
