<template>
  <div class="container w-50">
    <validate-form @form-submit="onSubmitForm">
      <!-- 邮箱 -->
      <div class="mb-3">
        <validate-input
          v-model="titleValue"
          type="text"
          placeholder="请输入标题"
        ></validate-input>
      </div>
      <!-- 密码 -->
      <div class="mb-3 w-20">
        <validate-input
          v-model="contentValue"
          type="textarea"
          placeholder="文字内容"
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
