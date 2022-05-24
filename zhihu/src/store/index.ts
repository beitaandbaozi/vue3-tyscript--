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
  actions: {}
})
