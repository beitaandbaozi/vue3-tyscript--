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
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'
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
    const isOutside = useClickOutside(dropdownCom)
    watch(isOutside, () => {
      if (isOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    return { isOpen, toggleOpen, dropdownCom }
  }
})
</script>
