<script setup>
import { computed } from 'vue';
import { useFetch } from '@vueuse/core';
import { RouterLink } from 'vue-router';
import { useUserDataStore } from '@/stores/userData';
import HousesList from '@/components/HousesList.vue';

import addSymbol from '@/assets/images/ic_plus_white@3x.png';
import addSymbolGrey from '@/assets/images/ic_plus_grey@3x.png';

const screenWidth = window.innerWidth;
const store = useUserDataStore()

if (typeof store != 'undefined' && !store.key) {
  store.update(prompt('Insert your API key here'))
}

const { isFetching, data, error } = useFetch('https://api.intern.d-tt.nl/api/houses', {
  method: 'GET',
  headers: {
    'X-Api-Key': store.key
  },
});

const houses = computed(() => JSON.parse(data.value));

</script>

<template>
  <main>
    <div class="flex w-100 align-center no-wrap title">
      <h1 :class="screenWidth <= 600 ? 'm-auto' : ''">Houses</h1>
      <RouterLink  v-if="screenWidth > 600" to="/house/create" class="button uppercase"><img :src="addSymbol" alt="add"> Create new</RouterLink>
      <RouterLink v-else to="/house/create"><img :src="store.mode === 'light' ? addSymbolGrey : addSymbol" alt="add"></RouterLink>
    </div>
    <HousesList :title="'Houses'" :houses="houses" filter="true" image="true" />
  </main>
</template>

<style scoped>
.title {
  max-width: var(--width);
  margin: 10px 0;
  justify-content: space-between;
}

img {
  width: 20px;
  height: 20px;
}

@media screen and (max-width: 600px) {
  .title {
    justify-content: right;
  }
}
</style>
