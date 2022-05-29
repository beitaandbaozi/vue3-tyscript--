<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2 fade show"
      :class="classObj"
      role="alert"
      v-if="isVisible"
    >
      <strong>{{ message }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click.prevent="hide"
      ></button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, PropType, ref } from 'vue'
import useDomCreate from '../hooks/useDomCreate'
type messageType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
export default defineComponent({
  name: 'Message',
  props: {
    type: {
      type: String as PropType<messageType>,
      default: 'primary'
    },
    message: String
  },
  emits: ['close-message'],
  setup (props, context) {
    useDomCreate('message')
    const classObj = {
      'alert-primary': props.type === 'primary',
      'alert-secondary': props.type === 'secondary',
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'danger',
      'alert-warning': props.type === 'warning',
      'alert-info': props.type === 'info',
      'alert-dark': props.type === 'dark'
    }
    const isVisible = ref(true)
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      classObj,
      isVisible,
      hide
    }
  }
})
</script>
