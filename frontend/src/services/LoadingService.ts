import { ref } from 'vue'

class LoadingService {
  private loading = ref(false)

  start() {
    this.loading.value = true
  }

  stop() {
    this.loading.value = false
  }

  get isLoading() {
    return this.loading.value
  }
}

export default new LoadingService()
