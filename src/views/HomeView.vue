<script setup>
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core';
import { RouterLink } from 'vue-router';
import { useUserDataStore } from '@/stores/userData';
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';

import noResultsImage from '@/assets/images/img_empty_houses@3x.png';
import addSymbol from '@/assets/images/ic_plus_white@3x.png';
import addSymbolGrey from '@/assets/images/ic_plus_grey@3x.png';

const store = useUserDataStore();
const screenWidth = window.innerWidth;

if (typeof store != 'undefined' && !store.key){
  store.update(prompt('Insert your API key here'))
}

const { isFetching, data, error } = useFetch('https://api.intern.d-tt.nl/api/houses', {
  method: 'GET',
  headers: {
    'X-Api-Key': store.key
  },
});

const houses = computed(() => JSON.parse(data.value));
const searchString = ref('');
const sortFilter = ref('price');

const filteredHouses = computed(() => {
	
  const output = houses.value;

	// Filtering the results before sorting helps reducing the overall compiling time. 
	// The method includes allows to remove the errors given if searchString is null.
  return output
		.filter((house) => house.location.city.toLowerCase().includes(searchString.value))
    .sort((a, b) => a[sortFilter.value] - b[sortFilter.value]);
});

//postHouse('');
</script>

<template>
  <div v-if="isFetching">
    Loading...
  </div>
  <div v-else-if="data" class="main">
    <div class="flex w-100 align-center no-wrap title">
      <h1 :class="screenWidth <= 600 ? 'm-auto' : ''" >Houses</h1>
      <RouterLink to="/house/create" class="button uppercase" v-if="screenWidth > 768"><img :src="store.mode === 'light' ? addSymbol : addSymbolGrey" class="icon"> Create new</RouterLink>
      <RouterLink v-else to="/house/create"><img :src="store.mode === 'light' ? addSymbol : addSymbolGrey" class="icon"></RouterLink>
    </div>
    <div class="queries flex between">
      <Search @emitInput="(value) => searchString = value" type="text" placeholder="Search for a house" />
      <Sort @emitSorter="(value) => sortFilter = value" />
    </div>
    <div v-if="filteredHouses.length === 0" class="flex column center">
      <img :src="noResultsImage" alt="no results image">
      <h3>No houses found</h3>
      <h3>Please try another keyword.</h3>
    </div>
    <div v-if="filteredHouses.length > 0 && searchString" class="align-left text-left">
      <h3>
        {{ filteredHouses.length }} results found
      </h3>
    </div>
    <Card v-for="house in filteredHouses" :id="house.id" :key="house.id" :image="house.image" :price="house.price" :rooms="house.rooms" :size="house.size" :description="house.description" :location="house.location" :constructionYear="house.constructionYear" :hasGarage="house.hasGarage" :madeByMe="house.madeByMe">
    </Card>
  </div>
  <div v-else>
    {{ error }}
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  justify-content: space-between;
}

img {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}

.queries {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
}

.icon{
  height: 15px;
  width: 15px;
  margin: 0;
}

@media screen and (max-width: 600px) {
  .title{
    justify-content: right;
  }

  .queries{
    flex-direction: column;
  }
}
</style>@/components/API.vue
