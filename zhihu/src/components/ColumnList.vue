<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="item in columnList" :key="item._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="item.imgUrl"
            :alt="item.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">
            {{ item.des }}
          </p>
          <router-link
            :to="`/column/${item._id}`"
            class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '../utils/testData'
// export interface ColumnProps {
//   id: number
//   title: string
//   avatar?: string
//   description: string
// }
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map((item) => {
        item.imgUrl = require('../assets/primary_img.png')
        return item
      })
    })
    return { columnList }
  }
})
</script>

<style scoped></style>
