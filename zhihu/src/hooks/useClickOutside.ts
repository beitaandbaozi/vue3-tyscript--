import { onMounted, onUnmounted, Ref, ref } from 'vue'
const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false)
  const handle = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handle)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handle)
  })
  return isClickOutside
}
export default useClickOutside
