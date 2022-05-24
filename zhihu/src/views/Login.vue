<template>
  <!-- 表单 -->
  <validate-form @form-submit="onSubmitForm">
    <!-- 邮箱 -->
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailValue"
        type="text"
        placeholder="请输入邮箱地址"
      ></validate-input>
    </div>
    <!-- 密码 -->
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input
        :rules="passwordRules"
        v-model="passwordValue"
        type="password"
        placeholder="请输入密码"
      ></validate-input>
    </div>
    <template v-slot:submit>
      <span class="btn btn-primary">登录</span>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const passwordRules: RulesProp = [{ type: 'required', message: '请输入密码' }]
export default defineComponent({
  name: 'Login',
  components: { ValidateInput, ValidateForm },
  setup () {
    const emailValue = ref('')
    const passwordValue = ref('')
    const onSubmitForm = (result: boolean) => {
      console.log(result)
      // result的值为 true时  表示通过
    }
    return {
      emailRules,
      emailValue,
      passwordValue,
      passwordRules,
      onSubmitForm
    }
  }
})
</script>
