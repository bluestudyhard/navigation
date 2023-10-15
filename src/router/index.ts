import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

import constantRoute from './constRoutes'

// 需要import pinia
import userStore from '@/stores/user'

// 动态的注册路由，不用每次手动添加路由
// function importViews() {
//   const views = import.meta.glob('../views/*.vue')

//   for (const path in views) {
//     const name = path.match(/\.\/views(.*)\.vue$/)?.[1]?.toLowerCase()
//     // console.log(path.match(/\.\/views(.*)\.vue$/), views);
//     if (!name)
//       return // 可能name为undefined
//     routes.push({
//       path: name === '/home' ? '/' : name,
//       component: views[path],
//     })
//   }
// }
// importViews()

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('../views/login.vue'),
    name: 'login',
  },
  {
    path: '/',
    component: () => import('../views/home/home.vue'),
    name: 'home',
  },
  {
    path: '/404',
    component: () => import('../views/404.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  {
    path: '/management',
    component: () => import('../views/management/management.vue'),
    name: '后台首页',
    children: [
      ...constantRoute,

    ],
  },

]
// 添加路由守卫
/**
 * 思考 1.判断是否登录 如果没有登录就跳转到登录页面，且不能访问别的页面
 * 2. 判断是否有权限，如果没有权限就不开后台管理的路由
 *
 */

const router = createRouter({
  history: createWebHashHistory(),
  routes,

})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const useUserStore = userStore()
  const token = useUserStore.token
  // 判断是否登录
  if (!token) {
    // 未登录
    if (to.path !== '/login')
      next('/login') // 没登录的话怎么都是指向login

    else
      next()
  }
  // 判断是否有权限
  else {
    // 如果不是管理员，所有和后台管理有关的都不开放
    if (to.path.includes('/management') && !useUserStore.isAdmin)
      next('/')

    next()
  }
})
export default router
