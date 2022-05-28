import { createStore } from 'vuex'
import { ColumnProps, PostProps, UserProps } from '../utils/testData'
import { getColumnList, getColumnById } from '../api/column'
import { getPostListByColumnId } from '../api/post'
import { userLogin, userInfo } from '../api/user'
import axios from 'axios'
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  loading: boolean,
  token: string
}
export default createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false },
    loading: false,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: 'BeiTa' }
    // },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.list
    },
    fetchColumnById (state, rawData) {
      state.columns = [rawData.item]
    },
    fetchPostById (state, rowData) {
      state.posts = rowData.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    setToken (state, rowData) {
      state.token = rowData
      // axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
      localStorage.setItem('token', state.token)
    },
    setUserInfo (state, rowData) {
      state.user = { isLogin: true, ...rowData }
    }
  },
  actions: {
    // 获取全部专栏文章列表
    async fetchColumns (context) {
      // getColumnList().then(res => {
      //   context.commit('fetchColumns', res.data)
      // })
      const { data } = await getColumnList()
      context.commit('fetchColumns', data)
    },
    // 获取对应id的专栏信息
    fetchColumnById (context, cid) {
      getColumnById(cid).then(res => {
        context.commit('fetchColumnById', res.data)
      })
    },
    // 获取对应id的文章列表
    fetchPostById (context) {
      getPostListByColumnId().then(res => {
        context.commit('fetchPostById', res.data)
      })
    },
    // 用户登录
    fetchUserLogin (context, data) {
      userLogin(data).then(res => {
        context.commit('setToken', res.data.token)
      })
    },
    fetchUserInfo (context) {
      userInfo().then(res => {
        context.commit('setUserInfo', res.data)
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
