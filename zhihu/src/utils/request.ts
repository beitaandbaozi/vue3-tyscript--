import axios from 'axios'
const service = axios.create({
  baseURL: 'http://127.0.0.1:8081/zhiye/api',
  timeout: 100000
})
// 请求拦截器
service.interceptors.request.use(config => { })
// 响应拦截器
service.interceptors.response.use(response => { })
// 导出
export default service
