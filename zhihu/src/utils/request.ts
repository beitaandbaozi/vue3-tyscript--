import axios from 'axios'
import store from '../store'
const service = axios.create({
  baseURL: 'http://127.0.0.1:8081/zhiye/api',
  timeout: 100000
})
// 请求拦截器
service.interceptors.request.use((config: any) => {
  store.commit('setLoading', true)
  // token注入请求头中
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
service.interceptors.response.use(response => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return response
}, (e) => {
  const { error } = e.response.data
  store.commit('setError', { code: 0, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
// 导出
export default service
