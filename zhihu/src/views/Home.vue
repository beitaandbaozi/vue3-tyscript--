<template>
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
