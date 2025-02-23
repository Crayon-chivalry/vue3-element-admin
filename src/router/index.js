import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 路由字段
 */
// 当设置 true 的时候该路由不会出现在侧边栏，如401、login等
// hidden: false

// meta: {
//   title: 'title',   标题
//   icon: '',         图标
//   noCache: false,    <keep-alive> 缓存
//   affix: false,     是否固定在 tags-view 中
// }

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
