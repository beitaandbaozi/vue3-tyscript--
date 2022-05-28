import axios from 'axios'
import store from '../store'
const service = axios.create({
  baseURL: 'http://127.0.0.1:8081/zhiye/api',
  timeout: 100000
})
// 请求拦截器
service.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
// 响应拦截器
service.interceptors.response.use(response => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return response
})
// 导出
export default service
