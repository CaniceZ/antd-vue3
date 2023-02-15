import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc'
import path from 'path'
const fs = require('fs')
const packages = fs.readdirSync(
  path.resolve(__dirname, '../src/design-vue/packages')
)
const cgiMock = require('connect-cgi-mock')

const mock = () => ({
  name: 'mock-server',
  configureServer(server) {
    server.middlewares.use(
      cgiMock({
        root: path.resolve(__dirname, './mock'),
        router: '/api'
      })
    )
  }
})

export default defineConfig({
  root: 'examples/',
  base: '/',
  server: {
    host: true,
    port: Number(process.env.YGPDV_SERVER_PORT || 3001)
  },
  plugins: [
    mock(),
    vitePluginVuedoc({
      // markdownIt: { plugins: [] },
      // previewComponent: 'preview',
    }),
    vue({
      reactivityTransform: true,
      include: [...vueDocFiles]
    }),
    vueJsx()
  ],
  build: {
    outDir: '../docs'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: /^@\/api$/,
        replacement: path.resolve(__dirname, './src/api.ts')
      },
      ...packages.map(name => ({
        find: new RegExp(`@ygp/ygp-design-vue/${name}`),
        replacement: path.resolve(
          __dirname,
          `../src/design-vue/packages/${name}/index.ts`
        )
      })),
      {
        find: new RegExp('@ygp/ygp-design-vue'),
        replacement: path.resolve(__dirname, '../src/design-vue/index.ts')
      }
    ]
  }
})
