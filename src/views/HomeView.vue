<script setup>
import { computed } from 'vue'
import { useFetch } from '@vueuse/core';

const { isFetching, data, error } = useFetch('https://api.intern.d-tt.nl/api/houses', {
  method: 'GET',
  headers: { 
    'X-Api-Key': '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC'
   },
});

const houses = computed(() => JSON.parse(data.value));
</script>

<template>
  <div v-if="isFetching">
    Loading...
  </div>
  <div v-else-if="data">
    {{ houses }}
  </div>
  <div v-else>
    {{ error }}
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
