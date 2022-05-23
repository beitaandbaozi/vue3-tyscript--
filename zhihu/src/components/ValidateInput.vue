<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{ 'is-invalid': inputRef.error, 'is-valid': validFlag }"
      v-model="inputRef.value"
      @blur="validateRules"
      @input="updateValue"
      v-bind="$attrs"
    />
    <div class="form-text invalid-feedback" v-if="inputRef.error">
      {{ inputRef.message }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email'
  message: string
}
export type RulesProp = RuleProp[]
export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: {
      type: String
    }
  },
  inheritAttrs: false,
  setup (props, { emit }) {
    const validFlag = ref(false)
    const inputRef = reactive({
      value: props.modelValue || '',
      error: false,
      message: ''
    })
    // 双向数据绑定
    const updateValue = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.value = targetValue
      emit('update:modelValue', targetValue)
    }
    const validateRules = () => {
      if (props.rules) {
        const allPassed = props.rules.every((item) => {
          let passed = true
          inputRef.message = item.message
          switch (item.type) {
            case 'required':
              passed = inputRef.value.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.value)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        validFlag.value = !inputRef.error
      }
    }
    return { inputRef, validateRules, validFlag, updateValue }
  }
})
</script>
