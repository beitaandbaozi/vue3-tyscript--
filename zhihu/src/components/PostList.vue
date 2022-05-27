<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}/`">{{ post.title }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.imgUrl" class="col-4">
            <img
              :src="post.imgUrl"
              :alt="post.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{'col-8': post.imgUrl}" class="text-muted">{{post.content}}</p>
        </div>
        <span class="text-muted">{{ post.createTime }}</span>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../utils/testData'
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  setup (props) {
    return {
      posts: props.list
    }
  }
})
</script>
