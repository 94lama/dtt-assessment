<script setup>
import { computed } from 'vue'
import { useFetch } from '@vueuse/core';
import HousePropsIcon from '@/components/HousePropsIcon.vue';
import { useRouter } from 'vue-router';
import EditListing from '@/components/EditListing.vue';

const router = useRouter();

import locationIcon from '@/assets/images/ic_location@3x.png';
import priceIcon from '@/assets/images/ic_price@3x.png';
import sizeIcon from '@/assets/images/ic_size@3x.png';
import constructionYearIcon from '@/assets/images/ic_construction_date@3x.png';
import bedIcon from '@/assets/images/ic_bed@3x.png';
import bathIcon from '@/assets/images/ic_bath@3x.png';
import garageIcon from '@/assets/images/ic_garage@3x.png';
import defaultImage from '@/assets/images/img_placeholder_house@3x.png';


const { isFetching, data, error } = useFetch(`https://api.intern.d-tt.nl/api/houses/${router.currentRoute.value.params.id}`, {
  method: 'GET',
  headers: { 
    'X-Api-Key': '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC'
   },
});

const house = computed(() => JSON.parse(data.value));
</script>

<template>
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="data" class="container flex column">
    <img :src="house[0].image??defaultImage">
    <div class="text-black w-90">
      <div class="flex align-center between col-gap">
        <h2>{{ house[0].location.street }}</h2>
        <EditListing></EditListing>
      </div>
      <div class="flex column row-gap">
        <HousePropsIcon :image="locationIcon" :value="house[0].location.zip + ' ' + house[0].location.city"/>
        <div class="flex col-gap">
          <HousePropsIcon :image="priceIcon" :value="house[0].price"/>
          <HousePropsIcon :image="sizeIcon" :value="house[0].size"/>
          <HousePropsIcon :image="constructionYearIcon" :value="house[0].constructionYear"/>
        </div>
        <div class="flex col-gap">
          <HousePropsIcon :image="bedIcon" :value="house[0].rooms.bedrooms"/>
          <HousePropsIcon :image="bathIcon" :value="house[0].rooms.bathrooms"/>
          <HousePropsIcon :image="garageIcon" :value="house[0].hasGarage?'Yes':'No'"/>
        </div>
        <p class='align-left text-left'>{{ house[0].description }}</p>
      </div>
    </div>
  </div>
  <div v-else>{{ error }}</div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: var(--width);
  align-items: center;
  background-color: var(--background2);
  padding-bottom: 20px;
  padding-top: 0;
}

img {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}
</style>
