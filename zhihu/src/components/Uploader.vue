<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileState === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <!-- 具名插槽 + 作用域插槽 -->
      <slot
        v-else-if="fileState === 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInputDom"
      @change="handelFileChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axios from 'axios'
// import { createPost } from '../api/post'
type UploadType = 'ready' | 'loading' | 'success' | 'error'
type beforeUploadType = (file: File) => boolean
export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<beforeUploadType>
    },
    uploaded: {
      type: Object
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, { emit }) {
    const fileState = ref<UploadType>(props.uploaded ? 'success' : 'ready')
    const fileInputDom = ref<null | HTMLInputElement>(null)
    const uploadedData = ref(props.uploaded)
    const triggerUpload = () => {
      if (fileInputDom.value) {
        fileInputDom.value.click()
      }
    }
    const handelFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      // 注意这个是一个 files 列表，也就是 fileList 对象，它是一个 array-like 的 object，但是不是一个数组，它支持选择多个文件，所以它可能有多个
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        fileState.value = 'loading'
        const formData = new FormData()
        // 我们拿到它的第一项，就是我们选择的文件
        // 然后让我们来模拟表单的数据我们可以使用 FormData 对象，这是另一种针对 XHR2 设计的新数据类型。使用 FormData 能够很方便地实时以 JavaScript 创建 HTML <form>
        // 并通过调用 append 方法为其附加了 <input> 值。
        // 就这样我们通过 FormData 对象添加了 input 的值
        formData.append('file', files[0])
        // 连接请求
        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            fileState.value = 'success'
            uploadedData.value = res.data
            emit('file-uploaded', res.data)
          })
          .catch((error) => {
            fileState.value = 'error'
            emit('file-uploaded-error', { error })
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
      handelFileChange,
      uploadedData
    }
  }
})
</script>
