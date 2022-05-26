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
        <a href="#" class="btn btn-warning my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.name}`">
          <dropdown-item>新建文章</dropdown-item>
          <dropdown-item disabled>编辑资料</dropdown-item>
          <dropdown-item>退出登录</dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
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
  }
})
</script>
