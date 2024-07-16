<script setup>
import EditListing from '@/components/EditListing.vue';
import HouseDetailIcons from '@/components/HouseDetailIcons.vue';
import defaultImage from '@/assets/images/img_placeholder_house@3x.png';
import bedIcon from '@/assets/images/ic_bed@3x.png';
import bathIcon from '@/assets/images/ic_bath@3x.png';
import sizeIcon from '@/assets/images/ic_size@3x.png';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';


const router = useRouter();

defineProps({
    id: Number,
    location: Object,
    image: String,
    price: Number,
    rooms: Object,
    size: Number,
    description: String,
    constructionYear: Number,
    hasGarage: Boolean,
    madeByMe: Boolean
})
</script>

<template>
    <div class="card" id={{id}}>
        <RouterLink :to="'/houses/' + id" class="image">
            <img :src="image ?? defaultImage" alt="House image" class="image">
        </RouterLink>
        <div class="content w-100 flex column">
            <div class="flex between">
                <h2 class="m-1" @click="router.push('/houses/' + id)">{{ location.street + ' ' + location.houseNumber }}</h2>
                <EditListing :id="id" v-if="madeByMe"></EditListing>
            </div>
            <p class="m-1" @click="router.push('/houses/' + id)">€ {{ price }}</p>
            <p class="m-1" @click="router.push('/houses/' + id)">{{ location.zip + ' ' + location.city }}</p>
            <div class="flex" @click="router.push('/houses/' + id)">
                <HouseDetailIcons :value="rooms.bedrooms" :image="bedIcon" />
                <HouseDetailIcons :value="rooms.bathrooms" :image="bathIcon" />
                <HouseDetailIcons :value="size + ' m2'" :image="sizeIcon" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background-color: var(--background2);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    margin: 15px 0;
    width: var(--width);
    height: 240px;
    max-width: 100%;
}

.image {
    height: 190px;
    aspect-ratio: 1/1;
    margin: 25px;
    border-radius: 10px;
    object-fit: cover;
}

.content {
    margin: 25px;
    align-items: left;
    text-align: left;
    justify-content: space-around;
}
</style>