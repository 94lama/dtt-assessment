<script setup>
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core';
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';

const { isFetching, data, error } = useFetch('https://api.intern.d-tt.nl/api/houses', {
  method: 'GET',
  headers: { 
    'X-Api-Key': '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC'
   },
});

const houses = computed(() => JSON.parse(data.value));
const searchString = ref('amsterdam');

const filteredHouses = computed(() => {
  const output = houses.value;
  console.log('houses: ', output, '\n Searched value: ', searchString.value)
  return output.filter((house) => house.location.city.toLowerCase().includes(searchString.value))
});

function searchInput (value){
  console.log('Value received: ', value);
  searchString.value = value;
  console.log(searchInput)
}
</script>

<template>
  <div v-if="isFetching">
    Loading...
  </div>
  <div v-else-if="data">
    <Search @emitInput="(value) => {searchString = value; console.log(value)}" type="text" placeholder="Search for a house"/>
    <Card
      v-for="house in filteredHouses"
      :id = "house.id"
      :key="house.id"
      :image = "house.image"
      :price = "house.price"
      :rooms = "house.rooms"
      :size = "house.size"
      :description = "house.description"
      :location = "house.location"
      :constructionYear = "house.constructionYear"
      :hasGarage = "house.hasGarage"
      @click="$router.push(`/houses/${house.id}`)"
      >
    </Card>
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
