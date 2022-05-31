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
  store.commit('setError', { status: false, message: '' })
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})
// 导出
export default service
