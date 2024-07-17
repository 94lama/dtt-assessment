import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('key', () => {
  /* API-Key */
  const key = ref('');

  function update(value) {
    key.value = value
  }

  /* Screen mode (dark/light) */
  const mode = ref(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  window.matchMedia('(prefers-color-scheme: dark)').matches?toggleMode():null;

  function toggleMode() {
    if (mode.value === 'light') {
      mode.value = 'dark';
      document.documentElement.setAttribute('data-theme', mode.value);
    } else {
      mode.value = 'light';
      document.documentElement.removeAttribute('data-theme');
    }
  }

  return { key, update, mode, toggleMode }
})
