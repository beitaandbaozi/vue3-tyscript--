<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error, 'is-valid': validFlag }"
      v-model="inputRef.value"
      @blur="validateInput"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error, 'is-valid': validFlag }"
      v-model="inputRef.value"
      @blur="validateInput"
      v-bind="$attrs"
    ></textarea>
    <div class="form-text invalid-feedback" v-if="inputRef.error">
      {{ inputRef.message }}
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  onMounted,
  computed
} from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
  type: 'required' | 'email' | 'custom'
  message: string
  validator?: () => boolean
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  props: {
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: {
      type: String
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, { emit }) {
    const validFlag = ref(false)
    const inputRef = reactive({
      value: computed({
        get: () => props.modelValue || '',
        set: (val) => {
          emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    // 双向数据绑定
    // const updateValue = (e: Event) => {
    //   const targetValue = (e.target as HTMLInputElement).value
    //   inputRef.value = targetValue
    //   emit('update:modelValue', targetValue)
    // }
    // 数据验证
    const validateInput = () => {
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
            case 'custom':
              passed = item.validator ? item.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        validFlag.value = !inputRef.error
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return { inputRef, validateInput, validFlag }
  }
})
</script>
