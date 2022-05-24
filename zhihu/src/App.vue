<template>
  <div class="container">
    <!-- 头部 -->
    <global-header :user="userData"></global-header>
    <!-- 内容 -->
    <!-- 底部 -->
    <global-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
const userData: UserProps = {
  isLogin: true,
  name: 'BeiTa'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter
  },
  setup () {
    return {
      userData
    }
  }
})
</script>

<style></style>
