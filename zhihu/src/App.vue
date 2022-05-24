<template>
  <div class="container">
    <!-- 头部 -->
    <global-header :user="userData"></global-header>
    <!-- 内容 -->
    <router-view></router-view>
    <!-- 底部 -->
    <global-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const userData = store.state.user
    return {
      userData
    }
  }
})
</script>

<style></style>
