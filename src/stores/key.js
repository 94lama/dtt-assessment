import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useKeyStore = defineStore('key', () => {
  const key = ref('')

  function update(value) {
    key.value=value
  }

  return { key, update }
})
