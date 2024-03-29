import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const baseApi = loadEnv(mode, process.cwd()).VITE_BASE_API // 请求主路径
  const reqHost = loadEnv(mode, process.cwd()).VITE_SERVICE_URL // 代理网址
  return defineConfig({
    plugins: [
      vue({
        reactivityTransform: true
      }),
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@design-vue': path.resolve(__dirname, 'src/desgin-vue')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true //注意，这一句是在less对象中，写在外边不起作用
        }
      }
    },
    server: {
      proxy: {
        // '/api/bciscm': { // 单独代理某个耳机路径
        //   target: 'http://10.172.5.227:9201',
        //   changeOrigin: true,
        //   ws: true,
        //   rewrite: (path) => path.replace(/^\/api\/bciscm/, '')
        // },
        [baseApi]: {
          target: reqHost,
          changeOrigin: true
        }
      }
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 3500,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 用于删除生产环境中的console
          drop_console: false
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  })
}
