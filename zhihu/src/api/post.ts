import request from '../utils/request'
// 获取当前columnId下的文章列表
export function getPostListByColumnId () {
  return request({
    url: '/post/list',
    method: 'get'
  })
}
