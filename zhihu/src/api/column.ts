import request from '../utils/request'
// 获取全部专栏文章列表
export function getColumnList () {
  return request({
    url: '/column/list',
    method: 'get'
  })
}
// 获取对应id的专栏文章
export function getColumnById (id: number) {
  return request({
    url: `/column/detail?id=${id}`,
    method: 'get'
  })
}
