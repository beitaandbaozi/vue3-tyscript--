<template>
  <li :class="{ 'is-disabled': disabled }">
    <a class="dropdown-item" href="#"><slot></slot></a>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style>
.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
