import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import axios from 'axios'
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
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  // TODO 根据是否登录
  if (!user.isLogin) {
    // TODO 未登录
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchUserInfo').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    // TODO 已登录
    if (redirectAlreadyLogin) {
      // redirectAlreadyLogin 说明当前在login页面中
      next('/')
    } else {
      next()
    }
  }
})
export default router
