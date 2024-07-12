<script setup>
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core';
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';
import noResultsImage from '@/assets/images/img_empty_houses@3x.png';

const { isFetching, data, error } = useFetch('https://api.intern.d-tt.nl/api/houses/'+$route.params.id, {
  method: 'GET',
  headers: { 
    'X-Api-Key': '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC'
   },
});

const house = computed(() => JSON.parse(data.value));

function searchInput (value){
  console.log('Value received: ', value);
  searchString.value = value;
  console.log(searchInput)
}
</script>

<template>
    <Card
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
</style>
