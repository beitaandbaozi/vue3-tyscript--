<template>
  <div class="container w-50">
    <validate-form @form-submit="onSubmitForm">
      <!-- 文章标题 -->
      <div class="mb-3">
        <label class="form-label">文章标题</label>
        <validate-input
          v-model="titleValue"
          type="text"
          placeholder="请输入标题"
        ></validate-input>
      </div>
      <!-- 文章内容 -->
      <div class="mb-3">
        <label class="form-label">文章内容</label>
        <validate-input
          rows="10"
          type="text"
          tag="textarea"
          v-model="contentValue"
          placeholder="请输入文章详情"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <span class="btn btn-primary">发布文章</span>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
export default defineComponent({
  name: 'AddPost',
  components: { ValidateForm, ValidateInput },
  setup () {
    const titleValue = ref('')
    const contentValue = ref('')
    const onSubmitForm = (result: boolean) => {
      console.log(result)
    }
    return { titleValue, contentValue, onSubmitForm }
  }
})
</script>
