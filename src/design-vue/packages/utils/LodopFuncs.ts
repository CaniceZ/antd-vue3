//==本JS是加载Lodop插件或Web打印服务CLodop/Lodop7的综合示例，可直接使用，建议理解后融入自己程序==
import { message } from 'ant-design-vue'

//用双端口加载主JS文件Lodop.js(或CLodopfuncs.js兼容老版本)以防其中某端口被占:
var MainJS = 'CLodopfuncs.js',
  URL_WS1 = 'ws://localhost:8000/' + MainJS, //ws用8000/18000
  URL_WS2 = 'ws://localhost:18000/' + MainJS,
  URL_HTTP1 = 'http://localhost:8000/' + MainJS, //http用8000/18000
  URL_HTTP2 = 'http://localhost:18000/' + MainJS,
  URL_HTTP3 = 'https://localhost.lodop.net:8443/' + MainJS //https用8000/8443

var CreatedOKLodopObject, CLodopIsLocal, LoadJsState

//==判断是否需要CLodop(那些不支持插件的浏览器):==
export function needCLodop() {
  try {
    var ua = navigator.userAgent
    if (
      ua.match(/Windows\sPhone/i) ||
      ua.match(/iPhone|iPod|iPad/i) ||
      ua.match(/Android/i) ||
      ua.match(/Edge\D?\d+/i)
    )
      return true
    var verTrident = ua.match(/Trident\D?\d+/i)
    var verIE = ua.match(/MSIE\D?\d+/i)
    var verOPR = ua.match(/OPR\D?\d+/i)
    var verFF = ua.match(/Firefox\D?\d+/i)
    var x64 = ua.match(/x64/i)
    if (!verTrident && !verIE && x64) return true
    else if (verFF) {
      verFF = verFF[0].match(/\d+/)
      // @ts-ignore
      if (verFF[0] >= 41 || x64) return true
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/)
      // @ts-ignore
      if (verOPR[0] >= 32) return true
    } else if (!verTrident && !verIE) {
      var verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/)
        // @ts-ignore
        if (verChrome[0] >= 41) return true
      }
    }
    return false
  } catch (err) {
    return true
  }
}

//==检查加载成功与否，如没成功则用http(s)再试==
//==低版本CLODOP6.561/Lodop7.043及前)用本方法==
function checkOrTryHttp() {
  // @ts-ignore
  if (window.getCLodop) {
    LoadJsState = 'complete'
    return true
  }
  if (LoadJsState == 'loadingB' || LoadJsState == 'complete') return
  LoadJsState = 'loadingB'
  var head =
    document.head ||
    document.getElementsByTagName('head')[0] ||
    document.documentElement
  var JS1 = document.createElement('script'),
    JS2 = document.createElement('script'),
    JS3 = document.createElement('script')
  JS1.src = URL_HTTP1
  JS2.src = URL_HTTP2
  JS3.src = URL_HTTP3
  JS1.onload =
    JS2.onload =
    JS3.onload =
    JS2.onerror =
    JS3.onerror =
      function () {
        LoadJsState = 'complete'
      }
  JS1.onerror = function (_e) {
    if (window.location.protocol !== 'https:')
      head.insertBefore(JS2, head.firstChild)
    else head.insertBefore(JS3, head.firstChild)
  }
  head.insertBefore(JS1, head.firstChild)
}

// ==加载Lodop对象的主过程:==
export function loadCLodop() {
  CLodopIsLocal = !!(URL_WS1 + URL_WS2).match(/\/\/localhost|\/\/127.0.0./i)
  LoadJsState = 'loadingA'
  // @ts-ignore
  if (!window.WebSocket && window.MozWebSocket)
    window.WebSocket = window.MozWebSocket
  //ws方式速度快(小于200ms)且可避免CORS错误,但要求Lodop版本足够新:
  try {
    var WSK1 = new WebSocket(URL_WS1)
    WSK1.onopen = function (_e) {
      setTimeout(() => {
        checkOrTryHttp()
      }, 200)
    }
    WSK1.onmessage = function (e) {
      // @ts-ignore
      if (!window.getCLodop) eval(e.data)
    }
    WSK1.onerror = function (_e) {
      var WSK2 = new WebSocket(URL_WS2)
      WSK2.onopen = function (_e) {
        setTimeout(() => {
          checkOrTryHttp()
        }, 200)
      }
      WSK2.onmessage = function (e) {
        // @ts-ignore
        if (!window.getCLodop) eval(e.data)
      }
      WSK2.onerror = function (_e) {
        checkOrTryHttp()
      }
    }
  } catch (e) {
    checkOrTryHttp()
  }
}

// if (needCLodop()) {
//   loadCLodop()
// }

const lodop32Exe = 'https://qiniu-fe.yigongpin.com/lodop/install_lodop32.exe'
const lodop64Exe = 'https://qiniu-fe.yigongpin.com/lodop/install_lodop64.exe'
const lodopAll =
  'https://qiniu-fe.yigongpin.com/lodop/CLodop_Setup_for_Win32NT.exe'

//==获取LODOP对象主过程,判断是否安装、需否升级:==
export function getLodop(oOBJECT?, oEMBED?) {
  let LODOP
  try {
    const isWinIE =
      /MSIE/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent)
    const isWinIE64 = isWinIE && /x64/i.test(navigator.userAgent)
    let lodopExe = lodopAll

    if (needCLodop()) {
      try {
        // @ts-ignore
        LODOP = window.getCLodop()
      } catch (err) {}

      const lodopObj = { LODOP, lodopExe, needCLodop: true, LoadJsState }

      if (!LODOP && LoadJsState !== 'complete') {
        let msg = '网页还没下载完毕，请稍等一下再操作.'
        if (!LoadJsState) {
          msg = '未曾加载Lodop主JS文件，请先调用loadCLodop过程.'
        }
        return { ...lodopObj, state: 0, msg }
      }

      if (!LODOP) {
        return {
          ...lodopObj,
          state: CLodopIsLocal ? 2 : 1,
          msg: CLodopIsLocal ? '此前已安装过, 请重新启动' : '未安装'
        }
      } else {
        // @ts-ignore
        if (CLODOP.CVERSION < '6.5.7.0') {
          return {
            ...lodopObj,
            state: 3,
            msg: '版本过低，需要升级'
          }
        }
      }
    } else {
      //==如果页面有Lodop插件就直接使用,否则新建:==
      if (oOBJECT || oEMBED) {
        LODOP = isWinIE ? oOBJECT : oEMBED
      } else if (!CreatedOKLodopObject) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute(
          'style',
          'position:absolute;left:0px;top:-100px;width:0px;height:0px;'
        )
        if (isWinIE) {
          LODOP.setAttribute(
            'classid',
            'clsid:2105C259-1E0C-4534-8141-A753534CB4CA'
          )
        } else {
          LODOP.setAttribute('type', 'application/x-print-lodop')
        }
        document.documentElement.appendChild(LODOP)
        CreatedOKLodopObject = LODOP
      } else {
        LODOP = CreatedOKLodopObject
      }

      lodopExe = isWinIE64 ? lodop64Exe : lodop32Exe
      const lodopObj = { LODOP, needCLodop: false, lodopExe }
      //==Lodop插件未安装时提示下载地址:==
      if (!LODOP || !LODOP.VERSION) {
        return {
          ...lodopObj,
          state: 1,
          msg: '未安装'
        }
      }
      if (LODOP.VERSION < '6.2.2.6') {
        return {
          ...lodopObj,
          state: 3,
          msg: '版本过低，需要升级'
        }
      }
    }
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):=======================
    if (LODOP) {
      const DEV_LICENSES = 'E07582E900DB4C1D6BCEA2DDFC354258666' // 测试环境
      const PRO_LICENSES = 'E07582E900DB4C1D6BCDA3788C354258666' // 正式环境
      const licenses = window.origin.endsWith('.com')
        ? PRO_LICENSES
        : DEV_LICENSES
      LODOP.SET_LICENSES('', licenses, '', '')
    }

    //===============================================================================
    return {
      LODOP,
      lodopExe,
      state: 4,
      msg: '具备打印条件',
      needCLodop: needCLodop()
    }
  } catch (err) {
    message.error('getLodop出错:' + err)
  }
}
