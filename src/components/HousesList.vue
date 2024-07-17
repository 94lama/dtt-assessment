<script setup>
import { computed, ref } from 'vue'
import { useUserDataStore } from '@/stores/userData';
import Card from '@/components/Card.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';

import noResultsImage from '@/assets/images/img_empty_houses@3x.png';

const props = defineProps({
    houses: Array,
    filter: [Boolean, String],
    image: [Boolean, String],
    size: String
})

const store = useUserDataStore();
const screenWidth = window.innerWidth;

if (typeof store != 'undefined' && !store.key) {
    store.update(prompt('Insert your API key here'))
}

const hasFilter = props.filter ?? false;
const hasImage = props.image ?? false;
const cardSize = props.size ?? 'md';

const searchString = ref('');
const sortFilter = ref('price');

const filteredHouses = computed(() => {
    if (!props.houses) return [];

    // Filtering the results before sorting helps reducing the overall compiling time. 
    // The method includes allows to remove the errors given if searchString is null.
    return props.houses
        .filter((house) => house.location.city.toLowerCase().includes(searchString.value))
        .sort((a, b) => a[sortFilter.value] - b[sortFilter.value]);
});

//postHouse('');
</script>

<template>
    <div v-if="hasFilter" class="queries flex between">
        <Search @emitInput="(value) => searchString = value" type="text" placeholder="Search for a house" />
        <Sort @emitSorter="(value) => sortFilter = value" />
    </div>
    <div v-if="hasImage && filteredHouses.length === 0" class="flex column center">
        <img :src="noResultsImage" alt="no results image">
        <h3 v-if="hasFilter && searchString">No houses found<br></br>
            Please try another keyword.</h3>
        <h3 v-else>No houses found</h3>
    </div>
    <div v-if="filteredHouses.length > 0 && searchString" class="align-left text-left">
        <h3>
            {{ filteredHouses.length }} results found
        </h3>
    </div>
    <div class="flex column center">
        <Card v-for="house in filteredHouses" :id="house.id" :key="house.id" :image="house.image" :price="house.price" :rooms="house.rooms" :size="house.size" :description="house.description" :location="house.location" :constructionYear="house.constructionYear" :hasGarage="house.hasGarage" :madeByMe="house.madeByMe" :cardSize="cardSize">
        </Card>
    </div>
</template>

<style scoped>
.title {
    justify-content: space-between;
}

img {
    max-width: 500px;
    width: 100%;
    margin: 100px 0 60px 0;
}

.queries {
    width: 100%;
    max-width: var(--width);
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
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

    .queries {
        flex-direction: column;
    }
}
</style>@/components/API.vue
