<template>
  <div class="file-upload">
    <button
      class="btn btn-primary"
      @click.prevent="triggerUpload"
      v-if="fileState === 'ready'"
    >
      点击上传
    </button>
    <span v-else-if="fileState === 'loading'">loading</span>
    <span v-else-if="fileState === 'success'">success</span>
    <span v-else>error</span>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInputDom"
      @change="handelFileChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
// import { createPost } from '../api/post'
type UploadType = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const fileState = ref<UploadType>('ready')
    const fileInputDom = ref<null | HTMLInputElement>(null)
    const triggerUpload = () => {
      if (fileInputDom.value) {
        fileInputDom.value.click()
      }
    }
    const handelFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        fileState.value = 'loading'
        const files = Array.from(currentTarget.files)
        const formData = new FormData()
        formData.append('file', files[0])
        // 连接请求
        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            console.log(res.data)
            fileState.value = 'success'
          })
          .catch(() => {
            fileState.value = 'error'
          })
          .finally(() => {
            if (fileInputDom.value) {
              fileInputDom.value.value = ''
            }
          })
        // createPost(formData)
        //   .then((res) => {
        //     console.log(res.data)
        //     fileState.value = 'success'
        //   })
        //   .catch(() => {
        //     fileState.value = 'error'
        //   })
        //   .finally(() => {
        //     if (fileInputDom.value) {
        //       fileInputDom.value.value = ''
        //     }
        //   })
      }
    }
    return {
      fileInputDom,
      triggerUpload,
      fileState,
      handelFileChange
    }
  }
})
</script>
