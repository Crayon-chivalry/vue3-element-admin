import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import getters from './getters'

/**
 *  自动引入 modules 目录下的所有 Vuex 模块
 */
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  modules,
  getters,
  // 持久化
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: "store",
      paths: ['user.token']
    })
  ]
})
