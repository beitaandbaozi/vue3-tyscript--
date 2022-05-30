import request from '../utils/request'
// 登录
export function userLogin (data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}
// 获取用户角色
export function userInfo () {
  return request({
    url: '/user/current',
    method: 'post'
  })
}

// 注册用户
export function sigUp (data: any) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}
