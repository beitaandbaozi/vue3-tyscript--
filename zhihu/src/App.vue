<template>
  <div class="container">
    <!-- 头部 -->
    <global-header :user="userData"></global-header>
    <loading
      text="加载中"
      background="rgba(0,0,0,0.8)"
      v-if="loading"
    ></loading>
    <message message="Message"></message>
    <!-- 内容 -->
    <router-view></router-view>
    <!-- 底部 -->
    <global-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import Loading from './components/Loading.vue'
import axios from 'axios'
import Message from './components/Message.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading,
    Message
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const userData = computed(() => store.state.user)
    const loading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    // TODO
    // 第一次加载，判断token是否存在，并且用户还未登录
    onMounted(() => {
      if (token.value && !userData.value.isLogin) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchUserInfo')
      }
    })
    return {
      userData,
      loading
    }
  }
})
</script>

<style></style>
