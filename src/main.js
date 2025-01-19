import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css';
import '../mock/index'
import './utils/permission'
import SvgIcon from './icons'

import TableFiltering from './components/TableFiltering.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('TableFiltering', TableFiltering)

SvgIcon(app)

app.use(store).use(router).mount('#app')
