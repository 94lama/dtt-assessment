<script setup>
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core';
import { RouterLink } from 'vue-router';
import { useUserDataStore } from '@/stores/userData';
import HousesList from '@/components/HousesList.vue';

import addSymbol from '@/assets/images/ic_plus_white@3x.png';
import addSymbolGrey from '@/assets/images/ic_plus_grey@3x.png';

const store = useUserDataStore();
const screenWidth = window.innerWidth;

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
  <div class="flex w-100 align-center no-wrap title">
    <h1 :class="screenWidth <= 600 ? 'm-auto' : ''">Houses</h1>
    <RouterLink to="/house/create" class="button uppercase" v-if="screenWidth > 768"><img :src="store.mode === 'light' ? addSymbol : addSymbolGrey" class="icon"> Create new</RouterLink>
    <RouterLink v-else to="/house/create"><img :src="store.mode === 'light' ? addSymbol : addSymbolGrey" class="icon"></RouterLink>
  </div>
  <div v-if="isFetching">
    Loading...
  </div>
  <HousesList v-else-if="data" :title="'Houses'" :houses="houses" filter="true" image="true" />
  <div v-else>
    {{ error }}
  </div>
</template>

<style scoped>
.title {
  max-width: var(--width);
  margin: 50px 0 10px 0;
  justify-content: space-between;
}

img {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}

.icon {
  height: 15px;
  width: 15px;
  margin: 0;
}

@media screen and (max-width: 600px) {
  .title {
    justify-content: right;
  }
}
</style>@/components/API.vue
