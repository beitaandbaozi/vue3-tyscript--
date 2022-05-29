<template>
  <div class="card w-50 container mb-4">
    <div class="card-body">
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
    </div>
  </div>
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
    const emailValue = ref('beita0527@163.com')
    const passwordValue = ref('123456')
    const router = useRouter()
    const store = useStore()
    const onSubmitForm = async (result: boolean) => {
      if (result) {
        // TODO 登录流程
        // 1. 获取token
        // 2. 请求头注入token
        // 3. 获取用户信息
        const userData = {
          email: emailValue.value,
          password: passwordValue.value
        }
        store.dispatch('fetchLoginAndUser', userData).then(() => {
          router.push('/')
        })
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
