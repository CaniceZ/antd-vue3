import { defineComponent } from 'vue'
import { GlobalComponentConstructor, PropsType } from '../../types/ts-helpers'
import { DefaultSlots } from '../../types/vue'
import { getPrefix } from '../../_utils/common'

const [prefixName, prefixCls] = getPrefix('lodop-tutorial')

const LodopTutorialProps = () => ({
  /** 标签 */
  label: {
    type: String,
    default: ''
  }
})

const LodopTutorial = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...LodopTutorialProps()
  },
  setup() {
    return () => {
      return (
        <div class={[prefixCls, { lodop_tutorial: true }]}>
          <div class="banner">
            <div class="title"> 易工品中后台管理系统打印控件使用教程 </div>
            <div class="sub_title">轻松助你使用打印机</div>
          </div>
          <div class="content">
            <div class="wrap mb-6">
              <h3 class="descriptions-title"> 【使用该功能的前提】 </h3>
              <div class="desc">
                您的电脑已经连接打印机，可直接打印文本。如果您的电脑尚未连接打印机，请先连接后再使用易工品中后台管理系统中的打印功能。
              </div>
            </div>
            <div class="wrap mb-6">
              <h3 class="descriptions-title"> 一、下载打印控件 </h3>
              <div class="desc">
                <div>
                  易工品中后台管理系统使用C-lodop打印控件，如果您未安装控件，在订单详情页出现如下提示，请根据提示下载网页打印机驱动安装程序，进行安装。
                </div>
                <img
                  class="mt-2 mb-6"
                  src="https://qiniu-fe.yigongpin.com/lodop/lodop_tip.png"
                  alt="tips"
                />
                <div>
                  您在订单详情页打印发货清单时，如果没有安装C-lodop控件，会出现如下弹窗，请根据提示，下载网页打印机驱动安装程序，进行安装。
                </div>
                <img
                  class="mt-2"
                  src="https://qiniu-fe.yigongpin.com/srm_course_two.png"
                  alt="安装提示"
                />
              </div>
            </div>
            <div class="wrap mb-6">
              <h3 class="descriptions-title"> 二、安装打印控件 </h3>
              <div class="desc">
                <div>
                  {' '}
                  您下载完安装控件后，找到浏览器对应下载的安装包，双击打开，根据提示进行安装{' '}
                </div>
                <img
                  class="mt-2 mt-4"
                  src="https://qiniu-fe.yigongpin.com/srm_course_three.png"
                  alt="安装包"
                />
                <img
                  class="mt-4"
                  src="https://qiniu-fe.yigongpin.com/srm_course_frou.png"
                  alt="安装步骤1"
                />
                <img
                  class="mt-4"
                  src="https://qiniu-fe.yigongpin.com/srm_course_five.png"
                  alt="安装步骤2"
                />
                <img
                  class="mt-4"
                  src="https://qiniu-fe.yigongpin.com/srm_course_six.png"
                  alt="安装步骤3"
                />
                <div class="font-600 mt-4">
                  {' '}
                  安装完成后，请按F5刷新当前网页，即可开始使用！{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
})

export type LodopTutorialProps = PropsType<typeof LodopTutorial> &
  PropsType<typeof LodopTutorialProps>
export type LodopTutorialExpose = {}
export type LodopTutorialSlots = Readonly<DefaultSlots>

export default LodopTutorial as GlobalComponentConstructor<
  LodopTutorialProps,
  LodopTutorialSlots
>
