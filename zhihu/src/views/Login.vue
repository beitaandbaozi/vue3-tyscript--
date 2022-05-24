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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Login',
  components: { ValidateInput, ValidateForm },
  setup () {
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '请输入密码' }
    ]
    const emailValue = ref('')
    const passwordValue = ref('')
    const router = useRouter()
    const store = useStore()
    const onSubmitForm = (result: boolean) => {
      if (result) {
        store.commit('login')
        router.push('/')
      }
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
