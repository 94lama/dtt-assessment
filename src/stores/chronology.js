import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChronologyStore = defineStore('chronology', () => {
  
  const housesChronology = ref([]);

  function updateChronology(id) {
    housesChronology.value.push(id);
    housesChronology.value.length >= 4 ? housesChronology.value.shift() : null;
  }

  return { housesChronology, updateChronology }
})
