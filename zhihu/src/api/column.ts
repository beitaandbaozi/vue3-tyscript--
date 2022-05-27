import request from '../utils/request'
// 获取专栏文章列表
export function getColumnList () {
  return request({
    url: '/column/list',
    method: 'get'
  })
}
