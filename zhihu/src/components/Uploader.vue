<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">点击上传</button>
    <input type="file" class="file-input d-none" ref="fileInputDom" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Uploader',
  setup () {
    const fileInputDom = ref<null | HTMLAnchorElement>(null)
    const triggerUpload = () => {
      if (fileInputDom.value) {
        fileInputDom.value.click()
      }
    }
    return {
      fileInputDom,
      triggerUpload
    }
  }
})
</script>
