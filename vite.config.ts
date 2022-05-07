import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default ({mode})=>{
  const baseApi = loadEnv(mode,process.cwd()).VITE_BASE_API // 请求主路径
  const reqHost = loadEnv(mode,process.cwd()).VITE_SERVICE_URL // 代理网址
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server:{
      proxy:{
        [baseApi] : {
          target: reqHost,
          changeOrigin: true,
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
