import Introduce from './__docs__/Introduce.md'
import Input from './__docs__/components/Input.md'
import Btn from './__docs__/components/Btn.md'
import BtnDropdown from './__docs__/components/BtnDropdown.md'
import Radio from './__docs__/components/Radio.md'
import RadioGroup from './__docs__/components/RadioGroup.md'
import Checkbox from './__docs__/components/Checkbox.md'
import CheckboxGroup from './__docs__/components/CheckboxGroup.md'
import Theme from './__docs__/styles/Theme.md'
import SearchTable from './__docs__/components/SearchTable.md'
import Form from './__docs__/components/Form.md'
import Dropdown from './__docs__/components/Dropdown.md'
import Select from './__docs__/components/Select.md'
import Time from './__docs__/components/Time.md'
import Cascader from './__docs__/components/Cascader.md'
import Tabs from './__docs__/components/Tabs.md'
import Datemd from './__docs__/components/Date.md'
import Slider from './__docs__/components/Slider.md'
import Pagination from './__docs__/components/Pagination.md'
import Steps from './__docs__/components/Steps.md'
import Tooltip from './__docs__/components/Tooltip.md'
import Popover from './__docs__/components/Popover.md'
import Popconfirm from './__docs__/components/Popconfirm.md'
import Alert from './__docs__/components/Alert.md'
import Affix from './__docs__/components/Affix.md'
import Spin from './__docs__/components/Spin.md'
import Modal from './__docs__/components/Modal.md'
import Table from './__docs__/components/Table.md'
import Tag from './__docs__/components/Tag.md'
import Upload from './__docs__/components/Upload.md'
import Guide from './__docs__/Guide.md'
import Link from './__docs__/components/Link.md'
import Divider from './__docs__/components/Divider.md'
import Grid from './__docs__/components/Grid.md'
import Space from './__docs__/components/Space.md'
import Drawer from './__docs__/components/Drawer.md'
import AutoComplete from './__docs__/components/AutoComplete.md'
import OptionInput from './__docs__/components/OptionInput.md'
import Message from './__docs__/components/Message.md'
import GlobalConfig from './__docs__/components/GlobalConfig.md'
import Descriptions from './__docs__/components/Descriptions.md'
import usePage from './__docs__/hooks/usePage.md'
import useFormPage from './__docs__/hooks/useFormPage.md'
import useFetch from './__docs__/hooks/useFetch.md'
import useAsync from './__docs__/hooks/useAsync.md'
import useSelection from './__docs__/hooks/useSelection.md'
import Tree from './__docs__/components/Tree.md'
import TreeSelect from './__docs__/components/TreeSelect.md'
import Import from './__docs__/components/Import.md'
import Card from './__docs__/components/Card.md'
import Ciphertext from './__docs__/components/Ciphertext.md'
import Avatar from './__docs__/components/Avatar.md'
import Image from './__docs__/components/Image.md'
import Lodop from './__docs__/components/Lodop.md'
import Timeline from './__docs__/components/Timeline.md'
import OrderTable from './__docs__/components/OrderTable.md'
import OrderSearchTable from './__docs__/components/OrderSearchTable.md'

const routes = [
  { path: '/introduce', title: '简介', component: Introduce },
  { path: '/guide', title: '使用指南（用前必读）', component: Guide },
  {
    path: '/changelog',
    title: '更新日志',
    href: 'https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/-/blob/master/CHANGELOG.md'
  },
  {
    path: '/update',
    title: '更新版本',
    component: () => import('./views/Update.vue'),
    meta: {
      style: {
        padding: '0'
      },
      hide: true
    }
  },
  {
    path: '/issues',
    title: 'Issues',
    href: 'https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/-/issues',
    meta: {
      hide: true
    }
  },
  {
    path: '/ui',
    title: 'UI规范（需要权限）',
    href: 'https://lanhuapp.com/url/LQXJa-RWji7',
    meta: {
      hide: true
    }
  },
  {
    path: '/dev',
    title: '开发规范',
    href: 'https://gitlab.yigongpin.net/ygp-frontend/components/ygp-design-vue/-/blob/master/README.md#%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83',
    meta: {
      hide: true
    }
  },
  {
    path: '/style',
    title: '样式',
    children: [{ path: '/theme', title: '主题预设', component: Theme }]
  },
  {
    path: '/data-component',
    title: '数据展示',
    children: [
      {
        path: '/search-table',
        title: 'SearchTable 查询表格',
        component: SearchTable
      },
      { path: '/form', title: 'Form 表单', component: Form },
      { path: '/table', title: 'Table 表格', component: Table },
      {
        path: '/order-table',
        title: 'OrderTable 订单表格',
        component: OrderTable
      },
      {
        path: '/order-search-table',
        title: 'OrderSearchTable 订单搜索表格',
        component: OrderSearchTable
      },
      {
        path: '/descriptions',
        title: 'Descriptions 详情',
        component: Descriptions
      },
      { path: '/tree', title: 'Tree 树形控件', component: Tree },
      { path: '/card', title: 'Card 卡片', component: Card },
      { path: '/ciphertext', title: 'Ciphertext 脱敏', component: Ciphertext },
      { path: '/image', title: 'Image 图片', component: Image },
      { path: '/lodop', title: 'Lodop 打印', component: Lodop },
      { path: '/timeline', title: 'Timeline 时间轴', component: Timeline }
    ]
  },
  {
    path: '/basic-component',
    title: '基础组件',
    children: [
      { path: '/btn', title: 'Btn 按钮', component: Btn },
      { path: '/link', title: 'Link 链接', component: Link },
      { path: '/tag', title: 'Tag 标签', component: Tag },
      { path: '/divider', title: 'Divider 分割线', component: Divider },
      { path: '/grid', title: 'Grid 栅格', component: Grid },
      { path: '/space', title: 'Space 间距', component: Space },
      { path: '/avatar', title: 'Avatar 头像', component: Avatar }
    ]
  },
  {
    path: '/nav-component',
    title: '导航组件',
    children: [
      {
        path: '/btn-dropdown',
        title: 'BtnDropdown 下拉按钮',
        component: BtnDropdown
      },
      {
        path: '/dropdown',
        title: 'Dropdown 下拉菜单',
        component: Dropdown
      },
      { path: '/tabs', title: 'Tabs 标签页', component: Tabs },
      {
        path: '/pagination',
        title: 'Pagination 分页',
        component: Pagination
      },
      {
        path: '/steps',
        title: 'Steps 步骤条',
        component: Steps
      },
      {
        path: '/affix',
        title: 'Affix 固钉',
        component: Affix
      }
    ]
  },
  {
    path: '/form-component',
    title: '表单组件',
    children: [
      { path: '/input', title: 'Input 输入框', component: Input },
      {
        path: '/auto-complete',
        title: 'AutoComplete 自动完成',
        component: AutoComplete
      },
      {
        path: '/option-input',
        title: 'OptionInput 选项输入',
        component: OptionInput
      },
      { path: '/radio', title: 'Radio 单选框', component: Radio },
      {
        path: '/radio-group',
        title: 'RadioGroup 单选框组',
        component: RadioGroup
      },
      { path: '/checkbox', title: 'Checkbox 多选框', component: Checkbox },
      {
        path: '/checkbox-group',
        title: 'CheckboxGroup 多选框组',
        component: CheckboxGroup
      },
      { path: '/select', title: 'Select 下拉选择', component: Select },
      {
        path: '/tree-select',
        title: 'TreeSelect 树选择',
        component: TreeSelect
      },
      {
        path: '/time',
        title: 'Time 时间选择',
        component: Time
      },
      {
        path: '/date',
        title: 'Date 日期选择',
        component: Datemd
      },
      {
        path: '/cascader',
        title: 'Cascader 级联选择',
        component: Cascader
      },
      { path: '/slider', title: 'Slider 滑动输入条', component: Slider },
      { path: '/upload', title: 'Upload 上传组件', component: Upload },
      { path: '/import', title: 'Import Excel导入', component: Import }
    ]
  },
  {
    path: '/feedback-component',
    title: '反馈',
    children: [
      {
        path: '/spin',
        title: 'Spin 加载中',
        component: Spin
      },
      {
        path: '/alert',
        title: 'Alert 警告提示',
        component: Alert
      },
      {
        path: '/tooltip',
        title: 'Tooltip 文字提示',
        component: Tooltip
      },
      {
        path: '/popover',
        title: 'Popover 气泡提示',
        component: Popover
      },
      {
        path: '/popconfirm',
        title: 'Popconfirm 气泡确认框',
        component: Popconfirm
      },
      {
        path: '/modal',
        title: 'Modal 模态窗',
        component: Modal
      },
      {
        path: '/drawer',
        title: 'Drawer 抽屉',
        component: Drawer
      }
    ]
  },
  {
    path: '/hooks',
    title: '钩子函数',
    children: [
      { path: '/use-page', title: 'usePage 异步分页', component: usePage },
      {
        path: '/use-form-page',
        title: 'useFormPage 异步分页',
        component: useFormPage
      },
      {
        path: '/use-fetch',
        title: 'useFetch 异步查询数据',
        component: useFetch
      },
      { path: '/use-async', title: 'useAsync 异步', component: useAsync },
      {
        path: '/use-selection',
        title: 'useSelection 表格行选择与操作',
        component: useSelection
      }
    ]
  },
  {
    path: '/plugin',
    title: '全局插件',
    children: [
      {
        path: '/global-config',
        title: 'GlobalConfig 全局配置',
        component: GlobalConfig
      },
      { path: '/modal', title: 'Modal 全局模态窗', component: Modal },
      { path: '/message', title: 'Message 全局消息提示', component: Message }
    ]
  }
]

function filter(arr: any[]) {
  arr.forEach(row => {
    if (row.component) {
      row['anchor'] = row.component?.$vd?.toc
    }
    if (row.children) {
      filter(row.children)
    }
  })
}

filter(routes)

export default {
  title: '组件库',
  routes
}
