<template>
  <nav
    class="navbar navbar-dark justify-content-between mb-4 px-4"
    style="background-color: lightskyblue"
  >
    <a class="navbar-brand" href="#">知乎专栏</a>
    <ul class="list-inline mb-0" v-if="!user.isLogin">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-success my-2">登录</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/sigup" class="btn btn-primary my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.username}`">
          <dropdown-item
            ><router-link to="/create" class="dropdown-item"
              >新建文章</router-link
            ></dropdown-item
          >
          <dropdown-item disabled>编辑资料</dropdown-item>
          <dropdown-item><div @click="toLogout">退出登录</div></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserProps } from '../utils/testData'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import createMessage from './Message'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const toLogout = () => {
      store.commit('logout')
      createMessage('退出登录', 'success')
      router.push('/login')
    }
    return { toLogout }
  }
})
</script>
