import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import config from '../config'
import templateDocConfig from '../templateDocConfig'
import './Layout.less'
import Logo from '../logo.png'
import { DownOutlined } from '@ant-design/icons-vue'
import { version, fetchVersion } from '../hooks/useVersion'

const Menu = defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    activeNav: {
      type: String,
      default: 'component'
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    const menus = computed(() => {
      let menus: any[] = []
      if (props.activeNav === 'component') {
        menus = config.routes || []
      } else {
        menus = templateDocConfig.routes[0].children || []
      }
      return menus.filter((row: any) => !row.meta?.hide)
    })
    const selectedKeys = ref([route.path])
    const openKeys = ref(config.routes.map(route => route.path))

    watchEffect(() => {
      selectedKeys.value = [route.path]
      document.title = `${route.meta.title} | ${props.title}`
    })

    const onClick = ({ key }: any) => {
      router.push(key)
    }

    const onItemClick = (item: any) => {
      if (item.children) {
        return
      } else if (item.href) {
        window.open(item.href)
      } else {
        onClick({ key: item.path })
      }
    }

    return () => (
      <a-menu
        class="layout-menu"
        mode="inline"
        v-models={[
          [selectedKeys.value, 'selectedKeys'],
          [openKeys.value, 'openKeys']
        ]}
        // onClick={this.onClick}
      >
        {menus.value.map((menu: any) => {
          if (menu.children) {
            return (
              <a-sub-menu
                key={menu.path}
                onClick={() => onItemClick(menu)}
                v-slots={{
                  title: () => <span>{menu.title}</span>
                }}
              >
                {menu.children
                  .filter((row: any) => !row.meta?.hide)
                  .map((menuItems: any) => (
                    <a-menu-item
                      key={menuItems.path}
                      onClick={() => onItemClick(menuItems)}
                    >
                      {menuItems.title}
                    </a-menu-item>
                  ))}
              </a-sub-menu>
            )
          } else {
            return (
              <a-menu-item key={menu.path} onClick={() => onItemClick(menu)}>
                {menu.title}
              </a-menu-item>
            )
          }
        })}
      </a-menu>
    )
  }
})

/* const HeaderNav = defineComponent({
  props: {
    activeNav: {
      type: String,
      default: 'component',
    },
  },
  setup(props) {
    const router = useRouter()

    const navList = [
      {
        name: '组件库',
        type: 'component',
        path: '/introduce',
      },
      {
        name: '项目模板',
        type: 'template',
        path: '/template/introduce',
      },
    ]

    const onClickNav = (item: any) => {
      router.push(item.path)
    }

    return () => (
      <ul class="header_nav">
        {navList.map((item) => {
          return (
            <li
              class={['nav_item', { active: props.activeNav === item.type }]}
              key={item.type}
              onClick={() => onClickNav(item)}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    )
  },
}) */

export default defineComponent({
  name: 'Layout',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const title = computed(() => (config.title as string) || '')
    const anchor = computed(() => (route.meta.anchor as any[]) || [])

    const activeNav = computed(() => {
      let type = ''
      if (route.path.startsWith('/template')) {
        type = 'template'
      } else {
        type = 'component'
      }
      return type
    })

    function onJump(url: string) {
      if (route.path !== url) {
        router.push(url)
      }
    }

    const onClick = (e: Event, link: Object) => {
      e.preventDefault()
    }
    function onUpdateVersion() {
      router.push('/update')
    }

    fetchVersion()

    return () => (
      <a-layout id="layout">
        <a-layout-header class="layout-header">
          <router-link to="/" class="layout-logo">
            <img alt="logo" height="32" src={Logo} />
            <span class="title">{title.value}</span>
          </router-link>
          <y-menu
            style="min-width: 350px"
            selectedKeys={[activeNav.value]}
            mode="horizontal"
          >
            <y-menu-sub
              key="version"
              v-slots={{
                title: () => (
                  <>
                    当前版本: {version.value}&nbsp;&nbsp;&nbsp;&nbsp;
                    <DownOutlined />
                  </>
                )
              }}
            >
              <y-menu-item
                key="update"
                label="更新版本"
                onClick={onUpdateVersion}
              />
            </y-menu-sub>
            <y-menu-item
              key="component"
              label="组件"
              onClick={() => onJump('/introduce')}
            />
            <y-menu-item
              key="template"
              label="项目模版"
              onClick={() => onJump('/template/introduce')}
            />
          </y-menu>
          {/* <div class="header_more">
            <y-divider vertical />
            <HeaderNav activeNav={activeNav.value} />
          </div> */}
        </a-layout-header>
        <a-layout>
          <a-layout-sider class="d-xs-none d-sm-none" width="240" theme="light">
            <a-anchor>
              <Menu title={title.value} activeNav={activeNav.value} />
            </a-anchor>
          </a-layout-sider>
          <a-layout>
            <a-layout-content
              style={route.meta?.style}
              class={`layout-content px-xs-3 px-sm-3 ${
                route.meta?.class || ''
              }`}
            >
              <router-view></router-view>
            </a-layout-content>

            <a-anchor
              class="d-xs-none d-sm-none layout-anchor"
              offsetTop={30}
              onClick={onClick}
            >
              {anchor.value.map((item: any) => {
                return (
                  <a-anchor-link
                    href={'#' + item.anchor}
                    title={item.content}
                  />
                )
              })}
            </a-anchor>
          </a-layout>
        </a-layout>
      </a-layout>
    )
  }
})
