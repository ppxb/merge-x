import { useIntersectionObserver } from '@vueuse/core'

export default {
  mounted: (el, binding) => {
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }], observerEl) => {
        if (isIntersecting) {
          el.src = binding.value
          stop()
        }
      }
    )
  }
}
