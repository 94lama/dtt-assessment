<script setup>
import { computed } from 'vue'
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


// Filtering the results before sorting helps reducing the overall compiling time. 
// The method includes allows to remove the errors given if searchString is null.
const filteredHouses = computed(() => {
    return houses.value
        .filter((house) => store.likedHouses.includes(house.id))
});

//postHouse('');
</script>

<template>
    <main>
        <div class="flex w-100 align-center no-wrap title">
            <h1 :class="screenWidth <= 600 ? 'm-auto' : ''">Houses</h1>
            <RouterLink v-if="screenWidth > 600" to="/house/create" class="button uppercase"><img :src="addSymbol" alt="add"> Create new</RouterLink>
            <RouterLink v-else to="/house/create"><img :src="store.mode === 'light' ? addSymbol : addSymbolGrey" alt="add"></RouterLink>
        </div>
        <div v-if="isFetching">Loading...</div>
        <HousesList v-else-if="data" :title="'My Favourite Houses'" :houses="filteredHouses" filter="true" image="true" />
        <div v-else>{{ error }}</div>
    </main>
</template>

<style scoped>
.title {
    width: 100%;
    max-width: var(--width);
    margin: 50px 0 10px 0;
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
</style>@/components/API.vue
