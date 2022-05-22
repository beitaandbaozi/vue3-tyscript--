<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <img :src="item.avatar" :alt="item.title" />
      <h5>{{ item.title }}</h5>
      <p>{{ item.description }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnProps {
  id: number
  title: string
  avatar: string
  description: string
}
export default defineComponent({
  name: 'ColumnList',
  components: {},
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
})
</script>

<style scoped></style>
