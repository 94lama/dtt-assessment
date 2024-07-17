import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('key', () => {
  /* API-Key */
  const key = ref('');

  function update(value) {
    key.value = value
  }

  /* Screen mode (dark/light) */
  const mode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function toggleMode() {
    if (mode.value === 'light') {
      mode.value = 'dark';
      document.documentElement.setAttribute('data-theme', mode.value);
    } else {
      mode.value = 'light';
      document.documentElement.removeAttribute('data-theme');
    }
  }


  /* Liked houses list */
  const likedHouses = ref([]);

  function toggleLike(id) {
    if (likedHouses.value.includes(id)) {
      likedHouses.value = likedHouses.value.filter(house => house !== id)
    } else {
      likedHouses.value = [...likedHouses.value, id]
    }
  }

  return { key, update, mode, toggleMode, likedHouses, toggleLike }
})
