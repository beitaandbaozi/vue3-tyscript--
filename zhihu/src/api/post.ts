import request from '../utils/request'
// 获取当前columnId下的文章列表
export function getPostListByColumnId () {
  return request({
    url: '/post/list',
    method: 'get'
  })
}
// 新建文章
export function createPost (data: any) {
  return request({
    url: '/post/create',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
