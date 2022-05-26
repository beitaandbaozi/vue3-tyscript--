<template>
  <div class="container w-50">
    <validate-form @form-submit="onSubmitForm">
      <!-- 文章标题 -->
      <div class="mb-3">
        <label class="form-label">文章标题</label>
        <validate-input
          v-model="titleValue"
          :rules="titleRules"
          type="text"
          placeholder="请输入标题"
        ></validate-input>
      </div>
      <!-- 文章内容 -->
      <div class="mb-3">
        <label class="form-label">文章内容</label>
        <validate-input
          :rules="contentRules"
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
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import { PostProps } from '../utils/testData'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'AddPost',
  components: { ValidateForm, ValidateInput },
  setup () {
    const titleValue = ref('')
    const titleRules: RulesProp = [
      {
        type: 'required',
        message: '文章标题不能为空！'
      }
    ]
    const contentValue = ref('')
    const contentRules: RulesProp = [
      {
        type: 'required',
        message: '文章内容不能为空！'
      }
    ]
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const onSubmitForm = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleValue.value,
            content: contentValue.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          // 新增文章
          store.commit('createPost', newPost)
          // 路由跳转
          router.push(`/column/${columnId}`)
        }
      }
    }
    return { titleValue, contentValue, titleRules, contentRules, onSubmitForm }
  }
})
</script>
