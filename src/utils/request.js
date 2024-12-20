import axios from "axios";

import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

export function request(config, loading = true) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000
  })

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    NProgress.start()
    return config
  }, error => {
    return Promise.reject(error)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(response => {
    NProgress.done()
    // if(response.data.code == 0) {
    //   return Promise.reject(new Error(response.data.message || 'Error'));
    // }
    return response
  }, error => {
    NProgress.done()
    ElMessage({
      message: 'Error',
      type: 'error',
    })
    return Promise.reject(error)
  })

  return instance(config)
}