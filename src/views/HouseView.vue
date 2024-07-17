<script setup>
import { computed } from 'vue'
import { useFetch } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useChronologyStore } from "@/stores/chronology";
import { useUserDataStore } from '@/stores/userData';
import HousesList from '@/components/HousesList.vue';

/* Icons */
import HouseDetailIcons from '@/components/HouseDetailIcons.vue';
import HouseActions from '@/components/HouseActions.vue';
import locationIcon from '@/assets/images/ic_location@3x.png';
import priceIcon from '@/assets/images/ic_price@3x.png';
import sizeIcon from '@/assets/images/ic_size@3x.png';
import constructionYearIcon from '@/assets/images/ic_construction_date@3x.png';
import bedIcon from '@/assets/images/ic_bed@3x.png';
import bathIcon from '@/assets/images/ic_bath@3x.png';
import garageIcon from '@/assets/images/ic_garage@3x.png';
import defaultImage from '@/assets/images/img_placeholder_house@3x.png';
import backArrow from '@/assets/images/ic_back_grey@3x.png';
import backArrowWhite from '@/assets/images/ic_back_grey@3x.png';

const store = useUserDataStore();
const chronologyStore = useChronologyStore();
const router = useRouter();

if (typeof store != 'undefined' && !store.key) {
  store.update(prompt('Insert your API key here'))

  chronologyStore.updateChronology(router.currentRoute.value.params.id);
}

/* By having to make an API call for 4 houses (detailed and the recommended ones), It is more convinient to make just one 
* API call to houses/, and then elaborate the response. To revert to the original API call, swap the following rows */
//const { isFetching, data, error } = useFetch(`https://api.intern.d-tt.nl/api/houses/${router.currentRoute.value.params.id}`, {
const { isFetching, data, error } = useFetch(`https://api.intern.d-tt.nl/api/houses`, {
  method: 'GET',
  headers: {
    'X-Api-Key': '1owkyeAxJYWi-8EjqbgQ5IK_OLT2VGHC'
  },
});

/* Previous API call to fetch the single house details
* const house = computed(() => JSON.parse(data.value)); */
const houses = computed(() => JSON.parse(data.value));
const house = computed(() => houses.value.filter(house => house.id == router.currentRoute.value.params.id));

const recommendedHouses = computed(() =>
  houses.value
    .filter(filteredHouses => filteredHouses.id != router.currentRoute.value.params.id)
    .filter(filteredHouses => filteredHouses.location.city == house.value[0].location.city)
    //.filter(filteredHouses => filteredHouses.rooms.bedrooms == house.value[0].rooms.bedrooms)
    .slice(0, 3)
)

</script>

<template>
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="data" class="container flex col-gap-5">
    <div class="flex column house">
      <RouterLink to="/" class="flex col-gap backLink h3"><img class="back" :src="store.mode === 'light' ? backArrow : backArrowWhite" /> Back to overview</RouterLink>
      <div class="houseDetails">
        <img :src="house[0].image ?? defaultImage" class="houseImage">
        <div class="text-black w-90">
          <div class="flex align-center between col-gap">
            <h1>{{ house[0].location.street }}</h1>
            <HouseActions :id="house[0].id"></HouseActions>
          </div>
          <div class="flex column row-gap">
            <HouseDetailIcons :image="locationIcon" :value="house[0].location.zip + ' ' + house[0].location.city" />
            <div class="flex col-gap">
              <HouseDetailIcons :image="priceIcon" :value="house[0].price" />
              <HouseDetailIcons :image="sizeIcon" :value="house[0].size" />
              <HouseDetailIcons :image="constructionYearIcon" :value="house[0].constructionYear" />
            </div>
            <div class="flex col-gap">
              <HouseDetailIcons :image="bedIcon" :value="house[0].rooms.bedrooms" />
              <HouseDetailIcons :image="bathIcon" :value="house[0].rooms.bathrooms" />
              <HouseDetailIcons :image="garageIcon" :value="house[0].hasGarage ? 'Yes' : 'No'" />
            </div>
            <p class='align-left text-left'>{{ house[0].description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex column recommended">
      <h2>Recommended for you</h2>
      <HousesList title="Recommended for you" :houses="recommendedHouses" class="recommended" size="sm"></HousesList>
    </div>
  </div>
  <div v-else>{{ error }}</div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: var(--width);
  padding-bottom: 20px;
  padding-top: 60px;
}

.houseDetails {
  width: 100%;
  padding: 20px;
  background-color: var(--background2);
  display: flex;
  padding: 0 0 40px 0;
  flex-direction: column;
  align-items: center;
}

.houseImage {
  width: 100%;
  aspect-ratio: 4/2;
  object-fit: cover;
  margin-bottom: 20px;
}

.backLink {
  margin-bottom: 20px;
  color: var(--black);
  align-self: flex-start;
}

.back {
  height: 20px;
}

.house {
  width: 70%;
}

.recommended {
  width: 30%;
  margin: 30px 0 60px 0;
}

@media screen and (max-width: 600px) {
  .container{
    flex-direction: column;
  } 

  .house {
    width: 100%;
  }

  .recommended {
    width: 100%;
  }
  
}
</style>
