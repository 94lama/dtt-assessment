<script setup>
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core';
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';
import noResultsImage from '@/assets/images/img_empty_houses@3x.png';

const { isFetching, data, error } = useFetch('https://api.intern.d-tt.nl/api/houses', {
  method: 'GET',
  headers: {
    'X-Api-Key': '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC'
  },
});

const houses = computed(() => JSON.parse(data.value));
const searchString = ref('');
const sortFilter = ref('price');

const filteredHouses = computed(() => {
	
  const output = houses.value;
  console.log('houses: ', output, '\n Searched value: ', searchString.value, '\n Sort by: ', sortFilter.value);

	// Filtering the results before sorting helps reducing the overall compiling time. 
	// The method includes allows to remove the errors given if searchString is null.
  return output
		.filter((house) => house.location.city.toLowerCase().includes(searchString.value))
    .sort((a, b) => a[sortFilter.value] - b[sortFilter.value]);
});

</script>

<template>
  <div v-if="isFetching">
    Loading...
  </div>
  <div v-else-if="data" class="main">
    <div class="queries flex between">
      <Search @emitInput="(value) => { searchString = value; console.log('Search value changed to: ', value) }" type="text" placeholder="Search for a house" />
      <Sort @emitSorter="(value) => { sortFilter = value; console.log('Sort value changed to: ', value) }" />
    </div>
    <div v-if="filteredHouses.length === 0" class="flex column center">
      <img :src="noResultsImage" alt="no results image">
      <h3>No houses found</h3>
      <h3>Please try another keyword.</h3>
    </div>
    <div v-if="filteredHouses.length > 0 && searchString" class="align-left">
      <h3>
        {{ filteredHouses.length }} results found
      </h3>
    </div>
    <Card v-for="house in filteredHouses" :id="house.id" :key="house.id" :image="house.image" :price="house.price" :rooms="house.rooms" :size="house.size" :description="house.description" :location="house.location" :constructionYear="house.constructionYear" :hasGarage="house.hasGarage" :madeByMe="house.madeByMe" @click="$router.push(`/houses/${house.id}`)">
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
</style>
