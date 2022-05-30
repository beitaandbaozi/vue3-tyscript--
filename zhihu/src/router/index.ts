import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const ColumnDetail = () => import('../views/ColumnDetail.vue')
const AddPost = () => import('../views/AddPost.vue')
const SigUp = () => import('../views/SigUp.vue')
// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/column/:id',
      name: 'column-detail',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: AddPost,
      meta: {
        requiredLogin: true
      }
    },
    {
      path: '/sigup',
      name: 'sig-up',
      component: SigUp
    }
  ]
})
router.beforeEach((to, form, next) => {
  console.log(to.meta)
  console.log(store.state.user.isLogin)
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
export default router
