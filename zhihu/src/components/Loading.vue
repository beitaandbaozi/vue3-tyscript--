<template>
  <teleport to="#model">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{
        backgroundColor: background || ''
      }"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ text || 'loading' }}</span>
        </div>
        <p class="text-primary small" v-if="text">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import useDomCreate from '../hooks/useDomCreate'
export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    useDomCreate('model')
  }
})
</script>
<style>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
