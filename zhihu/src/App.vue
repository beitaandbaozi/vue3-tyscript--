<template>
  <div class="container">
    <!-- 头部 -->
    <global-header :user="userData"></global-header>
    <loading
      text="加载中"
      background="rgba(0,0,0,0.8)"
      v-if="loading"
    ></loading>
    <!-- 内容 -->
    <router-view></router-view>
    <!-- 底部 -->
    <global-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import Loading from './components/Loading.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const userData = computed(() => store.state.user)
    const loading = computed(() => store.state.loading)
    return {
      userData,
      loading
    }
  }
})
</script>

<style></style>
