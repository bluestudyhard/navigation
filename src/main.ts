import { createApp } from 'vue'
import '../src/assets/styles/style.scss'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import 'uno.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Avue from '@smallwei/avue'
import App from './App.vue'
import router from './router/index'
import '@smallwei/avue/lib/index.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(Avue)
// 持久化插件
pinia.use(piniaPluginPersistedstate)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)
app.mount('#app')
