import { createStore } from 'vuex'
import { ColumnProps, PostProps, UserProps, testData, testPosts } from '../utils/testData'
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
export default createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'BeiTa' }
    }
  },
  actions: {},
  getters: {
    // getColumnById:(state) => (id:number) => {
    //   return state.columns.find(c => c.id === id)
    // }
    getColumnById: (state) => (payload: number) => {
      return state.columns.find(c => c.id === payload)
    },
    getPostsByCid: (state) => (payload: number) => {
      return state.posts.filter(c => c.columnId === payload)
    }
  }
})
