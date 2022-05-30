<template>
  <div class="card w-50 container mb-4">
    <div class="card-body">
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
        <!-- 昵称 -->
        <div class="mb-3">
          <label class="form-label">昵称</label>
          <validate-input
            :rules="nickNameRules"
            v-model="nickNameValue"
            type="text"
            placeholder="请输入昵称"
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
        <div class="mb-3">
          <label class="form-label">重复密码</label>
          <validate-input
            :rules="rePasswordRules"
            v-model="rePasswordValue"
            type="password"
            placeholder="请再次输入密码"
          ></validate-input>
        </div>
        <template v-slot:submit>
          <span class="btn btn-primary">注册新用户</span>
        </template>
      </validate-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { sigUp } from '../api/user'
import createMessage from '../components/Message'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'SigUp',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const nickNameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const rePasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        message: '两次密码不相同',
        validator: () => {
          return passwordValue.value === rePasswordValue.value
        }
      }
    ]
    const emailValue = ref('')
    const nickNameValue = ref('')
    const passwordValue = ref('')
    const rePasswordValue = ref('')
    const router = useRouter()
    const onSubmitForm = (result: boolean) => {
      const sigUpData = {
        email: emailValue,
        name: nickNameValue,
        password: passwordValue
      }
      if (result) {
        sigUp(sigUpData).then((res) => {
          const { data } = res
          createMessage(data.msg, 'success')
          router.push('/login')
        })
      }
    }
    return {
      emailValue,
      emailRules,
      nickNameValue,
      nickNameRules,
      passwordValue,
      passwordRules,
      rePasswordValue,
      rePasswordRules,
      onSubmitForm
    }
  }
})
</script>
