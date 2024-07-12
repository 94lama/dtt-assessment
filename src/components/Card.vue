<script setup>
import CardIcons from '@/components/card/CardIcons.vue';
import defaultImage from '@/assets/images/img_placeholder_house@3x.png';
import bedIcon from '@/assets/images/ic_bed@3x.png';
import bathIcon from '@/assets/images/ic_bath@3x.png';
import sizeIcon from '@/assets/images/ic_size@3x.png';

defineProps({
    id: Number,
    location: Object,
    image: String,
    price: Number,
    rooms: Object,
    size: Number,
    description: String,
    location: String,
    constructionYear: Number,
    hasGarage: Boolean,
})
</script>

<template>
    <div class="card" id={{id}}>
        <img :src="image ?? defaultImage" alt="House image" class="image">
        <div class="content">
            <h3 class="m-0">{{ location.street + ' ' + location.houseNumber }}</h3>
            <h4 class="m-0">€ {{ price }}</h4>
            <h5 class="m-0">{{ location.zip + ' ' + location.city }}</h5>
            <div class="flex center">
                <CardIcons :value="rooms.bedrooms" :image="bedIcon" />
                <CardIcons :value="rooms.bathrooms" :image="bathIcon" />
                <CardIcons :value="size + ' m2'" :image="sizeIcon" />
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
    padding: 1rem;
    margin: 2rem auto;
    max-width: 100%;
    height: fit-content;
}

.image {
    max-height: 140px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 5px;
}

.content {
    padding: 10px;
    height: fit-content;
    align-items: left;
    text-align: left;
}

</style>