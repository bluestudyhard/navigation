import { URL, fileURLToPath } from 'node:url'
import type { ConfigEnv, UserConfigExport } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      viteMockServe({
        mockPath: 'src/mock',
        localEnabled: command === 'serve',
      }),
      Unocss(),
      ElementPlus({}),
      AutoImport({
        imports: ['vue', 'vue-router'],
      }),
    ],
    // 别名@
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@conponents': fileURLToPath(
          new URL('./src/components', import.meta.url),
        ),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "../src/assets/styles/variable.scss";',
        },
      },
    },
  }
}
