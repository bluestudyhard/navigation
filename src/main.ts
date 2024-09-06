import { createApp } from 'vue'
import '../src/assets/styles/style.scss'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import 'uno.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Antd from 'ant-design-vue'

// import { Button, Table, message } from 'ant-design-vue'
import App from './App.vue'
import router from './router/index'

import 'ant-design-vue/dist/reset.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(Antd)
app.directive('click-outside', {
  mounted(el, binding) {
    const handleClickOutside = (event: MouseEvent) => {
      if (!el.contains(event.target as Node) && el !== event.target)
        binding.value(event)
    }
    el.__handleClickOutside__ = handleClickOutside
    document.addEventListener('click', handleClickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el.__handleClickOutside__)
    delete el.__handleClickOutside__
  },
})

// 持久化插件
pinia.use(piniaPluginPersistedstate)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)
app.mount('#app')
app.config.performance = true
