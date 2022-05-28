import request from '../utils/request'
// 登录
export function userLogin (data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}
