<template>
  <section class="text-center py-5 container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <img src="../assets/callout.svg" alt="callout" class="w-50" />
        <h2 class="font-weight-light">随心写作，自由表达</h2>
        <p>
          <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
        </p>
      </div>
    </div>
  </section>
  <h4 class="font-weight-bold text-center py-3">发现精彩</h4>
  <column-list :list="list"></column-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = store.state.columns
    return { list }
  }
})
</script>
