<template>
  <div class="dropdown" ref="dropdownCom">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >

    <ul class="dropdown-menu" style="display: block" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const dropdownCom = ref<null | HTMLElement>(null)
    const handleDisplay = (e: MouseEvent) => {
      if (dropdownCom.value) {
        if (
          !dropdownCom.value.contains(e.target as HTMLElement) &&
          isOpen.value
        ) {
          isOpen.value = false
        }
      }
    }
    onMounted(() => {
      document.addEventListener('click', handleDisplay)
    })
    onUnmounted(() => {
      document.removeEventListener('click', handleDisplay)
    })
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return { isOpen, toggleOpen, dropdownCom, handleDisplay }
  }
})
</script>
