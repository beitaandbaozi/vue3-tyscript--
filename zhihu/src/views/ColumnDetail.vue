<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.des }}</p>
      </div>
      <div class="col-3 text-center">
        <img
          :src="column.imgUrl"
          :alt="column.title"
          class="rounded-circle border img-fluid"
        />
      </div>
    </div>
    <!-- 文章列表 -->
    <post-list :list="list"></post-list>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import PostList from '../components/PostList.vue'
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = Number(route.params.id)
    onMounted(() => {
      store.dispatch('fetchColumnById', currentId)
      store.dispatch('fetchPostById')
    })
    const column = computed(() => store.getters.getColumnById(currentId))
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      column,
      list
    }
  }
})
</script>
