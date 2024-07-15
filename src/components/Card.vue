<script setup>
import EditListing from '@/components/EditListing.vue';
import HousePropsIcon from '@/components/HousePropsIcon.vue';
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
        <div class="content w-100">
            <div class="flex between">
                <h3 class="m-1" @click="router.push('/houses/' + id)">{{ location.street + ' ' + location.houseNumber }}</h3>
                <EditListing :id="id" v-if="madeByMe"></EditListing>
            </div>
            <h4 class="m-1" @click="router.push('/houses/' + id)">€ {{ price }}</h4>
            <h5 class="m-1" @click="router.push('/houses/' + id)">{{ location.zip + ' ' + location.city }}</h5>
            <div class="flex" @click="router.push('/houses/' + id)">
                <HousePropsIcon :value="rooms.bedrooms" :image="bedIcon" />
                <HousePropsIcon :value="rooms.bathrooms" :image="bathIcon" />
                <HousePropsIcon :value="size + ' m2'" :image="sizeIcon" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    background-color: var(--background2);
    padding: 1rem;
    margin: 1rem 0;
    width: 100%;
    max-width: 100%;
}

.image {
    height: 140px;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
}

.content {
    padding: 0 10px;
    height: fit-content;
    align-items: left;
    text-align: left;
}
</style>