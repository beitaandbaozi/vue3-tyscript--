import { createStore } from 'vuex'
import { ColumnProps, PostProps, UserProps, testPosts } from '../utils/testData'
import { getColumnList, getColumnById } from '../api/column'
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
export default createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: testPosts,
    user: { isLogin: false, name: 'BeiTa', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'BeiTa' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.list
    },
    fetchColumnById (state, rawData) {
      state.columns = [rawData.item]
    }
  },
  actions: {
    // 获取全部专栏文章列表
    fetchColumns (context) {
      getColumnList().then(res => {
        context.commit('fetchColumns', res.data)
      })
    },
    // 获取对应id的专栏信息
    fetchColumnById (context, cid) {
      getColumnById(cid).then(res => {
        context.commit('fetchColumnById', res.data)
      })
    }
  },
  getters: {

    getColumnById: (state) => (payload: number) => {
      return state.columns.find(c => c._id === payload)
    },
    getPostsByCid: (state) => (payload: number) => {
      return state.posts.filter(c => c.columnId === payload)
    }
  }
})
